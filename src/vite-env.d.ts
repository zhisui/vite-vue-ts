/// <reference types="vite/client" />
/// <reference types="node" />
declare module '*.vue' {
    import { ComponentOptions } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: ComponentOptions<any>;
    export default component;
}
