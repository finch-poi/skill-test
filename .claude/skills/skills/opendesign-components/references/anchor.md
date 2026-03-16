# OAnchor 锚点

## Part A：设计理解卡

OAnchor 是一个页面内导航组件，让用户快速跳转到页面指定区域，同时随页面滚动自动高亮当前所在区域的锚点项。包含两个组件：OAnchor（容器）和 OAnchorItem（锚点项）。

### OAnchor 容器

**layout**（属性）：控制锚点的排列方向。"v" 垂直排列，适合侧边栏导航；"h" 水平排列，适合页面顶部导航栏。默认垂直排列。水平模式支持吸顶效果和溢出时自动横向滚动遮罩。

**size**（属性）：控制锚点项的大小风格，仅垂直模式有效。"medium" 标准尺寸；"small" 紧凑尺寸；"menu" 菜单混合模式，适合侧边菜单或移动端菜单场景，子项有悬停背景色。默认 medium。

**container**（属性）：指定锚点监听哪个滚动容器。默认监听整个页面窗口滚动。可传入 CSS 选择器字符串（如 "#wrap"）指定特定容器。

**targetOffset**（属性）：点击锚点跳转后，目标元素距离容器顶部的偏移距离（像素）。同时也影响滚动时锚点激活的判定位置。默认 0。

**bounds**（属性）：锚点激活判定的额外边界范围（像素）。配合 targetOffset 使用可实现"点击跳到顶部，但滚动到中间才高亮"的效果。默认 5。

**changeHash**（属性）：点击锚点时是否同步更新浏览器地址栏的 hash 值。关闭后适合需要手动控制 URL 的场景。默认开启。

**default 插槽**（插槽）：放置 OAnchorItem 子项。

**change**（事件）：当前激活的锚点项发生变化时触发，可获得新激活项的链接地址。

### OAnchorItem 锚点项

**title**（属性）：锚点项显示的标题文字。默认空字符串。

**href**（属性）：锚点跳转的目标元素，以 "#" 前缀开头（如 "#section1"）。也支持外部链接。必填。

**observeHref**（属性）：指定滚动监听的目标元素（带 "#" 前缀），不传则默认监听 href 指向的元素。适用于跳转地址和监听区域不同的场景。

**target**（属性）：链接打开方式。"_self" 当前页面跳转，"_blank" 新窗口打开等。默认 "_self"。

**disabled**（属性）：禁用锚点项，点击无响应且样式变灰。默认关闭。

**title 插槽**（插槽）：替换锚点项的默认标题渲染。替换后 title 属性失效。可用于在标题旁添加图标等自定义内容。

**default 插槽**（插槽）：放置子级 OAnchorItem，实现多级嵌套锚点。仅垂直模式下有效，水平模式会忽略子项。

**item-click**（事件）：点击锚点项时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），锚点项文字变小、间距缩小；水平模式下项间距从 32px 缩至 24px。在平板竖屏及以下（≤840px），水平模式项间距进一步缩至 16px。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OAnchor, OAnchorItem } from '@opensig/opendesign';
</script>
```

### OAnchor Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| layout | `AnchorDirectionT` | `'h'` / `'v'` | `'v'` | 锚点方向，水平或垂直 |
| size | `AnchorSizeT` | `'medium'` / `'small'` / `'menu'` | `'medium'` | 尺寸风格，仅垂直模式支持 |
| container | `string \| HTMLElement \| Window` | CSS 选择器 / DOM 元素 / Window | `window` | 滚动监听容器 |
| bounds | `number` | — | `5` | 锚点激活判定边界（px） |
| targetOffset | `number` | — | `0` | 目标元素距容器顶部偏移量（px） |
| changeHash | `boolean` | — | `true` | 点击锚点时是否改变浏览器 hash |

### OAnchor Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| change | `(link: string)` | 激活的锚点项变化时 |
| ~~click~~ | `(ev: MouseEvent, link?: string)` | ~~已废弃，计划 1.2.0 移除~~ |

### OAnchor Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 整个锚点项列表区域 | 无 |

### OAnchorItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| title | `string` | — | `''` | 锚点标题 |
| href | `string` | — | **必填** | 跳转目标（带 # 前缀，如 `#section1`） |
| observeHref | `string` | — | — | 滚动监听目标（带 # 前缀），不传则监听 href |
| target | `AnchorTargetT` | `'_blank'` / `'_parent'` / `'_self'` / `'_top'` | `'_self'` | 链接打开方式 |
| disabled | `boolean` | — | `false` | 是否禁用 |

### OAnchorItem Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| item-click | `(event: MouseEvent)` | 点击锚点项时 |

### OAnchorItem Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| title | — | 始终 | 标题文本区域 | `{{ title }}` |
| default | — | 仅垂直模式（`layout="v"`） | 子项嵌套区域 | 无 |

### 插槽层级关系

```
OAnchor default
└── OAnchorItem
    ├── title（替换标题文字）
    └── default（嵌套子级，仅垂直模式生效）
        └── OAnchorItem（可继续嵌套）
```

### 典型使用场景与调用模板

**场景 1：基础垂直锚点导航**
适用于：侧边栏文章目录导航
```vue
<OAnchor container="#content" :target-offset="10">
  <OAnchorItem href="#section1" title="第一章" />
  <OAnchorItem href="#section2" title="第二章" />
  <OAnchorItem href="#section3" title="第三章" />
</OAnchor>
```

**场景 2：多级嵌套锚点**
适用于：层级较深的文档目录
```vue
<OAnchor container="#content">
  <OAnchorItem href="#chapter1" title="第一章">
    <OAnchorItem href="#section1-1" title="1.1 概述" />
    <OAnchorItem href="#section1-2" title="1.2 详情">
      <OAnchorItem href="#section1-2-1" title="1.2.1 子节" />
    </OAnchorItem>
  </OAnchorItem>
  <OAnchorItem href="#chapter2" title="第二章" />
</OAnchor>
```

**场景 3：水平锚点（带吸顶）**
适用于：页面顶部导航条，父容器需设置 `overflow-y: auto/scroll`
```vue
<div id="page-container" style="height: 100vh; overflow-y: auto;">
  <OAnchor layout="h" container="#page-container">
    <OAnchorItem href="#block1" title="区块1" />
    <OAnchorItem href="#block2" title="区块2" />
    <OAnchorItem href="#block3" title="区块3" />
  </OAnchor>
  <div id="block1">...</div>
  <div id="block2">...</div>
  <div id="block3">...</div>
</div>
```

**场景 4：自定义标题插槽**
适用于：标题需要图标或复杂内容
```vue
<OAnchor container="#wrap">
  <OAnchorItem href="#section1">
    <template #title>
      <span style="display: flex; align-items: center;">
        第一节 <OIconLink style="margin-left: 4px;" />
      </span>
    </template>
  </OAnchorItem>
</OAnchor>
```

**场景 5：跳转地址与监听地址分离**
适用于：点击跳转到外部链接，但滚动激活关联本页区域
```vue
<OAnchor container="#wrap">
  <OAnchorItem
    href="https://docs.openeuler.org"
    observe-href="#local-section"
    title="外部链接（监听本地区域）"
  />
</OAnchor>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 侧边文档导航 | `container="#content"` + `size="medium"` | 最常见用法 |
| 紧凑侧边导航 | `container="#content"` + `size="small"` | 文字更小、间距更紧凑 |
| 菜单式导航 | `size="menu"` | 子项有悬停背景色，适合左侧菜单 |
| 页面顶部横向导航 | `layout="h"` + `container="#page"` | 支持吸顶和溢出滚动 |
| 精确跳转但宽松激活 | `:target-offset="10"` + `:bounds="100"` | 跳到顶部 10px，但滚到 110px 才激活 |
| 不修改 URL hash | `:change-hash="false"` | 适合 SPA 自行管理路由 |

### 响应式行为表

| 维度 | ≤840px | 841–1200px | 1201–1680px | >1680px |
|------|--------|-----------|-------------|---------|
| 垂直模式字号 | 不变 | 缩小（tip1/tip2） | 标准（text1/tip1） | 标准 |
| 水平模式项间距 | 16px | 24px | 32px | 32px |
| 水平模式项内边距 | — | 9px | 12px | 12px |

### CSS 变量定制

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `--anchor-content-max-width` | 水平模式内容区最大宽度 | `unset` |
| `--anchor-z-index` | 水平模式 z-index | `initial` |
| `--anchor-offset-top` | 水平模式吸顶偏移 | `0` |
| `--anchor-item-max-row` | 标题最大行数（超出省略） | `2`（水平模式为 `1`） |

