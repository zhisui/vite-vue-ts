import { Image, Carousel, CarouselItem, DatePicker,Button } from 'element-ui'
const element = {
    install: function (Vue:any) {
        Vue.use(Image)
        Vue.use(Carousel)
        Vue.use(CarouselItem)
        Vue.use(DatePicker)
        Vue.use(Button)
    },
}
export default element
