

import {
    INITIAL_CAPITAL,
} from 'SRC/module/main/power/MJTY/variable'

export const display_open = v => {
    const trend_info = v.trend_info

    let dir = null
    let price = null

    if(trend_info.day_10 >= 0 || trend_info.day_10 < 0) {
        dir = trend_info.day_10 >= 0 ? 'up' : 'down'
        price = trend_info.day_10 >= 0 ? v.current_day.最高价 : v.current_day.最低价
    }

    // 10天走势 - 方向
    v = {
        ...v,
        current_deal: {
            dir,
            price,
            open_date: v.current_day.日期,
            count: Math.floor(INITIAL_CAPITAL / v.bond),
            profit: 0,
            // 加仓次数
            add_count: 0,
            // 加仓前价格
            add_before_price: [],
            bond: v.bond,
        },
    }

    console.log('display | 开',
        v.current_deal.price,
        v.current_deal.dir,
        v.current_deal.count,
    )

    return v
}
