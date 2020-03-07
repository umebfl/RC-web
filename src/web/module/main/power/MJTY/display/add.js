import {
    INITIAL_CAPITAL,
} from 'SRC/module/main/power/MJTY/variable'

export const display_add = v => {
    const add_price = v.current_deal.dir === 'up' ? v.current_day.最高价 : v.current_day.最低价
    const count = v.current_deal.count + Math.floor(INITIAL_CAPITAL / v.bond)
    const price = v.current_deal.dir === 'up'
        ? add_price - (add_price - v.current_deal.price) * v.current_deal.count / count
        : add_price + (v.current_deal.price - add_price) * v.current_deal.count / count
    const add_count = v.current_deal.add_count + 1

    v = {
        ...v,
        current_deal: {
            ...v.current_deal,
            count: v.current_deal.count + Math.floor(INITIAL_CAPITAL / v.bond) * (add_count + 1),
            price: parseInt(price),
            add_count,
            add_before_price: [...v.current_deal.add_before_price, v.current_deal.price],
        },
    }

    console.log('display | 加',
        '持' + v.current_deal.price, v.current_deal.dir === 'up' ? '多' : '空', v.current_deal.count,
        '盈' + v.current_deal.profit,
        '加仓次数' + v.current_deal.add_count,
        v.current_deal.add_before_price,
    )

    return v
}
