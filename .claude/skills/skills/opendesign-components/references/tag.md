# OTag 标签

## Part A：设计理解卡

OTag 是标签组件，用于标记和分类信息。支持六种颜色、两种样式、三种尺寸、可关闭、关闭前拦截、自定义图标。

### 外观

**color**（属性）：标签颜色。"normal" 默认、"info" 信息、"primary" 主色、"success" 成功、"warning" 警告、"danger" 危险。默认 normal。

**variant**（属性）：标签样式。"solid" 实心填充、"outline" 线框描边。默认 solid。

**size**（属性）：标签尺寸。"large" 大号、"medium" 中号、"small" 小号。默认 large。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 可见性

**visible**（属性）：是否可见（v-model 双向绑定）。用于受控模式。

**defaultVisible**（属性）：非受控模式下是否默认可见。默认可见。

### 关闭

**closable**（属性）：是否显示关闭按钮。默认关闭。

**beforeClose**（属性）：关闭前的钩子函数。返回 true 或 Promise\<true\> 允许关闭，返回 false 或 Promise\<false\> 阻止关闭。

### 插槽区域

**icon 插槽**（插槽）：标签左侧图标区域。

**default 插槽**（插槽）：标签文字内容。

### 事件

**close**（事件）：关闭按钮点击后触发（beforeClose 允许后）。

📱 **响应式行为**：本组件无响应式差异。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OTag } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type TagColorT = 'normal' | 'info' | 'primary' | 'success' | 'warning' | 'danger';
type TagVariantT = 'solid' | 'outline';
type SizeT = 'large' | 'medium' | 'small';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| color | `TagColorT` | `'normal'` / `'info'` / `'primary'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| variant | `TagVariantT` | `'solid'` / `'outline'` | `'solid'` | 样式 |
| size | `SizeT` | `'large'` / `'medium'` / `'small'` | `'large'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| closable | `boolean` | — | `false` | 可关闭 |
| visible | `boolean` | — | `undefined` | 是否可见（v-model） |
| defaultVisible | `boolean` | — | `true` | 默认可见 |
| beforeClose | `() => Promise<boolean> \| boolean` | — | — | 关闭前拦截 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 可见状态变化时 |
| close | `(ev: MouseEvent)` | 关闭后 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| icon | — | 有 icon 插槽时 | 左侧图标 | 无 |
| default | — | 始终 | 标签文字 | 无 |

### 典型使用场景与调用模板

**场景 1：基础标签**
适用于：分类标记
```vue
<OTag>默认标签</OTag>
<OTag color="primary">主色标签</OTag>
<OTag color="success">成功标签</OTag>
<OTag color="danger">危险标签</OTag>
```

**场景 2：线框样式**
适用于：轻量标记
```vue
<OTag variant="outline" color="primary">线框标签</OTag>
```

**场景 3：带图标**
适用于：图标+文字组合标记
```vue
<OTag color="info">
  <template #icon><OIconInfo /></template>
  信息标签
</OTag>
```

**场景 4：可关闭标签**
适用于：标签可移除场景
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
<template>
  <OTag v-model:visible="visible" closable color="primary">可关闭标签</OTag>
</template>
```

**场景 5：关闭前确认**
适用于：需要确认才能移除的标签
```vue
<OTag closable :before-close="() => confirm('确定删除？')">需确认</OTag>
```

**场景 6：不同尺寸**
适用于：适配不同场景
```vue
<OTag size="large">大号</OTag>
<OTag size="medium">中号</OTag>
<OTag size="small">小号</OTag>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础标记 | `color` | 分类标签 |
| 轻量标记 | `variant="outline"` + `color` | 线框 |
| 可移除 | `closable` + `v-model:visible` | 动态标签 |
| 带确认 | `closable` + `:before-close` | 安全删除 |
| 小号圆角 | `size="small"` + `round="pill"` | 紧凑胶囊 |

### 响应式行为表

本组件无响应式差异。

