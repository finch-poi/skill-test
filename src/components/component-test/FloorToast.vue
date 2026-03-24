<script setup lang="ts">
// 设计稿 ID：31:3052（Pixso item-id，即时反馈）
import { h } from 'vue'
import { OToast, OButton, OLink, OIconChevronRight, useToast } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

const toast = useToast()

// --- Light theme toasts ---
function showLightSimple() {
  toast.show({ content: 'toast提示', duration: 2000, position: 'bottom' })
}

function showLightWithBtn() {
  toast.show({
    duration: 3000,
    position: 'bottom',
    content: () => [
      h('span', { style: { marginRight: '6px' } }, 'toast提示'),
      h(OLink, { color: 'normal', style: { '--o-color-link1': 'var(--o-color-info1-inverse)' } }, {
        default: () => '文字按钮',
        suffix: () => h(OIconChevronRight),
      }),
    ],
  })
}

// --- Dark (light-bg) theme toasts ---
// OToast has dark bg by default; for "Dark=on" in DSL it shows light bg (rgb 231,234,238)
// We override --toast-bg-color and --toast-color to simulate the dark-mode variant display
function showDarkSimple() {
  toast.show({
    content: 'toast提示',
    duration: 2000,
    position: 'bottom',
  })
}

function showDarkWithBtn() {
  toast.show({
    duration: 3000,
    position: 'bottom',
    content: () => [
      h('span', { style: { marginRight: '6px' } }, 'toast提示'),
      h(OLink, { color: 'normal', style: { '--o-color-link1': 'var(--o-color-info1-inverse)' } }, {
        default: () => '文字按钮',
        suffix: () => h(OIconChevronRight),
      }),
    ],
  })
}
</script>

<template>
  <AppSection
    title="OToast 即时反馈"
    subtitle="设计稿 ID：31:3052 · 覆盖 无btn/有btn × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="toast-row-light">
        <div class="theme-label">Light</div>
        <div class="preview-row">
          <!-- Static preview: 无btn (Dark=off) -->
          <div class="preview-item">
            <div class="preview-label">无 btn</div>
            <OToast
              class="toast-preview toast-preview--dark"
              message="toast提示"
            />
          </div>
          <!-- Static preview: 有btn (Dark=off) -->
          <div class="preview-item preview-item--wide">
            <div class="preview-label">有 btn</div>
            <OToast class="toast-preview toast-preview--dark toast-preview--wide">
              <span class="toast-text">toast提示</span>
              <OLink
                color="normal"
                style="--o-color-link1: var(--o-color-info1-inverse)"
              >
                文字按钮
                <template #suffix><OIconChevronRight /></template>
              </OLink>
            </OToast>
          </div>
        </div>
        <div class="trigger-row">
          <OButton
            size="small"
            data-testid="btn-light-simple"
            @click="showLightSimple"
          >触发简单 Toast</OButton>
          <OButton
            size="small"
            data-testid="btn-light-with-btn"
            @click="showLightWithBtn"
          >触发带按钮 Toast</OButton>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="toast-row-dark">
        <div class="theme-label">Dark</div>
        <div class="preview-row">
          <!-- Static preview: 无btn (Dark=on — light bg) -->
          <div class="preview-item">
            <div class="preview-label">无 btn</div>
            <OToast
              class="toast-preview toast-preview--light"
              message="toast提示"
            />
          </div>
          <!-- Static preview: 有btn (Dark=on — light bg) -->
          <div class="preview-item preview-item--wide">
            <div class="preview-label">有 btn</div>
            <OToast class="toast-preview toast-preview--light toast-preview--wide">
              <span class="toast-text">toast提示</span>
              <OLink color="normal">
                文字按钮
                <template #suffix><OIconChevronRight /></template>
              </OLink>
            </OToast>
          </div>
        </div>
        <div class="trigger-row">
          <OButton
            size="small"
            data-testid="btn-dark-simple"
            @click="showDarkSimple"
          >触发简单 Toast</OButton>
          <OButton
            size="small"
            data-testid="btn-dark-with-btn"
            @click="showDarkWithBtn"
          >触发带按钮 Toast</OButton>
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

// ---- 预览行 ----
.preview-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-5);
  align-items: flex-start;
}

.preview-item {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.preview-item--wide {
  flex: 1;
  min-width: 240px;
}

.preview-label {
  @include tip1;
  color: var(--o-color-info3);
}

// ---- Static toast previews ----
// Match DSL: Dark=off (light theme uses dark bg toast rgb(55,59,66))
.toast-preview--dark {
  --toast-bg-color: rgb(55, 59, 66);
  --toast-color: rgba(255, 255, 255, 1);
}

// Dark=on (dark theme uses light bg toast rgb(231,234,238))
.toast-preview--light {
  --toast-bg-color: rgb(231, 234, 238);
  --toast-color: rgba(0, 0, 0, 1);
}

.toast-preview--wide {
  display: flex;
  width: 100%;
}

.toast-text {
  margin-right: var(--o-r-gap-3);
}

// ---- 触发按钮行 ----
.trigger-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-4);
}
</style>
