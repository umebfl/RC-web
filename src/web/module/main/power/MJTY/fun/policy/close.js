import {
    CLOSE_LOSS_RATE,
    CLOSE_BACK_RATE,
    CLOSE_ADD_BACK_RATE,
} from 'SRC/module/main/power/MJTY/variable'

export const P_回撤平仓_盈利判定 = v => {
    // 存在加仓 默认通过
    if(v.current_deal.add_count > 0) {
        // console.log('analy  | 盈 回撤判定 盈利幅度 加仓默认通过')
        return true
    }

    const target_price = v.current_deal.dir === 'up'
        ? parseInt(v.current_deal.price * (1 + CLOSE_LOSS_RATE))
        : parseInt(v.current_deal.price * (1 - CLOSE_LOSS_RATE))

    const pass = v.current_deal.dir === 'up'
        ? target_price < v.current_day.最高价
        : target_price > v.current_day.最低价

    // console.log('analy  | 盈 回撤判定 盈利幅度',
    //     'T' + target_price,
    //     pass ? '过' : '否',
    //     v.current_deal.dir === 'up' ? target_price - v.current_day.最高价 : target_price - v.current_day.最低价,
    // )

    return pass
}

// 强断连接 危机洞察 风险评估
export const P_回撤平仓_回撤临界值判定 = v => {
    const rate = v.current_deal.add_count > 0 ? CLOSE_ADD_BACK_RATE : CLOSE_BACK_RATE

    // if(rate === CLOSE_BACK_RATE) {
    //     debugger
    // }

    // 底价 =
    // 多: 交易期最高价 * (1 - 回撤比例)
    // 空: 交易期最低价 * (1 + 回撤比例)
    // 如果
    // 多: 底价 > 最低价 击穿 平仓
    // 空: 底价 < 最高价 击穿 平仓

    // 回撤平仓目标价
    const base_price = v.current_deal.dir === 'up'
        ? v.series_high_day.最高价 * (1 - rate)
        : v.series_low_day.最低价 * (1 + rate)

    const pass = v.current_deal.dir === 'up'
        ? base_price > v.current_day.最低价
        : base_price < v.current_day.最高价

    console.log('analy  | 盈 回撤判定 回撤幅度',
        'AH' + v.series_high_day.最高价,
        'AL' + v.series_low_day.最低价,
        '盈' + v.current_deal.profit,
        'B' + parseInt(base_price),
        'CL' + v.current_day.最低价,
        'CH' + v.current_day.最高价,
        rate,
        pass ? '过' : '否',
        v.current_deal.dir === 'up' ? v.current_day.最低价 : v.current_day.最高价,
    )

    return pass






    // const target_price = v.current_deal.dir === 'up'
    //     ? parseInt(v.current_deal.price * (1 - rate))
    //     : parseInt(v.current_deal.price * (1 + rate))
    //
    // if(v.current_day.日期 === '2019-12-12') {
    //     debugger
    // }
    //
    // const pass = v.current_deal.dir === 'up'
    //     // 多, 低价平,
    //     // true = 平仓 false = 持有
    //     // 成交价 * (1 - 0.6) = 平仓价2000
    //     // true 平仓价2000 大于 最高价1000
    //     // false 平仓价2000 小于 最高价1000
    //     ? target_price > v.series_low_day.最低价
    //     // 空 高价平
    //     // true = 平仓 false = 持有
    //     // 成交价 * (1 + 0.6) = 平仓价2000
    //     // true 平仓价2000 大于 最高价3000
    //     // false 平仓价2000 小于 最高价3000
    //     : target_price > v.series_high_day.最高价
    //
    // console.log('analy  | 盈 回撤判定 回撤幅度',
    //     'AH' + v.series_high_day.最高价,
    //     'AL' + v.series_low_day.最低价,
    //     '盈' + v.current_deal.profit,
    //     'T' + target_price,
    //     rate,
    //     pass ? '过' : '否',
    //     v.current_deal.dir === 'up' ? target_price - v.series_low_day.最低价 : target_price - v.series_high_day.最高价,
    // )
    //
    // return pass
}

// 强断连接
export const P_亏损平仓_临界值判定 = v => {
    const close_price = v.current_deal.dir === 'up'
        ? v.current_deal.price * (1 - CLOSE_LOSS_RATE)
        : v.current_deal.price * (1 + CLOSE_LOSS_RATE)

    const pass =  v.current_deal.dir === 'up'
        ? close_price < v.current_day.最低价   // 平1800 最低2000 过
        : close_price > v.current_day.最高价   // 2000 1900

    // console.log('analy   | 亏',
    //     '盈' + v.current_deal.profit,
    //     '平' + close_price.toFixed(0), pass ? '过' : '否',
    //     v.current_deal.dir === 'up' ? parseInt(v.current_day.最低价 - close_price) : parseInt(close_price - v.current_day.最高价),
    // )

    return pass
}

export const P_亏损平仓_巨额亏损判定 = v => {

    // 加仓判定
    if(v.current_deal.add_count < 0) {
        return true
    }

    // 亏损率判定
    const close_price = v.current_deal.dir === 'up'
        ? v.current_deal.price * (1 - 0.087)
        : v.current_deal.price * (1 + 0.087)

    const pass =  v.current_deal.dir === 'up'
        ? close_price < v.current_day.最低价   // 平1800 最低2000 过
        : close_price > v.current_day.最高价   // 2000 1900

    // console.log('analy   | 亏',
    //     '盈' + v.current_deal.profit,
    //     '平' + close_price.toFixed(0), pass ? '过' : '否',
    //     v.current_deal.dir === 'up' ? parseInt(v.current_day.最低价 - close_price) : parseInt(close_price - v.current_day.最高价),
    // )

    return pass
}
