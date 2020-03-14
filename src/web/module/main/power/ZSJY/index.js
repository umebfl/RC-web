import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'
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
    VITRIC_L,
    VITRIC,
} from 'SRC/theme'

import JYLB from 'SRC/module/main/power/ZSJY/JYLB'
import PZXX from 'SRC/module/main/power/ZSJY/PZXX'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'

const Mod = ({history, nav}) => (
    <Content>
        <Tab history={history} data={nav.power.node.ZSJY.node}>
            <Switch>
                <Route path={nav.power.node.ZSJY.node.JYLB.path} component={JYLB}/>
                <Route path={nav.power.node.ZSJY.node.PZXX.path} component={PZXX}/>
                <Redirect from='*' to='/404'/>
            </Switch>
        </Tab>
    </Content>
)

export default connect(
    state => ({
        nav: state.nav,
    }),
)(Mod)

/*<Redirect from='*' to='/404'/>*/
