# OCollapse 折叠面板

## Part A：设计理解卡

OCollapse 是折叠面板组件，用于将内容分组后折叠/展开显示，节省页面空间。包含 OCollapse（容器）和 OCollapseItem（面板项）。

### 展开控制

**modelValue**（属性）：当前展开的面板值数组（v-model 双向绑定）。数组中包含哪些面板的 value，哪些面板就展开。

**defaultValue**（属性）：非受控模式下默认展开的面板值数组。默认空数组（全部收起）。

**accordion**（属性）：手风琴模式。开启后同一时间只能展开一个面板，点击新面板时自动收起已展开的面板。默认关闭。

### 事件

**change**（事件）：展开/收起面板后触发，可获取当前展开的面板值数组。

---

### OCollapseItem 折叠面板项

**value**（属性）：面板的唯一标识（字符串或数字），与 OCollapse 的 modelValue 对应。必填。

**title**（属性）：面板标题文字。

**title 插槽**（插槽）：替换面板标题区域的默认文字渲染。替换后 title 属性失效。可用于在标题中添加图标等自定义内容。

**default 插槽**（插槽）：面板展开后显示的内容区域。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），容器内边距缩小、标题和正文字号缩小、内容区域间距减少。在平板竖屏及以下（≤840px），容器内边距进一步缩小、圆角变小、标题区域内边距减少。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OCollapse, OCollapseItem } from '@opensig/opendesign';
</script>
```

### OCollapse Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `Array<string \| number>` | — | — | 展开的面板值数组（v-model） |
| defaultValue | `Array<string \| number>` | — | `[]` | 非受控时默认展开的面板 |
| accordion | `boolean` | — | `false` | 手风琴模式 |

### OCollapseItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number` | — | — | 面板唯一标识（必填） |
| title | `string` | — | — | 面板标题 |

### Events 表

#### OCollapse Events

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: Array<string \| number>)` | 展开/收起时 |
| change | `(val: Array<string \| number>, evt?: Event)` | 展开/收起后 |

### Slots 表

#### OCollapse Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 面板项列表 | 无 |

#### OCollapseItem Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| title | — | 始终 | 标题文字区域 | `{{ title }}` |
| default | — | 面板展开时显示 | 内容区域 | 无 |

### 插槽层级关系

```
OCollapse default
└── OCollapseItem
    ├── title（替换标题文字）
    └── default（展开后的内容）
```

### 典型使用场景与调用模板

**场景 1：基础折叠面板**
适用于：FAQ、内容分组展示
```vue
<script setup>
import { ref } from 'vue';
const expanded = ref([1]);
</script>
<template>
  <OCollapse v-model="expanded">
    <OCollapseItem title="标题 1" :value="1">
      <p>面板 1 的内容</p>
    </OCollapseItem>
    <OCollapseItem title="标题 2" :value="2">
      <p>面板 2 的内容</p>
    </OCollapseItem>
    <OCollapseItem title="标题 3" :value="3">
      <p>面板 3 的内容</p>
    </OCollapseItem>
  </OCollapse>
</template>
```

**场景 2：手风琴模式**
适用于：同一时间只看一个面板
```vue
<OCollapse accordion>
  <OCollapseItem title="面板 A" :value="1">
    <p>内容 A</p>
  </OCollapseItem>
  <OCollapseItem title="面板 B" :value="2">
    <p>内容 B</p>
  </OCollapseItem>
</OCollapse>
```

**场景 3：受控模式（强制至少一个面板展开）**
适用于：自定义展开逻辑
```vue
<script setup>
import { ref } from 'vue';
const expanded = ref([1]);
const handleUpdate = (val) => {
  // 确保至少有一个面板展开
  if (val.length > 0) {
    expanded.value = [val[val.length - 1]]; // 只保留最新展开的
  }
};
</script>
<template>
  <OCollapse :model-value="expanded" @update:modelValue="handleUpdate">
    <OCollapseItem title="面板 1" :value="1">内容 1</OCollapseItem>
    <OCollapseItem title="面板 2" :value="2">内容 2</OCollapseItem>
    <OCollapseItem title="面板 3" :value="3">内容 3</OCollapseItem>
  </OCollapse>
</template>
```

**场景 4：自定义标题（含图标）**
适用于：标题需要图标或复杂内容
```vue
<OCollapse accordion>
  <OCollapseItem :value="1">
    <template #title>
      <OIconFile style="font-size: var(--o-icon_size-m); margin-right: var(--o-gap-2);" />
      <span>带图标的标题</span>
    </template>
    <p>面板内容</p>
  </OCollapseItem>
</OCollapse>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础折叠 | `v-model` + `value` + `title` | 最常见用法 |
| 手风琴 | `accordion` | 同时只展开一个 |
| 默认展开 | `:default-value="[1]"` | 非受控模式默认展开 |
| 自定义标题 | `#title` 插槽 | 替换标题文字 |

### 响应式行为表

| 维度 | ≤840px | 841–1200px | >1200px |
|------|--------|-----------|---------|
| 容器内边距 | 0 16px | 8px 24px | 8px 32px |
| 标题区域内边距 | 16px 0 | 19px 0 | 25px 0 |
| 标题字号 | text1 | text2 | h3 |
| 正文字号 | tip1 | tip1 | text1 |
| 内容间距 | gap-3 | gap-4 | gap-5 |
| 圆角 | radius-s | radius-l | radius-l |

### CSS 变量定制

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `--collapse-radius` | 圆角大小 | `var(--o-radius_control-l)` |
| `--collapse-bg-color` | 背景色 | `var(--o-color-fill2)` |
| `--collapse-padding` | 容器内边距 | `8px 32px` |
| `--collapse-division-color` | 分割线颜色 | `var(--o-color-control4)` |
| `--collapse-item-header-padding` | 标题区域内边距 | `25px 0` |
| `--collapse-item-title-color` | 标题文字颜色 | `var(--o-color-info1)` |
| `--collapse-item-title-text-size` | 标题字号 | `var(--o-font_size-h3)` |
| `--collapse-item-body-text-size` | 正文字号 | `var(--o-font_size-text1)` |
| `--collapse-item-icon-color` | 展开图标颜色 | `var(--o-color-info1)` |
| `--collapse-item-icon-size` | 展开图标大小 | `var(--o-icon_size_control-m)` |
| `--collapse-item-gap` | 内容区域底部间距 | `var(--o-gap-5)` |

