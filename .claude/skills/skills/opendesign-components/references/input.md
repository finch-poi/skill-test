# OInput 输入框

## Part A：设计理解卡

OInput 是单行输入框组件，支持多种外观样式、校验状态、密码框、字数统计等功能。可与 OForm 配合实现自动校验。

### 值

**modelValue**（属性）：输入框的值（v-model 双向绑定）。

**defaultValue**（属性）：非受控模式下的默认值。

### 外观

**variant**（属性）：输入框样式。"solid" 实心、"outline" 线框、"text" 无边框。默认 outline。

**color**（属性）：输入框颜色状态。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。在 OFormItem 内会自动跟随校验状态变色。默认 normal。

**size**（属性）：输入框尺寸。"small"、"medium"、"large"。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 状态

**disabled**（属性）：禁用输入框。默认关闭。

**readonly**（属性）：只读模式。默认关闭。

### 功能

**clearable**（属性）：是否显示清空按钮。默认关闭。

**type**（属性）：输入框类型。"text" 文本、"password" 密码。默认 text。

**placeholder**（属性）：占位文本。

**inputId**（属性）：input 元素的 id，用于 label 关联。

**maxLength**（属性）：最大字符长度。

**minLength**（属性）：最小字符长度。

**showLength**（属性）：字数统计显示模式。"always" 始终显示、"auto" 设置了 minLength/maxLength 时自动显示、"never" 不显示。默认 auto。

**getLength**（属性）：自定义获取字符长度的方法。接受字符串参数，返回长度数值。

**inputOnOutlimit**（属性）：超出最大字符数时是否允许继续输入。为 false 时输入长度超出 maxLength 会被截断。默认允许。

**autoWidth**（属性）：宽度随内容自适应。默认关闭。

**format**（属性）：值格式化函数，控制显示格式。接受字符串参数，返回格式化后的字符串。

**validate**（属性）：值有效性判断函数。接受字符串参数，返回布尔值表示是否有效。

**valueOnInvalidChange**（属性）：输入无效值时在 blur/pressEnter 时的处理方式。true 纠正为上一次合法值；false/undefined 不处理；函数则使用返回值作为纠正值。

**showPasswordEvent**（属性）：密码显示切换的触发方式。"click" 点击切换、"pointerdown" 按住显示松开隐藏。默认 pointerdown。

**passwordPlaceholder**（属性）：密码模式下单个字符的占位符。默认为圆点字符。

### 插槽区域

**prepend 插槽**（插槽）：输入框前置区域（外部，含边框）。适合放固定文字如 "https://"。

**append 插槽**（插槽）：输入框后置区域（外部，含边框）。适合放后缀如 ".com"。

**prefix 插槽**（插槽）：输入框内部前缀图标。

**suffix 插槽**（插槽）：输入框内部后缀图标。

**extra 插槽**（插槽）：输入框后缀区域的额外内容（位于清空按钮、密码图标、字数统计之后）。

### 事件

**input**（事件）：实时输入时触发。

**change**（事件）：值改变且失焦时触发。

**focus**（事件）：聚焦时触发。

**blur**（事件）：失焦时触发。

**clear**（事件）：点击清空按钮时触发。

**pressEnter**（事件）：按下回车键时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），大尺寸输入框高度从标准缩至 36px、文字变小、图标缩小；中尺寸高度缩至 28px。在平板竖屏及以下（≤840px），大尺寸高度恢复标准控件尺寸、图标使用中号。手机（≤600px）内边距进一步缩小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OInput } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string \| number` | — | — | 输入值（v-model） |
| defaultValue | `string \| number` | — | — | 非受控默认值 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | — | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色状态 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'` | 样式 |
| disabled | `boolean` | — | `false` | 禁用 |
| readonly | `boolean` | — | `false` | 只读 |
| clearable | `boolean` | — | `false` | 可清空 |
| type | `string` | `'text'` / `'password'` | `'text'` | 输入类型 |
| placeholder | `string` | — | — | 占位文本 |
| inputId | `string` | — | — | input 元素 id，用于 label 关联 |
| maxLength | `number` | — | — | 最大字符数 |
| minLength | `number` | — | — | 最小字符数 |
| showLength | `string` | `'always'` / `'auto'` / `'never'` | `'auto'` | 字数统计显示模式 |
| getLength | `(val: string) => number` | — | — | 自定义获取长度方法 |
| inputOnOutlimit | `boolean` | — | `true` | 超限可继续输入 |
| autoWidth | `boolean` | — | `false` | 宽度自适应 |
| format | `(value: string) => string` | — | — | 值格式化函数 |
| validate | `(value: string) => boolean` | — | — | 值有效性判断 |
| valueOnInvalidChange | `boolean \| (inputValue: string, lastValidInputValue: string) => string` | — | — | 无效值处理方式 |
| showPasswordEvent | `string` | `'click'` / `'pointerdown'` | `'pointerdown'` | 密码显示触发方式 |
| passwordPlaceholder | `string` | — | `'\u2022'` | 密码字符占位符 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: string)` | 值变化时 |
| change | `(value: string)` | 值改变且失焦 |
| input | `(evt: Event, value: string)` | 实时输入 |
| focus | `(evt: FocusEvent)` | 聚焦 |
| blur | `(evt: FocusEvent)` | 失焦 |
| clear | `(evt?: Event)` | 点击清空 |
| pressEnter | `(evt: KeyboardEvent)` | 按下回车 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| prepend | — | 始终 | 前置区域（外部） | 无 |
| append | — | 始终 | 后置区域（外部） | 无 |
| prefix | — | 始终 | 内部前缀 | 无 |
| suffix | — | 始终 | 内部后缀 | 无 |
| extra | — | 始终 | 后缀区域末尾额外内容 | 无 |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| focus() | — | 聚焦输入框 |
| blur() | — | 移除焦点 |
| clear() | — | 清空内容 |
| inputEl() | — | 获取原生 input 元素 |
| togglePassword() | — | 切换密码显示 |

### 典型使用场景与调用模板

**场景 1：基础输入框**
适用于：通用文本输入
```vue
<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
<template>
  <OInput v-model="value" placeholder="请输入" />
</template>
```

**场景 2：带清空和字数统计**
适用于：有长度限制的输入
```vue
<OInput v-model="value" clearable show-length="always" :max-length="100" />
```

**场景 3：带前后缀图标**
适用于：搜索框
```vue
<OInput v-model="search" placeholder="搜索">
  <template #prefix><OIconSearch /></template>
</OInput>
```

**场景 4：带前置/后置内容**
适用于：URL 输入等
```vue
<OInput v-model="domain" placeholder="输入域名">
  <template #prepend>https://</template>
  <template #append>.com</template>
</OInput>
```

**场景 5：密码框**
适用于：密码输入
```vue
<OInput v-model="password" type="password" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础输入 | `v-model` + `placeholder` | 最常见用法 |
| 可清空 | `clearable` | 显示清空按钮 |
| 字数限制 | `max-length` + `show-length="always"` | 带统计 |
| 密码框 | `type="password"` | 可切换显示 |
| 错误状态 | `color="danger"` | 红色边框 |
| 搜索框 | `#prefix` + `clearable` | 带搜索图标 |

### 响应式行为表

| 维度 | ≤600px | 601–840px | 841–1200px | >1200px |
|------|--------|----------|-----------|---------|
| 大尺寸高度 | 标准控件尺寸 | 标准控件尺寸 | 36px | 标准 |
| 大尺寸文字 | tip1 | tip1 | tip1 | 标准 |
| 中尺寸高度 | 28px | 28px | 28px | 标准 |
| 大尺寸内边距 | 0 11px | 0 11px | 标准 | 标准 |

