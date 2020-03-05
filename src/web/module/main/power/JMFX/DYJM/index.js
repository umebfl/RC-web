import {
    Component,
} from 'react'

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

import echarts from 'echarts'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_D,
    VITRIC_DD,
    VITRIC_DDD,
    MAIN_L,
    MAIN,
} from 'SRC/theme'

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

import Flex from 'SRC/cmp/flex'
import Nav from 'SRC/cmp/nav'

export const Item_list = ({data, active_key, handle_select}) => (
    <div style={{padding: 10}}>
        {
            R.addIndex(R.map)(
                (v, k) => (
                    <div
                        className={`hover item ${active_key === k ? 'active' : ''}`}
                        key={k}
                        onClick={() =>　handle_select(k)}
                        style={{
                            // float: 'left',
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
                    </div>
                ),
            )(data)
        }
    </div>
)

const build_all_contract_data_chart = (data) => {
    const all_contract_data_chart = echarts.init(document.getElementById('DYJM-all_contract_data'))

    all_contract_data_chart.setOption({
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
            text: `${data.name} ${data.code}0`,
        },
        xAxis: [
            {
                data: R.map(v => v['日期'])(data.all_contract_data),
            },
        ],
        yAxis: [
            {
                splitLine: {show: false},
                min: data.all_contract_low['开盘价'],
            },
            {
                splitLine: {show: false},
            },
        ],
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: R.map(v => v['开盘价'])(data.all_contract_data),
                animation: false,
                lineStyle: {
                    color: red[5],
                    width: 1,
                    shadowBlur: 0,
                },
            },
            {
                type: 'line',
                showSymbol: false,
                data: R.map(v => v['开盘价'])(data.all_contract_data),
                animation: false,
                lineStyle: {
                    color: blue[5],
                    width: 1,
                    shadowBlur: 0,
                },
                yAxisIndex: 1,
            },
        ],
    })

}

const build_contract_data_chart = (data) => {
    const contract_data_chart = echarts.init(document.getElementById('DYJM-contract_data'))

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
                data: R.map(v => v['日期'])(data.contract_data),
            },
        ],
        yAxis: [
            {
                splitLine: {show: false},
                min: data.contract_low['开盘价'],
            },
            {
                splitLine: {show: false},
            },
        ],
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: R.map(v => v['开盘价'])(data.contract_data),
                animation: false,
                lineStyle: {
                    color: red[5],
                    width: 1,
                    shadowBlur: 0,
                },
            },
            {
                type: 'line',
                showSymbol: false,
                data: R.map(v => v['开盘价'])(data.contract_data),
                animation: false,
                lineStyle: {
                    color: blue[5],
                    width: 1,
                    shadowBlur: 0,
                },
                yAxisIndex: 1,
            },
        ],
    })
}

const build_contract_amplitude_chart = (data) => {
    const chart = echarts.init(document.getElementById('DYJM-contract_amplitude'))
    const hl_day_amplitude = data.analy.contract_day_amplitude.hl_day_amplitude

    const {
        lv0 = [],
        lv1 = [],
        lv2 = [],
        lv3 = [],
        lv4 = [],
        lv5 = [],
    } = hl_day_amplitude

    chart.setOption({
        title: {
            left: '5%',
            top: '5%',
            text: '合约期 日内极端波幅分段',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {             // 坐标轴指示器，坐标轴触发有效
                type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
                const tar = params[1]
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
            },
        },
        xAxis: {
            type: 'category',
            splitLine: {show: false},
            data: ['总天数', '0-1', '1-2', '2-3', '3-4', '4-5', '5以上'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)',
                },
                emphasis: {
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)',
                    },
                },
                data: [
                    0,
                    0,
                    lv0.length,
                    lv0.length + lv1.length,
                    lv0.length + lv1.length + lv2.length,
                    lv0.length + lv1.length + lv2.length + lv3.length,
                    lv0.length + lv1.length + lv2.length + lv3.length + lv4.length,
                ],
            },
            {
                name: '波幅分段',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'inside',
                },
                data: [
                    data.contract_data.length,
                    lv0.length,
                    lv1.length,
                    lv2.length,
                    lv3.length,
                    lv4.length,
                    lv5.length,
                ],
            },
        ],
    })

}

const build_price_group_chart = (data) => {
    const all_contract_chart = echarts.init(document.getElementById('DYJM-all_contract_price_group'))
    const contract_chart = echarts.init(document.getElementById('DYJM-contract_price_group'))

    const contract_data = data.contract_data
    const all_contract_data = data.all_contract_data

    const group_all_contract_data = data.analy.price_state.group_all_contract_data
    const group_contract_data = data.analy.price_state.group_contract_data

    const get_chart_option = (title, data, group) => {
        const {
            lv0 = [],
            lv1 = [],
            lv2 = [],
            lv3 = [],
            lv4 = [],
            lv5 = [],
            lv6 = [],
            lv7 = [],
            lv8 = [],
            lv9 = [],
        } = group

        return {
            title: {
                left: '5%',
                top: '5%',
                text: title,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {             // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (params) => {
                    const tar = params[1]
                    const data = group[`lv${tar.dataIndex - 1}`] || []
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + ` (${data[data.length - 1]?.开盘价} - ${data[0]?.开盘价})`
                },
            },
            xAxis: {
                type: 'category',
                splitLine: {show: false},
                data: ['总天数', '0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
            },
            yAxis: {
                type: 'value',
                max: data.length,
            },
            series: [
                {
                    name: '辅助',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)',
                    },
                    emphasis: {
                        itemStyle: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)',
                        },
                    },
                    data: [
                        0,
                        0,
                        lv0.length,
                        lv0.length + lv1.length,
                        lv0.length + lv1.length + lv2.length,
                        lv0.length + lv1.length + lv2.length + lv3.length,
                        lv0.length + lv1.length + lv2.length + lv3.length + lv4.length,
                        lv0.length + lv1.length + lv2.length + lv3.length + lv4.length + lv5.length,
                        lv0.length + lv1.length + lv2.length + lv3.length + lv4.length + lv5.length + lv6.length,
                        lv0.length + lv1.length + lv2.length + lv3.length + lv4.length + lv5.length + lv6.length + lv7.length,
                        lv0.length + lv1.length + lv2.length + lv3.length + lv4.length + lv5.length + lv6.length + lv7.length + lv8.length,
                    ],
                },
                {
                    name: '价格分段',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'inside',
                    },
                    data: [
                        data.length,
                        lv0.length,
                        lv1.length,
                        lv2.length,
                        lv3.length,
                        lv4.length,
                        lv5.length,
                        lv6.length,
                        lv7.length,
                        lv8.length,
                        lv9.length,
                    ],
                },
            ],
        }
    }

    all_contract_chart.setOption(get_chart_option('全期 价格分段', all_contract_data, group_all_contract_data))
    contract_chart.setOption(get_chart_option('合约期 价格分段', contract_data, group_contract_data))
}

const build_bull_bear_group = data => {
    const all_contract_chart = echarts.init(document.getElementById('DYJM-all_contract_bull_bear_group'))
    const contract_chart = echarts.init(document.getElementById('DYJM-contract_bull_bear_group'))

    all_contract_chart.clear()
    contract_chart.clear()

    const all_contract_data = data.all_contract_data
    const contract_data = data.contract_data

    const all_contract_low = data.all_contract_low
    const contract_low = data.contract_low

    const all_contract_bull_bear_group_data = data.analy.bull_bear_group.all_contract_bull_bear_group_data
    const contract_bull_bear_group_data = data.analy.bull_bear_group.contract_bull_bear_group_data

    const get_chart_option = (title, data, all_data, low) => {

        return {
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
                text: title,
            },
            xAxis: [
                {
                    data: R.map(v => v['日期'])(all_data),
                },
            ],
            yAxis: [
                {
                    splitLine: {show: false},
                    min: low['开盘价'],
                },
                {
                    splitLine: {show: false},
                },
            ],
            series: [
                ...R.addIndex(R.map)(
                    (v, k) => {
                        return {
                            type: 'line',
                            showSymbol: false,
                            data: v.chart_data,
                            animation: false,
                            lineStyle: {
                                color: v.dir === 'up' ? red[5] : v.dir === 'down' ? green[5] : blue[5],
                                width: 1,
                                shadowBlur: 0,
                            },
                            yAxisIndex: 0,
                        }
                    },
                )(data),
                // {
                //     type: 'line',
                //     showSymbol: false,
                //     data: R.map(v => v['开盘价'])(data.contract_data),
                //     animation: false,
                //     lineStyle: {
                //         color: red[5],
                //         width: 1,
                //         shadowBlur: 0,
                //     },
                // },
            ],
        }
    }

    // all_contract_chart.setOption(get_chart_option('全期 行情分段', all_contract_bull_bear_group_data, all_contract_data, all_contract_low))
    contract_chart.setOption(get_chart_option('合约期 行情分段', contract_bull_bear_group_data, contract_data, contract_low))
}

const Info = ({data}) => (
    <Flex style={{flexDirection: 'column'}}>
        <Flex style={{
            borderBottom: '1px solid #333',
            paddingBottom: 2,
            marginBottom: 2,
        }}>
            <Flex style={{width: 150, marginRight: 10, justifyContent: 'flex-end'}}></Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>最低价</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>最高价</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                间距
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                真间距
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                阶段
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                分段
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                均状态
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                总波幅
            </Flex>
        </Flex>
        <Flex>
            <Flex style={{width: 150, marginRight: 10, justifyContent: 'flex-end'}}>全期最低/高价:</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>{data.all_contract_low['开盘价']}</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>{data.all_contract_high['开盘价']}</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.all_contract_hl_gap_rate.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.all_contract_hl_gap_rate_fixed.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.analy.price_state.all_contract_price_state_by_price.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.analy.price_state.all_contract_price_state_by_avg.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.analy.price_state.all_contract_price_state_by_sort.toFixed(2)}
            </Flex>
        </Flex>
        <Flex>
            <Flex style={{width: 150, marginRight: 10, justifyContent: 'flex-end'}}>合约期最低/高价:</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>{data.contract_low['开盘价']}</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>{data.contract_high['开盘价']}</Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.contract_hl_gap_rate.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.contract_hl_gap_rate_fixed.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.analy.price_state.contract_price_state_by_price.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.analy.price_state.contract_price_state_by_sort.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.analy.price_state.contract_price_state_by_avg.toFixed(2)}
            </Flex>
            <Flex style={{width: 60, marginRight: 10, justifyContent: 'flex-end'}}>
                {data.contract_data_day_amplitude_rate_fixed_sum.toFixed(2)}
            </Flex>
        </Flex>
    </Flex>
)

const Contract_data_list = ({data}) => {

    return (
        <div>
            <div>
                {
                    `${data[0].日期} 至 ${data[data.length - 1].日期}`
                }
            </div>
            {
                R.addIndex(R.map)(
                    (v, k) => (
                        <div key={k} style={{display: 'inline-block', background: VITRIC_D, margin: 5}}>
                            <div style={{
                                display: 'inline-block',
                                width: 50,
                                textAlign: 'right',
                                marginRight: 10,
                                color: Math.abs(v.day_amplitude_rate_fixed) > 1.5 ? blue[8] : 'inherit',
                                fontWeight: Math.abs(v.day_amplitude_rate_fixed) > 1.5 ? 'bold' : 'normal',
                            }}>
                                {v.day_amplitude_rate_fixed.toFixed(2)}
                            </div>
                            <div style={{
                                display: 'inline-block',
                                width: 50,
                                textAlign: 'right',
                                marginRight: 10,
                                color: v.hl_day_amplitude_rate_fixed > 4 ? red[8] : 'inherit',
                                fontWeight: v.hl_day_amplitude_rate_fixed > 4 ? 'bold' : 'normal',
                            }}>
                                {v.hl_day_amplitude_rate_fixed.toFixed(2)}
                            </div>
                        </div>
                    ),
                )(R.take(100)(data))
            }
        </div>
    )
}

class Mod extends Component {

    constructor(props) {
        super(props)
        this.state = {
            active_key: 0,
        }
    }

    componentDidMount() {
        this.handle_select(0)
    }

    handle_select(k) {
        const {
            SJHQ: {
                cal_data,
            },
        } = this.props

        this.setState({
            active_key: k,
        })

        const data = cal_data[k]

        if(data) {
            // 更新图表
            build_all_contract_data_chart(data)
            build_contract_data_chart(data)
            build_contract_amplitude_chart(data)
            build_price_group_chart(data)
            build_bull_bear_group(data)
        }

    }

    render() {

        const {
            SJHQ: {
                cal_data,
            },
        } = this.props

        const {
            active_key,
        } = this.state

        return (
            <div style={{
                height: '100%',
                padding: 20,
                overflow: 'hidden auto',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
            }}>
                <Item_list data={cal_data} active_key={active_key} handle_select={k => this.handle_select(k)}/>

                {
                    cal_data[active_key] ? <Info data={cal_data[active_key]}/> : null
                }

                <div id='DYJM-contract_bull_bear_group' style={{display: 'inline-block', width: '50%', height: 300}}/>
                <div id='DYJM-all_contract_bull_bear_group' style={{display: 'inline-block', width: '50%', height: 300}}/>

                <div id='DYJM-all_contract_price_group' style={{display: 'inline-block', width: '50%', height: 300}}/>
                <div id='DYJM-contract_price_group' style={{display: 'inline-block', width: '50%', height: 300}}/>

                <div id='DYJM-contract_amplitude' style={{display: 'inline-block', width: '50%', height: 300}}/>

                <div id='DYJM-contract_data' style={{display: 'inline-block', width: '50%', height: 300}}/>
                <div id='DYJM-all_contract_data' style={{display: 'inline-block', width: '50%', height: 300}}/>

                {
                    cal_data[active_key] ? <Contract_data_list data={cal_data[active_key].contract_data}/> : null
                }

            </div>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
        SJHQ: state.SJHQ,
    }),
)(Mod)
