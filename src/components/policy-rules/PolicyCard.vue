<script setup lang="ts">
import { OCard, OTag } from '@opensig/opendesign'
import type { PolicyItem } from '@/api/policy-rules'

defineProps<{
  item: PolicyItem
}>()
</script>

<template>
  <OCard
    :cover="item.cover"
    :cover-ratio="5 / 3"
    cover-fit="cover"
    :title="item.title"
    :title-row="2"
    :title-max-row="2"
    :detail="item.summary"
    :detail-max-row="3"
    text-overflow="ellipsis"
    hoverable
    cursor="pointer"
    class="policy-card"
  >
    <template #footer>
      <span class="meta-author">{{ item.author }}</span>
      <span class="meta-date">{{ item.date }}</span>
      <div class="meta-tags">
        <OTag v-for="tag in item.tags.slice(0, 2)" :key="tag" size="small" color="normal">
          {{ tag }}
        </OTag>
      </div>
    </template>
  </OCard>
</template>

<style scoped>
.policy-card {
  width: 100%;
}

.meta-author,
.meta-date {
  font-size: 12px;
  color: var(--o-color-info3);
  white-space: nowrap;
}

.meta-tags {
  display: flex;
  gap: var(--o-gap-1);
  margin-left: auto;
}
</style>
