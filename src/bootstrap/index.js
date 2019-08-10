import './axios.js';
import './PrototypeExtend.js';
import './ElementUI.js';
import './formatTime';
import './store.js';
import '@/assets/scss/app.scss';

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueQuillEditor from 'vue-quill-editor';
import store from '../store';
import router from '../router';
import RouterMenusFilter from '@/helpers/RouterMenusFilter.js';

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(VueQuillEditor);

Vue.use(VueI18n);

router.beforeEach(async (to, from, next) => {
    const checkRoute = from.path === '/' && !from.name && to.path !== '/login';
    if (checkRoute && !store.state.my) {
        await store.dispatch('getMy');
        if (!store.state.my) return next('/login');
    }

    const url = (new RouterMenusFilter(store.state.my, router.options.routes)).notAccess(to);
    if (url) return next(url);

    next();
});

router.afterEach((to, from) => {
    if (to.name === from.name) return;

    window.scrollTo(0, 1);
});

const Api = require('../api').default;

window.API = new Api(process.env.VUE_APP_API_PREFIX);

Vue.directive('baguettebox', require('../directives/baguettebox').default);

const messages = {
    En: require('@/lang/en.json'),
    Ja: require('@/lang/ja.json'),
};

const i18n = new VueI18n({
    locale: 'En', // set locale
    messages, // set locale messages
    fallbackLocale: 'En',
});

export default {
    i18n,
    store,
    router,
};
