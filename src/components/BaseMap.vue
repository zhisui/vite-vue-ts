<template>
    <div class="map">
        <suc-map
            ref="mapObject"
            :options="olMap.map"
            v-bind.sync="olMap.view">
            <!--控件-->
            <template v-for="(item, index) in olMap.controls">
                <ol-control :key="index" :name="item.name" :config="item.config"></ol-control>
            </template>
            <!--基础底图-->
            <ol-layer :options="layer" :key="layer.name" v-for="layer in olMap.baseLayer" v-if="layer.source.visible" ></ol-layer>
        </suc-map>
    </div>
</template>

<script lang="ts" setup>
import { SucMap, OlLayer, OlControl } from '@suc/gnet-monch';
import { OlMap } from '@/utils/Map';
const olMap = ref(new OlMap('baseMap'));
</script>
<style lang="scss" scoped>
.map {
    height: 100%;
    width: 100%;
    position: relative;
}
</style>
