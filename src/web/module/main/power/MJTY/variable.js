// 单一品种起始资金
export let INITIAL_CAPITAL = 40000   // 40000

// 平仓等待天数
export let CLOSE_DEAL_WAIT_DAY = 5  // 5 10
// 数据量等待天数
export let WAIT_BASE_DAY_LEN = 10

// 亏损比例
export let CLOSE_LOSS_RATE = 0.103  // 0.038 0.07 0.08 0.1
// export let CLOSE_LOSS_RATE = 0.1  // 0.038 0.07 0.08 0.1

// 最大加仓次数
export let MAX_ADD_COUNT = 3 // 3
// 加仓比例 0.1 = 10%
export let ADD_RATE = 0.068    // 0.05 0.072

// 盈利加仓后回撤比例
export let CLOSE_ADD_BACK_RATE = 0.081
// 盈利回撤比例
export let CLOSE_BACK_RATE = CLOSE_ADD_BACK_RATE  // 0.038 0.08 0.1 0.12

export let V_正向判定天数 = 1

// 10天临界点
export let OPEN_10_DAY_RATE = 0.013

export let V_FIX_VAR_STR = 0

// setInterval(
//     () => {
//         // CLOSE_DEAL_WAIT_DAY += 1
//         // V_FIX_VAR_STR = CLOSE_DEAL_WAIT_DAY
//     },
//     2000,
// )
