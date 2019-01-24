import Vue from 'vue';
import App from './App.vue';
import bootstrap from './bootstrap';

window.vm = new Vue({
    ...App,
    ...bootstrap,
}).$mount('#app');
