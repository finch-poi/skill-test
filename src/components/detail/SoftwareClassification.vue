<script setup lang="ts">
import { OCard, OLink } from '@opensig/opendesign'
import type { ClassificationData } from '@/api/software-detail'

defineProps<{
  data: ClassificationData
}>()
</script>

<template>
  <OCard class="sidebar-card">
    <div class="card-header">
      <h3 class="card-title">软件分级</h3>
      <OLink :href="data.descriptionLink" target="_blank" color="primary" size="small">
        等级说明
      </OLink>
    </div>
    <div class="info-row">
      <span class="info-label">等级</span>
      <span class="info-value">{{ data.level }}</span>
    </div>
  </OCard>
</template>

<style scoped>
.sidebar-card {
  padding: var(--o-gap-5);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--o-gap-4);
}

.card-title {
  font-size: var(--o-font_size-h5);
  font-weight: 500;
  color: var(--o-color-info1);
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--o-font_size-tip1);
}

.info-label {
  color: var(--o-color-info2);
}

.info-value {
  color: var(--o-color-info1);
  font-weight: 500;
}
</style>
