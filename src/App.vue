<script setup lang="ts">
import { RouterView } from 'vue-router'
import { isGlobalLoading } from '@/composables/useGlobalLoading'
</script>

<template>
  <Transition name="loading-bar">
    <div v-if="isGlobalLoading" class="global-loading-bar" />
  </Transition>
  <RouterView />
</template>

<style scoped>
.global-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--o-color-primary1, #002fa7);
  z-index: 9999;
  animation: loading-progress 1.5s ease-in-out infinite;
}

@keyframes loading-progress {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(0.7);
    transform-origin: left;
  }
  51% {
    transform-origin: right;
  }
  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

.loading-bar-enter-active {
  transition: opacity 0.15s ease;
}

.loading-bar-leave-active {
  transition: opacity 0.3s ease;
}

.loading-bar-enter-from,
.loading-bar-leave-to {
  opacity: 0;
}
</style>
