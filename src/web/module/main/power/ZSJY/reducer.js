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
            price: 8066.33,
            count: 3,
            date: '2020-03-27',
            price_list: [
                {
                    price: 7822,
                    count: 1,
                    date: '2020-03-17',
                },
                {
                    price: 8066.33,
                    count: 3,
                    date: '2020-03-27',
                },
            ],

            // 加仓信息
            add_count: 1,

            // 平仓信息
            tmp_close_profit: 0,
            close_profit: 0,
        },
        {
            // 品种
            code: 'JD',
            name: '鸡蛋',
            month: '2009',
            dir: 'up',
            price: 4138,
            count: 5,
            date: '2020-03-24',
            price_list: [
                {
                    price: 4138,
                    count: 5,
                    date: '2020-03-24',
                },
            ],

            // 加仓信息
            add_count: 0,

            // 平仓信息
            tmp_close_profit: 0,
            close_profit: 0,
        },

        {
            // 品种
            code: 'FU',
            name: '燃油',
            month: '2009',
            dir: 'up',
            price: 1688.33,
            count: 18,
            date: '2020-03-24',
            price_list: [
                {
                    price: 1650,
                    count: 6,
                    date: '2020-03-24',
                },
                {
                    price: 1716,
                    count: 12,
                    date: '2020-04-02',
                },
            ],

            // 加仓信息
            add_count: 1,

            // 平仓信息
            tmp_close_profit: -1620,
            close_profit: 0,
        },

        {
            // 品种
            code: 'BU',
            name: '沥青',
            month: '2009',
            dir: 'up',
            price: 2132.67,
            count: 30,
            date: '2020-03-25',
            price_list: [
                {
                    price: 2050,
                    count: 5,
                    date: '2020-03-17',
                },
                {
                    price: 2103.33,
                    count: 15,
                    date: '2020-03-25',
                },
                {
                    price: 2188,
                    count: 15,
                    date: '2020-04-03',
                },
            ],

            // 加仓信息
            add_count: 1,

            // 平仓信息
            tmp_close_profit: -7600,
            close_profit: 0,
        },
        // {
        //     // 品种
        //     code: 'BU',
        //     name: '沥青',
        //     month: '2009',
        //     dir: 'up',
        //     price: 2050,
        //     count: 5,
        //     date: '2020-03-24',
        //
        //     // 加仓信息
        //     add_count: 0,
        //
        //     // 平仓信息
        // },

        {
            // 品种
            code: 'TA',
            name: 'PTA',
            month: '2009',
            dir: 'up',
            price: 3543,
            count: 9,
            date: '2020-03-24',
            price_list: [
                {
                    price: 3543,
                    count: 9,
                    date: '2020-03-24',
                },
            ],

            // 加仓信息
            add_count: 0,

            // 平仓信息

            // 临时平仓盈利统计记录
            tmp_close_profit: -5200,
            // 平仓盈利统计
            close_profit: 0,
        },

        {
            // 品种
            code: 'P',
            name: '棕榈',
            month: '2009',
            dir: 'up',
            price: 4839.33,
            count: 6,
            date: '2020-03-25',
            price_list: [
                {
                    price: 4676,
                    count: 2,
                    date: '2020-03-17',
                },
                {
                    price: 4839.33,
                    count: 6,
                    date: '2020-03-25',
                },
            ],

            // 加仓信息
            add_count: 1,

            // 平仓信息
            tmp_close_profit: 0,
            close_profit: 0,
        },

        {
            // 品种
            code: 'Y',
            name: '豆油',
            month: '2009',
            dir: 'up',
            price: 5571,
            count: 2,
            date: '2020-03-24',
            price_list: [
                {
                    price: 5571,
                    count: 2,
                    date: '2020-03-24',
                },
            ],

            // 加仓信息
            add_count: 0,

            // 平仓信息
            tmp_close_profit: 0,
            close_profit: 0,
        },

        {
            // 品种
            code: 'AG',
            name: '沪银',
            month: '2008',
            dir: 'up',
            price: 3516.5,
            count: 2,
            date: '2020-03-25',
            price_list: [
                {
                    price: 3516.5,
                    count: 2,
                    date: '2020-03-25',
                },
            ],

            // 加仓信息
            add_count: 0,

            // 平仓信息
            tmp_close_profit: 0,
            close_profit: 0,
        },
        {
            // 品种
            code: 'NI',
            name: '沪镍',
            month: '2005',
            dir: 'up',
            price: 92690,
            count: 1,
            date: '2020-03-27',
            price_list: [
                {
                    price: 92690,
                    count: 1,
                    date: '2020-03-27',
                },
            ],

            // 加仓信息
            add_count: 0,

            // 平仓信息
            tmp_close_profit: 0,
            close_profit: 0,

        },
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
