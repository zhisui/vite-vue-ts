<template>
    <div class="map-container">
        <BaseMap />
        <div class="center">
            <!-- 地图右侧环保图层筛选框-->
            <div class="layertree">
                <LayerTree ref="layerTree" @layerChange="layerChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const layerChange = () => {
    console.log('hello');
};
</script>

<style lang="scss" scoped>
.map-container {
    position: relative;
    width: 100%;
    height: 100%;
}
.center {
    width: calc(100% - 880px - 32px);
    padding: 0 16px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 456px;
    pointer-events: none;

    .layertree {
        position: absolute;
        top: 16px;
        right: 0;
    }
}
</style>
