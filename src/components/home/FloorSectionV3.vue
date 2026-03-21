<script setup lang="ts">
import { ref } from 'vue'
import { OTab, OTabPane, OCard } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

interface NewsItem {
  id: number
  cover: string
  title: string
  date: string
}

const activeTab = ref('latest')

const tabs = [
  { value: 'latest', label: '最新发布' },
  { value: 'industry', label: '产业资讯' },
  { value: 'activity', label: '精彩活动' },
  { value: 'tech', label: '技术干货' },
]

function makeList(seed: number, title: string, date: string): NewsItem[] {
  return Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    cover: `https://picsum.photos/seed/${seed + i}/332/249`,
    title: `${title}标题文本标题文本标题文本标题文本`,
    date,
  }))
}

const newsData: Record<string, NewsItem[]> = {
  latest: makeList(10, '最新发布', '2026/03/16'),
  industry: makeList(20, '产业资讯', '2026/03/15'),
  activity: makeList(30, '精彩活动', '2026/03/14'),
  tech: makeList(40, '技术干货', '2026/03/13'),
}
</script>

<template>
  <AppSection title="最新动态，了解更多进展" class="floor-section-v3">
    <OTab v-model="activeTab" variant="text" size="medium" class="section-tabs">
      <OTabPane
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        :label="tab.label"
      >
        <div class="card-scroll-area">
          <div class="card-list">
            <OCard
              v-for="item in newsData[tab.value]"
              :key="item.id"
              :cover="item.cover"
              :cover-ratio="332 / 249"
              :title="item.title"
              :title-row="2"
              :title-max-row="2"
              :detail="item.date"
              hoverable
              class="news-card"
            />
          </div>
        </div>
      </OTabPane>
    </OTab>
  </AppSection>
</template>

<style lang="scss" scoped>
.floor-section-v3 {
  background: var(--o-color-fill2);

  // Always show bottom padding (not just when :last-child)
  :deep(.section-wrapper) {
    padding-bottom: var(--o-r-gap-10);
  }
}

.section-tabs {
  // Tab nav center align
  :deep(.o-tab-navs) {
    justify-content: center;
  }
}

.card-scroll-area {
  overflow-x: auto;
  padding: var(--o-r-gap-5) 0;

  @include scrollbar;
}

.card-list {
  display: flex;
  gap: var(--o-r-gap-6);
  // Don't wrap — horizontal scroll
  width: max-content;
}

.news-card {
  flex-shrink: 0;
  width: 348px;
  border-radius: 16px;

  // Floating image effect: inner padding in cover area
  :deep(.o-card-cover) {
    padding: var(--o-r-gap-2) var(--o-r-gap-2) 0;
  }

  // Image border-radius to match inner padding
  :deep(.o-figure) {
    border-radius: 12px;
  }
}
</style>
