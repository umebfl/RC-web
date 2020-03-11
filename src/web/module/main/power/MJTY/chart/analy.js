
export const C_分析_最高最低图生成 = v => {
    return ({
        ...v,
        high_chart_list: R.map(
            v => v.最高价,
        )(v.contract_data),
        low_chart_list: R.map(
            v => v.最低价,
        )(v.contract_data),
    })
}
