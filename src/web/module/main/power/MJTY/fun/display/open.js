

import {
    INITIAL_CAPITAL,
    CLOSE_LOSS_RATE,
} from 'SRC/module/main/power/MJTY/variable'

export const display_open = v => {
    const trend_info = v.trend_info

    let dir = null
    let price = null

    if(trend_info.day_10 >= 0 || trend_info.day_10 < 0) {
        dir = trend_info.day_10 >= 0 ? 'up' : 'down'
        price = trend_info.day_10 >= 0 ? v.current_day.最高价 : v.current_day.最低价
    }

    const fix_capital = parseInt(v.rate * 10 * INITIAL_CAPITAL)

    const count = Math.round(fix_capital / v.bond) || 1

    // 10天走势 - 方向
    v = {
        ...v,
        current_deal: {
            dir,
            price,
            open_date: v.current_day.日期,
            op_date: v.current_day.日期,
            count,
            // count: Math.floor(INITIAL_CAPITAL / v.bond),

            // profit: 0,
            profit: dir === 'up'
                ? (v.current_day.收盘价 - price) * v.unit * count
                : (price - v.current_day.收盘价) * v.unit * count,

            // 加仓次数
            add_count: 0,
            // 加仓前价格
            add_before_price: [],
            bond: v.bond,

            close_price_tips: dir === 'up'
                ? parseInt(price * (1 - CLOSE_LOSS_RATE))
                : parseInt(price * (1 + CLOSE_LOSS_RATE)),
        },
    }

    // console.log('display | 开',
    //     v.current_deal.price,
    //     v.current_deal.dir,
    //     v.current_deal.count,
    // )

    return v
}
