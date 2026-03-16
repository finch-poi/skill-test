# OIcon 图标

## Part A：设计理解卡

OIcon 是通用图标容器组件，用于展示 SVG 图标。它既可以作为纯展示图标，也可以作为可交互的图标按钮。支持加载状态，在加载时自动显示旋转加载动画。

### 图标整体

**icon**（属性）：要展示的图标组件。传入一个 Vue 组件（如 OIconAdd、OIconEdit 等），组件会将其渲染为 SVG 图标。图标库中的图标分为三类：线条类（stroke）、填充类（fill）、彩色类（color）。

**button**（属性）：是否作为图标按钮使用。开启后图标具有可交互样式：默认显示信息色，悬停、激活时颜色加深，同时自动获得 pointer 光标和键盘焦点能力（tabindex 设为 0）。默认关闭。

**disabled**（属性）：禁用状态，仅在图标按钮模式下生效。禁用后光标变为禁止样式，颜色变为禁用色，悬停和激活状态不再变化。默认关闭。

**loading**（属性）：加载状态。开启后图标区域显示旋转加载动画图标，替换原有图标内容。默认关闭。

### 图标尺寸

图标大小继承当前上下文的字号（font-size），默认为 1em。可以通过外层容器的 font-size 或 CSS 变量 `--icon-size` 来控制图标大小。

### 插槽

**default 插槽**（插槽）：自定义图标内容。当提供 default 插槽时，icon 属性和 loading 状态的内置图标均不渲染，完全由插槽内容替代。未提供插槽时，加载状态显示旋转动画，否则显示 icon 属性指定的图标组件。

### 颜色与交互

图标按钮模式下具有完整的交互状态链：默认色 → 悬停色 → 激活/聚焦色 → 禁用色。这些颜色通过 CSS 变量控制，可在不同主题（openEuler、Ascend、Kunpeng）下自动适配。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OIcon } from '@opensig/opendesign';
// 图标组件按需导入
import { OIconAdd, OIconEdit, OIconDelete, OIconRefresh } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| icon | `Component` | 否 | 任意图标组件 | — | 要展示的图标组件 |
| button | `boolean` | 否 | — | `false` | 是否作为图标按钮（可交互） |
| disabled | `boolean` | 否 | — | `false` | 禁用状态（配合 button 使用） |
| loading | `boolean` | 否 | — | `false` | 加载状态，显示旋转加载动画 |

### Events 表

无自定义事件。图标按钮模式下可使用原生 `@click` 等事件。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 整个图标内容区域 | loading 时显示 `<IconLoading />`（旋转），否则显示 `<component :is="icon" />` |

### 插槽层级关系

```
OIcon (.o-icon)
└── default 插槽
    ├── [loading=true 且无插槽时] IconLoading（旋转加载动画）
    └── [loading=false 且无插槽时] component :is="icon"
```

### 典型使用场景与调用模板

**场景 1：基础图标展示**
适用于：在文字旁或独立区域展示一个图标
```vue
<OIcon :icon="OIconAdd" />
```

**场景 2：图标按钮**
适用于：工具栏、操作区域中的可点击图标
```vue
<OIcon :icon="OIconDelete" button @click="handleDelete" />
```

**场景 3：禁用状态的图标按钮**
适用于：暂不可用的操作图标
```vue
<OIcon :icon="OIconEdit" button disabled />
```

**场景 4：加载状态**
适用于：异步操作进行中，用旋转图标提示用户
```vue
<OIcon :icon="OIconRefresh" :loading="isLoading" />
```

**场景 5：通过插槽自定义图标内容**
适用于：需要使用自定义 SVG 或第三方图标
```vue
<OIcon button>
  <svg viewBox="0 0 24 24">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
</OIcon>
```

**场景 6：控制图标大小**
适用于：需要不同尺寸的图标
```vue
<OIcon :icon="OIconAdd" style="font-size: 32px" />
```

**场景 7：图标列表展示**
适用于：图标选择器或图标集合展示
```vue
<div style="font-size: 24px; display: flex; gap: 12px;">
  <OIcon :icon="OIconAdd" />
  <OIcon :icon="OIconEdit" />
  <OIcon :icon="OIconDelete" />
  <OIcon :icon="OIconRefresh" />
</div>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 纯展示图标 | `:icon="OIconXxx"` | 不可交互，仅展示 |
| 可点击图标按钮 | `:icon="OIconXxx"` + `button` | 有悬停/激活样式 |
| 禁用图标按钮 | `button` + `disabled` | 禁止交互，颜色置灰 |
| 加载中图标 | `:loading="true"` | 显示旋转动画 |
| 自定义大小图标 | `:icon="OIconXxx"` + `style="font-size: Xpx"` | 通过 font-size 控制大小 |

### 内置图标清单

组件库提供以下图标组件，均可从 `@opensig/opendesign` 导入：

| 类别 | 图标 |
|------|------|
| 方向箭头 | `OIconArrowUp` / `Down` / `Left` / `Right`、`OIconDoubleArrowUp` / `Down` / `Left` / `Right`、`OIconChevronUp` / `Down` / `Left` / `Right`、`OIconChevronDownBold`、`OIconChevronRightSmall`、`OIconCaretUp` / `Down` / `Left` / `Right` |
| 操作 | `OIconAdd`、`OIconEdit`、`OIconDelete`、`OIconClose`、`OIconRefresh`、`OIconSearch`、`OIconFilter`、`OIconSort`、`OIconZoomIn`、`OIconZoomOut`、`OIconOneToOne` |
| 状态 | `OIconSuccess`、`OIconWarning`、`OIconDanger`、`OIconInfo`、`OIconInfoTip`、`OIconExclamationMark`、`OIconCheckMark`、`OIconChecked`、`OIconDone`、`OIconLoading`、`OIconLoadingSmall` |
| 媒体与文件 | `OIconEye`、`OIconEyeOff`、`OIconFile`、`OIconImageError`、`OIconVideoPlay`、`OIconLink` |
| 其他 | `OIconStar`、`OIconSkill`、`OIconTime`、`OIconCalendar`、`OIconEllipsis`、`OIconMinus`、`OIconSun`、`OIconMoon`、`OIconNoData`、`OIconAscend`、`OIconKunpeng` |

### 响应式行为表

无。OIcon 组件不包含响应式断点逻辑，图标大小由外层 font-size 决定。

### CSS 变量参考

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--icon-size` | `1em` | 图标容器尺寸 |
| `--icon-btn-color` | `var(--o-color-info1)` | 图标按钮默认颜色 |
| `--icon-btn-color-hover` | `var(--o-color-info2)` | 图标按钮悬停颜色 |
| `--icon-btn-color-active` | `var(--o-color-info3)` | 图标按钮激活/聚焦颜色 |
| `--icon-btn-color-disabled` | `var(--o-color-info4)` | 图标按钮禁用颜色 |
