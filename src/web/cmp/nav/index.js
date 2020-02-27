import Flex from 'SRC/cmp/flex'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_D,
    VITRIC_DD,
    VITRIC_DDD,
} from 'SRC/theme'

export default ({history, nav}) => (
    <div style={{
        width: '100%',
        height: '100%',
        background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
    }}>
        {
            R.addIndex(R.map)(
                (v, k) => (
                    <Flex
                        key={k}
                        onClick={() => history.push(v.default_path)}
                        className={`hover dark ${R.indexOf(v.path)(history.location.pathname) === 0 ? 'active' : ''}`}
                        style={{
                            height: 50,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingLeft: 25,
                            borderBottom: '1px solid rgba(191, 191, 191, 0.8)',
                            fontSize: 16,
                        }}>
                        {v.name}
                    </Flex>
                ),
            )(R.values(nav.power.node))
        }
    </div>
)
