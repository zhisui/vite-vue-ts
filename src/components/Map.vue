<template>
    <div class="map-container">
        <BaseMap :mapPoints="mapPoints" />
        <div class="center">
            <!-- 地图右侧环保图层筛选框-->
            <div class="layertree">
                <LayerTree ref="layerTree" @layerChange="layerChange" :type="props.type" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NodeReturn from '@/types/common';
import { getGasPoints } from '@/utils/getPoints';
const props = withDefaults(
    defineProps<{
        type?: string;
    }>(),
    {
        type: '',
    }
);

const layerTree = ref();
const mapPoints = reactive({
    polluteGas: {
        points: [],
        show: false,
    },
    polluteWater: {
        points: [],
        show: false,
    },
});

onMounted(() => {});

// 图层节点点击显示点位
const layerChange = async (current: NodeReturn | NodeReturn[]) => {
    console.log(current, 'currentCheck是什麽');
    if (Array.isArray(current)) {
        //初始渲染时调用
        for (let i = 0; i < current.length; i++) {
            changeSingleCheck(current[i]);
        }
    } else {
        //节点切换时调用
        changeSingleCheck(current);
    }
};

const changeSingleCheck = async (currentNode: NodeReturn) => {
    switch (currentNode.title) {
        case '废气': {
            if (currentNode.checked) {
                mapPoints.polluteGas.points = await getGasPoints();
                mapPoints.polluteGas.show = true;
            } else {
                mapPoints.polluteGas.show = false;
            }
        }
    }
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
        right: 16px;
    }
}
</style>
