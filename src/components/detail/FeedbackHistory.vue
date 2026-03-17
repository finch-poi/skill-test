<script setup lang="ts">
import { ref, watch } from 'vue'
import { OTab, OTabPane, OLink, OTag, OIcon, ODivider } from '@opensig/opendesign'
import { OIconChevronRight } from '@opensig/opendesign'
import { useAbortableRequest } from '@/composables/useAbortableRequest'
import { fetchFeedbackHistory } from '@/api/software-detail'

const props = defineProps<{
  softwareName: string
}>()

const activeStatus = ref('全部')
const statusOptions = ['全部', '待分析', '进行中', '已完成', '已驳回']

const { data: feedbackData, execute: loadFeedback } = useAbortableRequest(fetchFeedbackHistory)

function load() {
  loadFeedback({ name: props.softwareName, status: activeStatus.value })
}

watch(activeStatus, () => load())
load()

function getStatusColor(status: string) {
  switch (status) {
    case '已完成':
      return 'success'
    case '进行中':
      return 'primary'
    case '已驳回':
      return 'danger'
    default:
      return 'normal'
  }
}
</script>

<template>
  <div class="feedback-history">
    <div class="history-header">
      <h2 class="section-title">历史反馈信息 ⓘ</h2>
    </div>

    <div class="history-filters">
      <span class="filter-label">共{{ feedbackData?.total ?? 0 }}条反馈信息</span>
      <OTab v-model="activeStatus" variant="text" size="small" class="status-tabs">
        <OTabPane v-for="s in statusOptions" :key="s" :label="s" :value="s" />
      </OTab>
      <span class="sort-label">最新 ↓</span>
    </div>

    <ODivider />

    <div class="history-list">
      <div v-for="item in feedbackData?.list" :key="item.id" class="history-item">
        <div class="item-header">
          <span class="item-title">{{ item.title }}</span>
          <OTag v-for="tag in item.tags" :key="tag" size="small" color="danger" variant="solid">
            {{ tag }}
          </OTag>
        </div>
        <p class="item-desc">{{ item.description }}</p>
        <div class="item-footer">
          <span class="item-meta">👤 {{ item.author }}</span>
          <OLink color="primary" size="small">
            查看详情
            <OIcon :icon="OIconChevronRight" />
          </OLink>
        </div>
        <ODivider />
      </div>
      <div v-if="feedbackData && feedbackData.list.length === 0" class="empty">
        暂无反馈记录
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-history {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-s);
  padding: var(--o-gap-6);
}

.section-title {
  font-size: var(--o-font_size-h4);
  font-weight: 500;
  color: var(--o-color-info1);
}

.history-filters {
  display: flex;
  align-items: center;
  gap: var(--o-gap-3);
  margin-bottom: var(--o-gap-3);
  flex-wrap: wrap;
}

.filter-label {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info2);
  margin-right: var(--o-gap-2);
}

.status-tabs {
  flex: 1;
}

.sort-label {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info2);
  margin-left: auto;
}

.history-list {
  display: flex;
  flex-direction: column;
}

.history-item {
  padding: var(--o-gap-3) 0;
}

.item-header {
  display: flex;
  align-items: center;
  gap: var(--o-gap-2);
  margin-bottom: var(--o-gap-2);
}

.item-title {
  font-size: var(--o-font_size-text1);
  font-weight: 500;
  color: var(--o-color-info1);
}

.item-desc {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info3);
  line-height: var(--o-line_height-tip1);
  margin-bottom: var(--o-gap-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-meta {
  font-size: var(--o-font_size-tip2);
  color: var(--o-color-info3);
}

.empty {
  text-align: center;
  padding: var(--o-gap-6) 0;
  color: var(--o-color-info3);
  font-size: var(--o-font_size-tip1);
}
</style>
