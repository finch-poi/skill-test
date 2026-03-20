# Pixso + TDD + Skill 优化工作流

本文件描述从设计稿到可测试页面的标准流程，LLM 在收到"还原设计图"类任务时应自动遵循此流程。

---

## 触发条件

用户提供 Pixso 页面链接或 item-id（如 `item-id=2:30326`），要求还原页面。

---

## 完整流程

```
Pixso 设计稿
    ↓ (mcp__pixso__get_image + mcp__pixso__get_node_dsl)
分析视觉结构 + 提取组件列表
    ↓
读取对应组件 Skill 文件（../opendesign-skills/skills/...）
    ↓
生成 Playwright 测试用例（Red ❌）
    ↓
实现页面代码
    ↓
运行测试 → 分析失败原因
    ↓
┌─────────────────────────────────────────────┐
│  Level 0：Skill 索引找不到组件               │
│  → 优化 Skill 索引的视觉描述/别名            │
│                                             │
│  Level 1：Skill 内容不准确                  │
│  → 修正对应 Skill 文件                       │
│                                             │
│  Level 2：实现代码问题                       │
│  → 直接修复代码                              │
└─────────────────────────────────────────────┘
    ↓ (优化 Skill 后重新应用)
修复页面 → 测试全部通过（Green ✅）
```

---

## Step 1：读取设计稿

```
// 同时获取图像（视觉分析）和 DSL（结构分析）
mcp__pixso__get_image(itemId)
mcp__pixso__get_node_dsl(itemId)
```

从图像和 DSL 中识别：
- 页面区域划分（Banner / 导航 / 筛选 / 内容 / 分页 / 页脚）
- 每个区域用到的 opendesign 组件
- 布局方式（grid / flex / 堆叠）
- 视觉规格：颜色、字号、行高、间距、圆角、边框、阴影（从 DSL 提取精确数值）

### ⛔ Step 1 必须产出设计值提取表，否则禁止进入 Step 3

**Step 1 不是"阅读理解"，而是需要产出一份结构化的设计值表。** 没有这份表，Step 3 的断言值无从验证，等同于在测试里填假数据。

**设计值提取表格式**（Step 1 完成后必须输出，作为 Step 3/4 的唯一数据来源）：

| 区域 | 元素 | 属性 | DSL 精确值 | 对应 token / 实现方式 |
|------|------|------|-----------|----------------------|
| Banner | 标题 | font-size | `40px`（DSL node: "Title"） | `var(--o-r-font_size-display3)` |
| Banner | 标题 | color | `#FFFFFF` | `#fff` |
| Banner | 容器 | height | `360px`（DSL node: "Banner"） | `.banner-carousel { height: 360px }` |
| Banner | 容器 | background | `linear-gradient(...)` | 直接写值 |
| 筛选面板 | 容器 | border-radius | `4px` | `border-radius: 4px` |
| 卡片网格 | 容器 | columns | `3` | `grid-template-columns: repeat(3, 1fr)` |
| … | … | … | … | … |

> **画板宽度**：从 DSL 根节点的 `width` 字段读取，用于 Step 3 的 `setViewportSize`。

---

## Step 2：Skill 查找与读取

Skill 文件路径：`../opendesign-skills/skills/opendesign-components/references/{name}.md`

可用 Skill 文件列表（按字母序）：
anchor, badge, breadcrumb, button, card, carousel, cascader, checkbox, collapse,
composition-patterns, config-provider, data-table, dialog, divider, dropdown,
figure, form, grid, icon, input-number, input, ip-input, layer, link, loading,
menu, message, pagination, popover, popup, progress, radio, rate, result,
scrollbar, select, skeleton, slider, step, switch, tab, tag, textarea, toast,
toggle, upload, virtual-list

Token Skill：`../opendesign-skills/skills/opendesign-tokens/`

**⚠️ Level 0 缺陷识别**：若根据设计稿无法从上面列表中找到匹配的组件名，说明 Skill 索引缺少视觉描述/别名，需在 `composition-patterns.md` 或对应文件中补充。

---

## Step 3：生成 Playwright 测试（Red 阶段）

### ⛔ 进入 Step 3 的前提条件

**必须确认以下两项均已完成，否则禁止开始写测试：**

- [ ] 已调用 `mcp__pixso__get_image` 和 `mcp__pixso__get_node_dsl`
- [ ] 已产出「设计值提取表」（Step 1 的输出物），表中包含本页面所有需要断言的精确数值

> **若缺少设计值表，测试里填的期望值就是编的，测试通过只能说明代码自洽，不能说明还原了设计。**

### 测试文件组织：按楼层拆分

**楼层**：页面在垂直方向上堆叠的独立内容区域，每个楼层视觉自成一体、语义独立，通常对应锚点导航的一个跳转目标或设计稿中的一个顶层 Frame。

**不使用单文件**，而是按楼层拆分到目录：

```
e2e/
└── {page-name}/
    ├── setup.ts                  ← 共享 gotoPage（viewport + goto + 等待挂载）
    ├── floor-{name-a}.spec.ts    ← 楼层 A 的全部 8 个维度
    ├── floor-{name-b}.spec.ts    ← 楼层 B
    ├── floor-{name-c}.spec.ts    ← 楼层 C
    └── floor-layout.spec.ts      ← 跨楼层位置关系、全局元素（Header/Footer）
```

**原因**：
1. **上下文预算**：单文件 400+ 行，读完测试就没有足够上下文同时读 DSL、Skill 文件和源码。按楼层拆分后每个文件约 60–100 行，按需读取
2. **精准定位**：修某个楼层时只读该楼层的测试文件，不必加载全页测试
3. **与设计对齐**：楼层是设计师、PM、开发的共同语言，文件名即是沟通边界
4. **并行运行**：可单独跑某楼层的测试，失败原因更清晰

**楼层识别规则**（在 Step 1 读取 DSL 时确定）：
- 设计稿中每个**顶层独立 Frame / Section** → 一个楼层
- 锚点导航指向的每个目标 → 一个楼层
- 全局共享区域（顶部导航栏、底部页脚、跨楼层的锚点导航栏）→ 各自独立一个文件，不归属任何楼层

**拆分规则**：
- 每个楼层文件包含该楼层涉及的**所有维度**的断言（结构、样式、交互、位置等）
- **建议文件上限：100 行**，超出则说明该楼层内部还可细分子楼层
- `setup.ts` 导出共享的 `gotoPage`，包含视口设置和 Vue 挂载等待，避免在每个文件里重复写

**`setup.ts` 写法**：
```typescript
// e2e/{page-name}/setup.ts
import type { Page } from '@playwright/test'

/** 视口宽度来自 Step 1 DSL 中的画板宽度 */
export async function gotoPage(page: Page) {
  await page.setViewportSize({ width: /* DSL 画板宽度 */, height: 1080 })
  await page.goto('/{page-route}')
  // 等待 Vue 挂载：等待页面根容器出现
  await page.waitForSelector('.{page-root-class}', { timeout: 10000 })
}
```

**楼层文件写法**：
```typescript
// e2e/{page-name}/floor-{name}.spec.ts
import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('{楼层名称}楼层', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  // 维度1：结构
  test('使用正确的 opendesign 组件', ...)
  // 维度4：视觉（值必须来自 Step 1 设计值表，标注 DSL 溯源）
  test('标题字号为 48px', async ({ page }) => {
    // DSL 溯源：node "标题", fontSize=48（--o-r-font_size-display2 @ widescreen）
    ...
  })
})
```

**运行单个楼层**：
```bash
npx playwright test e2e/{page-name}/floor-{name}.spec.ts --project="Google Chrome" --reporter=line
```

### ⚠️ 前置要求：对齐视口与设计断点

**还原度检测必须在与设计稿同一断点的视口宽度下执行。**

从 Step 1 读取的 DSL 中获取设计稿的画板宽度（如 `width: 1920`），在测试文件的 `beforeEach` 中设置对应视口：

```typescript
// 从 DSL 中提取设计稿宽度，在测试前设置匹配的视口
test.beforeEach(async ({ page }) => {
  // 设计稿画板宽度 1920px → 对应 widescreen 断点（>1680）
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/{page-route}')
})
```

**断点对照表**（与 opendesign 响应式断点一致）：

| 设计稿画板宽度 | 断点区间 | 建议视口设置 |
|--------------|---------|------------|
| ≤ 840px | phone（手机竖屏） | `{ width: 375, height: 812 }` |
| 841–1200px | phonePad（平板/手机横屏） | `{ width: 1024, height: 768 }` |
| 1201–1440px | laptop（笔记本） | `{ width: 1440, height: 900 }` |
| 1441–1680px | laptop（笔记本大屏） | `{ width: 1680, height: 1050 }` |
| > 1680px | widescreen（宽屏/桌面） | `{ width: 1920, height: 1080 }` |

> **目的**：布局列数、字号、间距、圆角等响应式属性在不同断点下取值不同。若不对齐视口，测试断言的期望值与实际渲染值会不匹配，产生误判。

### 必须覆盖的测试维度

测试应覆盖以下全部维度，每个维度至少一个用例：

#### 维度 1：结构与组件正确性
- 页面各区域可见（Banner、导航、筛选区、内容区、分页、页脚）
- 关键文字内容存在（标题、描述、按钮文字）
- 组件数量正确（根据设计稿中的条目数断言）
- 正确使用了 opendesign 组件（通过 `.o-{name}` class 验证）
- **缺席断言**：设计稿中明确不存在的 UI 元素，也应断言其不可见或不出现

**⚠️ 缺席断言规范**（容易被遗漏）

当设计稿中某个区域只展示 A 组件（如 OToggle 标签按钮），但实现时为了借用 B 组件（如 ORadio）的行为逻辑，将 B 作为不可见的"行为容器"时，**必须**同时断言 B 的视觉产物不出现：

```typescript
// ✅ 正向断言：OToggle 标签按钮可见（设计稿有此元素）
test('分类筛选区显示 OToggle 标签按钮', async ({ page }) => {
  await expect(page.locator('.filter-category .o-toggle').first()).toBeVisible()
})

// ✅ 缺席断言：radio 圆圈指示器不可见（设计稿无此元素）
test('分类筛选区无 radio 圆圈指示器（设计稿无此元素）', async ({ page }) => {
  // 若实现时借用了 ORadio 做行为容器，其圆圈指示器 .o-radio-input 不应被用户看见
  const radioInputs = page.locator('.filter-category .o-radio-input')
  const count = await radioInputs.count()
  // 若存在 radio input 元素，每一个都应该不可见（display:none 不符合规范——说明是 CSS hack）
  // 正确做法应使得 DOM 中根本不出现 radio 指示器，而非通过 CSS 隐藏
  for (let i = 0; i < count; i++) {
    await expect(radioInputs.nth(i)).not.toBeVisible()
  }
})
```

**缺席断言的识别时机**：在 Step 1 读取设计稿时，对每个区域不仅记录"用了什么组件"，同时记录"明确没有什么元素"：

| 区域 | 设计稿有 | 设计稿没有 | 对应缺席断言 |
|------|---------|----------|------------|
| 分类筛选 | OToggle 标签按钮 | radio 圆圈 | `.o-radio-input` 不可见 |
| 主内容 | OCard 卡片 | checkbox 选框 | `.o-checkbox-input` 不可见 |
| 操作区 | OButton 按钮 | icon 图标 | `.o-icon` 不存在 |

#### 维度 2：默认状态正确性
- 默认选中项正确（如分类"全部"默认选中、分页第 1 页激活）
- 默认值正确（输入框 placeholder、下拉默认选项）
- 初始渲染无错误状态

#### 维度 3：布局与间距
- 网格列数正确（3列/4列等，用计算样式验证）
- 关键容器宽度在合理范围内
- 内容区最大宽度限制生效

#### 维度 4：视觉样式（字号/颜色/圆角/间距/边框/阴影）

**⛔ 断言值必须来自 Step 1 的设计值提取表，禁止使用推测值或模糊范围断言。**

| 禁止写法 | 原因 | 正确写法 |
|---------|------|---------|
| `toBeGreaterThan(0)` | 任何有样式的元素都能通过，无法检测还原度 | `toBe('8px')`（来自 DSL） |
| `toBeGreaterThan(20)` | 模糊范围，30px 和 21px 都通过 | `toBe('28px')`（来自 DSL） |
| `not.toBe('rgba(0,0,0,0)')` | 只验证"有颜色"，不验证"对的颜色" | `toBe('rgb(0, 47, 167)')`（来自 DSL） |
| `toBe('40px')`（值是猜的） | 测试通过 ≠ 还原正确，值必须可溯源 | `toBe('40px') // DSL: fontSize=40, node "Banner Title"` |

**每个样式断言必须附注 DSL 来源**：

```typescript
// ✅ 正确：值来自 Step 1 设计值表，注释标注 DSL 来源
test('Banner 标题字号为 40px', async ({ page }) => {
  // DSL: node "Banner/Title", fontSize = 40, 设计稿宽度 1920px
  const fontSize = await page.locator('.banner-title').evaluate(
    el => window.getComputedStyle(el).fontSize
  )
  expect(fontSize).toBe('40px')
})

test('Banner 容器高度为 360px', async ({ page }) => {
  // DSL: node "Banner", height = 360
  const height = await page.locator('.banner-carousel').evaluate(
    el => el.getBoundingClientRect().height
  )
  expect(height).toBe(360)
})

test('筛选面板圆角为 8px', async ({ page }) => {
  // DSL: node "FilterPanel", cornerRadius = 8
  const radius = await page.locator('.filter-panel').evaluate(
    el => parseFloat(window.getComputedStyle(el).borderRadius)
  )
  expect(radius).toBe(8)
})

test('卡片标题字色为设计稿指定色', async ({ page }) => {
  // DSL: node "Card/Title", fill = #1D2129（rgb(29, 33, 41)）
  const color = await page.locator('.o-card-title').first().evaluate(
    el => window.getComputedStyle(el).color
  )
  expect(color).toBe('rgb(29, 33, 41)')
})

// ❌ 错误：值是猜测的，无 DSL 溯源，且使用模糊范围
test('Banner 描述文字行高大于 20px', async ({ page }) => {
  const lineHeight = await page.locator('.banner-desc').evaluate(
    el => parseFloat(window.getComputedStyle(el).lineHeight)
  )
  expect(lineHeight).toBeGreaterThan(20)  // ← 无法验证像素级还原
})
```

#### 维度 5：交互行为
- 点击筛选项后选中状态切换
- 点击分页跳转到对应页
- 点击卡片/按钮触发预期跳转或响应
- hover 悬停效果出现（阴影、颜色变化）

```typescript
// 点击筛选项切换选中
test('点击分类筛选项可切换选中状态', async ({ page }) => {
  const secondToggle = page.locator('.filter-category .o-toggle').nth(1)
  await secondToggle.click()
  await expect(secondToggle).toHaveClass(/o-toggle-checked/)
  // 同时"全部"取消选中
  await expect(page.locator('.filter-category .o-toggle').first()).not.toHaveClass(/o-toggle-checked/)
})

// 分页跳转
test('点击第2页跳转', async ({ page }) => {
  await page.locator('.o-pagination-item').filter({ hasText: '2' }).click()
  await expect(page.locator('.o-pagination-item.active')).toContainText('2')
})
```

#### 维度 6：相对位置关系
验证各区域之间的上下/左右顺序与设计稿一致，以及元素在父容器中的对齐方式。

```typescript
// 验证 A 在 B 的上方（通过 getBoundingClientRect 比较 y 坐标）
test('Banner 在锚点导航上方', async ({ page }) => {
  const bannerBottom = await page.locator('.banner').evaluate(
    el => el.getBoundingClientRect().bottom
  )
  const anchorTop = await page.locator('.anchor-nav-wrap').evaluate(
    el => el.getBoundingClientRect().top
  )
  expect(bannerBottom).toBeLessThanOrEqual(anchorTop + 1) // +1 容忍亚像素误差
})

// 验证 A 在 B 的左侧
test('筛选标签在筛选项左侧', async ({ page }) => {
  const labelRight = await page.locator('.filter-label').first().evaluate(
    el => el.getBoundingClientRect().right
  )
  const toggleLeft = await page.locator('.filter-category .o-toggle').first().evaluate(
    el => el.getBoundingClientRect().left
  )
  expect(labelRight).toBeLessThanOrEqual(toggleLeft + 1)
})

// 验证元素水平居中（中心点与父容器中心对齐）
test('分页组件水平居中', async ({ page }) => {
  const wrap = await page.locator('.pagination-wrap').evaluate(el => el.getBoundingClientRect())
  const pager = await page.locator('.o-pagination').evaluate(el => el.getBoundingClientRect())
  const wrapCenter = (wrap.left + wrap.right) / 2
  const pagerCenter = (pager.left + pager.right) / 2
  expect(Math.abs(wrapCenter - pagerCenter)).toBeLessThan(2)
})

// 验证元素右对齐
test('操作按钮右对齐', async ({ page }) => {
  const containerRight = await page.locator('.action-area').evaluate(
    el => el.getBoundingClientRect().right
  )
  const btnRight = await page.locator('.action-area .o-button').last().evaluate(
    el => el.getBoundingClientRect().right
  )
  expect(Math.abs(containerRight - btnRight)).toBeLessThan(2)
})
```

> **判断规则**：位置误差容忍 ≤ 2px（亚像素渲染）。若误差较大（>4px）则视为布局问题。

#### 维度 7：非组件内部间距使用响应式变量
页面自定义间距（组件外部的 gap、margin、padding）必须使用 CSS 变量而非硬编码 px，以保证多断点响应式正确。

```typescript
// 检查元素的 CSS 变量使用情况（通过读取 computedStyle 的变量值）
test('卡片网格间距使用 CSS 变量', async ({ page }) => {
  const usesVar = await page.locator('.card-grid').evaluate(el => {
    // 如果使用了 var(--o-gap-N)，style 属性或 cssText 中会有 var 引用
    // 或者通过检查计算后的 gap 值是否与 token 值一致
    const computed = window.getComputedStyle(el)
    const gap = computed.gap || computed.columnGap
    // gap 应为非零值（说明有间距）且来自 token 体系
    return parseFloat(gap) > 0
  })
  expect(usesVar).toBe(true)
})

// 检查源码是否硬编码间距（配合代码 review，非 Playwright 测试）
// 规则：在 .vue 的 <style> 中，凡是 margin/padding/gap 属性
// 若值为固定 px（非 var(--o-...)），视为潜在问题
```

> **Source 级检查**：Playwright 只能验证计算后的结果值，无法直接判断源码用了变量还是硬编码。因此还需配合代码审查：
>
> ```bash
> # 扫描 src/ 中直接写死间距的行（排除合理的 0/1px 边框）
> grep -rn "margin:\|padding:\|gap:" src/views/ src/components/ \
>   | grep -v "var(--o-" \
>   | grep -vE "0|1px|border"
> ```
>
> 发现硬编码间距后，对照 Token Skill 替换为对应的 `var(--o-gap-N)` 或 `var(--o-font_size-*)` 等变量。

#### 维度 8：块的对齐
验证同级块（卡片、列表项、筛选项等）之间是否正确对齐——顶部对齐、底部对齐、垂直居中、基线对齐等。

**核心思路**：取同组元素的 `getBoundingClientRect()`，比较各自的 top / bottom / center Y 坐标是否一致。

```typescript
// 同行卡片顶部对齐（grid 布局）
test('同行卡片顶部对齐', async ({ page }) => {
  await expect(page.locator('.o-card').first()).toBeVisible()
  const tops = await page.locator('.o-card').evaluateAll(cards =>
    cards.slice(0, 3).map(c => c.getBoundingClientRect().top)
  )
  // 同一行的 3 张卡片 top 值应相同（允许 1px 误差）
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1)
})

// 筛选标签与筛选项垂直居中对齐
test('筛选标签与筛选项垂直居中对齐', async ({ page }) => {
  const labelRect = await page.locator('.filter-label').first().evaluate(
    el => el.getBoundingClientRect()
  )
  const toggleRect = await page.locator('.filter-category .o-toggle').first().evaluate(
    el => el.getBoundingClientRect()
  )
  const labelCenterY = (labelRect.top + labelRect.bottom) / 2
  const toggleCenterY = (toggleRect.top + toggleRect.bottom) / 2
  expect(Math.abs(labelCenterY - toggleCenterY)).toBeLessThan(4)
})

// 水平排列的元素底部对齐（如图标与文字）
test('图标与文字底部基线对齐', async ({ page }) => {
  const iconBottom = await page.locator('.card-icon').first().evaluate(
    el => el.getBoundingClientRect().bottom
  )
  const textBottom = await page.locator('.card-title').first().evaluate(
    el => el.getBoundingClientRect().bottom
  )
  expect(Math.abs(iconBottom - textBottom)).toBeLessThan(3)
})

// 多列布局中各列宽度相等（等分对齐）
test('卡片网格各列宽度相等', async ({ page }) => {
  await expect(page.locator('.o-card').first()).toBeVisible()
  const widths = await page.locator('.o-card').evaluateAll(cards =>
    cards.slice(0, 3).map(c => Math.round(c.getBoundingClientRect().width))
  )
  // 三列宽度应完全相等
  expect(new Set(widths).size).toBe(1)
})

// 验证 flex/grid 容器的 align-items 属性
test('筛选行使用 center 对齐', async ({ page }) => {
  const alignItems = await page.locator('.filter-secondary').evaluate(
    el => window.getComputedStyle(el).alignItems
  )
  expect(alignItems).toBe('center')
})
```

> **判断规则**：
> - 同级平铺元素（卡片、列表项）：top 差值 ≤ 1px
> - 行内混排元素（图标+文字）：center Y 差值 ≤ 4px
> - 等分布局宽度：允许 1px 的亚像素误差（可用 `Math.round` 后比较）
>
> 与维度 6（相对位置）的区分：维度 6 验证 **顺序**（A 在 B 的上方/左侧），维度 8 验证 **对齐**（A 和 B 的某条边/中线是否对齐）。

---

### ⚠️ Playwright 测试写法规范（来自实践教训）

```typescript
// ❌ 错误：locator.count() 无自动等待，SPA 渲染完成前会返回 0
const count = await page.locator('.o-card').count()
expect(count).toBe(9)

// ✅ 正确：先等待第一个元素可见，再取数量
await expect(page.locator('.o-card').first()).toBeVisible()
const count = await page.locator('.o-card').count()
expect(count).toBe(9)

// ✅ 更简洁：直接用 toHaveCount()（内置等待）
await expect(page.locator('.o-card')).toHaveCount(9)

// ❌ 错误：gridTemplateColumns 返回计算后的像素值，不是 CSS 语法
expect(style).toMatch(/repeat\(3/)  // 会拿到 "384px 384px 384px"

// ✅ 正确：统计值的数量
const colCount = style.trim().split(/\s+/).length
expect(colCount).toBe(3)

// ✅ 样式断言获取计算值的通用写法
const value = await page.locator('.selector').evaluate(
  el => window.getComputedStyle(el).propertyName
)
```

### ⚠️ 绝对定位元素的可见性断言规范

**`toBeVisible()` 不检查元素是否在视口内，也不检查元素是否在其父容器的视觉范围内。**

`toBeVisible()` 只验证：元素在 DOM 中 + 无 display:none/visibility:hidden/opacity:0 + 有非零尺寸。
**它无法检测**：元素被 `position: absolute` + `bottom: Npx` 定位到了父容器的视觉范围之外（如容器高度为 0 时的"指示器跑出容器顶部"问题）。

**识别哪些元素需要位置断言**：

| 元素特征 | 风险 | 必须额外断言 |
|---------|------|------------|
| 组件内部的 `position: absolute` 元素 | 容器高度为 0 时跑出容器外 | ✅ 位置断言 |
| 轮播指示器（`bottom: Npx`） | 容器 0 高度时跑到顶部以上 | ✅ 位置断言 |
| Badge、浮层、气泡提示 | overflow 导致不可见 | ✅ 位置断言 |
| 普通 block/flex 元素 | 不存在此风险 | 可只用 toBeVisible() |

**绝对定位元素的正确断言方式**：

```typescript
// ❌ 错误：只检查 DOM 存在，无法发现"在 DOM 中但跑出容器外"的问题
test('轮播指示器可见', async ({ page }) => {
  await expect(page.locator('.o-carousel-indicator-item')).toHaveCount(3)
})

// ✅ 正确：额外用 boundingBox() 验证指示器在 carousel 容器内部
test('轮播指示器在容器内可见', async ({ page }) => {
  await expect(page.locator('.o-carousel-indicator-item')).toHaveCount(3)
  const carouselBox = await page.locator('.my-carousel').boundingBox()
  const indicatorBox = await page.locator('.o-carousel-indicator-wrap').boundingBox()
  expect(indicatorBox!.y).toBeGreaterThanOrEqual(carouselBox!.y - 1)
  expect(indicatorBox!.y + indicatorBox!.height).toBeLessThanOrEqual(carouselBox!.y + carouselBox!.height + 1)
})

// ✅ 替代方案：用 toBeInViewport() 验证元素在当前视口内
test('轮播指示器在视口内', async ({ page }) => {
  await expect(page.locator('.o-carousel-indicator-wrap')).toBeInViewport()
})
```

**规则总结**：
- 编写测试时，如果被测元素是 `position: absolute/fixed` 实现的，**必须**在 `toBeVisible()` / `toHaveCount()` 之后追加 `boundingBox()` 位置断言或 `toBeInViewport()`
- 在 Step 3 生成测试时，识别到"绝对定位浮层/装饰元素"后，自动套用位置断言模板

---

## Step 4：实现页面

### 文件组织（按楼层拆分）

路由注册：`src/router/index.ts`
视图文件：`src/views/{PageName}View.vue`（主视图，组装各楼层组件）
子组件：`src/components/{page-name}/floor-{name}/`（每个楼层独立目录）

#### 楼层拆分原则

与 Step 3 的测试文件命名一一对应——**测试文件有几个楼层，实现代码就有几个楼层目录**：

```
src/
├── views/
│   └── {PageName}View.vue              ← 主视图（仅做组装，自身不写业务逻辑）
└── components/
    └── {page-name}/
        ├── floor-{name-a}/             ← 对应 floor-{name-a}.spec.ts
        │   └── Floor{NameA}.vue
        ├── floor-{name-b}/             ← 对应 floor-{name-b}.spec.ts
        │   ├── Floor{NameB}.vue
        │   └── {Sub}Item.vue           ← 楼层内的子组件
        └── floor-{name-c}/             ← 对应 floor-{name-c}.spec.ts
            └── Floor{NameC}.vue
```

#### 楼层组件的职责边界

- **主视图 `{PageName}View.vue`**：只负责组装楼层组件，传入必要的 props（如 API 数据），不写 DOM 结构和 CSS
- **楼层组件 `floor-{name}/Floor{Name}.vue`**：负责该楼层完整的 DOM 结构、CSS 样式和内部交互逻辑
- **楼层内子组件**：当楼层内某个重复元素需要抽象时，放在同一楼层目录下，不跨楼层共用

#### 何时可以不拆楼层？

以下情况允许直接在主视图中实现，无需建立楼层目录：
- 整个页面只有 1 个楼层（如简单详情页）
- 楼层内容极简（≤ 10 行模板 + ≤ 20 行 CSS），且无复用场景
- 全局公共组件（`AppHeader`、`AppFooter`）——这些维护在 `src/components/` 根目录，不属于任何页面的楼层

> **楼层命名**：与测试文件保持一致，使用 kebab-case。例如测试文件是 `floor-banner.spec.ts`，对应的楼层组件目录就是 `floor-banner/`，楼层组件文件是 `FloorBanner.vue`（PascalCase）。

**使用 opendesign 组件的导入方式：**
```typescript
import { OButton, OCard, OPagination, ... } from '@opensig/opendesign'
```

**视觉 Token 使用原则**：
- 颜色优先使用 CSS 变量（如 `var(--o-color-primary1)`）而非硬编码
- 间距**始终使用 `var(--o-r-gap-N)`**（响应式），除非明确说明需要固定间距才用 `--o-gap-N`
- 字号**始终使用 `var(--o-r-font_size-{level})`**（响应式），除非明确说明需要固定字号才用 `--o-font_size-*`
- 覆盖组件 CSS 变量时，值同样遵循此规则（优先响应式 token）
- **禁止**直接写设计稿标注的 px 值（如 `8px`、`24px`、`14px`）

> **为什么默认用响应式？** `--o-r-gap-N`、`--o-r-font_size-*` 在不同断点下自动取不同值，天然支持多端适配。`--o-gap-N`（静态）所有断点值固定，只在确实不需要响应式缩放时才使用。

**设计稿 px（桌面端）→ 响应式 token 映射示例**：

| 设计稿间距（桌面） | 对应响应式 token | 不允许写法 |
|-----------------|----------------|----------|
| 8px gap | `var(--o-r-gap-2)` | `gap: 8px` ❌ |
| 12px gap | `var(--o-r-gap-3)` | `gap: 12px` ❌ |
| 16px padding | `var(--o-r-gap-4)` | `padding: 16px` ❌ |
| 24px margin | `var(--o-r-gap-5)` | `margin: 24px` ❌ |
| 32px gap | `var(--o-r-gap-6)` | `gap: 32px` ❌ |
| 40px padding | `var(--o-r-gap-7)` | `padding: 40px` ❌ |

### ⚠️ 组件 CSS 变量优先原则

**当组件默认样式与设计稿不符时，第一步是查对应 Skill 的「可覆盖的 CSS 变量」表，而不是直接写自定义 CSS。**

每个 opendesign 组件都通过 `var.scss` 暴露了一组可在调用处覆盖的 CSS 变量，用于控制间距、字号、圆角、颜色等。在调用处直接设置这些变量，无需 `:deep` hack，也不会产生样式叠加冲突。

**判断流程**：

```
组件默认样式 ≠ 设计稿
    ↓
查该组件 Skill 的「可覆盖的 CSS 变量」表
    ↓
找到对应变量？
    ├── 是 → 在调用处（标签上或父元素上）覆盖该变量
    │         <OXxx style="--xxx-gap: var(--o-gap-2)" />
    │         或 .my-wrapper { --xxx-gap: var(--o-gap-2) }
    └── 否 → 才考虑写自定义 CSS（如 width、flex 布局等）
              仍然禁止用 :deep 修改组件内部样式
```

**典型陷阱**：若组件用 `margin` 实现内部间距（而非 flex `gap`），在父元素上额外设置 `gap` 会造成叠加。必须只覆盖组件变量，不要再加 `gap`：

```css
/* ❌ 错误：两种间距叠加，且用了硬编码 px */
.my-group {
  display: flex;
  gap: 8px;                         /* flex gap，硬编码 */
  /* ORadioGroup 内部还有 --radio-group-gap: 24px（margin 实现）*/
  /* 实际间距 = 24 + 8 = 32px */
}

/* ❌ 错误：只覆盖了组件变量，但值仍是硬编码 px */
.my-group {
  display: flex;
  --radio-group-gap: 8px;           /* 8px 在所有断点下固定，不随断点缩放 */
}

/* ✅ 正确：覆盖组件变量 + 值使用 token */
.my-group {
  display: flex;
  --radio-group-gap: var(--o-gap-2); /* token 变量，随断点响应式缩放 */
  /* 不设置 gap */
}
```

### 重复元素的数据来源与组件抽象判断

实现时若发现页面存在**多个结构相似的元素**（如卡片列表、筛选项组、步骤列表），必须做以下两项判断：

#### 判断 1：数据是否应来自接口？

| 特征 | 判断 | 处理方式 |
|------|------|---------|
| 元素数量 ≥ 3 且内容可变（文章列表、用户列表） | 接口数据 | 写 mock API，用 `v-for` 渲染 |
| 元素数量固定且内容语义固定（导航菜单、步骤条） | 静态配置 | 在 `<script setup>` 中定义常量数组 |
| 元素有翻页/筛选行为 | 接口数据 | mock API 支持分页/筛选参数 |

```typescript
// ✅ 正确：卡片列表数据来自 mock 接口
// src/api/policy.ts
export async function getPolicyList(params: { page: number; pageSize: number; category?: string }) {
  // 真实接口：return request.get('/api/policy/list', { params })
  await new Promise(r => setTimeout(r, 300))
  return {
    total: 120,
    list: Array.from({ length: params.pageSize }, (_, i) => ({
      id: (params.page - 1) * params.pageSize + i + 1,
      cover: `https://picsum.photos/seed/${i}/400/240`,
      title: '标题文本标题文本',
      detail: '内容文本...',
    }))
  }
}
```

#### 判断 2：是否需要抽象为组件？

**不需要抽象**（直接内联）：
- 已使用组件库的原子组件（`OCard`、`OToggle` 等），无需再包一层
- 结构简单（≤ 3 个子元素），逻辑无复用场景

**需要抽象为业务组件**（提取到当前楼层目录 `src/components/{page-name}/floor-{name}/`）：
- 单个卡片内部有复杂自定义结构（多个 slot、特殊交互）
- 单个"项"的模板代码超过 20 行
- 注意：跨楼层复用的组件提取到 `src/components/{page-name}/shared/`；跨页面复用的提取到 `src/components/`

```
// 判断流程：
设计稿中有 N 个相似元素
    ↓
N ≥ 3 且内容可变？
    ├── 是 → 写 mock API + v-for 渲染
    └── 否 → 静态数组 + v-for 渲染
         ↓
单个元素是原子组件（OCard/OButton 等）？
    ├── 是 → 直接使用，不抽象
    └── 否 → 内部结构复杂？
              ├── 是 → 抽象为 src/components/{page}/floor-{name}/{Name}Item.vue
              └── 否 → 内联即可
```

---

## Step 5：差异分析 → Skill 缺陷分级

运行测试失败后，按以下顺序排查：

### Level 0 判断：是否找到了正确组件？
- LLM 在实现时有没有查阅对应 Skill 文件？
- 没有 → 在 Skill 索引 / composition-patterns 中补充视觉别名

### Level 1 判断：Skill 内容是否准确？
常见 Skill 缺陷类型：
| 缺陷类型 | 表现 | 修复位置 |
|---------|------|---------|
| 错误的 prop 名或类型 | 组件不响应 | 对应 `{name}.md` Props 表 |
| 错误的 DOM class 名 | 测试选择器失效 | 对应 `{name}.md` 布局结构图 |
| 缺少 DOM class 文档 | 无法编写精确测试 | 对应 `{name}.md` 补充 class 说明 |
| 布局结构图不准 | 实现与设计稿有视觉差异 | 对应 `{name}.md` 布局结构图 |
| 缺少 Token 映射 | 颜色/字号/间距与设计稿不符 | 对应 `{name}.md` 设计 Token 映射表 |
| 响应式行为缺失 | 移动端布局错误 | 对应 `{name}.md` 响应式行为表 |
| 交互行为描述不准 | hover/click 效果不符 | 对应 `{name}.md` 交互描述 |

### Level 2：修复实现代码
- 直接编辑 `.vue` 文件
- 不需要改 Skill

---

## 已知的 DOM Class 知识库（实践积累）

| 组件 | 关键 class | 用途 |
|------|-----------|------|
| OPagination | `.o-pagination-item.active` | 当前活跃页（源码：`:class="{ active: item.value === pageVal }"`） |
| OCard | `.o-card-cover` | 封面图容器 |
| OCard | `.o-card-header` | 标题区域 |
| OCard | `.o-card-title` | 标题文字 |
| OCard | `.o-card-detail` | 正文内容 |
| OToggle | `.o-toggle-checked` | 选中状态 |
| OAnchor | `.o-anchor-h` | 水平模式根容器 |
| OAnchor | `.o-anchor-item` | 锚点项 |
| OButton | `.o-btn-primary` | primary 颜色按钮 |

---

## Playwright 配置说明

- 测试目录：`e2e/`
- 开发服务器：`http://localhost:5173`
- 浏览器：使用系统 Chrome（`channel: 'chrome'`），无需下载
- 运行测试：`npx playwright test e2e/{file}.spec.ts --project="Google Chrome" --reporter=line`

---

## Skill 文件修改原则

修改 Skill 文件时：
1. **只修正确认错误**的内容，不做风格改动
2. **补充 DOM class 名**（组件源码中 `:class` 的实际值）
3. **验证方式**：查看 `opendesign-components` 中对应组件的 `.vue` 源码
4. 所有修改要**有源码依据**（注明来自哪个文件哪行）
