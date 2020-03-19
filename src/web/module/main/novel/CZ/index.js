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

import RQ from 'SRC/module/main/novel/CZ/RQ'
import ZJ from 'SRC/module/main/novel/CZ/ZJ'
import DG from 'SRC/module/main/novel/CZ/DG'
import ZP from 'SRC/module/main/novel/CZ/ZP'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'

const Mod = ({history, nav}) => (
    <Content>
        <Tab history={history} data={nav.novel.node.CZ.node}>
            <Switch>
                <Route path={nav.novel.node.CZ.node.RQ.path} component={RQ}/>
                <Route path={nav.novel.node.CZ.node.ZJ.path} component={ZJ}/>
                <Route path={nav.novel.node.CZ.node.DG.path} component={DG}/>
                <Route path={nav.novel.node.CZ.node.ZP.path} component={ZP}/>
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
