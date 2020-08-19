import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'SY'

const init_state = {

    // 总交易本金
    total_capital: 400000 - 70000 - 10000,

    // 总盈利
    total_profit: [
        {
            date: '2020年3月31日',
            count: -50000 + 10000 + 14040 + 2538,    // 10000 + 24483 + 12443 + 10000 + 3252 + 1739 + 2625 + 4593
            display: false,
        },
    ],

    profit_cut: {
        store: [
            {
                name: '广发-2133',
                remark: '储备',
                num: 0,
            },
        ],

        output: [ // 2W/月
            {
                name: '支付宝',
                remark: '购物',
                num: 1500,
            },
            {
                name: '京东',
                remark: '购物',
                num: 500,
            },

            {
                name: '微信',
                remark: '房租',
                num: 3300,
            },
            {
                name: '建设',
                remark: '车贷',
                num: 3600,
            },
            {
                name: '招商-4379',
                remark: '贷款',
                num: 9800,
            },
        ],

        capital: [
            {
                name: '广发期货',
                remark: '保证金',
                num: 0,
            },
            // {
            //     name: '中信期货',
            //     remark: '保证金',
            //     num: 0,
            // },
        ],
    },

    // 支付详情
    output_detail: [

    ],

    // 债务
    debt: [
        {
            name: '招商',
            count: 300000,
            repay: 0,
            date: '2020年3月',
        },
        {
            name: '家庭贷款',
            count: 200000,
            repay: 0,
            date: '2020年3月',
        },
    ],

    // 每月支出列表
    output_list: [
        // 债务支出
        {
            name: '招商',
            num: 10000,
        },

        // 生活支出
        {
            name: '车贷',
            num: 3800,
        },

        {
            name: '房租',
            num: 3200,
        },

        {
            name: '伙食费',
            num: 2000,
        },

        {
            name: '日用品',
            num: 1000,
        },

        {
            name: '停车费, 油费',
            num: 1000,
        },

        {
            name: '家庭贷款',
            num: 10000,
        },
    ],


    // 资金分配
    profit_cut_rate: {
        // 储备
        store: {
            rate: 0.6,
        },
        // 支出
        output: {
            rate: 0.2,
        },
        // 本金
        capital: {
            rate: 0.2,
        },
    },
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
