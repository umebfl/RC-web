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

export default () => (
    <Router>
        <Switch>
            <Route exact path='/' render={() => <Redirect to='/power/JMFX/DYJM'/>}/>
            <Route path='/' component={Main}/>
        </Switch>
    </Router>
)
