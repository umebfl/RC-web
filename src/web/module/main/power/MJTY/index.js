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

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'
import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_D,
} from 'SRC/theme'

class Mod extends Component {

    render() {

        const {
            history,
            nav,
        } = this.props

        return (
            <Content>
                <div style={{
                    height: '100%',
                    background: VITRIC_D,
                }}>

                </div>
            </Content>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
    }),
)(Mod)

/*<Redirect from='*' to='/404'/>*/
