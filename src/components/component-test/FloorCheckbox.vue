<script setup lang="ts">
// 设计稿 ID：15:2161（Pixso item-id，复选框）
import { ref, computed } from 'vue'
import { OCheckbox, OCheckboxGroup } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// 单独状态展示用（非受控 + 受控）
// Unchecked enabled: value not in array
// Checked enabled: value in array
// Indeterminate enabled: indeterminate=true
// Unchecked disabled, Checked disabled, Indeterminate disabled

const checkedSingle = ref(['checked', 'checked-disabled', 'group-checked-1', 'group-checked-2'])

// Group demo
const groupSelected = ref(['opt1', 'opt3'])

// All-select demo
const allOptions = ['a1', 'a2', 'a3']
const allSelected = ref(['a1'])
const allState = computed(() => {
  const count = allOptions.filter(v => allSelected.value.includes(v)).length
  return {
    all: count === allOptions.length,
    indeterminate: count > 0 && count < allOptions.length,
  }
})
const handleChangeAll = () => {
  allSelected.value = allState.value.all ? [] : [...allOptions]
}
</script>

<template>
  <AppSection
    title="OCheckbox 多选框"
    subtitle="设计稿 ID：15:2161 · 覆盖 Unselected/Selected/Mix/Group × Enabled/Disabled × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="checkbox-row-light">
        <div class="theme-label">Light</div>
        <div class="cb-row">

          <!-- Column A：单个状态展示 -->
          <div class="cb-col">
            <div class="cb-card">
              <div class="cb-card-label">单个状态 · Enabled</div>
              <div class="cb-list">
                <!-- Unselected -->
                <OCheckbox
                  :model-value="[]"
                  value="unchecked"
                  data-testid="cb-unchecked"
                >未选中</OCheckbox>

                <!-- Checked -->
                <OCheckbox
                  :model-value="['checked']"
                  value="checked"
                  data-testid="cb-checked"
                >已选中</OCheckbox>

                <!-- Indeterminate -->
                <OCheckbox
                  :model-value="[]"
                  value="indeterminate"
                  :indeterminate="true"
                  data-testid="cb-indeterminate"
                >半选中</OCheckbox>
              </div>
            </div>

            <div class="cb-card">
              <div class="cb-card-label">单个状态 · Disabled</div>
              <div class="cb-list">
                <!-- Unselected Disabled -->
                <OCheckbox
                  :model-value="[]"
                  value="unchecked-disabled"
                  disabled
                  data-testid="cb-unchecked-disabled"
                >未选中禁用</OCheckbox>

                <!-- Checked Disabled -->
                <OCheckbox
                  :model-value="['checked-disabled']"
                  value="checked-disabled"
                  disabled
                  data-testid="cb-checked-disabled"
                >已选中禁用</OCheckbox>

                <!-- Indeterminate Disabled -->
                <OCheckbox
                  :model-value="[]"
                  value="indeterminate-disabled"
                  :indeterminate="true"
                  disabled
                  data-testid="cb-indeterminate-disabled"
                >半选中禁用</OCheckbox>
              </div>
            </div>
          </div>

          <!-- Column B：带标签文字展示 -->
          <div class="cb-col">
            <div class="cb-card">
              <div class="cb-card-label">带文字 · Enabled</div>
              <div class="cb-list">
                <OCheckbox
                  :model-value="[]"
                  value="label-unchecked"
                  data-testid="cb-label-unchecked"
                >选项</OCheckbox>
                <OCheckbox
                  :model-value="['label-checked']"
                  value="label-checked"
                  data-testid="cb-label-checked"
                >选项</OCheckbox>
              </div>
            </div>

            <div class="cb-card">
              <div class="cb-card-label">带文字 · Disabled</div>
              <div class="cb-list">
                <OCheckbox
                  :model-value="[]"
                  value="label-unchecked-d"
                  disabled
                  data-testid="cb-label-unchecked-disabled"
                >选项</OCheckbox>
              </div>
            </div>
          </div>

          <!-- Column C：多选框组 -->
          <div class="cb-col">
            <div class="cb-card">
              <div class="cb-card-label">多选框组 · 水平 (h)</div>
              <OCheckboxGroup
                v-model="groupSelected"
                direction="h"
                data-testid="cb-group-h"
              >
                <OCheckbox value="opt1">选项1</OCheckbox>
                <OCheckbox value="opt2">选项2</OCheckbox>
                <OCheckbox value="opt3">选项3</OCheckbox>
              </OCheckboxGroup>
            </div>

            <div class="cb-card">
              <div class="cb-card-label">多选框组 · 垂直 (v)</div>
              <OCheckboxGroup
                v-model="groupSelected"
                direction="v"
                data-testid="cb-group-v"
              >
                <OCheckbox value="opt1">选项1</OCheckbox>
                <OCheckbox value="opt2">选项2</OCheckbox>
                <OCheckbox value="opt3">选项3</OCheckbox>
              </OCheckboxGroup>
            </div>

            <div class="cb-card">
              <div class="cb-card-label">全选 + 半选场景</div>
              <div class="cb-list">
                <OCheckbox
                  :model-value="allState.all ? ['all'] : []"
                  value="all"
                  :indeterminate="allState.indeterminate"
                  data-testid="cb-select-all"
                  @change="handleChangeAll"
                >全选</OCheckbox>
                <OCheckboxGroup v-model="allSelected" direction="v" data-testid="cb-select-all-group">
                  <OCheckbox value="a1">子项 1</OCheckbox>
                  <OCheckbox value="a2">子项 2</OCheckbox>
                  <OCheckbox value="a3">子项 3</OCheckbox>
                </OCheckboxGroup>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="checkbox-row-dark">
        <div class="theme-label">Dark</div>
        <div class="cb-row">

          <!-- Dark Column A：单个状态展示 -->
          <div class="cb-col">
            <div class="cb-card">
              <div class="cb-card-label">单个状态 · Enabled</div>
              <div class="cb-list">
                <OCheckbox
                  :model-value="[]"
                  value="d-unchecked"
                  data-testid="cb-dark-unchecked"
                >未选中</OCheckbox>

                <OCheckbox
                  :model-value="['d-checked']"
                  value="d-checked"
                  data-testid="cb-dark-checked"
                >已选中</OCheckbox>

                <OCheckbox
                  :model-value="[]"
                  value="d-indeterminate"
                  :indeterminate="true"
                  data-testid="cb-dark-indeterminate"
                >半选中</OCheckbox>
              </div>
            </div>

            <div class="cb-card">
              <div class="cb-card-label">单个状态 · Disabled</div>
              <div class="cb-list">
                <OCheckbox
                  :model-value="[]"
                  value="d-unchecked-disabled"
                  disabled
                  data-testid="cb-dark-unchecked-disabled"
                >未选中禁用</OCheckbox>

                <OCheckbox
                  :model-value="['d-checked-disabled']"
                  value="d-checked-disabled"
                  disabled
                  data-testid="cb-dark-checked-disabled"
                >已选中禁用</OCheckbox>

                <OCheckbox
                  :model-value="[]"
                  value="d-indeterminate-disabled"
                  :indeterminate="true"
                  disabled
                  data-testid="cb-dark-indeterminate-disabled"
                >半选中禁用</OCheckbox>
              </div>
            </div>
          </div>

          <!-- Dark Column B：带标签文字 -->
          <div class="cb-col">
            <div class="cb-card">
              <div class="cb-card-label">带文字 · Enabled</div>
              <div class="cb-list">
                <OCheckbox
                  :model-value="[]"
                  value="d-label-unchecked"
                  data-testid="cb-dark-label-unchecked"
                >选项</OCheckbox>
                <OCheckbox
                  :model-value="['d-label-checked']"
                  value="d-label-checked"
                  data-testid="cb-dark-label-checked"
                >选项</OCheckbox>
              </div>
            </div>

            <div class="cb-card">
              <div class="cb-card-label">带文字 · Disabled</div>
              <div class="cb-list">
                <OCheckbox
                  :model-value="[]"
                  value="d-label-unchecked-d"
                  disabled
                  data-testid="cb-dark-label-unchecked-disabled"
                >选项</OCheckbox>
              </div>
            </div>
          </div>

          <!-- Dark Column C：多选框组 -->
          <div class="cb-col">
            <div class="cb-card">
              <div class="cb-card-label">多选框组 · 水平 (h)</div>
              <OCheckboxGroup
                v-model="groupSelected"
                direction="h"
                data-testid="cb-dark-group-h"
              >
                <OCheckbox value="opt1">选项1</OCheckbox>
                <OCheckbox value="opt2">选项2</OCheckbox>
                <OCheckbox value="opt3">选项3</OCheckbox>
              </OCheckboxGroup>
            </div>

            <div class="cb-card">
              <div class="cb-card-label">多选框组 · 垂直 (v)</div>
              <OCheckboxGroup
                v-model="groupSelected"
                direction="v"
                data-testid="cb-dark-group-v"
              >
                <OCheckbox value="opt1">选项1</OCheckbox>
                <OCheckbox value="opt2">选项2</OCheckbox>
                <OCheckbox value="opt3">选项3</OCheckbox>
              </OCheckboxGroup>
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
.cb-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.cb-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

// ---- Demo 卡片 ----
.cb-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.cb-card-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 垂直排列复选框列表 ----
.cb-list {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}
</style>
