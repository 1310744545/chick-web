

//代理
module.exports = {
    devServer: {
        host: 'localhost',
        proxy: {
            '/': {
                target: 'http://localhost:8082',// 要跨域的域名
                changeOrigin: true, // 是否开启跨域
            }
        }
    }
};


