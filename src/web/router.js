import {
    Component,
} from 'react'

import {
    HashRouter as Router,
    Redirect,
    Route,
} from 'react-router-dom'

import Main from 'SRC/module/main'

export default class Mod extends Component {
    render() {
        return (
            <Router>
                <Route path='/' component={Main}/>
            </Router>
        )
    }
}
