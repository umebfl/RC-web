import {
    createAction,
    handleActions,
} from 'redux-actions'

import moment from 'moment'

import {
    MODULE_KEY as SJHQ_MODULE_KEY,
} from 'SRC/module/main/power/SSKW/SJHQ/reducer'

export const MODULE_KEY = 'MJTY'

// 单一品种起始资金
const INITIAL_CAPITAL = 40000   // 40000
// 平仓等待天数
const CLOSE_DEAL_WAIT_DAY = 2  // 5 10
// 盈利回撤比例
const CLOSE_BACK_RATE = 0.12  // 0.038 0.08 0.1 0.12
// 亏损比例
const CLOSE_LOSS_RATE = 0.07  // 0.038 0.08 0.1
// 加仓比例
const ADD_RATE = 0.05  //

const init_state = {
    deduction: [],
}

const get_trend_info = (day) => {
    if(day.length) {
        return (day[day.length - 1].开盘价 - day[0].开盘价) / day[0].开盘价 * 100
    }
    return null
}

const get_deal_hl_price = (store, current_day) => {
    let deal_hl_price = null
    let deal_hl_price_back_rate = null

    // if(store.current_deal.dir === 'up') {
    //     deal_hl_price = store.deal_hl_price
    //         ? store.deal_hl_price > current_day.收盘价
    //             ? store.deal_hl_price
    //             : current_day.收盘价
    //         : current_day.收盘价
    //
    //     deal_hl_price_back_rate = (deal_hl_price - current_day.收盘价) / store.current_deal.price
    // } else {
    //     deal_hl_price = store.deal_hl_price
    //         ? store.deal_hl_price < current_day.收盘价
    //             ? store.deal_hl_price
    //             : current_day.收盘价
    //         : current_day.收盘价
    //
    //     deal_hl_price_back_rate = (current_day.收盘价 - deal_hl_price) / store.current_deal.price
    // }

    if(store.current_deal.dir === 'up') {
        deal_hl_price = store.deal_hl_price
            ? store.deal_hl_price > current_day.最高价
                ? store.deal_hl_price
                : current_day.最高价
            : current_day.最高价

        deal_hl_price_back_rate = (deal_hl_price - current_day.最低价) / store.current_deal.price
    } else {
        deal_hl_price = store.deal_hl_price
            ? store.deal_hl_price < current_day.最低价
                ? store.deal_hl_price
                : current_day.最低价
            : current_day.最低价

        deal_hl_price_back_rate = (current_day.最高价 - deal_hl_price) / store.current_deal.price
    }

    return {
        deal_hl_price,
        deal_hl_price_back_rate,
    }
}

const get_deduction = (cal_data) => {

    return R.compose(
        // R.sort((a, b) => b.total_profit - a.total_profit),
        v => {
            console.log(v)
            return v
        },
        //
        // R.addIndex(R.map)(
        //     (breed, k) => {
        //         const {
        //             code,
        //             month,
        //             name,
        //             rate,
        //             unit,
        //             contract_data,
        //             contract_low,
        //             contract_high,
        //             analy: {
        //                 bull_bear_group: {
        //                     contract_bull_bear_list_data,
        //                 },
        //             },
        //         } = breed
        //
        //         const rv = R.reduce(
        //             (last_store, current_day) => {
        //
        //                 let store = {
        //                     ...last_store,
        //                     seq: last_store.seq + 1,
        //                     series_high_day: current_day.最高价 > last_store.series_high_day.最高价 ? current_day : last_store.series_high_day,
        //                     series_low_day: current_day.最低价 < last_store.series_low_day.最低价 ? current_day : last_store.series_low_day,
        //                     // 一手价格
        //                     bond: current_day.开盘价 * unit * rate,
        //                     // 生成趋势信息
        //                     trend_info: {
        //                         // 连续走势
        //                         series: get_trend_info(last_store.day_list),
        //                         // 10天走势
        //                         day_10: get_trend_info(R.takeLast(10)(last_store.day_list)),
        //                         // 20天走势
        //                         day_20: get_trend_info(R.takeLast(20)(last_store.day_list)),
        //                         // 30天走势
        //                         day_30: get_trend_info(R.takeLast(30)(last_store.day_list)),
        //                     },
        //                 }
        //
        //                 // 开始30日内不得交易
        //                 if(store.day_list.length > 10 && store.close_deal_day === 0) {
        //                     if(store.current_deal) {
        //                         // 有持仓
        //
        //
        //                         // 判定减仓仓时机
        //
        //                         // 判断加仓时机
        //                         // 盈利超过ADD_RATE
        //                         // const win_checked = ((current_day, current_deal) => {
        //                         //     // 前期亏损临界点
        //                         //     const win_price = current_deal.dir === 'up'
        //                         //         ? current_deal.price * (1 + ADD_RATE)
        //                         //         : current_deal.price * (1 - ADD_RATE)
        //                         //
        //                         //     if(current_deal.dir === 'up' && win_price < current_day.最高价) {
        //                         //         return true
        //                         //     } else if(current_deal.dir === 'down' && win_price > current_day.最低价) {
        //                         //         return true
        //                         //     }
        //                         //
        //                         //     return false
        //                         // })(current_day, store.current_deal)
        //                         //
        //                         // if(win_checked) {
        //                         //     debugger
        //                         // }
        //
        //
        //
        //
        //                         /* 平仓 */
        //                         const get_profit = (dir, count, open_price, close_price) => {
        //                             return dir === 'up'
        //                                 ? (close_price - open_price) * unit * count
        //                                 : (open_price - close_price) * unit * count
        //                         }
        //
        //                         // 回撤最高最低价
        //                         let deal_hl = get_deal_hl_price(store, current_day)
        //                         // const close_price = current_day.收盘价
        //                         const close_price = store.current_deal.dir === 'up' ? current_day.最低价 : current_day.最高价
        //                         // 收盘盈利
        //                         const profit = get_profit(store.current_deal.dir, store.current_deal.count, store.current_deal.price, close_price)
        //
        //                         const check_loss = (current_day, current_deal) => {
        //                             // 前期亏损临界点
        //                             const loss_price = current_deal.dir === 'up'
        //                                 ? current_deal.price * (1 - CLOSE_LOSS_RATE)
        //                                 : current_deal.price * (1 + CLOSE_LOSS_RATE)
        //
        //                             if(current_deal.dir === 'up' && loss_price > current_day.最低价) {
        //                                 return true
        //                             } else if(current_deal.dir === 'down' && loss_price < current_day.最高价) {
        //                                 return true
        //                             }
        //
        //                             return false
        //                         }
        //
        //                         const loss_checked = check_loss(current_day, store.current_deal)
        //
        //                         // 盈利大于一定数额 强制平仓
        //
        //                         // 平仓
        //                         if(loss_checked || deal_hl.deal_hl_price_back_rate > CLOSE_BACK_RATE) {
        //                             // 平仓
        //                             // 不存在盈利 并且亏损达到临界点CLOSE_LOSS_RATE
        //
        //                             // 存在盈利 但是回撤超过回撤临界点 CLOSE_BACK_RATE
        //                             // 平仓
        //                             // 存在盈利 并且亏损大于回撤临界点
        //                             // 回撤幅度
        //                             // 回撤到临界值
        //                             // 判断减仓时机
        //
        //                             if(loss_checked) {
        //                                 // console.log(
        //                                 //     'LOG',
        //                                 //     // store.day_list.length,
        //                                 //     R.takeLast(5)(current_day.日期),
        //                                 //
        //                                 //     '开' + parseInt(current_day.开盘价),
        //                                 //     'H' + parseInt(current_day.最高价),
        //                                 //     'L' + parseInt(current_day.最低价),
        //                                 //
        //                                 //     '持' + store.current_deal.price,
        //                                 //     store.current_deal.count,
        //                                 //     store.current_deal.dir === 'up' ? store.current_deal.price * (1 - CLOSE_LOSS_RATE) : store.current_deal.price * (1 + CLOSE_LOSS_RATE),
        //                                 // )
        //                                 // console.log('')
        //                             }
        //
        //                             // 平仓
        //                             store = {
        //                                 ...store,
        //                                 deal_list: [
        //                                     ...store.deal_list,
        //                                     {
        //                                         ...store.current_deal,
        //                                         close: true,
        //                                         close_date: current_day.日期,
        //                                         days: moment(current_day.日期).diff(store.current_deal.open_date, 'days'),
        //                                         close_price,
        //                                         profit,
        //                                     },
        //                                 ],
        //                                 current_deal: null,
        //                                 deal_hl_price: null,
        //                                 deal_hl_price_back_rate: null,
        //                                 close_deal_day: CLOSE_DEAL_WAIT_DAY,
        //                                 total_profit: R.reduce((a, b) => a + b.profit, profit)(store.deal_list || []),
        //                             }
        //                         } else {
        //                             // 继续持有
        //                             store = {
        //                                 ...store,
        //                                 ...deal_hl,
        //                                 current_deal: {
        //                                     ...store.current_deal,
        //                                     profit: get_profit(store.current_deal.dir, store.current_deal.count, store.current_deal.price, current_day.收盘价),
        //                                 },
        //                             }
        //                         }
        //
        //                     } else {
        //                         // 无持仓 开仓
        //                         // 判断入场方向
        //                         // 判断入场时机 如果全部走势都为正
        //                         const trend_info = store.trend_info
        //
        //                         // if(trend_info.day_10 > 0 && trend_info.day_20 > 0 && trend_info.day_30 > 0) {
        //                         if(trend_info.day_10 > 0) {
        //                             store = {
        //                                 ...store,
        //                                 current_deal: {
        //                                     dir: 'up',
        //                                     // price: current_day.收盘价,
        //                                     open_date: current_day.日期,
        //                                     price: current_day.最高价,
        //                                     count: Math.floor(INITIAL_CAPITAL / store.bond),
        //                                     profit: 0,
        //                                 },
        //                             }
        //                         }
        //                         // if(trend_info.day_10 < 0 && trend_info.day_20 < 0 && trend_info.day_30 < 0) {
        //                         if(trend_info.day_10 < 0) {
        //                             store = {
        //                                 ...store,
        //                                 current_deal: {
        //                                     dir: 'down',
        //                                     open_date: current_day.日期,
        //                                     // price: current_day.收盘价,
        //                                     price: current_day.最低价,
        //                                     count: Math.floor(INITIAL_CAPITAL / store.bond),
        //                                     profit: 0,
        //                                 },
        //                             }
        //                         }
        //
        //                     }
        //
        //                     console.log(
        //                         'LOG',
        //                         // store.day_list.length,
        //                         R.takeLast(5)(current_day.日期),
        //
        //                         '开' + parseInt(current_day.开盘价),
        //                         'H' + parseInt(current_day.最高价),
        //                         'L' + parseInt(current_day.最低价),
        //                         // 'AH' + parseInt(store.series_high_day.最高价),
        //                         // 'AL' + parseInt(store.series_low_day.最低价),
        //
        //
        //                         'S:' + (store.trend_info.series > 0 ? ' ' + store.trend_info.series.toFixed(0) : store.trend_info.series.toFixed(0)),
        //                         (store.trend_info.day_10 > 0 ? ' ' + store.trend_info.day_10.toFixed(0) : store.trend_info.day_10.toFixed(0)),
        //                         (store.trend_info.day_20 > 0 ? ' ' + store.trend_info.day_20.toFixed(0) : store.trend_info.day_20.toFixed(0)),
        //                         (store.trend_info.day_30 > 0 ? ' ' + store.trend_info.day_30.toFixed(0) : store.trend_info.day_30.toFixed(0)),
        //
        //                         R.take(2)(contract_bull_bear_list_data[store.day_list.length - 1].dir || '--'),
        //
        //                         '持' + R.take(2)(store.current_deal?.dir || '--'),
        //                         store.current_deal?.count || '-',
        //                         store.current_deal?.price || '----',
        //
        //                         store.current_deal
        //                             ? store.current_deal.dir === 'up'
        //                                 ? parseInt(store.current_deal.price * (1 - CLOSE_LOSS_RATE))
        //                                 : parseInt(store.current_deal.price * (1 + CLOSE_LOSS_RATE))
        //                             : '----',
        //
        //                         '顶' + (store.deal_hl_price || '----'),
        //                         store.deal_hl_price_back_rate?.toFixed(2) || '-',
        //
        //                         store.close_deal_day === CLOSE_DEAL_WAIT_DAY
        //                             ? '平' + store.deal_list[store.deal_list.length - 1].close_price
        //                                 + ' 盈' + store.deal_list[store.deal_list.length - 1].profit
        //                                 + ' 总' + R.reduce((a, b) => a + b.profit, 0)(store.deal_list)
        //                             : '盈' + (store.current_deal?.profit || '-') + ' 总' + (R.reduce((a, b) => a + b.profit, 0)(store.deal_list) + store.current_deal?.profit || 0),
        //                     )
        //                 } else {
        //                     console.log(
        //                         'LOG',
        //                         // store.day_list.length,
        //                         R.takeLast(5)(current_day.日期),
        //
        //                         '开' + parseInt(current_day.开盘价),
        //                         'H' + parseInt(current_day.最高价),
        //                         'L' + parseInt(current_day.最低价),
        //                         // 'AH' + parseInt(store.series_high_day.最高价),
        //                         // 'AL' + parseInt(store.series_low_day.最低价),
        //
        //                         // R.take(2)(contract_bull_bear_list_data[store.day_list.length - 1].dir || '--'),
        //                         '静' + store.close_deal_day,
        //                     )
        //                 }
        //
        //                 // 平仓静止期
        //                 if(store.close_deal_day) {
        //                     store = {
        //                         ...store,
        //                         close_deal_day: store.close_deal_day - 1,
        //                     }
        //                 }
        //
        //                 // 未平仓汇入
        //                 if(contract_data.length === store.seq && store.current_deal) {
        //                     store = {
        //                         ...store,
        //                         deal_list: [
        //                             ...store.deal_list,
        //                             {
        //                                 ...store.current_deal,
        //                                 close: false,
        //                                 close_date: current_day.日期,
        //                                 days: moment(current_day.日期).diff(store.current_deal.open_date, 'days'),
        //                                 // close_price: current_day.收盘价,
        //                                 // profit,
        //                             },
        //                         ],
        //                         total_profit: store.total_profit + store.current_deal.profit,
        //                     }
        //                 }
        //
        //                 return {
        //                     ...store,
        //                     day_list: [
        //                         ...last_store.day_list,
        //                         {
        //                             ...current_day,
        //                             current_deal: {
        //                                 ...store.current_deal,
        //                             },
        //                         },
        //                     ],
        //                 }
        //             },
        //             {
        //                 code,
        //                 month,
        //                 name,
        //                 contract_low,
        //                 contract_high,
        //                 seq: 0,
        //                 // 日数据列表
        //                 day_list: [],
        //                 // 当前最高价
        //                 series_high_day: {最高价: 0},
        //                 // 当前最低价
        //                 series_low_day: {最低价: 9999999},
        //                 // 全部交易列表 {交易信息, 加仓记录, 减仓记录}
        //                 deal_list: [],
        //
        //                 // 当前交易
        //                 current_deal: null,
        //                 // 平仓间隔CLOSE_DEAL_WAIT_DAY天标记 CLOSE_DEAL_WAIT_DAY开始, 减到0
        //                 close_deal_day: 0,
        //                 // 交易日起最高/最低价
        //                 deal_hl_price: null,
        //                 deal_hl_price_back_rate: null,
        //             },
        //         )(contract_data)
        //
        //         // 生成交易图表数据
        //         const deal_chart_list = R.addIndex(R.map)(
        //             (v, k) => {
        //                 const open_date = v.open_date
        //                 const close_date = v.close_date || contract_data[contract_data.length - 1].日期
        //                 let find = false
        //                 let close = false
        //
        //                 const y = R.map(
        //                     item => {
        //                         if(close) {
        //                             return null
        //                         }
        //                         if(item.日期 === close_date) {
        //                             close = true
        //                             return v.close_price
        //                         }
        //                         if(item.日期 === open_date) {
        //                             find = true
        //                             return v.price
        //                         }
        //                         if(find) {
        //                             return item.开盘价
        //                         }
        //
        //                         return null
        //                     },
        //                 )(contract_data)
        //
        //                 return {
        //                     y,
        //                     dir: v.dir,
        //                 }
        //             },
        //         )(rv.deal_list || [])
        //
        //         return {
        //             ...rv,
        //             deal_chart_list,
        //         }
        //     },
        // ),
        //

        R.addIndex(R.map)(
            (breed, k) => {
                const {
                    code,
                    month,
                    name,
                    rate,
                    unit,
                    contract_data,
                    contract_low,
                    contract_high,
                    analy: {
                        bull_bear_group: {
                            contract_bull_bear_list_data,
                        },
                    },
                } = breed

                return R.reduce(
                    (last_store, current_day) => {
                        const store = {
                            ...last_store,
                        }

                        // 设置status

                        return R.cond([
                            [
                                // 平仓
                                v => v.status === 'close',
                                v => v,
                            ],
                            [
                                // 减仓
                                v => v.status === 'cut',
                                v => v,
                            ],
                            [
                                // 加仓
                                v => v.status === 'add',
                                v => v,
                            ],
                            [
                                // 开仓
                                v => v.status === 'open',
                                v => v,
                            ],
                            [
                                // 持有
                                v => v.status === 'keep',
                                v => v,
                            ],
                            [
                                // 观望
                                v => v.status === 'wait',
                                v => v,
                            ],
                            [
                                R.T,
                                v => v,
                            ],
                        ])(store)
                    },
                    {
                        code,
                        month,
                        name,
                        contract_low,
                        contract_high,
                        // 处理状态
                        status: null,
                        // 序列
                        seq: 0,
                        // 日数据列表
                        day_list: [],
                        // 当前最高价
                        series_high_day: {最高价: 0},
                        // 当前最低价
                        series_low_day: {最低价: 9999999},
                        // 全部交易列表 {交易信息, 加仓记录, 减仓记录}
                        deal_list: [],

                        // 当前交易
                        current_deal: null,
                        // 平仓间隔CLOSE_DEAL_WAIT_DAY天标记 CLOSE_DEAL_WAIT_DAY开始, 减到0
                        close_deal_day: 0,
                        // 交易日起最高/最低价
                        deal_hl_price: null,
                        deal_hl_price_back_rate: null,
                    },
                )(contract_data)
            },
        ),
        // R.filter(v => v.code === 'J'),
    )(cal_data)
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export const action = {

    deduction: payload => (dispatch, get_state) => {
        const state = get_state()
        const module_state = state[MODULE_KEY]
        const sjhq_module_state = state[SJHQ_MODULE_KEY]
        const cal_data = sjhq_module_state.cal_data

        const data = get_deduction(cal_data)

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
