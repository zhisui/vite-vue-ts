<template>
    <div class="map">
        <suc-map ref="baseMap" :options="olMap.map" v-bind.sync="olMap.view">
            <!--控件-->
            <template v-for="(item, index) in olMap.controls">
                <ol-control :key="index" :name="item.name" :config="item.config"></ol-control>
            </template>
            <!--基础底图-->
            <ol-layer
                :options="layer"
                :key="layer.name"
                v-for="layer in olMap.baseLayer"
                v-if="layer.source.visible"></ol-layer>

            <!-- 地图点位弹窗,-->
            <template v-if="mapState.mapOverlay?.show">
                <ol-overlay :position="mapState.mapOverlay.position" :offset="[0, -20]" category="clickLabel">
                    <component :is="TailingMap" :point="mapState.mapOverlay.info" />
                </ol-overlay>
            </template>

            <!-- 地图闪烁点 -->
            <template v-if="mapState?.flashPoint?.show">
                <ol-flash
                    :coords="mapState.flashPoint.position"
                    :loops="flashPointStyle.loops"
                    :duration="flashPointStyle.duration"
                    :radius-range="flashPointStyle.radiusRange"
                    :circle-style="flashPointStyle.style"
                    :zIndex="20" />
            </template>
            <!-- 尾矿库点位 -->
            <template>
                <ol-markers v-if="polluteGas.show" :zIndex="100">
                    <template v-for="(point, id) in polluteGas.points">
                        <ol-marker
                            :options="point"
                            @singleclick="test"
                            :key="'tailing' + id"></ol-marker>
                    </template>
                </ol-markers>
            </template>
        </suc-map>
    </div>
</template>

<script lang="ts" setup>
import { SucMap, OlLayer, OlControl, OlMarker, OlMarkers, OlOverlay,coordinateTransform } from '@suc/gnet-monch';
import { OlMap } from '@/utils/Map';
import { PointsType } from '@/types/common';
import { mapStore } from '@/stores/mapStore';
import { flashPointStyle } from '@/constant/map';
import { TailingMap } from '@/components/mapOverlayer';
const olMap = ref(new OlMap('baseMap'));
const baseMap = ref();
const props = defineProps<{
    mapPoints: {
        polluteGas: PointsType;
        polluteWater: PointsType;
    };
}>();
// const typeComponentMap = {
// 	'TailingMap':TailingMap
// }
const { polluteGas, polluteWater } = props.mapPoints;
const mapState = mapStore();
mapState.setMapOverlay({
        show: true,
        position: [0,0],
        component: '',
        info: {},
    });

const test = () => {
    alert('test')
    console.log('test')
}
const markerClick = (data: typeof mapState.mapOverlay) => {
    // alert(data)
    console.log(mapState.mapOverlay, 'mapState.mapOverlay测试一下');
    const info = data?.info;
    const jd = parseFloat(info.jd || info.JD || info.LONGITUDE);
    const wd = parseFloat(info.wd || info.WD || info.LATITUDE);
    const position = [jd, wd];
    let coord = coordinateTransform([position[0], position[1]], 'EPSG:4326', 'EPSG:3857');
    baseMap.value.getMap().then((map: any) => {
        map.getView().animate({ center: coord, zoom: 14 });
    });
    mapState.setFlashPoint({
        show: true,
        position: position,
    });
    mapState.setMapOverlay({
        show: true,
        position: position,
        component: info.popComponent,
        info: info,
    });
    console.log(mapState, 'mapState');
};
</script>
<style lang="scss" scoped>
.map {
    height: 100%;
    width: 100%;
}
</style>
