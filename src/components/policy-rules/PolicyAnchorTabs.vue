<script setup lang="ts">
export interface AnchorItem {
  id: string
  label: string
}

const props = defineProps<{
  anchors: AnchorItem[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [id: string]
}>()

function scrollTo(id: string) {
  emit('update:modelValue', id)
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <nav class="anchor-tabs">
    <div class="anchor-inner">
      <button
        v-for="anchor in anchors"
        :key="anchor.id"
        class="anchor-item"
        :class="{ active: modelValue === anchor.id }"
        @click="scrollTo(anchor.id)"
      >
        {{ anchor.label }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.anchor-tabs {
  background: var(--o-color-fill1);
  border-bottom: 1px solid var(--o-color-control3);
}

.anchor-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-7, 40px);
  display: flex;
  align-items: center;
  gap: var(--o-gap-8, 48px);
}

.anchor-item {
  position: relative;
  padding: 14px 0;
  font-size: var(--o-font_size-text1);
  color: var(--o-color-info2);
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--o-duration-m1);
}

.anchor-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--o-color-brand1);
  transform: scaleX(0);
  transition: transform var(--o-duration-m1);
}

.anchor-item:hover {
  color: var(--o-color-brand1);
}

.anchor-item.active {
  color: var(--o-color-brand1);
  font-weight: 500;
}

.anchor-item.active::after {
  transform: scaleX(1);
}
</style>
