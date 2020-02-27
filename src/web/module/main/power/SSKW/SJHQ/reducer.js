import ky from 'ky'
import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    MODULE_KEY as PZSX_MODULE_KEY,
} from 'SRC/module/main/power/SSKW/PZSX/reducer'

export const MODULE_KEY = 'SJHQ'

const init_state = {

    origin_data: [],

    cal_data: [],

    finish_count: 0,
}

// 获取当前数据
const get_current_data = async ({code, month}) => {
    const data_str = await ky(`/get_current_data/?list=${code}${month}`).text()

    const item_arr = data_str.split(';')
    let info = item_arr[0].split(',')

    return ({
        '开盘价': parseInt(info[5]),
        '最高价': parseInt(info[3]),
        '最低价': parseInt(info[4]),
        '昨收价': parseInt(info[5]),

        '最新价': parseInt(info[8]),
        '结算价': parseInt(info[9]),
        '昨结算': parseInt(info[10]),

        '买一价': parseInt(info[6]),
        '卖一价': parseInt(info[7]),

        '买量': parseInt(info[11]),
        '卖量': parseInt(info[12]),

        '持仓量': parseInt(info[13]),
        '成交量': parseInt(info[14]),
    })
}

// 获取合约数据
const get_contract_data = async ({code, month}) => await ky(`/get_contract_data/?symbol=${code}${month}`).text()

const get_all_data = async ({dispatch, get_state, info}) => {

    const {
        code,
        month,
        name,
        rate,
    } = info

    const current_data = await get_current_data({code, month})
    const contract_data_str = await get_contract_data({code, month})
    const all_contract_data_str = await get_contract_data({code, month: '0'})

    const state = get_state()
    const module_state = state[MODULE_KEY]

    const item = {
        info: {
            ...info,
            current_data,
        },
        contract_data_str,
        all_contract_data_str,
    }

    const rv = [
        ...module_state.origin_data,
        item,
    ]

    // 更新缓存
    localStorage.data = JSON.stringify(rv)

    dispatch(
        module_setter({
            finish_count: module_state.finish_count + 1,
            origin_data: rv,
        }),
    )

    get_cal_data(dispatch, get_state, item)
}

const get_cal_hl = (fix_rate, all_contract_data, contract_data) => {
    const sort_all_contract_data = R.sort((a, b) => b['开盘价'] - a['开盘价'])(all_contract_data)
    const sort_contract_data = R.sort((a, b) => b['开盘价'] - a['开盘价'])(contract_data)

    const all_contract_high = sort_all_contract_data[0]
    const all_contract_low = sort_all_contract_data[sort_all_contract_data.length - 1]
    const all_contract_hl_gap = all_contract_high['开盘价'] - all_contract_low['开盘价']
    const all_contract_hl_gap_rate = all_contract_hl_gap / all_contract_low['开盘价']
    const all_contract_hl_gap_rate_fixed = all_contract_hl_gap_rate * fix_rate

    const contract_high = sort_contract_data[0]
    const contract_low = sort_contract_data[sort_contract_data.length - 1]
    const contract_hl_gap = contract_high['开盘价'] - contract_low['开盘价']
    const contract_hl_gap_rate = contract_hl_gap / contract_low['开盘价']
    const contract_hl_gap_rate_fixed = contract_hl_gap_rate * fix_rate

    return {
        sort_all_contract_data,
        sort_contract_data,

        all_contract_high,
        all_contract_low,
        all_contract_hl_gap,
        all_contract_hl_gap_rate,
        all_contract_hl_gap_rate_fixed,

        contract_high,
        contract_low,
        contract_hl_gap,
        contract_hl_gap_rate,
        contract_hl_gap_rate_fixed,
    }
}

const parse_data_str = R.compose(
    R.map(
        v => ({
            日期: v[0],
            开盘价: parseInt(v[1]) === 0 ? parseInt(v[2]) || parseInt(v[3]) || parseInt(v[4]) : parseInt(v[1]),
            最高价: parseInt(v[2]),
            最低价: parseInt(v[3]),
            收盘价: parseInt(v[4]),
        }),
    ),
    JSON.parse,
)

// 计算极端信息
const get_cal_data = (dispatch, get_state, item) => {

    const state = get_state()
    const module_state = state[MODULE_KEY]

    const {
        info: {
            rate,
        },
        contract_data_str,
        all_contract_data_str,
    } = item

    const contract_data = parse_data_str(contract_data_str)
    const all_contract_data = parse_data_str(all_contract_data_str)

    // 杠杆
    const lever = 1 / rate
    // 真实波幅
    const fix_rate = lever / 10
    // 获取最高最低信息
    const hl_info = get_cal_hl(fix_rate, all_contract_data, contract_data)

    const cal_item = {
        ...item.info,

        lever,
        fix_rate,

        contract_data,
        all_contract_data,

        ...hl_info,
    }

    const cal_data = [
        ...module_state.cal_data,
        cal_item,
    ]

    dispatch(
        module_setter({
            cal_data: R.sort((a, b) => b.contract_hl_gap_rate_fixed - a.contract_hl_gap_rate_fixed)(cal_data),
        }),
    )

}

const _refresh = (dispatch, get_state) => {
    const state = get_state()
    const pzsx_module_state = state[PZSX_MODULE_KEY]

    localStorage.clear()

    dispatch(
        module_setter({
            finish_count: 0,
            origin_data: [],
        }),
    )

    R.compose(
        R.map(
            v => get_all_data({dispatch, get_state, info: v}),
        ),
        R.filter(v => !v.disable),
    )(pzsx_module_state.PZ)
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export const action = {

    search: payload => (dispatch, get_state) => {
        // 如果存在浏览器缓存, 则从缓存中获取, 否则刷新
        if(localStorage.data) {

            const data = JSON.parse(localStorage.data)

            dispatch(
                module_setter({
                    finish_count: data.length,
                    origin_data: data,
                }),
            )

            R.map(
                v => get_cal_data(dispatch, get_state, v),
            )(data)

        } else {
            _refresh(dispatch, get_state)
        }


    },

    refresh: payload => _refresh,

}

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)
