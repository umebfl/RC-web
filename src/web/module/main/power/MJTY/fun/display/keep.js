import {
    INITIAL_CAPITAL,
    CLOSE_ADD_BACK_RATE,
    CLOSE_LOSS_RATE,
} from 'SRC/module/main/power/MJTY/variable'

export const display_keep = v => {
    v = {
        ...v,
        current_deal: {
            ...v.current_deal,
            profit: v.current_deal.dir === 'up'
                ? (v.current_day.收盘价 - v.current_deal.price) * v.unit * v.current_deal.count
                : (v.current_deal.price - v.current_day.收盘价) * v.unit * v.current_deal.count,

            close_price_tips: v.current_deal.dir === 'up'
                ? parseInt(v.series_high_day.最高价 * -CLOSE_ADD_BACK_RATE)
                : parseInt(v.series_low_day.最低价 * CLOSE_ADD_BACK_RATE),
        },
    }

    // console.log('display | 持',
    //     v.current_deal.price,
    //     v.current_deal.dir === 'up' ? '多' : '空',
    //     v.current_deal.count,
    //     v.current_deal.price,
    //     v.current_day.收盘价,
    //     v.current_deal.profit,
    // )
    return v
}
