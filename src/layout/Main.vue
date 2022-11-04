<template>
    <div class="main-view">
        <top-bar/>
        <app-main/>
    </div>
</template>

<script lang="ts">
import AppMain from './components/AppMain.vue';
import TopBar from './components/TopBar.vue';

export default {
    components: {
        TopBar,
        AppMain,
    },
};
</script>
<style lang="scss" scoped>
.main-view {
  height: 100%;
  overflow: hidden;
}
</style>
