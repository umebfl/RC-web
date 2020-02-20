const echarts = require('echarts/lib/echarts')

// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

// 基于准备好的dom，初始化echarts实例
const myChart = echarts.init(document.getElementById('workspace'))

// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例11',
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [{
        name: '销量1',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
    }],
})

// const a = 1
// const b = 2
//
// import './index.less'
//
// console.log('a + b = ', a + b)
// console.log('a + b = ', a + b)
// console.log('a + b = ', a + b)
