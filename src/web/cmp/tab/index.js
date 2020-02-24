import Flex from 'SRC/cmp/flex'

import {
    VITRIC,
    VITRIC_L,
    VITRIC_D,
    VITRIC_DD,
    VITRIC_DDD,
} from 'SRC/theme'

const Item = ({
    history,
    name,
    path,
}) => (
    <Flex
        className={`hover tab ${history.location.pathname === path ? 'active' : ''}`}
        style={{
            fontSize: 14,
            height: 50,
            minWidth: 130,
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px',
        }}
        onClick={() => history.push(path)}>
        {name}
    </Flex>
)

export default ({
    history,
    data,
    children,
}) => (
    <Flex style={{
        flex: 1,
        height: '100%',
        background: VITRIC_L,
        flexDirection: 'column',
    }}>
        <Flex>
            {
                R.addIndex(R.map)(
                    (v, k) => <Item key={k} history={history} name={v.name} path={v.path}/>,
                )(R.values(data))
            }
        </Flex>

        <Flex style={{
            background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
            flex: 1,
        }}>
            {children}
        </Flex>
    </Flex>
)
