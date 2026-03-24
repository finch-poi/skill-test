<script setup lang="ts">
// 设计稿 ID：11:2166（Pixso item-id，单选框）
import { ref } from 'vue'
import { ORadio, ORadioGroup } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// Light theme state
const lightSingle = ref('enabled')
const lightGroup = ref('option1')
const lightGroupDisabled = ref('option1')

// Dark theme state
const darkSingle = ref('enabled')
const darkGroup = ref('option1')
const darkGroupDisabled = ref('option1')
</script>

<template>
  <AppSection
    title="ORadio 单选框"
    subtitle="设计稿 ID：11:2166 · 覆盖 Enabled/Disabled × 未选中/选中 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="radio-row-light">
        <div class="theme-label">Light</div>
        <div class="radio-row">

          <!-- 独立单选框状态 -->
          <div class="radio-col">
            <div class="radio-card">
              <div class="radio-label">单个 · Enabled 状态</div>
              <div class="radio-states-row">
                <ORadio v-model="lightSingle" value="enabled" data-testid="radio-light-enabled">
                  选项
                </ORadio>
                <ORadio v-model="lightSingle" value="disabled" disabled data-testid="radio-light-disabled">
                  选项
                </ORadio>
              </div>
            </div>

            <div class="radio-card">
              <div class="radio-label">单个 · Selected + Disabled 状态</div>
              <div class="radio-states-row">
                <!-- Selected Enabled (checked, not disabled) -->
                <ORadio :model-value="'selected'" value="selected" data-testid="radio-light-selected-enabled">
                  选项
                </ORadio>
                <!-- Selected Disabled -->
                <ORadio :model-value="'selected'" value="selected" disabled data-testid="radio-light-selected-disabled">
                  选项
                </ORadio>
              </div>
            </div>
          </div>

          <!-- 单选框组 -->
          <div class="radio-col">
            <div class="radio-card">
              <div class="radio-label">ORadioGroup · 水平排列</div>
              <ORadioGroup v-model="lightGroup" data-testid="radio-light-group-h">
                <ORadio value="option1">选项</ORadio>
                <ORadio value="option2">选项</ORadio>
                <ORadio value="option3">选项</ORadio>
              </ORadioGroup>
            </div>

            <div class="radio-card">
              <div class="radio-label">ORadioGroup · 垂直排列</div>
              <ORadioGroup v-model="lightGroup" direction="v" data-testid="radio-light-group-v">
                <ORadio value="option1">选项</ORadio>
                <ORadio value="option2">选项</ORadio>
                <ORadio value="option3">选项</ORadio>
              </ORadioGroup>
            </div>

            <div class="radio-card">
              <div class="radio-label">ORadioGroup · 整组禁用</div>
              <ORadioGroup v-model="lightGroupDisabled" disabled data-testid="radio-light-group-disabled">
                <ORadio value="option1">选项</ORadio>
                <ORadio value="option2">选项</ORadio>
              </ORadioGroup>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="radio-row-dark">
        <div class="theme-label">Dark</div>
        <div class="radio-row">

          <!-- 独立单选框状态 (Dark) -->
          <div class="radio-col">
            <div class="radio-card">
              <div class="radio-label">单个 · Enabled 状态</div>
              <div class="radio-states-row">
                <ORadio v-model="darkSingle" value="enabled" data-testid="radio-dark-enabled">
                  选项
                </ORadio>
                <ORadio v-model="darkSingle" value="disabled" disabled data-testid="radio-dark-disabled">
                  选项
                </ORadio>
              </div>
            </div>

            <div class="radio-card">
              <div class="radio-label">单个 · Selected + Disabled 状态</div>
              <div class="radio-states-row">
                <!-- Selected Enabled -->
                <ORadio :model-value="'selected'" value="selected" data-testid="radio-dark-selected-enabled">
                  选项
                </ORadio>
                <!-- Selected Disabled -->
                <ORadio :model-value="'selected'" value="selected" disabled data-testid="radio-dark-selected-disabled">
                  选项
                </ORadio>
              </div>
            </div>
          </div>

          <!-- 单选框组 (Dark) -->
          <div class="radio-col">
            <div class="radio-card">
              <div class="radio-label">ORadioGroup · 水平排列</div>
              <ORadioGroup v-model="darkGroup" data-testid="radio-dark-group-h">
                <ORadio value="option1">选项</ORadio>
                <ORadio value="option2">选项</ORadio>
                <ORadio value="option3">选项</ORadio>
              </ORadioGroup>
            </div>

            <div class="radio-card">
              <div class="radio-label">ORadioGroup · 垂直排列</div>
              <ORadioGroup v-model="darkGroup" direction="v" data-testid="radio-dark-group-v">
                <ORadio value="option1">选项</ORadio>
                <ORadio value="option2">选项</ORadio>
                <ORadio value="option3">选项</ORadio>
              </ORadioGroup>
            </div>

            <div class="radio-card">
              <div class="radio-label">ORadioGroup · 整组禁用</div>
              <ORadioGroup v-model="darkGroupDisabled" disabled data-testid="radio-dark-group-disabled">
                <ORadio value="option1">选项</ORadio>
                <ORadio value="option2">选项</ORadio>
              </ORadioGroup>
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
.radio-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.radio-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

// ---- Demo 卡片 ----
.radio-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

// ---- 标签 ----
.radio-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 横向状态行 ----
.radio-states-row {
  display: flex;
  gap: var(--o-r-gap-5);
  flex-wrap: wrap;
  align-items: center;
}
</style>
