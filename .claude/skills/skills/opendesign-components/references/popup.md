# OPopup 弹出层

## Part A：设计理解卡

OPopup 是通用弹出层组件，是 OPopover、ODropdown、OSelect 等组件的基础。提供精确的位置计算、12 个弹出方向、7 种触发方式、自适应边缘翻转、锚点箭头等功能。通常不直接使用，而是通过封装组件使用。

### 显示控制

**visible**（属性）：弹出层是否可见（v-model 双向绑定）。

**disabled**（属性）：是否禁用弹出层。

### 触发方式

**trigger**（属性）：触发弹出的方式，可传单个或数组。"click" 点击、"click-outclick" 点击显示/点击外部关闭、"hover" 悬停、"hover-outclick" 悬停显示/点击外部关闭、"focus" 聚焦、"contextmenu" 右键、"none" 不自动触发（手动控制）。默认 click。

**hoverDelay**（属性）：hover 事件延迟触发时间（毫秒）。默认 100ms。

### 定位

**position**（属性）：弹出位置。12 个方向：top/tl/tr/bottom/bl/br/left/lt/lb/right/rt/rb。默认 top。

**offset**（属性）：距触发元素的偏移距离（px）。默认 0。

**edgeOffset**（属性）：距屏幕边缘的最小偏移量。默认 0。

**adaptive**（属性）：空间不够时是否自动翻转位置。默认开启。

### 目标与容器

**target**（属性）：触发元素，可传入组件实例、DOM 元素或选择器字符串。也可通过 target 插槽指定。

**wrapper**（属性）：弹出层挂载容器。默认 "body"。

### 锚点

**anchor**（属性）：是否计算并显示锚点箭头。默认关闭。

**anchorClass**（属性）：锚点自定义类名。

### 尺寸

**adjustWidth**（属性）：弹出层宽度是否匹配触发元素宽度。默认开启。

**adjustMinWidth**（属性）：弹出层最小宽度是否匹配触发元素宽度。默认开启。

### 样式

**wrapClass**（属性）：弹出层外层容器自定义类名。

**bodyClass**（属性）：弹出层内容体自定义类名。

**transition**（属性）：过渡动画名称。默认 "o-zoom-fade"。

### 生命周期

**unmountOnHide**（属性）：隐藏时是否卸载组件。默认开启。

**autoHide**（属性）：点击外部时是否自动隐藏。默认开启。

**hideWhenTargetInvisible**（属性）：触发元素滚出视口时是否自动隐藏。默认开启。

**beforeShow**（属性）：显示前回调。返回 false 阻止显示。

**beforeHide**（属性）：隐藏前回调。返回 false 阻止隐藏。

### 插槽区域

**default 插槽**（插槽）：弹出层的内容。

**target 插槽**（插槽）：触发弹出的目标元素。

**anchor 插槽**（插槽）：自定义锚点箭头内容。仅在 anchor 属性开启时生效。

### 事件

**update:visible**（事件）：显示状态变化时触发。

**change**（事件）：显示/隐藏状态变化时触发。

📱 **响应式行为**：本组件无响应式差异（由外层封装组件处理）。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OPopup } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type PopupPositionT = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'lt' | 'lb' | 'right' | 'rt' | 'rb';
type PopupTriggerT = 'none' | 'click' | 'click-outclick' | 'hover' | 'hover-outclick' | 'focus' | 'contextmenu';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | — | 是否可见（v-model） |
| position | `PopupPositionT` | 12 个方向 | `'top'` | 弹出位置 |
| trigger | `PopupTriggerT \| PopupTriggerT[]` | 7 种触发方式 | `'click'` | 触发方式 |
| target | `string \| ComponentPublicInstance \| HTMLElement` | — | `null` | 触发元素 |
| disabled | `boolean` | — | `false` | 禁用 |
| wrapper | `string \| HTMLElement` | — | `'body'` | 挂载容器 |
| offset | `number` | — | `0` | 偏移距离 |
| edgeOffset | `number` | — | `0` | 屏幕边缘偏移 |
| hoverDelay | `number` | — | `100` | hover 延迟（ms） |
| anchor | `boolean` | — | `false` | 显示锚点箭头 |
| anchorClass | `string \| object \| array` | — | — | 锚点类名 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时卸载 |
| wrapClass | `string \| object \| array` | — | — | 容器类名 |
| bodyClass | `string \| object \| array` | — | — | 内容体类名 |
| adjustMinWidth | `boolean` | — | `true` | 最小宽度适配 |
| adjustWidth | `boolean` | — | `true` | 宽度适配 |
| transition | `string` | — | `'o-zoom-fade'` | 过渡动画 |
| autoHide | `boolean` | — | `true` | 自动隐藏 |
| adaptive | `boolean` | — | `true` | 自适应边缘 |
| beforeShow | `() => Promise<boolean> \| boolean` | — | — | 显示前回调 |
| beforeHide | `() => Promise<boolean> \| boolean` | — | — | 隐藏前回调 |
| hideWhenTargetInvisible | `boolean` | — | `true` | 目标不可见时隐藏 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 显示状态变化时 |
| change | `(val: boolean)` | 显示/隐藏状态变化时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 弹出内容 | 无 |
| target | — | 始终 | 触发元素 | 无 |
| anchor | — | anchor 为 true 时 | 锚点箭头内容 | 无（仅显示空箭头容器） |

### 典型使用场景与调用模板

**场景 1：基础弹出层**
适用于：自定义弹出交互
```vue
<OPopup position="bottom">
  <div>弹出内容</div>
  <template #target>
    <OButton>点击弹出</OButton>
  </template>
</OPopup>
```

**场景 2：带锚点箭头**
适用于：Tooltip 类交互
```vue
<OPopup trigger="hover" anchor :offset="8" position="top">
  <div>提示文字</div>
  <template #target>
    <span>悬停目标</span>
  </template>
</OPopup>
```

**场景 3：自定义样式**
适用于：覆盖默认外观
```vue
<OPopup wrap-class="my-popup" body-class="my-popup-body">
  <div>自定义内容</div>
  <template #target>
    <OButton>触发</OButton>
  </template>
</OPopup>
```

**场景 4：受控模式**
适用于：程序完全控制
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
<template>
  <OPopup v-model:visible="visible" trigger="none">
    <div>受控内容</div>
    <template #target>
      <OButton @click="visible = !visible">切换</OButton>
    </template>
  </OPopup>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 点击弹出 | 默认即可 | click 触发 |
| 悬停提示 | `trigger="hover"` + `anchor` + `:offset="8"` | 类 Tooltip |
| 右键菜单 | `trigger="contextmenu"` | 右键弹出 |
| 手动控制 | `v-model:visible` + `trigger="none"` | 完全受控 |
| 不自适应 | `:adaptive="false"` | 固定位置 |

### CSS 变量

| 变量名 | 说明 |
|--------|------|
| `--popup-padding` | 内边距 |
| `--popup-bg-color` | 背景色 |
| `--popup-shadow` | 阴影 |
| `--popup-radius` | 圆角 |
| `--popup-bd` | 边框 |
| `--popup-min-width` | 最小宽度 |
| `--popup-z-index` | 层级 |
| `--popup-edge-offset` | 边缘偏移 |

### 响应式行为表

本组件无响应式差异。

