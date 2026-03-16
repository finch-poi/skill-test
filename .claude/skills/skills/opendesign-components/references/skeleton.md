# OSkeleton 骨架屏

## Part A：设计理解卡

OSkeleton 是骨架屏组件，在内容加载完成前展示占位图形，提升用户等待体验。包含 OSkeleton（容器）、OSkeletonText（文本占位）、OSkeletonAvatar（头像占位）、OSkeletonFigure（图片占位）。

### 显示控制

**loading**（属性）：是否显示骨架屏。true 时显示骨架占位，false 时显示真实内容（default 插槽）。默认 true。

### 动画

**animation**（属性）：是否显示加载动画（闪烁效果）。默认关闭。

### 文本行数

**rows**（属性）：默认骨架屏的文本行数（使用内置 OSkeletonText）。默认 3 行。

### 插槽区域

**template 插槽**（插槽）：自定义骨架屏布局。使用后 rows 属性失效，可自由组合 OSkeletonText、OSkeletonAvatar、OSkeletonFigure。

**default 插槽**（插槽）：加载完成后显示的真实内容。仅在 loading 为 false 时渲染。

---

### OSkeletonText 文本占位

**rows**（属性）：文本行数。默认 3。

### OSkeletonAvatar 头像占位

**size**（属性）：头像尺寸。"large"、"medium"、"small"、"mini"。默认 medium。

**round**（属性）：圆角值。默认 "pill"（圆形）。

### OSkeletonFigure 图片占位

纯图片占位区域，无特殊属性。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），头像尺寸（large/medium/small）缩小；在平板横屏及以下（≤1200px），medium 头像进一步缩小。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OSkeleton, OSkeletonText, OSkeletonAvatar, OSkeletonFigure } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type SkeletonAvatarSizeT = 'large' | 'medium' | 'small' | 'mini';
```

### OSkeleton Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| loading | `boolean` | — | `true` | 是否显示骨架屏 |
| animation | `boolean` | — | `false` | 闪烁动画 |
| rows | `number` | — | `3` | 文本行数 |

### OSkeletonText Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| rows | `number` | — | `3` | 文本行数 |

### OSkeletonAvatar Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| size | `SkeletonAvatarSizeT` | `'large'` / `'medium'` / `'small'` / `'mini'` | `'medium'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | `'pill'` | 圆角 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| template | — | loading 为 true 时 | 骨架屏布局 | `<OSkeletonText :rows />` |
| default | — | loading 为 false 时 | 真实内容 | 无 |

### 插槽层级关系

```
OSkeleton
├── template（loading=true 时显示）
│   ├── OSkeletonText
│   ├── OSkeletonAvatar
│   └── OSkeletonFigure
└── default（loading=false 时显示）
```

### 典型使用场景与调用模板

**场景 1：基础文本骨架**
适用于：文章加载占位
```vue
<OSkeleton :loading="loading" :rows="4">
  <p>加载完成的文本内容</p>
</OSkeleton>
```

**场景 2：带头像的骨架**
适用于：用户信息卡片
```vue
<OSkeleton :loading="loading" animation>
  <template #template>
    <OSkeletonAvatar size="large" />
    <OSkeletonText :rows="3" />
  </template>
  <div>用户信息内容</div>
</OSkeleton>
```

**场景 3：带图片占位的骨架**
适用于：图文内容加载
```vue
<OSkeleton :loading="loading" animation>
  <template #template>
    <OSkeletonFigure />
    <OSkeletonAvatar size="large" />
    <OSkeletonText :rows="3" />
  </template>
  <div>图文内容</div>
</OSkeleton>
```

**场景 4：受控切换**
适用于：手动控制加载状态
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
<template>
  <OSwitch v-model="loading" />
  <OSkeleton :loading="loading" animation>
    <template #template>
      <OSkeletonFigure />
      <OSkeletonText :rows="2" />
    </template>
    <p>真实内容</p>
  </OSkeleton>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础占位 | `:loading` + `:rows` | 纯文本骨架 |
| 带动画 | `animation` | 闪烁效果 |
| 自定义布局 | `#template` 插槽 | 自由组合子组件 |
| 圆角头像 | OSkeletonAvatar `round="pill"` | 默认圆形 |
| 方形头像 | OSkeletonAvatar `round="8px"` | 方角 |

### 响应式行为表

| 维度 | ≤1200px | 1201–1440px | >1440px |
|------|---------|-------------|---------|
| large 头像 | 64px | 64px | 标准 |
| medium 头像 | 40px | 48px | 标准 |
| small 头像 | 32px | 32px | 标准 |

