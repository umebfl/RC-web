import moment from 'moment'

import {
    INITIAL_CAPITAL,
    CLOSE_DEAL_WAIT_DAY,
} from 'SRC/module/main/power/MJTY/variable'


export const display_close = v => {
    // 平仓价
    const close_price = v.current_deal.dir === 'up' ? v.current_day.最低价 : v.current_day.最高价
    // 平仓盈利
    const profit = v.current_deal.dir === 'up'
        ? (close_price - v.current_deal.price) * v.unit * v.current_deal.count
        : (v.current_deal.price - close_price) * v.unit * v.current_deal.count

    v = {
        ...v,
        deal_list: [
            ...v.deal_list,
            {
                ...v.current_deal,
                close: true,
                close_date: v.current_day.日期,
                days: moment(v.current_day.日期).diff(v.current_deal.open_date, 'days'),
                close_price,
                profit,
            },
        ],
        current_deal: null,
        deal_hl_price: null,
        deal_hl_price_back_rate: null,
        close_deal_day: CLOSE_DEAL_WAIT_DAY,
        total_profit: R.reduce((a, b) => a + b.profit, profit)(v.deal_list || []),

        // 当前最高价
        series_high_day: {最高价: 0},
        // 当前最低价
        series_low_day: {最低价: 9999999},
    }

    console.log('display | 平',
        v.current_day.日期,
        '平' + close_price,
        '盈' + profit,
        '总' + v.total_profit,
    )

    return v
}
