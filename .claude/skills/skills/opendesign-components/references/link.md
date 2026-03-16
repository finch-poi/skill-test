# OLink 链接

## Part A：设计理解卡

OLink 是链接组件，用于页面间导航或触发操作。支持五种颜色主题、四种尺寸、前后缀图标、加载状态，以及全局配置回调。

### 外观

**color**（属性）：链接颜色主题。"normal" 默认色、"primary" 品牌色、"success" 成功绿色、"warning" 警告橙色、"danger" 危险红色。默认 normal。

**size**（属性）：链接尺寸。"large" 大号、"medium" 中号、"small" 小号、"auto" 自动继承父级字号。默认 auto。

**hoverBg**（属性）：悬停时是否显示背景色块。默认关闭。

**hoverUnderline**（属性）：悬停时是否显示下划线。默认开启。

### 导航

**href**（属性）：链接指向的 URL 地址。

**target**（属性）：链接打开方式。"_blank" 新窗口、"_parent" 父框架、"_self" 当前页面、"_top" 顶层框架。

**tag**（属性）：渲染的 HTML 标签。默认为 "a" 标签。可改为 "span"、"div" 等。

### 状态

**disabled**（属性）：禁用链接。禁用后点击无效、样式变灰。默认关闭。

**loading**（属性）：加载中状态。开启后前缀图标替换为旋转加载图标，点击无效。默认关闭。

### 图标区域

**icon**（属性）：前缀图标组件。loading 开启时图标被替换为加载图标。

**icon 插槽**（插槽）：替换前缀图标区域。使用后 icon 属性失效。loading 开启时此插槽也会被替换为加载图标。

**suffix**（属性）：是否显示后缀箭头图标。默认关闭。

**suffix 插槽**（插槽）：替换后缀区域。使用后 suffix 属性的默认箭头失效，渲染自定义内容。

### 全局配置

**global**（属性）：是否启用全局配置回调。开启后点击链接会触发 OConfigProvider 中配置的 link.click 回调。默认开启。

### 事件

**click**（事件）：点击链接时触发。禁用或加载状态下不触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），大号链接的文字和图标缩小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OLink } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| href | `string` | — | — | 链接 URL |
| target | `string` | `'_blank'` / `'_parent'` / `'_self'` / `'_top'` | — | 打开方式 |
| loading | `boolean` | — | `false` | 加载中 |
| color | `ColorT` | `'normal'` / `'primary'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| size | `LinkSizeT` | `'large'` / `'medium'` / `'small'` / `'auto'` | `'auto'` | 尺寸 |
| disabled | `boolean` | — | `false` | 禁用 |
| icon | `Component` | — | — | 前缀图标组件 |
| suffix | `boolean` | — | `false` | 显示后缀箭头 |
| hoverBg | `boolean` | — | `false` | 悬停背景 |
| hoverUnderline | `boolean` | — | `true` | 悬停下划线 |
| tag | `string` | — | `'a'` | HTML 标签 |
| global | `boolean` | — | `true` | 全局配置生效 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| click | `(val: MouseEvent)` | 点击链接（非禁用/加载时） |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 链接文字区域 | 无 |
| icon | — | 有 icon prop 或 icon 插槽或 loading 时渲染 | 前缀图标 | `<component :is="props.icon" />` |
| suffix | — | 有 suffix prop 或 suffix 插槽时渲染 | 后缀区域 | `<IconLinkArrow />` 箭头图标 |

### 插槽层级关系

```
default（链接文字）
icon（前缀图标，loading 时强制替换为 IconLoading）
suffix（后缀图标）
```

三个插槽互不嵌套，各自独立。

### 典型使用场景与调用模板

**场景 1：基础链接**
适用于：页面跳转
```vue
<OLink href="https://example.com" target="_blank" color="primary">查看更多</OLink>
```

**场景 2：带前缀图标**
适用于：强调链接功能
```vue
<OLink color="warning" size="medium">
  <template #icon><OIconEye /></template>
  了解更多
</OLink>
```

**场景 3：带后缀箭头**
适用于：导航类链接
```vue
<OLink color="primary" suffix>查看详情</OLink>
```

**场景 4：自定义前后缀**
适用于：丰富的链接样式
```vue
<OLink color="warning" size="medium">
  <template #icon><OIconEye /></template>
  <template #suffix><OIconChevronRight /></template>
  了解更多
</OLink>
```

**场景 5：加载状态**
适用于：点击后异步操作
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(false);
const handleClick = () => {
  loading.value = true;
  setTimeout(() => { loading.value = false; }, 3000);
};
</script>
<template>
  <OLink color="primary" :loading="loading" @click="handleClick">点击加载</OLink>
</template>
```

**场景 6：全局配置回调**
适用于：统一拦截链接行为（如埋点）
```vue
<OConfigProvider :link="{ click: (e, params, attrs) => { console.log(params.href); } }">
  <OLink href="/page" color="primary">带全局回调的链接</OLink>
</OConfigProvider>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 普通跳转 | `href` + `target` + `color` | 最常见用法 |
| 带图标 | `#icon` 插槽 + `size` | 图标 + 文字 |
| 导航箭头 | `suffix` | 显示右箭头 |
| 悬停效果 | `hover-bg` + `:hover-underline="false"` | 背景高亮代替下划线 |
| 异步操作 | `:loading` + `@click` | 点击后显示加载 |

### 响应式行为表

| 维度 | ≤1440px | >1440px |
|------|---------|---------|
| large 字号 | 缩小（tip1） | 标准 |
| large 图标 | 缩小（xs） | 标准 |

