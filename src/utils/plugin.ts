import directives from '../directives';

export default {
    install: (Vue: any, options: any) => {
        Vue.use(directives);
    },
};
