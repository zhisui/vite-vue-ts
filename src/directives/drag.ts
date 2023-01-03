import type { DirectiveBinding } from 'vue';

const drag = {
    // bind(el: HTMLElement, binding: any, vnode: any, oldVnode: any) {
    //     const oDiv = el; // 当前元素
    //     const minTop = Number(oDiv.getAttribute('drag-min-top'));
    //     const ifMoveSizeArea = 20;
    //     oDiv.onmousedown = (e) => {
    //         let target = oDiv;
    //         while (window.getComputedStyle(target).position !== 'absolute' && target !== document.body) {
    //             target = target.parentElement!;
    //         }

    //         document.onselectstart = () => {
    //             return false;
    //         };
    //         if (!target.getAttribute('init_x')) {
    //             target.setAttribute('init_x', String(target.offsetLeft));
    //             target.setAttribute('init_y', String(target.offsetTop));
    //         }

    //         const initX = parseInt(target.getAttribute('init_x') as string);
    //         const initY = parseInt(target.getAttribute('init_y') as string);

    //         // 鼠标按下，计算当前元素距离可视区的距离
    //         const disX = e.clientX - target.offsetLeft;
    //         const disY = e.clientY - target.offsetTop;

    //         console.log(disX, 'disX');
    //         document.onmousemove = (e) => {
    //             // 通过事件委托，计算移动的距离
    //             // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
    //             const l = e.clientX - disX;
    //             const t = e.clientY - disY;
    //             // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
    //             target.style.left = l + 'px';
    //             target.style.top = (t < minTop ? minTop : t) + 'px';
    //             if (Math.abs(l - initX) > ifMoveSizeArea || Math.abs(t - initY) > ifMoveSizeArea) {
    //                 target.setAttribute('dragged', '');
    //             } else {
    //                 target.removeAttribute('dragged');
    //             }
    //         };
    //         document.onmouseup = (e) => {
    //             document.onmousemove = null;
    //             document.onmouseup = null;
    //             document.onselectstart = null;
    //         };
    //         // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
    //         return false;
    //     };
    // },
    // unbind(el: any) {
    //     document.removeEventListener('click', el._outClickHandler);
    // },

    bind(el: HTMLElement, binding: DirectiveBinding<any>) {
        const dialogHeaderEl = el.querySelector('.el-dialog-info') as HTMLElement;
        if (!dialogHeaderEl) {
            return;
        }
        const dragDom = el.querySelector('.el-dialog') as HTMLElement | any;
        console.log(dragDom, 'dragDom');
        dialogHeaderEl.style.cursor = 'move';
        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        console.log(sty, 'sty');
        // 鼠标移动
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;

            // 获取到的值带px 正则匹配替换
            let styL = 0;
            let styT = 0;

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100);
            } else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            }
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX;
                const t = e.clientY - disY;
                // 移动当前元素
                dragDom.style.left = `${l}px`;
                dragDom.style.top = `${t}px`;
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },
};

export default drag;
