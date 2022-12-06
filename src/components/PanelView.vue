<template>
    <div class="panel-view">
        <div class="header">
            <div class="header-left">
                <div>
                    <span class="title">{{ title }}</span>
                </div>
                <slot name="left"></slot>
            </div>
            <div class="header-right">
                <slot name="right">
                    <template v-if="isDay">
                        <el-date-picker
                            v-model="day"
                            type="date"
                            :picker-options="pickerOptions"
                            :clearable="false"
                            style="width: 140px"
                            size="small"
                            unlink-panels
                            @change="changeTime(day)">
                        </el-date-picker>
                    </template>
                    <template v-if="isMonth">
                        <el-date-picker
                            v-model="month"
                            type="month"
                            :picker-options="pickerOptions"
                            :clearable="false"
                            style="width: 120px"
                            size="small"
                            unlink-panels
                            @change="changeTime(month)">
                        </el-date-picker>
                    </template>
                    <template v-if="isYear">
                        <el-date-picker
                            v-model="year"
                            type="year"
                            :picker-options="pickerOptions"
                            :clearable="false"
                            style="width: 100px"
                            size="small"
                            unlink-panels
                            @change="changeTime(year)">
                        </el-date-picker>
                    </template>
                </slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
interface PropsType {
    title?: string;
    isYear?: boolean;
    isMonth?: boolean;
    isDay?: boolean;
    yearTime?: string;
}
const props = withDefaults(defineProps<PropsType>(), {
    title: '',
    isYear: false,
    isMonth: false,
    isDay: false,
    yearTime: '',
    monthTime: '',
});
const emit = defineEmits(['changeTime']);

const day = ref(dayjs().format('YYYY-MM-DD'));
const month = ref(props.monthTime ? dayjs(props.monthTime).format('YYYY-MM') : dayjs().format('YYYY-MM'));
const year = ref(props.yearTime ? dayjs().format(props.yearTime) : dayjs().format('YYYY'));
const pickerOptions = reactive({
    disabledDate: (time: Date) => {
        let date = dayjs().set('month', 0).add(1, 'year').subtract(1, 'month').format('YYYY-MM');
        return time.getTime() > new Date(date).getTime();
    },
});
const changeTime = (time:Date | string) => {
    emit('changeTime', time);
};

</script>

<style lang="scss" scoped>
$deep: '::v-deep';
#{$deep} .el-range-editor {
    .el-input__icon,
    .el-range__close-icon,
    .el-range__icon {
        display: none;
    }

    .el-range-input {
        width: 45%;
        background-color: transparent;
        color: #fff;
    }

    .el-range-separator {
        width: 10%;
        color: #fff;
    }
}

#{$deep}.el-input__inner {
    font-size: 14px;
    background-color: transparent;
    border: solid 1px #157baf;
}

#{$deep} .el-date-editor {
    .el-input__inner {
        color: #fff;
        font-size: 14px;
        background-color: transparent;
        border: solid 1px #157baf;
    }
}

#{$deep} .ivu-input-wrapper input {
    border: solid 1px #157baf;
}

#{$deep}.ivu-select .ivu-select-selection {
    border: solid 1px #157baf;
}

.panel-view {
    // position: relative;
    padding: 16px;
    height: 100%;
    z-index: 2;
    background-image: linear-gradient(
        180deg,
        rgba(2, 42, 89, 0.98) 0%,
        rgba(2, 42, 89, 0.98) 50%,
        rgba(1, 78, 144, 0.98) 100%
    );
    border-radius: 10px;
    border: solid 1px #2b6b94;
    filter: blur(50px);
    filter: brightness(60%);
    filter: opacity(99%);

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;

        &-left {
            display: flex;
            .title {
                font-family: ShiShangZhongHeiJianTi;
                font-size: 20px;
            }
        }

        &-right {
            font-family: Source Han Sans CN;
            font-size: 14px;
            color: rgba($color: #fff, $alpha: 0.8);
        }
    }
}
</style>
