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

import RQ from 'SRC/module/main/novel/SC/RQ'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'

const Mod = ({history, nav}) => (
    <Content>
        <Tab history={history} data={nav.novel.node.SC.node}>
            <Switch>
                <Route path={nav.novel.node.SC.node.RQ.path} component={RQ}/>
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
