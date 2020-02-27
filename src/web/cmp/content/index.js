import Flex from 'SRC/cmp/flex'

import {
    VITRIC_L,
} from 'SRC/theme'

export default payload => (
    <div style={{
        width: '100%',
        height: '100%',
        // background: VITRIC_L,
        overflow: 'hidden',
    }}>
        <div style={{height: '88%', margin: '2%', overflow: 'hidden'}}>
            {payload.children}
        </div>
    </div>
)
