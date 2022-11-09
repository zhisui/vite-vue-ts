<template>
    <div >
        <map />
        <Button type="info" @click='click'>Info</Button>
        <el-button type="danger" plain disabled>危险按钮</el-button>
    </div>
</template>

<script lang="ts" setup>

import { OlMap } from '@/utils/Map';
import {map} from '@/components'
import {Message} from 'iview'
import { testApi } from '@/api/test';
import dayjs from 'dayjs';
// import { Button } from 'iview';
const rate = ref(0)
const getData = async () => {
    const params = {
        time:dayjs().format("YYYY-MM")
    }
    const res = await testApi(params)
    console.log(res.datas[0],'res')
}
getData()
const click = () => {
    // // @ts-ignore
    // Message.error('hello')
}

</script>

<style lang="scss" scoped>

</style>
