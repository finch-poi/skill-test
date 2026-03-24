<script setup lang="ts">
// 设计稿 ID：5:8096（Pixso item-id，分页）
import { ref } from 'vue'
import { OPagination } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// Light - All variant
const pageAllLight = ref(1)
const pageSizeAllLight = ref(20)

// Light - Simple variant
const pageSimpleLight = ref(12)

// Dark - All variant
const pageAllDark = ref(1)
const pageSizeAllDark = ref(20)

// Dark - Simple variant
const pageSimpleDark = ref(12)
</script>

<template>
  <AppSection
    title="OPagination 分页"
    subtitle="设计稿 ID：5:8096 · 覆盖 All/Simply × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="pagination-row-light">
        <div class="theme-label">Light</div>

        <!-- All variant: full layout -->
        <div class="pagination-card">
          <div class="pagination-label">完整布局（All）— 含总数、每页条数、页码、跳转</div>
          <OPagination
            v-model:page="pageAllLight"
            v-model:page-size="pageSizeAllLight"
            :total="120"
            :layout="['total', 'pagesize', 'pager', 'jumper']"
            :page-sizes="[10, 20, 50, 100]"
            :show-page-count="9"
            data-testid="pagination-all-light"
          >
            <template #total="{ total }">
              共 {{ total }} 条数据
            </template>
          </OPagination>
        </div>

        <!-- Simple variant -->
        <div class="pagination-card">
          <div class="pagination-label">简洁模式（Simply）— 仅上下页 + 当前页/总页数</div>
          <OPagination
            v-model:page="pageSimpleLight"
            :total="100"
            :page-size="10"
            simple
            data-testid="pagination-simple-light"
          />
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="pagination-row-dark">
        <div class="theme-label">Dark</div>

        <!-- All variant dark -->
        <div class="pagination-card">
          <div class="pagination-label">完整布局（All）— 含总数、每页条数、页码、跳转</div>
          <OPagination
            v-model:page="pageAllDark"
            v-model:page-size="pageSizeAllDark"
            :total="120"
            :layout="['total', 'pagesize', 'pager', 'jumper']"
            :page-sizes="[10, 20, 50, 100]"
            :show-page-count="9"
            data-testid="pagination-all-dark"
          >
            <template #total="{ total }">
              共 {{ total }} 条数据
            </template>
          </OPagination>
        </div>

        <!-- Simple variant dark -->
        <div class="pagination-card">
          <div class="pagination-label">简洁模式（Simply）— 仅上下页 + 当前页/总页数</div>
          <OPagination
            v-model:page="pageSimpleDark"
            :total="100"
            :page-size="10"
            simple
            data-testid="pagination-simple-dark"
          />
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.floor-body {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-6);
}

// ---- 主题区块 ----
.theme-section {
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-5);
}

.theme-section--dark {
  background: #1f2127;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
}

.theme-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

// ---- 每个分页 demo 卡片 ----
.pagination-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

// ---- 标签 ----
.pagination-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}
</style>
