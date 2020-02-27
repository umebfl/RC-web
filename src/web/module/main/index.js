import {
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom'

import Power from 'SRC/module/main/power'
import Note from 'SRC/module/main/note'
import Mod_404 from 'SRC/module/main/404'

import Flex from 'SRC/cmp/flex'

export default () => (
    <Switch>
        <Route path='/power' component={Power}/>
        <Route path='/note' component={Note}/>
        <Route path='/404' component={Mod_404}/>
        <Redirect from='*' to='/404'/>
    </Switch>
)
