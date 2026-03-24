<script setup lang="ts">
// 设计稿 ID：32:3907, 206:8732, 206:8762（Pixso item-id，列表）
import { ref } from 'vue'
import {
  OSwitch,
  OButton,
  OIconChevronRight,
  OIconFilter,
} from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
import { AppIconUser } from '@/icon-components'

// Switch states (shared between light/dark since they use same model)
const switchState1 = ref(true)
const switchState2 = ref(false)
</script>

<template>
  <AppSection
    title="OList 列表"
    subtitle="设计稿 ID：32:3907, 206:8732, 206:8762 · 覆盖单行/双行/子标题 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="list-row-light">
        <div class="theme-label">Light</div>

        <div class="list-columns">
          <!-- Column 1: 单行列表 (32:3907) -->
          <div class="list-col">
            <div class="list-card">
              <div class="list-card-label">单行列表 (32:3907)</div>

              <!-- Single: 仅文字 -->
              <div class="list-item list-item--border">
                <span class="list-item-text">列表文字列表文字</span>
              </div>

              <!-- Switch: 文字 + 开关 -->
              <div class="list-item list-item--border">
                <div class="list-item-left">
                  <OIconFilter class="list-item-icon" />
                  <span class="list-item-text">列表文字列表文字</span>
                </div>
                <OSwitch v-model="switchState1" size="small" />
              </div>

              <!-- Btn: 文字 + 关注按钮 -->
              <div class="list-item list-item--border">
                <div class="list-item-left">
                  <OIconFilter class="list-item-icon" />
                  <span class="list-item-text">列表文字列表文字</span>
                </div>
                <OButton size="small" round="pill" variant="outline">关注</OButton>
              </div>

              <!-- Arrow: 图标 + 文字 + 普通按钮 + 右箭头 -->
              <div class="list-item list-item--border">
                <div class="list-item-left">
                  <OIconFilter class="list-item-icon" />
                  <span class="list-item-text">列表文字列表文字</span>
                </div>
                <div class="list-item-action">
                  <span class="list-item-action-text">普通按钮</span>
                  <OIconChevronRight class="list-item-arrow" />
                </div>
              </div>

              <!-- Group: 带圆角背景块 -->
              <div class="list-item list-item--group">
                <span class="list-item-text">列表文字列表文字</span>
                <span class="list-item-group-tag">列表文字列表文字</span>
              </div>
            </div>
          </div>

          <!-- Column 2: 双行列表 (206:8732) -->
          <div class="list-col">
            <div class="list-card">
              <div class="list-card-label">双行列表 (206:8732)</div>

              <!-- 双行 item 1 -->
              <div class="list-item list-item--double list-item--border">
                <div class="list-item-avatar">
                  <AppIconUser class="list-item-avatar-icon" />
                </div>
                <div class="list-item-content">
                  <div class="list-item-title">列表文字列表文字</div>
                  <div class="list-item-subtitle">列表文字列表文字</div>
                </div>
                <OButton size="small" round="pill" variant="outline">关注</OButton>
              </div>

              <!-- 双行 item 2 -->
              <div class="list-item list-item--double list-item--border">
                <div class="list-item-avatar">
                  <AppIconUser class="list-item-avatar-icon" />
                </div>
                <div class="list-item-content">
                  <div class="list-item-title">列表文字列表文字</div>
                  <div class="list-item-subtitle">列表文字列表文字</div>
                </div>
                <OButton size="small" round="pill" variant="outline">关注</OButton>
              </div>
            </div>
          </div>

          <!-- Column 3: 子标题 (206:8762) -->
          <div class="list-col">
            <div class="list-card">
              <div class="list-card-label">子标题 (206:8762)</div>

              <div class="list-subtitle-row list-item--border">
                <span class="list-subtitle-title">内容子标题</span>
                <div class="list-subtitle-action">
                  <span class="list-subtitle-action-text">右侧按钮</span>
                  <OIconChevronRight class="list-item-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="list-row-dark">
        <div class="theme-label">Dark</div>

        <div class="list-columns">
          <!-- Dark Column 1: 单行列表 -->
          <div class="list-col">
            <div class="list-card list-card--dark">
              <div class="list-card-label">单行列表 (32:3907)</div>

              <!-- Single -->
              <div class="list-item list-item--border-dark">
                <span class="list-item-text">列表文字列表文字</span>
              </div>

              <!-- Switch dark -->
              <div class="list-item list-item--border-dark">
                <div class="list-item-left">
                  <OIconFilter class="list-item-icon" />
                  <span class="list-item-text">列表文字列表文字</span>
                </div>
                <OSwitch v-model="switchState2" size="small" />
              </div>

              <!-- Btn dark -->
              <div class="list-item list-item--border-dark">
                <div class="list-item-left">
                  <OIconFilter class="list-item-icon" />
                  <span class="list-item-text">列表文字列表文字</span>
                </div>
                <OButton size="small" round="pill" variant="outline">关注</OButton>
              </div>

              <!-- Arrow dark -->
              <div class="list-item list-item--border-dark">
                <div class="list-item-left">
                  <OIconFilter class="list-item-icon" />
                  <span class="list-item-text">列表文字列表文字</span>
                </div>
                <div class="list-item-action">
                  <span class="list-item-action-text">普通按钮</span>
                  <OIconChevronRight class="list-item-arrow" />
                </div>
              </div>

              <!-- Group dark -->
              <div class="list-item list-item--group-dark">
                <span class="list-item-text">列表文字列表文字</span>
                <span class="list-item-group-tag-dark">列表文字列表文字</span>
              </div>
            </div>
          </div>

          <!-- Dark Column 2: 双行列表 -->
          <div class="list-col">
            <div class="list-card list-card--dark">
              <div class="list-card-label">双行列表 (206:8732)</div>

              <!-- 双行 dark item 1 -->
              <div class="list-item list-item--double list-item--border-dark">
                <div class="list-item-avatar">
                  <AppIconUser class="list-item-avatar-icon" />
                </div>
                <div class="list-item-content">
                  <div class="list-item-title">列表文字列表文字</div>
                  <div class="list-item-subtitle">列表文字列表文字</div>
                </div>
                <OButton size="small" round="pill" variant="outline">关注</OButton>
              </div>

              <!-- 双行 dark item 2 -->
              <div class="list-item list-item--double list-item--border-dark">
                <div class="list-item-avatar">
                  <AppIconUser class="list-item-avatar-icon" />
                </div>
                <div class="list-item-content">
                  <div class="list-item-title">列表文字列表文字</div>
                  <div class="list-item-subtitle">列表文字列表文字</div>
                </div>
                <OButton size="small" round="pill" variant="outline">关注</OButton>
              </div>
            </div>
          </div>

          <!-- Dark Column 3: 子标题 -->
          <div class="list-col">
            <div class="list-card list-card--dark">
              <div class="list-card-label">子标题 (206:8762)</div>

              <div class="list-subtitle-row list-item--border-dark">
                <span class="list-subtitle-title">内容子标题</span>
                <div class="list-subtitle-action">
                  <span class="list-subtitle-action-text">右侧按钮</span>
                  <OIconChevronRight class="list-item-arrow" />
                </div>
              </div>
            </div>
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

// ---- 列布局 ----
.list-columns {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.list-col {
  flex: 1;
  min-width: 0;
}

// ---- 卡片 ----
.list-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.list-card--dark {
  background: rgba(255, 255, 255, 0.06);
}

.list-card-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  margin-bottom: var(--o-r-gap-4);
}

// ---- 列表项 ----
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 0;
  gap: var(--o-r-gap-4);
  min-height: 48px;

  &--border {
    border-bottom: 0.5px solid rgba(0, 0, 0, 1);

    &:last-of-type {
      border-bottom: none;
    }
  }

  &--border-dark {
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);

    &:last-of-type {
      border-bottom: none;
    }
  }

  &--double {
    padding: 11px 0;
    min-height: 64px;
    align-items: center;
  }

  &--group {
    padding: 0;
    min-height: 48px;
    background: var(--o-color-fill2);
    border-radius: var(--o-radius-m);
    padding: 10px var(--o-r-gap-4);
    box-shadow: var(--o-shadow-1);
    margin-top: var(--o-r-gap-3);
  }

  &--group-dark {
    padding: 10px var(--o-r-gap-4);
    min-height: 48px;
    background: rgba(33, 35, 39, 1);
    border-radius: var(--o-radius-m);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--o-r-gap-3);
    gap: var(--o-r-gap-4);
  }
}

.list-item-left {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-2);
  flex: 1;
  min-width: 0;
}

.list-item-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--o-color-info2);
}

.list-item-text {
  @include text1;
  color: var(--o-color-info1);
  flex: 1;
  min-width: 0;
}

.list-item-action {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.list-item-action-text {
  @include text1;
  color: var(--o-color-info2);
}

.list-item-arrow {
  width: 16px;
  height: 16px;
  color: var(--o-color-info3);
}

// Group 标签 (Dark card in light theme)
.list-item-group-tag {
  @include text1;
  background: #212327;
  color: #fff;
  border-radius: var(--o-radius-m);
  padding: 3px var(--o-r-gap-4);
}

.list-item-group-tag-dark {
  @include text1;
  background: rgba(255, 255, 255, 0.15);
  color: var(--o-color-info1);
  border-radius: var(--o-radius-m);
  padding: 3px var(--o-r-gap-4);
}

// ---- 双行列表 ----
.list-item-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--o-color-fill3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.list-item-avatar-icon {
  width: 24px;
  height: 24px;
  color: var(--o-color-info3);
}

.list-item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.list-item-title {
  @include text1;
  color: var(--o-color-info1);
}

.list-item-subtitle {
  @include tip1;
  color: var(--o-color-info2);
}

// ---- 子标题行 ----
.list-subtitle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0;
  min-height: 30px;
  gap: var(--o-r-gap-4);
}

.list-subtitle-title {
  @include h3;
  font-weight: 500;
  color: var(--o-color-info1);
  flex: 1;
  min-width: 0;
}

.list-subtitle-action {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.list-subtitle-action-text {
  @include text1;
  color: var(--o-color-info2);
}
</style>
