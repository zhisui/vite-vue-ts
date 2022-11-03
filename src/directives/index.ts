import outclick from './outclick';
import debounce from './debounce';
import type { PluginFunction } from 'vue';
import dateFormat from './dateFormat';

const directives: any = {
    outclick,
    debounce,
};

export default {
    install(Vue) {
        Object.keys(directives).forEach((name: string) => {
            Vue.directive(name, directives[name]);
        });
        Vue.filter('dateFormat', dateFormat);
    },
} as { install: PluginFunction<any> };

