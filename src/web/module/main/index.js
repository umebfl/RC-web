import {
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom'

import Power from 'SRC/module/main/power'
import Mod_404 from 'SRC/module/main/404'

import Flex from 'SRC/cmp/flex'

export default () => (
    <Flex style={{
        height: '100%',
        flexDirection: 'column',
    }}>
        <Switch>
            <Route path='/power' component={Power}/>
            <Route path='/404' component={Mod_404}/>
            <Redirect from='*' to='/404'/>
        </Switch>
    </Flex>
)
