# OSwitch 开关

## Part A：设计理解卡

OSwitch 是开关组件，用于两种状态之间的切换。支持自定义选中/未选中值、加载状态、切换前拦截、自定义滑块图标和状态文字。

### 值

**modelValue**（属性）：开关的值（v-model 双向绑定）。等于 checkedValue 时为开启状态，等于 uncheckedValue 时为关闭状态。

**defaultChecked**（属性）：非受控模式下是否默认开启。默认关闭。

**checkedValue**（属性）：开启状态对应的值。默认 true。

**uncheckedValue**（属性）：关闭状态对应的值。默认 false。

### 外观

**size**（属性）：开关尺寸。"medium" 中号、"small" 小号。默认 medium。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 状态

**disabled**（属性）：是否禁用。禁用后点击无效。默认关闭。

**loading**（属性）：是否加载中。加载时滑块显示旋转图标，同时自动禁用点击。默认关闭。

### 拦截

**beforeChange**（属性）：状态改变前的钩子函数。返回 true 或 Promise\<true\> 允许切换，返回 false 或 Promise\<false\> 阻止切换。适合异步确认场景。

### 插槽区域

**active 插槽**（插槽）：开启状态时滑块内的图标。loading 时被加载图标替换。

**inactive 插槽**（插槽）：关闭状态时滑块内的图标。loading 时被加载图标替换。

**on 插槽**（插槽）：开启状态时开关右侧的文字/图标标签。

**off 插槽**（插槽）：关闭状态时开关右侧的文字/图标标签。

### 事件

**change**（事件）：状态切换后触发。可获取新的值和原始事件。

📱 **响应式行为**：本组件无响应式差异。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OSwitch } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type SwitchSizeT = 'medium' | 'small';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string \| number \| boolean` | — | `undefined` | 绑定值（v-model） |
| defaultChecked | `boolean` | — | `false` | 默认开启 |
| checkedValue | `string \| number \| boolean` | — | `true` | 开启状态值 |
| uncheckedValue | `string \| number \| boolean` | — | `false` | 关闭状态值 |
| size | `SwitchSizeT` | `'medium'` / `'small'` | `'medium'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| disabled | `boolean` | — | `false` | 禁用 |
| loading | `boolean` | — | `false` | 加载中 |
| beforeChange | `(val: boolean) => Promise<boolean> \| boolean` | — | — | 切换前拦截 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: string \| number \| boolean)` | 状态变化时 |
| change | `(val: string \| number \| boolean, ev: Event)` | 状态切换后 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| active | — | 开启状态且未 loading 时 | 滑块图标 | 无 |
| inactive | — | 关闭状态且未 loading 时 | 滑块图标 | 无 |
| on | — | 开启状态时 | 开关文字标签 | 无 |
| off | — | 关闭状态时 | 开关文字标签 | 无 |

### 典型使用场景与调用模板

**场景 1：基础开关**
适用于：功能启用/禁用
```vue
<script setup>
import { ref } from 'vue';
const enabled = ref(false);
</script>
<template>
  <OSwitch v-model="enabled" />
</template>
```

**场景 2：自定义值**
适用于：非布尔值切换
```vue
<OSwitch v-model="fruit" checked-value="apple" unchecked-value="banana" />
```

**场景 3：带状态文字**
适用于：明确标识当前状态
```vue
<OSwitch v-model="enabled">
  <template #on>ON</template>
  <template #off>OFF</template>
</OSwitch>
```

**场景 4：带图标的主题切换**
适用于：深色/浅色模式切换
```vue
<OSwitch v-model="isDark" default-checked>
  <template #active><OIconSun /></template>
  <template #inactive><OIconMoon /></template>
  <template #on><OIconMoon /></template>
  <template #off><OIconSun /></template>
</OSwitch>
```

**场景 5：异步切换确认**
适用于：需要后端验证的切换
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(false);
const beforeChange = (val) => {
  return new Promise((resolve) => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      resolve(true);
    }, 1000);
  });
};
</script>
<template>
  <OSwitch :before-change="beforeChange" :loading="loading" />
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础开关 | `v-model` | 最常见 |
| 自定义值 | `checked-value` + `unchecked-value` | 非布尔值 |
| 带文字 | `#on` + `#off` 插槽 | 状态标签 |
| 异步切换 | `:before-change` + `:loading` | 后端验证 |
| 圆角 | `round="pill"` | 半圆按钮 |
| 小号 | `size="small"` | 紧凑场景 |

### CSS 变量

| 变量名 | 说明 |
|--------|------|
| `--switch-color` | 开关颜色 |
| `--switch-text-size` | 文字大小 |
| `--switch-text-height` | 文字行高 |

### 响应式行为表

本组件无响应式差异。

