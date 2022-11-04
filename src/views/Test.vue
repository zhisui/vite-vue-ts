<template>
    <div class="test-a">
        <suc-map
            ref="mapObject"
            style="width: 300px; height: 300px; position: relative"
            :options="olMap.map"
            v-bind.sync="olMap.view">
            <!--控件-->
            <template v-for="(item, index) in olMap.controls">
                <ol-control :key="index" :name="item.name" :config="item.config"></ol-control>
            </template>
            <!--基础底图-->
            <ol-layer :options="layer" :key="layer.name" v-for="layer in olMap.baseLayer"></ol-layer>
        </suc-map>
        <suc-date-picker style="width: 100px" />
        <suc-button type="primary">test</suc-button>

        <p>{{data.name}}</p>
        <p>{{data.number}}</p>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Test',
};
</script>
<script lang="ts" setup>
import { SucButton, SucDatePicker } from '@suc/ui-components';
import { SucMap, OlLayer, OlControl } from '@suc/gnet-monch';
import { OlMap } from '@/utils/Map';
const olMap = ref(new OlMap('test-map'));
const  data =reactive ({
    name: 'test',
    number:1
})

</script>


<style lang="scss" scoped>
.test-a {
    width:100%;
    height:100%
}
</style>
