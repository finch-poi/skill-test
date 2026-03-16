# ODataTable 数据表格

## Part A：设计理解卡

ODataTable 是数据驱动的表格组件，通过列配置和行数据自动渲染表格内容。支持列固定、行选择、列筛选排序、行展开、树形数据、单元格合并、列宽拖拽调整、嵌套表头、溢出气泡等功能。

### 数据源

**data**（属性，必填）：表格行数据数组。每个元素是一个对象，对象的键名对应列配置的 key 字段。支持树形数据结构，行对象可包含 children 子节点数组和 hasChildren 懒加载标记。

**columns**（属性，必填）：列配置数组。每列通过 key 指定关联数据字段，label 指定表头文本。支持通过 children 嵌套形成多级分组表头。iOS 端不支持多列固定。

### 尺寸与高度

**size**（属性）：表格整体尺寸，可选中号或小号。默认中号。

**height**（属性）：固定表格高度。设置后表头固定、内容区域滚动。

**maxHeight**（属性）：表格最大高度。超出后表头固定、内容区域滚动。默认适应内容高度。

**minTableWidth**（属性）：内部 table 元素最小宽度。表格容器宽度不足时出现横向滚动条。

### 外观

**border**（属性）：表格边框样式。支持全边框、仅行线、仅列线、外框、组合等多种模式。默认仅行线。

**stripe**（属性）：斑马纹。仅在无纵向合并单元格时生效。默认关闭。

**headerStyle**（属性）：表头风格。填充背景或分割线样式。默认填充背景。

**showHeader**（属性）：是否显示表头行。默认显示。

**highlightCurrentRow**（属性）：鼠标悬停时是否高亮当前行。默认关闭。

**defaultEmptyCellText**（属性）：单元格值为空时的占位文案。默认显示 "--"。

### 行标识

**rowKey**（属性）：行数据的唯一标识字段名，支持传入字符串路径或计算函数。在行选择、行展开等场景中用于标识行。默认使用 "id" 字段。

### 列固定

通过列配置的 fixed 属性设定。可将列固定在左侧或右侧，横向滚动时固定列不随内容滚动。左侧或右侧最靠近滚动区域的固定列边缘会显示阴影。iOS 端仅支持最左一列和最右一列各固定一列。

### 列宽控制

**columnResizable**（属性）：是否允许拖拽调整列宽。默认关闭。开启后表头单元格右侧出现拖拽手柄。

列配置可通过 width、minWidth、maxWidth 设定初始宽度和宽度范围。支持数字（像素）和百分比字符串。

### 单元格渲染

列配置的 formatter 属性可自定义单元格渲染，返回字符串、VNode、组件或函数式组件。也可使用动态插槽 `td_{columnKey}` 自定义渲染。当 formatter 未设置时，空值单元格显示 defaultEmptyCellText，非空值调用 toString。

列配置的 showOverflowToolTip 属性控制溢出文本显示气泡提示，传入数字可设定最大行数。

### 表头渲染

列配置的 label 属性除了字符串外，也支持 VNode 或组件。列配置的 description 属性可为表头添加描述气泡图标。可使用动态插槽 `th_{columnKey}` 自定义表头单元格内容。

列配置的 asHeader 属性可将某列标记为竖向表头列，该列会呈现表头背景样式。

列配置的 customColSpan 属性可合并相邻同级的表头单元格。

### 嵌套分组表头

列配置支持 children 嵌套，形成多级分组表头。父列的 label 显示在上方横跨其所有子列，子列的表头在下一行显示。可多层嵌套。

### 筛选与排序

通过列配置的 filter 属性开启列筛选。filter 是一个对象，包含获取可选项的异步方法、是否多选、是否显示搜索输入框、移动端弹窗标题等配置。筛选图标出现在表头文本旁。

通过列配置的 sortKey 属性开启列排序。排序图标出现在表头文本旁。仅支持单列排序，切换排序列时自动清空其他列的排序。排序在升序、降序、不排序之间循环切换。

**conditions**（双向绑定属性）：筛选排序条件对象。key 对应列的 key（筛选列）或 sortKey（排序列）。筛选列值为选中值数组，排序列值为排序方式常量。

筛选排序变更时组件触发 condition-update 事件，业务方在事件回调中根据 conditions 重新请求数据并更新 data。也可通过 watch conditions 实现自动请求。

### 行选择

**selection**（属性）：开启行选择。默认关闭。开启后第一列前出现复选框。

**selectedKeys**（双向绑定属性）：已选中行的 rowKey 数组。

**disabledProp**（属性）：指定行数据中控制行是否禁用选择的字段名。默认使用 "disabled" 字段。

**checkStrictly**（属性）：树形数据中父子节点选择是否不关联。默认不关联（独立选择）。关闭后选中父节点自动全选子节点，子节点全选后自动选中父节点。

### 行展开

**expandMethod**（属性）：行展开渲染方法。接收行数据和行索引，返回展开内容（字符串、VNode、组件或函数式组件），返回 false 表示该行不可展开。

**expand 插槽**：行展开内容的插槽方式，可获取行数据和行索引。使用后所有行均可展开。

**expanded-row-keys**（双向绑定属性）：已展开行的 rowKey 数组。

### 树形数据

行数据包含 children 数组时自动呈现树形缩进和展开箭头。行数据的 hasChildren 标记为 true 时表示支持懒加载子节点，展开时触发 load-children 事件，业务方异步加载后调用 resolve 完成或 reject 失败回退。

### 单元格合并

**spanMethod**（属性）：合并单元格的计算方法。接收行数据、列配置、单元格值、行列索引，返回 colSpan 和 rowSpan。已被合并的单元格不会再次参与合并。

### 加载与空状态

**loading**（属性）：显示加载中遮罩。加载时筛选排序图标禁用。

**loadingLabel**（属性）：加载中提示文案。

**emptyLabel**（属性）：数据为空时的提示文案。

**loading 插槽**：自定义加载中显示内容。

**empty 插槽**：自定义空状态显示内容。

### 整体表头插槽

**header 插槽**：替换整个 thead 内容。可获取扁平列数组和分组列二维数组。

### 暴露方法

组件通过模板引用暴露全选、清空选择、展开全部、收起全部等方法，以及列配置的映射和数组数据。

### 响应式行为

筛选面板在手机/平板竖屏尺寸下使用底部弹窗（Dialog）代替桌面端弹出层（Popup）。iOS 端仅支持最左一列和最右一列各固定一列。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ODataTable } from '@opensig/opendesign';
// 按需导入类型
import type {
  DataTableColumnT,
  DataTableSpanMethod,
  DataTableExpandMethod,
  DataTableSortMethod,
  DataTableSortMethodT,
  DataTableConditionUpdatePayload,
  DataTableSortUpdatePayload,
  DataTableSelectionPayload,
  DataTableSelectionChangePayload,
  DataTableLoadChildrenPayload,
  DataTableInstance,
  DataTableRowKeyValue,
} from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type DataTableSizeT = 'medium' | 'small';
type DataTableHeaderStyleT = 'fill' | 'split-line';
type DataTableFixedT = true | 'left' | 'right'; // true 等同 'left'
type TableBorderT = 'all' | 'row' | 'column' | 'frame' | 'row-column' | 'row-frame' | 'column-frame' | 'none';
type DataTableRowKeyValue = string | number;

// 排序方式常量
const DataTableSortMethod = {
  ASC: 1,      // 升序
  DESC: -1,    // 降序
  NA: undefined // 不排序（初始值）
};
type DataTableSortMethodT = 1 | -1 | undefined;

// 单元格渲染方法参数
interface DataTableColumnFormatterOptions {
  row: any;
  column: EffectiveDataTableColumnT;
  cellValue: string | number | unknown;
  rowIndex: number;
  colIndex: number;
}

// 单元格渲染方法
type DataTableColumnFormatter = (options: DataTableColumnFormatterOptions) => Component | VNode | string;

// 合并单元格方法
type DataTableSpanMethod = (options: DataTableColumnFormatterOptions) => { colSpan?: number; rowSpan?: number } | void;

// 行展开方法
type DataTableExpandMethod = (row: any, rowIndex: number) => Component | VNode | string | false;

// 行数据类型
interface TableRowT {
  key?: string | number;
  hasChildren?: boolean;  // 懒加载标记
  children?: TableRowT[];
  [key: string]: unknown;
}
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| data | `TableRowT[]` | 是 | — | — | 表格数据 |
| columns | `DataTableColumnT[]` | 是 | — | — | 列配置，iOS 端不支持多列固定 |
| size | `DataTableSizeT` | 否 | `'medium'` / `'small'` | `'medium'` | 表格尺寸 |
| height | `number \| string` | 否 | — | — | 表格高度，设置后表头固定、内容滚动 |
| maxHeight | `number \| string` | 否 | — | `'fit-content'` | 最大高度，超出时表头固定滚动 |
| minTableWidth | `number \| string` | 否 | — | — | 内部 table 最小宽度，超出时横向滚动 |
| rowKey | `string \| ((row: TableRowT) => string)` | 否 | — | `'id'` | 行唯一标识字段名或计算函数 |
| border | `TableBorderT` | 否 | `'all'` / `'row'` / `'column'` / `'frame'` / `'row-column'` / `'row-frame'` / `'column-frame'` / `'none'` | `'row'` | 边框样式 |
| stripe | `boolean` | 否 | — | `false` | 斑马纹（无纵向合并时生效） |
| headerStyle | `DataTableHeaderStyleT` | 否 | `'fill'` / `'split-line'` | `'fill'` | 表头风格 |
| showHeader | `boolean` | 否 | — | `true` | 是否显示表头 |
| highlightCurrentRow | `boolean` | 否 | — | `false` | 鼠标悬停高亮行 |
| columnResizable | `boolean` | 否 | — | `false` | 是否可拖拽调整列宽 |
| selection | `boolean` | 否 | — | `false` | 是否开启行选择 |
| disabledProp | `string` | 否 | — | `'disabled'` | 行数据中控制禁用选择的字段名 |
| checkStrictly | `boolean` | 否 | — | `true` | 树形选择时父子是否不关联 |
| defaultEmptyCellText | `string` | 否 | — | `'--'` | 空单元格占位文案 |
| emptyLabel | `string` | 否 | — | — | 空数据提示文案 |
| loading | `boolean` | 否 | — | `false` | 加载中状态 |
| loadingLabel | `string` | 否 | — | — | 加载中提示文案 |
| spanMethod | `DataTableSpanMethod` | 否 | — | `() => undefined` | 合并单元格方法 |
| expandMethod | `DataTableExpandMethod` | 否 | — | — | 行展开方法，返回 false 则不可展开 |
| v-model:conditions | `Record<string, unknown>` | 否 | — | `reactive({})` | 筛选排序条件对象 |
| v-model:selected-keys | `DataTableRowKeyValue[]` | 否 | — | `reactive([])` | 已选中行的 rowKey 数组 |
| v-model:expanded-row-keys | `DataTableRowKeyValue[]` | 否 | — | `reactive([])` | 已展开行的 rowKey 数组 |

### DataTableColumnT 列配置

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | `string` | 是 | 列数据字段名，对应行数据对象的 key，支持路径如 `'a.b'` |
| label | `string \| Component \| VNode` | 否 | 表头文本，支持字符串、VNode、组件或函数式组件 |
| description | `string \| Component \| VNode` | 否 | 表头描述气泡文案 |
| formatter | `DataTableColumnFormatter` | 否 | 单元格自定义渲染方法 |
| fixed | `true \| 'left' \| 'right'` | 否 | 列固定方向，`true` 等同 `'left'`。iOS 不支持多列固定 |
| asHeader | `boolean` | 否 | 是否作为竖向表头列，默认 false |
| width | `number \| string` | 否 | 列宽，支持像素数字或百分比字符串 |
| minWidth | `number \| string` | 否 | 最小列宽 |
| maxWidth | `number \| string` | 否 | 最大列宽 |
| showOverflowToolTip | `boolean \| number` | 否 | 溢出时显示气泡，传数字设定最大行数 |
| sortKey | `string` | 否 | 排序条件字段 key，仅支持单列排序 |
| filter | `DataTableColumnFilterT` | 否 | 筛选配置 |
| customColSpan | `number` | 否 | 表头单元格自定义 colspan，仅支持同级合并 |
| children | `DataTableColumnT[]` | 否 | 嵌套子列配置，形成分组表头 |

### DataTableColumnFilterT 筛选配置

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| optionsFn | `(option: { column, emptyOption }) => Option[] \| Promise<Option[]>` | 是 | 获取筛选选项的方法，支持异步 |
| optionTitle | `string` | 否 | 移动端弹窗标题 |
| multiple | `boolean` | 否 | 是否支持多选，默认 true |
| showInput | `boolean \| ((count: number) => boolean)` | 否 | 是否显示搜索框，默认选项超过 8 个时显示 |

### DataTableColumnFilterOption 筛选选项

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| label | `any` | 是 | 选项标签文本 |
| value | `any` | 是 | 选项值 |

### Events 表

| 事件名 | 参数 | 说明 |
|--------|------|------|
| condition-update | `payload?: DataTableConditionUpdatePayload` | 筛选条件更新时触发（排序更新时 payload 为 undefined） |
| sort-update | `payload: DataTableSortUpdatePayload` | 列排序更新时触发 |
| update:selected-keys | `payload: DataTableRowKeyValue[]` | 选中行变更双向绑定 |
| selection | `payload: DataTableSelectionPayload` | 单行复选框点击时触发 |
| selection-change | `payload: DataTableSelectionChangePayload` | 已选择数据变更时触发（含全选操作） |
| selection-all | `allSelected: boolean` | 全选/取消全选复选框点击时触发 |
| load-children | `payload: DataTableLoadChildrenPayload` | 懒加载子节点时触发 |
| column-resize | `column: EffectiveDataTableColumnT, width: number` | 列宽调整时触发 |
| update:conditions | `value: Record<string, unknown>` | conditions 双向绑定更新 |
| update:expanded-row-keys | `value: DataTableRowKeyValue[]` | expanded-row-keys 双向绑定更新 |

#### 事件载荷类型

```typescript
// condition-update 载荷
interface DataTableConditionUpdatePayload {
  key: string;           // 对应 column 的 key
  newVal: (string | number | boolean)[];  // 选中的值数组
}

// sort-update 载荷
interface DataTableSortUpdatePayload {
  key: string;           // 对应 column 的 sortKey
  newVal?: DataTableSortMethodT;  // 1(升序) / -1(降序) / undefined(不排序)
}

// selection 载荷
interface DataTableSelectionPayload {
  key: DataTableRowKeyValue;  // 行的 rowKey 值
  selected: boolean;          // 是否选中
}

// selection-change 载荷
interface DataTableSelectionChangePayload {
  prev: DataTableRowKeyValue[];  // 变更前选中的 rowKey 数组
  cur: DataTableRowKeyValue[];   // 变更后选中的 rowKey 数组
}

// load-children 载荷
interface DataTableLoadChildrenPayload {
  row: TableRowT;
  rowIndex: number;
  rowKey: DataTableRowKeyValue;
  resolve: () => void;   // 加载成功时调用
  reject: (reason?: any) => void;  // 加载失败时调用，展开自动回退
}
```

### Slots 表

| 插槽名 | Slot Props | 说明 |
|--------|-----------|------|
| header | `{ columns: EffectiveDataTableColumnT[], groupColumns: EffectiveDataTableColumnT[][] }` | 替换整个 thead 内容 |
| loading | — | 自定义加载中显示 |
| empty | — | 自定义空状态显示 |
| expand | `{ row: TableRowT, rowIndex: number }` | 行展开内容，使用后所有行均可展开 |
| `th_{columnKey}` | `{ column: EffectiveDataTableColumnT }` | 自定义指定列的表头单元格内容（动态插槽） |
| `td_{columnKey}` | `{ column: EffectiveDataTableColumnT, row: TableRowT, cellValue: any, index: number }` | 自定义指定列的数据单元格内容（动态插槽） |

### Expose 方法表

| 方法名 | 类型 | 说明 |
|--------|------|------|
| selectAll | `() => void` | 全选（不含禁用行） |
| clearAll | `() => void` | 清空全部选择 |
| expandAll | `() => void` | 展开所有行 |
| foldAll | `() => void` | 收起所有行 |
| getRowKey | `(row: TableRowT, rowIndex: number) => DataTableRowKeyValue` | 计算行的 rowKey |
| dataColumnMap | `Map<string, EffectiveDataTableColumnT>` | 列配置的 key-value 映射 |
| dataColumns | `Ref<EffectiveDataTableColumnT[]>` | 扁平化的所有叶子列数组 |
| groupColumns | `Ref<EffectiveDataTableColumnT[][]>` | 按层级分组的列二维数组 |

### 插槽层级关系

```
header（替换整个 thead）
  └── th_{columnKey}（替换单个表头单元格内容）

expand（替换行展开内容）
  └── 与 expandMethod 二选一；slot 优先级更高且所有行可展开

loading（替换加载中遮罩内容）
empty（替换空状态内容）

td_{columnKey}（替换单个数据单元格内容）
  └── 与 column.formatter 二选一
```

### 典型使用场景与调用模板

**场景 1：基础数据表格**
适用于：简单数据展示
```vue
<script setup>
import { ref } from 'vue';
import { ODataTable } from '@opensig/opendesign';
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
  { label: '地址', key: 'address' },
];
const data = ref([
  { id: 1, name: '张三', age: 28, address: '北京' },
  { id: 2, name: '李四', age: 32, address: '上海' },
]);
</script>
<template>
  <ODataTable :columns="columns" :data="data" />
</template>
```

**场景 2：固定高度 + 固定列 + 列宽拖拽**
适用于：大量数据、宽表格
```vue
<script setup>
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name', fixed: 'left', minWidth: '15%' },
  { label: '薪资', key: 'salary' },
  { label: '地址', key: 'address' },
  { label: '邮箱', key: 'email', minWidth: 200 },
  { label: '操作', key: 'action', fixed: 'right' },
];
</script>
<template>
  <ODataTable :columns="columns" :data="data" :height="400" border="all" column-resizable />
</template>
```

**场景 3：筛选 + 排序（事件驱动模式）**
适用于：后端分页筛选排序
```vue
<script setup>
import { ref, computed } from 'vue';
import { DataTableSortMethod } from '@opensig/opendesign';
import type { DataTableColumnT, DataTableSortMethodT } from '@opensig/opendesign';

const columns = computed<DataTableColumnT[]>(() => [
  {
    label: '姓名', key: 'name',
    filter: {
      multiple: true,
      optionsFn: () => [
        { label: '张三', value: '张三' },
        { label: '李四', value: '李四' },
      ],
    },
  },
  { label: '年龄', key: 'age', sortKey: 'ageSort' },
  { label: '薪资', key: 'salary' },
]);

const conditions = ref<{ name: string[]; ageSort?: DataTableSortMethodT }>({
  name: [],
  ageSort: DataTableSortMethod.NA,
});

const data = ref([]);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  // 根据 conditions.value 请求后端数据
  // data.value = await api.getData(conditions.value);
  loading.value = false;
};

fetchData();
</script>
<template>
  <ODataTable
    :columns="columns"
    :data="data"
    v-model:conditions="conditions"
    :loading="loading"
    @condition-update="fetchData"
  />
</template>
```

**场景 4：行选择**
适用于：批量操作
```vue
<script setup>
import { ref } from 'vue';
import type { DataTableColumnT, DataTableInstance } from '@opensig/opendesign';

const dataTableRef = ref<DataTableInstance>();
const selectedKeys = ref<(string | number)[]>([]);
const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name' },
  { label: '年龄', key: 'age' },
];
const data = ref([
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32, disabled: true },
]);

// 编程式全选/清空
const handleSelectAll = () => dataTableRef.value?.selectAll();
const handleClearAll = () => dataTableRef.value?.clearAll();
</script>
<template>
  <ODataTable ref="dataTableRef" v-model:selected-keys="selectedKeys" :columns="columns" :data="data" selection />
</template>
```

**场景 5：行展开（插槽方式）**
适用于：展示行详情
```vue
<template>
  <ODataTable :columns="columns" :data="data" v-model:expanded-row-keys="expandedRowKeys" row-key="key">
    <template #expand="{ row }">
      <p>详细地址：{{ row.address }}</p>
      <p>邮箱：{{ row.email }}</p>
    </template>
  </ODataTable>
</template>
```

**场景 6：行展开（expandMethod 方式，按行控制）**
适用于：部分行可展开，支持 JSX/TSX
```vue
<script setup lang="tsx">
import type { DataTableExpandMethod } from '@opensig/opendesign';

const expandMethod: DataTableExpandMethod = (row, rowIndex) => {
  if (rowIndex < 2) return false; // 前两行不可展开
  return () => <div>展开内容：{row.name}</div>;
};
</script>
<template>
  <ODataTable :columns="columns" :data="data" :expand-method="expandMethod" row-key="key" />
</template>
```

**场景 7：树形数据 + 懒加载**
适用于：组织架构、文件树
```vue
<script setup>
import { ref } from 'vue';
import type { DataTableLoadChildrenPayload } from '@opensig/opendesign';

const data = ref([
  { key: '1', name: '部门A', children: [
    { key: '1-1', name: '小组1' },
  ]},
  { key: '2', name: '部门B', hasChildren: true }, // 懒加载
]);

const handleLoadChildren = ({ row, rowKey, resolve, reject }: DataTableLoadChildrenPayload) => {
  fetchChildren(rowKey).then((children) => {
    row.children = children;
    resolve();
  }).catch(() => reject());
};
</script>
<template>
  <ODataTable :columns="columns" :data="data" row-key="key" @load-children="handleLoadChildren" />
</template>
```

**场景 8：嵌套分组表头**
适用于：复杂表头分组
```vue
<script setup>
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '姓名', key: 'name' },
  {
    label: '详细信息', key: 'detail',
    children: [
      { label: '薪资', key: 'salary' },
      { label: '地址', key: 'address' },
      { label: '邮箱', key: 'email', minWidth: 200 },
    ],
  },
];
</script>
<template>
  <ODataTable :columns="columns" :data="data" />
</template>
```

**场景 9：单元格合并**
适用于：报表、统计表格
```vue
<script setup>
import type { DataTableSpanMethod } from '@opensig/opendesign';

const spanMethod: DataTableSpanMethod = ({ colIndex, rowIndex }) => {
  if (colIndex === 0 && rowIndex === 0) {
    return { colSpan: 1, rowSpan: 2 }; // 第一列前两行合并
  }
};
</script>
<template>
  <ODataTable :columns="columns" :data="data" :span-method="spanMethod" />
</template>
```

**场景 10：竖向表头列（垂直表头）**
适用于：属性-值对照表
```vue
<script setup>
import type { DataTableColumnT } from '@opensig/opendesign';

const columns: DataTableColumnT[] = [
  { label: '属性', key: 'name', width: 200, asHeader: true, fixed: true },
  { label: '值1', key: 'val1' },
  { label: '值2', key: 'val2' },
];
</script>
<template>
  <ODataTable :columns="columns" :data="data" :show-header="false" />
</template>
```

**场景 11：分页 + 筛选排序联动**
适用于：后端分页与筛选排序联合使用
```vue
<script setup>
import { ref, watch } from 'vue';
import { DataTableSortMethod } from '@opensig/opendesign';

const conditions = ref({ name: [], ageSort: DataTableSortMethod.NA });
const currentPage = ref(1);
const pageSize = ref(10);
const data = ref([]);
const total = ref(0);
const loading = ref(false);

const fetchData = async () => {
  loading.value = true;
  const res = await api.list({ ...conditions.value, page: currentPage.value, size: pageSize.value });
  data.value = res.list;
  total.value = res.total;
  loading.value = false;
};

// 筛选/排序变更时回到第一页
const handleConditionUpdate = () => {
  currentPage.value = 1;
  fetchData();
};

watch([currentPage, pageSize], fetchData);
fetchData();
</script>
<template>
  <ODataTable
    :columns="columns"
    :data="data"
    v-model:conditions="conditions"
    :loading="loading"
    @condition-update="handleConditionUpdate"
  />
  <OPagination v-model:page="currentPage" v-model:page-size="pageSize" :total="total" />
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础表格 | `:columns` + `:data` | 最简用法 |
| 固定表头滚动 | `:height="400"` | 超出高度表头固定 |
| 列固定 | column `fixed: 'left'/'right'` | 左右固定列 |
| 列宽调整 | `column-resizable` | 拖拽调整列宽 |
| 全边框 | `border="all"` | 单元格全边框 |
| 斑马纹 | `stripe` | 偶数行背景色 |
| 行选择 | `selection` + `v-model:selected-keys` | 复选框选择 |
| 树形选择关联 | `selection` + `:check-strictly="false"` | 父子联动 |
| 筛选排序 | column `filter/sortKey` + `v-model:conditions` + `@condition-update` | 服务端筛选排序 |
| 行展开 | `#expand` 或 `:expand-method` + `v-model:expanded-row-keys` | 行详情展开 |
| 树形懒加载 | `row.hasChildren` + `@load-children` | 异步加载子节点 |
| 分割线表头 | `header-style="split-line"` | 线分割表头风格 |
| 竖向表头 | column `asHeader` + `:show-header="false"` | 属性-值对照 |
| 加载中 | `loading` + `loading-label` | 加载遮罩 |
| 空数据 | `empty-label` 或 `#empty` | 空状态文案 |
| 单元格合并 | `:span-method` | 合并行列 |
| 空值占位 | `default-empty-cell-text="N/A"` | 自定义空值文案 |

### 响应式行为表

| 维度 | 手机/平板竖屏 (<=pad_v) | 桌面端 |
|------|------------------------|--------|
| 列筛选面板 | 底部弹窗 (ODialog) | 弹出层 (OPopup) |
| 多列固定 (iOS) | 仅支持最左 1 列 + 最右 1 列 | 无限制 |
