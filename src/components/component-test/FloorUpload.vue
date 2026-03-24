<script setup lang="ts">
// 设计稿 ID：344:16841, 271:16475, 271:16434（Pixso item-id，上传）
// TODO: OUpload 类型定义不完整，暂用占位符
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OUpload 上传"
    subtitle="设计稿 ID：344:16841 · 271:16475 · 271:16434 · 覆盖图片卡片/拖拽/按钮 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <div class="placeholder">OUpload 组件待实现（类型定义不完整）</div>
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
