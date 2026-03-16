# OGrid 栅格布局

## Part A：设计理解卡

OGrid 是基于 Flex 布局的栅格系统，用于页面内容的多列排版和响应式布局。包含 ORow（行容器）和 OCol（列容器）。核心特点是支持按断点设置不同的间距和列宽。

### ORow 行容器

**gap / gapX / gapY**（属性）：子元素间距。gap 同时设置横向和纵向（空格分隔），gapX 单独设置横向间距，gapY 单独设置纵向间距。gapX/gapY 优先于 gap。

**justify**（属性）：主轴对齐方式。同 CSS justify-content，如 "center"、"space-between" 等。

**align**（属性）：交叉轴对齐方式。同 CSS align-items，如 "center"、"flex-start" 等。

**wrap**（属性）：是否换行。同 CSS flex-wrap。默认 "wrap"（自动换行）。

**direction**（属性）：排列方向。同 CSS flex-direction，如 "row"、"column" 等。

**inline**（属性）：是否使用 inline-flex 显示。默认 flex。

**pcS / laptop / pad / padV / phone**（属性）：各断点下的间距覆盖值。对象格式 `{ gap?, gapX?, gapY? }`。

### OCol 列容器

**flex**（属性）：列的弹性布局值。同 CSS flex。默认 "1 0 auto"（自动撑满）。常用值如 "0 0 50%" 表示占一半宽度、"1" 表示自适应。

**align**（属性）：自身在交叉轴的对齐方式。同 CSS align-self。

**pcS / laptop / pad / padV / phone**（属性）：各断点下的 flex 覆盖值。对象格式 `{ flex: string }`。

📱 **响应式行为**：本组件本身就是响应式布局工具。通过 pcS（≤1680px）、laptop（≤1440px）、pad（≤1200px）、padV（≤840px）、phone（≤600px）属性，可以在不同断点设置不同的间距和列宽。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ORow, OCol } from '@opensig/opendesign';
</script>
```

### ORow Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| inline | `boolean` | — | `false` | 是否 inline-flex |
| align | `string` | `'center'` / `'flex-start'` / `'flex-end'` / `'stretch'` / `'baseline'` / `'inherit'` / `'initial'` | — | 交叉轴对齐 |
| justify | `string` | `'center'` / `'flex-start'` / `'flex-end'` / `'space-between'` / `'space-around'` / `'space-evenly'` / `'inherit'` / `'initial'` | — | 主轴对齐 |
| wrap | `string` | `'nowrap'` / `'wrap'` / `'wrap-reverse'` / `'initial'` / `'inherit'` | `'wrap'` | 换行方式 |
| direction | `string` | `'row'` / `'row-reverse'` / `'column'` / `'column-reverse'` | — | 排列方向 |
| gap | `string` | CSS 值 | — | 间距（横纵） |
| gapX | `string` | CSS 值 | — | 横向间距 |
| gapY | `string` | CSS 值 | — | 纵向间距 |
| pcS | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤1680px 间距 |
| laptop | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤1440px 间距 |
| pad | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤1200px 间距 |
| padV | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤840px 间距 |
| phone | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤600px 间距 |

### OCol Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| flex | `string` | CSS flex 值 | `'1 0 auto'` | 弹性布局值 |
| align | `string` | `'center'` / `'flex-start'` / `'flex-end'` / `'stretch'` / `'baseline'` / `'inherit'` / `'initial'` | — | 自身交叉轴对齐 |
| pcS | `ColMediaT` | `{ flex: string }` | — | ≤1680px flex |
| laptop | `ColMediaT` | `{ flex: string }` | — | ≤1440px flex |
| pad | `ColMediaT` | `{ flex: string }` | — | ≤1200px flex |
| padV | `ColMediaT` | `{ flex: string }` | — | ≤840px flex |
| phone | `ColMediaT` | `{ flex: string }` | — | ≤600px flex |

### Events 表

本组件无事件。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| ORow default | — | 始终 | 列列表 | 无 |
| OCol default | — | 始终 | 列内容 | 无 |

### 典型使用场景与调用模板

**场景 1：基础两列布局**
适用于：左右分栏
```vue
<ORow gap="24px">
  <OCol flex="0 0 50%">左侧内容</OCol>
  <OCol flex="0 0 50%">右侧内容</OCol>
</ORow>
```

**场景 2：响应式三列变一列**
适用于：桌面三列、移动端一列
```vue
<ORow gap="24px" :pad-v="{ gap: '16px' }">
  <OCol flex="0 0 33.33%" :pad-v="{ flex: '0 0 100%' }">
    卡片 1
  </OCol>
  <OCol flex="0 0 33.33%" :pad-v="{ flex: '0 0 100%' }">
    卡片 2
  </OCol>
  <OCol flex="0 0 33.33%" :pad-v="{ flex: '0 0 100%' }">
    卡片 3
  </OCol>
</ORow>
```

**场景 3：居中对齐**
适用于：垂直居中的行
```vue
<ORow align="center" justify="center" gap="16px">
  <OCol flex="0 0 auto">项目 A</OCol>
  <OCol flex="0 0 auto">项目 B</OCol>
</ORow>
```

**场景 4：自适应列 + 固定列**
适用于：侧边栏 + 主内容
```vue
<ORow gap="24px">
  <OCol flex="0 0 240px">侧边栏</OCol>
  <OCol flex="1">主内容（自适应）</OCol>
</ORow>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 等分多列 | `flex="0 0 {百分比}"` | 如 33.33% 三列 |
| 响应式列宽 | `flex` + `:pad-v` + `:phone` | 断点下覆盖 |
| 间距响应式 | `gap` + `:pad` + `:phone` | 断点下缩小间距 |
| 自适应宽度 | `flex="1"` | 占满剩余空间 |

### 响应式行为表

通过属性直接控制，无内置媒体查询样式。断点对应关系：

| 属性 | 断点 | 说明 |
|------|------|------|
| pcS | ≤1680px | 大屏 |
| laptop | ≤1440px | 笔记本 |
| pad | ≤1200px | 平板横屏 |
| padV | ≤840px | 平板竖屏 |
| phone | ≤600px | 手机 |

