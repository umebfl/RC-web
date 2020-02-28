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

const build_chart = cal_data => {

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
                left: `${5 + (k % 3) * 32}%`,
                top: `${parseInt(k / 3) * 220}`,
                text: `${v.name} ${v.code}`,
            },
            grid: {
                x: `${5 + (k % 3) * 32}%`,
                y: `${30 + parseInt(k / 3) * 220}`,
                width: '25%',
                height: '150px',
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
    )(cal_data)

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
        const cal_data = this.props.SJHQ.cal_data

        if(cal_data) {
            build_chart(cal_data)
        } else {
            setTimeout(
                () => build_chart(cal_data),
                1000,
            )
        }
    }

    render() {

        return (
            <div style={{
                padding: 20,
                height: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
            }}>
                <div id='JMFX-overview' style={{height: 1200}}/>
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
