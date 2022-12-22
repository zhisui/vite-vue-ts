import { throttle } from 'lodash-es';

const scroll = {
    bind(el: HTMLElement, binding:any){
        el.addEventListener('scroll', throttle(() =>scrollHandler(el,binding.value), 500))


    },
    unbind(el:HTMLElement, binding:any){
        el.removeEventListener('scroll',() => scrollHandler(el,binding.value))

    }
}
 type Bingding =  {
    sliceList:any[],
    listTotal: number,
    handler: () => void,
    pageNum:number,
 }
const scrollHandler =(el:HTMLElement,bingding:Bingding,) => {
    console.log(bingding,'binding')
    const scrollTop = el.scrollTop
    console.log(scrollTop,'scrollTop')
    const clientHeight = el.clientHeight
    const scrollHeight = el.scrollHeight
   const scrollBarPercentage = ((scrollTop + clientHeight)*1.0)/scrollHeight
    // 如果超过了阈值，则添加数据, 如果数据已经加载完毕，则不需要添加新的数据,直接返回
    if(scrollBarPercentage > 0.8){
        if(bingding.sliceList.length >= bingding.listTotal) {
            return
        } else {
            bingding.pageNum++
            bingding.handler()
        }
    }
}

export default scroll
