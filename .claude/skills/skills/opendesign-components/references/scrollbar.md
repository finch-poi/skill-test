# OScrollbar 滚动条

## Part A：设计理解卡

OScrollbar 是自定义滚动条组件，用于替换浏览器原生滚动条。需要关联一个滚动容器（通过 target 属性），在该容器上显示美化的滚动条。支持水平和垂直方向、两种尺寸、四种显示模式。

### 关联目标

**target**（属性）：滚动条关联的滚动容器。可传入 HTMLElement、组件实例或 "body" 字符串。滚动条会根据该容器的滚动状态同步更新。

### 尺寸

**size**（属性）：滚动条粗细。"medium" 中号（6px，悬停 10px）、"small" 小号（3px，悬停 6px）。默认 medium。

### 显示模式

**showType**（属性）：滚动条何时可见。"auto" 滚动时和悬停时显示、"always" 一直显示、"hover" 仅悬停容器时显示、"never" 不显示。默认 auto。

**duration**（属性）：滚动停止后滚动条持续显示的时间（毫秒）。默认 600ms。

### 方向控制

**disabledX**（属性）：隐藏水平滚动条。

**disabledY**（属性）：隐藏垂直滚动条。

### 高级

**autoUpdateOnScrollSize**（属性）：showType 为 always 时，是否根据滚动内容高度变化自动刷新滚动条。

**barClass**（属性）：滚动条自定义类名。

### 插槽区域

**thumb 插槽**（插槽）：替换滚动条滑块。

**track 插槽**（插槽）：替换滚动条轨道。

📱 **响应式行为**：本组件无响应式差异。触控设备上 hover 模式自动降级（isPhonePad 时不监听 hover 事件）。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OScrollbar, OScroller } from '@opensig/opendesign';
</script>
```

> OScrollbar：挂载到已有滚动容器上的滚动条。
> OScroller：自带滚动容器的组合组件（容器 + 滚动条）。

### OScrollbar Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| target | `HTMLElement \| ComponentPublicInstance \| string` | — | `null` | 关联的滚动容器 |
| size | `ScrollerSizeT` | `'medium'` / `'small'` | `'medium'` | 尺寸 |
| showType | `string` | `'auto'` / `'always'` / `'hover'` / `'never'` | `'auto'` | 显示模式 |
| duration | `number` | — | `600` | 滚动停止后持续显示时间（ms） |
| disabledX | `boolean` | — | `false` | 隐藏横向滚动条 |
| disabledY | `boolean` | — | `false` | 隐藏纵向滚动条 |
| autoUpdateOnScrollSize | `boolean` | — | `false` | 自动刷新（always 模式） |
| barClass | `string \| object \| array` | — | — | 自定义类名 |

### OScroller Props 表

OScroller 继承 OScrollbar 的所有 props（除 target），额外支持：

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| wrapClass | `string \| object \| array` | — | — | 滚动容器类名 |

### OScroller Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| scroll | `(event: Event)` | 滚动容器滚动时 |

### OScrollbar Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| thumb | — | 始终 | 滚动条滑块 | 默认滑块 |
| track | — | 始终 | 滚动条轨道 | 默认轨道 |

### OScroller Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 滚动容器内容 | 无 |
| thumb | — | 始终 | 滚动条滑块 | 默认滑块 |
| track | — | 始终 | 滚动条轨道 | 默认轨道 |

### OScrollbar 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| update() | — | 手动刷新滚动条状态 |

### OScroller 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| scrollTo(options?) | `ScrollToOptions` | — | 滚动到指定位置 |
| getContainerEl() | — | `HTMLElement \| null` | 获取滚动容器 DOM 元素 |

### 典型使用场景与调用模板

**场景 1：为已有容器添加滚动条**
适用于：已有滚动容器需要美化滚动条
```vue
<script setup>
import { ref } from 'vue';
const container = ref();
</script>
<template>
  <div ref="container" style="height: 300px; overflow: auto; position: relative;">
    <div style="height: 1000px;">长内容</div>
    <OScrollbar :target="container" :disabled-x="true" show-type="always" />
  </div>
</template>
```

**场景 2：使用 OScroller 一体化组件**
适用于：新建滚动区域
```vue
<OScroller style="height: 300px;" show-type="always">
  <div style="height: 1000px;">长内容</div>
</OScroller>
```

**场景 3：小号悬停显示**
适用于：空间紧凑的区域
```vue
<OScrollbar :target="container" size="small" show-type="hover" />
```

**场景 4：关联 body 滚动**
适用于：全局页面滚动条
```vue
<OScrollbar target="body" show-type="always" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 始终可见 | `show-type="always"` | 一直显示 |
| 滚动时显示 | `show-type="auto"`（默认） | 滚动后自动隐藏 |
| 悬停显示 | `show-type="hover"` + `size="small"` | 紧凑悬停 |
| 仅纵向 | `:disabled-x="true"` | 隐藏横向 |
| body 滚动条 | `target="body"` | 全页滚动 |

### CSS 变量

| 变量名 | 说明 |
|--------|------|
| `--scrollbar-thumb-bg-color` | 滑块颜色 |
| `--scrollbar-thumb-bg-color-hover` | 滑块悬停颜色 |
| `--scrollbar-thumb-bg-color-active` | 滑块拖拽颜色 |
| `--scrollbar-track-bg-color` | 轨道颜色 |
| `--scrollbar-thumb-width` | 滑块宽度（medium: 6px, small: 3px） |
| `--scrollbar-thumb-width-hover` | 滑块悬停宽度（medium: 10px, small: 6px） |

### 响应式行为表

本组件无响应式差异。

