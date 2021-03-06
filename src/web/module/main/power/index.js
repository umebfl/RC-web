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
import JMFX from 'SRC/module/main/power/JMFX'
import MJTY from 'SRC/module/main/power/MJTY'
import ZSJY from 'SRC/module/main/power/ZSJY'
import SY from 'SRC/module/main/power/SY'
import FKJZ from 'SRC/module/main/power/FKJZ'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_D,
} from 'SRC/theme'

class Mod extends Component {

    componentWillMount() {
        this.props.action.search()

        this.interval = setInterval(
            () => this.props.action.refresh(),
            2000 * 60,
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
            <div style={{width: '100%', height: '100%'}}>
                <Top history={history} nav={nav}/>
                <div style={{height: '100%', paddingLeft: '300px', position: 'relative'}}>
                    <div style={{position: 'absolute', left: 0, top: 0, width: '300px', height: '100%'}}>
                        <Nav history={history} nav={nav} root={'power'}/>
                    </div>
                    <div style={{width: '100%', height: '100%'}}>
                        <Switch>
                            <Route path='/power/JMFX' component={JMFX}/>
                            <Route path='/power/SSKW' component={SSKW}/>
                            <Route path='/power/MJTY' component={MJTY}/>
                            <Route path='/power/ZSJY' component={ZSJY}/>
                            <Route path='/power/SY' component={SY}/>
                            <Route path='/power/FKJZ' component={FKJZ}/>
                            {/*<Redirect from='*' to='/404'/>*/}
                        </Switch>
                    </div>
                </div>
            </div>
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
