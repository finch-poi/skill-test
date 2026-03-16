# OLoading 加载

## Part A：设计理解卡

OLoading 是加载状态组件，基于 OLayer 浮层实现。可覆盖在页面或容器上，显示加载图标和文字提示。支持四种尺寸、自定义图标、遮罩层等功能。

### 尺寸

**size**（属性）：加载图标尺寸。"mini" 超小号、"small" 小号、"medium" 中号、"large" 大号。默认 small。

### 内容

**label**（属性）：加载提示文字。

**icon**（属性）：自定义加载图标组件。不传时使用默认旋转加载图标。

**iconRotating**（属性）：自定义图标是否旋转。默认关闭（默认图标始终旋转）。

### 显示控制

**visible**（属性）：是否显示加载层（v-model 双向绑定）。

### 容器配置（继承自 OLayer）

**wrapper**（属性）：加载层挂载位置。"body" 挂载到 body、CSS 选择器字符串挂载到指定元素、不传则在组件位置渲染。

**mask**（属性）：是否显示遮罩层。

**unmountOnHide**（属性）：隐藏时是否销毁 DOM。

**mainClass**（属性）：主内容区域自定义类名。

**mainTransition**（属性）：主内容过渡动画名。

**maskTransition**（属性）：遮罩层过渡动画名。

### 插槽区域

**default 插槽**（插槽）：替换整个加载内容区域（图标 + 文字）。使用后内部 icon 和 label 插槽全部失效。

**icon 插槽**（插槽）：替换加载图标区域。使用后 icon 属性和 iconRotating 属性失效。

**label 插槽**（插槽）：替换加载文字区域。使用后 label 属性失效。

### 事件

**change**（事件）：加载层显示/隐藏状态变化时触发。

📱 **响应式行为**：在平板竖屏到笔记本尺寸（841–1440px），large 和 medium 尺寸的图标、文字、间距均缩小；在平板竖屏及以下（≤840px），进一步缩小至更小尺寸。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OLoading } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | `false` | 是否显示（v-model） |
| size | `SizeT \| 'mini'` | `'mini'` / `'small'` / `'medium'` / `'large'` | `'small'` | 尺寸 |
| label | `string` | — | — | 加载文字 |
| icon | `Component` | — | — | 自定义图标 |
| iconRotating | `boolean` | — | — | 自定义图标是否旋转 |
| wrapper | `string \| HTMLElement \| null` | `'body'` / CSS 选择器 / `null` | `'body'` | 挂载位置 |
| mask | `boolean` | — | `true` | 是否显示遮罩 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时销毁 DOM |
| mainClass | `string \| object \| array` | — | — | 主内容类名 |
| mainTransition | `string` | — | `'o-zoom-fade2'` | 主内容过渡动画 |
| maskTransition | `string` | — | `'o-fade-in'` | 遮罩过渡动画 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean, evt?: MouseEvent)` | 显示状态变化时 |
| change | `(val: boolean)` | 显示/隐藏时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 整个加载内容（图标+文字） | 图标 + label 文字 |
| icon | — | 未使用 default 插槽时 | 加载图标 | `<IconLoading />` 旋转图标 |
| label | — | 未使用 default 插槽时，且有 label prop 或 label 插槽 | 加载文字 | `{{ label }}` |

### 插槽层级关系

```
default（使用后内部全部失效）
├── icon
└── label
```

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| toggle(show?) | `show?: boolean` | 切换显示状态 |

### 典型使用场景与调用模板

**场景 1：基础加载**
适用于：页面数据加载
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
<template>
  <OLoading v-model:visible="loading" label="加载中..." />
</template>
```

**场景 2：覆盖指定容器**
适用于：局部加载遮罩
```vue
<div id="container" style="position: relative;">
  <OLoading v-model:visible="loading" wrapper="#container" mask label="请稍候" />
  <!-- 容器内容 -->
</div>
```

**场景 3：全屏加载**
适用于：整页加载
```vue
<OLoading v-model:visible="loading" wrapper="body" mask size="large" label="页面加载中" />
```

**场景 4：自定义图标**
适用于：品牌定制加载效果
```vue
<OLoading v-model:visible="loading" :icon="MyCustomIcon" icon-rotating label="处理中" />
```

**场景 5：完全自定义内容**
适用于：复杂加载展示
```vue
<OLoading v-model:visible="loading">
  <div class="custom-loading">
    <MyAnimation />
    <p>正在为您准备数据...</p>
  </div>
</OLoading>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础加载 | `v-model:visible` + `label` | 最常见用法 |
| 全屏遮罩 | `wrapper="body"` + `mask` + `size="large"` | 整页加载 |
| 局部遮罩 | `wrapper="#id"` + `mask` | 区域加载 |
| 自定义图标 | `:icon` + `icon-rotating` | 品牌图标 |
| 无文字 | 仅 `v-model:visible` | 纯图标加载 |

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| large 图标 | 2xl | 4xl | 标准 |
| large 文字 | tip2 | tip1 | 标准 |
| large 间距 | 8px | 12px | 标准 |
| medium 图标 | 2xl | 2xl | 标准 |
| medium 文字 | tip2 | tip2 | 标准 |
| medium 间距 | 4px | 8px | 标准 |

