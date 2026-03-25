<script setup lang="ts">
// 设计稿 ID：293:12921（Pixso item-id，数据表格）
import { ref, h, computed } from 'vue'
import { ODataTable, OButton, OInput, DataTableSortMethod } from '@opensig/opendesign'
import type { DataTableColumnT, DataTableSpanMethod, DataTableSortMethodT } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- 公共数据 ----
interface TableRow {
  id: number
  name: string
  num1: number
  num2: number
  text: string
  link1?: string
  link2?: string
  disabled?: boolean
}

const tableData = ref<TableRow[]>([
  { id: 1, name: '内容文本内容文本内容文本内容文本', num1: 330, num2: 330, text: '内容文本', link1: '文字链接', link2: '文字链接' },
  { id: 2, name: '内容文本内容文本内容文本内容文本', num1: 330, num2: 330, text: '内容文本', link1: '文字链接', link2: '文字链接' },
  { id: 3, name: '内容文本内容文本内容文本内容文本（禁用）', num1: 330, num2: 330, text: '内容文本', link1: '文字链接', link2: '文字链接', disabled: true },
  { id: 4, name: '内容文本内容文本内容文本内容文本', num1: 330, num2: 330, text: '内容文本', link1: '文字链接', link2: '文字链接' },
  { id: 5, name: '内容文本内容文本内容文本内容文本', num1: 330, num2: 330, text: '内容文本', link1: '文字链接', link2: '文字链接' },
])

// ---- 基础表格筛选/排序条件（前端数据模拟）----
const conditions = ref<{
  num1: number[]
  num2Sort?: DataTableSortMethodT
}>({
  num1: [],
  num2Sort: DataTableSortMethod.NA,
})

const filteredData = computed(() => {
  let res = [...tableData.value]
  if (conditions.value.num1?.length) {
    res = res.filter(row => (conditions.value.num1 as number[]).includes(row.num1))
  }
  if (conditions.value.num2Sort === DataTableSortMethod.ASC) {
    res = [...res].sort((a, b) => a.num2 - b.num2)
  } else if (conditions.value.num2Sort === DataTableSortMethod.DESC) {
    res = [...res].sort((a, b) => b.num2 - a.num2)
  }
  return res
})

// ---- 基础表格（M size）列配置 ----
const basicColumnsM: DataTableColumnT[] = [
  { key: 'name', label: '标题 1', minWidth: 160, showOverflowToolTip: 1 },
  {
    key: 'num1', label: '标题 2', width: 100,
    filter: {
      multiple: true,
      optionsFn: () => [
        { label: '100', value: 100 },
        { label: '200', value: 200 },
        { label: '330', value: 330 },
      ],
    },
  },
  { key: 'num2', label: '标题 3', width: 100, sortKey: 'num2Sort' },
  { key: 'text', label: '标题 4', width: 100 },
  {
    key: 'link1', label: '标题 5', width: 100,
    formatter: ({ cellValue }) => h('a', { style: { color: 'var(--o-color-primary1)', cursor: 'pointer' } }, String(cellValue ?? '--')),
  },
  {
    key: 'link2', label: '标题 6', width: 100,
    formatter: ({ cellValue }) => h('a', { style: { color: 'var(--o-color-primary1)', cursor: 'pointer' } }, String(cellValue ?? '--')),
  },
]

// ---- 基础表格（S size）列配置（同M，复用） ----
const basicColumnsS: DataTableColumnT[] = basicColumnsM

// ---- 可批量操作表格列配置（M size）----
const selectedKeysBatchM = ref<(string | number)[]>([])
const batchColumnsM: DataTableColumnT[] = [
  { key: 'name', label: '标题 1', minWidth: 160, showOverflowToolTip: 1 },
  { key: 'num1', label: '标题 2', width: 100 },
  { key: 'num2', label: '标题 3', width: 100 },
  { key: 'text', label: '标题 4', width: 100 },
  {
    key: 'link1', label: '标题 5', width: 100,
    formatter: ({ cellValue }) => h('a', { style: { color: 'var(--o-color-primary1)', cursor: 'pointer' } }, String(cellValue ?? '--')),
  },
  {
    key: 'link2', label: '标题 6', width: 100,
    formatter: ({ cellValue }) => h('a', { style: { color: 'var(--o-color-primary1)', cursor: 'pointer' } }, String(cellValue ?? '--')),
  },
  {
    key: 'action', label: '操作', width: 80,
    formatter: () => h('span', { style: { color: 'var(--o-color-danger1)', cursor: 'pointer' } }, '删除'),
  },
]

// ---- 可批量操作表格（S size）----
const selectedKeysBatchS = ref<(string | number)[]>([])

// ---- 可编辑表格数据与列（M size）----
interface EditableRow {
  id: number
  name: string
  num1: number
  num2: number
  text: string
}
const editableData = ref<EditableRow[]>([
  { id: 1, name: '内容文本内容文本内容文本内容文本', num1: 100, num2: 100, text: '内容文本' },
  { id: 2, name: '内容文本内容文本内容文本内容文本', num1: 100, num2: 100, text: '内容文本' },
  { id: 3, name: '内容文本内容文本内容文本内容文本（禁用）', num1: 100, num2: 100, text: '内容文本' },
  { id: 4, name: '内容文本内容文本内容文本内容文本', num1: 100, num2: 100, text: '内容文本' },
  { id: 5, name: '内容文本内容文本内容文本内容文本', num1: 100, num2: 100, text: '内容文本' },
])

const editableColumnsM: DataTableColumnT[] = [
  { key: 'name', label: '标题 1', minWidth: 160, showOverflowToolTip: 1 },
  {
    key: 'num1', label: '标题 2', width: 120,
    formatter: ({ row }) => () => h(OInput, {
      modelValue: (row as EditableRow).num1,
      'onUpdate:modelValue': (v: string | number) => { (row as EditableRow).num1 = Number(v) },
      size: 'small',
      style: { width: '90px' },
    }),
  },
  {
    key: 'num2', label: '标题 3', width: 120,
    formatter: ({ row }) => () => h(OInput, {
      modelValue: (row as EditableRow).num2,
      'onUpdate:modelValue': (v: string | number) => { (row as EditableRow).num2 = Number(v) },
      size: 'small',
      style: { width: '90px' },
    }),
  },
  {
    key: 'text', label: '标题 4', width: 120,
    formatter: ({ row }) => () => h(OInput, {
      modelValue: (row as EditableRow).text,
      'onUpdate:modelValue': (v: string | number) => { (row as EditableRow).text = String(v) },
      size: 'small',
      style: { width: '90px' },
    }),
  },
  {
    key: 'action', label: '操作', width: 80,
    formatter: () => h('span', { style: { color: 'var(--o-color-danger1)', cursor: 'pointer' } }, '删除'),
  },
]

// ---- 行列合并表格（M size）----
interface SpanRow {
  id: number
  name: string
  val1: string
  val2: string
  val3: string
  val4: string
}
const spanData = ref<SpanRow[]>([
  { id: 1, name: '内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本', val1: '内容文本', val2: '内容文本', val3: '内容文本', val4: '内容文本' },
  { id: 2, name: '内容文本内容文本内容文本内容文本', val1: '内容文本', val2: '内容文本', val3: '内容文本', val4: '内容文本' },
  { id: 3, name: '内容文本内容文本内容文本内容文本', val1: '内容文本', val2: '内容文本', val3: '内容文本', val4: '内容文本' },
  { id: 4, name: '内容文本内容文本内容文本内容文本', val1: '内容文本', val2: '内容文本', val3: '内容文本', val4: '内容文本' },
  { id: 5, name: '标题', val1: '', val2: '', val3: '', val4: '' },
])
const spanColumnsM: DataTableColumnT[] = [
  { key: 'name', label: '标题 1', minWidth: 200 },
  { key: 'val1', label: '标题 2', width: 100 },
  { key: 'val2', label: '标题 3', width: 100 },
  { key: 'val3', label: '标题 4', width: 100 },
  { key: 'val4', label: '标题 5', width: 100 },
]
const spanMethod: DataTableSpanMethod = ({ rowIndex, colIndex }) => {
  // 最后一行合并全部列
  if (rowIndex === 4 && colIndex === 0) {
    return { colSpan: 5, rowSpan: 1 }
  }
  if (rowIndex === 4 && colIndex > 0) {
    return { colSpan: 0, rowSpan: 0 }
  }
  // 前两行第1列合并
  if (colIndex === 0 && rowIndex === 0) {
    return { colSpan: 1, rowSpan: 2 }
  }
  if (colIndex === 0 && rowIndex === 1) {
    return { colSpan: 0, rowSpan: 0 }
  }
}
</script>

<template>
  <AppSection
    data-testid="data-table-section"
    title="ODataTable 数据表格"
    subtitle="设计稿 ID：293:12921 · 覆盖 M/S size × 基础/批量/编辑/合并 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="data-table-row-light">
        <div class="theme-label">Light</div>

        <!-- M size 基础表格 -->
        <div class="table-card">
          <div class="table-label">M size · 基础表格（行线+外框）</div>
          <ODataTable
            data-testid="data-table-basic-m"
            :columns="basicColumnsM"
            :data="filteredData"
            v-model:conditions="conditions"
            border="row-frame"
            highlight-current-row
          />
        </div>

        <!-- S size 基础表格 -->
        <div class="table-card">
          <div class="table-label">S size · 基础表格（行线+外框）</div>
          <ODataTable
            data-testid="data-table-basic-s"
            :columns="basicColumnsS"
            :data="filteredData"
            v-model:conditions="conditions"
            size="small"
            border="row-frame"
            highlight-current-row
          />
        </div>

        <!-- M size 可批量操作表格 -->
        <div class="table-card">
          <div class="table-label">M size · 可批量操作表格（selection + 操作列）</div>
          <ODataTable
            data-testid="data-table-selection-m"
            :columns="batchColumnsM"
            :data="tableData"
            border="row-frame"
            selection
            v-model:selected-keys="selectedKeysBatchM"
            highlight-current-row
          />
        </div>

        <!-- S size 可批量操作表格 -->
        <div class="table-card">
          <div class="table-label">S size · 可批量操作表格</div>
          <ODataTable
            data-testid="data-table-selection-s"
            :columns="batchColumnsM"
            :data="tableData"
            size="small"
            border="row-frame"
            selection
            v-model:selected-keys="selectedKeysBatchS"
            highlight-current-row
          />
        </div>

        <!-- M size 可编辑表格（使用 formatter 返回函数式组件）-->
        <div class="table-card">
          <div class="table-label">M size · 可编辑表格（input 插槽）</div>
          <ODataTable
            data-testid="data-table-editable-m"
            :columns="editableColumnsM"
            :data="editableData"
            border="row-frame"
            highlight-current-row
          />
        </div>

        <!-- M size 行列合并表格 -->
        <div class="table-card">
          <div class="table-label">M size · 行列合并表格</div>
          <ODataTable
            data-testid="data-table-span-m"
            :columns="spanColumnsM"
            :data="spanData"
            border="all"
            :span-method="spanMethod"
            highlight-current-row
          />
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="data-table-row-dark">
        <div class="theme-label">Dark</div>

        <!-- M size 基础表格 Dark -->
        <div class="table-card">
          <div class="table-label">M size · 基础表格</div>
          <ODataTable
            data-testid="data-table-basic-m-dark"
            :columns="basicColumnsM"
            :data="filteredData"
            v-model:conditions="conditions"
            border="row-frame"
            highlight-current-row
          />
        </div>

        <!-- S size 基础表格 Dark -->
        <div class="table-card">
          <div class="table-label">S size · 基础表格</div>
          <ODataTable
            data-testid="data-table-basic-s-dark"
            :columns="basicColumnsS"
            :data="filteredData"
            v-model:conditions="conditions"
            size="small"
            border="row-frame"
            highlight-current-row
          />
        </div>

        <!-- M size 可批量操作表格 Dark -->
        <div class="table-card">
          <div class="table-label">M size · 可批量操作表格</div>
          <ODataTable
            data-testid="data-table-selection-m-dark"
            :columns="batchColumnsM"
            :data="tableData"
            border="row-frame"
            selection
            highlight-current-row
          />
        </div>

        <!-- S size 可批量操作表格 Dark -->
        <div class="table-card">
          <div class="table-label">S size · 可批量操作表格</div>
          <ODataTable
            data-testid="data-table-selection-s-dark"
            :columns="batchColumnsM"
            :data="tableData"
            size="small"
            border="row-frame"
            selection
            highlight-current-row
          />
        </div>

        <!-- M size 可编辑表格 Dark -->
        <div class="table-card">
          <div class="table-label">M size · 可编辑表格</div>
          <ODataTable
            data-testid="data-table-editable-m-dark"
            :columns="editableColumnsM"
            :data="editableData"
            border="row-frame"
            highlight-current-row
          />
        </div>

        <!-- M size 行列合并表格 Dark -->
        <div class="table-card">
          <div class="table-label">M size · 行列合并表格</div>
          <ODataTable
            data-testid="data-table-span-m-dark"
            :columns="spanColumnsM"
            :data="spanData"
            border="all"
            :span-method="spanMethod"
            highlight-current-row
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

// ---- 表格卡片 ----
.table-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

// 暗色下卡片背景继承主题变量（不再硬写白色）
.theme-section--dark .table-card {
  background: var(--o-color-fill2);
}

.table-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}
</style>
