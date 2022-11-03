import './styles/index.scss';
import './styles/ui.scss';
import 'reflect-metadata';
import '@suc/chain';

import Vue from 'vue';
import App from './App.vue';
// 注意pinia需要在router上面引入,或者必须保证pinia在vue-router之前vue.use
import { pinia } from './stores';
import router from './router';
import { h, createApp } from 'vue-demi';
import { prepareApp } from '@/utils/prepareApp';
import http from './utils/http';
import { useInterceptors } from '@/utils/useInterceptors';
import { PiniaVuePlugin } from 'pinia';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

Vue.config.errorHandler = (err, vm, info) => {
    setTimeout(() => {
        console.log(info, err.message, err.stack);
    });
};

async function main() {
    await prepareApp();
    window.$app = createApp({
        pinia,
        router,
        render: () => h(App),
    });
    window.$app.use(PiniaVuePlugin);
    window.$app.use(VueRouter);
    useInterceptors(http, router, pinia);
    window.$app.mount('#app');
}

main().catch(console.error);
