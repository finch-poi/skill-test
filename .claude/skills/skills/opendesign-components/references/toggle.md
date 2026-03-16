# OToggle 选择块

## Part A：设计理解卡

OToggle 是选择块组件（按钮式切换），用于表示选中/未选中状态。可独立使用，也可作为 OCheckbox 或 ORadio 的自定义渲染载体。支持圆角、前缀图标、禁用。

### 值

**checked**（属性）：是否选中（v-model:checked 双向绑定）。受控模式下由外部控制选中状态。

**defaultChecked**（属性）：非受控模式下是否默认选中。默认不选中。

### 外观

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

**icon**（属性）：前缀图标组件。也可通过 icon 插槽自定义。

### 状态

**disabled**（属性）：是否禁用。禁用后点击无效。默认关闭。

### 特殊行为

当 OToggle 作为 OCheckbox 或 ORadio 的子组件时，其点击事件会被屏蔽（不触发自身 change），由父级 checkbox/radio 控制选中状态。

### 插槽区域

**icon 插槽**（插槽）：前缀图标区域。使用后 icon 属性失效。

**default 插槽**（插槽）：按钮内容文字。

### 事件

**change**（事件）：独立使用时，选中状态变化后触发。可获取新的选中值和原始事件。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），按钮高度缩至 28px，文字和图标缩小；在平板竖屏及以下（≤840px），内边距进一步减小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OToggle } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| checked | `boolean` | — | `undefined` | 是否选中（v-model:checked） |
| defaultChecked | `boolean` | — | `false` | 默认选中 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| icon | `Component` | — | — | 前缀图标组件 |
| disabled | `boolean` | — | `false` | 禁用 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:checked | `(val: boolean)` | 选中状态变化时 |
| change | `(val: boolean, ev: MouseEvent)` | 选中状态变化后 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| icon | — | 有 icon prop 或 icon 插槽时 | 前缀图标 | `<component :is="icon" />` |
| default | — | 始终 | 按钮文字 | 无 |

### 典型使用场景与调用模板

**场景 1：独立使用**
适用于：单个选项切换
```vue
<script setup>
import { ref } from 'vue';
const selected = ref(false);
</script>
<template>
  <OToggle v-model:checked="selected">选项 A</OToggle>
</template>
```

**场景 2：带图标**
适用于：图标+文字的选择按钮
```vue
<OToggle v-model:checked="selected" :icon="OIconStar">收藏</OToggle>
```

**场景 3：作为 Checkbox 自定义渲染**
适用于：多选的按钮式选择
```vue
<OCheckboxGroup v-model="selectedFruits">
  <OCheckbox value="apple"><OToggle>苹果</OToggle></OCheckbox>
  <OCheckbox value="banana"><OToggle>香蕉</OToggle></OCheckbox>
  <OCheckbox value="orange"><OToggle>橘子</OToggle></OCheckbox>
</OCheckboxGroup>
```

**场景 4：作为 Radio 自定义渲染**
适用于：单选的按钮式选择
```vue
<ORadioGroup v-model="selected">
  <ORadio value="monthly"><OToggle>月付</OToggle></ORadio>
  <ORadio value="yearly"><OToggle>年付</OToggle></ORadio>
</ORadioGroup>
```

**场景 5：圆角胶囊**
适用于：紧凑标签式选择
```vue
<OToggle v-model:checked="selected" round="pill">标签</OToggle>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础切换 | `v-model:checked` | 独立使用 |
| 带图标 | `:icon` 或 `#icon` 插槽 | 图标+文字 |
| 胶囊 | `round="pill"` | 圆角按钮 |
| 多选组 | 作为 OCheckbox 子组件 | 自身 change 屏蔽 |
| 单选组 | 作为 ORadio 子组件 | 自身 change 屏蔽 |

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| 按钮高度 | 28px | 28px | 标准 |
| 文字 | tip1 | tip1 | 标准 |
| 图标 | 控件 xs | 控件 xs | 标准 |
| 内边距 | 0 11px | 标准 | 标准 |
