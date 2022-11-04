<template>
    <div class="app-main">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>

</script>
<script lang="ts">
export default {};
</script>
<style lang="scss" scoped>
.app-main {
  height: calc(100% - #{$top-bar-height});
  overflow: hidden;
}
</style>
