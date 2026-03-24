<script setup lang="ts">
// 设计稿 ID：4013:86（Pixso item-id，悬浮按钮）
import { OButton, OIconFilter, OIconEdit, OIconRefresh } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="悬浮按钮 FloatButton"
    subtitle="设计稿 ID：4013:86 · 覆盖亮/暗主题 · 竖向排列图标按钮组"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="float-button-row-light">
        <div class="theme-label">Light</div>
        <div class="demo-area">
          <!-- 悬浮按钮组：竖向 pill 形容器，3 个图标按钮 + 分隔线 -->
          <!-- DSL: width=56, height=170, cornerRadius=100, padding=16, itemSpacing=16 -->
          <div class="float-btn-group" data-testid="float-btn-group-light">
            <OButton
              :icon="OIconFilter"
              variant="text"
              class="float-btn-item"
              data-testid="float-btn-item-0-light"
            />
            <div class="float-btn-divider" />
            <OButton
              :icon="OIconEdit"
              variant="text"
              class="float-btn-item"
              data-testid="float-btn-item-1-light"
            />
            <div class="float-btn-divider" />
            <OButton
              :icon="OIconRefresh"
              variant="text"
              class="float-btn-item"
              data-testid="float-btn-item-2-light"
            />
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="float-button-row-dark">
        <div class="theme-label">Dark</div>
        <div class="demo-area">
          <div class="float-btn-group" data-testid="float-btn-group-dark">
            <OButton
              :icon="OIconFilter"
              variant="text"
              class="float-btn-item"
              data-testid="float-btn-item-0-dark"
            />
            <div class="float-btn-divider" />
            <OButton
              :icon="OIconEdit"
              variant="text"
              class="float-btn-item"
              data-testid="float-btn-item-1-dark"
            />
            <div class="float-btn-divider" />
            <OButton
              :icon="OIconRefresh"
              variant="text"
              class="float-btn-item"
              data-testid="float-btn-item-2-dark"
            />
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

// ---- Demo 区域 ----
.demo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  position: relative;
}

// ---- 悬浮按钮组（竖向 pill 形容器）----
// DSL 溯源：width=56, height≈170, cornerRadius=100, padding=16, itemSpacing=16
// fill: rgba(255,255,255,1) light / rgba(255,255,255,1) dark (theme token handles it)
.float-btn-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  border-radius: 100px;
  background: var(--o-color-fill2);
  box-shadow: var(--o-shadow-1);
  width: 56px;
}

// ---- 图标按钮 item ----
// DSL: each icon 24×24px, text variant (no background), interactive color
.float-btn-item {
  flex-shrink: 0;
  // 覆盖 OButton 的 padding/min-width 使其紧凑为 24×24
  --btn-padding: 0;
  --btn-min-width: 24px;
  --btn-height: 24px;
}

// ---- 分隔线 ----
// DSL: height=1, width=24（容器宽 56 - 左右 padding 各 16 = 24px）
.float-btn-divider {
  width: 24px;
  height: 1px;
  background: var(--o-color-fill3);
  flex-shrink: 0;
}
</style>
