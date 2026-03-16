# OSelect 选择器

## Part A：设计理解卡

OSelect 是下拉选择器组件，从预设选项列表中选择一个或多个值。包含 OSelect（选择器）、OOption（选项）和 OOptionGroup（选项分组）。支持单选、多选、标签折叠、清空、加载态、自定义选项宽度模式等功能。

### 值

**modelValue**（属性）：选中值（v-model 双向绑定）。单选时为 string 或 number；多选时为数组。

**defaultValue**（属性）：非受控模式下的默认值。

### 外观

**variant**（属性）：选择器样式。"solid" 实心、"outline" 线框、"text" 纯文字。默认 outline。

**color**（属性）：选择器颜色。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。默认 normal。

**size**（属性）：选择器尺寸。"small"、"medium"、"large"。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

**placeholder**（属性）：占位提示文本。

### 功能

**multiple**（属性）：是否支持多选。开启后选中值为数组，选项以标签形式展示。

**maxTagCount**（属性）：多选模式下标签最大显示数量。超出的折叠显示。

**clearable**（属性）：是否可清空选择。

**loading**（属性）：加载中状态。

### 状态

**disabled**（属性）：是否禁用选择器。

### 选项面板

**trigger**（属性）：选项面板触发方式。默认 click。

**optionPosition**（属性）：选项面板弹出位置。默认 bl（底部左对齐）。

**optionWidthMode**（属性）：选项面板宽度模式。"auto" 自动、"min-width" 最小宽度与选择器一致、"width" 宽度与选择器一致。默认 min-width。

**optionWrapClass**（属性）：选项面板自定义类名。

**optionsWrapper**（属性）：选项面板挂载容器。默认 body。

**unmountOnHide**（属性）：面板隐藏时是否销毁 DOM。默认开启。

**transition**（属性）：选项面板的过渡动画名称。

### 多选标签折叠

**foldLabel**（属性）：多选超过最大标签数时的自定义文字函数。

**showFoldTags**（属性）：是否在悬停时显示折叠的标签。"hover" 悬停显示、"click" 点击显示、true/false。默认 hover。

### 回调

**beforeSelect**（属性）：选择前回调。返回 false 阻止选择。

**beforeOptionsShow**（属性）：选项面板显示前回调。

**beforeOptionsHide**（属性）：选项面板隐藏前回调。

### 移动端

**optionTitle**（属性）：移动端选项面板的标题。

**noResponsive**（属性）：是否禁用响应式（移动端 Dialog 模式）。

### 插槽区域

**default 插槽**（插槽）：放置 OOption 组件。无选项时显示空数据提示。

**arrow 插槽**（插槽）：替换下拉箭头图标。可获取 active（面板是否展开）。

**suffix 插槽**（插槽）：选择框后缀区域，位于箭头右侧。可获取 active（面板是否展开）。

**tag-fold 插槽**（插槽）：多选模式下折叠标签的显示内容。默认显示 "+N..." 文本。

**empty 插槽**（插槽）：无选项时的空数据提示内容。

**action 插槽**（插槽）：选项面板底部的操作区域。

---

### OOption 选项

**label**（属性）：选项显示文本。

**value**（属性）：选项值。

**disabled**（属性）：是否禁用该选项。

**indeterminate**（属性）：多选模式下是否为半选状态（复选框样式）。

### OOptionGroup 选项分组

将选项分组显示，带有分组标题。

**name**（属性）：分组名称。必填。

**name 插槽**（插槽）：替换分组标题。默认显示 name 属性的文本。

**default 插槽**（插槽）：放置分组内的 OOption 组件。

### 事件

**change**（事件）：选中值变化时触发。

**clear**（事件）：点击清空时触发。

**options-visible-change**（事件）：选项面板显隐变化时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），large 尺寸高度缩至 36px、文字和图标缩小，medium 高度缩至 28px；在平板竖屏及以下（≤840px），large 恢复标准高度；移动端下选项面板从 Popup 变为 Dialog 底部弹出。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OSelect, OOption, OOptionGroup } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type OptionWidthModeT = 'auto' | 'min-width' | 'width';
type SelectValueT = string | number | string[] | number[] | (string | number)[];
```

### OSelect Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `SelectValueT` | — | — | 选中值（v-model） |
| defaultValue | `SelectValueT` | — | — | 默认值 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | — | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'` | 样式 |
| placeholder | `string` | — | — | 占位文本 |
| multiple | `boolean` | — | `false` | 多选 |
| maxTagCount | `number` | — | — | 最大标签数 |
| clearable | `boolean` | — | `false` | 可清空 |
| disabled | `boolean` | — | `false` | 禁用 |
| loading | `boolean` | — | `false` | 加载中 |
| trigger | `PopupTriggerT` | — | `'click'` | 触发方式 |
| optionPosition | `PopupPositionT` | — | `'bl'` | 面板位置 |
| optionWidthMode | `OptionWidthModeT` | `'auto'` / `'min-width'` / `'width'` | `'min-width'` | 面板宽度模式 |
| optionWrapClass | `string \| object \| array` | — | — | 面板类名 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时卸载 |
| optionsWrapper | `string \| HTMLElement` | — | `'body'` | 面板挂载容器 |
| foldLabel | `(tags: SelectOptionT[]) => string` | — | — | 折叠标签文字 |
| showFoldTags | `boolean \| 'hover' \| 'click'` | — | `'hover'` | 折叠标签显示 |
| optionTitle | `string` | — | — | 移动端面板标题 |
| noResponsive | `boolean` | — | `false` | 禁用响应式 |
| beforeSelect | `Function` | — | — | 选择前回调 |
| beforeOptionsShow | `Function` | — | — | 显示前回调 |
| beforeOptionsHide | `Function` | — | — | 隐藏前回调 |
| transition | `string` | — | — | 过渡动画名称 |

### OOption Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| label | `string` | — | `''` | 显示文本 |
| value | `string \| number` | — | `''` | 选项值 |
| disabled | `boolean` | — | `false` | 禁用 |
| indeterminate | `boolean` | — | `false` | 半选（多选模式） |

### OOptionGroup Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| name | `string` | — | — | 分组名称（必填） |

### OOptionGroup Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| name | — | 始终 | 分组标题 | 显示 name 属性文本 |
| default | — | 始终 | 分组内选项列表 | 无 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: SelectValueT)` | 选中值变化时 |
| change | `(value: SelectValueT)` | 选中值变化时 |
| options-visible-change | `(value: boolean)` | 面板显隐变化 |
| clear | `(evt: Event)` | 点击清空 |

### OSelect Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 选项内容区域 | 空数据提示 |
| arrow | `{ active: boolean }` | 始终 | 下拉箭头图标 | `<IconChevronDown />` |
| suffix | `{ active: boolean }` | 始终 | 选择框后缀区域（箭头右侧） | 无 |
| tag-fold | — | 多选且有折叠标签时 | 折叠标签的显示内容 | `+N...` 文本 |
| empty | — | 无选项时 | 空数据提示 | 国际化空文本 |
| action | — | 始终 | 选项面板底部操作区域 | 无 |

### 典型使用场景与调用模板

**场景 1：基础单选**
适用于：从选项列表选择一项
```vue
<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
<template>
  <OSelect v-model="value" placeholder="请选择">
    <OOption label="选项一" value="1" />
    <OOption label="选项二" value="2" />
    <OOption label="选项三" value="3" />
  </OSelect>
</template>
```

**场景 2：多选**
适用于：选择多个标签
```vue
<OSelect v-model="values" multiple clearable :max-tag-count="3">
  <OOption label="标签一" value="1" />
  <OOption label="标签二" value="2" />
  <OOption label="标签三" value="3" />
  <OOption label="标签四" value="4" />
</OSelect>
```

**场景 3：可清空 + 禁用选项**
适用于：部分选项不可选
```vue
<OSelect v-model="value" clearable>
  <OOption label="可选" value="1" />
  <OOption label="禁用" value="2" disabled />
</OSelect>
```

**场景 4：文字变体**
适用于：紧凑的行内选择
```vue
<OSelect v-model="value" variant="text">
  <OOption label="中文" value="zh" />
  <OOption label="English" value="en" />
</OSelect>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础单选 | `v-model` + `placeholder` | 最常见 |
| 多选 | `multiple` + `clearable` | 标签模式 |
| 限制标签数 | `multiple` + `:max-tag-count` | 折叠多余 |
| 纯文字 | `variant="text"` | 无边框 |
| 禁用响应式 | `no-responsive` | 移动端也用 Popup |

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| large 高度 | 标准控件尺寸 | 36px | 标准 |
| large 文字 | 标准 | tip1 | 标准 |
| large 图标 | 控件 m | 控件 s | 标准 |
| medium 高度 | 28px | 28px | 标准 |
| 选项面板 | Dialog 底部弹出 | Popup 下拉 | Popup 下拉 |

