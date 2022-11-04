const outclick = {
    bind(el: any, binding: any) {
        el._outClickHandler = (e: any) => {
            if (el.contains(e.target)) {
                return;
            }
            if (binding.value) {
                binding.value();
            }
        };
        document.addEventListener('click', el._outClickHandler);
    },
    unbind(el: any) {
        document.removeEventListener('click', el._outClickHandler);
    },
};

export default outclick;
