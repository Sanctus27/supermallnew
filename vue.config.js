const path = require('path')
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'views': '@/views',
                'components': '@/components',
                'newwork': '@/network',
                'common': '@/common',
                'assets': '@/assets'
            }
        }
    },
    pluginOptions: { // 第三方插件配置
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/assets/css/base.less')] // less所在文件路径
        }
    }
}