import {
    createAction,
    handleActions,
} from 'redux-actions'

export const MODULE_KEY = 'nav'

const init_state = {
    power: {
        name: '技能',
        path: '/power',
        default_path: '/power/JMFX/DYJM',
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
            JMFX: {
                name: '建模分析',
                path: '/power/JMFX',
                default_path: '/power/JMFX/DYJM',
                node: {
                    DYJM: {
                        name: '单一建模',
                        path: '/power/JMFX/DYJM',
                    },
                    ZTTB: {
                        name: '整体图表',
                        path: '/power/JMFX/ZTTB',
                    },
                },
            },
            MJTY: {
                name: '梦境推演',
                path: '/power/MJTY',
                default_path: '/power/MJTY/JYTX',
                node: {
                    JYTX: {
                        name: '交易提示',
                        path: '/power/MJTY/JYTX',
                    },
                    JYFX: {
                        name: '交易分析',
                        path: '/power/MJTY/JYFX',
                    },
                    JYTB: {
                        name: '交易图表',
                        path: '/power/MJTY/JYTB',
                    },
                },
            },
            // RDDC: {
            //     name: '弱点洞察',
            //     path: '/power/RDDC',
            //     default_path: '/power/RDDC',
            //     node: {},
            // },
            // WJDC: {
            //     name: '危机洞察',
            //     path: '/power/WJDC',
            //     default_path: '/power/WJDC',
            //     node: {},
            // },
            // QDLJ: {
            //     name: '强断连接',
            //     path: '/power/QDLJ',
            //     default_path: '/power/QDLJ',
            //     node: {},
            // },
            // SHJS: {
            //     name: '伤害加深',
            //     path: '/power/SHJS',
            //     default_path: '/power/SHJS',
            //     node: {},
            // },
            // FXPG: {
            //     name: '风险评估',
            //     path: '/power/FXPG',
            //     default_path: '/power/FXPG',
            //     node: {},
            // },

            ZSJY: {
                name: '真实交易',
                path: '/power/ZSJY',
                default_path: '/power/ZSJY/JYLB',
                node: {
                    JYLB: {
                        name: '交易列表',
                        path: '/power/ZSJY/JYLB',
                    },
                    PZXX: {
                        name: '品种信息',
                        path: '/power/ZSJY/PZXX',
                    },
                },
            },
            SY: {
                name: '盛宴',
                path: '/power/SY',
                default_path: '/power/SY/ZJFP',
                node: {
                    ZJFP: {
                        name: '资金分配',
                        path: '/power/SY/ZJFP',
                    },
                },
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
