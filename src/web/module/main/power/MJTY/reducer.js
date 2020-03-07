import moment from 'moment'

import {
    createAction,
    handleActions,
} from 'redux-actions'

import {
    display_cut,
} from 'SRC/module/main/power/MJTY/display/cut'

import {
    display_add,
} from 'SRC/module/main/power/MJTY/display/add'

import {
    display_close,
} from 'SRC/module/main/power/MJTY/display/close'

import {
    display_keep,
} from 'SRC/module/main/power/MJTY/display/keep'

import {
    display_open,
} from 'SRC/module/main/power/MJTY/display/open'

import {
    display_wait,
} from 'SRC/module/main/power/MJTY/display/wait'

import {
    P_加仓次数控制,
} from 'SRC/module/main/power/MJTY/policy/add'

import {
    MODULE_KEY as SJHQ_MODULE_KEY,
} from 'SRC/module/main/power/SSKW/SJHQ/reducer'

export const MODULE_KEY = 'MJTY'

import {
    INITIAL_CAPITAL,
    CLOSE_DEAL_WAIT_DAY,
    MAX_ADD_COUNT,
} from 'SRC/module/main/power/MJTY/variable'

// 数据量等待天数
const WAIT_BASE_DAY_LEN = 10

// 盈利回撤比例
const CLOSE_BACK_RATE = 0.06  // 0.038 0.08 0.1 0.12
// 盈利加仓后回撤比例
const CLOSE_ADD_BACK_RATE = 0.04  //
// 亏损比例
const CLOSE_LOSS_RATE = 0.04  // 0.038 0.07 0.08 0.1
// 加仓比例 0.1 = 10%
const ADD_RATE = 0.05

const init_state = {
    deduction: [],
}

const get_trend_info = (day) => {
    if(day && day.length) {
        return (day[day.length - 1].开盘价 - day[0].开盘价) / day[0].开盘价 * 100
    }
    return null
}

const get_deal_hl_price = (store, current_day) => {
    let deal_hl_price = null
    let deal_hl_price_back_rate = null

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

        // 依据总盈利排序
        R.sort((a, b) => b.total_profit - a.total_profit),

        // 推演
        R.addIndex(R.map)(
            (breed, k) => {
                const {
                    code,
                    month,
                    name,
                    rate,
                    unit,
                    contract_low,
                    contract_high,
                } = breed

                // const contract_data = breed.contract_data
                const contract_data = R.take(50)(breed.contract_data)
                // const contract_data = R.take(60)(breed.contract_data)

                return R.compose(

                    // 图表数据生成
                    v => ({
                        ...v,
                        deal_chart_list: R.addIndex(R.map)(
                            (v, k) => {
                                const open_date = v.open_date
                                const close_date = v.close_date || contract_data[contract_data.length - 1].日期
                                let find = false
                                let close = false

                                const y = R.map(
                                    item => {
                                        if(close) {
                                            return null
                                        }
                                        if(item.日期 === close_date) {
                                            close = true
                                            return v.close_price
                                        }
                                        if(item.日期 === open_date) {
                                            find = true
                                            if(v.add_count) {
                                                return v.add_before_price[0]
                                            }
                                            return v.price
                                        }
                                        if(find) {
                                            return item.开盘价
                                        }

                                        return null
                                    },
                                )(contract_data)

                                return {
                                    y,
                                    dir: v.dir,
                                }
                            },
                        )(v.deal_list),
                    }),

                    // 未平仓汇入
                    R.ifElse(
                        v => v.contract_data.length === v.seq && v.current_deal,
                        v => ({
                            ...v,
                            deal_list: [
                                ...v.deal_list,
                                {
                                    ...v.current_deal,
                                    close: false,
                                    close_date: v.current_day.日期,
                                    days: moment(v.current_day.日期).diff(v.current_deal.open_date, 'days'),
                                },
                            ],
                            total_profit: v.total_profit + v.current_deal.profit,
                        }),
                        v => v,
                    ),

                    // 推演
                    R.reduce(
                        (last_store, current_day) => {

                            const store = R.compose(

                                // 数据更新
                                v => ({
                                    ...v,
                                    seq: v.seq + 1,
                                    day_list: [...v.day_list, v.current_day],
                                }),

                                // 依据status 进行处理
                                R.cond([
                                    [
                                        // 减仓
                                        v => v.display === 'cut',
                                        display_cut,
                                    ],
                                    [
                                        // 加仓
                                        v => v.display === 'add',
                                        display_add,
                                    ],
                                    [
                                        // 平仓
                                        v => v.display === 'close',
                                        display_close,
                                    ],
                                    [
                                        // 持有
                                        v => v.display === 'keep',
                                        display_keep,
                                    ],
                                    [
                                        // 开仓
                                        v => v.display === 'open',
                                        display_open,
                                    ],
                                    [
                                        // 观望
                                        v => v.display === 'wait' || R.T,
                                        display_wait,
                                    ],
                                ]),

                                // 处理方式分析
                                R.ifElse(
                                    // 是否存在持仓
                                    v => v.current_deal !== null,
                                    // // 存在持仓
                                    R.ifElse(
                                        // 是否存在盈利
                                        v => v.current_deal.profit > 0,
                                        // 存在盈利
                                        R.ifElse(
                                            // 加仓判定
                                            // 盈利超过本金ADD_RATE
                                            R.allPass([
                                                // 加仓次数控制
                                                P_加仓次数控制,
                                                // 临界值判定
                                                v => {
                                                    // const target_profit = v.current_deal.price * v.current_deal.count * v.unit * v.rate * ADD_RATE
                                                    // const pass = v.current_deal.profit > target_profit

                                                    const target_price = v.current_deal.dir === 'up'
                                                        ? v.current_deal.price * (1 + ADD_RATE)
                                                        : v.current_deal.price * (1 - ADD_RATE)

                                                    const pass = v.current_deal.dir === 'up'
                                                        ? target_price < v.current_day.最高价
                                                        : target_price > v.current_day.最低价

                                                    console.log('analy  | 盈 加仓判定',
                                                        'T' + parseInt(target_price),
                                                        pass ? '过' : '否',
                                                        '盈' + v.current_deal.profit,
                                                    )

                                                    return pass
                                                },
                                            ]),
                                            // 加仓
                                            R.assoc('display', 'add'),
                                            // 回撤止盈判定
                                            R.ifElse(
                                                // 持有/平仓判定
                                                R.allPass([
                                                    // 盈利大于 CLOSE_LOSS_RATE 否则继续持有
                                                    v => {
                                                        // 存在加仓 默认通过
                                                        if(v.current_deal.add_count > 0) {
                                                            console.log('analy  | 盈 回撤判定 盈利幅度 加仓默认通过')
                                                            return true
                                                        }

                                                        const target_price = v.current_deal.dir === 'up'
                                                            ? parseInt(v.current_deal.price * (1 + CLOSE_LOSS_RATE))
                                                            : parseInt(v.current_deal.price * (1 - CLOSE_LOSS_RATE))

                                                        const pass = v.current_deal.dir === 'up'
                                                            ? target_price < v.current_day.最高价
                                                            : target_price > v.current_day.最低价

                                                        console.log('analy  | 盈 回撤判定 盈利幅度',
                                                            'T' + target_price,
                                                            pass ? '过' : '否',
                                                            v.current_deal.dir === 'up' ? target_price - v.current_day.最高价 : target_price - v.current_day.最低价,
                                                        )

                                                        return pass
                                                    },
                                                    // 回撤大于CLOSE_BACK_RATE则平仓 否则继续持有
                                                    v => {
                                                        const rate = v.current_deal.add_count > 0 ? CLOSE_ADD_BACK_RATE : CLOSE_BACK_RATE

                                                        const target_price = v.current_deal.dir === 'up'
                                                            ? parseInt(v.current_deal.price * (1 - rate))
                                                            : parseInt(v.current_deal.price * (1 + rate))

                                                        const pass = v.current_deal.dir === 'up'
                                                            // 多, 低价平,
                                                            // true = 平仓 false = 持有
                                                            // 成交价 * (1 - 0.6) = 平仓价2000
                                                            // true 平仓价2000 大于 最高价1000
                                                            // false 平仓价2000 小于 最高价1000
                                                            ? target_price > v.series_low_day.最低价
                                                            // 空 高价平
                                                            // true = 平仓 false = 持有
                                                            // 成交价 * (1 + 0.6) = 平仓价2000
                                                            // true 平仓价2000 大于 最高价3000
                                                            // false 平仓价2000 小于 最高价3000
                                                            : target_price > v.series_high_day.最高价

                                                        console.log('analy  | 盈 回撤判定 回撤幅度',
                                                            'AH' + v.series_high_day.最高价,
                                                            'AL' + v.series_low_day.最低价,
                                                            '盈' + v.current_deal.profit,
                                                            'T' + target_price,
                                                            rate,
                                                            pass ? '过' : '否',
                                                            v.current_deal.dir === 'up' ? target_price - v.series_low_day.最低价 : target_price - v.series_high_day.最高价,
                                                        )

                                                        return pass
                                                    },
                                                ]),
                                                R.assoc('display', 'close'),
                                                R.assoc('display', 'keep'),
                                            ),
                                        ),
                                        // 不存在盈利
                                        R.ifElse(
                                            // 持有/平仓判定
                                            R.allPass([
                                                // 临界值突破 CLOSE_LOSS_RATE
                                                v => {
                                                    const close_price = v.current_deal.dir === 'up'
                                                        ? v.current_deal.price * (1 - CLOSE_LOSS_RATE)
                                                        : v.current_deal.price * (1 + CLOSE_LOSS_RATE)

                                                    const pass =  v.current_deal.dir === 'up'
                                                        ? close_price < v.current_day.最低价   // 平1800 最低2000 过
                                                        : close_price > v.current_day.最高价   // 2000 1900

                                                    console.log('analy   | 亏',
                                                        '盈' + v.current_deal.profit,
                                                        '平' + close_price.toFixed(0), pass ? '过' : '否',
                                                        v.current_deal.dir === 'up' ? parseInt(v.current_day.最低价 - close_price) : parseInt(close_price - v.current_day.最高价),
                                                    )

                                                    return pass
                                                },
                                            ]),
                                            R.assoc('display', 'keep'),
                                            R.assoc('display', 'close'),
                                        ),
                                    ),
                                    // // 无持仓
                                    R.ifElse(
                                        // 开仓判定
                                        R.allPass([
                                            // 10日
                                            v => v.trend_info.day_10 > 1 || v.trend_info.day_10 < -1,
                                            // 临界值突破
                                            // 数据积累期
                                            v => v.day_list.length > WAIT_BASE_DAY_LEN,
                                            // 平仓静置期
                                            v => v.close_deal_day === 0,
                                        ]),
                                        // 开仓
                                        R.assoc('display', 'open'),
                                        // 观望
                                        R.assoc('display', 'wait'),
                                    ),
                                ),

                                // 打印信息
                                v => {
                                    console.log(
                                        'info    |',
                                        v.name,
                                        R.takeLast(5)(v.current_day.日期),
                                        'C' + v.current_day.开盘价,
                                        'H' + v.current_day.最高价,
                                        'L' + v.current_day.最低价,
                                        'AH' + v.series_high_day.最高价,
                                        'AL' + v.series_low_day.最低价,
                                        'trend_info:' + v.trend_info.day_10?.toFixed(2) || '-',
                                        v.current_deal
                                            ? ('持' + v.current_deal.price + (v.current_deal.dir === 'up' ? '多' : '空') + v.current_deal.count)
                                            : '-',
                                        v.current_deal
                                            ? '盈' + v.current_deal.profit : '-',
                                    )

                                    return v
                                },

                                // 更新 当前最高价 当前最低价
                                v => ({
                                    ...v,
                                    // 当前最高价
                                    series_high_day: v.current_day.最高价 > v.series_high_day.最高价 ? v.current_day : v.series_high_day,
                                    // 当前最低价
                                    series_low_day: v.current_day.最低价 < v.series_low_day.最低价 ? v.current_day : v.series_low_day,
                                }),

                                // 分析 短期走势
                                v => ({
                                    ...v,
                                    trend_info: {
                                        // 连续走势
                                        series: get_trend_info(v.day_list),
                                        // 10天走势
                                        day_10: get_trend_info(R.takeLast(10)(v.day_list)),
                                        // 20天走势
                                        day_20: get_trend_info(R.takeLast(20)(v.day_list)),
                                        // 30天走势
                                        day_30: get_trend_info(R.takeLast(30)(v.day_list)),
                                    },
                                }),

                                // 信息: 保证金
                                v => ({
                                    ...v,
                                    bond: v.current_day.开盘价 * v.unit * v.rate,
                                }),

                                // 信息: 当日数据
                                v => ({
                                    ...v,
                                    current_day,
                                }),

                            )(last_store)

                            return store
                        },
                        {
                            code,
                            month,
                            name,
                            unit,
                            rate,
                            contract_low,
                            contract_high,
                            contract_data,
                            // 处理
                            display: null,
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
                    ),
                )(contract_data)
            },
        ),

        R.filter(v => v.code === 'NI'),

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
