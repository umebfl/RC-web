
export const C_交易_交易分段数据生成 = v => ({
    ...v,
    deal_chart_list: R.addIndex(R.map)(
        (deal, k) => {
            const open_date = deal.open_date
            const close_date = deal.close_date || v.contract_data[v.contract_data.length - 1].日期
            let find = false
            let close = false

            const y = R.map(
                item => {
                    if(close) {
                        return null
                    }
                    if(item.日期 === close_date) {
                        close = true
                        return deal.close_price || v.current_day.收盘价
                    }
                    if(item.日期 === open_date) {
                        find = true
                        if(deal.add_count) {
                            return deal.add_before_price[0]
                        }
                        return deal.price
                    }
                    if(find) {
                        return item.收盘价
                    }

                    return null
                },
            )(v.contract_data)

            return {
                y,
                dir: deal.dir,
            }
        },
    )(v.deal_list),
})
