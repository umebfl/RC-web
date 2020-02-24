import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'nav'

const init_state = {
    power: {
        name: '技能',
        path: '/power',
        default_path: '/power/SSKW/SJHQ',
        node: {
            SSKW: {
                name: '嗜血渴望',
                path: '/power/SSKW',
                default_path: '/power/SSKW/SJHQ',
                node: {
                    SJHQ: {
                        name: '数据获取',
                        path: '/power/SSKW/SJHQ',
                    },
                    PZSX: {
                        name: '品种筛选',
                        path: '/power/SSKW/PZSX',
                    },
                },
            },
            RDDC: {
                name: '弱点洞察',
                path: '/power/RDDC',
                default_path: '/power/RDDC',
                node: {},
            },
            WJDC: {
                name: '危机洞察',
                path: '/power/WJDC',
                default_path: '/power/WJDC',
                node: {},
            },
            QDLJ: {
                name: '强断连接',
                path: '/power/QDLJ',
                default_path: '/power/QDLJ',
                node: {},
            },
            SHJS: {
                name: '伤害加深',
                path: '/power/SHJS',
                default_path: '/power/SHJS',
                node: {},
            },
            DXFS: {
                name: '多线分身',
                path: '/power/DXFS',
                default_path: '/power/DXFS',
                node: {},
            },
            MJTY: {
                name: '梦境推演',
                path: '/power/MJTY',
                default_path: '/power/MJTY',
                node: {},
            },
            JMFX: {
                name: '建模分析',
                path: '/power/JMFX',
                default_path: '/power/JMFX',
                node: {},
            },
            FXPG: {
                name: '风险评估',
                path: '/power/FXPG',
                default_path: '/power/FXPG',
                node: {},
            },
            SY: {
                name: '盛宴',
                path: '/power/SY',
                default_path: '/power/SY',
                node: {},
            },
        },
    },

    note: {
        name: '记录',
        path: '/note',
        default_path: '/note/T2',
    },
}

const module_setter = createAction(`${MODULE_KEY}_setter`)

export const action = {

}

export default handleActions({
    [module_setter]: (state, {payload}) => ({
        ...state,
        ...payload,
    }),
}, init_state)
