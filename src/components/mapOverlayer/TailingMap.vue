<template>
    <DragPop title="标题">
        <div slot="body" class="container">
            <div class="test" v-time="'YYYY'">2022-10-01 22:20:01</div>
            <div class="scroll-container" v-scroll="scrollData">
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
        </div>
    </DragPop>
</template>
<script lang="ts" setup>
import { DragPop } from '@/components';
const scrollHandler = () => {
    console.log('hello');
};
const scrollData = {
    handler: scrollHandler,
    pageNum: 1,
    sliceList: [1, 2, 3, 4, 5, 6],
    listTotal: 5,
};
</script>
<style lang="scss" scoped>
.container {
    height: 300px;
    width: 500px;
    overflow-y: auto;
}
</style>
