import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'

import Home from 'SRC/module/home'
import Count from 'SRC/module/count'
import Chapter_1_string from 'SRC/module/chapter_1_string'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/count'>
                    <Count/>
                </Route>
                <Route path='/chapter_1_string'>
                    <Chapter_1_string/>
                </Route>
            </Switch>
        </Router>
    )
}
