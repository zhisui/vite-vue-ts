<template>
    <div class="container">
        <Map type="pollute" />
        <div class="main-view">
            <div class="left">
                <div class="left-item">1</div>
                <div class="left-item">2</div>
                <div class="left-item">3</div>
            </div>
            <div class="center"></div>
            <div class="right">
                <div class="right-item">1</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Message } from 'iview';
import { testApi } from '@/api/test';
import 'echarts-liquidfill';
import 'echarts-gl';
import ScrollPicker from '@/components/ScrollPicker/ScrollPicker.vue';
import TestFilter from './TestFilter.vue';
import { Map } from '@/components';
import dayjs from 'dayjs';
// import dateFormat from '@/directives/dateFormat';
const rate = ref(0);
const getData = async () => {
    const params = {
        time: dayjs().format('YYYY-MM'),
    };
    const res = await testApi(params);
    console.log(res.datas[0], 'res');
};

var value = 0.5;
var data = [value, value, value];
const option = {
    grid3D: {},
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    series: [
        {
            type: 'scatter3D',
            symbolSize: 50,
            data: [
                [-1, -1, -1],
                [0, 0, 0],
                [1, 1, 1],
            ],
            itemStyle: {
                opacity: 1,
            },
        },
    ],
};
// var option = {
//     title: [
//         {
//             text: '单位综合能耗',
//             x: '25%',
//             y: 30,
//             textAlign: 'center',
//             textStyle: {
//                 color: '#212b43',
//                 fontSize: 16,
//                 fontFamily: 'Microsoft Yahei',
//                 fontWeight: '100',
//                 textAlign: 'center',
//             },
//         },

//         {
//             text: (value * 100).toFixed(0) + '%',
//             left: '25%',
//             top: '38%',
//             textAlign: 'center',
//             textStyle: {
//                 fontSize: '50',
//                 fontWeight: '300',
//                 color: '#a06a0a',
//                 textAlign: 'center',
//                 textBorderColor: 'rgba(0, 0, 0, 0)',
//                 textShadowColor: '#fff',
//                 textShadowBlur: '0',
//                 textShadowOffsetX: 0,
//                 textShadowOffsetY: 1,
//             },
//         },
//     ],
//     series: [
//         {
//             type: 'liquidFill',
//             radius: '50%',
//             z: 6,
//             center: ['25%', '50%'],

//             color: [
//                 {
//                     type: 'linear',
//                     x: 0,
//                     y: 0,
//                     x2: 0,
//                     y2: 1,
//                     colorStops: [
//                         {
//                             offset: 1,
//                             color: 'rgba(251, 173, 23, 0)',
//                         },
//                         {
//                             offset: 0.5,
//                             color: 'rgba(251, 173, 23, .2)',
//                         },
//                         {
//                             offset: 0,
//                             color: 'rgba(251, 173, 23, 1)',
//                         },
//                     ],
//                     globalCoord: false,
//                 },
//             ],
//             data: data,
//             backgroundStyle: {
//                 borderWidth: 1,
//                 color: 'transparent',
//             },
//             label: {
//                 normal: {
//                     formatter: '',
//                 },
//             },
//             outline: {
//                 show: true,
//                 itemStyle: {
//                     borderWidth: 0,
//                 },
//                 borderDistance: 0,
//             },
//         },
//         {
//             name: '第二层白边',
//             type: 'pie',
//             z: 3,
//             radius: ['0%', '55%'],
//             center: ['25%', '50%'],
//             hoverAnimation: false,
//             itemStyle: {
//                 normal: {
//                     label: {
//                         show: false,
//                     },
//                 },
//             },
//             data: [
//                 {
//                     value: 100,

//                 },
//                 {
//                     value: 0,
//                     itemStyle: {
//                         normal: {
//                             color: 'transparent',
//                         },
//                     },
//                 },
//             ],
//         },
//         {
//             name: '最外绿边',
//             type: 'pie',
//             z: 1,
//             radius: ['0%', '58%'],
//             center: ['25%', '50%'],
//             hoverAnimation: false,
//             itemStyle: {
//                 normal: {
//                     label: {
//                         show: false,
//                     },
//                 },
//             },
//             data: [
//                 {
//                     value: 100,
//                     itemStyle: {
//                         color:'#fdc56e'
//                     },
//                 },
//                 {
//                     value: 0,
//                     itemStyle: {
//                         normal: {
//                             color: 'transparent',
//                         },
//                     },
//                 },
//             ],
//         },
//     ],
// };

const updateData = () => {};
getData();
const click = () => {
    // // @ts-ignore
    // Message.error('hello')
};
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    position: relative;
}

.main-view {
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .left {
        width: 440px;
        height: 100%;
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        .left-item {
            z-index: 999;
            &:nth-of-type(1) {
                height: 250px;
                margin-bottom: 10px;
                position: relative;
            }
            &:nth-of-type(2) {
                height: 240px;
                margin-bottom: 10px;
                position: relative;
            }

            &:last-of-type {
                flex: 1;
                overflow: auto;
                position: relative;
                z-index: 0;
            }
        }
    }

    .center {
        position: relative;
        padding: 0 16px;
        width: calc(100% - 880px);
        height: 100%;
        .tab {
            position: absolute;
            top: 10px;
            left: 10px;
            color: #fff;
            pointer-events: auto;
        }
    }

    .right {
        width: 440px;
        height: 100%;
        pointer-events: auto;
        .right-item {
            &:first-of-type {
                height: 100%;
            }
        }
    }
}
</style>
