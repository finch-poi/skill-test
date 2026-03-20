<script setup lang="ts">
import { ref, h } from 'vue'
import {
  OStep,
  OStepItem,
  OBreadcrumb,
  OBreadcrumbItem,
  OForm,
  OFormItem,
  OSelect,
  OOption,
  OInput,
  ORadio,
  ORadioGroup,
  OTextarea,
  OButton,
  OPopover,
  ODataTable,
  OLink,
  OIconInfo,
  OIconAdd,
} from '@opensig/opendesign'
import type { DataTableColumnT } from '@opensig/opendesign'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// ── Form state ────────────────────────────────────────────
const formData = ref({
  titleSelect: '',
  titleInput: '',
  recordMeeting: '',
  isRepeat: 'repeat',
  description: '',
})

// ── Info popover ──────────────────────────────────────────
const infoPopoverVisible = ref(false)

// ── Upload (manual – OUpload has no type declarations) ────
const fileInput = ref<HTMLInputElement | null>(null)
function handleUploadClick() {
  fileInput.value?.click()
}
function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    console.log('Files selected:', input.files)
  }
}

// ── Data table ────────────────────────────────────────────
const tableColumns: DataTableColumnT[] = [
  { key: 'title1', label: '标题1', width: '35%' },
  { key: 'title2', label: '标题2' },
  { key: 'title3', label: '标题3', width: 100 },
  { key: 'title4', label: '标题4' },
  {
    key: 'actions',
    label: '标题5',
    formatter: () =>
      h('div', { style: 'display:flex;gap:8px' }, [
        h(OLink, { color: 'primary' }, () => '文字按钮'),
        h(OLink, { color: 'primary' }, () => '文字按钮'),
      ]),
  },
]

const tableData = ref([
  { id: 1, title1: '内容文本内容文本内容文本（选中）', title2: '内容文本内容文本', title3: 330, title4: '内容文本' },
  { id: 2, title1: '内容文本内容文本内容文本', title2: '内容文本内容文本', title3: 330, title4: '内容文本' },
  { id: 3, title1: '内容文本内容文本内容文本', title2: '内容文本内容文本', title3: 330, title4: '内容文本' },
  { id: 4, title1: '内容文本内容文本内容文本', title2: '内容文本内容文本', title3: 330, title4: '内容文本' },
  { id: 5, title1: '内容文本内容文本内容文本', title2: '内容文本内容文本', title3: 330, title4: '内容文本' },
])

const selectedKeys = ref<number[]>([1])
</script>

<template>
  <div class="test-form1-page">
    <AppHeader />

    <div class="page-bg">
      <div class="page-inner">
        <!-- Breadcrumb -->
        <div class="breadcrumb-row">
          <OBreadcrumb>
            <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
            <OBreadcrumbItem>一级页面</OBreadcrumbItem>
            <OBreadcrumbItem>二级页面</OBreadcrumbItem>
            <OBreadcrumbItem>三级页面</OBreadcrumbItem>
            <OBreadcrumbItem>四级页面</OBreadcrumbItem>
            <OBreadcrumbItem>当前页面</OBreadcrumbItem>
          </OBreadcrumb>
        </div>

        <!-- Card -->
        <div class="form-card">
          <!-- Step indicator -->
          <div class="steps-wrap">
            <OStep direction="h">
              <OStepItem
                :step-index="0"
                title="已完成的步骤"
                status="finished"
                :icon="true"
              />
              <OStepItem
                :step-index="1"
                title="进行中的步骤"
                status="processing"
              />
              <OStepItem
                :step-index="2"
                title="未开始的步骤"
                status="waiting"
              />
            </OStep>
          </div>

          <!-- Section 1: 会议基础信息 -->
          <section class="form-section">
            <h2 class="section-title">会议基础信息</h2>

            <OForm has-required layout="h" label-width="96px" label-align="center">
              <!-- 标题文本 → Select -->
              <OFormItem label="标题文本" required field="titleSelect">
                <OSelect
                  v-model="formData.titleSelect"
                  placeholder="Hint"
                >
                  <OOption label="选项一" value="1" />
                  <OOption label="选项二" value="2" />
                  <OOption label="选项三" value="3" />
                </OSelect>
              </OFormItem>

              <!-- 标题文本最大宽度最大宽度最 → Input -->
              <OFormItem label="标题文本最大宽度最大宽度最" required field="titleInput">
                <OInput
                  v-model="formData.titleInput"
                  placeholder="Hint"
                />
              </OFormItem>

              <!-- 录制会议 ① (with info popover) → Select -->
              <OFormItem required field="recordMeeting">
                <template #label>
                  <span class="label-with-icon">
                    录制会议
                    <OPopover
                      v-model:visible="infoPopoverVisible"
                      trigger="click"
                      position="bl"
                      :anchor="true"
                      :adjust-width="false"
                      :adjust-min-width="false"
                    >
                      <div class="popover-body">
                        <div class="popover-title">标题标题</div>
                        <div class="popover-text">内容文本内容文本内容文本内容文本</div>
                        <OButton
                          size="small"
                          color="primary"
                          variant="solid"
                          round="pill"
                          @click="infoPopoverVisible = false"
                        >
                          知道了
                        </OButton>
                      </div>
                      <template #target>
                        <OIconInfo class="info-icon" />
                      </template>
                    </OPopover>
                  </span>
                </template>
                <OSelect
                  v-model="formData.recordMeeting"
                  placeholder="Hint"
                >
                  <OOption label="是" value="yes" />
                  <OOption label="否" value="no" />
                </OSelect>
              </OFormItem>

              <!-- 是否是重复会议 → RadioGroup -->
              <OFormItem label="是否是重复会议" required field="isRepeat">
                <ORadioGroup v-model="formData.isRepeat" direction="h">
                  <ORadio value="repeat">重复</ORadio>
                  <ORadio value="no-repeat">不重复</ORadio>
                </ORadioGroup>
              </OFormItem>

              <!-- 标题文本 → Textarea（宽项，独占整行） -->
              <OFormItem label="标题文本" label-align="top" field="description">
                <OTextarea
                  v-model="formData.description"
                  placeholder="请输入"
                  :max-length="100"
                  show-length="always"
                />
              </OFormItem>

              <!-- 标题文本 → Upload（宽项，独占整行） -->
              <OFormItem label="标题文本" label-align="top">
                <div class="upload-wrap">
                  <OButton
                    variant="outline"
                    color="primary"
                    round="pill"
                    @click="handleUploadClick"
                  >
                    <template #icon>
                      <OIconAdd />
                    </template>
                    上传文件
                  </OButton>
                  <input
                    ref="fileInput"
                    type="file"
                    accept=".doc,.xlsm,.pptx"
                    style="display: none"
                    @change="handleFileChange"
                  />
                  <p class="upload-hint">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</p>
                </div>
              </OFormItem>
            </OForm>
          </section>

          <!-- Section 2: 复杂信息收集 -->
          <section class="form-section">
            <h2 class="section-title">复杂信息收集</h2>
            <ODataTable
              v-model:selection-keys="selectedKeys"
              :columns="tableColumns"
              :data="tableData"
              row-key="id"
              selection
            />
          </section>

          <!-- Action buttons -->
          <div class="form-actions">
            <OButton color="primary" variant="solid" round="pill" size="large">提交</OButton>
            <OButton variant="outline" round="pill" size="large">保存</OButton>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.test-form1-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--o-color-bg1);
}

.page-bg {
  flex: 1;
  padding: 24px 0 48px;
}

.page-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-7, 40px);
}

/* ── Breadcrumb ─────────────────────────────── */
.breadcrumb-row {
  margin-bottom: 16px;
}

/* ── Card ───────────────────────────────────── */
.form-card {
  background: var(--o-color-bg2, #fff);
  border-radius: var(--o-radius-m, 8px);
  padding: 32px 40px 40px;
}

/* ── Steps ──────────────────────────────────── */
.steps-wrap {
  margin-bottom: 40px;
}

/* ── Form section ───────────────────────────── */
.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: var(--o-font_size-h6, 18px);
  font-weight: 600;
  color: var(--o-color-info1);
  margin: 0 0 20px;
}

/* ── Info icon label ────────────────────────── */
.label-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.info-icon {
  color: var(--o-color-info3);
  cursor: pointer;
  font-size: 16px;
  flex-shrink: 0;
}

/* ── Popover content ────────────────────────── */
.popover-body {
  min-width: 140px;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popover-title {
  font-size: var(--o-font_size-text1);
  font-weight: 600;
  color: var(--o-color-info1);
}

.popover-text {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info2);
  line-height: 1.5;
}

/* ── Upload ─────────────────────────────────── */
.upload-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upload-hint {
  margin: 0;
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info3);
}

/* ── Action buttons ─────────────────────────── */
.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
</style>
