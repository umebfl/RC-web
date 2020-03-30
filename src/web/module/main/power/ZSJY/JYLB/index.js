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
    ADD_RATE,
    INITIAL_CAPITAL,
    CLOSE_ADD_BACK_RATE,
    CLOSE_LOSS_RATE,
} from 'SRC/module/main/power/MJTY/variable'

import {
    action,
} from 'SRC/module/main/power/MJTY/reducer'

const Deal_log = ({data}) => (
    <div style={{margin: 10}}>
        <div style={{padding: 4, borderBottom: '1px solid #333'}}>
            <div style={{width: 50, display: 'inline-block'}}>
                品种
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                日期
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                现价
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                价格
            </div>
            <div style={{width: 50, display: 'inline-block'}}>
                方向
            </div>
            <div style={{width: 50, display: 'inline-block'}}>
                数量
            </div>
            <div style={{width: 70, display: 'inline-block'}}>
                本金
            </div>
            <div style={{width: 150, display: 'inline-block'}}>
                盈利({
                    R.compose(
                        v => `${(v / 10000).toFixed(2)}w`,
                        R.reduce(
                            (r, v) => {
                                if(v.breed) {
                                    const profit = v.deal.dir === 'up'
                                        ? (v.breed.current_day.收盘价 - v.deal.price) * v.breed.unit * v.deal.count
                                        : (v.deal.price - v.breed.current_day.收盘价) * v.breed.unit * v.deal.count
                                    return r + parseInt(profit)
                                }

                                return 0
                            },
                            0,
                        ),
                    )(data)
                })
            </div>
            <div style={{width: 80, display: 'inline-block'}}>
                加仓次数
            </div>
            <div style={{width: 150, display: 'inline-block'}}>
                加仓价
            </div>
            <div style={{width: 80, display: 'inline-block'}}>
                加仓手数
            </div>
            <div style={{width: 100, display: 'inline-block'}}>
                准备金
            </div>
            <div style={{width: 80, display: 'inline-block'}}>
                平仓价
            </div>
        </div>
        {
            R.compose(
                R.addIndex(R.map)(
                    (v, k) => (
                        v.breed
                            ? (
                                <div key={k} style={{margin: 4, height: 20, paddingTop: 5}}>
                                    <div style={{width: 50, display: 'inline-block'}}>
                                        {v.deal.name}
                                    </div>
                                    <div style={{width: 70, display: 'inline-block'}}>
                                        {R.takeLast(5)(v.deal.date)}
                                    </div>
                                    <div style={{width: 70, display: 'inline-block'}}>
                                        {v.breed.current_day.收盘价}
                                    </div>
                                    <div style={{width: 70, display: 'inline-block'}}>
                                        {v.deal.price}
                                    </div>
                                    <div style={{width: 50, display: 'inline-block', color: v.deal.dir === 'up' ? red[5] : green[5]}}>
                                        {v.deal.dir === 'up' ? '多' : '空'}
                                    </div>
                                    <div style={{width: 50, display: 'inline-block'}}>
                                        {v.deal.count}手
                                    </div>
                                    <div style={{width: 70, display: 'inline-block'}}>
                                        {parseInt(v.breed.current_day.收盘价 * v.breed.unit * v.deal.count * v.breed.rate)}
                                    </div>
                                    {
                                        R.compose(
                                            v => {
                                                const profit = v.profit

                                                return (
                                                    <div style={{width: 150, display: 'inline-block', color: profit > 0 ? red[5] : green[5]}}>
                                                        {(profit / 10000).toFixed(2)}w / {
                                                            v.deal.dir === 'up'
                                                                ? ((v.breed.current_day.收盘价 - v.deal.price) / v.deal.price * 100).toFixed(2)
                                                                : ((v.deal.price - v.breed.current_day.收盘价) / v.deal.price * 100).toFixed(2)
                                                        }%
                                                    </div>
                                                )
                                            },
                                        )(v)
                                    }
                                    <div style={{width: 80, display: 'inline-block'}}>
                                        {v.deal.add_count}次
                                    </div>
                                    {
                                        R.compose(
                                            v => {
                                                // add_price - (add_price - v.current_deal.price) * v.current_deal.count / count
                                                const price = v.deal.dir === 'up'
                                                    ? parseInt(v.deal.price * (1 + ADD_RATE))
                                                    : parseInt(v.deal.price * (1 - ADD_RATE))
                                                const bond = (price * v.breed.unit * v.breed.rate)
                                                const count = Math.round((v.breed.rate * 10 * INITIAL_CAPITAL) / bond) * (v.deal.add_count + 2)

                                                return (
                                                    <div style={{display: 'inline-block'}}>
                                                        <div style={{width: 150, display: 'inline-block'}}>
                                                            {price} / {
                                                                v.deal.dir === 'up'
                                                                    ? ((v.breed.current_day.收盘价 - price) / v.breed.current_day.收盘价 * 100).toFixed(2)
                                                                    : ((price - v.breed.current_day.收盘价) / v.breed.current_day.收盘价 * 100).toFixed(2)
                                                            }%
                                                        </div>
                                                        <div style={{width: 80, display: 'inline-block'}}>
                                                            {
                                                                count
                                                            }
                                                        </div>
                                                        <div style={{width: 100, display: 'inline-block'}}>
                                                            {
                                                                parseInt(count * bond)
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            },
                                        )(v)
                                    }
                                    <div style={{width: 80, display: 'inline-block'}}>
                                        {
                                            v.breed.series_high_day
                                                ? v.deal.dir === 'up'
                                                    ? v.deal.add_count > 0
                                                        ? `回撤${CLOSE_ADD_BACK_RATE * 100}%`
                                                        : parseInt(v.deal.price * (1 - CLOSE_LOSS_RATE))
                                                    : v.deal.add_count > 0
                                                        ? `回撤${CLOSE_ADD_BACK_RATE * 100}%`
                                                        : parseInt(v.deal.price * (1 + CLOSE_LOSS_RATE))
                                                : null
                                        }
                                    </div>
                                </div>
                            )
                            : null
                    ),
                ),
                R.sort(
                    (a, b) => a.profit - b.profit,
                ),
                R.map(
                    v => ({
                        ...v,
                        profit: v.breed
                            ? v.deal.dir === 'up'
                                ? (v.breed.current_day.收盘价 - v.deal.price) * v.breed.unit * v.deal.count
                                : (v.deal.price - v.breed.current_day.收盘价) * v.breed.unit * v.deal.count
                            : 0,
                    }),
                ),
            )(data)
        }
    </div>
)

const get_current_deal_fix = R.compose(
    v => {
        return R.map(
            deal => {
                const breed = R.filter(v => deal.code === v.code)(v.deduction)

                return {
                    deal,
                    breed: breed[0],
                }
            },
        )(v.current_deal)
    },
)

class Mod extends Component {

    componentDidMount() {
        this.props.action.deduction()

        this.timeout = setInterval(
            () => this.props.action.deduction(),
            1000 * 70,
        )
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
    }

    render() {

        const {
            ZSJY: {
                current_deal,
                deal_log,
            },
            SJHQ: {
                cal_data,
            },
            MJTY: {
                deduction,
            },
        } = this.props

        const current_deal_fix = get_current_deal_fix({current_deal, cal_data, deduction})

        return (
            <div style={{
                height: '90%',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingTop: 10,
                paddingBottom: 800,
            }}>
                <Deal_log data={current_deal_fix}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        SJHQ: state.SJHQ,
        ZSJY: state.ZSJY,
        MJTY: state.MJTY,
    }),
    dispatch => ({
        action: bindActionCreators(action, dispatch),
    }),
)(Mod)
