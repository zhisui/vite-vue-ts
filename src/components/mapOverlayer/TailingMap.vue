<template>
    <div style='position:absolute' v-drag>
        <Modal
            :mask="false"
            :value="true"
            :closable="false"
            :footer-hide="true"
            draggable
            :styles="{ width: '630px', top: '200px', left: '0px' }"
            class="map-modal"
            :z-index="107" >
            <div class="test" v-time="'YYYY'">2022-10-01 22:20:01</div>
            <div class="scroll-container" v-scroll='scrollData'>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts" setup>

const scrollHandler =() => {
    console.log('hello');
}
const scrollData = {
    handler:scrollHandler,
    pageNum:1,
    sliceList:[1,2,3,4,5,6],
    listTotal:5
}
</script>
<style lang="scss" scoped>
.map-modal {
    position: absolute;
    box-sizing: border-box;
    ::v-deep {
        .ivu-modal-content {
            // padding: 0;
            background: url('~@/assets/pop/map-pop-bg.png') no-repeat;
            background-size: 100% 100%;
            box-shadow: none;
        }
        .ivu-modal-body{
            // padding:0;
        }
    }
    .test {
        padding: 16px 28px;
        width: 100%;
        height: 100px;
    }
    .scroll-container{
        height:100px;
        overflow-y: scroll;
    }
}
</style>
