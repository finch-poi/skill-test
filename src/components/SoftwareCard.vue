<script setup lang="ts">
import { OCard, OTag, OIcon } from '@opensig/opendesign'
import { useRouter } from 'vue-router'
import type { SoftwareItem } from '@/api/software'
import { AppIconDomainFilter } from '@/icon-components'

const props = defineProps<{
  item: SoftwareItem
}>()

const router = useRouter()

function goToDetail() {
  router.push({ name: 'software-detail', params: { name: props.item.name.toLowerCase() } })
}
</script>

<template>
  <OCard class="software-card" @click="goToDetail">
    <div class="card-header">
      <h3 class="card-title">{{ item.name }}</h3>
      <div class="card-icon" :style="{ backgroundColor: item.iconBg }">
        <span>{{ item.icon }}</span>
      </div>
    </div>
    <p class="card-desc">{{ item.description }}</p>
    <div class="card-footer">
      <OTag size="small" color="normal">
        <template #icon>
          <OIcon :icon="AppIconDomainFilter" />
        </template>
        {{ item.domain }}
      </OTag>
    </div>
  </OCard>
</template>

<style scoped>
.software-card {
  cursor: pointer;
  transition: box-shadow var(--o-duration-m1) var(--o-easing-standard);
}

.software-card:hover {
  box-shadow: var(--o-shadow-2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--o-gap-3);
}

.card-title {
  font-size: var(--o-font_size-h4);
  font-weight: 500;
  color: var(--o-color-info1);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--o-radius-s);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.card-desc {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info2);
  line-height: var(--o-line_height-tip1);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: var(--o-gap-3);
}

.card-footer {
  display: flex;
  align-items: center;
}
</style>
