<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script setup lang="ts">
import debounce from '@/utils/debounce';
const setRem = () => {
    const baseSize = 16;
    const scale = document.documentElement.clientWidth / 1920;
    document.documentElement.style.fontSize = baseSize * scale + 'px';
};

const event = debounce(setRem, 500, true)
onMounted(() => {
    window.addEventListener('resize', event());
});

onUnmounted(() => {
    window.removeEventListener('resize', event());
});
</script>
