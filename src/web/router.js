import {
    Component,
} from 'react'

import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'

import Main from 'SRC/module/main'

import Flex from 'SRC/cmp/flex'

export default () => (
    <Router>
        <Switch>
            <Route exact path='/' render={() => <Redirect to='/power/SSKW/SJHQ'/>}/>
            <Route path='/' component={Main}/>
        </Switch>
    </Router>
)
