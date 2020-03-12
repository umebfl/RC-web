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
    <div
        className={`hover tab ${history.location.pathname === path ? 'active' : ''}`}
        style={{
            display: 'inline-block',
            fontSize: 14,
            width: 130,
            textAlign: 'center',
            padding: '16px 20px',
        }}
        onClick={() => history.push(path)}>
        {name}
    </div>
)

export default ({
    history,
    data,
    children,
}) => (
    <div style={{
        height: '100%',
        background: VITRIC_L,
    }}>
        <div>
            {
                R.addIndex(R.map)(
                    (v, k) => <Item key={k} history={history} name={v.name} path={v.path}/>,
                )(R.values(data))
            }
        </div>

        <div style={{
            height: '100%',
        }}>
            {children}
        </div>
    </div>
)
