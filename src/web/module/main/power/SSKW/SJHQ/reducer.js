import ky from 'ky'
import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    MODULE_KEY as PZSX_MODULE_KEY,
} from 'SRC/module/main/power/SSKW/PZSX/reducer'

export const MODULE_KEY = 'SJHQ'

// 反转判定幅度标准
// const SHAKE_QUOTATION_RATE = 0.04
const SHAKE_QUOTATION_RATE = 0.038

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
        '日期': info[17],
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

    // const contract_data_str = await get_contract_data({code, month: '2007'})
    // const contract_data_str = await get_contract_data({code, month: '2007'})
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
    // localStorage.data = JSON.stringify(rv)

    dispatch(
        module_setter({
            finish_count: module_state.finish_count + 1,
            origin_data: rv,
        }),
    )

    get_cal_data(dispatch, get_state, item)
}

const parse_data_str = (current_data, data, cut, cut_len) => {
    return R.compose(
        // 追加当天交易数据
        list => {
            if(current_data.日期 !== list[list.length - 1].日期) {
                list = [
                    ...list,
                    {
                        日期: current_data.日期,
                        开盘价: current_data.开盘价,
                        最高价: current_data.最高价,
                        最低价: current_data.最低价,
                        收盘价: current_data.最新价,
                    },
                ]
            }
            return list
        },

        list => R.addIndex(R.map)(
            (v, k) => {
                // if(v[0] === '2020-03-17') {
                //     debugger
                // }

                const _open = parseInt(v[1])
                const _high = parseInt(v[2])
                const _low = parseInt(v[3])
                const _close = parseInt(v[4])

                const default_val = _open || _high || _low || _close

                const open = k === 0
                    ? (_open || default_val)
                    // : (parseInt(list[k - 1][4]) || default_val)
                    : default_val

                const close = _close || default_val
                const high = open > _high ? open : _high
                const low = open < _low ? open : (_low || default_val)

                return ({
                    日期: v[0],
                    开盘价: open,
                    最高价: high,
                    最低价: low,
                    收盘价: close,
                })
            },
        )(list),

        // v => cut ? R.take(60)(v) : v,


        // v => cut ? R.takeLast(15)(v) : v,
        // cut = true 提取6月后的数据
        v => cut ? R.takeLast(cut_len)(v) : v,

        JSON.parse,
    )(data)
}

const get_cal_hl = (fix_rate, all_contract_data, contract_data) => {
    const sort_all_contract_data = R.sort((a, b) => b['收盘价'] - a['收盘价'])(all_contract_data)
    const sort_contract_data = R.sort((a, b) => b['收盘价'] - a['收盘价'])(contract_data)

    const all_contract_high = sort_all_contract_data[0]
    const all_contract_low = sort_all_contract_data[sort_all_contract_data.length - 1]
    const all_contract_hl_gap = all_contract_high['收盘价'] - all_contract_low['收盘价']
    const all_contract_hl_gap_rate = all_contract_hl_gap / all_contract_low['收盘价']
    const all_contract_hl_gap_rate_fixed = all_contract_hl_gap_rate * fix_rate

    const contract_high = sort_contract_data[0]
    const contract_low = sort_contract_data[sort_contract_data.length - 1]
    const contract_hl_gap = contract_high['收盘价'] - contract_low['收盘价']
    const contract_hl_gap_rate = contract_hl_gap / contract_low['收盘价']
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

// 获取合约期每日波幅
const get_cal_contract_day_amplitude = (fix_rate, contract_data) => {

    // 日期: "2019-05-20"
    // 开盘价: 5760
    // 最高价: 5766
    // 最低价: 5712
    // 收盘价: 5714
    const contract_day_amplitude = R.addIndex(R.map)(
        (v, k) => {

            // 日开收盘波幅
            const day_amplitude = (v['收盘价'] - v['开盘价'])
            const day_amplitude_rate = day_amplitude / v['最低价'] * 100
            const day_amplitude_rate_fixed = day_amplitude_rate * fix_rate

            // 日最高最低波幅
            const hl_day_amplitude = (v['最高价'] - v['最低价'])
            const hl_day_amplitude_rate = hl_day_amplitude / v['最低价'] * 100
            const hl_day_amplitude_rate_fixed = hl_day_amplitude_rate * fix_rate

            return {
                ...v,

                day_amplitude,
                day_amplitude_rate,
                day_amplitude_rate_fixed,

                hl_day_amplitude,
                hl_day_amplitude_rate,
                hl_day_amplitude_rate_fixed,
            }
        },
    )(contract_data)

    return contract_day_amplitude
}

// 分析 - 日间距的统计信息
const get_analy_contract_day_amplitude = data => {

    const hl_day_amplitude = R.groupBy(
        v => (
            Math.abs(v.hl_day_amplitude_rate_fixed) < 1 ? 'lv0' :
                Math.abs(v.hl_day_amplitude_rate_fixed) < 2 ? 'lv1' :
                    Math.abs(v.hl_day_amplitude_rate_fixed) < 3 ? 'lv2' :
                        Math.abs(v.hl_day_amplitude_rate_fixed) < 4 ? 'lv3' :
                            Math.abs(v.hl_day_amplitude_rate_fixed) < 5 ? 'lv4' : 'lv5'
        ),
    )(data)

    return {
        hl_day_amplitude,
    }
}

// 分析 价格状态
const get_analy_price_state = (fix_rate, all_contract_data, contract_data, hl_info) => {

    const {
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
    } = hl_info

    const get_price_state_by_price = (price, hp, lp) => (price - lp) / (hp - lp) * 100
    const get_price_state_by_sort = (data, price) => {
        for(let i = 0; i < data.length; i++) {
            // 精度控制
            if(data[i].收盘价 < price) {
                return (data.length - i) / data.length * 100
            }
        }

        return 0
    }

    const get_group = (data, hp, lp) => {
        return R.groupBy(
            v => {
                const amp = (v.收盘价 - lp) / (hp - lp)
                return (
                    amp < 0.1 ? 'lv0' :
                        amp < 0.2 ? 'lv1' :
                            amp < 0.3 ? 'lv2' :
                                amp < 0.4 ? 'lv3' :
                                    amp < 0.5 ? 'lv4' :
                                        amp < 0.6 ? 'lv5' :
                                            amp < 0.7 ? 'lv6' :
                                                amp < 0.8 ? 'lv7' :
                                                    amp < 0.9 ? 'lv8' : 'lv9'
                )
            },
        )(data)
    }

    const all_contract_price_state_by_price = get_price_state_by_price(all_contract_data[all_contract_data.length - 1].收盘价, all_contract_high.收盘价, all_contract_low.收盘价)
    const contract_price_state_by_price = get_price_state_by_price(contract_data[contract_data.length - 1].收盘价, contract_high.收盘价, contract_low.收盘价)

    const all_contract_price_state_by_sort = get_price_state_by_sort(sort_all_contract_data, all_contract_data[all_contract_data.length - 1].收盘价)
    const contract_price_state_by_sort = get_price_state_by_sort(sort_contract_data, contract_data[contract_data.length - 1].收盘价)

    return {
        // 平均值
        all_contract_price_state_by_avg: (all_contract_price_state_by_price + all_contract_price_state_by_sort) / 2,
        contract_price_state_by_avg: (contract_price_state_by_price + contract_price_state_by_sort) / 2,

        all_contract_price_state_by_price,
        contract_price_state_by_price,

        all_contract_price_state_by_sort,
        contract_price_state_by_sort,

        group_all_contract_data: get_group(sort_all_contract_data, all_contract_high.收盘价, all_contract_low.收盘价),
        group_contract_data: get_group(sort_contract_data, contract_high.收盘价, contract_low.收盘价),
    }

}

// 获取多空行情分组数据
const get_bull_bear_group = (fix_rate, contract_data, all_contract_data) => {

    const get_target_price = (price, dir) => {
        // 连续修正
        const fix_up_rate = dir === 'up' ? SHAKE_QUOTATION_RATE * 0.5 : SHAKE_QUOTATION_RATE
        const fix_down_rate = dir === 'down' ? SHAKE_QUOTATION_RATE * 0.5 : SHAKE_QUOTATION_RATE

        return ({
            up: price * (1 + fix_up_rate),
            down: price * (1 - fix_down_rate),
        })
    }

    const _get_bull_bear_group = (fix_rate, data) => {
        let rv = []
        let target_price = get_target_price(data[0].收盘价)
        let node = []

        // 判定多空行情起始 结束
        R.addIndex(R.map)(
            (v, k) => {
                const price = v.收盘价

                node = [
                    ...node,
                    v,
                ]

                if(price >= target_price.up || price <= target_price.down) {
                    const dir = price > target_price.up ? 'up' : 'down'
                    const last_node = rv[rv.length - 1]

                    if(last_node && last_node.dir === dir) {
                        // 连续拼接
                        rv = [
                            ...R.take(rv.length - 1)(rv),
                            {
                                dir,
                                node: [
                                    ...rv[rv.length - 1].node,
                                    ...node,
                                ],
                            },
                        ]

                        // 重置
                        node = []
                        target_price = get_target_price(price, dir)
                    } else {
                        // 拼接
                        rv = [
                            ...rv,
                            {
                                dir,
                                node,
                            },
                        ]

                        // 重置
                        node = []
                        target_price = get_target_price(price)
                    }

                }

                if(k === data.length - 1 && node.length) {
                    rv = [
                        ...rv,
                        {
                            dir: null,
                            node,
                        },
                    ]
                }
            },
        )(data)

        // 构造图表数据集
        const chart_rv = R.addIndex(R.map)(
            (v, k) => {
                const before_len = R.compose(
                    R.sum,
                    R.addIndex(R.map)(
                        (v1, k1) => k1 < k ? v1.node.length : 0,
                    ),
                )(rv)

                const last_len = data.length - v.node.length - before_len

                return ({
                    ...v,
                    chart_data: [
                        ...R.repeat(null, before_len),
                        ...R.map(R.prop('收盘价'))(v.node),
                        ...R.repeat(null, last_len),
                    ],
                })
            },
        )(rv)

        return chart_rv
    }

    const all_contract_bull_bear_group_data = _get_bull_bear_group(fix_rate, all_contract_data)
    const contract_bull_bear_group_data = _get_bull_bear_group(fix_rate, contract_data)

    const _get_bull_bear_list = R.reduce(
        (a, b) => R.concat(a)(R.map(v => ({...v, dir: b.dir}))(b.node)),
        [],
    )

    return {
        all_contract_bull_bear_group_data,
        contract_bull_bear_group_data,

        all_contract_bull_bear_list_data: _get_bull_bear_list(all_contract_bull_bear_group_data),
        contract_bull_bear_list_data: _get_bull_bear_list(contract_bull_bear_group_data),
    }
}

// 计算信息
const get_cal_data = (dispatch, get_state, item) => {

    const state = get_state()
    const module_state = state[MODULE_KEY]

    const {
        info: {
            rate,
            current_data,
        },
        contract_data_str,
        all_contract_data_str,
    } = item

    const contract_data = parse_data_str(current_data, contract_data_str, true, 20)
    // const contract_data = parse_data_str(current_data, contract_data_str, true, 180)
    // const contract_data = R.takeLast(26)(parse_data_str(current_data, contract_data_str, true))

    const all_contract_data = parse_data_str(current_data, all_contract_data_str, true, 1200)

    // 杠杆
    const lever = 1 / rate
    // 真实波幅
    const fix_rate = lever / 10
    // 获取最高最低信息
    const hl_info = get_cal_hl(fix_rate, all_contract_data, contract_data)
    const contract_day_amplitude = get_cal_contract_day_amplitude(fix_rate, contract_data)

    // 合约期总波动
    const contract_data_day_amplitude_rate_fixed_sum = R.reduce((a, b) => a + Math.abs(b.day_amplitude_rate_fixed), 0)(contract_day_amplitude)

    const cal_item = {
        ...item.info,

        lever,
        fix_rate,

        bond: parseInt(item.info.current_data.最新价 * item.info.unit * item.info.rate),
        amplitude: ((item.info.current_data['最新价'] - item.info.current_data['昨收价']) / item.info.current_data['昨收价'] * 100).toFixed(2),

        // 周价格状态
        wprice_state: parseInt((item.info.current_data['最新价'] - item.info.wlow) / (item.info.whigh - item.info.wlow) * 100),

        contract_data_day_amplitude_rate_fixed_sum,

        // contract_data,
        contract_data: contract_day_amplitude,
        all_contract_data,

        ...hl_info,
        analy: {
            contract_day_amplitude: get_analy_contract_day_amplitude(contract_day_amplitude),
            price_state: get_analy_price_state(fix_rate, all_contract_data, contract_data, hl_info),
            // 获取多空行情分组数据
            bull_bear_group: get_bull_bear_group(fix_rate, contract_data, all_contract_data),
        },

    }

    const cal_data = [
        ...module_state.cal_data,
        cal_item,
    ]

    dispatch(
        module_setter({
            cal_data: R.sort((a, b) => b.contract_data_day_amplitude_rate_fixed_sum - a.contract_data_day_amplitude_rate_fixed_sum)(cal_data),
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
            cal_data: [],
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
                    // origin_data: data,
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
