<template>
    <div class="map-container">
        <BaseMap :mapPoints='pointsCollect'/>
        <div class="center">
            <!-- 地图右侧环保图层筛选框-->
            <div class="layertree">
                <LayerTree ref="layerTree" @navCheckChange="navCheckChange" @getCheckedNodes ='getInitPoints'/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NodeReturn from '@/types/common';
import {useMapPoints} from '../utils/useMapPoints';

const layerTree = ref()
const pointsCollect = ref({
    polluteGas:{
        points:[],
        show:false,
    },
    polluteWater:{
        points:[],
        show:false,
    },

})
onMounted(() => {

})

// 图层节点点击显示点位
const navCheckChange = async(currentCheck:NodeReturn) => {
    const {mapPoints} = useMapPoints(currentCheck)
    pointsCollect.value = mapPoints
};

//跳转到相应页面初始显示点位
const getInitPoints = (nodes:NodeReturn[]) => {
    console.log(nodes,'nodes是什么')
    const {mapPoints} = useMapPoints(nodes)
    pointsCollect.value = mapPoints
}



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
        right: 16px;
    }
}
</style>
