import {
    Component,
} from 'react'

import {
    Route,
    Link,
} from 'react-router-dom'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    red,
    volcano,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
} from '@ant-design/colors'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_DD,
    VITRIC_DDD,
    MAIN_L,
    MAIN,
} from 'SRC/theme'

class Mod extends Component {

    render() {

        const {
            SY,
        } = this.props

        return (
            <div style={{
                height: '90%',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingTop: 20,
                paddingBottom: 800,
            }}>
                <div>
                    <div style={{margin: 10}}>总交易本金: {SY.total_capital}</div>
                    <div style={{margin: 10}}>总盈利: {R.reduce((r, v) => r + v.count, 0)(SY.total_profit)}</div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        SY: state.SY,
    }),
)(Mod)
