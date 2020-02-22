import {
    combineReducers,
} from 'redux'

import count from 'SRC/module/count/reducer'

// export const AUTH_SIGNOUT = 'redux_auth_signout'

const app_reducer = combineReducers({
    count,
})

const root_reducer = (state, action) => {

    // 重置store
    // if (action.type === AUTH_SIGNOUT) {
    //     state = undefined
    // }

    return app_reducer(state, action)
}

export default root_reducer
