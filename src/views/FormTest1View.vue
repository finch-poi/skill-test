<script setup lang="ts">
import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppSection from '@/components/AppSection.vue'
import FloorStep from '@/components/form-test-1/FloorStep.vue'
import FloorMeeting from '@/components/form-test-1/FloorMeeting.vue'
import FloorTable from '@/components/form-test-1/FloorTable.vue'
</script>

<template>
  <div class="page">
    <AppHeader />

    <AppSection class="form-main-section">
      <template #main>
        <OBreadcrumb class="page-breadcrumb">
          <OBreadcrumbItem>首页</OBreadcrumbItem>
          <OBreadcrumbItem>一级页面</OBreadcrumbItem>
          <OBreadcrumbItem>二级页面</OBreadcrumbItem>
          <OBreadcrumbItem>三级页面</OBreadcrumbItem>
          <OBreadcrumbItem>四级页</OBreadcrumbItem>
          <OBreadcrumbItem>当前页面</OBreadcrumbItem>
        </OBreadcrumb>

        <div class="content-card">
          <FloorStep />
          <FloorMeeting />
          <FloorTable />
        </div>
      </template>
    </AppSection>

    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--o-color-fill1);
}

.form-main-section {
  flex: 1;

  :deep(.section-wrapper) {
    margin-top: 0;
    padding-top: var(--o-r-gap-4);
    padding-bottom: var(--o-r-gap-4);
  }
}

.page-breadcrumb {
  margin-bottom: var(--o-r-gap-4);
}

.content-card {
  padding: var(--o-r-gap-6) var(--o-r-gap-8);
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
}
</style>
