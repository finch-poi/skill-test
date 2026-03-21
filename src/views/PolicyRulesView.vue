<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import {
  OAnchor,
  OAnchorItem,
  OButton,
  OCard,
  OCarousel,
  OCarouselItem,
  OPagination,
  ORadioGroup,
  ORadio,
  OToggle,
  OSelect,
  OOption,
  OInput,
} from '@opensig/opendesign'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getPolicyList, type PolicyCard } from '@/api/policy'

// ─── Banner 轮播数据 ───
const bannerSlides = [
  {
    id: 1,
    title: '政策规则',
    desc: 'openUBMC社区以开放治理为核心，通过选举产生的技术委员会主导技术决策。通过透明的流程运作、开放的技术氛围，保障技术路线公正性和前瞻性。社区倡导「贡献即话语权」，任何开发者均可通过贡献积累晋升为项目维护者或参选技术委员，共同定义openUBMC社区的方向。',
    btnText: '查看更多',
    gradient: 'linear-gradient(135deg, #002fa7 0%, #1a6fe8 50%, #4da6ff 100%)',
  },
  {
    id: 2,
    title: '技术治理',
    desc: '技术委员会负责审议和决策重大技术方向，每季度举行公开会议。所有决议通过邮件列表向社区公示，社区成员可提出异议或建议，保障决策过程的透明与公正。',
    btnText: '了解详情',
    gradient: 'linear-gradient(135deg, #00456b 0%, #006fa8 50%, #00a3d4 100%)',
  },
  {
    id: 3,
    title: '贡献指南',
    desc: '无论您是代码贡献者、文档撰写者还是社区布道师，openUBMC 都欢迎您的参与。通过系统的贡献路径，您可以逐步成长为 SIG 维护者，直至参与技术委员会的选举。',
    btnText: '开始贡献',
    gradient: 'linear-gradient(135deg, #1a0070 0%, #4a00c8 50%, #7b3ff0 100%)',
  },
]

// ─── 锚点 ───
const sections = [
  { id: 'section1', label: '一级锚点' },
  { id: 'section2', label: '一级锚点（选中）' },
  { id: 'section3', label: '一级锚点' },
]

// ─── 分类筛选 ───
const categories = [
  { value: 'all', label: '全部' },
  { value: 'toolchain', label: '工具链/语言/运行' },
  { value: 'arch', label: '架构/处理器/内核/驱动' },
  { value: 'desktop', label: '桌面/图形系统' },
  { value: 'basic', label: '基础功能/特性/工具' },
  { value: 'industry', label: '行业解决方案/应用' },
  { value: 'middleware', label: '通用中间件' },
  { value: 'cloud', label: '云原生基础设施' },
  { value: 'community-org', label: '社区职能组织' },
  { value: 'build', label: '构建系统/工具/依赖' },
  { value: 'ecosystem', label: '社区生态进展' },
  { value: 'package', label: '软件包管理相关' },
  { value: 'release', label: '版本发行相关' },
  { value: 'infra', label: '社区基础设施' },
  { value: 'other', label: '其他' },
]
const activeCategory = ref('all')

// ─── 时间 / 作者 / 标签 ───
const filterTime = ref('')
const filterAuthor = ref('')
const filterTags = ref<string[]>([])
const tagOptions = [
  { value: 'tag1', label: '选项1' },
  { value: 'tag2', label: '选项2' },
  { value: 'tag3', label: '选项3' },
]

// ─── 卡片数据（来自接口） ───
const cards = ref<PolicyCard[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

async function fetchCards() {
  const result = await getPolicyList({
    page: currentPage.value,
    pageSize: pageSize.value,
    category: activeCategory.value,
  })
  cards.value = result.list
  total.value = result.total
}

onMounted(fetchCards)
watch([currentPage, pageSize, activeCategory], fetchCards)
</script>

<template>
  <div class="page-policy-rules">
    <AppHeader />

    <!-- Banner 轮播 -->
    <OCarousel
      effect="toggle"
      :auto-play="true"
      :interval="5000"
      :pause-on-hover="true"
      :indicator-click="true"
      class="banner-carousel"
    >
      <OCarouselItem v-for="slide in bannerSlides" :key="slide.id">
        <div class="banner-slide" :style="{ background: slide.gradient }">
          <div class="banner-inner">
            <div class="banner-content">
              <h1 class="banner-title">{{ slide.title }}</h1>
              <p class="banner-desc">{{ slide.desc }}</p>
              <OButton color="primary" variant="solid" round="pill" class="banner-btn">
                {{ slide.btnText }}
              </OButton>
            </div>
            <div class="banner-illustration" aria-hidden="true" />
          </div>
        </div>
      </OCarouselItem>
    </OCarousel>

    <!-- 锚点导航 -->
    <div class="anchor-nav-wrap" id="anchor-container">
      <OAnchor layout="h" container="#anchor-container" :change-hash="false">
        <OAnchorItem
          v-for="sec in sections"
          :key="sec.id"
          :href="`#${sec.id}`"
          :title="sec.label"
        />
      </OAnchor>
    </div>

    <!-- 主内容 -->
    <main class="main-content">
      <!-- 筛选面板 -->
      <div class="filter-panel">
        <!-- 分类 -->
        <div class="filter-row filter-category">
          <span class="filter-label">分类</span>
          <ORadioGroup v-model="activeCategory" class="category-group">
            <ORadio v-for="cat in categories" :key="cat.value" :value="cat.value">
              <template #radio="{ checked }">
                <OToggle :checked="checked">{{ cat.label }}</OToggle>
              </template>
            </ORadio>
          </ORadioGroup>
        </div>

        <!-- 时间 / 作者 / 标签 -->
        <div class="filter-row filter-secondary">
          <div class="filter-item">
            <span class="filter-label">时间</span>
            <OInput v-model="filterTime" placeholder="全部" class="filter-input" />
          </div>
          <div class="filter-item">
            <span class="filter-label">作者</span>
            <OInput v-model="filterAuthor" placeholder="全部" class="filter-input" />
          </div>
          <div class="filter-item">
            <span class="filter-label">标签</span>
            <OSelect
              v-model="filterTags"
              multiple
              clearable
              placeholder="全部"
              class="filter-tag-select"
            >
              <OOption
                v-for="opt in tagOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </OSelect>
          </div>
        </div>
      </div>

      <!-- 内容区占位锚点 -->
      <div id="section1" />
      <div id="section2" />
      <div id="section3" />

      <!-- 卡片网格 -->
      <div class="card-grid">
        <OCard
          v-for="card in cards"
          :key="card.id"
          :cover="card.cover"
          :cover-ratio="1.7"
          :title="card.title"
          :title-row="2"
          :title-max-row="2"
          :detail="card.detail"
          :detail-row="3"
          :detail-max-row="3"
          hoverable
        />
      </div>

      <!-- 分页 -->
      <div class="pagination-wrap">
        <OPagination
          v-model:page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :layout="['total', 'pagesize', 'pager', 'jumper']"
          :page-sizes="[20, 40, 60]"
        />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page-policy-rules {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--o-color-fill1);
}

/* ─── Banner 轮播 ─── */
.banner-carousel {
  height: 280px;
  /* 指示器在深色背景上用白色 */
  --carousel-indicator-bg-color: rgba(255, 255, 255, 0.4);
  --carousel-indicator-bg-color-selected: #fff;
  --carousel-indicator-bg-color-hover: rgba(255, 255, 255, 0.7);
  /* 箭头在深色背景上用白色 */
  --carousel-arrow-color: rgba(255, 255, 255, 0.8);
  --carousel-arrow-color-hover: #fff;
}

.banner-slide {
  height: 100%;
  overflow: hidden;
}

.banner-inner {
  height: 100%;
  max-width: 1488px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--o-r-gap-9);
}

.banner-content {
  flex: 1;
  color: #fff;
}

.banner-title {
  font-size: var(--o-r-font_size-display2);
  font-weight: 700;
  margin: 0 0 var(--o-r-gap-2);
  line-height: 1.2;
}

.banner-desc {
  font-size: var(--o-r-font_size-text2);
  line-height: 1.7;
  margin: 0 0 var(--o-r-gap-5);
  opacity: 0.9;
}

.banner-illustration {
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  background: url('https://openeuler.org/images/policy-rules/banner-illus.svg') no-repeat center/contain;
}

/* ─── 锚点导航 ─── */
.anchor-nav-wrap {
  background: var(--o-color-fill2);
  border-bottom: 1px solid var(--o-color-control1);
}

/* ─── 主内容 ─── */
.main-content {
  flex: 1;
  max-width: 1488px;
  width: 100%;
  margin: 0 auto;
  padding: var(--o-r-gap-7) 0 var(--o-r-gap-7);
}

/* ─── 筛选面板 ─── */
.filter-panel {
  background: var(--o-color-fill2);
  border-radius: 4px;
  padding: var(--o-r-gap-5) var(--o-r-gap-6);
  margin-bottom: var(--o-r-gap-7);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-5);
}

.filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--o-r-gap-3);
}

.filter-label {
  font-size: var(--o-r-font_size-text1);
  color: var(--o-color-info2);
  white-space: nowrap;
  padding-top: var(--o-r-gap-1);
  min-width: 32px;
}

.category-group {
  display: flex;
  flex-wrap: wrap;
  --radio-group-gap: var(--o-r-gap-2);
}

.filter-secondary {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-5);
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-2);
}

.filter-input {
  width: 120px;
}

.filter-tag-select {
  width: 200px;
}

/* ─── 卡片网格 ─── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--o-r-gap-5) var(--o-r-gap-6);
  margin-bottom: var(--o-r-gap-6);
}

/* ─── 分页 ─── */
.pagination-wrap {
  display: flex;
  justify-content: center;
}
</style>
