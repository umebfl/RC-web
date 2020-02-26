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

import SJHQ from 'SRC/module/main/power/SSKW/SJHQ'
import PZSX from 'SRC/module/main/power/SSKW/PZSX'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'

const Mod = ({history, nav}) => (
    <Content>
        <Tab history={history} data={nav.power.node.SSKW.node}>
            <Switch>
                <Route path={nav.power.node.SSKW.node.SJHQ.path} component={SJHQ}/>
                <Route path={nav.power.node.SSKW.node.PZSX.path} component={PZSX}/>
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
