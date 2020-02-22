import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'count'

const init_state = {
    num: 0,
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export const action = {

    add: payload => (dispatch, get_state) => {
        const state = get_state()
        const module_state = state[MODULE_KEY]

        dispatch(
            module_setter({
                num: module_state.num + 1,
            }),
        )
    },

    del: payload => (dispatch, get_state) => {
        const state = get_state()
        const module_state = state[MODULE_KEY]

        dispatch(
            module_setter({
                num: module_state.num - 1,
            }),
        )
    },
}

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)
