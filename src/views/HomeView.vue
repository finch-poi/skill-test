<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppSection from '@/components/AppSection.vue'
import FloorSectionV3 from '@/components/home/FloorSectionV3.vue'

const pages = [
  { name: '政策规则', path: '/policy-rules', desc: '政策规则列表页面，含 Banner/锚点/筛选/卡片网格/分页' },
  { name: 'form-test-1', path: '/form-test-1', desc: '多步骤表单页面，含步骤条/表单字段/数据表格' },
  { name: 'document-test-1', path: '/document-test-1', desc: '文档详情页面，含侧边导航/内容区/表格/代码块' },
]
</script>

<template>
  <div class="home-page">
    <AppHeader />

    <!-- 页面索引 -->
    <AppSection class="home-nav-section">
      <template #main>
        <div class="home-inner">
          <h1 class="home-title">页面索引</h1>
          <div class="page-list">
            <a v-for="page in pages" :key="page.path" :href="page.path" class="page-card">
              <span class="page-name">{{ page.name }}</span>
              <span class="page-desc">{{ page.desc }}</span>
            </a>
          </div>
        </div>
      </template>
    </AppSection>

    <!-- section-v3 楼层 -->
    <FloorSectionV3 />

    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--o-color-fill1);
}

.home-nav-section {
  :deep(.section-wrapper) {
    margin-top: 0;
    padding-top: var(--o-r-gap-8);
    padding-bottom: var(--o-r-gap-8);
  }
}

.home-inner {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.home-title {
  margin: 0 0 var(--o-r-gap-6) 0;
  @include h2;
  font-weight: 600;
  color: var(--o-color-info1);
}

.page-list {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.page-card {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-1);
  padding: var(--o-r-gap-5);
  background: var(--o-color-fill2);
  border: 1px solid var(--o-color-control3);
  border-radius: var(--o-radius-m);
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.page-card:hover {
  border-color: var(--o-color-primary1);
  box-shadow: var(--o-shadow-1);
}

.page-name {
  @include text1;
  font-weight: 600;
  color: var(--o-color-primary1);
}

.page-desc {
  @include tip1;
  color: var(--o-color-info3);
}
</style>

