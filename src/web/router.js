import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route path='/about'>
                    <About/>
                </Route>
                <Route path='/users'>
                    <Users/>
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
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/users'>Users</Link>
            </li>
        </ul>
    </nav>
)

const About = () => (
    <nav>
        <h2>About</h2>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/users'>Users</Link>
            </li>
        </ul>
    </nav>
)

const Users = () => (
    <nav>
        <h2>Users</h2>
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/users'>Users</Link>
            </li>
        </ul>
    </nav>
)
