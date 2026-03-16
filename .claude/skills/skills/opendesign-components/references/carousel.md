# OCarousel 幻灯片

## Part A：设计理解卡

OCarousel 是幻灯片/轮播组件，用于在有限空间内循环展示多组内容（图片、卡片等）。支持滚动和切换两种动效，可自动播放、手动箭头/指示器切换。包含 OCarousel（容器）和 OCarouselItem（幻灯片项）。

### 播放效果

**effect**（属性）：幻灯片切换效果。"gallery" 滚动效果，相邻幻灯片可部分露出；"toggle" 直接切换，一次只显示一张。默认 gallery。gallery 模式下可以将 OCarouselItem 宽度设为略小于 OCarousel，使两侧幻灯片部分可见。

### 自动播放控制

**autoPlay**（属性）：是否自动播放。默认关闭。

**interval**（属性）：自动播放间隔时间（毫秒）。默认 5000。

**pauseOnHover**（属性）：鼠标悬停时是否暂停自动播放。默认关闭。

### 索引控制

**activeIndex**（属性）：当前激活的幻灯片索引（v-model 双向绑定）。

**clickToSwitch**（属性）：是否允许点击非激活的幻灯片来切换。在 gallery 模式下露出两侧幻灯片时尤其有用。默认关闭。

**manualInit**（属性）：是否手动初始化。开启后需要调用暴露的 init() 方法才会初始化。默认关闭。

### 指示器

**hideIndicator**（属性）：是否隐藏底部指示器。默认显示。

**indicatorClick**（属性）：是否允许点击指示器切换幻灯片。默认关闭。

**indicatorWrapClass**（属性）：指示器容器自定义类名。

**indicator 插槽**（插槽）：自定义每个指示器项的渲染。可获取 active（是否激活）和 index（索引）。

### 箭头导航

**arrow**（属性）：箭头显示方式。"hover" 鼠标悬停时显示、"always" 始终显示、"never" 不显示。默认 hover。

**arrowWrapClass**（属性）：箭头容器自定义类名。

**arrow-prev / arrow-next 插槽**（插槽）：替换左/右箭头整体。

**arrow-prev-icon / arrow-next-icon 插槽**（插槽）：仅替换箭头图标。

### 内容

**default 插槽**（插槽）：放置 OCarouselItem 子项。

### 事件

**change**（事件）：幻灯片切换完成后触发，可获取新旧索引。

**before-change**（事件）：幻灯片切换动画开始前触发。

**pause**（事件）：自动播放暂停时触发。

### 暴露方法

组件暴露 init()、play()、pause()、active(index) 方法供外部调用。

📱 **响应式行为**：在平板到笔记本（840-1200px）指示器宽度缩至 40px、高度 3px；平板竖屏及以下（≤840px）箭头图标缩小、指示器进一步缩至 24px；手机（≤600px）指示器缩至 16px。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OCarousel, OCarouselItem } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| activeIndex | `number` | — | `0` | 激活索引（v-model） |
| effect | `string` | `'gallery'` / `'toggle'` | `'gallery'` | 切换效果 |
| autoPlay | `boolean` | — | `false` | 自动播放 |
| interval | `number` | — | `5000` | 播放间隔（ms） |
| arrow | `string` | `'always'` / `'hover'` / `'never'` | `'hover'` | 箭头显示方式 |
| arrowWrapClass | `string \| object \| array` | — | — | 箭头容器类名 |
| hideIndicator | `boolean` | — | `false` | 隐藏指示器 |
| indicatorClick | `boolean` | — | `false` | 指示器可点击切换 |
| indicatorWrapClass | `string \| object \| array` | — | — | 指示器容器类名 |
| clickToSwitch | `boolean` | — | `false` | 点击卡片切换 |
| manualInit | `boolean` | — | `false` | 手动初始化 |
| activeClass | `string \| object \| array` | — | — | 自定义激活类名 |
| pauseOnHover | `boolean` | — | `false` | 悬停暂停播放 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:activeIndex | `(value: number)` | 激活索引变化时 |
| before-change | `(to: number, from: number)` | 切换动画开始前 |
| change | `(to: number, from: number)` | 切换完成后 |
| pause | `(value: number)` | 自动播放暂停时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 幻灯片列表 | 无 |
| indicator | `{ active: boolean, index: number }` | 未隐藏指示器时 | 每个指示器项 | 默认指示条 |
| arrow-prev | — | arrow 非 never | 左箭头整体 | 默认左箭头 |
| arrow-next | — | arrow 非 never | 右箭头整体 | 默认右箭头 |
| arrow-prev-icon | — | arrow 非 never | 左箭头图标 | `<IconChevronLeft />` |
| arrow-next-icon | — | arrow 非 never | 右箭头图标 | `<IconChevronRight />` |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| init() | — | 手动初始化（manualInit 为 true 时使用） |
| play() | — | 开始自动播放 |
| pause() | — | 暂停自动播放 |
| active(index) | `index: number` | 切换到指定索引 |

### 典型使用场景与调用模板

**场景 1：基础轮播（Gallery 效果）**
适用于：Banner 轮播图
```vue
<OCarousel auto-play :interval="3000" indicator-click>
  <OCarouselItem v-for="i in 5" :key="i">
    <img :src="`/banner-${i}.jpg`" />
  </OCarouselItem>
</OCarousel>
```

**场景 2：切换效果**
适用于：全屏幻灯片
```vue
<OCarousel effect="toggle" auto-play pause-on-hover>
  <OCarouselItem v-for="i in 3" :key="i">
    <div class="slide-content">第 {{ i }} 页</div>
  </OCarouselItem>
</OCarousel>
```

**场景 3：Gallery 露出两侧**
适用于：点击切换卡片轮播
```vue
<OCarousel click-to-switch arrow="always">
  <OCarouselItem v-for="i in 5" :key="i" style="width: 80%;">
    <img :src="`/card-${i}.jpg`" />
  </OCarouselItem>
</OCarousel>
```

**场景 4：自定义指示器**
适用于：使用自定义样式的指示器
```vue
<OCarousel indicator-click>
  <OCarouselItem v-for="i in 4" :key="i">
    <div>内容 {{ i }}</div>
  </OCarouselItem>
  <template #indicator="{ active, index }">
    <div :class="['my-dot', { 'my-dot-active': active }]">{{ index + 1 }}</div>
  </template>
</OCarousel>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 自动轮播 Banner | `auto-play` + `indicator-click` + `pause-on-hover` | 最常见用法 |
| 手动切换 | `arrow="always"` + `indicator-click` | 用户主动控制 |
| 卡片轮播 | `click-to-switch` + Gallery 模式 | OCarouselItem 宽度 < 100% |
| 全屏切换 | `effect="toggle"` | 直接切换 |

### 响应式行为表

| 维度 | ≤600px | 601–840px | 841–1200px | >1200px |
|------|--------|----------|-----------|---------|
| 指示器宽度 | 16px | 24px | 40px | 56px |
| 指示器高度 | 2px | 2px | 3px | 4px |
| 箭头图标大小 | — | 缩小 | 标准 | 标准 |

