# OIpInput IP地址输入框

## Part A：设计理解卡

OIpInput 是专用于输入 IPv4 地址的组件。它由多个分段输入框组成，每个分段之间用圆点分隔符连接，整体包裹在一个外框（InBox）中。用户逐段输入数字，组件自动校验范围（0-255）并在填满三位数字时自动跳转到下一段。

### 值

**modelValue**（属性）：IP 地址字符串（v-model 双向绑定），格式如 "192.168.1.1"。当所有分段均为合法 0-255 数字时，输出完整 IP 字符串；否则输出空字符串。

### 外观

**variant**（属性）：外框样式。"solid" 实心、"outline" 线框、"text" 无边框。默认 outline。外框样式同时应用于整体容器和每个分段输入框。

**color**（属性）：外框颜色状态。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。在 OFormItem 内会自动跟随校验状态变色。默认 normal。

**size**（属性）：组件尺寸。"small"、"medium"、"large"。不同尺寸有不同的内边距和高度。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 状态

**disabled**（属性）：禁用整个 IP 输入框。禁用后不响应键盘事件。默认关闭。

**readonly**（属性）：只读模式。默认关闭。

### 功能

**segmentsLen**（属性）：IP 地址的分段数量。默认 4（标准 IPv4）。可自定义为其他值以适应特殊需求。

### 自动行为

- 每个分段最多输入 3 位数字，只接受数字字符，非数字自动过滤。
- 如果输入的数字超过 255，自动修正为 255。
- 当某段输入满 3 位数字后，焦点自动跳转到下一段。
- 在某段为空时按退格键，焦点自动跳转到上一段。

### 分段间分隔符

每两个分段之间有一个圆形小点分隔符，尺寸 4px，背景色跟随主题信息色。

### 事件

**change**（事件）：IP 值变化时触发，携带校验结果（是否合法）和当前 IP 字符串。

### 表单集成

组件自动与 OForm/OFormItem 配合。在表单项内使用时，颜色会自动跟随表单校验状态（成功/警告/错误）。值变化时自动触发表单的 onChange 回调。

**响应式行为**：在笔记本尺寸及以下（<=1200px），大尺寸高度缩至 36px，中尺寸高度缩至 28px。在平板竖屏及以下（<=840px），大尺寸高度恢复标准控件尺寸。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OIpInput } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| modelValue | `string` | 否 | — | — | IP 地址值（v-model），格式如 `"192.168.1.1"` |
| disabled | `boolean` | 否 | — | `false` | 是否禁用 |
| segmentsLen | `number` | 否 | — | `4` | IP 分段数量 |
| size | `SizeT` | 否 | `'small'` / `'medium'` / `'large'` | — | 尺寸 |
| round | `RoundT` | 否 | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | 否 | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色状态 |
| readonly | `boolean` | 否 | — | `false` | 是否只读 |
| variant | `VariantT` | 否 | `'solid'` / `'outline'` / `'text'` | `'outline'` | 外框样式 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: string)` | IP 值变化时（v-model 同步） |
| change | `(valid: boolean, ip: string)` | IP 值变化时，valid 表示是否为合法完整 IP |

### Slots 表

无自定义插槽。组件内部使用 InBox 的默认插槽渲染分段输入框和分隔符，不对外暴露插槽。

### Expose 方法表

无。组件未使用 defineExpose 暴露方法。

### 典型使用场景与调用模板

**场景 1：基础 IPv4 地址输入**
适用于：网络配置中输入 IP 地址
```vue
<script setup>
import { ref } from 'vue';
import { OIpInput } from '@opensig/opendesign';

const ip = ref('192.168.1.1');
</script>
<template>
  <OIpInput v-model="ip" />
</template>
```

**场景 2：监听校验结果**
适用于：需要知道 IP 是否合法
```vue
<script setup>
import { ref } from 'vue';
import { OIpInput } from '@opensig/opendesign';

const ip = ref('');
const isValid = ref(false);

function onIpChange(valid: boolean, value: string) {
  isValid.value = valid;
}
</script>
<template>
  <OIpInput v-model="ip" @change="onIpChange" />
  <p v-if="!isValid">请输入合法的 IP 地址</p>
</template>
```

**场景 3：禁用状态**
适用于：展示但不允许编辑的场景
```vue
<OIpInput v-model="ip" disabled />
```

**场景 4：在表单中使用**
适用于：表单校验场景
```vue
<script setup>
import { ref } from 'vue';
import { OIpInput, OForm, OFormItem } from '@opensig/opendesign';

const ip = ref('');
</script>
<template>
  <OForm :model="{ ip }">
    <OFormItem label="IP 地址" prop="ip">
      <OIpInput v-model="ip" />
    </OFormItem>
  </OForm>
</template>
```

**场景 5：不同尺寸和样式**
适用于：视觉适配
```vue
<OIpInput v-model="ip" size="small" variant="solid" round="pill" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础 IP 输入 | `v-model` | 最常见用法，默认 4 段 |
| 禁用展示 | `v-model` + `disabled` | 只读展示 IP |
| 表单校验 | `v-model` + `@change` | 监听 valid 判断合法性 |
| 错误状态 | `color="danger"` | 红色边框提示错误 |
| 小尺寸 | `size="small"` | 紧凑布局 |
| 实心样式 | `variant="solid"` | 实心背景风格 |

### 响应式行为表

| 维度 | <=840px | 841-1200px | >1200px |
|------|---------|-----------|---------|
| 大尺寸高度 | 标准控件尺寸 | 36px | 标准 |
| 中尺寸高度 | 28px | 28px | 标准 |
