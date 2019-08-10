import Vue from 'vue';
import App from './App.vue';
import bootstrap from './bootstrap';

// 全局api接口请求处理
import Api from './api';

window.API = new Api(process.env.VUE_APP_API_PREFIX);

window.vm = new Vue({
    ...App,
    ...bootstrap,
}).$mount('#app');
