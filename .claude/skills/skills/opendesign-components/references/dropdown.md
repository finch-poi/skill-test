# ODropdown 下拉菜单

## Part A：设计理解卡

ODropdown 是下拉菜单组件，点击或悬停触发元素后弹出一组操作选项列表。通常与按钮配合使用，构成"下拉按钮"。包含 ODropdown（容器）和 ODropdownItem（选项项）。

### 触发与显示

**visible**（属性）：下拉菜单是否可见（v-model 双向绑定）。

**defaultVisible**（属性）：非受控模式下是否默认可见。默认关闭。

**trigger**（属性）：触发下拉菜单的方式。"click" 点击触发、"click-outclick" 点击触发+外部点击关闭、"hover" 悬停触发、"hover-outclick" 悬停触发+外部点击关闭、"focus" 聚焦触发、"contextmenu" 右键触发、"none" 不触发（需手动控制）。默认 click。

### 外观

**size**（属性）：下拉列表的尺寸。"small"、"medium"、"large"。不同尺寸影响选项文字大小和内边距。默认 large。

**round**（属性）：圆角值。

### 下拉面板

**optionPosition**（属性）：下拉面板弹出位置。支持 top/bottom/left/right 及组合值如 bl（底部左对齐）、tr（顶部右对齐）等。默认 bl。

**optionWidthMode**（属性）：下拉面板宽度规则。"auto" 自适应内容宽度、"min-width" 最小宽度与触发元素一致、"width" 宽度与触发元素一致。默认 min-width。

**optionWrapClass**（属性）：下拉面板容器自定义类名。

**optionsWrapper**（属性）：下拉面板挂载容器。默认 body。

**unmountOnHide**（属性）：面板隐藏时是否销毁 DOM。默认开启。

**transition**（属性）：过渡动画名称。

### 内容

**default 插槽**（插槽）：触发元素（通常放一个按钮）。

**dropdown 插槽**（插槽）：下拉选项列表区域，放置 ODropdownItem 子项。

### 事件

**visible-change**（事件）：下拉菜单显示/隐藏时触发，可获取当前可见状态。

---

### ODropdownItem 下拉选项

**label**（属性）：选项显示文本。

**value**（属性）：选项值。

**disabled**（属性）：禁用选项，不可点击且样式变灰。默认关闭。

**default 插槽**（插槽）：替换选项的默认文字渲染。不传时显示 label 或 value。

点击非禁用选项后，下拉菜单自动关闭。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），大尺寸触发按钮的内边距缩小；大尺寸选项文字和内边距缩小。在平板竖屏及以下（≤840px），小尺寸触发按钮内边距进一步缩小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ODropdown, ODropdownItem } from '@opensig/opendesign';
</script>
```

### ODropdown Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | — | 是否可见（v-model） |
| defaultVisible | `boolean` | — | `false` | 非受控时默认可见 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | `'large'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| trigger | `PopupTriggerT` | `'click'` / `'click-outclick'` / `'hover'` / `'hover-outclick'` / `'focus'` / `'contextmenu'` / `'none'` | `'click'` | 触发方式 |
| optionPosition | `PopupPositionT` | `'bl'` / `'br'` / `'tl'` / `'tr'` / `'top'` / `'bottom'` 等 | `'bl'` | 弹出位置 |
| optionWidthMode | `string` | `'auto'` / `'min-width'` / `'width'` | `'min-width'` | 面板宽度规则 |
| optionWrapClass | `string \| object \| array` | — | — | 面板容器类名 |
| optionsWrapper | `string \| HTMLElement \| null` | — | `'body'` | 面板挂载容器 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时销毁 DOM |
| transition | `string` | — | — | 过渡动画名 |

### ODropdownItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| label | `string` | — | `''` | 选项显示文本 |
| value | `string \| number` | — | `''` | 选项值 |
| disabled | `boolean` | — | `false` | 是否禁用 |

### Events 表

#### ODropdown Events

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 可见状态变化时 |
| visible-change | `(val: boolean)` | 可见状态变化时 |

### Slots 表

#### ODropdown Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 触发元素 | 无 |
| dropdown | — | 菜单可见时 | 下拉选项列表 | 无 |

#### ODropdownItem Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 选项内容 | `{{ label \|\| value }}` |

### 插槽层级关系

```
ODropdown
├── default（触发元素，如按钮）
└── dropdown（下拉选项列表）
    └── ODropdownItem × N
        └── default（选项自定义内容）
```

### 典型使用场景与调用模板

**场景 1：基础下拉按钮**
适用于：操作菜单
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
<template>
  <ODropdown v-model:visible="visible" trigger="click-outclick">
    <OButton color="primary" variant="solid" round="pill">
      操作
      <template #suffix>
        <OIconChevronDown :class="{ active: visible }" />
      </template>
    </OButton>
    <template #dropdown>
      <ODropdownItem label="编辑" value="edit" />
      <ODropdownItem label="复制" value="copy" />
      <ODropdownItem label="删除" value="delete" />
    </template>
  </ODropdown>
</template>
```

**场景 2：强调下拉按钮（Primary）**
适用于：主操作按钮的下拉
```vue
<ODropdown trigger="click-outclick" class="o-dropdown-btn-wrap">
  <OButton color="primary" variant="solid" round="pill">
    下拉按钮
    <template #suffix><OIconChevronDown /></template>
  </OButton>
  <template #dropdown>
    <ODropdownItem label="选项一" value="opt1" />
    <ODropdownItem label="选项二" value="opt2" />
  </template>
</ODropdown>
```

**场景 3：禁用下拉**
适用于：按钮禁用时阻止下拉
```vue
<ODropdown trigger="none">
  <OButton disabled>禁用按钮</OButton>
  <template #dropdown>
    <ODropdownItem label="选项" value="opt" />
  </template>
</ODropdown>
```

**场景 4：文本下拉按钮**
适用于：轻量级下拉操作
```vue
<ODropdown trigger="click-outclick" class="o-dropdown-link-wrap">
  <OButton variant="text" color="primary">
    文本下拉
    <template #suffix><OIconChevronDown /></template>
  </OButton>
  <template #dropdown>
    <ODropdownItem label="选项一" value="opt1" />
    <ODropdownItem label="选项二" value="opt2" />
  </template>
</ODropdown>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础下拉 | `trigger="click-outclick"` | 点击打开、外部点击关闭 |
| 悬停下拉 | `trigger="hover"` | 鼠标悬停时显示 |
| 禁用下拉 | `trigger="none"` + 按钮 disabled | 阻止触发 |
| 自定义宽度 | `option-width-mode="width"` | 面板宽度与触发元素一致 |
| 运营主题按钮 | `color="brand"` + `variant="solid"` | 品牌色实心样式 |

### 响应式行为表

| 维度 | ≤840px | 841–1200px | >1200px |
|------|--------|-----------|---------|
| 大尺寸按钮内边距 | 缩小 | 缩小 | 标准 |
| 大尺寸选项文字 | tip1 | tip1 | text1 |
| 大尺寸选项内边距 | 6px 12px | 6px 12px | 7px 12px |
| 小/中尺寸选项内边距 | 标准 | 2px 12px | 4px 12px |

