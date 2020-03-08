

export const U_log_info = v => {
    console.log(
        'info    |',
        v.name,
        R.takeLast(5)(v.current_day.日期),
        'C' + v.current_day.开盘价,
        'H' + v.current_day.最高价,
        'L' + v.current_day.最低价,
        'AH' + v.series_high_day.最高价,
        'AL' + v.series_low_day.最低价,
        'trend_info:' + v.trend_info.day_10?.toFixed(2) || '-',
        v.current_deal
            ? ('持' + v.current_deal.price + (v.current_deal.dir === 'up' ? '多' : '空') + v.current_deal.count)
            : '-',
        v.current_deal
            ? '盈' + v.current_deal.profit : '-',
    )

    return v
}
