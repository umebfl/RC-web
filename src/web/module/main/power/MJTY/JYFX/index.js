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
    VITRIC_D,
    VITRIC_DD,
    VITRIC_DDD,
} from 'SRC/theme'

import {
    V_FIX_VAR_STR,
} from 'SRC/module/main/power/MJTY/variable'

const get_total_str = R.compose(
    v => `${(v / 10000).toFixed(0)}w`,
    R.reduce(
        (r, v) => r + v.profit,
        0,
    ),
)

const get_total = R.compose(
    R.reduce(
        (r, v) => r + v.profit,
        0,
    ),
)

const get_one_profit_str = (list) => `${(get_total(list) / list.length / 10000).toFixed(2)}w`
const get_one_profit = (list) => parseInt(get_total(list) / list.length)

const get_info_list = R.compose(
    R.addIndex(R.map)(
        (v, k) => (
            <div key={k} style={{margin: 4, marginLeft: 10, height: 26}}>
                <div style={{display: 'inline-block', width: 80}}>
                    {v.name}{v.code}
                </div>
                <div style={{display: 'inline-block', width: 80,  textAlign: 'right', color: v.profit > 0 ? red[7] : green[7]}}>
                    {(v.profit / 10000).toFixed(2)}w
                </div>
                <div style={{display: 'inline-block', width: 80, textAlign: 'right'}}>
                    {(v.bond * v.count / 10000).toFixed(2)}w
                </div>
                <div style={{display: 'inline-block', width: 50,  textAlign: 'right', color: v.dir === 'up' ? red[7] : green[7]}}>
                    {v.dir === 'up' ? '多' : '空'}
                </div>
                <div style={{display: 'inline-block', width: 60, textAlign: 'right'}}>
                    {v.add_count}次
                </div>
                <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                    {v.count}手
                </div>
                <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                    {R.takeLast(5)(v.open_date)}
                </div>
                <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                    {v.days > 30 ? `${(v.days / 30).toFixed(1)}月` : `${v.days}天`}
                </div>
                <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                    {v.close ? '' : '持'}
                </div>
                <div style={{display: 'inline-block', width: 240, textAlign: 'right', fontSize: 14}}>
                    {v.add_count > 0 ? R.join(', ')([...v.add_before_price, v.price]) : v.price}
                </div>
            </div>
        ),
    ),
)

class Mod extends Component {

    render() {

        const {
            history,
            nav,
            MJTY: {
                deduction,
            },
        } = this.props

        const all_deal_list = R.compose(
            R.sort((a, b) => a.profit - b.profit),
            R.reduce(
                (r, v) => ([
                    ...r,
                    ...R.map(deal => ({
                        ...deal,
                        code: v.code,
                        name: v.name,
                        month: v.month,
                    }))(v.deal_list),
                ]),
                [],
            ),
        )(deduction)

        const group = R.groupBy(
            v => v.profit > 0 ? '盈利' : '亏损',
        )(all_deal_list)

        const profit = get_one_profit(group.盈利 || [])
        const loss = get_one_profit(group.亏损 || [])
        const profit_str = get_one_profit_str(group.盈利 || [])
        const loss_str = get_one_profit_str(group.亏损 || [])

        const total_profit = get_total(group.盈利 || [])
        const total_loss = get_total(group.亏损 || [])

        const total_profit_str = get_total_str(group.盈利 || [])
        const total_loss_str = get_total_str(group.亏损 || [])

        return (
            <div style={{
                height: '90%',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingTop: 20,
                paddingBottom: 800,
            }}>
                <div style={{margin: 4, marginLeft: 10, height: 30, fontSize: 16}}>
                    <div style={{display: 'inline-block', fontWeight: 'bold'}}>
                        盈利:
                        <div style={{display: 'inline-block', color: red[5], marginLeft: 10}}>
                            {total_profit_str} / {group?.盈利?.length}次 / {profit_str}
                        </div>
                    </div>
                    <div style={{display: 'inline-block', fontWeight: 'bold', marginLeft: 20}}>
                        亏损:
                        <div style={{display: 'inline-block', color: green[5], marginLeft: 10}}>
                            {total_loss_str} / {group?.亏损?.length}次 / {loss_str}
                        </div>
                    </div>
                    <div style={{display: 'inline-block', fontWeight: 'bold', marginLeft: 20, color: red[5]}}>
                        净利: {((total_profit + total_loss) / 10000).toFixed(2)}w
                    </div>
                    <div style={{display: 'inline-block', fontWeight: 'bold', marginLeft: 20, color: red[5]}}>
                        盈亏比: {(total_profit / Math.abs(total_loss)).toFixed(2)}
                    </div>
                    <div style={{display: 'inline-block', fontWeight: 'bold', marginLeft: 20, color: red[5]}}>
                        {V_FIX_VAR_STR?.toFixed(3)}
                    </div>

                </div>
                {
                    get_info_list(group.亏损 || [])
                }
                <div style={{marginTop: 20, marginBottom: 20, borderBottom: '1px solid'}}></div>
                {
                    get_info_list(group.盈利 || [])
                }
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
