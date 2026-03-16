# OForm 表单

## Part A：设计理解卡

OForm 是表单组件，用于收集和校验用户输入。包含 OForm（表单容器）和 OFormItem（表单项）。支持水平、垂直、行内三种布局，内置验证规则系统。

### 布局

**layout**（属性）：表单布局方式。"h" 水平布局，标签与控件同行；"v" 垂直布局，标签在控件上方；"inline" 行内布局，多个表单项在同一行。默认水平。

**hasRequired**（属性）：是否有必填项，用于统一缩进对齐（预留必填星号的空间）。默认关闭。

### 标签配置（OForm 全局 / OFormItem 局部）

**labelWidth**（属性）：标签宽度，CSS 值。OForm 上统一设置，OFormItem 可单独覆盖。

**labelAlign**（属性）：标签与控件的垂直对齐方式。"top" 顶部对齐、"center" 居中对齐、"bottom" 底部对齐。

**labelJustify**（属性）：标签的水平对齐方式。"left" 左对齐、"center" 居中、"right" 右对齐。

### 数据模型

**model**（属性）：表单数据对象。传入后，OFormItem 通过 field 属性关联模型中的字段，实现自动校验和重置。

---

### OFormItem 表单项

**field**（属性）：对应 model 中的字段名（支持路径格式如 "a.b"）。使用 rules 校验时必填。

**label**（属性）：表单项标签文字。

**required**（属性）：是否为必填项，显示红色星号。默认关闭。

**rules**（属性）：校验规则数组。支持三种规则类型：必填规则（required + message）、类型规则（type + message）、自定义校验函数（validator 返回 danger/warning/success）。每条规则可设置触发时机（change/input/blur/focus）。

**defaultTrigger**（属性）：默认校验触发事件。手动校验或提交时未指定触发方式时使用。

### OFormItem 插槽

**label 插槽**（插槽）：替换标签文字区域。替换后 label 属性失效。

**symbol 插槽**（插槽）：替换必填星号区域的默认星号。

**default 插槽**（插槽）：放置表单控件（OInput、OSelect 等）。

**message 插槽**（插槽）：替换校验错误/警告消息区域。可获取 message（消息数组）和 type（danger/warning）。

**extra 插槽**（插槽）：表单项底部的额外提示信息。

### 事件

**submit**（事件）：表单提交时触发（自动校验所有字段），可获取校验结果。

**validate**（事件）：手动调用 validate 方法后触发。

**clear**（事件）：清除校验状态后触发。

**reset**（事件）：重置表单后触发。

📱 **响应式行为**：在笔记本尺寸（≤1440px），表单项间距和标签间距缩小；平板横屏（≤1200px）进一步缩小；平板竖屏及以下（≤840px），标签与控件间距缩至 8px；手机（≤600px），校验消息边距调整。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OForm, OFormItem } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type ValidatorResultTypeT = 'danger' | 'warning' | 'success';
type TriggerT = 'change' | 'input' | 'blur' | 'focus' | `e-${string}`;

type ValidatorRuleT = {
  triggers?: TriggerT | TriggerT[];
  validator?: (value: any) => { type: ValidatorResultTypeT; message?: string } | void;
};
type RequiredRuleT = {
  required: boolean;
  message?: string;
  triggers?: TriggerT | TriggerT[];
};
type TypeRuleT = {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  message?: string;
  triggers?: TriggerT | TriggerT[];
};
type RulesT = ValidatorRuleT | RequiredRuleT | TypeRuleT;
```

### OForm Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| model | `object` | — | — | 表单数据对象 |
| hasRequired | `boolean` | — | `false` | 是否有必填项 |
| layout | `string` | `'h'` / `'v'` / `'inline'` | `'h'` | 布局方式 |
| labelAlign | `string` | `'top'` / `'center'` / `'bottom'` | — | 标签垂直对齐 |
| labelJustify | `string` | `'left'` / `'center'` / `'right'` | — | 标签水平对齐 |
| labelWidth | `string` | CSS 值 | — | 标签宽度 |

### OFormItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| field | `string` | — | — | 对应 model 中的字段名 |
| label | `string` | — | — | 标签文字 |
| required | `boolean` | — | `false` | 是否必填 |
| labelAlign | `string` | `'top'` / `'center'` / `'bottom'` | 继承 OForm | 标签垂直对齐 |
| labelJustify | `string` | `'left'` / `'center'` / `'right'` | 继承 OForm | 标签水平对齐 |
| labelWidth | `string` | CSS 值 | 继承 OForm | 标签宽度 |
| rules | `RulesT[]` | — | — | 校验规则数组 |
| defaultTrigger | `TriggerT` | `'change'` / `'input'` / `'blur'` / `'focus'` | — | 默认校验触发事件 |

### OForm Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| submit | `(results: FieldResultT[])` | 表单提交时（自动校验） |
| validate | `(results: FieldResultT[])` | 手动调用 validate 后 |
| clear | `(filed?: string \| string[])` | 清除校验状态后 |
| reset | `(filed?: string \| string[])` | 重置表单后 |

### Slots 表

#### OForm Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 表单项列表 | 无 |

#### OFormItem Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| label | — | 始终 | 标签文字区域 | `{{ label }}` |
| symbol | — | 始终 | 必填星号 | `*` |
| default | — | 始终 | 表单控件区域 | 无 |
| message | `{ message: string[], type: string }` | 校验失败时 | 错误消息区域 | 消息列表 |
| extra | — | 始终（不传则不渲染） | 底部提示区域 | 无 |

### 暴露方法（OForm）

| 方法名 | 参数 | 说明 |
|--------|------|------|
| validate(filed?) | `filed?: string \| string[]` | 校验表单（可指定字段） |
| resetFields(filed?) | `filed?: string \| string[]` | 重置表单（清除校验 + 恢复初始值） |
| clearValidate(filed?) | `filed?: string \| string[]` | 仅清除校验状态 |

### 典型使用场景与调用模板

**场景 1：基础表单（带校验）**
适用于：用户注册、信息填写
```vue
<script setup>
import { ref, reactive } from 'vue';
const formRef = ref();
const formData = reactive({ name: '', email: '' });
const rules = [
  { required: true, message: '请输入', triggers: 'blur' },
];
const onSubmit = (results) => {
  const hasError = results.some(r => r?.type === 'danger');
  if (!hasError) { /* 提交数据 */ }
};
</script>
<template>
  <OForm ref="formRef" :model="formData" has-required @submit="onSubmit">
    <OFormItem field="name" label="姓名" required :rules="rules">
      <OInput v-model="formData.name" />
    </OFormItem>
    <OFormItem field="email" label="邮箱" :rules="rules">
      <OInput v-model="formData.email" />
    </OFormItem>
    <OButton html-type="submit" color="primary">提交</OButton>
  </OForm>
</template>
```

**场景 2：垂直布局表单**
适用于：移动端或窄空间
```vue
<OForm :model="formData" layout="v">
  <OFormItem field="name" label="姓名">
    <OInput v-model="formData.name" />
  </OFormItem>
</OForm>
```

**场景 3：自定义校验规则**
适用于：密码确认等复杂校验
```vue
<OFormItem field="confirmPwd" label="确认密码" :rules="[
  { required: true, message: '请确认密码' },
  { validator: (val) => val !== formData.password
    ? { type: 'danger', message: '两次密码不一致' }
    : undefined,
    triggers: 'blur'
  }
]">
  <OInput v-model="formData.confirmPwd" type="password" />
</OFormItem>
```

**场景 4：自定义标签和消息插槽**
适用于：标签需图标或消息需特殊展示
```vue
<OFormItem field="name">
  <template #symbol><OIconStar /></template>
  <template #label><OIconUser /> 用户名</template>
  <OInput v-model="formData.name" />
  <template #message="{ message, type }">
    <ul><li v-for="msg in message" :key="msg">{{ msg }}</li></ul>
  </template>
  <template #extra>用户名长度 4-20 个字符</template>
</OFormItem>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础表单 | `model` + `has-required` + `layout="h"` | 最常见用法 |
| 垂直布局 | `layout="v"` | 移动端友好 |
| 行内表单 | `layout="inline"` | 搜索栏等 |
| 右对齐标签 | `label-justify="right"` + `label-width="120px"` | 标签对齐 |
| 带校验 | `field` + `rules` + `:model` | 自动校验 |

### 响应式行为表

| 维度 | ≤600px | 601–840px | 841–1200px | 1201–1440px | >1440px |
|------|--------|----------|-----------|-------------|---------|
| 表单项间距 | 12px | 12px | 12px | 16px | 标准 |
| 标签-控件间距 | 8px | 8px | 16px | 24px | 标准 |

