<template>
    <div>
        <Modal
            :mask="false"
            :value="true"
            :closable="false"
            :footer-hide="true"
            :styles="{ width: '630px', top: '140px', left: '0px' }"
            class="map-modal"
            :z-index="107">
            <div>hello</div>
        </Modal>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.map-modal {
    color: #000;
}
</style>
