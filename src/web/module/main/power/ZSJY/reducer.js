import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'ZSJY'

const init_state = {

    // 交易记录
    current_deal: [
        {
            // 品种
            code: 'AP',
            name: '苹果',
            month: '2010',
            dir: 'up',
            price: 7822,
            count: 1,
            date: '2020-03-17',

            // 加仓信息
            add_count: 0,

            // 平仓信息
        },
        // {
        //     // 品种
        //     code: 'JD',
        //     name: '鸡蛋',
        //     month: '2009',
        //     dir: 'up',
        //     price: 4240,
        //     count: 5,
        //     date: '2020-03-17',
        //
        //     // 加仓信息
        //     add_count: 0,
        //
        //     // 平仓信息
        // },

        // {
        //     // 品种
        //     code: 'TA',
        //     name: 'PTA',
        //     month: '2005',
        //     dir: 'up',
        //     price: 3800,
        //     count: 6,
        //     date: '2020-03-13',
        //
        //     // 加仓信息
        //     add_count: 1,
        //
        //     // 平仓信息
        //
        // },
        // {
        //     // 品种
        //     code: 'NI',
        //     name: '沪镍',
        //     month: '2005',
        //     dir: 'down',
        //     price: 98863,
        //     count: 1,
        //     date: '2020-03-13',
        //
        //     // 加仓信息
        //     add_count: 0,
        //
        //     // 平仓信息
        //
        // },
    ],

    deal_log: [

    ],
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export const action = {

}

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)
