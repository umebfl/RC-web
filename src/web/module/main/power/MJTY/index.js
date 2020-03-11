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

import {
    action,
} from './reducer'

import echarts from 'echarts'

import {
    red,
    volcano,
    gold,
    yellow,
    lime,
    green,
    cyan,
    blue,
    geekblue,
    purple,
    magenta,
    grey,
} from '@ant-design/colors'

import Content from 'SRC/cmp/content'
import Tab from 'SRC/cmp/tab'
import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_D,
    VITRIC_DDD,
} from 'SRC/theme'

const Deal_list = ({data}) => {

    return (
        <div style={{margin: 4}}>
            {
                R.compose(
                    R.addIndex(R.map)(
                        (v, k) => (
                            <div key={k} style={{borderBottom: '1px solid #AAA', margin: 4, height: 30, paddingTop: 4}}>
                                <div style={{display: 'inline-block', width: 50, marginLeft: 20}}>
                                    {v.name}
                                </div>
                                {
                                    v.deal_list.length
                                        ? R.compose(
                                            deal => (
                                                <div style={{display: 'inline-block'}}>
                                                    <div style={{display: 'inline-block', width: 50}}>
                                                        {R.takeLast(5)(deal.open_date)}
                                                    </div>
                                                    <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                                                        {deal.days > 30 ? `${(deal.days / 30).toFixed(1)}月` : `${deal.days}天`}
                                                    </div>
                                                    <div style={{display: 'inline-block', width: 50, textAlign: 'center'}}>
                                                        {deal.close ? '平' : '持'}
                                                    </div>
                                                    <div style={{display: 'inline-block', width: 30, color: deal.dir === 'up' ? red[5] : green[7]}}>
                                                        {deal.dir === 'up' ? '多' : '空'}
                                                    </div>
                                                    <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                                                        {deal.count}手
                                                    </div>
                                                    <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                                                        {parseInt(deal.bond * deal.count / 10000)}w
                                                    </div>
                                                    <div style={{display: 'inline-block', width: 70, textAlign: 'right', color: deal.profit > 0 ? red[5] : green[7]}}>
                                                        {(deal.profit / 10000).toFixed(2)}w
                                                    </div>
                                                    <div style={{display: 'inline-block', width: 240, textAlign: 'right', fontSize: 14}}>
                                                        {deal.add_count > 0 ? R.join(', ')([...deal.add_before_price, deal.price]) : deal.price}
                                                    </div>
                                                </div>
                                            ),
                                        )(v.deal_list[v.deal_list.length - 1])
                                        : null
                                }
                            </div>
                        ),
                    ),
                    R.sort((a, b) => a.deal_list[a.deal_list.length - 1].days - b.deal_list[b.deal_list.length - 1].days),
                )(data)
            }
        </div>
    )
}

const Item_list = ({active_key, handle_select, deduction}) => (
    <div style={{padding: 10}}>
        <div>
            <div style={{margin: 8}}>
                总盈利: {R.compose(
                    v => (
                        <div style={{display: 'inline-block', color: v > 0 ? red[5] : green[5]}}>
                            {(v / 10000).toFixed(2)}w
                        </div>
                    ),
                    R.reduce((a, b) => a + (b?.total_profit || b.current_deal?.profit || 0), 0),
                )(deduction)}
            </div>
        </div>
        {
            R.compose(
                R.addIndex(R.map)(
                    (v, k) => (
                        <div
                            key={`${v.name}${k}`}
                            className={`hover item ${active_key === k ? 'active' : ''}`}
                            onClick={() => handle_select(k)}
                            style={{
                                display: 'inline-block',
                                textAlign: 'center',
                                margin: '5px 10px',
                                width: 120,
                                padding: '8px 0',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}>
                            {v.name}
                            <div style={{display: 'inline-block', marginLeft: 4, color: v.total_profit > 0 ? red[5] : green[5]}}>
                                {((v.total_profit || v.current_deal?.profit) / 10000).toFixed(2)}
                            </div>
                        </div>
                    ),
                ),
            )(deduction)
        }
    </div>
)

const TY_List = ({data, active_key}) => (
    <div style={{marginBottom: 20}}>
        <div>
            <div style={{margin: 4, borderBottom: '1px solid'}}>
                <div style={{display: 'inline-block', margin: 4, width: 120}}>
                    日期({data?.deal_list.length})
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 40}}>
                    持续
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 40}}>
                    方向
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 40}}>
                    数量
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 60}}>
                    平价
                </div>
                {
                    R.compose(
                        v => (
                            <div style={{display: 'inline-block', margin: 4, width: 70, color: v > 0 ? red[7] : green[7]}}>
                                {(v / 10000).toFixed(2)}w
                            </div>
                        ),
                        R.reduce((a, b) => a + b.profit, 0),
                    )(data?.deal_list || [])
                }
                <div style={{display: 'inline-block', margin: 4, width: 60}}>
                    保证金
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 120}}>
                    价格
                </div>
            </div>

            {
                R.addIndex(R.map)(
                    (v, k) => (
                        <div key={`${active_key}${k}`}>
                            <div style={{display: 'inline-block', margin: 4, width: 120}}>
                                {R.takeLast(5)(v.open_date)}至{R.takeLast(5)(v.close_date)}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 40}}>
                                {v.days}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 40, color: v.dir === 'up' ? red[7] : green[7]}}>
                                {v.dir === 'up' ? '多' : '空'}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 40}}>
                                {v.count}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 60}}>
                                {v.close_price}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 70, fontWeight: Math.abs(v.profit) > 10000 ? 'bold' : 'normal', color: v.profit > 0 ? red[7] : green[7]}}>
                                {v.profit}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 60}}>
                                {v.bond.toFixed(0)}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 280, fontSize: 14}}>
                                {v.add_count > 0 ? R.join(', ')([...v.add_before_price, v.price]) : v.price}
                            </div>
                        </div>
                    ),
                )(data?.deal_list || [])
            }
        </div>
    </div>
)


const build_contract_data_chart = (data) => {
    const contract_data_chart = echarts.init(document.getElementById('MJTY-contract_data'))

    const {
        day_list,
        deal_chart_list,
        high_chart_list,
        low_chart_list,
    } = data

    contract_data_chart.clear()

    contract_data_chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999',
                },
            },
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
            },
        },
        visualMap: {
            show: false,
            type: 'continuous',
        },
        title: {
            left: '5%',
            top: '5%',
            text: `${data.name} ${data.code}${data.month}`,
        },
        xAxis: [
            {
                data: R.map(v => v['日期'])(day_list),
            },
        ],
        yAxis: [
            {
                splitLine: {show: false},
                min: data.contract_low['收盘价'],
            },
            {
                splitLine: {show: false},
            },
        ],
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: R.map(v => v['收盘价'])(day_list),
                animation: false,
                lineStyle: {
                    color: blue[7],
                    width: 1,
                    shadowBlur: 0,
                },
            },
            // {
            //     type: 'line',
            //     showSymbol: false,
            //     data: R.map(v => v['收盘价'])(day_list),
            //     animation: false,
            //     lineStyle: {
            //         color: blue[3],
            //         width: 1,
            //         shadowBlur: 0,
            //     },
            //     yAxisIndex: 1,
            // },

            {
                type: 'line',
                showSymbol: false,
                data: high_chart_list,
                animation: false,
                lineStyle: {
                    color: blue[3],
                    width: 1,
                    shadowBlur: 0,
                },
            },

            {
                type: 'line',
                showSymbol: false,
                data: low_chart_list,
                animation: false,
                lineStyle: {
                    color: blue[3],
                    width: 1,
                    shadowBlur: 0,
                },
            },

            ...R.map(
                v => ({
                    type: 'line',
                    showSymbol: false,
                    data: v.y,
                    animation: false,
                    lineStyle: {
                        color: v.dir === 'up' ? red[5] : gold[5],
                        width: 2,
                        shadowBlur: 0,
                    },
                }),
            )(deal_chart_list || []),
        ],
    })
}

class Mod extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active_key: null,
        }
    }

    componentDidMount() {
        this.props.action.deduction()
    }

    handle_select(k) {
        const {
            MJTY: {
                deduction,
            },
            action,
        } = this.props

        this.setState({
            active_key: k,
        })

        if(deduction) {
            build_contract_data_chart(deduction[k])
        }

    }

    render() {

        const {
            history,
            nav,
            action,
            MJTY: {
                deduction,
            },
        } = this.props

        const {
            active_key,
        } = this.state

        return (
            <Content>
                <div style={{
                    height: '100%',
                    background: VITRIC_D,
                    overflowY: 'auto',
                }}>
                    <Deal_list data={deduction}/>

                    <Item_list deduction={deduction} active_key={active_key} handle_select={k => this.handle_select(k)}/>

                    <div id='MJTY-contract_data' style={{background: 'rgba(255, 255, 255, 0.7)', display: 'inline-block', width: '98%', height: 600}}/>

                    {
                        active_key !== null
                            ? <TY_List data={deduction[active_key]} active_key={active_key}/>
                            : null
                    }
                </div>
            </Content>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
        MJTY: state.MJTY,
        SJHQ: state.SJHQ,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    }),
)(Mod)
