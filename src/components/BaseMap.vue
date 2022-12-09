<template>
    <div class="map">
        <suc-map ref="mapObject" :options="olMap.map" v-bind.sync="olMap.view">
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

            <!-- 尾矿库 -->
            <template>
                <ol-markers v-if="props.mapPoints.polluteGas.show" :zIndex="100">
                    <template v-for="(point, id) in props.mapPoints.polluteGas.points">
                        <ol-marker
                            :options="point"
                            @singleclick="markerClick(point)"
                            :key="'tailing' + id"></ol-marker>
                    </template>
                </ol-markers>
            </template>
        </suc-map>
    </div>
</template>

<script lang="ts" setup>
import { SucMap, OlLayer, OlControl,OlMarker,OlMarkers } from '@suc/gnet-monch';
import { OlMap } from '@/utils/Map';
import {PointsType} from '@/types/common'

const olMap = ref(new OlMap('baseMap'));
const props = defineProps<{
    mapPoints: {
        polluteGas: PointsType;
        polluteWater: PointsType;
    };
}>();

console.log(props,'props')

const markerClick = (point: any) => {
};
</script>
<style lang="scss" scoped>
.map {
    height: 100%;
    width: 100%;
}
</style>
