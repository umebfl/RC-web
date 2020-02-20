// 开发环境
const DEV = 'development'
// 正式环境
const PRO = 'production'

module.exports = {
    DEV,
    PRO,

    // 运行环境
    env: DEV,

    // 应用版本号
    version: '0.0.1',

    // 构建时间
    bundle_time: `${new Date().getMonth() + 1}${new Date().getDate()}${new Date().getHours()}`,
}
