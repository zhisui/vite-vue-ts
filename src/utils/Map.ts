import { cloneDeep } from 'lodash-es';

export class OlMap {
    map: any = {};
    view: any = {};
    baseLayer: any[] = [];
    controls: any[] = [];

    constructor(id?: string, common?: any) { //constructor是一个构造方法，用来接收参数
        if (common) {
            Object.assign(this, common);
        } else {
            Object.assign(this, cloneDeep(window.mapConfig));
        }
    }

    setCenter(coords: number[], projection?: string) {
        if (Array.isArray(coords)) {
            this.view.center.coord = [parseFloat(coords[0] + ''), parseFloat(coords[1] + '')];
        }
        if (projection) {
            this.view.center.projection = projection;
        }
    }

    setZoom(zoom: number) {
        if (zoom) {
            this.view.zoom = zoom;
        }
    }

    setCenterZoom(coords: number[], zoom: number, projection?: string) {
        this.setCenter(coords, projection);
        this.setZoom(zoom);
    }
}

export default {
    install: (Vue: any) => {
        Vue.prototype.$getMapConfig = function (common: any) {
            return new OlMap(common);
        };
    },
};

