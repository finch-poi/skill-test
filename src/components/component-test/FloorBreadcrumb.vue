<script setup lang="ts">
// 设计稿 ID：201:3927（Pixso item-id，面包屑）
import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OBreadcrumb 面包屑"
    subtitle="设计稿 ID：201:3927 · 覆盖 Light/Dark × 多层级路径"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="breadcrumb-row-light">
        <div class="theme-label">Light</div>
        <div class="breadcrumb-demo-wrap">
          <OBreadcrumb data-testid="breadcrumb-light">
            <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1">一级页面</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1/level2">二级页面</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1/level2/level3">三级页面</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1/level2/level3/level4">四级页</OBreadcrumbItem>
            <OBreadcrumbItem>当前页面</OBreadcrumbItem>
          </OBreadcrumb>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="breadcrumb-row-dark">
        <div class="theme-label">Dark</div>
        <div class="breadcrumb-demo-wrap">
          <OBreadcrumb data-testid="breadcrumb-dark">
            <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1">一级页面</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1/level2">二级页面</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1/level2/level3">三级页面</OBreadcrumbItem>
            <OBreadcrumbItem href="/level1/level2/level3/level4">四级页</OBreadcrumbItem>
            <OBreadcrumbItem>当前页面</OBreadcrumbItem>
          </OBreadcrumb>
        </div>
      </div>

    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.floor-body {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-6);
}

// ---- 主题区块 ----
.theme-section {
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-5);
}

.theme-section--dark {
  background: #1f2127;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
}

.theme-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

// ---- 面包屑容器 ----
.breadcrumb-demo-wrap {
  display: flex;
  align-items: center;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-4) var(--o-r-gap-5);
}
</style>
