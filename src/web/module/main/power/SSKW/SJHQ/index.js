import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'
import {
    Route,
    Link,
} from 'react-router-dom'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import {
    action,
} from './reducer'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_W,
    VITRIC_DDD,
} from 'SRC/theme'

import Content from 'SRC/cmp/content'

const Mod = ({
    SJHQ,
    action,
}) => (
    <Flex style={{
        height: '100%',
        flexDirection: 'column',
        flex: 1,
        padding: 20,
    }}>
        <Flex
            style={{
                background: VITRIC_DDD,
                width: 120,
                height: 40,
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
            }}
            onClick={() =>　action.refresh()}>
            刷新
        </Flex>

        <Flex style={{padding: '10px 0'}}>总计: {SJHQ.finish_count}</Flex>

        <Flex style={{flexDirection: 'column'}}>
            <Flex style={{
                height: 30,
                alignItems: 'center',
                borderBottom: '1px solid',
            }}>
                <Flex style={{width: 150}}>名称</Flex>
                <Flex style={{width: 100}}>开盘价</Flex>
                <Flex style={{width: 100}}>合约期数</Flex>
                <Flex style={{width: 100}}>总数</Flex>
            </Flex>
            {
                R.compose(
                    R.addIndex(R.map)(
                        (v, k) => (
                            <Flex key={k} style={{
                                height: 40,
                                alignItems: 'center',
                            }}>
                                <Flex style={{width: 150}}>{`${v.name} - ${v.code}${v.month}`}</Flex>
                                <Flex style={{width: 100}}>{v.current_data.开盘价}</Flex>
                                <Flex style={{width: 100}}>{v.contract_data.length}</Flex>
                                <Flex style={{width: 100}}>{v.all_contract_data.length}</Flex>
                            </Flex>
                        ),
                    ),
                )(SJHQ.origin_data)
            }
        </Flex>
    </Flex>
)

export default connect(
    state => ({
        SJHQ: state.SJHQ,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    }),
)(Mod)
