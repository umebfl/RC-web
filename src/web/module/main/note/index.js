import {
    Component,
} from 'react'

import {
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import Flex from 'SRC/cmp/flex'
import Top from 'SRC/cmp/top'
import Nav from 'SRC/cmp/nav'

import T2 from 'SRC/module/main/note/T2'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_W,
} from 'SRC/theme'

const Mod = ({history, nav}) => (
    <Flex style={{
        height: '100%',
        flexDirection: 'column',
    }}>
        <Top history={history} nav={nav}/>
        <Flex style={{
            flex: 1,
            height: '100%',
            background: VITRIC_L,
        }}>
            <Switch>
                <Route path='/note/T2' component={T2}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        </Flex>
    </Flex>
)

export default connect(
    state => ({
        nav: state.nav,
    }),
)(Mod)
