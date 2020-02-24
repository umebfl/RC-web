import * as R from 'ramda'
import Flex from 'SRC/cmp/flex'

import {
    VITRIC_W,
    VITRIC_D,
    VITRIC_DD,
    VITRIC_DDD,
    WHITE,
} from 'SRC/theme'

import {
    Link,
} from 'react-router-dom'

const check_active = (path, active_path) => R.indexOf(active_path)(path) === 0

const TAB = payload => (
    <Flex
        onClick={() => payload.history.push(payload.path)}
        className={`hover vitric ${payload.active ? 'active' : ''}`}
        style={{
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
        background: WHITE,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }}>
        <TAB text='POWER' history={payload.history} path={payload.nav.power.default_path} active={check_active(payload.history.location.pathname, '/power')}/>
        <TAB text='NOTE' history={payload.history} path={payload.nav.note.default_path} active={check_active(payload.history.location.pathname, '/note')}/>
    </Flex>
)
