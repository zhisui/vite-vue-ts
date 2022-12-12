import Vue from 'vue';
import Router from 'vue-router';

export default new Router({
    routes: [
        {
            path: '',
            redirect: '/main',
        },
        { //懒加载
            path: '/main',
            redirect: { name: 'test' },
            component: () => import('../layout/Main.vue'),
            children: [
                {
                    name: 'test',
                    path: 'test',
                    component: () => import('@/views/Test.vue'),
                },
            ],
        },
    ],
});
