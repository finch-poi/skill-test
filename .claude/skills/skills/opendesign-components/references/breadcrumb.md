# OBreadcrumb 面包屑

## Part A：设计理解卡

OBreadcrumb 是面包屑导航组件，显示当前页面在站点层级中的位置路径，帮助用户快速回到上级页面。包含两个组件：OBreadcrumb（容器）和 OBreadcrumbItem（面包屑项）。

### OBreadcrumb 容器

**separator**（属性）：全局分隔符字符。设置后所有面包屑项之间都显示该字符。不传时默认显示右箭头图标。

**default 插槽**（插槽）：放置 OBreadcrumbItem 子项。

### OBreadcrumbItem 面包屑项

**href**（属性）：链接跳转地址。设置后该项渲染为 `<a>` 标签，可点击跳转。不设置时渲染为普通文本 `<span>`，有利于 SEO。

**target**（属性）：链接打开方式，与 href 配合使用。"_self" 当前窗口、"_blank" 新窗口等。默认 "_self"。

**to**（属性）：Vue Router 路由跳转对象。设置后该项渲染为 `<router-link>` 组件，实现 SPA 内部导航。当 href 和 to 同时存在时，优先使用 to 进行跳转。

**replace**（属性）：路由跳转时是否替换浏览器历史记录（而非新增），与 to 配合使用。默认关闭。

**separator**（属性）：该项的分隔符字符，会覆盖父级 OBreadcrumb 的 separator 设置。

**default 插槽**（插槽）：面包屑项的显示内容（文字、图标等）。

**separator 插槽**（插槽）：替换分隔符的渲染。替换后 separator 属性和父级 separator 均失效。不传时显示属性值或默认箭头图标。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），文字变小、分隔符图标缩小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';
</script>
```

### OBreadcrumb Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| separator | `string \| number` | — | — | 全局分隔符字符，不传时显示默认箭头图标 |

### OBreadcrumbItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| href | `string` | — | — | 链接跳转地址，设置后渲染为 `<a>` 标签 |
| target | `string` | `'_blank'` / `'_parent'` / `'_self'` / `'_top'` | `'_self'` | 链接打开方式 |
| to | `string \| object` | — | — | Vue Router 路由对象，设置后渲染为 `<router-link>` |
| replace | `boolean` | — | `false` | 路由跳转时是否替换历史记录 |
| separator | `string \| number` | — | — | 分隔符字符，覆盖父级设置 |

### Events 表

本组件无自定义事件。

### Slots 表

**OBreadcrumb：**

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 面包屑项列表 | 无 |

**OBreadcrumbItem：**

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 面包屑项的文本内容 | 无 |
| separator | — | 始终 | 分隔符区域 | separator 属性值或默认箭头图标 |

### 插槽层级关系

```
OBreadcrumb default
└── OBreadcrumbItem
    ├── default（面包屑项内容）
    └── separator（分隔符，使用后属性失效）
```

### 渲染标签优先级

| 条件 | 渲染标签 | 说明 |
|------|---------|------|
| `to` 已设置 | `<router-link>` | SPA 内部导航，优先级最高 |
| `href` 已设置 | `<a>` | 普通链接跳转 |
| 均未设置 | `<span>` | 纯文本，有利于 SEO |

### 典型使用场景与调用模板

**场景 1：基础面包屑**
适用于：简单页面层级导航
```vue
<OBreadcrumb>
  <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
  <OBreadcrumbItem href="/products">产品列表</OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

**场景 2：配合 Vue Router**
适用于：SPA 应用内部导航
```vue
<OBreadcrumb>
  <OBreadcrumbItem to="/">首页</OBreadcrumbItem>
  <OBreadcrumbItem :to="{ name: 'products' }">产品列表</OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

**场景 3：自定义分隔符**
适用于：需要不同于默认箭头的分隔样式
```vue
<OBreadcrumb separator="/">
  <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

**场景 4：带图标的面包屑项**
适用于：首页等特殊项需要图标装饰
```vue
<OBreadcrumb>
  <OBreadcrumbItem href="/">
    <OIconHome style="margin-right: 4px; font-size: 16px;" />首页
  </OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 普通链接导航 | `href` + `target="_self"` | 最常见用法 |
| SPA 路由导航 | `to` | 使用 Vue Router |
| 新窗口打开 | `href` + `target="_blank"` | 外部链接 |
| 当前页面（末尾项） | 不设 href/to | 渲染为纯文本 span |

### 响应式行为表

| 维度 | ≤1200px | >1200px |
|------|---------|---------|
| 文字大小 | 缩小（tip2） | 标准 |
| 分隔符图标大小 | 缩小 | 标准 |

