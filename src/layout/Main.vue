<template>
    <div class="view">
        <TopBar/>
        <AppMain/>
        <BottomBar/>
    </div>
</template>

<script lang="ts" setup>
import BottomBar from './components/BottomBar.vue';
import AppMain from './components/AppMain.vue';
import TopBar from './components/TopBar.vue';
</script>
<style lang="scss" scoped>
.view {
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #0A1C33;
}
</style>
