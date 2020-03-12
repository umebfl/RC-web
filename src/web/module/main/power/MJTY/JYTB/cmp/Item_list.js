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

const Item_list = ({active_key, handle_select, deduction}) => (
    <div style={{padding: 10}}>
        <div>
            <div style={{margin: 8}}>
                总盈利: {R.compose(
                    v => (
                        <div style={{display: 'inline-block', color: v > 0 ? red[5] : green[5]}}>
                            {(v / 10000).toFixed(2)}w
                        </div>
                    ),
                    R.reduce((a, b) => a + (b?.total_profit || b.current_deal?.profit || 0), 0),
                )(deduction)}
            </div>
        </div>
        {
            R.compose(
                R.addIndex(R.map)(
                    (v, k) => (
                        <div
                            key={`${v.name}${k}`}
                            className={`hover item ${active_key === k ? 'active' : ''}`}
                            onClick={() => handle_select(k)}
                            style={{
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
                            <div style={{display: 'inline-block', marginLeft: 4, color: v.total_profit > 0 ? red[5] : green[5]}}>
                                {((v.total_profit || v.current_deal?.profit) / 10000).toFixed(2)}
                            </div>
                        </div>
                    ),
                ),
            )(deduction)
        }
    </div>
)

export default Item_list
