<script setup lang="ts">
// 设计稿 ID：344:16841, 271:16475, 271:16434（Pixso item-id，上传 picture-card / 文件按钮 / 拖拽）
import { ref } from 'vue'
import { OUpload } from '@opensig/opendesign'
import type { UploadFileT } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ===== 图片卡片上传 (picture-card) =====
// 空状态 - 无文件
const picCardFilesLight = ref<UploadFileT[]>([])
const picCardFilesDark = ref<UploadFileT[]>([])

// 已上传图片状态（模拟 finished）
const picCardUploadedLight = ref<UploadFileT[]>([
  {
    id: 'pc-img-1',
    name: 'photo.jpg',
    status: 'finished',
    imgUrl: 'https://www.openeuler.org/assets/fenhuo_light.8205c177.png',
  },
])
const picCardUploadedDark = ref<UploadFileT[]>([
  {
    id: 'pc-img-d1',
    name: 'photo.jpg',
    status: 'finished',
    imgUrl: 'https://www.openeuler.org/assets/fenhuo_light.8205c177.png',
  },
])

// 加载中状态
const picCardLoadingLight = ref<UploadFileT[]>([
  { id: 'pc-load-1', name: 'uploading.jpg', status: 'uploading' },
])
const picCardLoadingDark = ref<UploadFileT[]>([
  { id: 'pc-load-d1', name: 'uploading.jpg', status: 'uploading' },
])

// 错误状态
const picCardErrorLight = ref<UploadFileT[]>([
  {
    id: 'pc-err-1',
    name: 'error.jpg',
    status: 'failed',
    message: '请至少上传一张图片',
  },
])
const picCardErrorDark = ref<UploadFileT[]>([
  {
    id: 'pc-err-d1',
    name: 'error.jpg',
    status: 'failed',
    message: '请至少上传一张图片',
  },
])

// ===== 文件按钮上传 (text) =====
// 空状态
const fileListEmpty = ref<UploadFileT[]>([])
const fileListEmptyDark = ref<UploadFileT[]>([])

// 带文件列表（Loading + Finished）
const fileListWithFiles = ref<UploadFileT[]>([
  { id: 'f1', name: '文件名称XXXXXXXXX.xxx', status: 'uploading' },
  { id: 'f2', name: '文件名称XXXXXXXXX.xxx', status: 'finished' },
])
const fileListWithFilesDark = ref<UploadFileT[]>([
  { id: 'fd1', name: '文件名称XXXXXXXXX.xxx', status: 'uploading' },
  { id: 'fd2', name: '文件名称XXXXXXXXX.xxx', status: 'finished' },
])

// 错误状态
const fileListError = ref<UploadFileT[]>([
  {
    id: 'fe1',
    name: '文件名称XXXXXXXXX.xxx',
    status: 'failed',
    message: '上传失败，请检查文件是否符合要求',
    retry: true,
  },
])
const fileListErrorDark = ref<UploadFileT[]>([
  {
    id: 'fed1',
    name: '文件名称XXXXXXXXX.xxx',
    status: 'failed',
    message: '上传失败，请检查文件是否符合要求',
    retry: true,
  },
])

// ===== 拖拽上传 (draggable) =====
const dragFilesLight = ref<UploadFileT[]>([])
const dragFilesDark = ref<UploadFileT[]>([])
const dragLoadingLight = ref<UploadFileT[]>([
  { id: 'dr1', name: '文件名称XXXXXXXXX.xxx', status: 'uploading' },
])
const dragLoadingDark = ref<UploadFileT[]>([
  { id: 'drd1', name: '文件名称XXXXXXXXX.xxx', status: 'uploading' },
])
</script>

<template>
  <AppSection
    title="OUpload 上传"
    subtitle="设计稿 ID：344:16841 · 271:16475 · 271:16434 · 图片卡片 / 文件按钮 / 拖拽 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 一、图片卡片上传 (picture-card) ===== -->
      <div class="block-title">一、图片卡片上传（picture-card）</div>

      <div class="card-grid">
        <!-- Light / 空 -->
        <div class="card-cell">
          <div class="cell-label">Light · 空</div>
          <OUpload
            v-model="picCardFilesLight"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Light / 已上传 -->
        <div class="card-cell">
          <div class="cell-label">Light · 已上传</div>
          <OUpload
            v-model="picCardUploadedLight"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Dark / 空 -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · 空</div>
          <OUpload
            v-model="picCardFilesDark"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Dark / 已上传 -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · 已上传</div>
          <OUpload
            v-model="picCardUploadedDark"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Light / Loading -->
        <div class="card-cell">
          <div class="cell-label">Light · Loading</div>
          <OUpload
            v-model="picCardLoadingLight"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Light / Loading (img done) -->
        <div class="card-cell">
          <div class="cell-label">Light · Loading（图片已上传）</div>
          <OUpload
            :default-file-list="[
              { id: 'pl2', name: 'done.jpg', status: 'finished', imgUrl: 'https://www.openeuler.org/assets/fenhuo_light.8205c177.png' },
              { id: 'pl3', name: 'loading.jpg', status: 'uploading' }
            ]"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Dark / Loading -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · Loading</div>
          <OUpload
            v-model="picCardLoadingDark"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Dark / Loading (img done) -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · Loading（图片已上传）</div>
          <OUpload
            :default-file-list="[
              { id: 'pld2', name: 'done.jpg', status: 'finished', imgUrl: 'https://www.openeuler.org/assets/fenhuo_light.8205c177.png' },
              { id: 'pld3', name: 'loading.jpg', status: 'uploading' }
            ]"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Light / Error -->
        <div class="card-cell">
          <div class="cell-label">Light · Error</div>
          <OUpload
            v-model="picCardErrorLight"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
          <div class="error-text">请至少上传一张图片</div>
        </div>

        <!-- Light / Error (img error) -->
        <div class="card-cell">
          <div class="cell-label">Light · Error（图片错误）</div>
          <OUpload
            :default-file-list="[
              { id: 'pe2', name: 'error.jpg', status: 'failed' }
            ]"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Dark / Error -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · Error</div>
          <OUpload
            v-model="picCardErrorDark"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
          <div class="error-text">请至少上传一张图片</div>
        </div>

        <!-- Dark / Error (img error) -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · Error（图片错误）</div>
          <OUpload
            :default-file-list="[
              { id: 'ped2', name: 'error.jpg', status: 'failed' }
            ]"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Light / Disabled (空) -->
        <div class="card-cell">
          <div class="cell-label">Light · Disabled</div>
          <OUpload
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
            disabled
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Light / Disabled (已上传) -->
        <div class="card-cell">
          <div class="cell-label">Light · Disabled（已上传）</div>
          <OUpload
            :default-file-list="[
              { id: 'pd2', name: 'done.jpg', status: 'finished', imgUrl: 'https://www.openeuler.org/assets/fenhuo_light.8205c177.png' }
            ]"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
            disabled
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Dark / Disabled (空) -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · Disabled</div>
          <OUpload
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
            disabled
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>

        <!-- Dark / Disabled (已上传) -->
        <div class="card-cell theme-dark" data-o-theme="e.dark">
          <div class="cell-label">Dark · Disabled（已上传）</div>
          <OUpload
            :default-file-list="[
              { id: 'pdd2', name: 'done.jpg', status: 'finished', imgUrl: 'https://www.openeuler.org/assets/fenhuo_light.8205c177.png' }
            ]"
            list-type="picture-card"
            accept="image/jpg,image/png"
            btn-label="上传图片"
            disabled
          />
          <div class="hint-text">只能上传jpg、png文件格式，且图片最大不超过1M</div>
        </div>
      </div>

      <!-- ===== 二、文件按钮上传 (text) ===== -->
      <div class="block-title">二、文件按钮上传（text）</div>
      <div class="two-col-grid">

        <!-- Light 列 -->
        <div class="col-wrap">
          <div class="cell-label">Light</div>

          <!-- 空状态 -->
          <div class="upload-row">
            <OUpload
              v-model="fileListEmpty"
              btn-label="上传文件"
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 带文件列表（loading + finished） -->
          <div class="upload-row">
            <OUpload
              v-model="fileListWithFiles"
              btn-label="上传文件"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 错误状态 -->
          <div class="upload-row">
            <OUpload
              v-model="fileListError"
              btn-label="上传文件"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 普通按钮样式（自定义 select slot） -->
          <div class="upload-row">
            <OUpload
              btn-label="普通按钮"
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 禁用 -->
          <div class="upload-row">
            <OUpload
              :default-file-list="[{ id: 'fd3', name: '文件名称XXXXXXXXX.xxx', status: 'finished' }]"
              btn-label="上传文件"
              accept=".doc,.docx,.xlsm,.pptx"
              disabled
            />
          </div>
        </div>

        <!-- Dark 列 -->
        <div class="col-wrap theme-dark-text" data-o-theme="e.dark">
          <div class="cell-label">Dark</div>

          <!-- 空状态 -->
          <div class="upload-row">
            <OUpload
              v-model="fileListEmptyDark"
              btn-label="上传文件"
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 带文件列表 -->
          <div class="upload-row">
            <OUpload
              v-model="fileListWithFilesDark"
              btn-label="上传文件"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 错误状态 -->
          <div class="upload-row">
            <OUpload
              v-model="fileListErrorDark"
              btn-label="上传文件"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 普通按钮 -->
          <div class="upload-row">
            <OUpload
              btn-label="普通按钮"
              accept=".doc,.docx,.xlsm,.pptx"
            />
            <div class="hint-text">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</div>
          </div>

          <!-- 禁用 -->
          <div class="upload-row">
            <OUpload
              :default-file-list="[{ id: 'fdd3', name: '文件名称XXXXXXXXX.xxx', status: 'finished' }]"
              btn-label="上传文件"
              accept=".doc,.docx,.xlsm,.pptx"
              disabled
            />
          </div>
        </div>
      </div>

      <!-- ===== 三、拖拽上传 (draggable) ===== -->
      <div class="block-title">三、拖拽上传（draggable）</div>
      <div class="two-col-grid">

        <!-- Light 列 -->
        <div class="col-wrap">
          <div class="cell-label">Light</div>

          <!-- PC Enabled -->
          <div class="upload-row">
            <div class="state-label">PC · Enabled</div>
            <OUpload
              v-model="dragFilesLight"
              draggable
              drag-label="点击或拖拽文件到此处上传"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            >
              <template #select-drag-extra>
                <div class="drag-hint">只能上传***、***文件格式，且文件最大不超过**M</div>
              </template>
            </OUpload>
          </div>

          <!-- PC Loading -->
          <div class="upload-row">
            <div class="state-label">PC · Loading</div>
            <OUpload
              v-model="dragLoadingLight"
              draggable
              drag-label="点击或拖拽文件到此处上传"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            >
              <template #select-drag-extra>
                <div class="drag-hint">只能上传***、***文件格式，且文件最大不超过**M</div>
              </template>
            </OUpload>
          </div>

          <!-- PC Disabled -->
          <div class="upload-row">
            <div class="state-label">PC · Disabled</div>
            <OUpload
              draggable
              drag-label="点击或拖拽文件到此处上传"
              accept=".doc,.docx,.xlsm,.pptx"
              disabled
            >
              <template #select-drag-extra>
                <div class="drag-hint">只能上传***、***文件格式，且文件最大不超过**M</div>
              </template>
            </OUpload>
          </div>

          <!-- Mobile Enabled -->
          <div class="upload-row">
            <div class="state-label">Mobile · Enabled</div>
            <div class="drag-mb">
              <OUpload
                draggable
                drag-label="点击或拖拽文件到此处上传"
                accept=".doc,.docx,.xlsm,.pptx"
              />
            </div>
          </div>
        </div>

        <!-- Dark 列 -->
        <div class="col-wrap theme-dark-text" data-o-theme="e.dark">
          <div class="cell-label">Dark</div>

          <!-- PC Enabled -->
          <div class="upload-row">
            <div class="state-label">PC · Enabled</div>
            <OUpload
              v-model="dragFilesDark"
              draggable
              drag-label="点击或拖拽文件到此处上传"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            >
              <template #select-drag-extra>
                <div class="drag-hint">只能上传***、***文件格式，且文件最大不超过**M</div>
              </template>
            </OUpload>
          </div>

          <!-- PC Loading -->
          <div class="upload-row">
            <div class="state-label">PC · Loading</div>
            <OUpload
              v-model="dragLoadingDark"
              draggable
              drag-label="点击或拖拽文件到此处上传"
              multiple
              accept=".doc,.docx,.xlsm,.pptx"
            >
              <template #select-drag-extra>
                <div class="drag-hint">只能上传***、***文件格式，且文件最大不超过**M</div>
              </template>
            </OUpload>
          </div>

          <!-- PC Disabled -->
          <div class="upload-row">
            <div class="state-label">PC · Disabled</div>
            <OUpload
              draggable
              drag-label="点击或拖拽文件到此处上传"
              accept=".doc,.docx,.xlsm,.pptx"
              disabled
            >
              <template #select-drag-extra>
                <div class="drag-hint">只能上传***、***文件格式，且文件最大不超过**M</div>
              </template>
            </OUpload>
          </div>

          <!-- Mobile Enabled -->
          <div class="upload-row">
            <div class="state-label">Mobile · Enabled</div>
            <div class="drag-mb">
              <OUpload
                draggable
                drag-label="点击或拖拽文件到此处上传"
                accept=".doc,.docx,.xlsm,.pptx"
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
  gap: var(--o-r-gap-7);
}

.block-title {
  @include h4;
  font-weight: 600;
  color: var(--o-color-info1);
  padding-bottom: var(--o-r-gap-3);
  border-bottom: 1px solid var(--o-color-control3);
}

// ===== 图片卡片网格 =====
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--o-r-gap-5);
}

.card-cell {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-2);
  padding: var(--o-r-gap-4);
  border-radius: var(--o-radius-m);
  background: var(--o-color-fill2);
  box-shadow: var(--o-shadow-1);

  &.theme-dark {
    background: #1f2127;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  }
}

.cell-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  margin-bottom: var(--o-r-gap-1);
}

// ===== 两列布局 =====
.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--o-r-gap-5);
}

.col-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  padding: var(--o-r-gap-5);
  border-radius: var(--o-radius-m);
  background: var(--o-color-fill2);
  box-shadow: var(--o-shadow-1);

  &.theme-dark-text {
    background: #1f2127;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  }
}

// ===== 上传行 =====
.upload-row {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-2);
}

.state-label {
  @include tip1;
  color: var(--o-color-info3);
  font-weight: 600;
}

// ===== 提示文字 =====
.hint-text {
  @include tip2;
  color: var(--o-color-info3);
}

.error-text {
  @include tip2;
  color: var(--o-color-danger1);
}

// ===== 拖拽区域提示文字 =====
.drag-hint {
  @include tip2;
  text-align: center;
  color: var(--o-color-info3);
}

// ===== Mobile 拖拽区域宽度 =====
.drag-mb {
  width: 240px;
}
</style>
