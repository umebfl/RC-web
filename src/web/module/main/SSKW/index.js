import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'
import {
    Route,
    Link,
} from 'react-router-dom'

import Content from 'SRC/cmp/content'

import T3 from 'SRC/module/main/SSKW/T3'

export default ({history}) => (
    <Flex style={{
        height: '100%',
    }}>
        <Nav/>
        <Content>
            <p>{JSON.stringify(history)}</p>
            <p>SSKW</p>
            <Route path='/power/SSKW/T3'>
                <T3/>
            </Route>
        </Content>
    </Flex>
)
