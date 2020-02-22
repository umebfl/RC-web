import 'SRC/index.less'

import ReactDOM from 'react-dom'

import {
    Provider,
} from 'react-redux'

import Router from './router'
import store from './store'

ReactDOM.render(
    <Provider store={store()}>
        <Router/>
    </Provider>,
    document.getElementById('workspace'),
)
