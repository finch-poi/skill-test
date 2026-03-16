---
name: opendesign-components
description: OpenDesign 组件库使用指南。当需要使用 OpenDesign Vue 组件库快速搭建页面时使用此 skill。支持所有 OpenDesign 组件（46 个），包括按钮、表单、表格、对话框、卡片、图标、滑块、步骤条、轻提示等常用 UI 组件。使用场景：(1) 使用 OpenDesign 组件构建 Vue 页面，(2) 查找组件使用方法和属性说明，(3) 获取组件代码示例
---

# OpenDesign 组件库使用指南

OpenDesign 是一个面向 openEuler 生态的 Vue 3 组件库，提供 59 个可复用 UI 组件。组件库有六套独立主题，**每个社区项目在初始化时选定一套，运行时只切换 dark/light 模式**。

## 安装

### 1. 安装依赖包

```bash
pnpm add @opensig/opendesign @opensig/opendesign-token
# 或
npm install @opensig/opendesign @opensig/opendesign-token
```

- `@opensig/opendesign` — 组件库
- `@opensig/opendesign-token` — 设计 token（必需），包含主题 CSS 变量

### 2. 选择主题并引入样式

六套主题对应不同社区，**项目初始化时选定其中一套**，引入对应的 token 文件：

**openEuler 社区项目：**
```typescript
// main.ts
import '@opensig/opendesign-token/themes/e.dark.token.css'  // openEuler 主题 token
import '@opensig/opendesign-token/themes/e.light.token.css'  // openEuler 主题 token
import '@opensig/opendesign-token/fonts/font-harmony.css' // 鸿蒙字体
```

**Ascend 社区项目：**
```typescript
// main.ts
import '@opensig/opendesign-token/themes/a.dark.token.css'  // Ascend 主题 token
import '@opensig/opendesign-token/themes/a.light.token.css'  // Ascend 主题 token
import '@opensig/opendesign-token/fonts/font-harmony.css' // 鸿蒙字体
```

**Kunpeng 社区项目：**
```typescript
// main.ts
import '@opensig/opendesign-token/themes/k.dark.token.css'  // Kunpeng 主题 token
import '@opensig/opendesign-token/themes/k.light.token.css'  // Kunpeng 主题 token
import '@opensig/opendesign-token/fonts/font-harmony.css' // 鸿蒙字体
```

**MindSpore 社区项目：**
```typescript
// main.ts
import '@opensig/opendesign-token/themes/m.dark.token.css'  // MindSpore 主题 token
import '@opensig/opendesign-token/themes/m.light.token.css'  // MindSpore 主题 token
import '@opensig/opendesign-token/fonts/font-harmony.css' // 鸿蒙字体
```

**Gauss 社区项目：**
```typescript
// main.ts
import '@opensig/opendesign-token/themes/g.dark.token.css'  // Gauss 主题 token
import '@opensig/opendesign-token/themes/g.light.token.css'  // Gauss 主题 token
import '@opensig/opendesign-token/fonts/font-harmony.css' // 鸿蒙字体
```

**UBMC 社区项目：**
```typescript
// main.ts
import '@opensig/opendesign-token/themes/u.dark.token.css'  // UBMC 主题 token
import '@opensig/opendesign-token/themes/u.light.token.css'  // UBMC 主题 token
import '@opensig/opendesign-token/fonts/font-harmony.css' // 鸿蒙字体
```

### 3. 切换 dark/light 模式

引入 token 文件后，通过 `data-o-theme` 属性（设置在 `<html>` 或 `<body>` 上）在浅色/深色间切换：

| 社区 | 浅色模式                     | 深色模式                    |
|------|--------------------------|-------------------------|
| openEuler | `data-o-theme="e.light"` | `data-o-theme="e.dark"` |
| Ascend | `data-o-theme="a.light"` | `data-o-theme="a.dark"` |
| Kunpeng | `data-o-theme="k.light"` | `data-o-theme="k.dark"` |
| MindSpore | `data-o-theme="m.light"` | `data-o-theme="m.dark"` |
| Gauss | `data-o-theme="g.light"` | `data-o-theme="g.dark"` |
| UBMC | `data-o-theme="u.light"` | `data-o-theme="u.dark"` |

```javascript
// 切换深色模式（以 openEuler 项目为例）
document.documentElement.setAttribute('data-o-theme', 'e.dark')
// 切换回浅色模式
document.documentElement.setAttribute('data-o-theme', 'e.light')
```

### 4. 设置组件默认圆角

引入组件后，可以通过 `initRound` 来全局设置大部分组件的圆角

```javascript
import {initRound} from '@opensig/opendesign'

initRound('pill') // 'pill'代表全圆角，通常在Ascend社区使用
```

---

## 快速开始

所有组件都从 `@opensig/opendesign` 导入：

```vue
<script setup>
import { OButton, OInput, OCard } from '@opensig/opendesign';
</script>
```

## 组件索引

- [OAnchor](#oanchor) — 锚点
- [OBadge](#obadge) — 徽标
- [OBreadcrumb](#obreadcrumb) — 面包屑
- [OButton](#obutton) — 按钮
- [OCard](#ocard) — 卡片
- [OCarousel](#ocarousel) — 幻灯片
- [OCascader](#ocascader) — 级联选择
- [OCheckbox / OCheckboxGroup](#ocheckbox--ocheckboxgroup) — 多选框
- [OCollapse](#ocollapse) — 折叠面板
- [OConfigProvider](#oconfigprovider) — 全局配置
- [ODataTable](#odatatable) — 数据表格（高级）
- [ODialog](#odialog) — 对话框
- [ODivider](#odivider) — 分割线
- [ODropdown](#odropdown) — 下拉菜单
- [OFigure](#ofigure) — 图片
- [OForm / OFormItem](#oform--oformitem) — 表单
- [OGrid / ORow / OCol](#ogrid--orow--ocol) — 栅格布局
- [OIcon](#oicon) — 图标
- [OInput](#oinput) — 输入框
- [OInputNumber](#oinputnumber) — 数字输入框
- [OIpInput](#oipinput) — IP 地址输入框
- [OLayer](#olayer) — 浮层
- [OLink](#olink) — 链接
- [OLoading](#oloading) — 加载中
- [OMenu](#omenu) — 菜单
- [OMessage](#omessage) — 消息提示
- [OPagination](#opagination) — 分页
- [OPopover](#opopover) — 气泡卡片
- [OPopup](#opopup) — 弹出层
- [OProgress](#oprogress) — 进度条
- [ORadio / ORadioGroup](#oradio--oradiogroup) — 单选框
- [ORate](#orate) — 评分
- [OResult](#oresult) — 结果
- [OScrollbar / OScroller](#oscrollbar--oscroller) — 滚动条
- [OSelect](#oselect) — 选择器
- [OSkeleton](#oskeleton) — 骨架屏
- [OSlider](#oslider) — 滑块
- [OStep / OStepItem](#ostep--ostepitem) — 步骤条
- [OSwitch](#oswitch) — 开关
- [OTab / OTabPane](#otab--otabpane) — 标签页
- [OTag](#otag) — 标签
- [OTextarea](#otextarea) — 文本域
- [OToast](#otoast) — 轻提示
- [OToggle](#otoggle) — 选择块
- [OUpload](#oupload) — 上传
- [OVirtualList](#ovirtuallist) — 虚拟列表

---

## OAnchor

**`size`** 属性
- 说明：指定锚点的尺寸风格（默认值：medium）

**`container`** 属性
- 说明：指定锚点监听的滚动容器（默认值：window）
- 示例：`container="#wrap"` 表示监听 id 为 wrap 的容器滚动事件

**`targetOffset`** 属性
- 说明：目标元素跳转或激活时距离容器顶部的偏移量（默认值：0）

**`bounds`** 属性
- 说明：设置锚点激活的判定边界（默认值：5）

**`changeHash`** 属性
- 说明：是否在点击锚点时改变浏览器地址栏的 hash 值（默认值：true）

锚点嵌套：`OAnchorItem` 可以嵌套使用，形成多级锚点结构

### 示例代码

```vue
<OAnchor container="#wrap" :target-offset="10">
  <OAnchorItem href="#section1" title="第一节">
    <OAnchorItem href="#section1-1" title="第一节第一小节" />
  </OAnchorItem>
  <OAnchorItem href="#section2" title="第二节" />
</OAnchor>
```

> 详细使用说明和完整属性列表，请查看 [references/anchor.md](references/anchor.md)

---

## OBadge

徽标包含 `primary`、`success`、`warning`、`danger` 四种主题色。

徽标 `value` 参数支持数字和文本两种类型的值，当为数字时 `max` 参数会影响值的显示。

徽标支持小红点样式，小红点中不会显示徽标内容。

徽标可以通过 `offset` 设置偏移位置。

> 详细使用说明和完整属性列表，请查看 [references/badge.md](references/badge.md)

---

## OBreadcrumb

通过 `href` 属性设置链接跳转地址，或者使用 `to` 属性配合 Vue Router 实现路由跳转。当 `href` 和 `to` 属性都未设置时，`OBreadcrumbItem` 组件会使用 `span` 标签渲染为普通文本（有利于 SEO）。

`href` 属性和 `target` 属性组合使用，`to` 属性和 `replace` 属性组合使用，当同时传递 `href` 属性和 `to` 属性时，会优先使用 `to` 形式的跳转。

### 示例代码

```vue
<OBreadcrumb>
  <OBreadcrumbItem>Home</OBreadcrumbItem>
  <OBreadcrumbItem>Category</OBreadcrumbItem>
  <OBreadcrumbItem>Current Page</OBreadcrumbItem>
</OBreadcrumb>
```

> 详细使用说明和完整属性列表，请查看 [references/breadcrumb.md](references/breadcrumb.md)

---

## OButton

**主题色 `color`**：`normal`（默认）、`brand`

**尺寸 `size`**：`small`、`medium`（默认）、`large`

**形状 `variant`**：`solid`、`outline`（默认）、`text`

**禁用**：`disabled`

**加载状态**：`loading`

**圆角 `round`**：
- `round="pill"` 设置为半圆角
- `round="16px"` 设置具体圆角值（带单位）
- 支持 `border-radius` 的任意值

**其他属性**：
- `href` — 设置后以 `<a>` 标签渲染
- `icon` — 按钮图标（Component）
- `tag` — 根标签类型（默认 `button`）

**插槽**：`default`（内容）、`icon`（图标）、`suffix`（后缀）

**事件**：`@click="(evt: MouseEvent) => void"`

### 示例代码

```vue
<OButton color="brand" variant="solid" size="medium" round="pill">
  点击按钮
</OButton>

<OButton variant="outline" :loading="isLoading" @click="handleClick">
  <template #suffix>
    <OIconChevronDown />
  </template>
  下拉
</OButton>
```

> 详细使用说明和完整属性列表，请查看 [references/button.md](references/button.md)

---

## OCard

OCard 分为图文卡片和图标卡片。

**图文卡片**：给 `cover` 设置图片链接，通过 `coverRatio` 设置图片长宽比，通过 `coverFit` 设置图片填充方式

**图标卡片**：给 `icon` 设置值（图片链接或组件）

通过 `layout` 设置卡片布局方式（垂直/水平/水平反向）

设置卡片标题：
- `title` — 标题内容
- `titleRow` — 标题高度（行数）
- `titleMaxRow` — 标题最大行数（超出显示省略号）
- `titleIcon` — 标题开头图标

设置卡片内容：
- `detail` — 卡片内容
- `detailRow` — 内容高度（行数）
- `detailMaxRow` — 内容最大行数
- `textOverflow` — 文本溢出处理方式（`ellipsis` 或渐隐）

其他：
- `hoverable` — 鼠标悬停阴影
- `href` — 跳转链接（设置后以 `<a>` 标签渲染）
- `cursor` — 鼠标悬停样式
- `noResponsive` — 禁用响应式尺寸

> 详细使用说明和完整属性列表，请查看 [references/card.md](references/card.md)

---

## OCarousel

幻灯片有两种播放效果：
- `effect="gallery"`（默认）— 滚动效果
- `effect="toggle"` — 切换效果

自动播放：`autoPlay`、`interval`（默认 5000ms）、`pauseOnHover`

指示器：`hideIndicator`、`indicatorClick`

箭头：`arrow`（`hover`/`always`/`never`）

其他：`clickToSwitch`、`manualInit`、`activeIndex`（可双向绑定）

> 详细使用说明和完整属性列表，请查看 [references/carousel.md](references/carousel.md)

---

## OCascader

选中值：通过 `v-model` 双向绑定，类型为 `CascaderValueT`

```typescript
type CascaderNodeValueT = string | number;
type CascaderNodePathT = Array<CascaderNodeValueT>;
type CascaderValueT = CascaderNodeValueT | CascaderNodePathT;

type CascaderOptionT = {
  value: CascaderNodeValueT;
  label?: string;
  children?: CascaderOptionT[];
};
```

**属性**：
- `options` — 选项数据（`CascaderOptionT[]`）
- `round` — 圆角
- `variant` — 按钮样式：`solid`/`outline`/`text`
- `optionPosition` — 选项框位置（`top`/`bottom`/`left`/`right`/`tl`/`tr`/`bl`/`br`/`lt`/`lb`/`rt`/`rb`）

### 示例代码

```vue
<OCascader v-model="selectedValue" :options="options" />
```

> 详细使用说明和完整属性列表，请查看 [references/cascader.md](references/cascader.md)

---

## OCheckbox / OCheckboxGroup

多选框传值：
- `value` — 设置选中后 `modelValue` 中包含的值
- `modelValue` 类型是 `Array<string | number>`

半选：`indeterminate="true"` 时处于半选状态。

多选框组：可以单独使用 `OCheckbox`，也可以嵌套在 `OCheckboxGroup` 中统一管理 `v-model`。

### 示例代码

```vue
<OCheckboxGroup v-model="checkedList">
  <OCheckbox value="apple">Apple</OCheckbox>
  <OCheckbox value="banana">Banana</OCheckbox>
</OCheckboxGroup>
```

> 详细使用说明和完整属性列表，请查看 [references/checkbox.md](references/checkbox.md)

---

## OCollapse

通过 `accordion` 属性开启手风琴模式（同时只展开一项）。

```vue
<OCollapse accordion v-model="activeKey">
  <OCollapseItem title="标题1" name="1">内容1</OCollapseItem>
  <OCollapseItem title="标题2" name="2">内容2</OCollapseItem>
</OCollapse>
```

> 详细使用说明和完整属性列表，请查看 [references/collapse.md](references/collapse.md)

---

## OConfigProvider

全局配置组件，本身不渲染任何可见内容，通过 Vue provide/inject 向后代组件注入统一配置。

**属性**：
- `locale` — 语言词条对象（`{ locale: string; [key: string]: string }`），优先级高于全局 `useLocale()` 设置。词条中支持 `{0}` 占位符进行变量替换
- `link` — OLink 全局点击配置（`{ click: (e, params, attrs) => void }`），仅在 OLink 的 `global` 属性为 true（默认）时触发

**插槽**：`default`（子组件内容）

### 示例代码

```vue
<script setup>
import { ref } from 'vue';
import { OConfigProvider } from '@opensig/opendesign';

const locale = ref({
  locale: 'en-US',
  'pagination.goto': 'go to',
  'pagination.total': 'Total: {0}',
});
const linkConfig = {
  click: (e, params, attrs) => {
    console.log('Link clicked:', params.href);
  },
};
</script>

<template>
  <OConfigProvider :locale="locale" :link="linkConfig">
    <RouterView />
  </OConfigProvider>
</template>
```

> 详细使用说明和完整属性列表，请查看 [references/config-provider.md](references/config-provider.md)

---

## ODataTable

高级数据表格，支持排序、筛选、多选、列宽调整等复杂功能。

**主要属性**：

| 属性 | 类型 | 说明 |
|------|------|------|
| `data` | `TableRowT[]` | 表格数据（必需） |
| `columns` | `DataTableColumnT[]` | 列配置（必需） |
| `size` | `'medium' \| 'small'` | 尺寸（默认 medium） |
| `height` | `number \| string` | 表格高度 |
| `maxHeight` | `number \| string` | 最大高度（默认 fit-content） |
| `rowKey` | `string` | 行唯一键（默认 'id'） |
| `border` | `TableBorderT` | 边框样式（默认 'row'） |
| `stripe` | `boolean` | 斑马纹 |
| `loading` | `boolean` | 加载状态 |
| `highlightCurrentRow` | `boolean` | 高亮当前行 |
| `columnResizable` | `boolean` | 列宽可调整 |
| `spanMethod` | `Function` | 单元格合并方法 |

**双向绑定（v-model）**：
- `v-model:conditions` — 筛选条件
- `v-model:selection-keys` — 已选行 key 列表

**插槽**：
- `#th_{key}` — 自定义列头
- `#td_{key}` — 自定义单元格，`props: { column, row, cellValue, index }`
- `#header` — 自定义整个表头
- `#loading` / `#empty` — 加载/空状态

**事件**：
- `@condition-update` — 筛选条件更新
- `@sort-update` — 排序更新
- `@selection` / `@selection-change` / `@selection-all` — 选择相关

### 示例代码

```vue
<ODataTable
  :data="tableData"
  :columns="columns"
  v-model:selection-keys="selectedKeys"
  :loading="loading"
>
  <template #td_name="{ row }">
    <router-link :to="`/detail/${row.id}`">{{ row.name }}</router-link>
  </template>
</ODataTable>
```

> 详细使用说明和完整属性列表，请查看 [references/data-table.md](references/data-table.md)

---

## ODialog

**尺寸 `size`**：`exlarge`、`large`、`medium`（默认）、`small`、`auto`

- `auto` — 根据内容自动调整大小
- 固定尺寸 — 具有固定宽度，高度随内容变化

**响应式**：默认根据视口大小调整，`noResponsive="true"` 禁用

**移动端半屏**：`phoneHalfFull="true"` 在小屏幕（<600px）上全宽显示在底部

> 详细使用说明和完整属性列表，请查看 [references/dialog.md](references/dialog.md)

---

## ODivider

**`variant`**：`solid`（实线）、`dashed`（虚线）、`dotted`（点线）

**`direction`**：`h`（水平，默认占满容器）、`v`（垂直，默认高度 1em）

**`darker`**：`true`（深色）/ `false`（浅色）

**标签（仅水平分割线）**：
- `labelPosition`：`left`、`center`、`right`
- 标签内容放在 `default` 插槽中

```vue
<ODivider direction="h" variant="dashed" label-position="center">
  分隔文字
</ODivider>
```

> 详细使用说明和完整属性列表，请查看 [references/divider.md](references/divider.md)

---

## ODropdown

触发方式：`none`、`click`、`click-outclick`、`hover`、`hover-outclick`、`focus`、`contextmenu`

位置：`top`、`tl`、`tr`、`bottom`、`bl`、`br`、`left`、`lt`、`lb`、`right`、`rt`、`rb`

### 示例代码

```vue
<ODropdown trigger="hover">
  <OButton color="brand" round="pill">
    Dropdown
    <template #suffix>
      <OIconChevronDown />
    </template>
  </OButton>
  <template #dropdown>
    <OOption label="选项1" value="1" />
    <OOption label="选项2" value="2" />
  </template>
</ODropdown>
```

> 详细使用说明和完整属性列表，请查看 [references/dropdown.md](references/dropdown.md)

---

## OFigure

**`ratio`** — 图片宽高比（通过 padding-top 百分比实现）

**`fit`**（默认 `contain`）：
- `background=false`（`<img>` 标签）：`cover`/`contain`/`fill`/`none`/`scale-down`
- `background=true`（背景图）：`cover`/`contain`/`auto`/百分比

**`hoverable`** — 悬停放大效果（设置 href/preview/videoPoster 时自动生效）

**`preview`** — 点击预览（启用后接管点击事件）

**`previewClose`** — 预览关闭方式：`'none'`/`'mask'`/`'button'`/`'body'`，支持数组组合

**`href`** — 链接（渲染为 `<a>` 标签）

**注意**：`preview` 和 `href` 不能同时使用

> 详细使用说明和完整属性列表，请查看 [references/figure.md](references/figure.md)

---

## OForm / OFormItem

**OForm 属性**：

- `layout`：`h`（水平）、`v`（垂直）、`inline`（行内）
- `labelAlign`：`top`/`center`/`bottom`
- `labelJustify`：`left`/`center`/`right`
- `labelWidth`：标签宽度
- `hasRequired`：显示必填星号

**支持的表单项**：`OInput`、`OInputNumber`、`OTextarea`、`OSelect`、`OCheckboxGroup`、`ORadioGroup`、`OUpload`

### 示例代码

```vue
<OForm layout="h" has-required>
  <OFormItem label="用户名" required>
    <OInput v-model="form.name" />
  </OFormItem>
  <OFormItem label="类型">
    <OSelect v-model="form.type">
      <OOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </OSelect>
  </OFormItem>
  <OFormItem label="描述">
    <OTextarea v-model="form.desc" />
  </OFormItem>
</OForm>
```

> 详细使用说明和完整属性列表，请查看 [references/form.md](references/form.md)

---

## OGrid / ORow / OCol

**ORow 属性**：
- `align` — 辅轴对齐方式
- `justify` — 主轴对齐方式
- `wrap` — `flex-wrap` 值
- `direction` — `flex-direction` 值
- `gap` / `gapX` / `gapY` — 子元素间距
- `inline` — 使用 `inline-flex`
- 响应式属性：`pcS`、`laptop`、`pad`、`padV`、`phone`（控制不同断点下的 gap）

**OCol 属性**：
- `flex` — `flex` 样式值
- `align` — 辅轴对齐方式
- 响应式属性：`pcS`、`laptop`、`pad`、`padV`、`phone`（控制不同断点下的 flex）

> 详细使用说明和完整属性列表，请查看 [references/grid.md](references/grid.md)

---

## OIcon

通用图标容器，展示 SVG 图标，也可作为图标按钮使用。图标大小继承上下文 font-size（默认 1em）。

**属性**：
- `icon` — 图标组件（如 `OIconAdd`、`OIconEdit`）
- `button` — 图标按钮模式（悬停/激活样式，自动 pointer 光标和 tabindex）
- `disabled` — 禁用（配合 button 使用）
- `loading` — 加载状态（显示旋转动画替换原图标）

**插槽**：`default`（自定义图标内容，使用后 icon 属性和 loading 内置图标不渲染）

### 示例代码

```vue
<script setup>
import { OIcon, OIconAdd, OIconDelete } from '@opensig/opendesign';
</script>

<template>
  <!-- 纯展示 -->
  <OIcon :icon="OIconAdd" />

  <!-- 图标按钮 -->
  <OIcon :icon="OIconDelete" button @click="handleDelete" />

  <!-- 自定义大小 -->
  <OIcon :icon="OIconAdd" style="font-size: 32px" />
</template>
```

> 详细使用说明和完整图标清单，请查看 [references/icon.md](references/icon.md)

---

## OInput

**主题色 `color`**：`normal`（默认）、`success`、`warning`、`danger`

**尺寸 `size`**：`small`、`medium`（默认）、`large`

**形状 `variant`**：`solid`、`outline`（默认）、`text`

**输入类型 `type`**：`text`（默认）、`password`

**其他属性**：`disabled`、`readonly`、`clearable`、`maxLength`、`placeholder`、`autoWidth`、`inputId`

**字符计数 `showLength`**：`'always'`（始终显示）、`'auto'`（默认，有 maxLength 时显示）、`'never'`（不显示）

**超限输入 `inputOnOutlimit`**：超过 maxLength 时是否仍允许输入。默认 `true`

**格式化与校验**：`format`（格式化函数）、`validate`（校验函数）、`valueOnInvalidChange`（校验不通过时是否更新 modelValue）

**密码框**：`showPasswordEvent`（切换明文的触发方式 `'click'`/`'mousedown'`）、`passwordPlaceholder`（密码占位符）

**`round`**：圆角值（`pill` 或 CSS border-radius 值）

**插槽**：`prepend`、`append`、`prefix`、`suffix`、`extra`

**事件**：`@update:modelValue`、`@change`、`@input`、`@blur`、`@focus`、`@clear`、`@pressEnter`

**暴露方法**：`focus()`、`blur()`、`clear()`、`inputEl()`、`togglePassword()`

### 示例代码

```vue
<OInput v-model="inputVal" placeholder="请输入" clearable show-length="always" :max-length="100" />
```

> 详细使用说明和完整属性列表，请查看 [references/input.md](references/input.md)

---

## OInputNumber

数字输入框，支持步进控制。

**属性**：

| 属性 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `number` | 绑定值（v-model） |
| `step` | `number` | 步长（默认 1） |
| `min` | `number` | 最小值 |
| `max` | `number` | 最大值 |
| `controls` | `'both' \| 'right' \| 'left' \| 'none'` | 控制按钮位置（默认 'both'） |
| `clearable` | `boolean` | 可清空 |
| `disabled` | `boolean` | 禁用 |
| `readonly` | `boolean` | 只读 |
| `size` | `SizeT` | 尺寸 |
| `variant` | `VariantT` | 形状 |
| `color` | `Color2T` | 主题色 |
| `placeholder` | `string` | 占位文本 |
| `format` | `Function` | 格式化函数 |

**插槽**：`prefix`、`suffix`、`plus`（加号按钮）、`minus`（减号按钮）

**事件**：`@change`、`@input`、`@blur`、`@focus`、`@clear`、`@pressEnter`、`@plus`、`@minus`

### 示例代码

```vue
<OInputNumber v-model="count" :min="0" :max="100" :step="5" controls="right" />
```

> 详细使用说明和完整属性列表，请查看 [references/input-number.md](references/input-number.md)

---

## OIpInput

IP 地址输入框，自动分段处理 IPv4 地址。

**属性**：

| 属性 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `string` | 绑定值（v-model），格式如 "192.168.1.1" |
| `disabled` | `boolean` | 禁用 |
| `readonly` | `boolean` | 只读 |
| `segmentsLen` | `number` | 分段数量（默认 4，即 IPv4） |
| `size` | `SizeT` | 尺寸 |
| `round` | `RoundT` | 圆角 |
| `color` | `string` | 主题色（默认 'normal'） |
| `variant` | `string` | 形状（默认 'outline'） |

**事件**：
- `@update:modelValue` — `(value: string) => void`
- `@change` — `(valid: boolean, ip: string) => void`（valid 表示是否为合法 IP）

### 示例代码

```vue
<OIpInput v-model="ipAddress" @change="(valid, ip) => console.log(valid, ip)" />
```

> 详细使用说明和完整属性列表，请查看 [references/ip-input.md](references/ip-input.md)

---

## OLayer

`transitionOrigin`：内容盒子缩放动画的原点：
- `'mouse'`（默认）— 鼠标点击位置
- `'css'` — 通过 CSS 变量 `--layer-origin` 设置

`wrapper`：浮层渲染的父节点：
- `'body'`（默认）— 渲染到 body，`position: fixed`
- `string-selector` — 通过 `querySelector` 查询的元素
- `HTMLElement` — 直接指定元素
- `null` — 渲染到当前元素下，`position: absolute`

`mask`：是否渲染遮罩层

`maskClose`：点击遮罩层时是否关闭浮层

`buttonClose`：是否渲染关闭按钮

> 详细使用说明和完整属性列表，请查看 [references/layer.md](references/layer.md)

---

## OLink

**主题色 `color`**：`normal`、`primary`、`success`、`warning`、`danger`

**尺寸 `size`**：`auto`、`small`、`medium`、`large`

**跳转方式 `target`**：`_blank`、`_parent`、`_self`、`_top`

**状态**：`disabled`、`loading`

```vue
<OLink href="https://openeuler.org" color="primary" target="_blank">
  访问 openEuler
</OLink>
```

> 详细使用说明和完整属性列表，请查看 [references/link.md](references/link.md)

---

## OLoading

通过 `label` 属性控制 loading 时显示的文本；

通过 `icon` 属性自定义 loading 时的图标；

通过 `iconRotating` 属性控制自定义的 loading 图标是否旋转；

其它属性的使用与 OLayer 一致。

```vue
<OLoading :visible="isLoading" label="加载中..." />
```

> 详细使用说明和完整属性列表，请查看 [references/loading.md](references/loading.md)

---

## OMenu

**尺寸 `size`**：`small`、`medium`（默认）

通过 `accordion` 属性开启手风琴模式；

通过 `expanded` 属性控制展开的节点值；

通过 `subMenu` 的 `icon` 控制菜单图标（`small` 尺寸不支持自定义图标）；

通过 `selectable` 控制 `subMenu` 本身是否可以被选中；

通过 CSS 变量 `--menu-item-base-indent`、`--sub-menu-base-indent` 控制层级缩进距离。

```vue
<OMenu v-model="activeKey" accordion>
  <OMenuItem value="home">首页</OMenuItem>
  <OSubMenu value="products" title="产品">
    <OMenuItem value="product-a">产品 A</OMenuItem>
    <OMenuItem value="product-b">产品 B</OMenuItem>
  </OSubMenu>
</OMenu>
```

> 详细使用说明和完整属性列表，请查看 [references/menu.md](references/menu.md)

---

## OMessage

**内联使用**：

```vue
<OMessage type="success">操作成功！</OMessage>
<OMessage type="warning">警告信息</OMessage>
<OMessage type="danger">错误信息</OMessage>
<OMessage type="info">提示信息</OMessage>
```

> 详细使用说明和完整属性列表，请查看 [references/message.md](references/message.md)

---

## OPagination

`layout`：设置显示的控件（数组组合）：
- `total` — 总数据量标签
- `pagesize` — 每页数据条数选择器
- `pager` — 页码按钮
- `jumper` — 页码跳转输入框

`variant`：`outline`（默认）/ `solid`

`showPageCount`：最多显示多少个页码按钮

`showMore`：鼠标悬停省略按钮时是否弹出省略的页码

`simple`：是否使用简单布局（启用后 `layout` 和 `showPageCount` 失效）

```vue
<OPagination
  v-model:current-page="page"
  v-model:page-size="pageSize"
  :total="total"
  :layout="['total', 'pagesize', 'pager', 'jumper']"
/>
```

> 详细使用说明和完整属性列表，请查看 [references/pagination.md](references/pagination.md)

---

## OPopover

`OPopover` 是基于 `OPopup` 封装的气泡卡片组件，调整了触发方式、偏移和锚点的默认值。

1. 弹出窗位置：`position` 属性
2. 触发方式：`trigger` 属性
3. 距离触发对象的距离：`offset` 属性
4. 宽度设置：`adjustMinWidth`、`adjustWidth`
5. 挂载容器类名：`wrapClass`

### 示例代码

```vue
<OPopover>
  <div>气泡内容文本</div>
  <template #target>
    <OButton round="pill">触发按钮</OButton>
  </template>
</OPopover>
```

> 详细使用说明和完整属性列表，请查看 [references/popover.md](references/popover.md)

---

## OPopup

通用弹出层组件，`OPopover`、`ODropdown`、`OSelect` 等组件的底层实现。

1. `visible` — 显示状态（双向绑定）
2. `position` — 弹出位置
3. `trigger` — 触发方式
4. `offset` — 距触发对象的距离
5. `anchor` — 弹出窗锚点
6. `adjustMinWidth`、`adjustWidth` — 宽度设置
7. `wrapClass` — 挂载容器类名
8. `bodyClass` — 内容体类名

**插槽**：`default`（弹出内容）、`target`（触发目标）、`anchor`（锚点内容，`anchor` 属性为 true 时渲染）

**事件**：`@update:visible`、`@change`

> 详细使用说明和完整属性列表，请查看 [references/popup.md](references/popup.md)

---

## OProgress

**类型 `type`**：`line`（默认）、`circle`

**尺寸 `size`**：`medium`（默认）、`small`

**颜色 `color`**：`primary`、`success`、`warning`、`danger`

**其他属性**：
- `percentage` — 进度百分比（0-100）
- `strokeWidth` — 进度条线宽
- `trackWidth` — 进度条轨道宽度

```vue
<OProgress type="line" :percentage="60" color="primary" />
<OProgress type="circle" :percentage="75" color="success" :stroke-width="8" />
```

> 详细使用说明和完整属性列表，请查看 [references/progress.md](references/progress.md)

---

## ORadio / ORadioGroup

单选框传值：
- `value` — 设置选中后 `modelValue` 的值
- `modelValue` 类型是 `string | number | boolean`

单选框组：使用 `ORadioGroup` 包裹多个 `ORadio`，统一管理 `v-model`。

### 示例代码

```vue
<ORadioGroup v-model="selected">
  <ORadio value="apple">Apple</ORadio>
  <ORadio value="banana">Banana</ORadio>
</ORadioGroup>
```

> 详细使用说明和完整属性列表，请查看 [references/radio.md](references/radio.md)

---

## ORate

评分组件，支持半星、清除和自定义图标。

**属性**：

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `modelValue` | `number` | — | 绑定值（v-model） |
| `defaultValue` | `number` | `0` | 非受控模式默认值 |
| `count` | `number` | `5` | 星星总数 |
| `size` | `'large' \| 'medium'` | — | 尺寸 |
| `color` | `ColorT` | `'normal'` | 主题色 |
| `readonly` | `boolean` | `false` | 只读 |
| `allowHalf` | `boolean` | `false` | 允许半星 |
| `clearable` | `boolean` | `false` | 可清除（再次点击同一值时清除） |
| `labels` | `string[]` | — | 各星级的描述文本 |

**插槽**：
- `#icon` — 自定义星标图标，`props: { index: number, status: RateItemStatusT }`

**事件**：
- `@update:modelValue` — `(val: number) => void`
- `@change` — `(val: number) => void`

### 示例代码

```vue
<ORate v-model="score" :count="5" allow-half clearable />
<ORate v-model="score" readonly :labels="['很差', '较差', '一般', '较好', '很好']" />
```

> 详细使用说明和完整属性列表，请查看 [references/rate.md](references/rate.md)

---

## OResult

1. `status` — 展示状态：`info`、`success`、`warning`、`danger`
2. `title` — 结果标题
3. `description` — 补充描述

### 示例代码

```vue
<OResult status="success" title="提交成功" description="您的申请已成功提交，请等待审核" />
```

> 详细使用说明和完整属性列表，请查看 [references/result.md](references/result.md)

---

## OScrollbar / OScroller

**尺寸 `size`**：`medium`（默认）、`small`

**显示方式 `visibility`**：`auto`（默认）、`always`、`hover`、`never`

`auto` 模式下，通过 `duration` 控制停止滚动后持续显示的时间。

### 示例代码

```vue
<OScroller class="wrapper" style="height: 200px;">
  <div>内容区域</div>
</OScroller>
```

> 详细使用说明和完整属性列表，请查看 [references/scrollbar.md](references/scrollbar.md)

---

## OSelect

**主题色 `color`**：`normal`（默认）、`success`、`warning`、`danger`

**尺寸 `size`**：`small`、`medium`（默认）、`large`

**形状 `variant`**：`solid`、`outline`（默认）、`text`

**属性**：`disabled`、`multiple`、`clearable`、`placeholder`、`loading`

**`maxTagCount`**：多选时最多显示的标签数

**`showFoldTags`**：折叠标签的展示方式（`true`/`false`/`'hover'`/`'click'`）

**`optionPosition`**：选项框位置（同 OCascader）

**`optionWidthMode`**：`'auto'`/`'min-width'`/`'width'`

**子组件**：
- `OOption` — 单个选项（`label`、`value`、`disabled`）
- `OOptionGroup` — 选项分组（`name` 属性设置分组名）

**插槽**：`default`（选项）、`empty`（空状态）、`arrow`（下拉箭头，slot props: `{ active }`）、`suffix`（后缀，slot props: `{ active }`）、`tag-fold`（折叠标签）、`action`（底部操作区）

**事件**：`@change`、`@clear`、`@options-visible-change`

### 示例代码

```vue
<OSelect v-model="selected" multiple :max-tag-count="3">
  <OOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
</OSelect>
```

> 详细使用说明和完整属性列表，请查看 [references/select.md](references/select.md)

---

## OSlider

滑动条组件，通过拖拽选择数值。支持单值和范围选择，可选配输入框、气泡提示和自定义标记。

**属性**：

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `modelValue` | `number \| number[]` | `0` | 绑定值（v-model），范围模式传数组 |
| `min` | `number` | `0` | 最小值 |
| `max` | `number` | `100` | 最大值 |
| `step` | `number` | `1` | 步长 |
| `range` | `boolean` | `false` | 范围选择模式 |
| `showStops` | `boolean` | `false` | 显示间隔刻度点 |
| `showInput` | `boolean` | `false` | 显示输入框（非 range 模式） |
| `showPopover` | `boolean` | `true` | 显示数值气泡 |
| `marks` | `Record<number, string \| { style, label }>` | — | 自定义标记 |
| `unit` | `string` | — | 输入框单位文字 |
| `disabled` | `boolean` | `false` | 禁用 |

**插槽**：`unit`（替换输入框单位文字）

**事件**：`@input`（滑动过程中实时触发）、`@change`（滑动结束后触发）

### 示例代码

```vue
<OSlider v-model="value" :min="0" :max="100" :step="5" show-input unit="kg" />
<OSlider v-model="rangeVal" range />
<OSlider v-model="level" show-stops :step="10" :marks="{ 0: '低', 50: '中', 100: '高' }" />
```

> 详细使用说明和完整属性列表，请查看 [references/slider.md](references/slider.md)

---

## OSkeleton

1. `loading` — 控制骨架屏显示/隐藏（false 时显示真实内容）
2. `animation` — 动画效果（`wave`/`none`等）
3. `rows` — 显示的文本行数

### 示例代码

```vue
<OSkeleton :loading="isLoading" :rows="3">
  <div>真实内容</div>
</OSkeleton>
```

> 详细使用说明和完整属性列表，请查看 [references/skeleton.md](references/skeleton.md)

---

## OStep / OStepItem

步骤条组件，用于展示任务流程进度。

**OStep 属性**：
- `direction`：`'h'`（水平，默认）/ `'v'`（垂直）

**OStepItem 属性**：

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `title` | `string` | — | 步骤标题 |
| `description` | `string` | — | 步骤描述 |
| `status` | `'finished' \| 'processing' \| 'waiting' \| 'failed'` | `'finished'` | 状态 |
| `stepIndex` | `number` | — | 步骤序号（必需） |
| `icon` | `boolean \| Component` | — | 自定义图标 |

### 示例代码

```vue
<OStep direction="h">
  <OStepItem :step-index="1" title="第一步" status="finished" description="已完成" />
  <OStepItem :step-index="2" title="第二步" status="processing" description="进行中" />
  <OStepItem :step-index="3" title="第三步" status="waiting" description="待处理" />
</OStep>
```

> 详细使用说明和完整属性列表，请查看 [references/step.md](references/step.md)

---

## OSwitch

**尺寸 `size`**：`small`、`medium`（默认）

**状态**：`disabled`、`loading`

**`round`**：圆角值

**自定义值**：通过 `checkedValue`、`uncheckedValue` 自定义选中/未选中时对应的值

```vue
<OSwitch v-model="enabled" checked-value="on" unchecked-value="off" />
```

> 详细使用说明和完整属性列表，请查看 [references/switch.md](references/switch.md)

---

## OTab / OTabPane

**OTab 属性**：

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `modelValue` | `string \| number` | — | 当前激活的 tab（v-model） |
| `variant` | `'solid' \| 'text' \| 'button'` | `'text'` | 标签页样式 |
| `size` | `SizeT` | — | 尺寸 |
| `round` | `RoundT` | — | 圆角 |
| `lazy` | `boolean` | — | 懒加载（首次展示时才渲染） |
| `addable` | `boolean` | — | 是否可以新增标签 |
| `maxShow` | `number` | — | 最多显示的标签数（超出折叠） |
| `line` | `boolean` | `true` | 是否显示底部线 |
| `headerClass` | `string \| Array \| Object` | — | 头部自定义类名 |

**OTabPane 属性**：

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `value` | `string \| number` | — | 标识值 |
| `label` | `string` | — | 标签文本 |
| `disabled` | `boolean` | `false` | 禁用 |
| `closable` | `boolean` | `false` | 是否可关闭 |
| `lazy` | `boolean` | `false` | 懒加载 |
| `unmountOnHide` | `boolean` | `false` | 隐藏时卸载 |

**OTab 插槽**：`prefix`（头部前缀）、`suffix`（头部后缀）

**OTab 事件**：
- `@change` — `(value, oldValue) => void`
- `@delete` — `(value) => void`（关闭标签时触发）
- `@add` — `(evt: MouseEvent) => void`（点击添加按钮时触发）

### 示例代码

```vue
<OTab v-model="activeTab" variant="text">
  <OTabPane value="tab1" label="标签1">
    <div>标签1内容</div>
  </OTabPane>
  <OTabPane value="tab2" label="标签2">
    <div>标签2内容</div>
  </OTabPane>
</OTab>
```

> 详细使用说明和完整属性列表，请查看 [references/tab.md](references/tab.md)

---

## OTag

**主题色 `color`**：`normal`（默认）、`primary`、`success`、`warning`、`danger`

**形状 `variant`**：`solid`（默认）、`outline`

**尺寸 `size`**：`large`（默认）、`medium`、`small`

**`round`**：圆角值

**可关闭**：`closable`、`v-model:visible`（控制显示/隐藏）、`beforeClose`（关闭前钩子）

**插槽**：`default`（文本内容）、`icon`（图标）

**事件**：`@close`、`@update:visible`

### 示例代码

```vue
<OTag color="primary" variant="outline" closable @close="handleClose">
  标签文本
</OTag>

<!-- 受控显示 -->
<OTag v-model:visible="tagVisible" closable>可关闭标签</OTag>
```

> 详细使用说明和完整属性列表，请查看 [references/tag.md](references/tag.md)

---

## OTextarea

**主题色 `color`**：`normal`（默认）、`success`、`warning`、`danger`

**尺寸 `size`**：`small`、`medium`（默认）、`large`

**形状 `variant`**：`solid`、`outline`（默认）、`text`

**属性**：`disabled`、`readonly`、`clearable`、`maxLength`、`showLength`、`placeholder`

**`autoSize`**：自动调整高度（`true` 或 `{ minRows, maxRows }`）

**`resize`**：调整方式（`none`/`vertical`/`horizontal`/`both`）

**`scrollbar`**：是否显示滚动条

**插槽**：`prepend`、`append`、`suffix`

**事件**：`@update:modelValue`、`@change`、`@input`、`@blur`、`@focus`、`@clear`

**暴露方法**：`focus()`、`blur()`、`clear()`、`inputEl()`

### 示例代码

```vue
<OTextarea v-model="content" :auto-size="{ minRows: 3, maxRows: 8 }" :max-length="500" show-length />
```

> 详细使用说明和完整属性列表，请查看 [references/textarea.md](references/textarea.md)

---

## OToast

轻提示组件，用于操作后的即时反馈。支持内联使用和命令式调用（`useToast`）。

**内联属性**：
- `visible`（v-model）— 是否可见
- `message` — 提示文字
- `duration` — 自动消失时间（ms），不传或 ≤0 不自动消失
- `position` — 定位方向：`'top'`、`'center'`、`'bottom'`（默认）
- `long` — 长提示模式（命令式默认 3500ms）
- `beforeClose` — 关闭前钩子

**命令式调用**：

```typescript
const toast = useToast(target?);
toast.show('操作成功');           // 字符串
toast.show({ content: '...', long: true }); // 对象配置
toast.close();                   // 关闭本实例提示
toast.closeAll();                // 关闭全部提示
```

命令式默认 `duration: 2000ms`（long 模式 3500ms），`position: 'bottom'`。支持 `targetAlign`/`targetOffset` 指定目标元素附近定位。

**插槽**：`default`（替换提示内容，使用后 message 失效）

**事件**：`@duration-end`、`@close`

### 示例代码

```vue
<!-- 命令式调用 -->
<script setup>
import { useToast, OButton } from '@opensig/opendesign';
const { show: showToast } = useToast();
const handleClick = () => showToast('操作成功');
</script>
<template>
  <OButton @click="handleClick">操作</OButton>
</template>
```

> 详细使用说明和完整属性列表，请查看 [references/toast.md](references/toast.md)

---

## OToggle

选择块，指示当前状态并提供切换操作的表单控件。

**属性**：
- `checked` (v-model:checked) — 双向绑定选中状态
- `defaultChecked` — 非受控模式下是否默认选中
- `round` — 圆角值
- `icon` — 前缀图标
- `disabled` — 禁用

可配合 `ORadio`、`ORadioGroup` 实现唯一选择。

```vue
<ORadioGroup v-model="selected">
  <OToggle :value="'option1'">选项1</OToggle>
  <OToggle :value="'option2'">选项2</OToggle>
</ORadioGroup>
```

> 详细使用说明和完整属性列表，请查看 [references/toggle.md](references/toggle.md)

---

## OUpload

**属性**：

| 属性 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `FileItem[]` | 文件列表（v-model） |
| `accept` | `string` | MIME 类型限制 |
| `disabled` | `boolean` | 禁用 |
| `multiple` | `boolean` | 多选 |
| `draggable` | `boolean` | 拖拽上传 |
| `listType` | `string` | 文件列表类型 |
| `lazyUpload` | `boolean` | 延迟上传时机 |
| `btnLabel` | `string` | 按钮文本 |
| `onAfterSelect` | `Function` | 选择后的回调 |
| `uploadRequest` | `Function` | 自定义上传请求 |

### 示例代码

```vue
<OUpload
  v-model="fileList"
  accept=".jpg,.png"
  multiple
  draggable
  :upload-request="handleUpload"
/>
```

> 详细使用说明和完整属性列表，请查看 [references/upload.md](references/upload.md)

---

## OVirtualList

虚拟滚动列表，高性能渲染大量数据。

**属性**：

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `list` | `unknown[]` | — | 数据列表（必需） |
| `itemSize` | `number` | — | 列表项固定高度（已知时设置可提升性能） |
| `defaultItemSize` | `number` | `80` | 默认列表项高度（未知时的估算值） |
| `buffer` | `number` | `1` | 缓冲区倍数（相对可视区域的上下额外渲染量） |
| `defaultStartIndex` | `number` | `0` | 初始滚动到的索引 |
| `scrollbar` | `boolean \| Object` | `true` | 滚动条配置 |

**插槽**：
- `#default` — 列表项模板，`props: { item: any, index: number }`

**事件**：
- `@renderChange` — 渲染范围变化，`props: { start, end, visible, count }`

**暴露方法**：
- `scrollToView(index, align?, behavior?)` — 滚动到指定索引项

### 示例代码

```vue
<OVirtualList :list="bigDataList" :item-size="60" style="height: 400px;">
  <template #default="{ item, index }">
    <div class="list-item">
      {{ index }}: {{ item.name }}
    </div>
  </template>
</OVirtualList>
```

> 详细使用说明和完整属性列表，请查看 [references/virtual-list.md](references/virtual-list.md)

---

## 常用组合模式

### 表单页面

```vue
<OForm layout="h" has-required>
  <OFormItem label="名称" required>
    <OInput v-model="form.name" />
  </OFormItem>
  <OFormItem label="类型">
    <OSelect v-model="form.type">
      <OOption v-for="opt in options" :key="opt.value" :value="opt.value" :label="opt.label" />
    </OSelect>
  </OFormItem>
  <OFormItem label="描述">
    <OTextarea v-model="form.desc" :auto-size="{ minRows: 3 }" />
  </OFormItem>
</OForm>
```

### 数据展示

```vue
<ODataTable :columns="columns" :data="tableData" border="row">
  <template #td_status="{ row }">
    <OTag :color="row.status === 'active' ? 'success' : 'normal'">
      {{ row.status }}
    </OTag>
  </template>
</ODataTable>
<OPagination v-model:current-page="page" :total="total" />
```

### 交互反馈

```vue
<!-- 对话框 -->
<ODialog v-model:visible="dialogVisible" title="确认操作" size="small">
  <p>确认要执行此操作吗？</p>
  <template #footer>
    <OButton @click="dialogVisible = false">取消</OButton>
    <OButton color="brand" variant="solid" @click="handleConfirm">确认</OButton>
  </template>
</ODialog>

<!-- 消息提示 -->
<OMessage type="success">操作成功</OMessage>

<!-- 加载状态 -->
<OLoading :visible="loading" label="加载中..." />
```
