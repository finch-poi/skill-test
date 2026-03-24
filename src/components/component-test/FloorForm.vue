<script setup lang="ts">
// 设计稿 ID：305:46926（Pixso item-id，表单）
import { ref, reactive } from 'vue'
import {
  OForm,
  OFormItem,
  OInput,
  OSelect,
  OOption,
  OTextarea,
  OButton,
} from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- Light form data ----
const lightForm = reactive({
  select1: '',
  input1: '',
  textarea1: '',
})

const lightFormRef = ref()

// ---- Dark form data ----
const darkForm = reactive({
  select1: '',
  input1: '',
  textarea1: '',
})

const darkFormRef = ref()

// ---- Validation rules ----
const requiredRules = [
  { required: true, message: '此字段为必填项', triggers: 'blur' as const },
]

const longLabelRules = [
  { required: true, message: '此字段为必填项', triggers: 'blur' as const },
]

// ---- Upload handler (manual, OUpload has no types) ----
const lightFileName = ref('')
const darkFileName = ref('')

function handleLightUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) {
    lightFileName.value = target.files[0].name
  }
}

function handleDarkUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.[0]) {
    darkFileName.value = target.files[0].name
  }
}

const lightFileInputRef = ref<HTMLInputElement>()
const darkFileInputRef = ref<HTMLInputElement>()

function triggerLightUpload() {
  lightFileInputRef.value?.click()
}

function triggerDarkUpload() {
  darkFileInputRef.value?.click()
}
</script>

<template>
  <AppSection
    title="OForm 表单"
    subtitle="设计稿 ID：305:46926 · 覆盖水平布局 × Select / Input / Textarea / Upload × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="form-row-light">
        <div class="theme-label">Light</div>

        <div class="form-group-title">这是分组标题</div>

        <OForm
          ref="lightFormRef"
          :model="lightForm"
          has-required
          layout="h"
          label-width="252px"
          data-testid="form-light"
        >
          <!-- Select 必填 -->
          <OFormItem
            field="select1"
            label="标题文本"
            required
            :rules="requiredRules"
          >
            <OSelect
              v-model="lightForm.select1"
              placeholder="Hint"
            >
              <OOption value="opt1" label="选项一" />
              <OOption value="opt2" label="选项二" />
              <OOption value="opt3" label="选项三" />
            </OSelect>
          </OFormItem>

          <!-- Input 必填（长标签） -->
          <OFormItem
            field="input1"
            label="标题文本宽度最大宽度最大宽度最"
            required
            :rules="longLabelRules"
          >
            <OInput
              v-model="lightForm.input1"
              placeholder="Hint"
            />
          </OFormItem>

          <!-- Textarea 非必填 -->
          <OFormItem
            field="textarea1"
            label="标题文本"
            label-align="top"
          >
            <OTextarea
              v-model="lightForm.textarea1"
              placeholder="Hint"
              :show-length="'always'"
              :max-length="100"
            />
          </OFormItem>

          <!-- Upload 非必填（OUpload 无类型声明，自行实现） -->
          <OFormItem
            field="upload"
            label="标题文本"
          >
            <div class="upload-wrap">
              <input
                ref="lightFileInputRef"
                type="file"
                accept=".doc,.xls,.pptx"
                class="upload-input"
                @change="handleLightUpload"
              />
              <OButton
                variant="outline"
                @click="triggerLightUpload"
                data-testid="upload-btn-light"
              >
                + 上传文件
              </OButton>
              <div class="upload-hint">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
              <div v-if="lightFileName" class="upload-filename">{{ lightFileName }}</div>
            </div>
          </OFormItem>
        </OForm>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="form-row-dark">
        <div class="theme-label">Dark</div>

        <div class="form-group-title">这是分组标题</div>

        <OForm
          ref="darkFormRef"
          :model="darkForm"
          has-required
          layout="h"
          label-width="252px"
          data-testid="form-dark"
        >
          <!-- Select 必填 -->
          <OFormItem
            field="select1"
            label="标题文本"
            required
            :rules="requiredRules"
          >
            <OSelect
              v-model="darkForm.select1"
              placeholder="Hint"
            >
              <OOption value="opt1" label="选项一" />
              <OOption value="opt2" label="选项二" />
              <OOption value="opt3" label="选项三" />
            </OSelect>
          </OFormItem>

          <!-- Input 必填（长标签） -->
          <OFormItem
            field="input1"
            label="标题文本宽度最大宽度最大宽度最"
            required
            :rules="longLabelRules"
          >
            <OInput
              v-model="darkForm.input1"
              placeholder="Hint"
            />
          </OFormItem>

          <!-- Textarea 非必填 -->
          <OFormItem
            field="textarea1"
            label="标题文本"
            label-align="top"
          >
            <OTextarea
              v-model="darkForm.textarea1"
              placeholder="Hint"
              :show-length="'always'"
              :max-length="100"
            />
          </OFormItem>

          <!-- Upload 非必填（OUpload 无类型声明，自行实现） -->
          <OFormItem
            field="upload"
            label="标题文本"
          >
            <div class="upload-wrap">
              <input
                ref="darkFileInputRef"
                type="file"
                accept=".doc,.xls,.pptx"
                class="upload-input"
                @change="handleDarkUpload"
              />
              <OButton
                variant="outline"
                @click="triggerDarkUpload"
                data-testid="upload-btn-dark"
              >
                + 上传文件
              </OButton>
              <div class="upload-hint">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
              <div v-if="darkFileName" class="upload-filename">{{ darkFileName }}</div>
            </div>
          </OFormItem>
        </OForm>
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

// ---- 分组标题（DSL：SemiBold 20px/28px） ----
.form-group-title {
  @include h3;
  font-weight: 600;
  color: var(--o-color-info1);
}

// ---- Upload 自定义样式 ----
.upload-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-2);
}

.upload-input {
  display: none;
}

.upload-hint {
  @include tip2;
  color: var(--o-color-info3);
}

.upload-filename {
  @include tip2;
  color: var(--o-color-info2);
}

// ---- 表单控件宽度（遵循 form.md 全局规范） ----
:deep(.o-select),
:deep(.o-input) {
  width: var(--form-item-main-box-width-standard);
}

:deep(.o-textarea) {
  width: var(--form-item-main-box-width-wide);
}
</style>
