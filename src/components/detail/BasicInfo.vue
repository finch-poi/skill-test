<script setup lang="ts">
import { OCard, OLink } from '@opensig/opendesign'
import type { BasicInfoData } from '@/api/software-detail'

defineProps<{
  data: BasicInfoData
}>()
</script>

<template>
  <OCard class="sidebar-card">
    <h3 class="card-title">基础信息</h3>
    <div class="info-list">
      <div class="info-row">
        <span class="info-label">版本支持情况</span>
        <span class="info-value">{{ data.versionSupport }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">软件包分类</span>
        <span class="info-value">{{ data.category }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">所属仓库</span>
        <OLink :href="data.repoLink" target="_blank" color="primary" size="small">
          {{ data.repo }}
        </OLink>
      </div>
      <div class="info-row">
        <span class="info-label">Repo源</span>
        <span class="info-value">{{ data.repoSource }}</span>
      </div>
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

.info-list {
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-3);
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
