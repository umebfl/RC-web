import {
    Component,
} from 'react'

import {
    Route,
    Link,
    Redirect,
    Switch,
} from 'react-router-dom'

import {
    bindActionCreators,
} from 'redux'

import {
    connect,
} from 'react-redux'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'
import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'

import {
    VITRIC,
    VITRIC_L,
    VITRIC_D,
    VITRIC_DD,
    VITRIC_DDD,
} from 'SRC/theme'

const PRICE_STATE = [
    // 0-25 低 25
    // 25-45 中低 20
    // 45-55 中位盘 10
    // 55-75 中高盘 20
    // 75-100 高位盘 25
    25,
    45,
    55,
    75,
    100,
]

const capital = {
    up: 26000,
    down: 36000,
}

const data = {
    // 总本金
    total: 340000,

    // 品种金额
	temporary: [
		/*
		{
			account: '广2',
			code: 'cf',
			num: -500,
			up: 500,
		},
		*/
		/*
		{
			account: '广2',
			code: 'p',
			num: -600,
			up: 400 + 200,	// 2020-07-24 22:43
		},
		*/
		/*
		{
			account: '中信',
			code: 'fu',
			num: -700,
			up: 450 + 250,	// 2020-07-24 21:42
		},
		*/
		/*
		{
			account: '永安',
			code: 'bu',
			num: -1050,
			price: 2840, // 2874开
			count: 3,
			up: 1500,	// 2848平
		},
		*/
		/*
		{
			account: '永安',
			code: 'pp',
			num: -700,
			price: 7224,
			count: 2,
			up: 100 + 200 + 500,
		},
		*/
		/*
		{
			account: '广2',
			code: 'cf',
			num: -3400,
			price: 12500,
			count: 2,
			up: 2200 + 300 + 600 + 650,
		},
		*/
		/*
		{
			account: '广1',
			code: 'ru',
			num: -1000,
			up: 0,
			price: 11830,
			count: 1,
			up: 4700,
		},
		*/
		{
			account: '广1',
			code: 'y',
			num: -1600 -1820 - 2080,
			up: 1400 + 280 + 500 + 1700 + 600,	// 20207-07-24-22:18
			price: 6106,
			count: 2,
		},

		{
			account: '广1',
			code: 'fg',
			num: -9120 - 800 - 11500,
			price: 1716,
			count: 2,
			up: 700 + 1900,
		},
		{
			account: '广1',
			code: 'ag',
			num: -13100 - 1400,
			price: 5246,
			count: 1,
			up: 280 + 1600 + 400 + 3100,
		},

		{
			account: '广1',
			code: 'ma',
			num: -2800,
			up: 250,	// 2020-07-24-21:55
		},

		{
			account: '广2',
			code: 'ta',
			num: -17640,
			price: 3582,
			count: 20 + 200,
		},
		{
			account: '广2',
			code: 'fg',
			num: -5500,
			price: 1716,
			count: 1,
		},

		{
			account: '中信',
			code: 'OI',
			num: -29000 - 3000 - 6000,
			up: 1250 + 1400,
		},
		{
			account: '中信',
			code: 'JD',
			num: -2700 - 6100,
			count: 2,
			up: 0,
		},
		{
			account: '中信',
			code: 'a',
			num: -1260,
			price: 4355, // 4355平
			count: 1,
		},

		{
			account: '永安',
			code: 'ap',
			num: -4000 - 750,
			price: 7487, // 7687开
			count: 2,
		},
	],

    // 账号
    count: [
        {
            name: '广发haq',
            breed: {
                down: ['FG', 'OI'],
                up: ['TA', 'NI'],
            },
        },
        {
            name: '广发hwh',
            breed: {
                down: ['A', 'AG'],
                up: ['RU', 'MA'],
            },
        },
        {
            name: '中信',
            breed: {
                down: ['SN'],
                up: ['SR', 'CF'],
            },
        },
    ],

	need: {
		9: [
			['广信', 0, true],
			['招信', 0, false],
			['白条', 0, true],

			['招贷', 7200, false],
			['车贷', 3600, false],
		    ['房租', 3300, false],
		],
		8: [
			['广信', 90, true],
			['白条', 36, true],
			['微信', 38000, true],
			['京东', 800, true],

			['车贷', 3600, true],
			['招贷', 3400, true],
			['房租', 3400, true],
		],
	},

    // 资金流
    cap: [
        {
            name: '广发hwh',
            // 初始资金
            num: 140000 - 20000,
            // 当前资金
            current: 80000,
            // 盈利提取
            profit: 3000 + 800 + 1200 + 1200 + 500 + 1500 + 3000 + 330 + 500 + 650 + 500 + 1000 + 2700 + -500 + -400 + -700,	// 6/14400
            // 机制提取
            motion: 6000 + 1600 + 3600 + 2400 + 1000 + 3000 + 6000 + 660 + 1000 + 1300 + 1000 + 2000 + 5400 + -1000 + -800 + -1400,
        },
        {
            name: '广发haq',
            // 初始资金
            num: 110000 + 10000 + 30000,		// 150000
            // 当前资金
            current: 100000,
            // 盈利提取
            profit: 4735 + 1100 + 900 + 600 + 800 + 2300 + 2000 + 6800 + 2800 + 4200 + 1500 + 1000 + 2300 + 1000 + 2500 + 1000 + 3700 + -200 + -900 + -400,	// 16/39500
            // 机制提取
            motion: 9470 + 3300 + 1800 + 1200 + 1600 + 4600 + 4000 + 13600 + 5600 + 8600 + 3000 + 2000 + 4600 + 2000 + 5000 + 2000 + 7400 + -400 + -1800 + -800,
        },
        {
            name: '中信',
            // 初始资金
            num: 110000 + 10000 + 30000 - 20000,		// 130000
            // 当前资金
            current: 100000,
            // 盈利提取
            profit: 2447 + 2500 + 600 + 3000 + 1400 + 4600 + 1700 + 2000 + 1500 + 2800 + 900 + 1900 + 900,	// 11/25600
            // 机制提取
            motion: 4894 + 5000 + 1200 + 6000 + 2800 + 9200 + 3400 + 4000 + 3000 + 5600 + 1800 + 3800 + 1800,
        },
        {
            name: '永安',
            // 初始资金
            num: 20000 - 10000,
            // 当前资金
            current: 20000 + 20900,
            // 盈利提取
            profit: 400 + 1500 + 900 + -1400,	//
            // 机制提取
            motion: 0,
        },
    ],
}

class Mod extends Component {

    render() {

        const {
            history,
            nav,
            SJHQ: {
                cal_data,
            },
        } = this.props

        return (
            <Content>
                <div style={{
                    height: '100%',
                    padding: 20,
                    background: VITRIC_D,
                }}>
                    <div style={{marginBottom: 20}}>
                        总本金: {data.total}
                    </div>

                    <div style={{marginBottom: 20}}>
                        {
                            R.addIndex(R.map)(
                                (v, k) => (
                                    <div>
                                        {v.name}
                                    </div>
                                ),
                            )(data.count)
                        }
                    </div>

                    <div style={{marginBottom: 20}}>
                        {
                            R.compose(
                                R.addIndex(R.map)(
                                    (v, k) => (
                                        <div style={{
                                            padding: '5px 0',
                                            borderLeft: `2px solid ${v.wprice_state < PRICE_STATE[1] ? 'green' : v.wprice_state > PRICE_STATE[3] ? 'red' : 'white'}`,
                                            background: v.wprice_state < PRICE_STATE[1] ? 'rgba(127, 217, 127, 0.43)' : v.wprice_state > PRICE_STATE[3] ? 'rgba(213, 136, 136, 0.49)' : 'rgba(255, 255, 255, 0.388)',
                                        }}>
                                            <div style={{
                                                display: 'inline-block',
                                                width: 20,
                                                marginLeft: 10,
                                            }}>
                                                {k}
                                            </div>
                                            <div style={{
                                                display: 'inline-block',
                                                width: 120,
                                            }}>
                                                {v.name} - {v.code}
                                            </div>
                                            <div style={{
                                                display: 'inline-block',
                                                width: 70,
                                            }}>
                                                {v.current_data['最新价']}
                                            </div>
                                            <div style={{
                                                display: 'inline-block',
                                                width: 70,
                                            }}>
                                                {v.whigh}
                                            </div>
                                            <div style={{
                                                display: 'inline-block',
                                                width: 70,
                                            }}>
                                                {v.wlow}
                                            </div>
                                            {
                                                R.compose(
                                                    v => (
                                                        <div style={{
                                                            display: 'inline-block',
                                                        }}>
                                                            <div style={{
                                                                display: 'inline-block',
                                                                width: 60,
                                                            }}>
                                                                {v.state.desc}
                                                            </div>

                                                            <div style={{
                                                                display: 'inline-block',
                                                                width: 50,
                                                            }}>
                                                                {v.price || '-'}%
                                                            </div>
                                                        </div>
                                                    ),
                                                    v => ({
                                                        state: v < PRICE_STATE[0]
                                                            ? {desc: '低 ', rap: PRICE_STATE[0] - v}
                                                            : v < PRICE_STATE[1]
                                                                ? {desc: '中低', rap: PRICE_STATE[1] - v}
                                                                : v < PRICE_STATE[2]
                                                                    ? {desc: '中', rap: PRICE_STATE[2] - v}
                                                                    : v < PRICE_STATE[3]
                                                                        ? {desc: '中高', rap: PRICE_STATE[3] - v}
                                                                        : {desc: '高', rap: PRICE_STATE[4] - v},
                                                        price: v,
                                                    }),
                                                    v => v.wprice_state,
                                                )(v)
                                            }
                                            <div style={{
                                                display: 'inline-block',
                                                width: 30,
                                            }}>
                                                {v.dir_rate}
                                            </div>

                                            <div style={{
                                                display: 'inline-block',
                                                width: 100,
                                                textAlign: 'right',
                                            }}>
                                                {v.bond}
                                            </div>

                                            <div style={{
                                                display: 'inline-block',
                                                width: 100,
                                                textAlign: 'right',
                                            }}>
                                                {v.wprice_state < PRICE_STATE[1]
                                                    ? (capital.up * 0.8 / v.bond).toFixed(1)
                                                    : v.wprice_state > PRICE_STATE[3]
                                                        ? (capital.down * 0.8 / v.bond).toFixed(1)
                                                        : '-'}
                                            </div>

                                            <div style={{
                                                display: 'inline-block',
                                                width: 100,
                                                textAlign: 'right',
                                                fontWeight: Math.abs(v.amplitude) > 1 ? 'bold' : 'normal',
                                                color: v.amplitude > 0 ? 'red' : 'green',
                                            }}>
                                                {v.amplitude}%
                                            </div>

                                            <div style={{
                                                display: 'inline-block',
                                                width: 100,
                                                textAlign: 'right',
                                            }}>
                                                {v.关注度}
                                            </div>

                                            <div style={{
                                                display: 'inline-block',
                                                width: 70,
                                                marginLeft: 10,
                                            }}>
                                                {v.count}
                                            </div>

                                            <div style={{
                                                display: 'inline-block',
                                                width: 400,
                                                fontSize: 12,
                                            }}>
                                                {v['评定'] ? v['评定'][0][1] : ''}
                                            </div>
                                        </div>
                                    ),
                                ),
                                R.sort((a, b) => a.wprice_state - b.wprice_state),
                            )(cal_data)
                        }
                    </div>
                </div>
            </Content>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
        SJHQ: state.SJHQ,
    }),
)(Mod)

/*<Redirect from='*' to='/404'/>*/
