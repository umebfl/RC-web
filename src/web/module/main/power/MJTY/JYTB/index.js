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

import Item_list from 'SRC/module/main/power/MJTY/JYTB/cmp/Item_list'
import TY_List from 'SRC/module/main/power/MJTY/JYTB/cmp/TY_List'

import {
    VITRIC_L,
    VITRIC,
    VITRIC_D,
    VITRIC_DDD,
} from 'SRC/theme'

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
        this.handle_select(0)
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

        if(deduction[k]) {
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
            <div style={{
                height: '90%',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>

                <Item_list deduction={deduction} active_key={active_key} handle_select={k => this.handle_select(k)}/>

                {
                    active_key !== null
                        ? <TY_List data={deduction[active_key]} active_key={active_key}/>
                        : null
                }

                <div id='MJTY-contract_data' style={{background: 'rgba(255, 255, 255, 0.6)', display: 'inline-block', width: '100%', height: 600}}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
        MJTY: state.MJTY,
        SJHQ: state.SJHQ,
    }),
)(Mod)
