import {
    combineReducers,
} from 'redux'

import nav from 'SRC/cmp/nav/reducer'
import main from 'SRC/module/main/reducer'
import SJHQ from 'SRC/module/main/power/SSKW/SJHQ/reducer'
import PZSX from 'SRC/module/main/power/SSKW/PZSX/reducer'
import MJTY from 'SRC/module/main/power/MJTY/reducer'
import SY from 'SRC/module/main/power/SY/reducer'
import ZSJY from 'SRC/module/main/power/ZSJY/reducer'

// export const AUTH_SIGNOUT = 'redux_auth_signout'

const app_reducer = combineReducers({
    nav,

    main,
    SJHQ,
    PZSX,
    MJTY,
    SY,
    ZSJY,
})

const root_reducer = (state, action) => {

    // 重置store
    // if (action.type === AUTH_SIGNOUT) {
    //     state = undefined
    // }

    return app_reducer(state, action)
}

export default root_reducer
