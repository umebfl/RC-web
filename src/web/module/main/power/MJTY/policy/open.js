import {
    CLOSE_LOSS_RATE,
    WAIT_BASE_DAY_LEN,
} from 'SRC/module/main/power/MJTY/variable'

export const P_开仓_平仓静置期判定 = v => v.close_deal_day === 0

export const P_开仓_数据积累期判定 = v => v.day_list.length > WAIT_BASE_DAY_LEN

export const P_开仓_10日趋势判定 = v => v.trend_info.day_10 > 1 || v.trend_info.day_10 < -1

// 弱点洞察 风险评估
