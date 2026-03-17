<script setup lang="ts">
import { ref } from 'vue'
import { OTab, OTabPane } from '@opensig/opendesign'
import CodeBlock from './CodeBlock.vue'
import type { InstallMethod } from '@/api/software-detail'

const props = defineProps<{
  methods: InstallMethod[]
}>()

const activeMethod = ref(props.methods[0]?.value ?? '')
</script>

<template>
  <div class="install-guide">
    <h2 class="section-title">> 安装方式</h2>
    <OTab v-model="activeMethod" variant="text" class="install-tabs">
      <OTabPane
        v-for="method in methods"
        :key="method.value"
        :label="method.label"
        :value="method.value"
      >
        <div class="steps">
          <div v-for="(step, index) in method.steps" :key="index" class="step-item">
            <div class="step-header">
              <span class="step-number">{{ index + 1 }}</span>
              <span class="step-title">{{ step.title }}</span>
            </div>
            <CodeBlock :code="step.command" />
          </div>
        </div>
      </OTabPane>
    </OTab>
  </div>
</template>

<style scoped>
.install-guide {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-s);
  padding: var(--o-gap-6);
}

.section-title {
  font-size: var(--o-font_size-h4);
  font-weight: 500;
  color: var(--o-color-info1);
  margin-bottom: var(--o-gap-4);
}

.install-tabs {
  margin-bottom: var(--o-gap-4);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-5);
}

.step-item {
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-3);
}

.step-header {
  display: flex;
  align-items: center;
  gap: var(--o-gap-3);
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--o-color-brand1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--o-font_size-tip1);
  font-weight: 500;
  flex-shrink: 0;
}

.step-title {
  font-size: var(--o-font_size-text1);
  font-weight: 500;
  color: var(--o-color-info1);
}
</style>
