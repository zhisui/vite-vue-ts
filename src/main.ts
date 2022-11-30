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
import { PiniaVuePlugin } from 'pinia';
import VueRouter from 'vue-router';

import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
import element from './uiComponent/element'
import iview from './uiComponent/iview'
import { Message } from 'iview'


import { initDomToCode } from 'dom-to-code'
import "amfe-flexible/index.js";
import '@/utils/rem'
import "echarts";
import ECharts from 'vue-echarts'

//只在开发环境初始化
process.env.NODE_ENV === 'development' && initDomToCode()
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
    window.$app.mount('#app');
}

Vue.use(element)
Vue.component('v-chart', ECharts)

Vue.use(iview)

main().catch(console.error);
