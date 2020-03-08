

const get_trend_info = (day) => {
    if(day && day.length) {
        return (day[day.length - 1].开盘价 - day[0].开盘价) / day[0].开盘价 * 100
    }
    return null
}

export const A_趋势分析_10_20_30 = v => ({
    ...v,
    trend_info: {
        // 连续走势
        series: get_trend_info(v.day_list),
        // 10天走势
        day_10: get_trend_info(R.takeLast(10)(v.day_list)),
        // 20天走势
        day_20: get_trend_info(R.takeLast(20)(v.day_list)),
        // 30天走势
        day_30: get_trend_info(R.takeLast(30)(v.day_list)),
    },
})
