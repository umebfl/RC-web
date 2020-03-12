import {
    MAX_ADD_COUNT,
    ADD_RATE,
} from 'SRC/module/main/power/MJTY/variable'

// 伤害加深 风险评估
export const P_加仓临界值判定 = v => {
    // const target_profit = v.current_deal.price * v.current_deal.count * v.unit * v.rate * ADD_RATE
    // const pass = v.current_deal.profit > target_profit

    const target_price = v.current_deal.dir === 'up'
        ? v.current_deal.price * (1 + ADD_RATE)
        : v.current_deal.price * (1 - ADD_RATE)

    const pass = v.current_deal.dir === 'up'
        ? target_price < v.current_day.最高价
        : target_price > v.current_day.最低价

    // console.log('analy  | 盈 加仓判定',
    //     'T' + parseInt(target_price),
    //     pass ? '过' : '否',
    //     '盈' + v.current_deal.profit,
    // )

    return pass
}

export const P_加仓次数控制 = v => {
    // console.log('analy  | 盈 加仓判定 加仓次数判定',
    //     v.current_deal.add_count,
    //     MAX_ADD_COUNT,
    // )

    return v.current_deal.add_count < MAX_ADD_COUNT
}
