<!-- 地图点位可拖拽弹窗-->
<template>
    <Teleport to="body">
        <transition name="dialog-fade">
            <div v-drag class="drag-box">
                <div ref="dialog" class="el-dialog-info" role="dialog" aria-modal="true" :aria-label="'dialog'" :class="['el-dialog']">
                    <div class="close" @click="close"></div>
                    <div class="header" style="cursor: move">
                        <span class="title">{{ title }}</span>
                    </div>
                    <div class="body">
                        <slot name="body" />
                    </div>
                    <div class="footer">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script>
import { mapStore } from '@/stores/mapStore';
import Teleport from 'vue2-teleport';
export default {
    components: { Teleport },
    props: {
        title: {
            type: String,
        },
    },
    data() {
        return {
            pointStore: null,
        };
    },

    methods: {
        close() {
            const store = mapStore();
            store.setMapOverlay({
                show: false,
                position: [0, 0],
                component: '',
                info: {},
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.drag-box {
    width: 100%;
}
.el-dialog-info {
    position: fixed;
    z-index: 999999;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0%);
    width: auto;
    background: url('~@/assets/pop/map-pop-bg.png') no-repeat;
    padding: 16px;
    background-size: 100% 100%;
    box-shadow: none;
    color: #fff;
    .header {
        cursor: auto;
        padding-left: 10px;
        .title {
            font-size: 16px;
        }
    }
    .body {
        padding: 10px 8px;
    }
    .footer {
        cursor: auto;
    }
    .close {
        width: 45px;
        height: 25px;
        background: url('~@/assets/pop/close.png') no-repeat;
        position: absolute;
        right: -12px;
        top: -14px;
        cursor: pointer;
    }
}
</style>
