<script setup lang="ts">
// 组件测试沙箱页
// 按需在下方 import 并使用组件
</script>

<template>
  <div class="component-test-page">
    <div class="test-canvas">
      <!-- 在此处添加组件 -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-test-page {
  min-height: 100vh;
  background: var(--o-color-fill1);
  padding: var(--o-r-gap-7);
}

.test-canvas {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-7);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-5);
}
</style>
