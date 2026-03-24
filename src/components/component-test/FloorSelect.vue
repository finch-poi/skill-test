<script setup lang="ts">
// 设计稿 ID：4136:1, 17:4376（Pixso item-id，下拉选择器）
import { ref } from 'vue'
import { OSelect, OOption, OOptionGroup } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- 单选状态 ----
const singleValue = ref('')
const singleValueSelected = ref('1')

// ---- 多选状态 ----
const multipleValues = ref<string[]>([])
const multipleValuesSelected = ref<string[]>(['1', '2'])

// ---- 搜索/可清空 ----
const clearableValue = ref('1')
const clearableEmpty = ref('')

// ---- 禁用 ----
const disabledValue = ref('1')

// ---- 分组 ----
const groupValue = ref('')

// ---- 尺寸 ----
const largeValue = ref('')
const mediumValue = ref('')
const smallValue = ref('')

// ---- variant ----
const solidValue = ref('')
const textValue = ref('')

// ---- pill 圆角 ----
const pillSingleValue = ref('')
const pillSingleActived = ref('2')
const pillMultipleValues = ref<string[]>([])
const pillMultipleActived = ref<string[]>(['1', '3'])
</script>

<template>
  <AppSection
    title="OSelect 下拉选择器"
    subtitle="设计稿 ID：4136:1, 17:4376 · 覆盖单选/多选/禁用/尺寸/变体 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="select-row-light">
        <div class="theme-label">Light</div>
        <div class="select-grid">

          <!-- Col 1: Pill 圆角（设计稿 左列 L/M size + round=pill） -->
          <div class="select-col">
            <div class="select-card">
              <div class="select-label">Large · Pill · 未选中 (Enabled)</div>
              <OSelect
                v-model="pillSingleValue"
                placeholder="Hint"
                size="large"
                round="pill"
                data-testid="select-pill-large-enabled"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Large · Pill · 已选中 (Complete/Actived)</div>
              <OSelect
                v-model="pillSingleActived"
                placeholder="Hint"
                size="large"
                round="pill"
                clearable
                data-testid="select-pill-large-actived"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Medium · Pill · 未选中 (Enabled)</div>
              <OSelect
                v-model="pillMultipleValues"
                placeholder="Hint"
                size="medium"
                round="pill"
                multiple
                data-testid="select-pill-medium-enabled"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Medium · Pill · 已选中 (Complete)</div>
              <OSelect
                v-model="pillMultipleActived"
                placeholder="Hint"
                size="medium"
                round="pill"
                multiple
                clearable
                :max-tag-count="2"
                data-testid="select-pill-medium-actived"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>
          </div>

          <!-- Col 2: Outline（设计稿 中列 standard variant） -->
          <div class="select-col">
            <div class="select-card">
              <div class="select-label">Large · Outline · 未选中 (Enabled)</div>
              <OSelect
                v-model="largeValue"
                placeholder="Hint"
                size="large"
                data-testid="select-outline-large-enabled"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Large · Outline · 已选中 (Complete)</div>
              <OSelect
                v-model="singleValueSelected"
                placeholder="Hint"
                size="large"
                clearable
                data-testid="select-outline-large-actived"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Large · Outline · 展开 (Menu)</div>
              <OSelect
                v-model="singleValue"
                placeholder="Hint"
                size="large"
                data-testid="select-outline-large-menu"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Medium · Outline · 多选</div>
              <OSelect
                v-model="multipleValues"
                placeholder="Hint"
                size="medium"
                multiple
                clearable
                data-testid="select-outline-medium-multiple"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Small · Outline</div>
              <OSelect
                v-model="smallValue"
                placeholder="Hint"
                size="small"
                data-testid="select-outline-small"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
              </OSelect>
            </div>
          </div>

          <!-- Col 3: 多选 + 分组 + 禁用 + Solid -->
          <div class="select-col">
            <div class="select-card">
              <div class="select-label">多选 · 已选（含标签折叠）</div>
              <OSelect
                v-model="multipleValuesSelected"
                placeholder="Hint"
                size="large"
                multiple
                clearable
                :max-tag-count="1"
                data-testid="select-multiple-fold"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">分组选项 (OOptionGroup)</div>
              <OSelect
                v-model="groupValue"
                placeholder="Hint"
                size="large"
                data-testid="select-group"
                class="select-demo"
              >
                <OOptionGroup name="分组一">
                  <OOption label="选项一" value="g1-1" />
                  <OOption label="选项二" value="g1-2" />
                </OOptionGroup>
                <OOptionGroup name="分组二">
                  <OOption label="选项三" value="g2-1" />
                  <OOption label="选项四" value="g2-2" disabled />
                </OOptionGroup>
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">禁用 (Disabled)</div>
              <OSelect
                v-model="disabledValue"
                placeholder="Hint"
                size="large"
                disabled
                data-testid="select-disabled"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Solid 变体</div>
              <OSelect
                v-model="solidValue"
                placeholder="Hint"
                size="large"
                variant="solid"
                data-testid="select-solid"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Text 变体（无边框）</div>
              <OSelect
                v-model="textValue"
                placeholder="Hint"
                variant="text"
                size="large"
                data-testid="select-text"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
              </OSelect>
            </div>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="select-row-dark"
      >
        <div class="theme-label">Dark</div>
        <div class="select-grid">

          <!-- Dark Col 1: Pill -->
          <div class="select-col">
            <div class="select-card">
              <div class="select-label">Large · Pill · 未选中</div>
              <OSelect
                placeholder="Hint"
                size="large"
                round="pill"
                data-testid="select-pill-large-enabled-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Large · Pill · 已选中</div>
              <OSelect
                default-value="2"
                placeholder="Hint"
                size="large"
                round="pill"
                clearable
                data-testid="select-pill-large-actived-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Medium · Pill · 多选 未选中</div>
              <OSelect
                placeholder="Hint"
                size="medium"
                round="pill"
                multiple
                data-testid="select-pill-medium-enabled-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Medium · Pill · 多选 已选</div>
              <OSelect
                :default-value="['1', '3']"
                placeholder="Hint"
                size="medium"
                round="pill"
                multiple
                clearable
                :max-tag-count="2"
                data-testid="select-pill-medium-actived-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>
          </div>

          <!-- Dark Col 2: Outline -->
          <div class="select-col">
            <div class="select-card">
              <div class="select-label">Large · Outline · 未选中</div>
              <OSelect
                placeholder="Hint"
                size="large"
                data-testid="select-outline-large-enabled-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Large · Outline · 已选中</div>
              <OSelect
                default-value="1"
                placeholder="Hint"
                size="large"
                clearable
                data-testid="select-outline-large-actived-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Large · Outline · 展开</div>
              <OSelect
                placeholder="Hint"
                size="large"
                data-testid="select-outline-large-menu-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Medium · Outline · 多选</div>
              <OSelect
                placeholder="Hint"
                size="medium"
                multiple
                clearable
                data-testid="select-outline-medium-multiple-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
                <OOption label="选项四" value="4" />
                <OOption label="选项五" value="5" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Small · Outline</div>
              <OSelect
                placeholder="Hint"
                size="small"
                data-testid="select-outline-small-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
              </OSelect>
            </div>
          </div>

          <!-- Dark Col 3: 禁用/分组/Solid/Text -->
          <div class="select-col">
            <div class="select-card">
              <div class="select-label">多选 · 已选（含折叠）</div>
              <OSelect
                :default-value="['1', '2']"
                placeholder="Hint"
                size="large"
                multiple
                clearable
                :max-tag-count="1"
                data-testid="select-multiple-fold-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">分组选项</div>
              <OSelect
                placeholder="Hint"
                size="large"
                data-testid="select-group-dark"
                class="select-demo"
              >
                <OOptionGroup name="分组一">
                  <OOption label="选项一" value="g1-1" />
                  <OOption label="选项二" value="g1-2" />
                </OOptionGroup>
                <OOptionGroup name="分组二">
                  <OOption label="选项三" value="g2-1" />
                  <OOption label="选项四" value="g2-2" disabled />
                </OOptionGroup>
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">禁用</div>
              <OSelect
                default-value="1"
                placeholder="Hint"
                size="large"
                disabled
                data-testid="select-disabled-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Solid 变体</div>
              <OSelect
                placeholder="Hint"
                size="large"
                variant="solid"
                data-testid="select-solid-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
              </OSelect>
            </div>

            <div class="select-card">
              <div class="select-label">Text 变体</div>
              <OSelect
                placeholder="Hint"
                variant="text"
                size="large"
                data-testid="select-text-dark"
                class="select-demo"
              >
                <OOption label="选项一" value="1" />
                <OOption label="选项二" value="2" />
                <OOption label="选项三" value="3" />
              </OSelect>
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
.select-grid {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.select-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

// ---- Demo 卡片 ----
.select-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

// ---- 标签 ----
.select-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- Select 宽度 ----
.select-demo {
  width: 100%;
}
</style>
