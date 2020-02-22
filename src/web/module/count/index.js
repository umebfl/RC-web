import * as R from 'ramda'

import {
    Link,
} from 'react-router-dom'

import React, {
    Component,
} from 'react'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    action,
} from './reducer'

class Mod extends Component {

    render() {
        const {
            action,
            count,
        } = this.props

        return (
            <div>
                <p>
                    <Link to='/'>返回</Link>
                </p>
                <p>{count.num}</p>
                <button onClick={action.add}>+</button>
                <button onClick={action.del}>-</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        count: state.count,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    }),
)(Mod)
