
export const display_keep = v => {
    v = {
        ...v,
        current_deal: {
            ...v.current_deal,
            profit: v.current_deal.dir === 'up'
                ? (v.current_day.收盘价 - v.current_deal.price) * v.unit * v.current_deal.count
                : (v.current_deal.price - v.current_day.收盘价) * v.unit * v.current_deal.count,
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
