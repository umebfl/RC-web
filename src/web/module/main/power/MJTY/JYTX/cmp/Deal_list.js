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

import moment from 'moment'

import {
    INITIAL_CAPITAL,
} from 'SRC/module/main/power/MJTY/variable'

const get_hold_bond_count = R.reduce(
    (r, v) => r + (v.deal_list[v.deal_list.length - 1].price * v.unit * v.rate * v.deal_list[v.deal_list.length - 1].count),
    0,
)

const get_hold_profit_count = R.reduce(
    (r, v) => r + v.deal_list[v.deal_list.length - 1].profit,
    0,
)


const List = ({data}) => {
    return (
        R.compose(
            R.addIndex(R.map)(
                (v, k) => (
                    <div key={k} style={{borderBottom: '1px solid #AAA', margin: 4, height: 30, paddingTop: 4}}>
                        <div style={{display: 'inline-block', width: 60, marginLeft: 20}}>
                            {v.name}{R.takeLast(2)(v.month)}
                        </div>
                        {
                            v.deal_list.length
                                ? R.compose(
                                    deal => (
                                        <div style={{display: 'inline-block'}}>
                                            <div style={{display: 'inline-block', width: 60, textAlign: 'right', color: moment().format('YYYY-MM-DD') === deal.op_date ? red[5] : 'normal'}}>
                                                {R.takeLast(5)(deal.op_date)}
                                            </div>
                                            <div style={{display: 'inline-block', width: 60, textAlign: 'right'}}>
                                                {deal.price}
                                            </div>
                                            <div style={{display: 'inline-block', width: 30, textAlign: 'right', color: deal.dir === 'up' ? red[5] : green[7]}}>
                                                {deal.dir === 'up' ? '多' : '空'}
                                            </div>
                                            <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                                                {deal.count}手
                                            </div>
                                            <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                                                {(deal.price * v.unit * v.rate * deal.count / 10000).toFixed(1)}w
                                            </div>
                                            <div style={{display: 'inline-block', width: 70, textAlign: 'right', color: deal.profit > 0 ? red[5] : green[7]}}>
                                                {(deal.profit / (deal.price * v.unit * v.rate * deal.count) * 100).toFixed(0)}%
                                            </div>
                                            <div style={{display: 'inline-block', width: 70, textAlign: 'right', color: deal.profit > 0 ? red[5] : green[7]}}>
                                                {(deal.profit / 10000).toFixed(1)}w
                                            </div>
                                            <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                                {v.current_day.收盘价}
                                            </div>
                                            <div style={{display: 'inline-block', width: 120, textAlign: 'right'}}>
                                                {deal.close_price_tips}
                                                {
                                                    // ({parseInt(Math.abs(v.current_day.收盘价 - deal.close_price_tips) / v.current_day.收盘价 * 100)}%)
                                                }
                                            </div>
                                            <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                                {R.takeLast(5)(deal.open_date)}
                                            </div>
                                            <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                                {deal.days > 30 ? `${(deal.days / 30).toFixed(1)}月` : `${deal.days}天`}
                                            </div>
                                            <div style={{display: 'inline-block', width: 240, textAlign: 'right', fontSize: 14}}>
                                                {deal.add_count > 0 ? R.join(', ')([...deal.add_before_price, deal.price]) : deal.price}
                                            </div>
                                            <div style={{display: 'inline-block', width: 80, textAlign: 'right'}}>
                                                {deal.close_price}
                                            </div>
                                        </div>
                                    ),
                                )(v.deal_list[v.deal_list.length - 1])
                                : null
                        }
                    </div>
                ),
            ),
            // R.sort((a, b) => {
            //     const item_a = a.deal_list[a.deal_list.length - 1]
            //     const close_price_a = Math.abs(a.current_day.收盘价 - item_a.close_price_tips) / a.current_day.收盘价
            //
            //     const item_b = b.deal_list[b.deal_list.length - 1]
            //     const close_price_b = Math.abs(b.current_day.收盘价 - item_b.close_price_tips) / b.current_day.收盘价
            //
            //     return close_price_a - close_price_b
            // }),
            R.sort((a, b) => a.deal_list[a.deal_list.length - 1].days - b.deal_list[b.deal_list.length - 1].days),
        )(data)
    )
}

const Deal_list = ({data}) => {
    return (
        <div style={{margin: 4, marginTop: 20}}>
            {
                R.compose(
                    group => {
                        return (
                            <div>
                                <div style={{display: 'inline-block'}}>
                                    <div style={{display: 'inline-block', width: 60, marginLeft: 20}}>
                                        品种
                                    </div>
                                    <div style={{display: 'inline-block', width: 60, textAlign: 'right'}}>
                                        最近
                                    </div>
                                    <div style={{display: 'inline-block', width: 60, textAlign: 'right'}}>
                                        价格
                                    </div>
                                    <div style={{display: 'inline-block', width: 30, textAlign: 'right'}}>

                                    </div>
                                    <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                                        手数
                                    </div>
                                    <div style={{display: 'inline-block', width: 50, textAlign: 'right'}}>
                                        保金
                                    </div>
                                    <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                        盈利比
                                    </div>
                                    <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                        盈利
                                    </div>
                                    <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                        当前价
                                    </div>
                                    <div style={{display: 'inline-block', width: 120, textAlign: 'right'}}>
                                        动态止损
                                    </div>
                                    <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                        开仓
                                    </div>
                                    <div style={{display: 'inline-block', width: 70, textAlign: 'right'}}>
                                        天数
                                    </div>
                                    <div style={{display: 'inline-block', width: 240, textAlign: 'right', fontSize: 14}}>
                                        开仓价
                                    </div>
                                    <div style={{display: 'inline-block', width: 80, textAlign: 'right'}}>
                                        平仓价
                                    </div>
                                </div>
                                <div style={{marginLeft: 10, marginTop: 20, fontWeight: 'bold'}}>
                                    持有({group.持?.length})
                                    <div style={{display: 'inline-block', width: 120, textAlign: 'right'}}>
                                        总投: {`${parseInt(get_hold_bond_count(group.持 || []) / 10000)}w`}
                                    </div>
                                    <div style={{display: 'inline-block', width: 120, textAlign: 'right'}}>
                                        盈利: {`${parseInt(get_hold_profit_count(group.持 || []) / 10000)}w`}
                                    </div>
                                </div>
                                <List data={group.持 || []}/>

                                <div style={{marginLeft: 10, marginTop: 20, fontWeight: 'bold'}}>
                                    平仓({group.平?.length})
                                    <div style={{display: 'inline-block', width: 120, textAlign: 'right'}}>
                                        总投: {`${parseInt(get_hold_bond_count(group.平 || []) / 10000)}w`}
                                    </div>
                                    <div style={{display: 'inline-block', width: 120, textAlign: 'right'}}>
                                        盈利: {`${parseInt(get_hold_profit_count(group.平 || []) / 10000)}w`}
                                    </div>
                                </div>
                                <List data={group.平 || []}/>
                            </div>
                        )
                    },

                    R.groupBy(v => {
                        const deal_list = v.deal_list

                        if(deal_list.length) {
                            return deal_list[deal_list.length - 1].close ? '平' : '持'
                        }

                        return '无'
                    }),
                )(data)
            }
        </div>
    )
}

export default Deal_list
