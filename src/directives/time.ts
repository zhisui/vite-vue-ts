import dayjs from 'dayjs';
const time = {
    bind(el: HTMLElement, binding:any) {
    if (binding) {
        el.innerHTML = dayjs(el.innerHTML).format(binding.value)
    }
    },
}
export default time;
