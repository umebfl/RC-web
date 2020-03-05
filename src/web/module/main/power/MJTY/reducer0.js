import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    MODULE_KEY as SJHQ_MODULE_KEY,
} from 'SRC/module/main/power/SSKW/SJHQ/reducer'

export const MODULE_KEY = 'MJTY'

// 单一品种起始资金
const INITIAL_CAPITAL = 40000

const init_state = {

    capital: {
        // 当前资金
        current: 100000,
    },

    deduction: [],

}

const module_setter = createAction(`${MODULE_KEY}_setter`)

// const get_current_d1etermine_info = (data, last_current_deal_info, last_current_profit_info, breed) => {
//
//     const {
//         unit,
//         rate,
//     } = breed
//
//     // 多空系数
//     // 风险系数
//     // 三次确认
//     // day_amplitude_rate
//     // 方向 - 长期走势确认 - 全期价格状态
//     const {
//         analy: {
//             price_state: {
//                 contract_price_state_by_sort,
//                 all_contract_price_state_by_sort,
//                 all_contract_price_state_by_avg,
//             },
//         },
//         contract_high,
//         contract_low,
//     } = breed
//     // 方向 - 中期走势确认 - 合约期价格状态
//     const {
//         开盘价,
//         最高价,
//         最低价,
//         收盘价,
//     } = data[data.length - 1]
//
//     // 一手价格
//     const bond = 开盘价 * unit * rate
//
//     // 当前价格状态
//     const current_price_state_by_price = (开盘价 - contract_low.最低价) / (contract_high.最高价 - contract_low.最低价) * 100
//
//     // 方向 - 短期走势确认 - 三日价格状态
//
//     // 多空系数
//     const coefficient = current_price_state_by_price
//
//     let target_open_up_price = null
//     let target_open_down_price = null
//
//     let current_profit = null
//
//     const {
//         dir,
//         price,
//         count,
//     } = last_current_deal_info
//
//     const add_count = Math.floor(INITIAL_CAPITAL / bond)
//     const open_count = Math.floor(INITIAL_CAPITAL / bond)
//     let cut_count = 0
//
//     const get_acc_price = (price) => {
//         return {
//             target_add_price: price * 1.05,
//             add_count: Math.floor(INITIAL_CAPITAL / bond),
//             target_cut_price: price * 0.95,
//             target_close_price: price * 0.9,
//
//         }
//     }
//
//     // 如果存在交易
//     if(last_current_deal_info && !last_current_deal_info.close) {
//
//         // 减仓 直接平仓
//         cut_count = count
//
//         current_profit = dir === 'up' ? (收盘价 - price) * unit * count : (price - 收盘价) * unit * count
//     } else {
//         if(coefficient < 30) {
//             // 多头
//             target_open_up_price = 最高价
//         } else if(coefficient > 70) {
//             // 空头
//             target_open_down_price = 最低价
//         }
//
//     }
//
//     const acc = get_acc_price()
//
//     // 生成指标
//     if(last_current_deal_info) {
//         // 有持仓 - 计算加仓时机 方向 / 减仓时机 方向 / 平仓时机
//         return {
//             // 有持仓
//             // 加仓时机, 加仓数量
//             target_add_price,
//             add_count,
//
//             // 减仓时机, 减仓数量
//             target_cut_price,
//             cut_count,
//
//             // 平仓时机
//             target_close_price,
//
//             // 当前持仓盈亏
//             current_profit,
//         }
//     } else {
//         // 无持仓 - 计算入场时机 方向
//         return {
//             // 无持仓
//             // 入场时机, 入场方向
//             target_open_up_price,
//             target_open_down_price,
//             open_count,
//
//             target_add_price,
//             target_cut_price,
//             target_close_price,
//         }
//     }
// }

const get_current_determine_info = (target_price, last_current_determine_info, breed, current_data, item, last_current_deal_info) => {

    // 不依靠整体先
    const {
        rate,
        unit,
        contract_hl_gap_rate,
    } = breed

    // 一手价格
    const bond = item.开盘价 * unit * rate

    // 临界点比例
    const critical_point_rate = 0.02
    // const critical_point_rate = contract_hl_gap_rate / 6

    // if(last_current_deal_info && last_current_deal_info.close) {
    //     debugger
    // }

    if(last_current_deal_info && !last_current_deal_info.close) {
        const base_price = last_current_deal_info.price
        const dir = last_current_deal_info.dir
        const count = last_current_deal_info.count

        const last_item = current_data[current_data.length - 2]

        const back_base_price = last_item.最高价 > item.最高价 ? last_item.最高价 : item.最高价

        return {
            current_profit: dir === 'up' ? (item.收盘价 - base_price) * unit * count : (base_price - item.收盘价) * unit * count,
            target_add_price: base_price * (dir === 'up' ? (1 + 0.038) : (1 - 0.038)),
            add_count: Math.floor(INITIAL_CAPITAL / bond),

            // 回撤
            target_cut_price: item.开盘价 * (dir === 'up' ? (1 - 0.028) : (1 + 0.028)),
            cut_count: last_current_deal_info.count,
        }
    } else {
        const base_price = target_price

        return {
            target_open_up_price: base_price * (1 + critical_point_rate),
            target_open_down_price: base_price * (1 - critical_point_rate),
            open_count: Math.floor(INITIAL_CAPITAL / bond),
        }
    }


}

const get_current_profit_info = (last_current_profit_info, dir, price, target_cut_price, cut_count, breed) => {
    const {
        rate,
        unit,
    } = breed

    const {
        total,
    } = last_current_profit_info

    const profit = dir === 'up'
        ? (target_cut_price - price) * unit * cut_count
        : (price - target_cut_price) * unit * cut_count

    return {
        // 累计盈亏
        total: total + profit,
        // 单日交易盈亏
        // day_profit:
    }
}

export const action = {

    deduction: payload => (dispatch, get_state) => {
        const state = get_state()
        const module_state = state[MODULE_KEY]
        const sjhq_module_state = state[SJHQ_MODULE_KEY]
        const cal_data = sjhq_module_state.cal_data

        // 推演
        const data = R.map(
            breed => {
                let day_k = 0

                return R.reduce(
                    (result, item) => {
                        // 上一日数据
                        const last_info = result.info[result.info.length - 1] || {}
                        // 日数据
                        const last_current_data = last_info.current_data || []
                        // 当前判定信息 及 预期信息
                        const last_current_determine_info = last_info.current_determine_info
                        // 当前交易信息
                        const last_current_deal_info = last_info.current_deal_info
                        // 当前盈利统计
                        const last_current_profit_info = last_info.current_profit_info || {total: 0}
                        // 目标价格
                        let target_price = last_info.target_price || item.开盘价

                        const current_data = [...last_current_data, item]

                        // 无持仓 - 入场时机, 入场方向
                        // 有持仓 - 加仓时机, 加仓数量, 减仓时机, 减仓数量, 平仓时机
                        // const current_determine_info = get_current_determine_info(current_data, last_current_deal_info, last_current_profit_info, breed)
                        const current_determine_info = get_current_determine_info(target_price, last_current_determine_info, breed, current_data, item, last_current_deal_info)

                        const {
                            target_open_up_price,
                            target_open_down_price,
                            target_close_price,
                            target_cut_price,
                            target_add_price,
                            add_count,
                            cut_count,
                            open_count,
                        } = current_determine_info

                        // 生成交易: 观望 开仓 持仓 加仓 减仓 离场
                        let current_deal_info = null
                        // 有持仓 - 当前盈利统计
                        let current_profit_info = last_current_profit_info

                        // 存在交易信息 并且 尚未平仓
                        if(last_current_deal_info && !last_current_deal_info.close) {

                            const {
                                dir,
                                count,
                                price,
                            } = last_current_deal_info

                            // 有持仓 - 持仓 / 加仓 / 减仓 / 离场
                            // 判定价格是否到达指标
                            // if(dir === 'up' ? target_close_price > item.最低价 : target_close_price < item.最高价) {
                            //     // 平仓
                            //     current_deal_info = {
                            //         close: true,
                            //     }
                            //
                            // } else
                            // if(dir === 'up' ? target_cut_price > item.开盘价 : target_cut_price < item.开盘价) {
                            if(dir === 'up' ? target_cut_price > item.最低价 : target_cut_price < item.最高价) {
                                // 减仓
                                current_deal_info = {
                                    ...last_current_deal_info,
                                    count: count - cut_count,
                                }

                                // 统计盈亏
                                current_profit_info = get_current_profit_info(last_current_profit_info, dir, price, target_cut_price, cut_count, breed)

                                // 如果无持仓 离场
                                if(current_deal_info.count === 0) {
                                    // 离场
                                    current_deal_info = {
                                        close: true,
                                    }

                                    target_price = target_cut_price
                                }

                            // } else if(dir === 'up' ? target_add_price < item.开盘价 : target_add_price > item.开盘价) {
                            } else if(dir === 'up' ? target_add_price < item.最高价 : target_add_price > item.最低价) {

                                const fix_price = (dir, add_count, current_price, open_count, open_price, rate, unit) => {
                                    if(dir === 'up') {
                                        return current_price - (current_price - open_price) * open_count / (open_count + add_count)
                                    } else {
                                        return current_price + (open_price - current_price) * open_count / (open_count + add_count)
                                    }
                                }

                                // 加仓
                                current_deal_info = {
                                    ...last_current_deal_info,
                                    count: count + add_count,
                                    price: fix_price(dir, add_count, target_add_price, count, price, breed.rate, breed.unit),
                                }
                            } else {
                                // 观望
                                current_deal_info = last_current_deal_info
                            }

                        } else {
                            // 无持仓 - 观望 / 开仓
                            // 判定价格是否到达指标
                            // if(target_open_up_price < item.开盘价 || target_open_down_price > item.开盘价) {
                            if(target_open_up_price < item.最高价 || target_open_down_price > item.最低价) {
                                current_deal_info = {
                                    dir: target_open_up_price < item.最高价 ? 'up' : 'down',
                                    count: open_count,
                                    price: target_open_up_price < item.最高价 ? item.最高价 : item.最低价,
                                }
                            }
                        }

                        // console.log('code 日期 开盘价 持仓数 方向 价格 加仓价 减仓价 平仓价 当前持仓收益 累计盈亏')

                        console.log(
                            breed.code,
                            R.takeLast(5)(item.日期),

                            item.开盘价,
                            'H' + item.最高价,
                            'L' + item.最低价,
                            'C' + item.收盘价,

                            // 最高最低加波幅
                            item.hl_day_amplitude_rate_fixed.toFixed(2),
                            item.day_amplitude_rate_fixed.toFixed(2) >= 0 ? '+' + item.day_amplitude_rate_fixed.toFixed(2) : item.day_amplitude_rate_fixed.toFixed(2),

                            // 空开 多开
                            '多' + (parseInt(target_open_up_price) || '----'),
                            '空' + (parseInt(target_open_down_price) || '----'),

                            // 加减平信息
                            '加' + (parseInt(target_add_price) || '----'),
                            '减' + (parseInt(target_cut_price) || '----'),

                            // 方向
                            breed.analy.bull_bear_group.contract_bull_bear_list_data[day_k].dir === current_deal_info?.dir ? 'G' : 'X',
                            R.take(2)(breed.analy.bull_bear_group.contract_bull_bear_list_data[day_k++].dir || '--'),

                            // 交易信息
                            R.take(2)(current_deal_info?.dir || '--'),
                            parseInt(current_deal_info?.count) || '-',
                            current_deal_info?.price ? '持' + parseInt(current_deal_info?.price) : '持----',

                            // parseInt(target_close_price) || '-',

                            // 收益信息
                            parseInt(current_determine_info?.current_profit) || '----',
                            parseInt(current_profit_info?.total) || '-',

                        )


                        return {
                            info: [
                                ...result.info,
                                {
                                    target_price,
                                    current_data,
                                    current_determine_info,
                                    current_profit_info,
                                    current_deal_info,
                                },
                            ],
                        }
                    },
                    {
                        info: [],
                    },
                )(breed.contract_data)
            },
        )(R.filter(v => v.code === 'J')(cal_data))

        console.log(data)

        dispatch(
            module_setter({
                deduction: data,
            }),
        )
    },
}

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)
