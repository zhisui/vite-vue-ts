import { Button, Table, Select,Input,Icon,Modal,DropdownMenu,Dropdown,DropdownItem } from 'iview';
const iview = {
    install: function (Vue:any) {
        Vue.component('Button', Button);
        Vue.component('Table', Table);
        Vue.component('Select', Select);
        Vue.component('Option', Option);
        Vue.component('Input', Input);
        Vue.component('Icon', Icon);
        Vue.component('Modal', Modal);
        Vue.component('DropdownMenu', DropdownMenu);
        Vue.component('Dropdown', Dropdown);
        Vue.component('DropdownItem', DropdownItem);



    },
}
export default iview
