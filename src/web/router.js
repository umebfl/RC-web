import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'

import Chapter_1_string from 'SRC/module/chapter_1_string'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route path='/chapter_1_string'>
                    <Chapter_1_string/>
                </Route>
            </Switch>
        </Router>
    )
}

const Home = () => (
    <nav>
        <h2>Home</h2>
        <ul>
            <li>
                <Link to='/chapter_1_string'>chapter_1_string</Link>
            </li>
        </ul>
    </nav>
)
