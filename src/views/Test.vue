<template>
    <div class="container">
        <BaseMap />
        <Button type="info" @click="click">Info</Button>
        <el-button type="danger" plain disabled>危险按钮</el-button>
        <div style="width: 50vw; height: 50vh">
            <v-chart :option="option" autoresize :loading="false" />
            <Button @click="updateData">更新数据</Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Message } from 'iview';
import { testApi } from '@/api/test';
import 'echarts-liquidfill'
import dayjs from 'dayjs';
const rate = ref(0);
const getData = async () => {
    const params = {
        time: dayjs().format('YYYY-MM'),
    };
    const res = await testApi(params)
    console.log(res.datas[0],'res')
};

var value = 0.5;
var data = [value, value, value];
var option = {
    title: [
        {
            text: '单位综合能耗',
            x: '25%',
            y: 30,
            textAlign: 'center',
            textStyle: {
                color: '#212b43',
                fontSize: 16,
                fontFamily: 'Microsoft Yahei',
                fontWeight: '100',
                textAlign: 'center',
            },
        },

        {
            text: (value * 100).toFixed(0) + '%',
            left: '25%',
            top: '38%',
            textAlign: 'center',
            textStyle: {
                fontSize: '50',
                fontWeight: '300',
                color: '#a06a0a',
                textAlign: 'center',
                textBorderColor: 'rgba(0, 0, 0, 0)',
                textShadowColor: '#fff',
                textShadowBlur: '0',
                textShadowOffsetX: 0,
                textShadowOffsetY: 1,
            },
        },
    ],
    series: [
        {
            type: 'liquidFill',
            radius: '50%',
            z: 6,
            center: ['25%', '50%'],
            // color:[ {
            //     type: 'linear',
            //     x: 0,
            //     y: 0,
            //     x2: 0,
            //     y2: 1,
            //     colorStops: [{
            //         offset: 1,
            //         color: 'rgba(2, 159, 200, 1)'
            //     }, {
            //         offset: 0.5,
            //         color: 'rgba(0, 186, 211, .5)'
            //     }, {
            //         offset: 0,
            //         color: 'rgba(0, 230, 220, 1)'
            //     }],
            //     globalCoord: false
            // }],
            color: [
                {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 1,
                            color: 'rgba(251, 173, 23, 0)',
                        },
                        {
                            offset: 0.5,
                            color: 'rgba(251, 173, 23, .2)',
                        },
                        {
                            offset: 0,
                            color: 'rgba(251, 173, 23, 1)',
                        },
                    ],
                    globalCoord: false,
                },
            ],
            data: data,
            backgroundStyle: {
                borderWidth: 1,
                color: 'transparent',
            },
            label: {
                normal: {
                    formatter: '',
                },
            },
            outline: {
                show: true,
                itemStyle: {
                    borderWidth: 0,
                },
                borderDistance: 0,
            },
        },
        {
            name: '第二层白边',
            type: 'pie',
            z: 3,
            radius: ['0%', '55%'],
            center: ['25%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                },
            },
            data: [
                {
                    value: 100,

                },
                {
                    value: 0,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                        },
                    },
                },
            ],
        },
        {
            name: '最外绿边',
            type: 'pie',
            z: 1,
            radius: ['0%', '58%'],
            center: ['25%', '50%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                },
            },
            data: [
                {
                    value: 100,
                    itemStyle: {
                        color:'#fdc56e'
                    },
                },
                {
                    value: 0,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                        },
                    },
                },
            ],
        },
    ],
};



const updateData = () => {

};
getData();
const click = () => {
    // // @ts-ignore
    // Message.error('hello')
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
