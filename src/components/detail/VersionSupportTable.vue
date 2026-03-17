<script setup lang="ts">
import { ref, computed } from 'vue'
import { OCard, OTag, OLink, OIcon } from '@opensig/opendesign'
import { OIconChevronDown } from '@opensig/opendesign'
import type { VersionSupportRow } from '@/api/software-detail'

const props = defineProps<{
  rows: VersionSupportRow[]
  softwareName: string
}>()

const showAll = ref(false)
const defaultShowCount = 6

const displayRows = computed(() => {
  if (showAll.value) return props.rows
  return props.rows.slice(0, defaultShowCount)
})

const hasMore = computed(() => props.rows.length > defaultShowCount)

// Merge cells for the same eulerVersion
function getRowSpan(index: number): number | undefined {
  const row = displayRows.value[index]
  if (!row) return undefined
  if (index > 0 && displayRows.value[index - 1]?.eulerVersion === row.eulerVersion) {
    return 0
  }
  let span = 1
  for (let i = index + 1; i < displayRows.value.length; i++) {
    if (displayRows.value[i]?.eulerVersion === row.eulerVersion) {
      span++
    } else {
      break
    }
  }
  return span
}
</script>

<template>
  <OCard class="sidebar-card">
    <h3 class="card-title">{{ softwareName }}版本支持情况</h3>
    <table class="version-table">
      <thead>
        <tr>
          <th>openEuler版本</th>
          <th>架构</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in displayRows" :key="row.id">
          <td v-if="getRowSpan(index)" :rowspan="getRowSpan(index)" class="version-cell">
            {{ row.eulerVersion }}
          </td>
          <td>{{ row.arch }}</td>
          <td>
            <OTag v-if="row.isCurrent" size="small" color="primary" variant="solid">
              当前版本
            </OTag>
            <OLink v-else color="primary" size="small">查看</OLink>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="hasMore" class="show-all">
      <OLink color="primary" size="small" @click="showAll = !showAll">
        {{ showAll ? '收起' : '显示全部' }}
        <OIcon
          :icon="OIconChevronDown"
          :style="{ transform: showAll ? 'rotate(180deg)' : '', transition: 'transform 0.2s' }"
        />
      </OLink>
    </div>
  </OCard>
</template>

<style scoped>
.sidebar-card {
  padding: var(--o-gap-5);
}

.card-title {
  font-size: var(--o-font_size-h5);
  font-weight: 500;
  color: var(--o-color-info1);
  margin-bottom: var(--o-gap-4);
}

.version-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--o-font_size-tip1);
}

.version-table th {
  background-color: var(--o-color-fill3);
  color: var(--o-color-info2);
  font-weight: 500;
  padding: var(--o-gap-2) var(--o-gap-3);
  text-align: left;
  border-bottom: 1px solid var(--o-color-control4);
}

.version-table td {
  padding: var(--o-gap-2) var(--o-gap-3);
  color: var(--o-color-info1);
  border-bottom: 1px solid var(--o-color-control4);
}

.version-cell {
  font-weight: 500;
}

.show-all {
  text-align: center;
  padding-top: var(--o-gap-3);
}
</style>
