import outclick from './outclick';
import debounce from './debounce';
import type { PluginFunction } from 'vue';
import dateFormat from './dateFormat';
import drag from './drag';

const directives: any = {
    outclick,
    debounce,
    drag,
};

export default {
    install(Vue) {
        Object.keys(directives).forEach((name: string) => {
            Vue.directive(name, directives[name]);
        });
        Vue.filter('dateFormat', dateFormat); //filter只能在vue2的选项式api里可以调用，vue3的组合式Api不能用
    },
} as { install: PluginFunction<any> };

