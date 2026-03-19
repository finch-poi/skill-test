<script setup lang="ts">
import { OSelect, OTag } from '@opensig/opendesign'
import { POLICY_CATEGORIES, POLICY_AUTHORS, POLICY_TAGS, POLICY_TIME_OPTIONS } from '@/api/policy-rules'

export interface FilterState {
  category: string
  time: string
  author: string
  tags: string[]
}

const props = defineProps<{
  modelValue: FilterState
}>()

const emit = defineEmits<{
  'update:modelValue': [state: FilterState]
  change: [state: FilterState]
}>()

function update(patch: Partial<FilterState>) {
  const next = { ...props.modelValue, ...patch }
  emit('update:modelValue', next)
  emit('change', next)
}

function removeTag(tag: string) {
  update({ tags: props.modelValue.tags.filter((t) => t !== tag) })
}

const authorOptions = [
  { label: '全部', value: '' },
  ...POLICY_AUTHORS.map((a) => ({ label: a, value: a })),
]

const tagOptions = POLICY_TAGS.map((t) => ({ label: t, value: t }))
</script>

<template>
  <div class="policy-filter">
    <!-- 分类筛选 -->
    <div class="filter-row">
      <span class="filter-label">分类</span>
      <div class="category-chips">
        <button
          v-for="cat in POLICY_CATEGORIES"
          :key="cat"
          class="chip"
          :class="{ active: modelValue.category === cat }"
          @click="update({ category: cat })"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- 次级筛选 -->
    <div class="filter-row secondary">
      <div class="select-group">
        <span class="filter-label">时间</span>
        <OSelect
          :model-value="modelValue.time"
          :options="POLICY_TIME_OPTIONS"
          placeholder="全部"
          size="small"
          class="filter-select"
          @update:model-value="(v) => update({ time: String(v) })"
        />
      </div>

      <div class="select-group">
        <span class="filter-label">作者</span>
        <OSelect
          :model-value="modelValue.author"
          :options="authorOptions"
          placeholder="全部"
          size="small"
          class="filter-select"
          @update:model-value="(v) => update({ author: String(v) })"
        />
      </div>

      <div class="select-group">
        <span class="filter-label">标签</span>
        <OSelect
          :model-value="modelValue.tags[0] ?? ''"
          :options="tagOptions"
          placeholder="请选择"
          size="small"
          class="filter-select"
          @update:model-value="(v) => v && update({ tags: [String(v)] })"
        />
        <div v-if="modelValue.tags.length > 0" class="selected-tags">
          <OTag
            v-for="tag in modelValue.tags"
            :key="tag"
            size="small"
            closable
            @close="removeTag(tag)"
          >
            {{ tag }}
          </OTag>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.policy-filter {
  background: var(--o-color-fill1);
  border-radius: var(--o-radius-m, 8px);
  padding: var(--o-gap-5) var(--o-gap-6);
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-4);
  box-shadow: var(--o-shadow-1, 0 1px 4px #00000014);
}

.filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--o-gap-4);
}

.filter-row.secondary {
  align-items: center;
  flex-wrap: wrap;
  gap: var(--o-gap-5);
  padding-top: var(--o-gap-2);
  border-top: 1px solid var(--o-color-control3);
}

.filter-label {
  font-size: var(--o-font_size-text1);
  color: var(--o-color-info2);
  white-space: nowrap;
  padding-top: 4px;
  min-width: 28px;
}

.category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-gap-2);
}

.chip {
  padding: 3px 12px;
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info2);
  background: none;
  border: 1px solid transparent;
  border-radius: var(--o-radius-s, 4px);
  cursor: pointer;
  transition:
    color var(--o-duration-m1),
    background var(--o-duration-m1),
    border-color var(--o-duration-m1);
  line-height: 1.6;
}

.chip:hover {
  color: var(--o-color-brand1);
  background: color-mix(in srgb, var(--o-color-brand1) 8%, transparent);
}

.chip.active {
  color: var(--o-color-brand1);
  background: color-mix(in srgb, var(--o-color-brand1) 12%, transparent);
  border-color: var(--o-color-brand1);
  font-weight: 500;
}

.select-group {
  display: flex;
  align-items: center;
  gap: var(--o-gap-2);
}

.filter-select {
  width: 120px;
}

.selected-tags {
  display: flex;
  align-items: center;
  gap: var(--o-gap-1);
  flex-wrap: wrap;
}
</style>
