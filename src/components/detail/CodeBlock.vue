<script setup lang="ts">
import { OIcon } from '@opensig/opendesign'
import { AppIconCopy } from '@/icon-components'
import { useClipboard } from '@/composables/useClipboard'

const props = defineProps<{
  code: string
}>()

const { copied, copy } = useClipboard()
</script>

<template>
  <div class="code-block">
    <code class="code-text">{{ props.code }}</code>
    <button class="copy-btn" :class="{ copied }" @click="copy(props.code)">
      <OIcon :icon="AppIconCopy" />
      <span v-if="copied" class="copy-tip">已复制</span>
    </button>
  </div>
</template>

<style scoped>
.code-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--o-gap-3);
  background-color: var(--o-color-fill2);
  border: 1px solid var(--o-color-control4);
  border-radius: var(--o-radius-s);
  padding: var(--o-gap-3) var(--o-gap-4);
  font-family: 'Courier New', Courier, monospace;
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info1);
  overflow-x: auto;
}

.code-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--o-gap-1);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--o-color-info3);
  font-size: 16px;
  padding: 4px;
  border-radius: var(--o-radius-xs);
  transition: color var(--o-duration-m1) var(--o-easing-standard);
}

.copy-btn:hover {
  color: var(--o-color-info1);
}

.copy-btn.copied {
  color: var(--o-color-success);
}

.copy-tip {
  font-size: var(--o-font_size-tip2);
  color: var(--o-color-success);
}
</style>
