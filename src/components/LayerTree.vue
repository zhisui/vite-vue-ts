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
            <Tree ref="tree" :data="nav" show-checkbox @on-check-change="handleNodeChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { nav } from '@/constant/nav';
import CheckChangeReturn from '@/types/common';

const props = withDefaults(
    defineProps<{
        type?: string;
    }>(),
    {
        type: '',
    }
);
const emit = defineEmits(['layerChange']);
const isExpand = ref(false);
const tree = ref();

onMounted(() => {
    initLayers();
    getCheckedNodes();
});

const handleNodeChange = (allNode: CheckChangeReturn[], currentNode: CheckChangeReturn) => {
    emit('layerChange', currentNode);
};

const getCheckedNodes = () => {
    let nodes;
    if (tree.value) {
        nodes = tree.value?.getCheckedNodes(); //获取所有已选择节点
        emit('layerChange', nodes);
    }
};

const changeCheck = (checked: boolean, title: string) => {
    nav.forEach((item) => {
        if (item.title === title) {
            if (item.hasOwnProperty('expand')) {
                item.expand = checked;
            }
            item.checked = checked;
            if (item.children && item.children.length > 0) {
                changeCheck(checked, item.children as any);
            }
        }
    });
};

const checkNav = (status:boolean, titlesArr: string[]) => {
    titlesArr.forEach((title) => {
        if (JSON.stringify(nav).includes(title)) {
            changeCheck(status, title);
        }
    });
};

const getAllNavTitles = (navList: typeof nav) => {
    let titleArr: string[] = [];
    navList.forEach((item) => {
        if (item.title) {
            titleArr.push(item.title);
        }
        if (item.children) {
            getAllNavTitles(item.children as any);
        }
    });
    return titleArr;
};

const initLayers = () => {
    // 初始时需将所有的结点重置为未选中状态，再根据typeList动态渲染
    const navTitles = getAllNavTitles(nav)
    checkNav(false, navTitles);
    const typeList: any = {  //所需要的显示的点位
        pollute: ['废气', '废水'],
    };
    checkNav(true,typeList[props.type]);
};
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