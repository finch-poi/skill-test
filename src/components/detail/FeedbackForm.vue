<script setup lang="ts">
import { ref } from 'vue'
import { OSlider, OTextarea, OButton, OLink } from '@opensig/opendesign'

defineProps<{
  softwareName: string
}>()

const score = ref(4)
const feedback = ref('')

const marks = {
  0: '0-不满意',
  10: '10-好评如潮',
} as Record<number, string>
</script>

<template>
  <div class="feedback-form">
    <h2 class="section-title">反馈</h2>

    <div class="score-section">
      <span class="score-value">{{ score }}</span>
      <OSlider v-model="score" :min="0" :max="10" :step="1" :marks="marks" :show-popover="false" />
    </div>

    <OTextarea
      v-model="feedback"
      placeholder="请输入您的反馈"
      :max-length="200"
      show-length="always"
      :auto-size="true"
      class="feedback-textarea"
    />

    <div class="feedback-actions">
      <OButton color="brand" variant="solid" round="pill">快速反馈</OButton>
      <OButton color="brand" variant="outline" round="pill">提交issue</OButton>
    </div>

    <p class="feedback-note">
      您也可以使用
      <OLink color="primary" href="https://gitee.com/openeuler" target="_blank">发帖求助</OLink>
      进行反馈
    </p>
  </div>
</template>

<style scoped>
.feedback-form {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-s);
  padding: var(--o-gap-6);
}

.section-title {
  font-size: var(--o-font_size-h4);
  font-weight: 500;
  color: var(--o-color-info1);
  margin-bottom: var(--o-gap-5);
}

.score-section {
  display: flex;
  align-items: center;
  gap: var(--o-gap-4);
  margin-bottom: var(--o-gap-5);
  padding: 0 var(--o-gap-2);
}

.score-value {
  font-size: var(--o-font_size-h4);
  font-weight: 500;
  color: var(--o-color-info1);
  min-width: 24px;
  text-align: center;
}

.feedback-textarea {
  margin-bottom: var(--o-gap-4);
}

.feedback-actions {
  display: flex;
  gap: var(--o-gap-3);
  margin-bottom: var(--o-gap-3);
}

.feedback-note {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info3);
}
</style>
