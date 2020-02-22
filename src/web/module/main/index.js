import {
    Component,
} from 'react'

import {
    Route,
    Link,
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

import Flex from 'SRC/cmp/flex'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_W,
} from 'SRC/theme'

import SSKW from 'SRC/module/main/SSKW'
import T2 from 'SRC/module/main/note/T2'

// 顶部
const Top = () => (
    <Flex style={{
        width: '100%',
        height: 50,
        background: VITRIC_W,
    }}>

    </Flex>
)

class Mod extends Component {

    componentWillMount() {
        const {
            history,
        } = this.props

        // 默认跳转
        history.location.pathname === '/' && history.push('/power/SSKW')
    }

    render() {

        const {
            history,
        } = this.props

        return (
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
                    <Route path='/power'>
                        <Route exact path='/power/SSKW' component={SSKW}/>
                    </Route>

                    <Route path='/info'>
                        <Route path='/info/T2' component={T2}/>
                    </Route>
                </Flex>

            </Flex>
        )
    }
}

export default connect(
    state => ({
        count: state.count,
    }),
    // dispatch => ({
    //     action: bindActionCreators(action, dispatch),
    // }),
)(Mod)
