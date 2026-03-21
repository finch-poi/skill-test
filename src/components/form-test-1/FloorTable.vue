<script setup lang="ts">
import { ref, h } from 'vue'
import { ODataTable, OLink, OButton } from '@opensig/opendesign'
import type { DataTableColumnT } from '@opensig/opendesign'

const columns: DataTableColumnT[] = [
  { key: 'col1', label: '标题1', width: '30%' },
  { key: 'col2', label: '标题2' },
  { key: 'col3', label: '标题3' },
  { key: 'col4', label: '标题4' },
  {
    key: 'col5',
    label: '标题5',
    formatter: () =>
      h('div', { style: { display: 'flex', gap: '8px' } }, [
        h(OLink, { color: 'primary' }, { default: () => '文字按钮' }),
        h(OLink, { color: 'primary' }, { default: () => '文字按钮' }),
      ]),
  },
]

const tableData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  col1: '内容文本内容文本内容文本（' + (i === 0 ? '选中' : '') + '）',
  col2: '内容文本内容文本',
  col3: '330',
  col4: '内容文本',
  col5: '',
}))

const selectedKeys = ref([1])
</script>

<template>
  <div class="floor-table">
    <h2 class="section-title">复杂信息收集</h2>

    <ODataTable
      :columns="columns"
      :data="tableData"
      border="row-frame"
      selection
      v-model:selected-keys="selectedKeys"
      row-key="id"
      class="data-table"
    />

    <div class="action-buttons">
      <OButton color="primary" variant="solid">提交</OButton>
      <OButton color="primary" variant="outline">保存</OButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floor-table {
  margin-bottom: var(--o-r-gap-6);
}

.section-title {
  font-size: var(--o-r-font_size-h4);
  font-weight: 600;
  margin-top: 0;
  margin-bottom: var(--o-r-gap-5);
  color: var(--o-color-info1);
}

.data-table {
  width: 100%;
  margin-bottom: var(--o-r-gap-5);
}

.action-buttons {
  display: flex;
  gap: var(--o-r-gap-3);
  justify-content: flex-start;
  margin-top: var(--o-r-gap-5);
}
</style>
