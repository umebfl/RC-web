import Flex from 'SRC/cmp/flex'

import {
    VITRIC_W,
} from 'SRC/theme'

const TAB = payload => (
    <Flex className={`hover vitric ${payload.active ? 'active' : ''}`} style={{
        fontSize: 16,
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    }}>
        {payload.text}
    </Flex>
)

export default payload => (
    <Flex style={{
        width: '100%',
        height: 50,
        background: VITRIC_W,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }}>
        <TAB text='POWER' active={true}/>
        <TAB text='NOTE'/>
    </Flex>
)
