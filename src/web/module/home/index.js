import {
    Component,
} from 'react'

import {
    Link,
} from 'react-router-dom'

class Mod extends Component {
    render() {
        return (
            <nav>
                <h2>Home</h2>
                <ul>
                    <li>
                        <Link to='/count'>count</Link>
                    </li>
                    <li>
                        <Link to='/chapter_1_string'>chapter_1_string</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Mod
