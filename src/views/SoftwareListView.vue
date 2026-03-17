<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import {
  OTab,
  OTabPane,
  OInput,
  OCheckbox,
  OCheckboxGroup,
  OPagination,
  OIcon,
  OLink,
  ODivider,
  OIconSearch,
} from '@opensig/opendesign'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SoftwareCard from '@/components/SoftwareCard.vue'
import { fetchSoftwareList } from '@/api/software'
import type { SoftwareQueryParams } from '@/api/software'
import { useAbortableRequest } from '@/composables/useAbortableRequest'
import { AppIconVersionFilter, AppIconArchFilter, AppIconDomainFilter } from '@/icon-components'

// 标签页
const activeTab = ref('image')

// 版本筛选
const versionOptions = [
  'openEuler-24.03-LTS',
  'openEuler-22.03-LTS-SP4',
  'openEuler-22.03-LTS-SP3',
  'openEuler-22.03-LTS-SP2',
  'openEuler-22.03-LTS-SP1',
]
const selectedVersions = ref<string[]>([])
const showAllVersions = ref(false)

// 架构筛选
const archOptions = ['aarch64', 'x86_64']
const selectedArchs = ref<string[]>([])

// 领域筛选
const domainOptions = ['大数据', 'AI', '分布式存储', '数据库', '云服务']
const selectedDomains = ref<string[]>([])
const showAllDomains = ref(false)

// 搜索
const searchQuery = ref('')

// 分页
const currentPage = ref(1)
const pageSize = ref(20)

// API 请求（自动取消前一次请求，避免竞态）
const { data: softwareData, loading, execute: fetchList } = useAbortableRequest(fetchSoftwareList)

function buildQueryParams(): SoftwareQueryParams {
  return {
    keyword: searchQuery.value || undefined,
    versions: selectedVersions.value.length > 0 ? selectedVersions.value : undefined,
    archs: selectedArchs.value.length > 0 ? selectedArchs.value : undefined,
    domains: selectedDomains.value.length > 0 ? selectedDomains.value : undefined,
    tab: activeTab.value,
    page: currentPage.value,
    pageSize: pageSize.value,
  }
}

function loadData() {
  fetchList(buildQueryParams())
}

// 搜索防抖
let debounceTimer: ReturnType<typeof setTimeout> | null = null
function debouncedLoad() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    currentPage.value = 1
    loadData()
  }, 300)
}

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

// 搜索输入防抖触发
watch(searchQuery, () => {
  debouncedLoad()
})

// 筛选条件变更立即触发（重置页码）
watch([selectedVersions, selectedArchs, selectedDomains, activeTab], () => {
  currentPage.value = 1
  loadData()
})

// 分页变更立即触发
watch([currentPage, pageSize], () => {
  loadData()
})

// 初始加载
loadData()
</script>

<template>
  <div class="software-list-page">
    <AppHeader active-nav="software-list" />

    <!-- Banner -->
    <section class="banner">
      <div class="banner-inner">
        <h1 class="banner-title">软件列表</h1>
      </div>
    </section>

    <!-- 标签页 -->
    <section class="tab-section">
      <OTab v-model="activeTab" class="software-tabs">
        <OTabPane label="RPM" value="rpm" />
        <OTabPane label="应用镜像" value="image" />
        <OTabPane label="OEPKG" value="oepkg" />
        <OTabPane label="CONDA" value="conda" />
      </OTab>
      <p class="tab-description">
        一系列基于openEuler操作系统安装特定应用的应用镜像，提供开箱即用的部署体验
      </p>
    </section>

    <!-- 主内容区 -->
    <section class="main-content">
      <div class="content-inner">
        <!-- 左侧筛选 -->
        <aside class="sidebar">
          <!-- 版本筛选 -->
          <div class="filter-group">
            <div class="filter-title">
              <OIcon :icon="AppIconVersionFilter" />
              <span>openEuler版本选择</span>
            </div>
            <OCheckboxGroup v-model="selectedVersions" direction="v">
              <OCheckbox
                v-for="v in showAllVersions ? versionOptions : versionOptions.slice(0, 5)"
                :key="v"
                :value="v"
              >
                {{ v }}
              </OCheckbox>
            </OCheckboxGroup>
            <OLink
              v-if="versionOptions.length > 5"
              color="primary"
              class="show-all-link"
              @click="showAllVersions = !showAllVersions"
            >
              {{ showAllVersions ? '收起' : '显示全部' }} ∨
            </OLink>
          </div>

          <ODivider />

          <!-- 架构筛选 -->
          <div class="filter-group">
            <div class="filter-title">
              <OIcon :icon="AppIconArchFilter" />
              <span>架构</span>
            </div>
            <OCheckboxGroup v-model="selectedArchs" direction="v">
              <OCheckbox v-for="a in archOptions" :key="a" :value="a">
                {{ a }}
              </OCheckbox>
            </OCheckboxGroup>
          </div>

          <ODivider />

          <!-- 领域筛选 -->
          <div class="filter-group">
            <div class="filter-title">
              <OIcon :icon="AppIconDomainFilter" />
              <span>领域</span>
            </div>
            <OCheckboxGroup v-model="selectedDomains" direction="v">
              <OCheckbox
                v-for="d in showAllDomains ? domainOptions : domainOptions.slice(0, 5)"
                :key="d"
                :value="d"
              >
                {{ d }}
              </OCheckbox>
            </OCheckboxGroup>
            <OLink
              v-if="domainOptions.length > 5"
              color="primary"
              class="show-all-link"
              @click="showAllDomains = !showAllDomains"
            >
              {{ showAllDomains ? '收起' : '显示全部' }} ∨
            </OLink>
          </div>
        </aside>

        <!-- 右侧内容 -->
        <div class="content-right">
          <!-- 搜索框 -->
          <OInput
            v-model="searchQuery"
            placeholder="搜索应用镜像"
            class="search-input"
          >
            <template #prepend>
              <OIcon :icon="OIconSearch" />
            </template>
          </OInput>

          <!-- 加载状态 -->
          <div v-if="loading" class="loading-state">加载中...</div>

          <!-- 软件卡片网格 -->
          <div v-else class="card-grid">
            <SoftwareCard
              v-for="(item, index) in softwareData?.list"
              :key="`${item.name}-${index}`"
              :item="item"
            />
            <div v-if="softwareData && softwareData.list.length === 0" class="empty-state">
              暂无匹配的软件
            </div>
          </div>

          <!-- 分页 -->
          <div class="pagination-wrapper">
            <OPagination
              v-model:page="currentPage"
              v-model:page-size="pageSize"
              :total="softwareData?.total ?? 0"
              show-size-changer
              :page-sizes="[20, 50, 100]"
            />
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.software-list-page {
  min-height: 100vh;
  background-color: var(--o-color-fill1);
  color: var(--o-color-info1);
}

/* Banner */
.banner {
  background: linear-gradient(135deg, #002fa7 0%, #0045d1 100%);
  padding: var(--o-gap-8) 0;
}

.banner-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-5);
}

.banner-title {
  color: #fff;
  font-size: var(--o-font_size-display2);
  font-weight: 500;
}

/* Tab Section */
.tab-section {
  background-color: var(--o-color-fill2);
  padding-top: var(--o-gap-5);
  text-align: center;
}

.software-tabs {
  max-width: 1416px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.tab-description {
  font-size: var(--o-font_size-text1);
  color: var(--o-color-info2);
  padding: var(--o-gap-5) 0;
  background-color: var(--o-color-fill1);
}

/* Main Content */
.main-content {
  background-color: var(--o-color-fill1);
}

.content-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-5);
  display: flex;
  gap: var(--o-gap-6);
  padding-bottom: var(--o-gap-8);
}

/* Sidebar */
.sidebar {
  width: 240px;
  flex-shrink: 0;
}

.filter-group {
  padding: var(--o-gap-4) 0;
}

.filter-title {
  display: flex;
  align-items: center;
  gap: var(--o-gap-2);
  font-size: var(--o-font_size-text1);
  font-weight: 500;
  color: var(--o-color-info1);
  margin-bottom: var(--o-gap-3);
}

.show-all-link {
  margin-top: var(--o-gap-2);
  font-size: var(--o-font_size-tip1);
}

/* Content Right */
.content-right {
  flex: 1;
  min-width: 0;
}

.search-input {
  margin-bottom: var(--o-gap-5);
  max-width: 400px;
}

/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--o-gap-5);
}

/* Loading / Empty */
.loading-state,
.empty-state {
  text-align: center;
  padding: var(--o-gap-8) 0;
  color: var(--o-color-info3);
  font-size: var(--o-font_size-text1);
}

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  padding: var(--o-gap-7) 0;
}
</style>
