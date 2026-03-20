<script setup lang="ts">
import { RouterView } from 'vue-router'
import { isGlobalLoading } from '@/composables/useGlobalLoading'
</script>

<template>
  <RouterView />
</template>

<style scoped>


</style>

<style>
body {
  background-color: var(--o-color-fill1);
}
</style>
