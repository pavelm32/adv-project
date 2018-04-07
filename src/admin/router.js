import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import About from './components/about.vue';
import Blog from './components/blog.vue';

const routes = [
    {
        path: '/admin',
        component: About,
    },
    {
        path: '/admin/blog',
        component: Blog,
    },
];

export  default new VueRouter({
    routes,
    mode: 'history',
});