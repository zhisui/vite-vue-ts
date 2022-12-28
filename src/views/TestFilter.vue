<template>
    <div>
        <div class="test">
            {{ 'test' | filterName }}
        </div>
        <div class="text">
            <p>
                Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。当数据项的顺序改变时，Vue
                不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。
                默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态
                (例如表单输入值) 的情况。 为了给 Vue
                一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的
                key attribute：
            </p>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.test {
    @include center;
    height: 100px;
    width: 100px;
    font-size: 24px;
    background-color: lightblue;
}
.text {
    height: 10px;
    width: 100px;
}
</style>
