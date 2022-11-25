<template>
    <div class="container">
        <map />
        <Button type="info" @click="click">Info</Button>
        <el-button type="danger" plain disabled>危险按钮</el-button>
        <div style="width: 50vw; height: 50vh">
            <v-chart :option="option" autoresize :loading="false" />
            <button @click="updateData">更新数据</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { OlMap } from '@/utils/Map';
import { map } from '@/components';
import { Message } from 'iview';
import { testApi } from '@/api/test';
import dayjs from 'dayjs';
// import { Button } from 'iview';
const rate = ref(0);
const getData = async () => {
    const params = {
        time: dayjs().format('YYYY-MM'),

    };
    const res = await testApi(params)
    console.log(res.datas[0],'res')
};
const option = reactive({
    xAxis: {
        data: ['2015', '2016', '2017', '2018', '2019', '2020'],
    },
    yAxis: {},
    series: {
        data: [220, 100, 350, 280, 170, 310, 30],
        type: 'bar',
    },
});

const updateData = () => {
    option.series.data = [120, 10, 50, 380, 70, 210, 230]; //可以


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
