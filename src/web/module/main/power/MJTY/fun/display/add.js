import {
    INITIAL_CAPITAL,
} from 'SRC/module/main/power/MJTY/variable'

export const display_add = v => {
    const add_price = v.current_deal.dir === 'up' ? v.current_day.最高价 : v.current_day.最低价
    const add_count = v.current_deal.add_count + 1
    const count = v.current_deal.count + Math.ceil(INITIAL_CAPITAL / v.bond) * (add_count + 1)
    const price = v.current_deal.dir === 'up'
        ? add_price - (add_price - v.current_deal.price) * v.current_deal.count / count
        : add_price + (v.current_deal.price - add_price) * v.current_deal.count / count

    v = {
        ...v,
        current_deal: {
            ...v.current_deal,
            count,
            price: parseInt(price),
            add_count,
            add_before_price: [...v.current_deal.add_before_price, v.current_deal.price],
            profit: v.current_deal.dir === 'up'
                ? (v.current_day.收盘价 - v.current_deal.price) * v.unit * v.current_deal.count
                : (v.current_deal.price - v.current_day.收盘价) * v.unit * v.current_deal.count,
            // add_log: [
            //     ...v.add_log,
            //     {
            //         // 加仓价格
            //         add_price,
            //         // 加仓数量
            //
            //     },
            // ],
        },
    }

    // console.log('display | 加',
    //     '持' + v.current_deal.price, v.current_deal.dir === 'up' ? '多' : '空', v.current_deal.count,
    //     '盈' + v.current_deal.profit,
    //     '加仓次数' + v.current_deal.add_count,
    //     v.current_deal.add_before_price,
    // )

    return v
}
