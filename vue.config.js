// vue.config.js 配置说明
// 这里只列一部分，具体配置惨考文档啊
module.exports = {

    devServer: {
        port: 8080, // 端口号
        // host: '192.168.31.147',
        // host: 'localhost',
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理

        proxy: {
            '/api': {
                target: 'http://192.168.31.147:8090/',
                // target: ' http://localhost:8090/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }, // 配置多个代理
    }
}