import Flex from 'SRC/cmp/flex'

import {
    VITRIC_L,
} from 'SRC/theme'

export default payload => (
    <Flex style={{
        flex: 1,
        height: '100%',
        background: VITRIC_L,
        flexDirection: 'column',
    }}>
        {payload.children}
    </Flex>
)
