# OButton 按钮

## Part A：设计理解卡

OButton 是通用按钮组件，用于触发操作或导航。支持多种颜色、形状、尺寸、圆角，可承载图标和文字。

### 按钮整体

**color**（属性）：按钮的颜色主题。"normal" 默认灰色、"primary" 品牌蓝、"success" 成功绿、"warning" 警告橙、"danger" 危险红、"brand" 品牌色（与 primary 不同的品牌专属色）。默认 normal。

**variant**（属性）：按钮的视觉形状。"solid" 实心填充、"outline" 线框描边、"text" 纯文字无背景。默认 outline。注意：当按钮仅含图标（无文字内容）时，默认自动切换为 text 样式。

**size**（属性）：按钮尺寸。"small" 小号、"medium" 中号、"large" 大号。默认 medium。

**round**（属性）：按钮圆角。"pill" 半圆角，也可传入任意 CSS border-radius 值（如 "12px"）。

**disabled**（属性）：禁用状态，按钮不可点击。默认关闭。

**loading**（属性）：加载状态，按钮显示旋转加载图标并不可点击。加载时图标插槽会被替换为加载动画。默认关闭。

**href**（属性）：设置后按钮渲染为 `<a>` 标签，可用于链接跳转。

**icon**（属性）：前缀图标组件。也可以通过 icon 插槽传入自定义图标。

**tag**（属性）：自定义按钮渲染的 HTML 标签。默认 "button"。

### 插槽

**default 插槽**（插槽）：按钮的文字内容。不传时按钮变为纯图标按钮。

**icon 插槽**（插槽）：替换按钮前缀图标区域。替换后 icon 属性失效。加载状态时此插槽被加载动画覆盖。

**suffix 插槽**（插槽）：按钮后缀区域，通常放置右侧图标（如下拉箭头）。

### 事件

**click**（事件）：点击按钮时触发，禁用或加载状态下不会触发。可获取原生鼠标事件对象。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），large 按钮高度缩小至 36px、字号缩小，medium 按钮高度缩至 28px。在平板竖屏及以下（≤840px），large 按钮进一步缩至 32px。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OButton } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| color | `ButtonColorT` | `'normal'` / `'primary'` / `'success'` / `'warning'` / `'danger'` / `'brand'` | `'normal'` | 颜色主题 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'`（仅图标时为 `'text'`） | 视觉形状 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | `'medium'` | 按钮尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角值 |
| loading | `boolean` | — | `false` | 加载状态 |
| disabled | `boolean` | — | `false` | 禁用状态 |
| href | `string` | — | — | 链接地址，设置后渲染为 `<a>` 标签 |
| icon | `Component` | — | — | 前缀图标组件 |
| tag | `string` | — | `'button'` | 渲染标签类型 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| click | `(evt: MouseEvent)` | 点击按钮时（disabled/loading 状态不触发） |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 按钮文字内容 | 无（变为纯图标按钮） |
| icon | — | 有 icon prop 或 icon slot 时 | 前缀图标区域 | `<component :is="icon" />` |
| suffix | — | 有 suffix slot 时 | 后缀图标区域 | 无 |

### 插槽层级关系

```
OButton
├── icon（前缀图标，loading 时被加载动画覆盖）
├── default（按钮文字）
└── suffix（后缀图标）
```

### 典型使用场景与调用模板

**场景 1：主操作按钮**
适用于：页面核心操作（如提交、确认）
```vue
<OButton color="primary" variant="solid" round="pill">
  确认提交
</OButton>
```

**场景 2：普通辅助按钮**
适用于：次要操作（如取消、返回）
```vue
<OButton color="primary" variant="outline" round="pill">
  取消
</OButton>
```

**场景 3：带图标的按钮**
适用于：需要图标辅助说明
```vue
<OButton variant="outline">
  <template #icon><OIconAdd /></template>
  新建
</OButton>
```

**场景 4：纯图标按钮**
适用于：工具栏操作
```vue
<OButton :icon="OIconEdit" size="small" />
```

**场景 5：带后缀的下拉按钮**
适用于：下拉菜单触发器
```vue
<OButton color="brand" round="pill">
  下拉选项
  <template #suffix>
    <OIconChevronDown />
  </template>
</OButton>
```

**场景 6：加载状态**
适用于：异步操作等待中
```vue
<OButton color="primary" variant="solid" :loading="isLoading" @click="handleSubmit">
  提交
</OButton>
```

**场景 7：链接按钮**
适用于：需要跳转的按钮
```vue
<OButton href="https://openeuler.org" color="primary" variant="solid" round="pill">
  访问官网
</OButton>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 主操作 | `color="primary"` + `variant="solid"` | 实心品牌色 |
| 辅助操作 | `color="primary"` + `variant="outline"` | 线框品牌色 |
| 文字按钮 | `variant="text"` | 无背景无边框 |
| 运营活动 | `round="pill"` + class `c-btn-activity` | 社区主题运营按钮 |
| 图标按钮 | `:icon="OIconXxx"` 或 `#icon` | 不传 default 插槽 |
| 危险操作 | `color="danger"` + `variant="solid"` | 红色警告 |

### 响应式行为表

| 维度 | ≤840px | 841–1200px | >1200px |
|------|--------|-----------|---------|
| large 高度 | 32px | 36px | 40px |
| medium 高度 | — | 28px | 32px |
| small 高度 | — | — | 24px |

