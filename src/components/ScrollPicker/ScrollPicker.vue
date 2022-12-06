<template>
    <div class="picker-box">
        <div class="picker-view">
            <div class="title">
                <div @click="cancel">取消</div>
                <div style="color:#07C160" @click="confirm(modelValIndex)">确认</div>
            </div>
            <div
                id="scroll-picker-container"
                class="scroll-picker-container noselect"
                @touchstart="onTouchStart"
                @touchend="onTouchEnd"
                @touchmove="onTouchMove"
                @mousedown="mouseDownStart">
                <div
                    id="scroll-picker-move"
                    class="scroll-picker-move"
                    :style="{
                        transform: `translateY(${translateY}px) translateX(0px) translateZ(1px)`,
                        transitionDuration: `${transitionDuration}ms`,
                    }">
                    <div
                        v-for="(item, index) in columns"
                        :key="index"
                        class="scroll-picker-move__item"
                        :style="{ height: itemHeight + 'px' }"
                        @click="moveTo(index)">
                        <span
                            :class="[
                                index === modelValIndex
                                    ? 'scroll-picker-move__item--active'
                                    : index === modelValIndex + 1 || index === modelValIndex - 1
                                    ? 'scroll-picker-move__item--gray'
                                    : index === modelValIndex + 2 || index === modelValIndex - 2
                                    ? 'scroll-picker-move__item--light'
                                    : 'scroll-picker-move__item--default',
                            ]"
                            >{{ item }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue';
import wheelEmulator from './MouseWheel';

export default defineComponent({
    name: 'ScrollPicker',
    props: {
        columns: {
            type: Array,
            default: () => [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        },
        itemHeight: {
            type: Number,
            default: 40,
        },
        dampingFactor: {
            type: Number,
            default: 0.1,
        },
    },
    setup(props, context) {
        const modelValIndex = ref(0);
        const itemHeight = props.itemHeight;
        const translateY = ref(0);
        const transitionDuration = ref(300);
        const transXBf = ref(0);
        const wrapHeight = ref(0);

        // 鼠标按着的时候初始值
        const mouseStartY = ref(0);

        const maxMoveX = ref(0);
        const minMoveX = ref(0);
        // 是否触发 click 事件
        const isClick = ref(true);
        // @ts-ignoe
        const onMove = (y: number) => {
            const dis = y - mouseStartY.value;
            mouseStartY.value = y;
            const newPos = translateY.value + dis;
            if (newPos > maxMoveX.value) {
                translateY.value = translateY.value + dis * props.dampingFactor;
            } else if (newPos < minMoveX.value) {
                translateY.value = translateY.value + dis * props.dampingFactor;
            } else {
                translateY.value = translateY.value + dis;
            }
        };

        const onEnd = () => {
            if (translateY.value === maxMoveX.value) {
                modelValIndex.value = 0;
            } else if (translateY.value === minMoveX.value) {
                modelValIndex.value = props.columns.length - 1;
            } else {
                const dis = translateY.value - transXBf.value;
                const count = Math.ceil(Math.abs(dis) / itemHeight);
                if (dis > 0) {
                    modelValIndex.value = Math.max(0, modelValIndex.value - count);
                } else {
                    modelValIndex.value = Math.min(props.columns.length - 1, modelValIndex.value + count);
                }
                translateY.value = -(modelValIndex.value * itemHeight + itemHeight / 2 - wrapHeight.value / 2);
            }
        };

        const onWheelEnd = () => {
            if (translateY.value === maxMoveX.value) {
                modelValIndex.value = 0;
            } else if (translateY.value === minMoveX.value) {
                modelValIndex.value = props.columns.length - 1;
            } else {
                const dis = translateY.value - transXBf.value;
                const count = Math.max(Math.round(Math.abs(dis) / itemHeight), 1);
                if (dis > 0) {
                    modelValIndex.value = Math.max(0, modelValIndex.value - count);
                } else {
                    modelValIndex.value = Math.min(props.columns.length - 1, modelValIndex.value + count);
                }
                translateY.value = -(modelValIndex.value * itemHeight + itemHeight / 2 - wrapHeight.value / 2);
            }
        };

        // PC 端
        const mouseMove = (e: MouseEvent) => {
            console.log('测试');
            onMove(e.clientY);
        };

        const mouseUpEnd = (e: MouseEvent) => {
            transitionDuration.value = 300;
            const dis = Math.abs(transXBf.value - translateY.value);
            if (dis > 3) {
                isClick.value = false;
            } else {
                isClick.value = true;
            }

            document.removeEventListener('mousemove', mouseMove, false);
            document.removeEventListener('mouseup', mouseUpEnd, false);
            onEnd();
        };

        const mouseDownStart = (e: MouseEvent) => {
            transitionDuration.value = 0;
            mouseStartY.value = e.clientY;
            transXBf.value = translateY.value;
            document.addEventListener('mousemove', mouseMove, false);
            document.addEventListener('mouseup', mouseUpEnd, false);
        };

        // PC 端点击具体标签
        const moveTo = (index: number) => {
            if (!isClick.value) {
                return;
            }
            translateY.value = -(index * itemHeight + itemHeight / 2 - wrapHeight.value / 2);
            modelValIndex.value = index;
        };

        // 手机端 touch
        const onTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0];
            mouseStartY.value = touch.clientX;
            transXBf.value = translateY.value;
        };

        const onTouchMove = (event: TouchEvent) => {
            event.preventDefault();
            const touch = event.touches[0];
            onMove(touch.clientY);
        };

        const onTouchEnd = () => {
            onEnd();
        };

        // 滚轮事件
        const handleStart = () => {
            transitionDuration.value = 300;
            transXBf.value = translateY.value;
        };

        // 超出边界加阻力
        const performDampingAlgorithm = (
            max: number,
            min: number,
            delta: number,
            currentPos: number,
            dampingFactor: number
        ) => {
            const newPos = delta + currentPos;
            if (newPos > max) {
                let dis = (newPos - max) * dampingFactor;
                if (dis > itemHeight) {
                    transitionDuration.value = 0;
                    modelValIndex.value = 0;
                    return max;
                } else {
                    return max + dis;
                }
            } else if (newPos < min) {
                let dis = (newPos - min) * dampingFactor;
                if (dis < -props.itemHeight) {
                    transitionDuration.value = 0;
                    modelValIndex.value = props.columns.length - 1;
                    return min;
                } else {
                    return min + dis;
                }
            } else {
                return newPos;
            }
        };

        const handleMove = (deltaCache: { x: number; y: number }) => {
            if (Math.abs(deltaCache.x) > Math.abs(deltaCache.y)) {
                //transXBf.value + deltaCache.x
                translateY.value = performDampingAlgorithm(
                    maxMoveX.value,
                    minMoveX.value,
                    deltaCache.x,
                    transXBf.value,
                    props.dampingFactor
                );
            } else {
                translateY.value = performDampingAlgorithm(
                    maxMoveX.value,
                    minMoveX.value,
                    deltaCache.y,
                    transXBf.value,
                    props.dampingFactor
                );
            }
        };

        const handleEnd = (deltaCache: { x: number; y: number }) => {
            onWheelEnd();
        };

        const initPicker = () => {
            wrapHeight.value = document.getElementById('scroll-picker-container')?.offsetHeight || 0;
            translateY.value = -(modelValIndex.value * itemHeight + itemHeight / 2 - wrapHeight.value / 2);
            minMoveX.value = -(props.columns.length * itemHeight - itemHeight / 2 - wrapHeight.value / 2);
            maxMoveX.value = wrapHeight.value / 2 - itemHeight / 2;
        };

        const cancel = () => {
            context.emit('cancel')
        }
        const confirm = (modelValIndex:number) => {
            context.emit('confirm',modelValIndex)
        }
        let clearWindowEvent: any = null;
        onMounted(() => {
            initPicker();
            const moveContainer = document.getElementById('scroll-picker-container');
            if (moveContainer) {
                clearWindowEvent = wheelEmulator(moveContainer, {
                    maxDis: itemHeight * props.columns.length,
                    deltaXStep: itemHeight / 2,
                    deltaYStep: itemHeight,
                    handleMove,
                    handleEnd,
                    handleStart,
                });
            }
            window.addEventListener('resize', initPicker, false);
        });

        onUnmounted(() => {
            clearWindowEvent();
            window.removeEventListener('resize', initPicker, false);
        });

        return {
            translateY,
            moveTo,
            wrapHeight,
            mouseStartY,
            mouseDownStart,
            mouseUpEnd,
            mouseMove,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            maxMoveX,
            minMoveX,
            transXBf,
            isClick,
            transitionDuration,
            modelValIndex,
            performDampingAlgorithm,
            initPicker,
            cancel,
            confirm

        };
    },
});
</script>
<style lang="scss" scoped>
.picker-box {
    background-color: rgb(38, 38, 38, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    animation-name: slideInUp;
}
@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.picker-view {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 10px;
    z-index: 2000;
    width:100%;
    background-color: #fff;
    .title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 600;
            >div {
                cursor: pointer;
                 transition: 0.2s ease;
                &:hover{
                    transform: scale(1.2);
                }
            }
            border-bottom:1px solid #F5F5F5;

        }
}

.scroll-picker-container {
    overflow-y: hidden;
    width: 100%;
    height: 200px;

    z-index: 2000;
    .scroll-picker-move {
        transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        transition-property: transform;
        height: 100%;
        width: 100%;

        &__item {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 100%;
            &--active {
                display: inline-block;
                font-size: 20px;
                font-weight: 500;
                width: 100%;
                text-align: center;
                color: #262626;
                border-bottom: 1px solid #F5F5F5;
                border-top: 1px solid #F5F5F5;
            }
            &--gray {
                color: #565656;
                font-size: 14px;
            }
            &--light {
                color: #969696;
                font-size: 14px;
            }
            &--default {
                color: #bcbcbc;
                font-size: 14px;
            }
        }
    }
}
</style>
