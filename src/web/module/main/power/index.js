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

import {
    action as SJHQ_action,
} from 'SRC/module/main/power/SSKW/SJHQ/reducer'

import Flex from 'SRC/cmp/flex'
import Top from 'SRC/cmp/top'
import Nav from 'SRC/cmp/nav'

import SSKW from 'SRC/module/main/power/SSKW'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_W,
} from 'SRC/theme'


class Mod extends Component {

    componentWillMount() {
        this.props.action.refresh()
    }

    render() {

        const {
            history,
            nav,
        } = this.props

        return (
            <Flex style={{
                height: '100%',
                flexDirection: 'column',
            }}>
                <Top history={history} nav={nav}/>
                <Flex style={{
                    flex: 1,
                    height: '100%',
                }}>
                    <Nav history={history} nav={nav}/>
                    <Switch>
                        <Route path='/power/SSKW' component={SSKW}/>
                        {/*<Redirect from='*' to='/404'/>*/}
                    </Switch>
                </Flex>
            </Flex>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
    }),
    dispatch => ({
        action: bindActionCreators({...SJHQ_action}, dispatch),
    }),
)(Mod)
