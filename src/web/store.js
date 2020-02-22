import {
    createStore,
    applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import root_reducer from './reducer'

export default () => {

    const store = createStore(
        root_reducer,
        // applyMiddleware(thunk),
        applyMiddleware(thunk, logger),
    )

    // if(module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('./v0/reducer.js', () => {
    //         const nextReducer = require('./v0/reducer.js').default
    //         store.replaceReducer(nextReducer)
    //     })
    // }

    return store
}
