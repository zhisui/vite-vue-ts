<template>
    <div class="sub-panel">
        <div class="header">
            <div class="header-left">
                <div>
                    <span>{{ title }}</span>
                </div>
                <slot name="left"></slot>
            </div>
            <div class="header-right">
                <slot name="right"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        title?: string;
    }>(),
    {
        title: '',
    }
);
</script>
<style lang="scss" scoped>
.sub-panel {
    width: 100%;
    height: 100%;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        .header-left {
            display: flex;
            align-items: center;
            font-size: 16px;
            &::before {
                content: '';
                margin-right: 10px;
                width: 4px;
                height: 12px;
                background-color: var($primary-color);
            }
        }
    }
}
</style>
