import {
    Component,
} from 'react'

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
    action,
} from './reducer'

import {
    VITRIC_L,
    VITRIC,
} from 'SRC/theme'

import JYFX from 'SRC/module/main/power/MJTY/JYFX'
import JYTX from 'SRC/module/main/power/MJTY/JYTX'
import JYTB from 'SRC/module/main/power/MJTY/JYTB'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'

import {
    V_FIX_VAR_STR,
    var_fix,
    var_fix_finish,
} from 'SRC/module/main/power/MJTY/variable'

class Mod extends Component {

    componentDidMount() {
        this.props.action.deduction()

        // setInterval(
        //     () => {
        //         var_fix()
        //         this.props.action.deduction()
        //
        //         if(var_fix_finish) {
        //             clearInterval(this.interval)
        //         }
        //     },
        //     200,
        // )

        this.interval = setInterval(
            () => this.props.action.deduction(),
            1000 * 70,
        )

        setTimeout(
            () => this.props.action.deduction(),
            3000,
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {

        const {
            history,
            nav,
        } = this.props

        return (
            <Content>
                <Tab history={history} data={nav.power.node.MJTY.node}>
                    <Switch>
                        <Route path={nav.power.node.MJTY.node.JYTX.path} component={JYTX}/>
                        <Route path={nav.power.node.MJTY.node.JYTB.path} component={JYTB}/>
                        <Route path={nav.power.node.MJTY.node.JYFX.path} component={JYFX}/>
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
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    }),
)(Mod)
