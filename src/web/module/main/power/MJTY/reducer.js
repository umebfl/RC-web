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
    P_加仓临界值判定,
} from 'SRC/module/main/power/MJTY/policy/add'

import {
    P_回撤平仓_盈利判定,
    P_回撤平仓_回撤临界值判定,
    P_亏损平仓_临界值判定,
} from 'SRC/module/main/power/MJTY/policy/close'

import {
    P_开仓_平仓静置期判定,
    P_开仓_数据积累期判定,
    P_开仓_10日趋势判定,
} from 'SRC/module/main/power/MJTY/policy/open'

import {
    A_趋势分析_10_20_30,
} from 'SRC/module/main/power/MJTY/analy/trend'

import {
    A_价格_最高最低价,
} from 'SRC/module/main/power/MJTY/analy/price'

import {
    C_交易_交易分段数据生成,
} from 'SRC/module/main/power/MJTY/chart/deal'

import {
    U_log_info,
} from 'SRC/module/main/power/MJTY/util/log'

import {
    MODULE_KEY as SJHQ_MODULE_KEY,
} from 'SRC/module/main/power/SSKW/SJHQ/reducer'

export const MODULE_KEY = 'MJTY'

const init_state = {
    deduction: [],
}

const get_deduction = (cal_data) => {
    return R.compose(
        // 依据总盈利排序
        R.sort((a, b) => b.total_profit - a.total_profit),

        // 推演
        R.addIndex(R.map)(
            (breed, k) => {

                const contract_data = breed.contract_data
                // const contract_data = R.take(20)(breed.contract_data)
                // const contract_data = R.take(60)(breed.contract_data)

                return R.compose(

                    C_交易_交易分段数据生成,

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
                            return R.compose(
                                // 数据更新
                                v => ({
                                    ...v,
                                    seq: v.seq + 1,
                                    day_list: [...v.day_list, v.current_day],
                                }),

                                R.cond([
                                    [
                                        v => v.display === 'cut',
                                        display_cut,
                                    ],
                                    [
                                        v => v.display === 'add',
                                        display_add,
                                    ],
                                    [
                                        v => v.display === 'close',
                                        display_close,
                                    ],
                                    [
                                        v => v.display === 'keep',
                                        display_keep,
                                    ],
                                    [
                                        v => v.display === 'open',
                                        display_open,
                                    ],
                                    [
                                        v => v.display === 'wait' || R.T,
                                        display_wait,
                                    ],
                                ]),

                                // 处理方式分析
                                R.ifElse(
                                    // 是否存在持仓
                                    v => v.current_deal !== null,
                                    // 存在持仓
                                    R.ifElse(
                                        // 是否存在盈利
                                        v => v.current_deal.profit > 0,
                                        // 存在盈利
                                        R.ifElse(
                                            // 加仓判定
                                            R.allPass([
                                                P_加仓次数控制,
                                                P_加仓临界值判定,
                                            ]),
                                            R.assoc('display', 'add'),
                                            // 回撤止盈判定
                                            R.ifElse(
                                                // 持有/平仓判定
                                                R.allPass([
                                                    P_回撤平仓_盈利判定,
                                                    P_回撤平仓_回撤临界值判定,
                                                ]),
                                                R.assoc('display', 'close'),
                                                R.assoc('display', 'keep'),
                                            ),
                                        ),
                                        // 不存在盈利
                                        R.ifElse(
                                            // 持有/平仓判定
                                            R.allPass([
                                                P_亏损平仓_临界值判定,
                                            ]),
                                            R.assoc('display', 'keep'),
                                            R.assoc('display', 'close'),
                                        ),
                                    ),
                                    // // 无持仓
                                    R.ifElse(
                                        // 开仓判定
                                        R.allPass([
                                            P_开仓_数据积累期判定,
                                            P_开仓_平仓静置期判定,
                                            P_开仓_10日趋势判定,
                                            // 临界值突破
                                        ]),
                                        R.assoc('display', 'open'),
                                        R.assoc('display', 'wait'),
                                    ),
                                ),

                                U_log_info,

                                A_价格_最高最低价,
                                A_趋势分析_10_20_30,

                                // 添加信息: 保证金
                                v => ({
                                    ...v,
                                    bond: v.current_day.开盘价 * v.unit * v.rate,
                                }),

                                // 添加信息: 当日数据
                                v => ({
                                    ...v,
                                    current_day,
                                }),

                            )(last_store)
                        },
                        {
                            code: breed.code,
                            month: breed.month,
                            name: breed.name,
                            unit: breed.unit,
                            rate: breed.rate,
                            contract_low: breed.contract_low,
                            contract_high: breed.contract_high,
                            contract_data: breed.contract_data,
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

        // R.filter(v => v.code === 'BU'),

    )(cal_data)
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export const action = {

    deduction: payload => (dispatch, get_state) => {
        const state = get_state()
        const sjhq_module_state = state[SJHQ_MODULE_KEY]

        dispatch(
            module_setter({
                deduction: get_deduction(sjhq_module_state.cal_data),
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
