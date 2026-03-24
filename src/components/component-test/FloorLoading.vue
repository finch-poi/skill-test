<script setup lang="ts">
// 设计稿 ID：31:3296（Pixso item-id，加载）
// TODO: OLoading 类型定义不完整，暂用占位符
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OLoading 加载"
    subtitle="设计稿 ID：31:3296 · 覆盖 Large/Medium/Small × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <div class="placeholder">OLoading 组件待实现（类型定义不完整）</div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.floor-body {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-6);
}

.placeholder {
  padding: var(--o-r-gap-6);
  text-align: center;
  color: var(--o-color-info3);
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
}
</style>
