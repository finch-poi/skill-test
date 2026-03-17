<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { OBreadcrumb, OBreadcrumbItem, OTab, OTabPane } from '@opensig/opendesign'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SoftwareOverview from '@/components/detail/SoftwareOverview.vue'
import InstallGuide from '@/components/detail/InstallGuide.vue'
import MoreInfoTable from '@/components/detail/MoreInfoTable.vue'
import FeedbackForm from '@/components/detail/FeedbackForm.vue'
import FeedbackHistory from '@/components/detail/FeedbackHistory.vue'
import MaintainerInfo from '@/components/detail/MaintainerInfo.vue'
import BasicInfo from '@/components/detail/BasicInfo.vue'
import SoftwareClassification from '@/components/detail/SoftwareClassification.vue'
import SoftwareCompliance from '@/components/detail/SoftwareCompliance.vue'
import VersionSupportTable from '@/components/detail/VersionSupportTable.vue'
import { useAbortableRequest } from '@/composables/useAbortableRequest'
import { fetchSoftwareDetail } from '@/api/software-detail'

const route = useRoute()
const softwareName = computed(() => route.params.name as string)

const activeTab = ref('rpm')

const {
  data: detail,
  loading,
  execute: loadDetail,
} = useAbortableRequest(fetchSoftwareDetail)

function load() {
  loadDetail({ name: softwareName.value })
}

watch(softwareName, () => load())
load()
</script>

<template>
  <div class="detail-page">
    <AppHeader active-nav="software-list" />

    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="breadcrumb-inner">
        <OBreadcrumb>
          <OBreadcrumbItem to="/">软件中心</OBreadcrumbItem>
          <OBreadcrumbItem to="/">RPM</OBreadcrumbItem>
          <OBreadcrumbItem>{{ detail?.info.name ?? softwareName }}</OBreadcrumbItem>
        </OBreadcrumb>
      </div>
    </section>

    <!-- Tab Section -->
    <section class="tab-section">
      <OTab v-model="activeTab" class="detail-tabs">
        <OTabPane label="RPM" value="rpm" />
        <OTabPane label="容器镜像" value="image" />
        <OTabPane label="EPKG" value="epkg" />
        <OTabPane label="OEPKG" value="oepkg" />
      </OTab>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">加载中...</div>

    <!-- Detail Content -->
    <section v-else-if="detail" class="detail-body">
      <div class="detail-content">
        <!-- Left Main Column -->
        <main class="main-column">
          <SoftwareOverview :info="detail.info" />

          <div class="version-section">
            <h2 class="version-number">{{ detail.info.version }}</h2>
          </div>

          <InstallGuide :methods="detail.installMethods" />
          <MoreInfoTable :data="detail.moreInfo" />
          <FeedbackForm :software-name="detail.info.name" />
          <FeedbackHistory :software-name="detail.info.name" />
        </main>

        <!-- Right Sidebar -->
        <aside class="sidebar-column">
          <MaintainerInfo :data="detail.maintainer" />
          <BasicInfo :data="detail.basicInfo" />
          <SoftwareClassification :data="detail.classification" />
          <SoftwareCompliance :data="detail.compliance" />
          <VersionSupportTable
            :rows="detail.versionSupport"
            :software-name="detail.info.name"
          />
        </aside>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  background-color: var(--o-color-fill1);
  color: var(--o-color-info1);
}

/* Breadcrumb */
.breadcrumb-section {
  background-color: var(--o-color-fill2);
}

.breadcrumb-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: var(--o-gap-3) var(--o-gap-5);
}

/* Tab Section */
.tab-section {
  background-color: var(--o-color-fill2);
  border-bottom: 1px solid var(--o-color-control4);
}

.detail-tabs {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-5);
}

/* Loading */
.loading-state {
  text-align: center;
  padding: var(--o-gap-8) 0;
  color: var(--o-color-info3);
  font-size: var(--o-font_size-text1);
}

/* Detail Body */
.detail-body {
  background-color: var(--o-color-fill1);
}

.detail-content {
  max-width: 1416px;
  margin: 0 auto;
  padding: var(--o-gap-6) var(--o-gap-5);
  display: flex;
  gap: var(--o-gap-6);
  align-items: flex-start;
}

.main-column {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-6);
}

.sidebar-column {
  width: 380px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-5);
}

/* Version Section */
.version-section {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-s);
  padding: var(--o-gap-5) var(--o-gap-6);
}

.version-number {
  font-size: var(--o-font_size-h3);
  font-weight: 500;
  color: var(--o-color-info1);
}
</style>
