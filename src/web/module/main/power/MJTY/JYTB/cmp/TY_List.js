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

const TY_List = ({data, active_key}) => (
    <div style={{marginBottom: 20, margin: 10}}>
        <div>
            <div style={{margin: 4, borderBottom: '1px solid'}}>
                <div style={{display: 'inline-block', margin: 4, width: 120}}>
                    日期({data?.deal_list.length})
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 40}}>
                    持续
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 40}}>
                    方向
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 40}}>
                    数量
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 60}}>
                    平价
                </div>
                {
                    R.compose(
                        v => (
                            <div style={{display: 'inline-block', margin: 4, width: 70, color: v > 0 ? red[7] : green[7]}}>
                                {(v / 10000).toFixed(2)}w
                            </div>
                        ),
                        R.reduce((a, b) => a + b.profit, 0),
                    )(data?.deal_list || [])
                }
                <div style={{display: 'inline-block', margin: 4, width: 60}}>
                    保证金
                </div>
                <div style={{display: 'inline-block', margin: 4, width: 400}}>
                    价格
                </div>
            </div>

            {
                R.addIndex(R.map)(
                    (v, k) => (
                        <div key={`${active_key}${k}`}>
                            <div style={{display: 'inline-block', margin: 4, width: 120}}>
                                {R.takeLast(5)(v.open_date)}至{R.takeLast(5)(v.close_date)}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 40}}>
                                {v.days}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 40, color: v.dir === 'up' ? red[7] : green[7]}}>
                                {v.dir === 'up' ? '多' : '空'}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 40}}>
                                {v.count}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 60}}>
                                {v.close_price}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 70, fontWeight: Math.abs(v.profit) > 10000 ? 'bold' : 'normal', color: v.profit > 0 ? red[7] : green[7]}}>
                                {v.profit}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 60}}>
                                {v.bond.toFixed(0)}
                            </div>
                            <div style={{display: 'inline-block', margin: 4, width: 400, fontSize: 14}}>
                                {v.add_count > 0 ? R.join(', ')([...v.add_before_price, v.price]) : v.price}
                            </div>
                        </div>
                    ),
                )(data?.deal_list || [])
            }
        </div>
    </div>
)

export default TY_List
