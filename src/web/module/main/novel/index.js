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

import CZ from 'SRC/module/main/novel/CZ'
import SJ from 'SRC/module/main/novel/SJ'
import SC from 'SRC/module/main/novel/SC'
import TJ from 'SRC/module/main/novel/TJ'
import FZ from 'SRC/module/main/novel/FZ'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_W,
} from 'SRC/theme'

const Mod = ({history, nav}) => (
    <div style={{width: '100%', height: '100%'}}>
        <Top history={history} nav={nav}/>
        <div style={{height: '100%', paddingLeft: '200px', position: 'relative'}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: '200px', height: '100%'}}>
                <Nav history={history} nav={nav} root={'novel'}/>
            </div>
            <div style={{width: '100%', height: '100%'}}>
                <Switch>
                    <Route path='/novel/CZ' component={CZ}/>
                    <Route path='/novel/SJ' component={SJ}/>
                    <Route path='/novel/SC' component={SC}/>
                    <Route path='/novel/TJ' component={TJ}/>
                    <Route path='/novel/FZ' component={FZ}/>
                    <Redirect from='*' to='/404'/>
                </Switch>
            </div>
        </div>
    </div>
)

export default connect(
    state => ({
        nav: state.nav,
    }),
)(Mod)
