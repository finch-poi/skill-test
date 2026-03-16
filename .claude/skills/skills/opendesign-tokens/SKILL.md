---
name: opendesign-tokens
description: OpenDesign 设计 Token 指南。当需要使用 @opensig/opendesign-token 包中的 CSS 变量时使用此 skill。包含三套主题（openeuler/ascend/kunpeng）的完整 token 体系，支持颜色、间距、圆角、字体、阴影、动画等所有设计令牌。使用场景：(1) 查找颜色值对应的语义 token，(2) 获取间距/圆角/字体的 token 名称，(3) 了解三套主题的差异，(4) 代码中使用 CSS 变量替代硬编码值
---

# OpenDesign 设计 Token 指南

`@opensig/opendesign-token` 是 OpenDesign 组件库的设计令牌包，所有 token 使用 `--o-` 前缀。

组件库有三套独立主题（openEuler / Ascend / Kunpeng），**每个社区项目在初始化时选定一套，不在三套主题之间运行时切换**。选定主题后，只需在浅色/深色模式之间切换。

---

## 各社区主题的使用方式

### openEuler 主题（`e`）

```typescript
// main.ts 引入（必须在组件样式之前）
import '@opensig/opendesign-token/themes/e.token.css'
```

运行时切换 light/dark（设置在 `<html>` 或 `<body>` 上）：
```javascript
document.documentElement.setAttribute('data-o-theme', 'e.light') // 浅色
document.documentElement.setAttribute('data-o-theme', 'e.dark')  // 深色
```

品牌色：**Klein Blue（品牌蓝）**，控件悬浮时使用品牌色浅色调。

---

### Ascend 主题（`a`）

```typescript
// main.ts 引入
import '@opensig/opendesign-token/themes/a.token.css'
```

运行时切换 light/dark：
```javascript
document.documentElement.setAttribute('data-o-theme', 'a.light') // 浅色
document.documentElement.setAttribute('data-o-theme', 'a.dark')  // 深色
```

品牌色：**Ascend 品牌色**，控件悬浮时使用中性灰调。

---

### Kunpeng 主题（`k`）

```typescript
// main.ts 引入
import '@opensig/opendesign-token/themes/k.token.css'
```

运行时切换 light/dark：
```javascript
document.documentElement.setAttribute('data-o-theme', 'k.light') // 浅色
document.documentElement.setAttribute('data-o-theme', 'k.dark')  // 深色
```

品牌色：**Kunpeng 品牌色**，控件悬浮时使用中性灰调。

---

## Token 体系架构

三套主题的 **token 名称完全相同**，只有颜色值（品牌色等）不同。

```
基础 Token（调色板）        →  语义 Token（颜色意义）         →  组件级 Token
--o-kleinblue-6            →  --o-color-primary1             →  --btn-color
--o-green-6                →  --o-color-success1             →  --input-border-color
--o-mixedgray-*            →  --o-color-info1                →  ...
```

**使用原则：**
- **推荐使用语义 token**（`--o-color-*`、`--o-gap-*` 等），它们会随 light/dark 自动适配
- **不要直接使用调色板 token**（`--o-kleinblue-*`、`--o-green-*` 等），这些是内部实现

---

## 1. 语义颜色 Token（推荐使用）

### 主色系（Primary）

| Token | 用途 | light 示例值 | dark 示例值 |
|-------|------|-------------|------------|
| `--o-color-primary1` | 常规主色 | `rgb(0, 47, 167)` | `rgb(72, 116, 220)` |
| `--o-color-primary2` | 悬浮主色 | `rgb(81, 119, 202)` | `rgb(40, 68, 149)` |
| `--o-color-primary3` | 激活主色 | `rgb(0, 39, 147)` | `rgb(0, 39, 147)` |
| `--o-color-primary4` | 禁用主色 | `rgb(132, 161, 220)` | `rgb(27, 48, 113)` |
| `--o-color-primary1-light` | 主色浅色（背景） | `rgb(190, 206, 237)` | — |
| `--o-color-primary2-light` | 主色浅色（悬浮背景） | `rgb(132, 161, 220)` | — |
| `--o-color-primary3-light` | 主色浅色（激活背景） | `rgb(81, 119, 202)` | — |
| `--o-color-primary4-light` | 主色浅色（禁用背景） | `rgb(227, 234, 246)` | — |

> 注：以上颜色值为 openEuler 主题的 light 模式示例，其他主题的品牌色会有所不同。

### 成功色（Success）

| Token | 用途 |
|-------|------|
| `--o-color-success1` | 常规成功色（`rgb(11, 177, 81)` light） |
| `--o-color-success2` | 悬浮成功色 |
| `--o-color-success3` | 激活成功色 |
| `--o-color-success4` | 禁用成功色 |
| `--o-color-success1-light` | 成功色浅色（背景） |
| `--o-color-success2-light` | 成功色悬浮浅色 |
| `--o-color-success3-light` | 成功色激活浅色 |
| `--o-color-success4-light` | 成功色禁用浅色 |

### 告警色（Warning）

| Token | 用途 |
|-------|------|
| `--o-color-warning1` | 常规告警色（`rgb(250, 115, 5)` light） |
| `--o-color-warning2` | 悬浮告警色 |
| `--o-color-warning3` | 激活告警色 |
| `--o-color-warning4` | 禁用告警色 |
| `--o-color-warning1-light` | 告警色浅色（背景） |
| `--o-color-warning2-light` ~ `--o-color-warning4-light` | 其他状态浅色 |

### 危险色（Danger）

| Token | 用途 |
|-------|------|
| `--o-color-danger1` | 常规危险色（`rgb(230, 0, 18)` light） |
| `--o-color-danger2` | 悬浮危险色 |
| `--o-color-danger3` | 激活危险色 |
| `--o-color-danger4` | 禁用危险色 |
| `--o-color-danger1-light` | 危险色浅色（背景） |
| `--o-color-danger2-light` ~ `--o-color-danger4-light` | 其他状态浅色 |

### 信息色 / 文字颜色（Info）

| Token | 用途 | 说明 |
|-------|------|------|
| `--o-color-info1` | 一级文字 | 标题、强调文本（不透明） |
| `--o-color-info2` | 二级文字 | 正文（80% 不透明度） |
| `--o-color-info3` | 三级文字 | 辅助信息（60% 不透明度） |
| `--o-color-info4` | 四级文字 | 禁用/占位文本（40% 不透明度） |
| `--o-color-info1-inverse` | 反色一级文字 | 深色背景上的白色文字 |
| `--o-color-info2-inverse` | 反色二级文字 | 深色背景上的次要白色文字 |
| `--o-color-info3-inverse` | 反色三级文字 | — |
| `--o-color-info4-inverse` | 反色四级文字 | — |

### 填充色 / 背景色（Fill）

| Token | 用途 | 说明 |
|-------|------|------|
| `--o-color-fill1` | 一级填充 | 页面背景 |
| `--o-color-fill2` | 二级填充 | 区块/卡片背景（**最常用**） |
| `--o-color-fill3` | 三级填充 | 嵌套卡片背景 |

**背景色选择规则：**
```css
/* 页面背景 */
background-color: var(--o-color-fill1);

/* 卡片/区块背景（最常用） */
background-color: var(--o-color-fill2);

/* 嵌套卡片背景 */
background-color: var(--o-color-fill3);

/* 纯白色（极少使用，特殊场景） */
background-color: var(--o-color-white);
```

### 控件色（Control）

| Token | 用途 |
|-------|------|
| `--o-color-control1` | 常规边框色（25% 透明度） |
| `--o-color-control2` | 悬浮边框色（60% 透明度） |
| `--o-color-control3` | 激活边框色（80% 透明度） |
| `--o-color-control4` | 禁用边框色（10% 透明度） |
| `--o-color-control1-light` | 常规控件背景 |
| `--o-color-control2-light` | 悬浮控件背景 |
| `--o-color-control3-light` | 激活控件背景 |
| `--o-color-control4-light` | 禁用控件背景 |
| `--o-color-control-light` | 很浅控件色（常用于表格背景） |

### 链接色（Link）

| Token | 用途 |
|-------|------|
| `--o-color-link1` | 常规链接色 |
| `--o-color-link2` | 悬浮链接色 |
| `--o-color-link3` | 激活链接色 |
| `--o-color-link4` | 禁用链接色 |

### 遮罩色（Mask）

| Token | 用途 |
|-------|------|
| `--o-color-mask1` | 全局遮罩（40% 透明） |
| `--o-color-mask2` | 局部遮罩（20% 透明） |

### 基础色（Base）

| Token | 用途 |
|-------|------|
| `--o-color-white` | 纯白色 `rgb(255, 255, 255)`（极少直接使用） |
| `--o-color-black` | 纯黑色 `rgb(0, 0, 0)`（极少直接使用） |

---

## 2. 间距 Token（Gap）

间距 token 适用于 `gap`、`padding`、`margin` 等属性。

| Token | 值 | 用途 |
|-------|----|------|
| `--o-gap-1` | `4px` | 最小间距（紧凑元素内部） |
| `--o-gap-2` | `8px` | 小间距（组件内部元素） |
| `--o-gap-3` | `12px` | 中小间距（相关元素之间） |
| `--o-gap-4` | `16px` | **常规间距（默认，最常用）** |
| `--o-gap-5` | `24px` | 中等间距（区块之间） |
| `--o-gap-6` | `32px` | 大间距（页面级布局） |
| `--o-gap-7` | `40px` | 较大间距 |
| `--o-gap-8` | `48px` | 很大间距 |
| `--o-gap-9` | `64px` | 超大间距 |
| `--o-gap-10` | `72px` | 最大间距 |

---

## 3. 圆角 Token（Radius）

### 内容圆角（用于卡片、容器等）

| Token | 值 | 用途 |
|-------|----|------|
| `--o-radius-xs` | `4px` | 超小圆角 |
| `--o-radius-s` | `8px` | 小圆角 |
| `--o-radius-m` | `12px` | 中等圆角 |
| `--o-radius-l` | `16px` | 大圆角 |
| `--o-radius-xl` | `24px` | 超大圆角（一般用于卡片） |

### 控件圆角（用于按钮、输入框等组件）

| Token | 值 | 用途 |
|-------|----|------|
| `--o-radius_control-xs` | `4px` | 超小控件圆角 |
| `--o-radius_control-s` | `8px` | 小控件圆角 |
| `--o-radius_control-m` | `12px` | 中等控件圆角 |
| `--o-radius_control-l` | `16px` | 大控件圆角 |

---

## 4. 字体 Token（Font）

### 字体大小（Font Size）

| Token | 值 | 用途 |
|-------|----|------|
| `--o-font_size-display1` | `56px` | 一级数据展示 |
| `--o-font_size-display2` | `48px` | 二级数据展示 |
| `--o-font_size-display3` | `40px` | 三级数据展示 |
| `--o-font_size-h1` | `32px` | 一级标题 |
| `--o-font_size-h2` | `24px` | 二级标题 |
| `--o-font_size-h3` | `22px` | 三级标题 |
| `--o-font_size-h4` | `20px` | 四级标题 |
| `--o-font_size-text2` | `18px` | 大号正文 |
| `--o-font_size-text1` | `16px` | **常规正文（最常用）** |
| `--o-font_size-tip1` | `14px` | 提示文本（小字） |
| `--o-font_size-tip2` | `12px` | 辅助提示文本（最小） |

### 行高（Line Height）

| Token | 值 | 配套字号 |
|-------|----|---------|
| `--o-line_height-display1` | `80px` | display1 |
| `--o-line_height-display2` | `64px` | display2 |
| `--o-line_height-display3` | `56px` | display3 |
| `--o-line_height-h1` | `44px` | h1 |
| `--o-line_height-h2` | `32px` | h2 |
| `--o-line_height-h3` | `30px` | h3 |
| `--o-line_height-h4` | `28px` | h4 |
| `--o-line_height-text2` | `26px` | text2 |
| `--o-line_height-text1` | `24px` | text1 |
| `--o-line_height-tip1` | `22px` | tip1 |
| `--o-line_height-tip2` | `18px` | tip2 |

**字体和行高应配套使用：**
```css
.title {
  font-size: var(--o-font_size-h3);
  line-height: var(--o-line_height-h3);
}
```

---

## 5. 阴影 Token（Shadow）

| Token | 值 | 用途 |
|-------|----|------|
| `--o-shadow-1` | `0 3px 8px rgba(..., 0.08)` | 卡片、小弹窗、楼层阴影 |
| `--o-shadow-2` | `0 2px 24px rgba(..., 0.15)` | 卡片悬浮阴影 |
| `--o-shadow-3` | `0 8px 40px rgba(..., 0.1)` | 大弹窗、抽屉阴影 |

---

## 6. 动画 Token（Animation）

### 持续时间（Duration）

| Token | 值 | 用途 |
|-------|----|------|
| `--o-duration-s` | `200ms` | 退出屏幕的动画 |
| `--o-duration-m1` | `250ms` | standard-in 曲线进入动画 |
| `--o-duration-m2` | `300ms` | standard 曲线开始/结束动画 |
| `--o-duration-m3` | `400ms` | emphasized-in 曲线进入动画 |
| `--o-duration-l` | `500ms` | emphasized 曲线开始/结束动画 |
| `--o-duration-xl` | `1000ms` | 轮播切换动画 |

### 缓动曲线（Easing）

| Token | 值 | 用途 |
|-------|----|------|
| `--o-easing-linear` | `cubic-bezier(0, 0, 1, 1)` | 线性 |
| `--o-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | 标准（组件动画，**推荐**） |
| `--o-easing-standard-in` | `cubic-bezier(0, 0, 0, 1)` | 标准进入 |
| `--o-easing-standard-out` | `cubic-bezier(0.3, 0, 1, 1)` | 标准退出 |
| `--o-easing-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` | 强调（大卡片/场景切换） |
| `--o-easing-emphasized-in` | `cubic-bezier(0.3, 0, 0.8, 0.15)` | 强调进入 |
| `--o-easing-emphasized-out` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | 强调退出 |

```css
/* 推荐的动画写法 */
transition: all var(--o-duration-m1) var(--o-easing-standard);
```

---

## 7. 组件尺寸 Token（Control Size）

| Token | 值 | 用途 |
|-------|----|------|
| `--o-control_size-2xs` | `14px` | 超超小控件 |
| `--o-control_size-xs` | `16px` | 超小控件 |
| `--o-control_size-s` | `24px` | 小控件 |
| `--o-control_size-m` | `32px` | 中等控件 |
| `--o-control_size-l` | `40px` | 大控件 |
| `--o-control_size-xl` | `48px` | 超大控件 |
| `--o-control_size-2xl` | `56px` | 超超大控件 |

---

## 8. 图标尺寸 Token（Icon Size）

### 独立图标

| Token | 值 |
|-------|----|
| `--o-icon_size-xs` | `16px` |
| `--o-icon_size-s` | `20px` |
| `--o-icon_size-m` | `24px` |
| `--o-icon_size-l` | `32px` |
| `--o-icon_size-xl` | `40px` |
| `--o-icon_size-2xl` | `48px` |
| `--o-icon_size-3xl` | `56px` |
| `--o-icon_size-4xl` | `64px` |

### 控件内图标（组件使用）

| Token | 值 |
|-------|----|
| `--o-icon_size_control-xs` | `16px` |
| `--o-icon_size_control-s` | `20px` |
| `--o-icon_size_control-m` | `24px` |
| `--o-icon_size_control-l` | `32px` |
| `--o-icon_size_control-xl` | `40px` |

---

## 9. 调色板 Token（参考，不推荐直接使用）

调色板 token 是原始颜色值，为语义 token 提供基础，**不应在业务代码中直接使用**。

每个色系均有 10 个色阶（1=最浅，10=最深），light/dark 模式下颜色相反。

| 色系 | Token 前缀 | 主色代表 | 用途 |
|------|-----------|---------|------|
| 品牌蓝 | `--o-kleinblue-*` | `#002FA7` | 主色/链接色 |
| 绿色 | `--o-green-*` | `#0BB151` | 成功色 |
| 橘红色 | `--o-orange-*` | `#FA7305` | 告警色 |
| 红色 | `--o-red-*` | `#E60012` | 危险色 |
| 黄色 | `--o-yellow-*` | `#F0BC06` | 辅助色 |
| 琥珀色 | `--o-amber-*` | `#E78900` | 辅助色 |
| 黄绿色 | `--o-lime-*` | `#A7C900` | 辅助色 |
| 浅绿色 | `--o-light-green-*` | `#70B31B` | 辅助色 |
| 蓝绿色 | `--o-teal-*` | `#00B385` | 辅助色 |
| 青色 | `--o-cyan-*` | `#00A7B3` | 辅助色 |
| 浅蓝色 | `--o-light-blue-*` | `#009CE5` | 辅助色 |
| 蓝色 | `--o-blue-*` | `#1075E8` | 辅助色 |
| 紫罗兰 | `--o-violet-*` | `#5E12CB` | 辅助色 |
| 紫色 | `--o-purple-*` | `#8702B3` | 辅助色 |
| 粉红色 | `--o-pink-*` | `#E00070` | 辅助色 |
| 白色 | `--o-white` | `#FFFFFF` | 基础 |
| 黑色 | `--o-black` | `#000000` | 基础 |

---

## 最佳实践

### ✅ 推荐做法

```css
.card {
  background-color: var(--o-color-fill2);        /* 卡片背景 */
  border: 1px solid var(--o-color-control1);     /* 边框 */
  border-radius: var(--o-radius-m);              /* 圆角 */
  padding: var(--o-gap-4);                       /* 内边距 */
  box-shadow: var(--o-shadow-1);                 /* 阴影 */
}

.title {
  font-size: var(--o-font_size-h3);
  line-height: var(--o-line_height-h3);
  color: var(--o-color-info1);                   /* 标题文字 */
}

.body-text {
  font-size: var(--o-font_size-text1);
  line-height: var(--o-line_height-text1);
  color: var(--o-color-info2);                   /* 正文 */
}

.caption {
  font-size: var(--o-font_size-tip1);
  color: var(--o-color-info3);                   /* 辅助信息 */
}

.button:hover {
  transition: all var(--o-duration-m1) var(--o-easing-standard);
  box-shadow: var(--o-shadow-2);
}

.link {
  color: var(--o-color-link1);
}
.link:hover {
  color: var(--o-color-link2);
}
```

### ❌ 不推荐做法

```css
/* 不要使用调色板 token */
.card {
  background-color: rgb(var(--o-white));        /* ❌ 应使用 var(--o-color-fill2) */
  border: 1px solid rgb(var(--o-grey-5));       /* ❌ 应使用 var(--o-color-control1) */
}

/* 不要硬编码值 */
.card {
  padding: 16px;                                /* ❌ 应使用 var(--o-gap-4) */
  border-radius: 12px;                          /* ❌ 应使用 var(--o-radius-m) */
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);  /* ❌ 应使用 var(--o-shadow-1) */
}
```

---

## 使用场景速查

### 背景色

| 场景 | Token |
|------|-------|
| 页面背景 | `--o-color-fill1` |
| 卡片/区块背景 | `--o-color-fill2`（**最常用**） |
| 嵌套卡片 | `--o-color-fill3` |
| 纯白（特殊） | `--o-color-white` |

### 文字颜色

| 场景 | Token |
|------|-------|
| 标题/强调 | `--o-color-info1` |
| 正文 | `--o-color-info2` |
| 辅助信息 | `--o-color-info3` |
| 禁用/占位 | `--o-color-info4` |
| 深色背景白字 | `--o-color-info1-inverse` |

### 边框颜色

| 场景 | Token |
|------|-------|
| 默认边框 | `--o-color-control1` |
| 悬浮边框 | `--o-color-control2` |
| 激活/聚焦边框 | `--o-color-primary1` 或 `--o-color-control3` |
| 禁用边框 | `--o-color-control4` |

### 间距

| 场景 | Token | 值 |
|------|-------|----|
| 图标与文字间距 | `--o-gap-1` | 4px |
| 组件内部元素 | `--o-gap-2` | 8px |
| 相关元素间 | `--o-gap-3` | 12px |
| 默认内边距 | `--o-gap-4` | 16px |
| 区块间距 | `--o-gap-5` | 24px |
| 页面布局 | `--o-gap-6` | 32px |

---

## 色值反查（设计稿写死色值 → Token）

设计稿中可能存在写死色值（如 `#002FA7`、`rgba(0,0,0,0.25)`）的情况，需要反向匹配为对应 CSS 变量。

### 操作流程

```
1. 确认截取色值时的模式（light / dark）
2. 确认项目使用的主题（e / a / k）
3. 在下方通用表或对应主题 reference 中查找色值
4. 将写死的值替换为 var(--o-xxx)
```

> 注意：同一 token 在 light 和 dark 模式下对应不同色值，确保对应正确的模式。

---

### 通用色值反查（三套主题相同）

以下 token 的色值在三套主题中**完全相同**，可直接反查。

#### 功能色（Light 模式）

| Hex | RGB | Token | 语义 |
|-----|-----|-------|------|
| `#0BB151` | `rgb(11, 177, 81)` | `--o-color-success1` | 成功色 |
| `#54D07F` | `rgb(84, 208, 127)` | `--o-color-success2` | 成功悬浮 |
| `#07984A` | `rgb(7, 152, 72)` | `--o-color-success3` | 成功激活 |
| `#80E09E` | `rgb(128, 224, 158)` | `--o-color-success4` | 成功禁用 |
| `#B1EFC3` | `rgb(177, 239, 195)` | `--o-color-success1-light` | 成功浅色背景 |
| `#FA7305` | `rgb(250, 115, 5)` | `--o-color-warning1` | 告警色 |
| `#FCB05F` | `rgb(252, 176, 95)` | `--o-color-warning2` | 告警悬浮 |
| `#CF5803` | `rgb(207, 88, 3)` | `--o-color-warning3` | 告警激活 |
| `#FDCA8C` | `rgb(253, 202, 140)` | `--o-color-warning4` | 告警禁用 |
| `#FEE2BA` | `rgb(254, 226, 186)` | `--o-color-warning1-light` | 告警浅色背景 |
| `#E60012` | `rgb(230, 0, 18)` | `--o-color-danger1` | 危险色 |
| `#F0575A` | `rgb(240, 87, 90)` | `--o-color-danger2` | 危险悬浮 |
| `#C00016` | `rgb(192, 0, 22)` | `--o-color-danger3` | 危险激活 |
| `#F58886` | `rgb(245, 136, 134)` | `--o-color-danger4` | 危险禁用 |
| `#FAB9B6` | `rgb(250, 185, 182)` | `--o-color-danger1-light` | 危险浅色背景 |

#### 文字色（透明度写法，Light 模式）

| 设计稿常见写法 | Token | 语义 |
|--------------|-------|------|
| `rgba(0,0,0,1)` 或 `#000000` | `--o-color-info1` | 一级文字/标题 |
| `rgba(0,0,0,0.8)` 或 `#000000 80%` | `--o-color-info2` | 二级文字/正文 |
| `rgba(0,0,0,0.6)` 或 `#000000 60%` | `--o-color-info3` | 三级文字/辅助 |
| `rgba(0,0,0,0.4)` 或 `#000000 40%` | `--o-color-info4` | 四级文字/禁用 |
| `rgba(255,255,255,1)` | `--o-color-info1-inverse` | 深色背景白字 |
| `rgba(255,255,255,0.8)` | `--o-color-info2-inverse` | 深色背景次要白字 |

#### 遮罩和边框（Light 模式）

| 设计稿常见写法 | Token | 语义 |
|--------------|-------|------|
| `rgba(0,0,0,0.4)` | `--o-color-mask1` | 全局遮罩 |
| `rgba(255,255,255,0.2)` | `--o-color-mask2` | 局部遮罩 |
| `rgba(0,0,0,0.25)` | `--o-color-control1` | 默认边框 |
| `rgba(0,0,0,0.1)` | `--o-color-control4` | 禁用边框 |

#### 间距（三套主题完全相同）

| 值 | Token |
|----|-------|
| `4px` | `--o-gap-1` |
| `8px` | `--o-gap-2` |
| `12px` | `--o-gap-3` |
| `16px` | `--o-gap-4` |
| `24px` | `--o-gap-5` |
| `32px` | `--o-gap-6` |
| `40px` | `--o-gap-7` |
| `48px` | `--o-gap-8` |
| `64px` | `--o-gap-9` |
| `72px` | `--o-gap-10` |

---

### 主题特有色值反查

品牌色、Primary 色、Fill 色、圆角等因主题而异，请查阅对应 reference 文件：

- **openEuler (e)**：`references/tokens-openeuler.md` → 末尾「反查速查表」
- **Ascend (a)**：`references/tokens-ascend.md` → 末尾「反查速查表」
- **Kunpeng (k)**：`references/tokens-kunpeng.md` → 末尾「反查速查表」
