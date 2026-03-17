<script setup lang="ts">
import { OCard } from '@opensig/opendesign'
import type { ComplianceData } from '@/api/software-detail'

defineProps<{
  data: ComplianceData
}>()
</script>

<template>
  <OCard class="sidebar-card">
    <h3 class="card-title">软件合规</h3>
    <div class="info-row">
      <span class="info-label">License</span>
      <span class="info-value">{{ data.license }}</span>
    </div>
  </OCard>
</template>

<style scoped>
.sidebar-card {
  padding: var(--o-gap-5);
}

.card-title {
  font-size: var(--o-font_size-h5);
  font-weight: 500;
  color: var(--o-color-info1);
  margin-bottom: var(--o-gap-4);
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
}
</style>
