import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const lazyLoading = (name) => {
    if (process.env.NODE_ENV === 'development') {
        return () => import(`@/views/${name}.vue`);
    }
    return require(`@/views/${name}.vue`).default;
};

// const DefaultIndex = {
//     render(h) {
//         return h('router-view', {
//             key: this.$route.path,
//         });
//     },
// };

export default new VueRouter({
    base: '/admin/',
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: lazyLoading('Login'),
        }, {
            path: '/',
            component: require('@/components/layout/Container.vue').default,
            redirect: {
                name: 'Dashboard',
            },
            children: [
                {
                    name: 'Dashboard',
                    path: 'dashboard',
                    component: lazyLoading('Dashboard'),
                    meta: {
                        title: '信息面板',
                    },
                },
                // {
                //     name: 'ChildrenDemo',
                //     path: 'children-demo',
                //     component: DefaultIndex,
                //     children: require('./ChildrenDemo').default,
                // },
                {
                    name: 'MyProfile',
                    path: 'my-profile',
                    component: lazyLoading('MyProfile'),
                },
            ],
        }, {
            path: '/bootstrap/basic',
            component: lazyLoading('BootstrapView/Basic'),
        }, {
            path: '*',
            redirect: '/',
        },
    ],
});
