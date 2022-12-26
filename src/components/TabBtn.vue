<template>
    <div class="tab-btn">
        <div :class="{'tab-item': true,'active-item': active==index}"
             v-for="(item, index) in tabList" :key="index"
             @click="changeTab(index)"
        >
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script lang='ts' setup>
const props = withDefaults(defineProps<{
  tabList: any[]
}>(), {
    tabList: () => [''],
})
const emit = defineEmits(['changeTab' ])
const active = ref(0)

const changeTab = (index:number) => {
    active.value = index
    emit('changeTab', index)

}
</script>

<style lang="scss" scoped>
.tab-btn{
    display: flex;
    border: 1px solid var($primary-color);
    border-radius: 4px;
    font-size: 14px;
    .tab-item{
        width: 79px;
        height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid var($primary-color);
        background-image: linear-gradient(180deg,
            #014e90 0%,
            #022a59 100%);
        cursor: pointer;
        &:last-of-type{
            border-right: 0;
        }
    }
    .active-item{
        background-color: #00a8ff;
        background-image: none;
    }
}
</style>
