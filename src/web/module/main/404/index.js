import {
    Route,
    Link,
    Redirect,
} from 'react-router-dom'

export default () => <Route path='*' render={() => <div>404</div>}/>
