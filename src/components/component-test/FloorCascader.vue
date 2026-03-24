<script setup lang="ts">
// 设计稿 ID：30:5373（Pixso item-id，级联选择器）
import { ref } from 'vue'
import { OCascader, OCascaderPanel } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

type CascaderOptionT = {
  value: string | number
  label?: string
  children?: CascaderOptionT[]
}

// 三级选项数据（对应设计图：选项一 > 二级选项 > 三级选项×多项）
const options: CascaderOptionT[] = [
  {
    label: '选项一',
    value: '1',
    children: [
      {
        label: '二级选项',
        value: '1-1',
        children: [
          { label: '单级选项文本最大宽度', value: '1-1-0' },
          { label: '三级选项', value: '1-1-1' },
          { label: '三级选项', value: '1-1-2' },
          { label: '三级选项', value: '1-1-3' },
          { label: '三级选项', value: '1-1-4' },
          { label: '三级选项', value: '1-1-5' },
          { label: '三级选项', value: '1-1-6' },
          { label: '三级选项', value: '1-1-7' },
        ],
      },
      {
        label: '二级选项',
        value: '1-2',
        children: [
          { label: '三级选项', value: '1-2-1' },
          { label: '三级选项', value: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '选项一',
    value: '2',
    children: [
      {
        label: '选项一',
        value: '2-1',
        children: [
          { label: '三级选项', value: '2-1-1' },
        ],
      },
    ],
  },
  {
    label: '选项一',
    value: '3',
    children: [
      { label: '三级选项', value: '3-1' },
    ],
  },
]

// 选中状态：选项一选中（对应设计图中高亮的"选项一选中"）
const selectedLight = ref('1-1-1')
const selectedDark = ref('1-1-1')

// 面板展示用（静态展示展开状态）
const panelLight = ref('1-1-1')
const panelDark = ref('1-1-1')
</script>

<template>
  <AppSection
    title="OCascader 级联选择器"
    subtitle="设计稿 ID：30:5373 · 覆盖 PC/Menu × Enabled/Actived × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="cascader-row-light">
        <div class="theme-label">Light</div>
        <div class="cascader-row">

          <!-- Column A：触发器形态（PC Enabled / Actived） -->
          <div class="cascader-col">
            <div class="cascader-card">
              <div class="cascader-label">触发器 · Enabled（有占位符）</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                data-testid="cascader-trigger-enabled"
              />
            </div>

            <div class="cascader-card">
              <div class="cascader-label">触发器 · Actived（有选中值）</div>
              <OCascader
                v-model="selectedLight"
                :options="options"
                data-testid="cascader-trigger-actived"
              />
            </div>
          </div>

          <!-- Column B：不同尺寸变体 -->
          <div class="cascader-col">
            <div class="cascader-card">
              <div class="cascader-label">Large 尺寸（默认）</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                size="large"
                data-testid="cascader-large"
              />
            </div>

            <div class="cascader-card">
              <div class="cascader-label">Medium 尺寸</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                size="medium"
                data-testid="cascader-medium"
              />
            </div>

            <div class="cascader-card">
              <div class="cascader-label">Small 尺寸</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                size="small"
                data-testid="cascader-small"
              />
            </div>
          </div>

          <!-- Column C：面板展示（Menu 形态） -->
          <div class="cascader-col">
            <div class="cascader-card">
              <div class="cascader-label">OCascaderPanel（展开状态）</div>
              <OCascaderPanel
                v-model="panelLight"
                :options="options"
                data-testid="cascader-panel-light"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="cascader-row-dark"
      >
        <div class="theme-label">Dark</div>
        <div class="cascader-row">

          <!-- Dark Column A：触发器 -->
          <div class="cascader-col">
            <div class="cascader-card">
              <div class="cascader-label">触发器 · Enabled（有占位符）</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                data-testid="cascader-trigger-enabled-dark"
              />
            </div>

            <div class="cascader-card">
              <div class="cascader-label">触发器 · Actived（有选中值）</div>
              <OCascader
                v-model="selectedDark"
                :options="options"
                data-testid="cascader-trigger-actived-dark"
              />
            </div>
          </div>

          <!-- Dark Column B：尺寸变体 -->
          <div class="cascader-col">
            <div class="cascader-card">
              <div class="cascader-label">Large 尺寸（默认）</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                size="large"
                data-testid="cascader-large-dark"
              />
            </div>

            <div class="cascader-card">
              <div class="cascader-label">Medium 尺寸</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                size="medium"
                data-testid="cascader-medium-dark"
              />
            </div>

            <div class="cascader-card">
              <div class="cascader-label">Small 尺寸</div>
              <OCascader
                placeholder="Hint"
                :options="options"
                size="small"
                data-testid="cascader-small-dark"
              />
            </div>
          </div>

          <!-- Dark Column C：面板展示 -->
          <div class="cascader-col">
            <div class="cascader-card">
              <div class="cascader-label">OCascaderPanel（展开状态）</div>
              <OCascaderPanel
                v-model="panelDark"
                :options="options"
                data-testid="cascader-panel-dark"
              />
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
.cascader-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.cascader-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

// ---- Demo 卡片 ----
.cascader-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

// ---- 标签 ----
.cascader-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}
</style>
