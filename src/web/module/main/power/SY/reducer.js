import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'SY'

const init_state = {

    // 总交易本金
    total_capital: 400000,

    // 总盈利
    total_profit: [
        {
            date: '2020年3月13日',
            count: 10000,
            // 剩余
            surplus: 10000,
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

    // 支付详情
    output_detail: [

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
