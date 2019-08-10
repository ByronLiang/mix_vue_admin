module.exports = {
    assetsDir: 'admin-static',
    productionSourceMap: false,
    devServer: {
        host: process.env.DEV_SERVER_HOST,
        public: process.env.DEV_SERVER_PUBLIC,
        disableHostCheck: Boolean(process.env.DEV_SERVER_DISABLE_HOST_CHECK),
        port: process.env.DEV_SERVER_PORT,
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
