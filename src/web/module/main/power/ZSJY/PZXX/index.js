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

import {
    INITIAL_CAPITAL,
} from 'SRC/module/main/power/MJTY/variable'

const Breed_list = ({data}) => (
    <div style={{margin: 15}}>
        <div style={{padding: 4, borderBottom: '1px solid #333'}}>
            <div style={{width: 70, display: 'inline-block'}}>
                品种
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                编码
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                比例
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                杠杆
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                单元
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                价格
            </div>
            <div style={{width: 80, display: 'inline-block'}}>
                保证金
            </div>
            <div style={{width: 80, display: 'inline-block'}}>
                初始手数
            </div>
            <div style={{width: 80, display: 'inline-block'}}>
                初始本金
            </div>
        </div>
        {
            R.addIndex(R.map)(
                (v, k) => {

                    const bond = parseInt(v.current_data.最新价 * v.unit * v.rate)

                    const fix_rate = 0.1 / v.rate
                    const fix_capital = parseInt(v.rate * 10 * INITIAL_CAPITAL)

                    return (
                        <div key={k} style={{margin: 4, height: 25, paddingTop: 10}}>
                            <div style={{width: 70, display: 'inline-block'}}>
                                {v.name}
                            </div>
                            <div style={{width: 70, display: 'inline-block'}}>
                                {v.code}
                            </div>
                            <div style={{width: 70, display: 'inline-block'}}>
                                {v.rate}
                            </div>
                            <div style={{width: 70, display: 'inline-block'}}>
                                {(1 / v.rate).toFixed(0)}
                            </div>
                            <div style={{width: 70, display: 'inline-block'}}>
                                {v.unit}
                            </div>
                            <div style={{width: 70, display: 'inline-block'}}>
                                {v.current_data.最新价}
                            </div>
                            <div style={{width: 80, display: 'inline-block'}}>
                                {bond}
                            </div>
                            <div style={{width: 80, display: 'inline-block'}}>
                                {Math.round(fix_capital / bond)}
                            </div>
                            <div style={{width: 80, display: 'inline-block'}}>
                                {fix_capital}
                            </div>
                        </div>
                    )
                },
            )(data)
        }
    </div>
)

class Mod extends Component {
    render() {

        const {
            SJHQ: {
                cal_data,
            },
        } = this.props

        return (
            <div style={{
                height: '90%',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingTop: 20,
                paddingBottom: 800,
            }}>
                <Breed_list data={cal_data}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        SJHQ: state.SJHQ,
        ZSJY: state.ZSJY,
    }),
)(Mod)
