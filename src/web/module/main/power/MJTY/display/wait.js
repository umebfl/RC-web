

export const display_wait = v => {
    console.log('display | 观',
        v.close_deal_day,
    )

    return R.ifElse(
        // 平仓静止期
        v => v.close_deal_day > 0,
        v => ({
            ...v,
            close_deal_day: v.close_deal_day - 1,
        }),
        v => v,
    )(v)
}
