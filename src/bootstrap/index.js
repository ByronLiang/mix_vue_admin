import './axios.js';
import './PrototypeExtend.js';
import './ElementUI.js';
import './store.js';
import '@/assets/scss/app.scss';
import './Bootstrap.js';

import Vue from 'vue';
import store from '../store';
import router from '../router';
import RouterMenusFilter from '@/helpers/RouterMenusFilter.js';

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

export default {
    store,
    router,
};
