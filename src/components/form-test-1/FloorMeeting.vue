<script setup lang="ts">
import { ref } from 'vue'
import {
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
  OIconInfo,
} from '@opensig/opendesign'

const titleSelect = ref('')
const inputValue = ref('')
const recordSelect = ref('')
const repeatRadio = ref('1')
const descText = ref('')
</script>

<template>
  <div class="floor-meeting">
    <h2 class="section-title">会议基础信息</h2>

    <OForm layout="h" has-required label-width="120px">
      <OFormItem label="标题文本" required>
        <OSelect v-model="titleSelect" placeholder="Hint">
          <OOption value="1" label="标题标题" />
          <OOption value="2" label="内容文本内容文本" />
        </OSelect>
      </OFormItem>

      <OFormItem label="标题文本最大宽度最大宽度最" required>
        <OInput v-model="inputValue" placeholder="Hint" />
      </OFormItem>

      <OFormItem required>
        <template #label>
          录制会议
          <OPopover position="top">
            <template #target>
              <OIconInfo class="label-icon" />
            </template>
            录制会议相关说明信息
          </OPopover>
        </template>
        <OSelect v-model="recordSelect" placeholder="Hint">
          <OOption value="1" label="选项1" />
          <OOption value="2" label="选项2" />
        </OSelect>
      </OFormItem>

      <OFormItem label="是否是重复会议" required>
        <ORadioGroup v-model="repeatRadio" direction="h">
          <ORadio value="1">重复</ORadio>
          <ORadio value="2">不重复</ORadio>
        </ORadioGroup>
      </OFormItem>

      <OFormItem label="标题文本" label-align="top">
        <OTextarea
          v-model="descText"
          placeholder="请输入"
          :max-length="100"
          show-length="always"
          :rows="4"
        />
      </OFormItem>

      <OFormItem label="标题文本">
        <div class="upload-area">
          <OButton variant="outline" color="primary" size="small">
            <template #prefix>+</template>
            上传文件
          </OButton>
          <span class="upload-hint">只能上传doc、xlsm、pptx文件格式，且文件最大不超过1M</span>
        </div>
      </OFormItem>
    </OForm>
  </div>
</template>

<style lang="scss" scoped>
.floor-meeting {
  margin-bottom: var(--o-r-gap-6);
}

.section-title {
  margin-top: 0;
  margin-bottom: var(--o-r-gap-5);
  @include h4;
  font-weight: 600;
  color: var(--o-color-info1);
}

.label-icon {
  margin-left: var(--o-r-gap-1);
  @include tip1;
  color: var(--o-color-info3);
  cursor: pointer;
  vertical-align: middle;
}

.upload-area {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-3);
  flex-wrap: wrap;
}

.upload-hint {
  @include tip1;
  color: var(--o-color-info3);
}
</style>
