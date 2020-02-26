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

import ZTTB from 'SRC/module/main/power/JMFX/ZTTB'
import DYJM from 'SRC/module/main/power/JMFX/DYJM'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'
import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'

class Mod extends Component {

    render() {

        const {
            history,
            nav,
        } = this.props

        return (
            <Content>
                <Tab history={history} data={nav.power.node.JMFX.node}>
                    <Switch>
                        <Route path={nav.power.node.JMFX.node.ZTTB.path} component={ZTTB}/>
                        <Route path={nav.power.node.JMFX.node.DYJM.path} component={DYJM}/>
                        <Redirect from='*' to='/404'/>
                    </Switch>
                </Tab>
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
