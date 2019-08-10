import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App.vue';

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

                {
                    name: 'Example',
                    path: 'example',
                    meta: {
                        title: '示例',
                    },
                    redirect: {
                        name: 'Example.List',
                    },
                    component: App,
                    children: [
                        {
                            name: 'Example.List',
                            path: 'list',
                            title: '示例列表页',
                            meta: {
                                title: '示例列表页',
                            },
                            component: lazyLoading('Example/List'),
                        },
                        {
                            name: 'Example.Form',
                            path: 'form/:id?',
                            title: '示例详情页',
                            component: lazyLoading('Example/Form'),
                        },
                    ],
                },
                {
                    name: 'MyProfile',
                    path: 'my-profile',
                    component: lazyLoading('MyProfile'),
                },
            ],
        }, {
            path: '*',
            redirect: '/',
        },
    ],
});
