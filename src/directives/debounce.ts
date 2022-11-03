const debounce = {
    inserted(el: any, binding: any) {
        const wait: number = binding.arg || 1000;
        let timer: any = null;
        let immediate: boolean = true;
        el.addEventListener('click', () => {
            if (!binding.value) {
                if (el.disabled) return;
                el.disabled = true;
                el.style.cursor = 'not-allowed';
                el.style.pointerEvents = 'none';
                setTimeout(() => {
                    el.disabled = false;
                    el.style.cursor = 'pointer';
                    el.style.pointerEvents = '';
                }, wait);
                return;
            }
            if (timer) {
                clearTimeout(timer);
            }
            if (immediate) {
                binding.value();
                immediate = false;
            }
            timer = setTimeout(() => {
                immediate = true;
            }, wait);
        });
    },
};

export default debounce;
