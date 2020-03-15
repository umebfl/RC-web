import {
    Component,
} from 'react'

import {
    Route,
    Link,
    Redirect,
    Switch,
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

import moment from 'moment'

import Deal_list from 'SRC/module/main/power/MJTY/JYTX/cmp/Deal_list'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_D,
    VITRIC_DD,
    VITRIC_DDD,
} from 'SRC/theme'

class Mod extends Component {

    render() {

        const {
            history,
            nav,
            MJTY: {
                deduction,
            },
        } = this.props

        return (
            <div style={{
                height: '100%',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
                <div style={{marginTop: 20, marginLeft: 10, fontWeight: 'bold'}}>更新时间: {moment().format('MM-DD HH:mm')}</div>
                <Deal_list data={deduction}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
        MJTY: state.MJTY,
        SJHQ: state.SJHQ,
    }),
)(Mod)
