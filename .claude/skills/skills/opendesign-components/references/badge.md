# OBadge 徽标

## Part A：设计理解卡

OBadge 是一个徽标组件，用于在其他元素（如按钮、头像、图标）的右上角显示数字、文字或小红点，起到提醒、计数的作用。也可以独立使用。

### 整体容器

**value**（属性）：徽标显示的内容。支持数字和文本。数字会受 max 属性限制，超出则显示 "max+"；文本则直接原样展示。默认为空。

**max**（属性）：数字最大值上限。当 value 为数字且超过此值时，显示为 "99+" 的形式。默认 99。仅 value 为数字时生效。

**color**（属性）：徽标的主题色。"primary" 品牌蓝、"success" 成功绿、"warning" 警告橙、"danger" 危险红。默认 primary。

**dot**（属性）：是否显示为小红点样式。开启后徽标变成一个无内容的小圆点，不显示 value 中的内容。默认关闭。

**offset**（属性）：徽标位置的偏移量，接收一个数组 `[水平偏移, 垂直偏移]`。数字单位为像素，也支持字符串（如 "50%"）。用于微调徽标在右上角的精确位置。

### 插槽

**default 插槽**（插槽）：放置被装饰的主体内容（如按钮、头像）。不传时，徽标作为独立元素显示（不再定位到右上角，而是行内展示）。

**content 插槽**（插槽）：替换徽标内部的显示内容。替换后 value 和 max 属性失效。可放入图标或自定义标记。

📱 **响应式行为**：在平板竖屏及以下（≤840px），小红点尺寸保持 6px。本组件响应式差异极小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OBadge } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number` | — | `''` | 徽标内容 |
| max | `number` | — | `99` | 最大值，超过显示 max+（仅 value 为数字时生效） |
| color | `BadgeColorT` | `'primary'` / `'success'` / `'warning'` / `'danger'` | `'primary'` | 徽标颜色 |
| dot | `boolean` | — | `false` | 是否显示为小红点 |
| offset | `Array<number \| string>` | — | `[]` | 位置偏移 `[x, y]`，数字为 px，字符串如 `'50%'` |

### Events 表

本组件无自定义事件。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 被装饰的主体内容 | 无（独立模式） |
| content | — | 始终 | 徽标内部显示内容 | `{{ value }}` 或 `{{ max }}+` |

### 插槽层级关系

```
default（主体内容，不传则独立显示）
content（徽标内容，使用后 value/max 失效）
```

### 典型使用场景与调用模板

**场景 1：数字徽标**
适用于：显示未读消息数量
```vue
<OBadge :value="9" color="danger">
  <OButton variant="solid">消息</OButton>
</OBadge>
```

**场景 2：超出最大值**
适用于：消息数可能很大
```vue
<OBadge :value="100" :max="99" color="danger">
  <OButton variant="solid">通知</OButton>
</OBadge>
<!-- 显示为 "99+" -->
```

**场景 3：文字徽标**
适用于：显示状态标记如"hot"、"new"
```vue
<OBadge value="hot" color="warning">
  <OButton variant="solid">推荐</OButton>
</OBadge>
```

**场景 4：小红点**
适用于：仅提示有新内容，不显示数量
```vue
<OBadge color="danger" dot>
  <OLink href="/notifications">通知</OLink>
</OBadge>
```

**场景 5：位置偏移**
适用于：微调徽标精确位置
```vue
<OBadge :value="9" :offset="[5, -6]" color="danger">
  <img src="/avatar.svg" style="width: 48px; height: 48px;" />
</OBadge>
```

**场景 6：自定义内容插槽**
适用于：徽标内显示图标而非文字
```vue
<OBadge>
  <img src="/avatar.svg" style="width: 48px; height: 48px;" />
  <template #content>
    <OIconChecked />
  </template>
</OBadge>
```

**场景 7：独立使用（无 default 插槽）**
适用于：行内显示独立的状态标记
```vue
<OBadge :value="9" color="danger" />
<OBadge value="hot" color="warning" />
<OBadge dot color="danger" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 未读计数 | `color="danger"` + `:value="count"` | 最常见用法 |
| 状态标记 | `color="warning"` + `value="new"` | 文字型徽标 |
| 小红点提示 | `color="danger"` + `dot` | 仅提示，不显示数量 |
| 独立使用 | 无 default 插槽 | 行内展示 |

### 响应式行为表

本组件无显著响应式差异。

