import {
    createAction,
    handleActions,
} from 'redux-actions'

import PZ from 'SYS/data/品种'

export const MODULE_KEY = 'PZSX'

const init_state = {
    PZ,
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
