import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'
import {
    Route,
    Link,
    Redirect,
    Switch,
} from 'react-router-dom'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_W,
} from 'SRC/theme'

import T2 from 'SRC/module/main/power/SSKW/T2'
import T3 from 'SRC/module/main/power/SSKW/T3'

import Content from 'SRC/cmp/content'

export default ({history}) => (
    <Content>
        <p>SSKW</p>
        <Switch>
            <Route path='/power/SSKW/T3' component={T3}/>
            <Route path='/power/SSKW/T2' component={T2}/>
            <Redirect from='*' to='/404'/>
        </Switch>
    </Content>
)
