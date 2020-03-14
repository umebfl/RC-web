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

        const profit = R.compose(
            R.reduce((r, v) => r + v.count, 0),
            R.filter(v => v.display === false),
        )(SY.total_profit)

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
                <div>
                    <div style={{margin: 10}}>资金分配:</div>
                    <div style={{margin: 10}}>
                        <div style={{margin: 10}}>支出: {parseInt(profit * SY.profit_cut_rate.output.rate)}</div>
                        <div style={{margin: 10}}>本金: {parseInt(profit * SY.profit_cut_rate.capital.rate)}</div>
                        <div style={{margin: 10}}>储备: {parseInt(profit * SY.profit_cut_rate.store.rate)}</div>
                    </div>
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
