<template>
    <div class="layer-box">
        <div class="title" @click="isExpand = !isExpand">
            <div>图层</div>
            <div>
                <Icon type="ios-arrow-down" v-if="isExpand" />
                <Icon type="ios-arrow-forward" v-if="!isExpand" />
            </div>
        </div>

        <div class="tree-box" v-show="isExpand">
            <Tree ref="tree" :data="nav" show-checkbox @on-check-change="handleCheckChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { nav } from '@/constant/nav';
import CheckChangeReturn from '@/types/common'

const emit = defineEmits(['navCheckChange','getCheckedNodes'])
const isExpand = ref(false);
const tree = ref();

onMounted(() => {
    getCheckedNodes()
});

const handleCheckChange = (allNode:CheckChangeReturn[],currentNode:CheckChangeReturn) => {
    emit('navCheckChange',currentNode)
};

const getCheckedNodes = () => {
    let nodes;
    if (tree.value) {
        nodes = tree.value?.getCheckedNodes();
        console.log(nodes, 'nodes');
        emit('getCheckedNodes',nodes)
    }
}
</script>

<style scoped lang="scss">
.layer-box {
    position: relative;
    min-width: 160px;
    pointer-events: auto;
    color: #fff;
    border-radius: 6px;
    border: solid 1px #2670a1;
    background-image: linear-gradient(180deg, #014e90 0%, #022a59 100%);
    box-shadow: 0px 5px 3px 0px rgba(0, 0, 0, 0.35);
    .title {
        display: flex;
        justify-content: space-between;
        padding: 4px 10px;
    }
    .tree-box {
        border-top: solid 1px #2670a1;
        padding: 4px 10px;
    }
}

::v-deep.ivu-tree {
    margin-top: 4px;
    padding-bottom: 10px;
    .ivu-tree-children {
        padding-top: 4px;
        margin-left: 4px;

        li {
            margin: 0 0 1px;

            span {
                color: white;
            }
        }
    }
    .ivu-tree-title:hover {
        background-color: transparent;
    }
    .ivu-tree-title-selected,
    .ivu-tree-title-selected:hover {
        background-color: transparent;
    }
}
</style>
