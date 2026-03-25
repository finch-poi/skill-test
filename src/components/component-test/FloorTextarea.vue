<script setup lang="ts">
// 设计稿 ID：17:2670（Pixso item-id，文本域）
import { ref, reactive, onMounted, nextTick } from 'vue'
import { OTextarea, OForm, OFormItem } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

const valueEmpty = ref('')
const valueContent = ref('已输入的文字内容')

// ---- 错误状态 demo（OForm + OFormItem 驱动，不直接用 color="danger"）----
const errorRules = [{ required: true, message: '错误提示' }]
const errorModel = reactive({ val: '' })

const errorFormLightOutlineRef = ref()
const errorFormLightSolidRef = ref()
const errorFormDarkOutlineRef = ref()
const errorFormDarkSolidRef = ref()

onMounted(async () => {
  await nextTick()
  errorFormLightOutlineRef.value?.validate()
  errorFormLightSolidRef.value?.validate()
  errorFormDarkOutlineRef.value?.validate()
  errorFormDarkSolidRef.value?.validate()
})
</script>

<template>
  <AppSection
    title="OTextarea 文本域"
    subtitle="设计稿 ID：17:2670 · 覆盖 Enabled/Complete/Error × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="textarea-row-light">
        <div class="theme-label">Light</div>
        <div class="textarea-grid">

          <!-- Enabled（空，含 placeholder） -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled（placeholder）</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-enabled-light"
            />
          </div>

          <!-- Enabled（solid 变体，含 placeholder） -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled · Solid</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-solid-light"
            />
          </div>

          <!-- Complete（有内容） -->
          <div class="textarea-cell">
            <div class="cell-label">Complete（有内容）</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-complete-light"
            />
          </div>

          <!-- Complete · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Complete · Solid</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-complete-solid-light"
            />
          </div>

          <!-- Error（danger） -->
          <div class="textarea-cell">
            <div class="cell-label">Error</div>
            <OForm ref="errorFormLightOutlineRef" :model="errorModel" class="demo-form">
              <OFormItem field="val" :rules="errorRules">
                <OTextarea
                  v-model="errorModel.val"
                  placeholder="Hint"
                  :max-length="100"
                  show-length="always"
                  resize="none"
                  data-testid="textarea-error-light"
                />
              </OFormItem>
            </OForm>
          </div>

          <!-- Error · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Error · Solid</div>
            <OForm ref="errorFormLightSolidRef" :model="errorModel" class="demo-form">
              <OFormItem field="val" :rules="errorRules">
                <OTextarea
                  v-model="errorModel.val"
                  placeholder="Hint"
                  :max-length="100"
                  show-length="always"
                  variant="solid"
                  resize="none"
                  data-testid="textarea-error-solid-light"
                />
              </OFormItem>
            </OForm>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="textarea-row-dark">
        <div class="theme-label">Dark</div>
        <div class="textarea-grid">

          <!-- Enabled（空） -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled（placeholder）</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-enabled-dark"
            />
          </div>

          <!-- Enabled · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled · Solid</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-solid-dark"
            />
          </div>

          <!-- Complete -->
          <div class="textarea-cell">
            <div class="cell-label">Complete（有内容）</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-complete-dark"
            />
          </div>

          <!-- Complete · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Complete · Solid</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-complete-solid-dark"
            />
          </div>

          <!-- Error -->
          <div class="textarea-cell">
            <div class="cell-label">Error</div>
            <OForm ref="errorFormDarkOutlineRef" :model="errorModel" class="demo-form">
              <OFormItem field="val" :rules="errorRules">
                <OTextarea
                  v-model="errorModel.val"
                  placeholder="Hint"
                  :max-length="100"
                  show-length="always"
                  resize="none"
                  data-testid="textarea-error-dark"
                />
              </OFormItem>
            </OForm>
          </div>

          <!-- Error · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Error · Solid</div>
            <OForm ref="errorFormDarkSolidRef" :model="errorModel" class="demo-form">
              <OFormItem field="val" :rules="errorRules">
                <OTextarea
                  v-model="errorModel.val"
                  placeholder="Hint"
                  :max-length="100"
                  show-length="always"
                  variant="solid"
                  resize="none"
                  data-testid="textarea-error-solid-dark"
                />
              </OFormItem>
            </OForm>
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

// ---- 2-column grid ----
.textarea-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--o-r-gap-5);

  @include respond('<=pad') {
    grid-template-columns: 1fr;
  }
}

// ---- 单个 textarea 卡片 ----
.textarea-cell {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.cell-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 表单 demo 重置（移除 OFormItem 默认外边距）----
.demo-form {
  :deep(.o-form-item) {
    margin-bottom: 0;
  }
}
</style>
