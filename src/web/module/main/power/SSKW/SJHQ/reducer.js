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

    finish_count: 0,
}

// 获取当前数据
const get_current_data = async ({code, month}) => {
    const data_str = await ky(`/get_current_data/?list=${code}${month}`).text()

    const item_arr = data_str.split(';')
    let info = item_arr[0].split(',')

    return ({
        '开盘价': parseInt(info[2]),
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
const get_contract_data = async ({code, month}) => {
    const data_str = await ky(`/get_contract_data/?symbol=${code}${month}`).text()

    return R.compose(
        R.map(
            v => ({
                日期: v[0],
                开盘价: parseInt(v[1]),
                最高价: parseInt(v[2]),
                最低价: parseInt(v[3]),
                收盘价: parseInt(v[4]),
            }),
        ),
        JSON.parse,
    )(data_str)
}

const get_all_data = async ({dispatch, get_state, code, month, name}) => {

    const current_data = await get_current_data({code, month})
    const contract_data = await get_contract_data({code, month})
    const all_contract_data = await get_contract_data({code, month: '0'})

    const state = get_state()
    const module_state = state[MODULE_KEY]

    const rv = [
        ...module_state.origin_data,
        {
            code,
            month,
            name,
            current_data,
            contract_data,
            all_contract_data,
        },
    ]

    dispatch(
        module_setter({
            finish_count: module_state.finish_count + 1,
            origin_data: R.sort(
                (a, b) => b.all_contract_data.length - a.all_contract_data.length,
            )(rv),
        }),
    )
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export const action = {

    refresh: payload => (dispatch, get_state) => {
        const state = get_state()
        const pzsx_module_state = state[PZSX_MODULE_KEY]

        R.compose(
            R.map(
                v => get_all_data({dispatch, get_state, name: v.name, code: v.code, month: v.month}),
            ),
            R.filter(v => !v.disable),
        )(pzsx_module_state.PZ)
    },

}

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)
