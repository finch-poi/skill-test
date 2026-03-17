<script setup lang="ts">
import { ref } from 'vue'
import { OTab, OTabPane, ODataTable, OIcon } from '@opensig/opendesign'
import { OIconInfo } from '@opensig/opendesign'
import type { MoreInfoData } from '@/api/software-detail'

defineProps<{
  data: MoreInfoData
}>()

const activeTab = ref('requires')

const requiresColumns = [
  { key: 'requires', label: 'Requires', width: 180 },
  { key: 'flags', label: 'Flags', width: 80 },
  { key: 'rel', label: 'Rel', width: 100 },
  { key: 'ver', label: 'Ver', width: 100 },
  { key: 'epoch', label: 'Epoch', width: 80 },
]

const providesColumns = [
  { key: 'provides', label: 'Provides', width: 180 },
  { key: 'flags', label: 'Flags', width: 80 },
  { key: 'rel', label: 'Rel', width: 100 },
  { key: 'ver', label: 'Ver', width: 100 },
  { key: 'epoch', label: 'Epoch', width: 80 },
]
</script>

<template>
  <div class="more-info">
    <h2 class="section-title">> 更多信息</h2>
    <OTab v-model="activeTab" variant="text" class="info-tabs">
      <OTabPane label="Requires" value="requires">
        <ODataTable :data="(data.requires as any)" :columns="requiresColumns" row-key="id" size="small">
          <template #th_flags>
            <span class="flags-header">
              Flags
              <OIcon :icon="OIconInfo" style="font-size: 14px" />
            </span>
          </template>
        </ODataTable>
      </OTabPane>
      <OTabPane label="Provides" value="provides">
        <ODataTable :data="(data.provides as any)" :columns="providesColumns" row-key="id" size="small" />
      </OTabPane>
    </OTab>
  </div>
</template>

<style scoped>
.more-info {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-s);
  padding: var(--o-gap-6);
}

.section-title {
  font-size: var(--o-font_size-h4);
  font-weight: 500;
  color: var(--o-color-info1);
  margin-bottom: var(--o-gap-4);
}

.info-tabs {
  margin-bottom: var(--o-gap-3);
}

.flags-header {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
