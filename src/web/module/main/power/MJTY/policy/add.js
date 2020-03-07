import {
    MAX_ADD_COUNT,
} from 'SRC/module/main/power/MJTY/variable'

export const P_加仓次数控制 = v => {
    console.log('analy  | 盈 加仓判定 加仓次数判定',
        v.current_deal.add_count,
        MAX_ADD_COUNT,
    )

    return v.current_deal.add_count < MAX_ADD_COUNT
}
