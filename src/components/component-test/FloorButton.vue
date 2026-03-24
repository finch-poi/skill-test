<script setup lang="ts">
// 设计稿 ID：103:2730, 102:2573, 95:3920, 5:8158（Pixso item-id，按钮）
import { ref } from 'vue'
import {
  OButton,
  OIconAdd,
  OIconChevronRight,
  OIconFilter,
  OIconSearch,
  OIconDownload,
  OIconEdit,
  OIconDelete,
} from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

const isLoading = ref(false)

function triggerLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <AppSection
    title="OButton 按钮"
    subtitle="设计稿 ID：5:8158 · 102:2573 · 95:3920 · 103:2730 · 覆盖强调/普通/文字/链接 × L/M/S × Enabled/Disabled/Loading × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="button-row-light">
        <div class="theme-label">Light</div>

        <!-- 强调按钮（solid dark fill） -->
        <div class="group-card">
          <div class="group-title">强调按钮（variant="solid" color="normal"）</div>
          <div class="group-label">L 尺寸</div>
          <div class="btn-row" data-testid="emphasis-light-large">
            <OButton
              variant="solid"
              color="normal"
              size="large"
              round="pill"
              data-testid="emphasis-light-l-enabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="solid"
              color="normal"
              size="large"
              round="pill"
              disabled
              data-testid="emphasis-light-l-disabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>

          <div class="group-label">M 尺寸</div>
          <div class="btn-row" data-testid="emphasis-light-medium">
            <OButton
              variant="solid"
              color="normal"
              size="medium"
              round="pill"
              data-testid="emphasis-light-m-enabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="solid"
              color="normal"
              size="medium"
              round="pill"
              disabled
              data-testid="emphasis-light-m-disabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>

          <div class="group-label">S 尺寸</div>
          <div class="btn-row" data-testid="emphasis-light-small">
            <OButton
              variant="solid"
              color="normal"
              size="small"
              round="pill"
              data-testid="emphasis-light-s-enabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="solid"
              color="normal"
              size="small"
              round="pill"
              disabled
              data-testid="emphasis-light-s-disabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
        </div>

        <!-- 普通按钮（outline style） -->
        <div class="group-card">
          <div class="group-title">普通按钮（variant="outline"）</div>
          <div class="group-label">L 尺寸</div>
          <div class="btn-row" data-testid="outline-light-large">
            <OButton
              variant="outline"
              color="normal"
              size="large"
              round="pill"
              data-testid="outline-light-l-enabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="large"
              round="pill"
              disabled
              data-testid="outline-light-l-disabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>

          <div class="group-label">M 尺寸</div>
          <div class="btn-row" data-testid="outline-light-medium">
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              round="pill"
              data-testid="outline-light-m-enabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              round="pill"
              disabled
              data-testid="outline-light-m-disabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>

          <div class="group-label">S 尺寸</div>
          <div class="btn-row" data-testid="outline-light-small">
            <OButton
              variant="outline"
              color="normal"
              size="small"
              round="pill"
              data-testid="outline-light-s-enabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="small"
              round="pill"
              disabled
              data-testid="outline-light-s-disabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
        </div>

        <!-- 文字按钮（text variant） -->
        <div class="group-card">
          <div class="group-title">文字按钮（variant="text"）</div>
          <div class="group-label">各尺寸 · Enabled / Disabled</div>
          <div class="btn-row" data-testid="text-light-all">
            <OButton variant="text" color="normal" size="large" data-testid="text-light-l-enabled">
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="normal"
              size="large"
              disabled
              data-testid="text-light-l-disabled"
            >
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton variant="text" color="normal" size="medium" data-testid="text-light-m-enabled">
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="normal"
              size="medium"
              disabled
              data-testid="text-light-m-disabled"
            >
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton variant="text" color="normal" size="small" data-testid="text-light-s-enabled">
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="normal"
              size="small"
              disabled
              data-testid="text-light-s-disabled"
            >
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
        </div>

        <!-- 链接按钮（OButton href） -->
        <div class="group-card">
          <div class="group-title">链接按钮（variant="text" + href / OLink 风格）</div>
          <div class="group-label">各尺寸 · Enabled / Disabled</div>
          <div class="btn-row" data-testid="link-light-all">
            <OButton variant="text" color="primary" size="large" data-testid="link-light-l-enabled">
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="primary"
              size="large"
              disabled
              data-testid="link-light-l-disabled"
            >
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="primary"
              size="medium"
              data-testid="link-light-m-enabled"
            >
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="primary"
              size="medium"
              disabled
              data-testid="link-light-m-disabled"
            >
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton variant="text" color="primary" size="small" data-testid="link-light-s-enabled">
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="primary"
              size="small"
              disabled
              data-testid="link-light-s-disabled"
            >
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
        </div>

        <!-- 更多颜色变体 -->
        <div class="group-card">
          <div class="group-title">颜色变体（color variants）</div>
          <div class="btn-row" data-testid="color-variants-light">
            <OButton
              variant="solid"
              color="primary"
              size="medium"
              round="pill"
              data-testid="color-primary-solid"
            >
              <template #icon><OIconSearch /></template>
              Primary Solid
            </OButton>
            <OButton
              variant="outline"
              color="primary"
              size="medium"
              round="pill"
              data-testid="color-primary-outline"
            >
              Primary Outline
            </OButton>
            <OButton
              variant="solid"
              color="success"
              size="medium"
              round="pill"
              data-testid="color-success"
            >
              Success
            </OButton>
            <OButton
              variant="solid"
              color="warning"
              size="medium"
              round="pill"
              data-testid="color-warning"
            >
              Warning
            </OButton>
            <OButton
              variant="solid"
              color="danger"
              size="medium"
              round="pill"
              data-testid="color-danger"
            >
              Danger
            </OButton>
            <OButton
              variant="solid"
              color="brand"
              size="medium"
              round="pill"
              data-testid="color-brand"
            >
              Brand
            </OButton>
          </div>
        </div>

        <!-- 特殊状态 -->
        <div class="group-card">
          <div class="group-title">特殊状态（Loading / 图标按钮 / 后缀按钮）</div>
          <div class="btn-row" data-testid="special-states-light">
            <OButton
              variant="solid"
              color="primary"
              size="medium"
              round="pill"
              :loading="isLoading"
              data-testid="loading-btn"
              @click="triggerLoading"
            >
              <template #icon><OIconDownload /></template>
              点击加载
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              :icon="OIconEdit"
              data-testid="icon-only-btn"
            />
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              :icon="OIconDelete"
              data-testid="icon-only-danger"
            />
            <OButton
              variant="solid"
              color="primary"
              size="large"
              round="pill"
              data-testid="suffix-btn"
            >
              下拉选项
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="solid"
              color="normal"
              size="medium"
              round="pill"
              :loading="true"
              disabled
              data-testid="loading-disabled-btn"
            >
              加载中
            </OButton>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="button-row-dark"
      >
        <div class="theme-label">Dark</div>

        <!-- 强调按钮 Dark -->
        <div class="group-card group-card--dark">
          <div class="group-title">强调按钮（variant="solid"）</div>
          <div class="group-label">L 尺寸</div>
          <div class="btn-row" data-testid="emphasis-dark-large">
            <OButton
              variant="solid"
              color="normal"
              size="large"
              round="pill"
              data-testid="emphasis-dark-l-enabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="solid"
              color="normal"
              size="large"
              round="pill"
              disabled
              data-testid="emphasis-dark-l-disabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>

          <div class="group-label">M 尺寸</div>
          <div class="btn-row" data-testid="emphasis-dark-medium">
            <OButton
              variant="solid"
              color="normal"
              size="medium"
              round="pill"
              data-testid="emphasis-dark-m-enabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="solid"
              color="normal"
              size="medium"
              round="pill"
              disabled
              data-testid="emphasis-dark-m-disabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>

          <div class="group-label">S 尺寸</div>
          <div class="btn-row" data-testid="emphasis-dark-small">
            <OButton
              variant="solid"
              color="normal"
              size="small"
              round="pill"
              data-testid="emphasis-dark-s-enabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="solid"
              color="normal"
              size="small"
              round="pill"
              disabled
              data-testid="emphasis-dark-s-disabled"
            >
              <template #icon><OIconFilter /></template>
              强调按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
        </div>

        <!-- 普通按钮 Dark -->
        <div class="group-card group-card--dark">
          <div class="group-title">普通按钮（variant="outline"）</div>
          <div class="btn-row" data-testid="outline-dark-all">
            <OButton
              variant="outline"
              color="normal"
              size="large"
              round="pill"
              data-testid="outline-dark-l-enabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="large"
              round="pill"
              disabled
              data-testid="outline-dark-l-disabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              round="pill"
              data-testid="outline-dark-m-enabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              round="pill"
              disabled
              data-testid="outline-dark-m-disabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="small"
              round="pill"
              data-testid="outline-dark-s-enabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="outline"
              color="normal"
              size="small"
              round="pill"
              disabled
              data-testid="outline-dark-s-disabled"
            >
              <template #icon><OIconFilter /></template>
              普通按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
        </div>

        <!-- 文字按钮 Dark -->
        <div class="group-card group-card--dark">
          <div class="group-title">文字按钮（variant="text"）</div>
          <div class="btn-row" data-testid="text-dark-all">
            <OButton variant="text" color="normal" size="large" data-testid="text-dark-l-enabled">
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="normal"
              size="large"
              disabled
              data-testid="text-dark-l-disabled"
            >
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton variant="text" color="normal" size="medium" data-testid="text-dark-m-enabled">
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="normal"
              size="medium"
              disabled
              data-testid="text-dark-m-disabled"
            >
              <template #icon><OIconFilter /></template>
              文字按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="normal"
              size="small"
              disabled
              data-testid="text-dark-s-disabled"
            >
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
        </div>

        <!-- 链接按钮 Dark -->
        <div class="group-card group-card--dark">
          <div class="group-title">链接按钮（color="primary" variant="text"）</div>
          <div class="btn-row" data-testid="link-dark-all">
            <OButton variant="text" color="primary" size="large" data-testid="link-dark-l-enabled">
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="primary"
              size="large"
              disabled
              data-testid="link-dark-l-disabled"
            >
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton variant="text" color="primary" size="medium" data-testid="link-dark-m-enabled">
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="primary"
              size="medium"
              disabled
              data-testid="link-dark-m-disabled"
            >
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton variant="text" color="primary" size="small" data-testid="link-dark-s-enabled">
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
            <OButton
              variant="text"
              color="primary"
              size="small"
              disabled
              data-testid="link-dark-s-disabled"
            >
              链接按钮
              <template #suffix><OIconChevronRight /></template>
            </OButton>
          </div>
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

// 覆盖按钮样式以匹配设计稿
// 设计稿强调按钮背景 #202329，禁用背景 #D1D6DB
:deep(.o-btn-solid.o-btn-normal) {
  background: #202329 !important;
  border-color: #202329 !important;
  color: #fff !important;

  &.o-btn-disabled {
    background: #D1D6DB !important;
    border-color: #D1D6DB !important;
    color: rgba(255, 255, 255, 0.4) !important;
  }
}

// 普通按钮(Outline) - 边框 #0052CC, hover 背景 #F0F5FF
:deep(.o-btn-outline.o-btn-normal) {
  border-color: #0052CC !important;
  color: #0052CC !important;

  &:hover {
    background: #F0F5FF !important;
    border-color: #0052CC !important;
    color: #0052CC !important;
  }

  &.o-btn-disabled {
    border-color: #D1D6DB !important;
    color: rgba(0, 82, 204, 0.4) !important;
    background: transparent !important;
  }
}

// Dark 主题下强调按钮
.theme-section--dark :deep(.o-btn-solid.o-btn-normal) {
  background: #fff !important;
  border-color: #fff !important;
  color: #202329 !important;

  &.o-btn-disabled {
    background: #505458 !important;
    border-color: #505458 !important;
    color: rgba(0, 0, 0, 0.4) !important;
  }
}

// Dark 主题下普通按钮
.theme-section--dark :deep(.o-btn-outline.o-btn-normal) {
  border-color: #fff !important;
  color: #fff !important;

  &:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: #fff !important;
    color: #fff !important;
  }

  &.o-btn-disabled {
    border-color: #505458 !important;
    color: rgba(255, 255, 255, 0.4) !important;
  }
}
}

// Dark 主题下强调按钮
.theme-section--dark :deep(.o-btn-solid.o-btn-normal) {
  background: #fff !important;
  border-color: #fff !important;
  color: #202329 !important;

  &.o-btn-disabled {
    background: #505458 !important;
    border-color: #505458 !important;
    color: rgba(0, 0, 0, 0.4) !important;
  }
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

// ---- 分组卡片 ----
.group-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.group-card--dark {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: none;
}

.group-title {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  margin-bottom: var(--o-r-gap-1);
}

.group-label {
  @include tip2;
  color: var(--o-color-info3);
}

// ---- 按钮行 ----
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-3);
  align-items: center;
}
</style>
