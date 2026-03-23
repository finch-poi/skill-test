<script setup lang="ts">
import FloorMenu from '@/components/component-test/FloorMenu.vue'
</script>

<template>
  <div class="component-test-page">
    <FloorMenu />
  </div>
</template>

<style lang="scss" scoped>
.component-test-page {
  min-height: 100vh;
  background: var(--o-color-fill1);
  display: flex;
  flex-direction: column;
}
</style>
