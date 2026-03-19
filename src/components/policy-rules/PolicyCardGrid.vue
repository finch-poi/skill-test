<script setup lang="ts">
import { OPagination, OSkeleton } from '@opensig/opendesign'
import type { PolicyItem } from '@/api/policy-rules'
import PolicyCard from './PolicyCard.vue'

defineProps<{
  items: PolicyItem[]
  loading: boolean
  total: number
  page: number
  pageSize: number
}>()

const emit = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [size: number]
}>()
</script>

<template>
  <section class="card-grid-section">
    <!-- 骨架屏 -->
    <div v-if="loading" class="card-grid">
      <div v-for="i in pageSize" :key="i" class="skeleton-card">
        <OSkeleton animated style="height: 180px; border-radius: 8px 8px 0 0" />
        <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px">
          <OSkeleton animated style="height: 20px; width: 80%" />
          <OSkeleton animated style="height: 14px" />
          <OSkeleton animated style="height: 14px" />
          <OSkeleton animated style="height: 14px; width: 60%" />
        </div>
      </div>
    </div>

    <!-- 卡片列表 -->
    <div v-else-if="items.length > 0" class="card-grid">
      <PolicyCard v-for="item in items" :key="item.id" :item="item" />
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <span class="empty-icon">📄</span>
      <p>暂无匹配的内容</p>
    </div>

    <!-- 分页 -->
    <div v-if="total > 0" class="pagination-bar">
      <span class="total-text">共 {{ total }} 条数据</span>
      <OPagination
        :total="total"
        :page-size="pageSize"
        :current="page"
        :page-sizes="[20, 50, 100]"
        show-page-size
        show-jumper
        @current-change="(p: number) => emit('update:page', p)"
        @page-size-change="(s: number) => emit('update:pageSize', s)"
      />
    </div>
  </section>
</template>

<style scoped>
.card-grid-section {
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-6);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--o-gap-5);
}

.skeleton-card {
  border-radius: var(--o-radius-m, 8px);
  overflow: hidden;
  border: 1px solid var(--o-color-control3);
  background: var(--o-color-fill1);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  gap: var(--o-gap-3);
  color: var(--o-color-info3);
}

.empty-icon {
  font-size: 48px;
  opacity: 0.4;
}

.empty-state p {
  font-size: var(--o-font_size-text1);
  margin: 0;
}

.pagination-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--o-gap-5);
  padding: var(--o-gap-4) 0;
}

.total-text {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info2);
  white-space: nowrap;
}

@media (max-width: 960px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
