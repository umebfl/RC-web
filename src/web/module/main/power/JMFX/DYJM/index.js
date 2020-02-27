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

const Item_list = ({data, active_key, handle_select}) => (
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

const Info = ({data}) => (
    <Flex style={{flexDirection: 'column'}}>
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
        </Flex>
    </Flex>
)

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
                overflowX: 'hidden',
                overflowY: 'auto',
            }}>
                <Item_list data={cal_data} active_key={active_key} handle_select={k => this.handle_select(k)}/>

                {
                    cal_data[active_key] ? <Info data={cal_data[active_key]}/> : null
                }

                <div style={{

                }}>
                    <div id='DYJM-all_contract_data' style={{display: 'inline-block', width: '50%', height: 300}}/>
                    <div id='DYJM-contract_data' style={{display: 'inline-block', width: '50%', height: 300}}/>
                </div>
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
