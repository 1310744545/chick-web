//代理
module.exports = {

    // devServer: {
    //     proxy:"http://127.0.0.1:8082",
    //     port: 80
    // }
    devServer: {
        host: 'localhost',
        port: 80,
        proxy: {
            '/': {
                ws:false,//websocket
                target: 'http://127.0.0.1:10086',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
                pathRewrite: {     // pathRewrite表示路径重写，key表示一个正则，value表示别名
                    '^/': '/'   // 即用 '/api'表示'http://localhost:3000/api'
                }
            }
        }
    }
};

//配置路径@
const path = require('path');
function resole(dir){
    return path.join(__dirname, dir);
}
module.exports={
    lintOnSave: true,
    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@', resole('./src'))
            .set('@assets', resole('./src/assets'))
    },
};
