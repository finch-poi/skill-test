<script setup lang="ts">
import { OLink, OIcon, OCard } from '@opensig/opendesign'
import { OIconLink } from '@opensig/opendesign'
import type { SoftwareDetailInfo } from '@/api/software-detail'

defineProps<{
  info: SoftwareDetailInfo
}>()
</script>

<template>
  <OCard class="overview-card">
    <div class="overview-content">
      <div class="overview-logo">
        <img :src="info.icon" :alt="info.name" class="logo-img" />
      </div>
      <div class="overview-info">
        <div class="overview-header">
          <h1 class="overview-name">{{ info.name }}</h1>
          <OLink :href="info.externalLink" target="_blank" color="primary" size="small">
            <OIcon :icon="OIconLink" />
            主页
          </OLink>
        </div>
        <p class="overview-desc">{{ info.description }}</p>
        <OLink color="normal" size="small">
          <span>✏ 我要反馈</span>
        </OLink>
      </div>
    </div>
  </OCard>
</template>

<style scoped>
.overview-card {
  padding: var(--o-gap-6);
}

.overview-content {
  display: flex;
  gap: var(--o-gap-6);
}

.overview-logo {
  width: 160px;
  height: 120px;
  flex-shrink: 0;
  background-color: var(--o-color-fill3);
  border-radius: var(--o-radius-s);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-img {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.overview-info {
  flex: 1;
  min-width: 0;
}

.overview-header {
  display: flex;
  align-items: center;
  gap: var(--o-gap-3);
  margin-bottom: var(--o-gap-3);
}

.overview-name {
  font-size: var(--o-font_size-h3);
  font-weight: 500;
  color: var(--o-color-info1);
}

.overview-desc {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info2);
  line-height: var(--o-line_height-tip1);
  margin-bottom: var(--o-gap-3);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
