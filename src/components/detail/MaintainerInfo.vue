<script setup lang="ts">
import { OCard, OLink, OIcon } from '@opensig/opendesign'
import { AppIconMail, AppIconGitee } from '@/icon-components'
import type { MaintainerData } from '@/api/software-detail'

defineProps<{
  data: MaintainerData
}>()
</script>

<template>
  <OCard class="sidebar-card">
    <h3 class="card-title">维护者信息</h3>
    <div class="info-row">
      <span class="info-label">维护者：</span>
      <span class="info-value">{{ data.maintainer }}</span>
    </div>
    <div class="info-row">
      <OIcon :icon="AppIconMail" class="info-icon" />
      <OLink :href="`mailto:${data.email}`" color="primary" size="small">
        {{ data.email }}
      </OLink>
    </div>
    <div class="info-row">
      <OIcon :icon="AppIconGitee" class="info-icon" />
      <OLink :href="data.repoUrl" target="_blank" color="primary" size="small">
        {{ data.repoLabel }}
      </OLink>
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
  gap: var(--o-gap-2);
  margin-bottom: var(--o-gap-3);
  font-size: var(--o-font_size-tip1);
}

.info-label {
  color: var(--o-color-info2);
}

.info-value {
  color: var(--o-color-info1);
}

.info-icon {
  color: var(--o-color-info3);
  font-size: 16px;
  flex-shrink: 0;
}
</style>
