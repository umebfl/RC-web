import {
    Component,
} from 'react'

import {
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom'

import Flex from 'SRC/cmp/flex'
import Top from 'SRC/cmp/top'
import Nav from 'SRC/cmp/nav'

import SSKW from 'SRC/module/main/power/SSKW'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_W,
} from 'SRC/theme'

export default () => (
    <Flex style={{
        height: '100%',
        flexDirection: 'column',
    }}>
        <Top/>
        <Flex style={{
            flex: 1,
            height: '100%',
            background: VITRIC_L,
        }}>
            <Nav/>
            <Switch>
                <Route path='/power/SSKW' component={SSKW}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        </Flex>
    </Flex>
)
