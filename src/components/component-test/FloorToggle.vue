<script setup lang="ts">
// 设计稿 ID：15:2382（Pixso item-id，选择块）
import { ref } from 'vue'
import { OToggle, OCheckboxGroup, OCheckbox, OIconFilter } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- PC Group Light/Dark: 多选组（筛选父类型 / 子类型） ----
const pcParentSelected = ref<string[]>(['单选选中'])
const pcChildSelected = ref<string[]>(['单选选中'])

// ---- PC Group Dark ----
const pcParentSelectedDark = ref<string[]>(['单选选中'])
const pcChildSelectedDark = ref<string[]>(['单选选中'])

// ---- Mobile Group Light/Dark ----
const mbParentSelected = ref<string[]>(['筛选条件2'])
const mbChildSelected = ref<string[]>(['筛选条件3'])

const mbParentSelectedDark = ref<string[]>(['筛选条件2'])
const mbChildSelectedDark = ref<string[]>(['筛选条件3'])

// PC filter items
const pcParentItems = ['筛选条件', '单选选中', '筛选条件', '筛选条件', '筛选条件', '筛选条件', '筛选条件', '筛选条件', '筛选条件', '筛选条件']
const pcChildItems = ['筛选条件', '单选选中', '筛选条件', '筛选条件', '筛选条件', '筛选条件']

// Mobile filter items
const mbParentItems = ['筛选', '筛选条件2', '筛选条件条件', '筛选']
const mbChildItems = ['筛选', '筛选条件', '筛选选中中', '筛选', '筛选']
</script>

<template>
  <AppSection
    title="OToggle 选择块"
    subtitle="设计稿 ID：15:2382 · PC/Mobile × Enabled/Actived/Group × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="toggle-row-light">
        <div class="theme-label">Light</div>

        <!-- PC 单体状态 -->
        <div class="section-title">PC · 单体状态</div>
        <div class="toggle-inline-row" data-testid="toggle-pc-states-light">
          <!-- Enabled (unselected): gray fill background -->
          <OToggle :checked="false" round="pill" data-testid="toggle-pc-enabled-light">
            <template #icon><OIconFilter /></template>
            筛选条件
          </OToggle>
          <!-- Actived (selected): border style -->
          <OToggle :checked="true" round="pill" data-testid="toggle-pc-actived-light">
            <template #icon><OIconFilter /></template>
            筛选条件
          </OToggle>
          <!-- Disabled unselected -->
          <OToggle :checked="false" round="pill" disabled data-testid="toggle-pc-disabled-light">
            <template #icon><OIconFilter /></template>
            筛选条件
          </OToggle>
        </div>

        <!-- PC Group: 筛选父类型 -->
        <div class="section-title">PC · 筛选父类型（多选组）</div>
        <div class="toggle-group-row" data-testid="toggle-pc-group-light">
          <span class="row-label">筛选父类型</span>
          <OCheckboxGroup v-model="pcParentSelected" class="toggle-group">
            <OCheckbox
              v-for="item in pcParentItems"
              :key="item + '-pc-parent'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>

        <!-- PC Group: 筛选子类型 -->
        <div class="toggle-group-row" data-testid="toggle-pc-child-group-light">
          <span class="row-label">筛选子类型</span>
          <OCheckboxGroup v-model="pcChildSelected" class="toggle-group">
            <OCheckbox
              v-for="item in pcChildItems"
              :key="item + '-pc-child'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>

        <!-- Mobile 单体状态 -->
        <div class="section-title">Mobile · 单体状态</div>
        <div class="toggle-inline-row" data-testid="toggle-mb-states-light">
          <OToggle :checked="false" round="pill" class="toggle-mb" data-testid="toggle-mb-enabled-light">
            <template #icon><OIconFilter /></template>
            筛选
          </OToggle>
          <OToggle :checked="true" round="pill" class="toggle-mb" data-testid="toggle-mb-actived-light">
            <template #icon><OIconFilter /></template>
            筛选
          </OToggle>
          <OToggle :checked="false" round="pill" class="toggle-mb" disabled data-testid="toggle-mb-disabled-light">
            <template #icon><OIconFilter /></template>
            筛选
          </OToggle>
        </div>

        <!-- Mobile Group: 父级分类 -->
        <div class="section-title">Mobile · 父级分类（多选组）</div>
        <div class="toggle-group-row" data-testid="toggle-mb-group-light">
          <span class="row-label">父级分类</span>
          <OCheckboxGroup v-model="mbParentSelected" class="toggle-group">
            <OCheckbox
              v-for="item in mbParentItems"
              :key="item + '-mb-parent'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill" class="toggle-mb">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>

        <!-- Mobile Group: 子级分类 -->
        <div class="toggle-group-row" data-testid="toggle-mb-child-group-light">
          <span class="row-label">子级分类</span>
          <OCheckboxGroup v-model="mbChildSelected" class="toggle-group">
            <OCheckbox
              v-for="item in mbChildItems"
              :key="item + '-mb-child'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill" class="toggle-mb">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="toggle-row-dark">
        <div class="theme-label">Dark</div>

        <!-- PC 单体状态 -->
        <div class="section-title">PC · 单体状态</div>
        <div class="toggle-inline-row" data-testid="toggle-pc-states-dark">
          <OToggle :checked="false" round="pill" data-testid="toggle-pc-enabled-dark">
            <template #icon><OIconFilter /></template>
            筛选条件
          </OToggle>
          <OToggle :checked="true" round="pill" data-testid="toggle-pc-actived-dark">
            <template #icon><OIconFilter /></template>
            筛选条件
          </OToggle>
          <OToggle :checked="false" round="pill" disabled data-testid="toggle-pc-disabled-dark">
            <template #icon><OIconFilter /></template>
            筛选条件
          </OToggle>
        </div>

        <!-- PC Group Dark -->
        <div class="section-title">PC · 筛选父类型（多选组）</div>
        <div class="toggle-group-row" data-testid="toggle-pc-group-dark">
          <span class="row-label">筛选父类型</span>
          <OCheckboxGroup v-model="pcParentSelectedDark" class="toggle-group">
            <OCheckbox
              v-for="item in pcParentItems"
              :key="item + '-pc-parent-dark'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>

        <div class="toggle-group-row" data-testid="toggle-pc-child-group-dark">
          <span class="row-label">筛选子类型</span>
          <OCheckboxGroup v-model="pcChildSelectedDark" class="toggle-group">
            <OCheckbox
              v-for="item in pcChildItems"
              :key="item + '-pc-child-dark'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>

        <!-- Mobile 单体状态 Dark -->
        <div class="section-title">Mobile · 单体状态</div>
        <div class="toggle-inline-row" data-testid="toggle-mb-states-dark">
          <OToggle :checked="false" round="pill" class="toggle-mb" data-testid="toggle-mb-enabled-dark">
            <template #icon><OIconFilter /></template>
            筛选
          </OToggle>
          <OToggle :checked="true" round="pill" class="toggle-mb" data-testid="toggle-mb-actived-dark">
            <template #icon><OIconFilter /></template>
            筛选
          </OToggle>
          <OToggle :checked="false" round="pill" class="toggle-mb" disabled data-testid="toggle-mb-disabled-dark">
            <template #icon><OIconFilter /></template>
            筛选
          </OToggle>
        </div>

        <!-- Mobile Group Dark -->
        <div class="toggle-group-row" data-testid="toggle-mb-group-dark">
          <span class="row-label">父级分类</span>
          <OCheckboxGroup v-model="mbParentSelectedDark" class="toggle-group">
            <OCheckbox
              v-for="item in mbParentItems"
              :key="item + '-mb-parent-dark'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill" class="toggle-mb">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
        </div>

        <div class="toggle-group-row" data-testid="toggle-mb-child-group-dark">
          <span class="row-label">子级分类</span>
          <OCheckboxGroup v-model="mbChildSelectedDark" class="toggle-group">
            <OCheckbox
              v-for="item in mbChildItems"
              :key="item + '-mb-child-dark'"
              :value="item"
            >
              <template #checkbox="{ checked }">
                <OToggle :checked="checked" round="pill" class="toggle-mb">{{ item }}</OToggle>
              </template>
            </OCheckbox>
          </OCheckboxGroup>
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
  background-color: var(--o-color-fill2);
}

// ---- 主题区块 ----
.theme-section {
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
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

.section-title {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  margin-top: var(--o-r-gap-3);
}

// ---- 单体状态行 ----
.toggle-inline-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-3);
  align-items: center;
}

// ---- Group 行（带标签） ----
.toggle-group-row {
  display: flex;
  align-items: flex-start;
  gap: var(--o-r-gap-4);
}

.row-label {
  @include text1;
  color: var(--o-color-info1);
  white-space: nowrap;
  flex-shrink: 0;
  padding-top: 6px;
  min-width: 80px;
}

// ---- Toggle 分组（横向换行） ----
.toggle-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-3);

  // 隐藏 OCheckbox 原始 checkbox 样式，只显示 OToggle
  :deep(.o-checkbox-input-wrap) {
    display: none;
  }

  :deep(.o-checkbox-label) {
    padding: 0;
  }

  :deep(.o-checkbox) {
    display: inline-flex;
  }
}

// ---- Mobile 尺寸 toggle（--toggle-size 覆盖至 28px） ----
.toggle-mb {
  --toggle-size: 28px;
}
</style>
