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
            <div class="test">hello</div>
        </Modal>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.map-modal {
    position: absolute;
    ::v-deep {
        .ivu-modal-content {
            // padding: 0;
            background: url('~@/assets/pop/map-pop-bg.png') no-repeat;
            background-size: 100% 100%;
            box-shadow: none;
        }
        .ivu-modal-body{
            padding:0;
        }
    }
    .test {
        padding: 16px 28px;
        width: 100%;
        height: 600px;
    }
}
</style>
