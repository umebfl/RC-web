import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'CZ'

import B_巫师传奇 from 'SRC/module/main/novel/data/作品/巫师传奇'
import B_领主传奇 from 'SRC/module/main/novel/data/作品/领主传奇'

const init_state = {

    // 作品
    opus: [
        // 选中
        {
            ...B_巫师传奇,
            selected: true,
        },

        B_领主传奇,
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
