import {
    CLOSE_LOSS_RATE,
    WAIT_BASE_DAY_LEN,
    V_正向判定天数,
    OPEN_10_DAY_RATE,
} from 'SRC/module/main/power/MJTY/variable'

export const P_开仓_平仓静置期判定 = R.compose(
    v => v.close_deal_day === 0,
    v => {
        console.log('开仓_平仓静置期判定', v.close_deal_day === 0, v.close_deal_day)
        return v
    },
)

export const P_开仓_数据积累期判定 = R.compose(
    v => {
        console.log('开仓_数据积累期判定', v)
        return v
    },
    v => v.day_list.length > WAIT_BASE_DAY_LEN,
)

export const P_开仓_10日趋势判定 = R.compose(
    v => {
        console.log('开仓_10日趋势判定', v)
        return v
    },
    v => v.trend_info.day_10 > 1 || v.trend_info.day_10 < -1,
)

export const P_开仓_10日临界值突破 = v => {
    const data = R.takeLast(10)(v.day_list)
    const rate = Math.abs((data[data.length - 1].收盘价 - data[0].收盘价) / data[0].收盘价)

    console.log('开仓_10日临界值突破', rate, rate > OPEN_10_DAY_RATE, v.code)
    // 最近N天, 波幅达到OPEN_10_DAY_RATE
    return rate > OPEN_10_DAY_RATE
    // return true
}

// 弱点洞察 风险评估

export const P_开仓_N天正向判定 = v => {

    let dir_count = {
        up: 0,
        down: 0,
    }

    for(let i = 1; i <= V_正向判定天数; i++) {
        const day = v.day_list[v.day_list.length - i]

        // if(day.日期 === '2019-12-04') {
        //     debugger
        // }

        if(day.day_amplitude_rate_fixed > 0) {
            dir_count = {
                ...dir_count,
                up: dir_count.up + 1,
            }
        }

        if(day.day_amplitude_rate_fixed < 0) {
            dir_count = {
                ...dir_count,
                down: dir_count.down + 1,
            }
        }
    }

    console.log('analy  | 盈 加仓判定 P_开仓_N天正向判定', v.code, dir_count.up, dir_count.down, dir_count.up === V_正向判定天数 || V_正向判定天数.down === V_正向判定天数)

    return dir_count.up === V_正向判定天数 || V_正向判定天数.down === V_正向判定天数
}
