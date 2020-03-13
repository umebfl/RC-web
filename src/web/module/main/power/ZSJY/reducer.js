import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'ZSJY'

const init_state = {

    // 交易记录
    deal_log: [
        {
            // 品种
            code: 'TA',
            month: '2005',
            price: 3000,
            count: 20,
            date: '2020年3月13日',

            // 加仓信息

            // 平仓信息
        },
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
