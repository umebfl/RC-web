import {
    CLOSE_LOSS_RATE,
    WAIT_BASE_DAY_LEN,
    V_正向判定天数,
} from 'SRC/module/main/power/MJTY/variable'

export const P_开仓_平仓静置期判定 = v => v.close_deal_day === 0

export const P_开仓_数据积累期判定 = v => v.day_list.length > WAIT_BASE_DAY_LEN

export const P_开仓_10日趋势判定 = v => v.trend_info.day_10 > 1 || v.trend_info.day_10 < -1

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

    console.log('analy  | 盈 加仓判定 P_开仓_N天正向判定', dir_count.up, dir_count.down, dir_count.up === V_正向判定天数 || V_正向判定天数.down === V_正向判定天数)

    return dir_count.up === V_正向判定天数 || V_正向判定天数.down === V_正向判定天数
}
