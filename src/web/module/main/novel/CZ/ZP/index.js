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

class Mod extends Component {

    render() {

        const {
            CZ: {
                opus,
            },
        } = this.props

        const selected = R.filter(v => v.selected)(opus)[0]
        const no_selected = R.filter(v => !v.selected)(opus)

        return (
            <div style={{
                height: '90%',
                background: `linear-gradient(${VITRIC_DDD}, ${VITRIC_L})`,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingTop: 20,
                paddingBottom: 800,
            }}>
                <div style={{
                    margin: 10,
                    height: 30,
                    borderBottom: '1px solid',
                    fontWeight: 'bold',
                }}>
                    {
                        selected.name
                    }
                </div>

                <div style={{
                    margin: 10,
                }}>
                    {
                        R.addIndex(R.map)(
                            (v, k) => (
                                <div key={k}>
                                    {v.name}
                                </div>
                            ),
                        )(no_selected)
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        CZ: state.CZ,
    }),
)(Mod)
