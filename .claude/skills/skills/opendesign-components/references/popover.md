# OPopover 气泡卡片

## Part A：设计理解卡

OPopover 是气泡卡片组件，基于 OPopup 封装，用于在目标元素附近弹出轻量级浮层展示提示信息。与 OPopup 的主要区别是默认以悬停触发、默认显示锚点箭头、默认有 8px 偏移距离。

### 显示控制

**visible**（属性）：气泡是否可见（v-model 双向绑定）。

**disabled**（属性）：是否禁用。禁用后直接渲染 target 插槽内容，不创建弹出层。

### 触发方式

**trigger**（属性）：触发弹出的方式。"hover" 悬停、"click" 点击、"click-outclick" 点击显示/点击外部关闭、"hover-outclick" 悬停显示/点击外部关闭、"focus" 聚焦、"contextmenu" 右键、"none" 不自动触发。默认 hover（与 OPopup 的 click 不同）。

**hoverDelay**（属性）：hover 事件延迟触发时间（毫秒）。默认 100ms。

### 定位

**position**（属性）：弹出位置。12 个方向：top/tl/tr（上方）、bottom/bl/br（下方）、left/lt/lb（左侧）、right/rt/rb（右侧）。默认 top。

**offset**（属性）：距触发元素的偏移距离（px）。默认 8（与 OPopup 的 0 不同）。

**edgeOffset**（属性）：距屏幕边缘的偏移量。默认 0。

**adaptive**（属性）：是否自适应边缘（空间不够时自动翻转位置）。默认开启。

### 锚点

**anchor**（属性）：是否显示指向目标的锚点箭头。默认开启（与 OPopup 的 false 不同）。

**anchorClass**（属性）：锚点自定义类名。

### 容器

**target**（属性）：触发元素。可通过 target 插槽指定，也可传入元素引用/选择器。

**wrapper**（属性）：弹出层挂载位置。默认 "body"。

**wrapClass**（属性）：弹出层容器自定义类名，可用于覆盖 CSS 变量（如内边距、阴影）。

**bodyClass**（属性）：弹出层内容体自定义类名。

### 尺寸适配

**adjustWidth**（属性）：弹出层宽度是否等于触发元素宽度。默认开启。

**adjustMinWidth**（属性）：弹出层最小宽度是否等于触发元素宽度。默认开启。

### 生命周期

**unmountOnHide**（属性）：隐藏时是否销毁 DOM。默认开启。

**autoHide**（属性）：是否自动隐藏（点击外部）。默认开启。

**beforeShow**（属性）：显示前回调。返回 false 阻止显示。

**beforeHide**（属性）：隐藏前回调。返回 false 阻止隐藏。

**hideWhenTargetInvisible**（属性）：触发元素不可见时是否自动隐藏弹层。默认开启。

### 插槽区域

**default 插槽**（插槽）：气泡卡片的内容。

**target 插槽**（插槽）：触发气泡的目标元素。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），气泡文字缩小、内边距减少。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OPopover } from '@opensig/opendesign';
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
| trigger | `PopupTriggerT \| PopupTriggerT[]` | 7 种触发方式 | `'hover'` | 触发方式 |
| target | `string \| ComponentPublicInstance \| HTMLElement` | — | `null` | 触发元素 |
| disabled | `boolean` | — | `false` | 禁用 |
| wrapper | `string \| HTMLElement` | — | `'body'` | 挂载位置 |
| offset | `number` | — | `8` | 偏移距离 |
| edgeOffset | `number` | — | `0` | 屏幕边缘偏移 |
| hoverDelay | `number` | — | `100` | hover 延迟（ms） |
| anchor | `boolean` | — | `true` | 显示锚点箭头 |
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

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 气泡内容 | 无 |
| target | — | 始终 | 触发元素 | 无 |

### OPopover 与 OPopup 的默认值差异

| 属性 | OPopover 默认值 | OPopup 默认值 |
|------|----------------|--------------|
| trigger | `'hover'` | `'click'` |
| anchor | `true` | `false` |
| offset | `8` | `0` |

### 典型使用场景与调用模板

**场景 1：基础悬停提示**
适用于：术语解释、信息预览
```vue
<OPopover position="top">
  <div>提示内容</div>
  <template #target>
    <OButton>悬停查看</OButton>
  </template>
</OPopover>
```

**场景 2：点击弹出信息卡片**
适用于：详细信息展示
```vue
<OPopover trigger="click" position="bottom" wrap-class="custom-popover">
  <div style="max-width: 200px">
    <h4>标题</h4>
    <p>详细内容说明...</p>
  </div>
  <template #target>
    <OButton>点击查看</OButton>
  </template>
</OPopover>
```

**场景 3：外部控制显隐**
适用于：程序控制
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
<template>
  <OPopover v-model:visible="visible" trigger="none">
    <div>受控内容</div>
    <template #target>
      <OButton @click="visible = !visible">切换</OButton>
    </template>
  </OPopover>
</template>
```

**场景 4：指定目标元素**
适用于：target 与 popover 不在同一层级
```vue
<script setup>
import { ref } from 'vue';
const targetRef = ref();
</script>
<template>
  <OButton ref="targetRef">目标按钮</OButton>
  <OPopover :target="targetRef" trigger="click">
    <div>分离式弹出内容</div>
  </OPopover>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 悬停提示 | 默认即可 | hover + 箭头 + 8px 偏移 |
| 点击卡片 | `trigger="click"` | 点击弹出 |
| 右键菜单 | `trigger="contextmenu"` | 右键弹出 |
| 无箭头 | `:anchor="false"` | 隐藏锚点 |
| 自定义样式 | `wrap-class="xxx"` | CSS 变量覆盖 |

### CSS 变量

| 变量名 | 说明 |
|--------|------|
| `--popup-padding` | 内边距 |
| `--popup-bg-color` | 背景色 |
| `--popup-shadow` | 阴影 |
| `--popup-radius` | 圆角 |
| `--popup-bd` | 边框 |

### 响应式行为表

| 维度 | ≤1440px | >1440px |
|------|---------|---------|
| 文字 | tip2 | 标准 |
| 内边距 | 7px 12px | 标准 |

