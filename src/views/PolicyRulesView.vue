<script setup lang="ts">
import { ref, watch } from 'vue'
import { fetchPolicyList } from '@/api/policy-rules'
import type { PolicyQueryParams } from '@/api/policy-rules'
import { useAbortableRequest } from '@/composables/useAbortableRequest'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import PolicyBanner from '@/components/policy-rules/PolicyBanner.vue'
import PolicyAnchorTabs from '@/components/policy-rules/PolicyAnchorTabs.vue'
import PolicyFilter from '@/components/policy-rules/PolicyFilter.vue'
import PolicyCardGrid from '@/components/policy-rules/PolicyCardGrid.vue'
import type { FilterState } from '@/components/policy-rules/PolicyFilter.vue'
import type { AnchorItem } from '@/components/policy-rules/PolicyAnchorTabs.vue'

// 锚点导航
const anchors: AnchorItem[] = [
  { id: 'sec-all', label: '一级锚点' },
  { id: 'sec-main', label: '一级锚点（选中）' },
  { id: 'sec-more', label: '一级锚点' },
]
const activeAnchor = ref('sec-main')

// 筛选状态
const filter = ref<FilterState>({
  category: '全部',
  time: '',
  author: '',
  tags: [],
})

// 分页状态
const page = ref(1)
const pageSize = ref(20)

// 数据请求
const { data, loading, execute } = useAbortableRequest(fetchPolicyList)

function buildParams(): PolicyQueryParams {
  return {
    page: page.value,
    pageSize: pageSize.value,
    category: filter.value.category,
    time: filter.value.time || undefined,
    author: filter.value.author || undefined,
    tags: filter.value.tags.length > 0 ? filter.value.tags : undefined,
  }
}

function load() {
  execute(buildParams())
}

// 筛选变化时重置页码
function onFilterChange() {
  page.value = 1
  load()
}

function onPageChange(p: number) {
  page.value = p
  load()
}

function onPageSizeChange(s: number) {
  pageSize.value = s
  page.value = 1
  load()
}

// 初始加载
load()
</script>

<template>
  <div class="policy-page">
    <AppHeader />

    <PolicyBanner />

    <PolicyAnchorTabs
      v-model="activeAnchor"
      :anchors="anchors"
    />

    <main class="page-main">
      <div class="page-inner">
        <!-- 筛选区 -->
        <section id="sec-main" class="filter-section">
          <PolicyFilter v-model="filter" @change="onFilterChange" />
        </section>

        <!-- 卡片网格 -->
        <section id="sec-all" class="grid-section">
          <PolicyCardGrid
            :items="data?.list ?? []"
            :loading="loading"
            :total="data?.total ?? 0"
            :page="page"
            :page-size="pageSize"
            @update:page="onPageChange"
            @update:page-size="onPageSizeChange"
          />
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.policy-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-main {
  flex: 1;
  padding: var(--o-gap-7, 40px) 0;
}

.page-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-7, 40px);
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-6);
}

.filter-section {
  /* 锚点滚动时留出顶部导航高度 */
  scroll-margin-top: 100px;
}

.grid-section {
  scroll-margin-top: 100px;
}
</style>
