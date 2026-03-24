import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test ORate 评分楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"ORate 评分"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'ORate 评分' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 17:4339', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '17:4339' }).first()).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-row-dark"]')).toBeVisible()
  })

  test('亮色 Complete 状态的 ORate 组件存在', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-complete-light"]')
    await expect(rate).toBeVisible()
  })

  test('暗色 Complete 状态的 ORate 组件存在', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-complete-dark"]')
    await expect(rate).toBeVisible()
  })

  test('亮色 Enabled 状态的 ORate 组件存在', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-enabled-light"]')).toBeVisible()
  })

  test('亮色 Pressed（评分中）的 ORate 组件存在', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-pressed-light"]')).toBeVisible()
  })

  test('亮色半星 ORate 组件存在', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-half-light"]')).toBeVisible()
  })

  test('亮色颜色变体 ORate 组件存在（primary / success / warning / danger）', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-color-primary-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="rate-color-success-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="rate-color-warning-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="rate-color-danger-light"]')).toBeVisible()
  })

  test('带 labels 的 ORate 组件存在', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-labels-light"]')).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('Complete 状态 ORate 含 5 颗星图标（medium size）', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-complete-light"]')
    // ORate medium 渲染 5 个 rate-item
    const items = rate.locator('.o-rate-item')
    await expect(items).toHaveCount(5)
  })

  test('Complete 状态 ORate 有选中星星（selected item）', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-complete-light"]')
    // 选中的星星应有 full 状态 class
    const fullItems = rate.locator('.o-rate-item-full')
    await expect(fullItems.first()).toBeVisible()
  })

  test('亮色 Complete 状态行显示分值"4.0"', async ({ page }) => {
    const card = page.locator('[data-testid="rate-row-light"] .rate-card').first()
    await expect(card.locator('.rate-score').first()).toContainText('4.0')
  })

  test('亮色 Enabled 状态行显示"暂无评分"', async ({ page }) => {
    const card = page.locator('[data-testid="rate-row-light"] .rate-card').nth(1)
    await expect(card.locator('.rate-score--empty')).toContainText('暂无评分')
  })

  test('亮色行中有"我要评分"按钮', async ({ page }) => {
    const card = page.locator('[data-testid="rate-row-light"] .rate-card').first()
    await expect(card.locator('.rate-btn').first()).toContainText('我要评分')
  })

  test('半星 ORate 有 allow-half class（o-rate-allow-half）', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-half-light"]')
    await expect(rate).toHaveClass(/o-rate-allow-half/)
  })

  test('颜色变体 ORate 有 primary class', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-color-primary-light"]')
    await expect(rate).toHaveClass(/o-rate-primary/)
  })

  test('颜色变体 ORate 有 success class', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-color-success-light"]')
    await expect(rate).toHaveClass(/o-rate-success/)
  })

  test('颜色变体 ORate 有 warning class', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-color-warning-light"]')
    await expect(rate).toHaveClass(/o-rate-warning/)
  })

  test('颜色变体 ORate 有 danger class', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-color-danger-light"]')
    await expect(rate).toHaveClass(/o-rate-danger/)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色 rate 卡片有阴影（非 none）', async ({ page }) => {
    const card = page.locator('[data-testid="rate-row-light"] .rate-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('亮色区块内有 6 个展示卡片', async ({ page }) => {
    const cards = page.locator('[data-testid="rate-row-light"] .rate-card')
    await expect(cards).toHaveCount(6)
  })

  test('暗色区块内有 6 个展示卡片', async ({ page }) => {
    const cards = page.locator('[data-testid="rate-row-dark"] .rate-card')
    await expect(cards).toHaveCount(6)
  })

  test('rate-grid 为纵向 flex 布局', async ({ page }) => {
    const grid = page.locator('[data-testid="rate-row-light"] .rate-grid')
    const display = await grid.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const direction = await grid.evaluate(el => getComputedStyle(el).flexDirection)
    expect(direction).toBe('column')
  })

  // ---- 维度4：视觉样式（DSL 溯源）----

  test('暗色区块有深色背景（#1f2127 → rgb(31,33,39)）', async ({ page }) => {
    // DSL: Dark=on 组件背景在父容器 #1f2127
    const darkRow = page.locator('[data-testid="rate-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('亮色卡片背景为白色（--o-color-fill2）', async ({ page }) => {
    const card = page.locator('[data-testid="rate-row-light"] .rate-card').first()
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor)
    // fill2 = rgb(255,255,255)
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  test('large size ORate 有 o-rate-large class', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-half-light"]')).toHaveClass(/o-rate-large/)
  })

  test('medium size ORate 有 o-rate-medium class', async ({ page }) => {
    await expect(page.locator('[data-testid="rate-complete-light"]')).toHaveClass(/o-rate-medium/)
  })

  test('分值"4.0"字号非零（来自 text2 mixin）', async ({ page }) => {
    const score = page.locator('[data-testid="rate-row-light"] .rate-score').first()
    const fontSize = await score.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    // text2 mixin 在 1920px 断点 ≈ 14–16px
    expect(fontSize).toBeGreaterThanOrEqual(12)
    expect(fontSize).toBeLessThanOrEqual(18)
  })

  // ---- 维度5：交互行为 ----

  test('点击 Enabled ORate 第三颗星可设置评分', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-enabled-light"]')
    const thirdStar = rate.locator('.o-rate-item').nth(2)
    await thirdStar.click()
    // 点击后应有 3 个 full 星
    const fullItems = rate.locator('.o-rate-item-full')
    await expect(fullItems).toHaveCount(3)
  })

  test('readonly ORate 点击不改变评分', async ({ page }) => {
    const rate = page.locator('[data-testid="rate-complete-light"]')
    // 初始 4 颗满星
    const initialFull = await rate.locator('.o-rate-item-full').count()
    // 点击第 1 颗
    await rate.locator('.o-rate-item').first().click()
    const afterFull = await rate.locator('.o-rate-item-full').count()
    // readonly，不应改变
    expect(afterFull).toBe(initialFull)
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="rate-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="rate-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('Complete 卡片在 Enabled 卡片上方（亮色区块内）', async ({ page }) => {
    const cards = page.locator('[data-testid="rate-row-light"] .rate-card')
    const y0 = await cards.nth(0).evaluate(el => el.getBoundingClientRect().top)
    const y1 = await cards.nth(1).evaluate(el => el.getBoundingClientRect().top)
    expect(y0).toBeLessThan(y1)
  })

  test('分值文字在星星右侧（Complete 卡片）', async ({ page }) => {
    const card = page.locator('[data-testid="rate-row-light"] .rate-card').first()
    const rateX = await card.locator('[data-testid="rate-complete-light"]').evaluate(
      el => el.getBoundingClientRect().right
    )
    const scoreX = await card.locator('.rate-score').first().evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(rateX).toBeLessThanOrEqual(scoreX + 5)
  })

  // ---- 维度7：非组件内部间距使用响应式变量 ----

  test('卡片间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const grid = page.locator('[data-testid="rate-row-light"] .rate-grid')
    const gap = await grid.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('rate-row 内 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="rate-row-light"] .rate-row').first()
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('rate-row 内元素垂直居中对齐', async ({ page }) => {
    const row = page.locator('[data-testid="rate-row-light"] .rate-row').first()
    const align = await row.evaluate(el => getComputedStyle(el).alignItems)
    expect(align).toBe('center')
  })
})
