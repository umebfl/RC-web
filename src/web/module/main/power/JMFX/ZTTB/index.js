import {
    Component,
} from 'react'

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

import {
    VITRIC_L,
    VITRIC,
    VITRIC_DD,
    VITRIC_DDD,
    MAIN_L,
    MAIN,
} from 'SRC/theme'

const build_chart = origin_data => {
    const overview = echarts.init(document.getElementById('JMFX-overview'))

    const opt = R.addIndex(R.map)(
        (v, k) => ({
            visualMap: {
                show: false,
                type: 'continuous',
                seriesIndex: k,
                // min: 0,
                // max: 400,
            },
            title: {
                left: `${10 + (k % 3) * 30}%`,
                top: `${5 + parseInt(k / 3) * 30}%`,
                text: `${v.name} ${v.code}${v.month}`,
            },
            grid: {
                x: `${10 + (k % 3) * 30}%`,
                y: `${10 + parseInt(k / 3) * 30}%`,
                width: '25%',
                height: '20%',
            },
            xAxis: {
                // data: R.map(v => v['日期'])(v.contract_data),
                data: R.map(v => v['日期'])(v.all_contract_data),
                gridIndex: k,
            },
            yAxis: {
                splitLine: {show: false},
                gridIndex: k,
            },
            series: {
                type: 'line',
                showSymbol: false,
                // data: R.map(v => v['开盘价'])(v.contract_data),
                data: R.map(v => v['开盘价'])(v.all_contract_data),
                xAxisIndex: k,
                yAxisIndex: k,
                animation: false,
                // animationEasing: 'quarticInOut',
                lineStyle: {
                    color: red[5],
                    width: 1,
                    shadowBlur: 0,
                },
            },
        }),
    )(origin_data)

    overview.setOption({
        tooltip: {
            trigger: 'axis',
        },
        visualMap: R.map(R.prop('visualMap'))(opt),
        title: R.map(R.prop('title'))(opt),
        grid: R.map(R.prop('grid'))(opt),
        xAxis: R.map(R.prop('xAxis'))(opt),
        yAxis: R.map(R.prop('yAxis'))(opt),
        series: R.map(R.prop('series'))(opt),
    })

}

class Mod extends Component {

    componentDidMount() {
        const origin_data = this.props.SJHQ.origin_data

        if(origin_data) {
            build_chart(origin_data)
        } else {
            setTimeout(
                () => build_chart(origin_data),
                1000,
            )
        }
    }

    render() {

        return (
            <Flex style={{
                flex: 1,
                padding: 20,
                flexDirection: 'column',
            }}>
                <Flex id='JMFX-overview' style={{height: 600}}/>
            </Flex>
        )
    }
}

export default connect(
    state => ({
        nav: state.nav,
        SJHQ: state.SJHQ,
    }),
)(Mod)
