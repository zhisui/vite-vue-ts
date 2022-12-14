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
import { getLayerNavObj } from '@/utils/cache';

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
const navObj = ref();

onMounted(async () => {
    await initLayers();
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

const changeCheck = (checked: boolean, list: any[]) => {
    list.forEach((item) => {
        if (item.hasOwnProperty('expand')) {
            item.expand = checked;
        }
        if (item.hasOwnProperty('checked')) {
            item.checked = checked;
        }
        if (!checked && item.hasOwnProperty('indeterminate') && item.children) {
            item.indeterminate = checked;
        }
        if (item.children && item.children.length > 0) {
            changeCheck(checked, item.children);
        }
    });
};

const checkNav = (arr: string[]) => {
    arr.map((siteName) => {
        if (navObj.value[siteName]) {
            navObj.value[siteName].reduce((pre: typeof nav, cur: any, index: number) => {
                if (pre[cur].children) {
                    pre[cur].expand = true;
                    if (index == navObj.value[siteName].length - 1) {
                        pre[cur].checked = true;
                        changeCheck(true, pre[cur].children);
                    } else {
                        pre[cur].checked = false;
                    }
                } else {
                    pre[cur].checked = true;
                }
                console.log(pre[cur].children, 'pre[cur].children');
                return pre[cur].children;
            }, nav);
        }
    });
};

const initLayers = async () => {
    changeCheck(false, nav);
    const typeList: any = {
        //所需要的显示的点位
        pollute: ['废气', '测试2.0'],
    };
    navObj.value = await getLayerNavObj();
    checkNav(typeList[props.type]);
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
