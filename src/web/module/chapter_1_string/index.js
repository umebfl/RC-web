import {
    Link,
} from 'react-router-dom'

export default () => (
    <nav>
        <p>
            <Link to='/'>返回</Link>
        </p>
        <h2>字符串模板</h2>

        <div>
            {
                `2 * 3 = ${2 * 3}`
            }
        </div>

    </nav>
)
