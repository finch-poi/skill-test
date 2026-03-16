# SCSS Mixins 参考文档

本文档详细说明 openEuler Portal 项目中所有可用的 SCSS Mixins。

## 导入方式

```scss
@use '~@/assets/style/mixin/screen.scss' as *;
@use '~@/assets/style/mixin/font.scss' as *;
@use '~@/assets/style/mixin/common.scss' as *;
```

## screen.scss - 响应式断点

提供响应式断点 mixin，用于根据屏幕尺寸应用不同的样式。

### respond-to

响应式断点 mixin，根据屏幕尺寸应用样式。

#### 可用断点

```scss
// 手机
'phone': (0, 600px)           // 0-600px
'>phone': 601px                // 大于 600px

// 平板
'pad': (601px, 1200px)         // 601-1200px
'<=pad': (0, 1200px)           // 0-1200px
'>pad': 1201px                  // 大于 1200px

// 竖屏平板
'pad_v': (601px, 840px)        // 601-840px
'<=pad_v': (0, 840px)          // 0-840px
'>pad_v': 841px                // 大于 840px

// 横屏平板
'pad_h': (841px, 1200px)       // 841-1200px

// 笔记本
'laptop': (1201px, 1440px)     // 1201-1440px
'<=laptop': (0, 1440px)        // 0-1440px
'>laptop': 1441px              // 大于 1440px

// 组合断点
'pad-laptop': (601px, 1440px)  // 601-1440px
'pad_v-laptop': (841px, 1440px) // 841-1440px
```

#### 使用方法

```scss
.container {
  padding: 20px;
  
  // 手机端样式
  @include respond-to('phone') {
    padding: 16px;
  }
  
  // 平板端样式
  @include respond-to('pad') {
    padding: 24px;
  }
  
  // 笔记本及以上样式
  @include respond-to('laptop') {
    padding: 32px;
  }
  
  // 大于手机尺寸
  @include respond-to('>phone') {
    display: flex;
  }
}
```

#### 完整示例

```scss
.card {
  width: 100%;
  margin: 16px;
  
  @include respond-to('phone') {
    margin: 8px;
  }
  
  @include respond-to('pad') {
    width: calc(50% - 32px);
  }
  
  @include respond-to('laptop') {
    width: calc(33.333% - 48px);
    margin: 24px;
  }
}
```

## font.scss - 响应式字体

提供响应式字体大小 mixin，确保字体在不同屏幕尺寸下自动适配。

### 字体类型

#### 数据展示字体

- `display1` - 一级数据展示（最大）
- `display2` - 二级数据展示
- `display3` - 三级数据展示

#### 标题字体

- `h1` - 一级标题
- `h2` - 二级标题
- `h3` - 三级标题
- `h4` - 四级标题

#### 正文字体

- `text1` - 常规正文
- `text2` - 大号正文

#### 提示文本

- `tip1` - 提示文本1
- `tip2` - 提示文本2

### 字体大小对照表

| Mixin | 桌面 (1441px+) | 笔记本 (1201-1440px) | 横屏平板 (841-1200px) | 竖屏平板 (601-840px) | 手机 (0-600px) |
|-------|----------------|---------------------|---------------------|-------------------|---------------|
| display1 | 56px/80px | 48px/64px | 40px/56px | 40px/56px | 22px/30px |
| display2 | 48px/64px | 40px/56px | 32px/44px | 32px/44px | 20px/28px |
| display3 | 40px/56px | 32px/44px | 24px/32px | 22px/30px | 18px/26px |
| h1 | 32px/44px | 20px/28px | 20px/28px | 18px/26px | 16px/24px |
| h2 | 24px/32px | 20px/28px | 18px/26px | 18px/26px | 16px/24px |
| h3 | 22px/30px | 18px/26px | 16px/24px | 16px/24px | 16px/24px |
| h4 | 20px/28px | 18px/26px | 16px/24px | 16px/24px | 14px/22px |
| text1 | 16px/24px | 14px/22px | 14px/22px | 14px/22px | 12px/18px |
| text2 | 18px/26px | 16px/24px | 14px/22px | 14px/22px | 14px/22px |
| tip1 | 14px/22px | 12px/18px | 12px/18px | 12px/18px | 10px/16px |
| tip2 | 12px/18px | 12px/18px | 12px/18px | 12px/18px | 10px/16px |

### 使用方法

```scss
// 标题
.page-title {
  @include h1;
}

.section-title {
  @include h2;
}

// 正文
.content {
  @include text1;
}

.large-content {
  @include text2;
}

// 数据展示
.stat-number {
  @include display1;
}

// 提示文本
.hint-text {
  @include tip1;
}
```

### 完整示例

```vue
<template>
  <div class="article">
    <h1 class="article-title">文章标题</h1>
    <div class="article-content">文章内容...</div>
    <p class="article-meta">发布时间：2024-01-01</p>
  </div>
</template>

<style lang="scss" scoped>
@use '~@/assets/style/mixin/font.scss' as *;

.article-title {
  @include h1;
  margin-bottom: 24px;
}

.article-content {
  @include text1;
  margin-bottom: 16px;
}

.article-meta {
  @include tip1;
  color: #999;
}
</style>
```

## common.scss - 通用样式

提供通用的样式 mixin，包括暗色模式、文本截断、滚动条样式等。

### in-dark

暗色模式样式包装器。

#### 使用方法

```scss
.button {
  background-color: #fff;
  color: #000;
  
  @include in-dark {
    background-color: #1a1a1a;
    color: #fff;
  }
}
```

### text-truncate

文本截断 mixin，支持单行和多行截断。

#### 参数

- `$line-clamp`: 行数，默认为 1（单行截断）

#### 使用方法

```scss
// 单行截断
.title {
  @include text-truncate;
  // 或
  @include text-truncate(1);
}

// 多行截断（2行）
.description {
  @include text-truncate(2);
}

// 多行截断（3行）
.content {
  @include text-truncate(3);
}
```

#### 完整示例

```scss
.card-title {
  @include text-truncate;  // 单行截断
}

.card-description {
  @include text-truncate(2);  // 两行截断
  margin-top: 8px;
}
```

### img-in-dark

暗色模式下图片样式调整。

#### 使用方法

```scss
.logo {
  @include img-in-dark;
}
```

### scrollbar

自定义滚动条样式。

#### 使用方法

```scss
.scrollable-container {
  @include scrollbar;
  overflow-y: auto;
  max-height: 400px;
}
```

#### 样式说明

- 滚动条宽度/高度：4px
- 滚动条轨道：圆角 4px，背景色为 `var(--o-color-fill1)`
- 滚动条滑块：圆角 4px，背景色为 `var(--o-color-control1)`

### hoverable

悬停效果包装器，仅在支持悬停的设备上应用样式。

#### 参数

- `$hover`: 悬停类型，默认为 `hover`

#### 使用方法

```scss
.button {
  @include hoverable {
    opacity: 0.8;
  }
}
```

### hover

悬停效果 mixin，仅在支持悬停的设备上应用 `:hover` 样式。

#### 使用方法

```scss
.button {
  transition: opacity 0.3s;
  
  @include hover {
    opacity: 0.8;
  }
}
```

### me-hover

移动端优先的悬停效果，先应用基础样式，然后在支持悬停的设备上应用悬停样式。

#### 使用方法

```scss
.button {
  @include me-hover {
    opacity: 0.8;
  }
}
```

### x-hover

X 图标旋转悬停效果。

#### 使用方法

```scss
.close-button {
  @include x-hover;
}
```

### x-svg-hover

SVG X 图标旋转悬停效果。

#### 使用方法

```scss
.close-icon {
  @include x-svg-hover;
}
```

### 完整示例

```vue
<template>
  <div class="card">
    <h2 class="card-title">卡片标题</h2>
    <p class="card-description">这是一段很长的描述文本，可能会被截断...</p>
    <div class="card-content">
      <img src="logo.png" alt="Logo" class="card-logo" />
    </div>
    <div class="card-scrollable">
      <div v-for="item in items" :key="item.id">{{ item.text }}</div>
    </div>
    <button class="card-button">点击按钮</button>
  </div>
</template>

<style lang="scss" scoped>
@use '~@/assets/style/mixin/common.scss' as *;
@use '~@/assets/style/mixin/font.scss' as *;

.card {
  padding: 24px;
  background-color: #fff;
  
  @include in-dark {
    background-color: #1a1a1a;
  }
}

.card-title {
  @include h2;
  @include text-truncate;  // 单行截断
  margin-bottom: 16px;
}

.card-description {
  @include text1;
  @include text-truncate(2);  // 两行截断
  margin-bottom: 16px;
}

.card-logo {
  @include img-in-dark;
}

.card-scrollable {
  @include scrollbar;
  max-height: 300px;
  overflow-y: auto;
}

.card-button {
  @include hover {
    opacity: 0.8;
  }
}
</style>
```

## 组合使用示例

```vue
<template>
  <div class="responsive-page">
    <h1 class="page-title">响应式页面</h1>
    <div class="page-content">
      <p>这是页面内容</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~@/assets/style/mixin/screen.scss' as *;
@use '~@/assets/style/mixin/font.scss' as *;
@use '~@/assets/style/mixin/common.scss' as *;

.responsive-page {
  padding: 32px;
  
  @include respond-to('pad') {
    padding: 24px;
  }
  
  @include respond-to('phone') {
    padding: 16px;
  }
}

.page-title {
  @include h1;
  margin-bottom: 24px;
  
  @include respond-to('phone') {
    margin-bottom: 16px;
  }
}

.page-content {
  @include text1;
  
  p {
    @include text-truncate(3);
    margin-bottom: 16px;
  }
}
</style>
```











