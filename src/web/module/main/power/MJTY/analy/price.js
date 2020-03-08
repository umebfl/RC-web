

export const A_价格_最高最低价 = v => ({
    ...v,
    // 当前最高价
    series_high_day: v.current_day.最高价 > v.series_high_day.最高价 ? v.current_day : v.series_high_day,
    // 当前最低价
    series_low_day: v.current_day.最低价 < v.series_low_day.最低价 ? v.current_day : v.series_low_day,
})

// const get_deal_hl_price = (store, current_day) => {
//     let deal_hl_price = null
//     let deal_hl_price_back_rate = null
//
//     if(store.current_deal.dir === 'up') {
//         deal_hl_price = store.deal_hl_price
//             ? store.deal_hl_price > current_day.最高价
//                 ? store.deal_hl_price
//                 : current_day.最高价
//             : current_day.最高价
//
//         deal_hl_price_back_rate = (deal_hl_price - current_day.最低价) / store.current_deal.price
//     } else {
//         deal_hl_price = store.deal_hl_price
//             ? store.deal_hl_price < current_day.最低价
//                 ? store.deal_hl_price
//                 : current_day.最低价
//             : current_day.最低价
//
//         deal_hl_price_back_rate = (current_day.最高价 - deal_hl_price) / store.current_deal.price
//     }
//
//     return {
//         deal_hl_price,
//         deal_hl_price_back_rate,
//     }
// }
