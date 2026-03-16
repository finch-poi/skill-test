# ORadio 单选框

## Part A：设计理解卡

ORadio 是单选框组件，让用户从多个选项中选择一个。包含 ORadio（单选框）和 ORadioGroup（单选框组）。支持受控/非受控模式、禁用状态、自定义渲染。

### 值

**modelValue**（属性）：选中的值（v-model 双向绑定）。当与 value 相等时该单选框被选中。

**value**（属性）：该单选框代表的值。必填。点击时此值被设为 modelValue。

**defaultChecked**（属性）：非受控模式下是否默认选中。默认关闭。

### 状态

**disabled**（属性）：是否禁用。禁用后点击无效、样式变灰。默认关闭。在 ORadioGroup 内时，Group 的 disabled 会覆盖单个 Radio 的设置。

### 自定义渲染

**radio 插槽**（插槽）：完全替换单选框的渲染（包括圆点和文字）。可获取 checked（是否选中）和 disabled（是否禁用），用于自定义外观。

**default 插槽**（插槽）：单选框的文字标签。

---

### ORadioGroup 单选框组

**modelValue**（属性）：选中的值（v-model 双向绑定）。

**defaultValue**（属性）：非受控模式下的默认值。

**disabled**（属性）：整组禁用。默认关闭。

**direction**（属性）：排列方向。"h" 水平排列、"v" 垂直排列。默认水平。

### 事件

**change**（事件）：选中值变化时触发。可获取新选中的值和原始事件。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），单选框文字缩小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ORadio, ORadioGroup } from '@opensig/opendesign';
</script>
```

### ORadio Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number \| boolean` | — | — | 单选框值（必填） |
| modelValue | `string \| number \| boolean` | — | — | 绑定值（v-model） |
| defaultChecked | `boolean` | — | `false` | 默认选中 |
| disabled | `boolean` | — | `false` | 禁用 |
| inputId | `string` | — | 自动生成 | input 元素 id |

### ORadioGroup Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string \| number \| boolean` | — | — | 绑定值（v-model） |
| defaultValue | `string \| number \| boolean` | — | `''` | 默认值 |
| disabled | `boolean` | — | `false` | 整组禁用 |
| direction | `DirectionT` | `'h'` / `'v'` | `'h'` | 排列方向 |

### ORadio Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: string \| number \| boolean)` | 选中时 |
| change | `(val: string \| number \| boolean, ev: Event)` | 选中变化时 |

### ORadioGroup Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: string \| number \| boolean)` | 选中值变化 |
| change | `(val: string \| number \| boolean, ev: Event)` | 选中值变化 |

### Slots 表

#### ORadio Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| radio | `{ checked: boolean, disabled: boolean }` | 始终 | 整个单选框（圆点+文字） | 默认圆点 + label |
| default | — | 未使用 radio 插槽时 | 文字标签 | 无 |

#### ORadioGroup Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 单选框列表 | 无 |

### 暴露属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| checked | `ComputedRef<boolean>` | 当前是否选中 |

### 典型使用场景与调用模板

**场景 1：独立单选框**
适用于：两个选项的简单选择
```vue
<script setup>
import { ref } from 'vue';
const value = ref(1);
</script>
<template>
  <ORadio v-model="value" :value="1">选项1</ORadio>
  <ORadio v-model="value" :value="2">选项2</ORadio>
</template>
```

**场景 2：单选框组**
适用于：多选项单选
```vue
<script setup>
import { ref } from 'vue';
const value = ref('a');
</script>
<template>
  <ORadioGroup v-model="value">
    <ORadio value="a">选项 A</ORadio>
    <ORadio value="b">选项 B</ORadio>
    <ORadio value="c">选项 C</ORadio>
  </ORadioGroup>
</template>
```

**场景 3：垂直排列**
适用于：表单中的垂直选项列表
```vue
<ORadioGroup v-model="value" direction="v">
  <ORadio value="a">选项 A</ORadio>
  <ORadio value="b">选项 B</ORadio>
</ORadioGroup>
```

**场景 4：禁用状态**
适用于：不可操作的选项
```vue
<ORadio v-model="value" :value="1" disabled>已禁用</ORadio>
```

**场景 5：自定义渲染**
适用于：卡片式选择、图标式选择等
```vue
<ORadio v-model="value" :value="1">
  <template #radio="{ checked }">
    <div :class="['custom-radio', { active: checked }]">
      自定义选项 {{ checked ? '✓' : '' }}
    </div>
  </template>
</ORadio>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础单选 | ORadioGroup + `v-model` | 最常见用法 |
| 垂直排列 | `direction="v"` | 纵向列表 |
| 整组禁用 | ORadioGroup `disabled` | 一键禁用 |
| 自定义外观 | `#radio` 插槽 | 完全自定义 |
| 表单校验 | ORadioGroup 放在 OFormItem 内 | 自动校验 |

### 响应式行为表

| 维度 | ≤1440px | >1440px |
|------|---------|---------|
| 文字 | tip1 | 标准 |

