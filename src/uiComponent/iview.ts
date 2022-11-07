import { Button, Table, Select,Input } from 'iview';
const iview = {
    install: function (Vue:any) {
        Vue.component('Button', Button);
        Vue.component('Table', Table);
        Vue.component('Select', Select);
        Vue.component('Option', Option);
        Vue.component('Input', Input);
    },
}
export default iview
