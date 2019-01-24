module.exports = {
    assetsDir: 'admin-static',
    productionSourceMap: false,
    devServer: {
        port: 8088,
        open: true,
        compress: true,
        proxy: {
            [process.env.VUE_APP_API_PREFIX]: {
                target: process.env.API_PROXY_TARGET,
                changeOrigin: true,
            },
        },
    },
};
