import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test 悬浮按钮 FloatButton 楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"悬浮按钮"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: '悬浮按钮' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 4013:86', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '4013:86' }).first()).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="float-button-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="float-button-row-dark"]')).toBeVisible()
  })

  test('亮色按钮组存在', async ({ page }) => {
    await expect(page.locator('[data-testid="float-btn-group-light"]')).toBeVisible()
  })

  test('暗色按钮组存在', async ({ page }) => {
    await expect(page.locator('[data-testid="float-btn-group-dark"]')).toBeVisible()
  })

  test('亮色按钮组内有 3 个图标按钮', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    await expect(group.locator('.o-btn')).toHaveCount(3)
  })

  test('暗色按钮组内有 3 个图标按钮', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-dark"]')
    await expect(group.locator('.o-btn')).toHaveCount(3)
  })

  test('亮色按钮组内有 2 条分隔线', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    await expect(group.locator('.float-btn-divider')).toHaveCount(2)
  })

  test('暗色按钮组内有 2 条分隔线', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-dark"]')
    await expect(group.locator('.float-btn-divider')).toHaveCount(2)
  })

  // ---- 维度2：默认状态正确性 ----

  test('按钮使用 text variant（无背景填充）', async ({ page }) => {
    const btn = page.locator('[data-testid="float-btn-item-0-light"]')
    await expect(btn).toBeVisible()
    // text variant: o-btn-text class
    await expect(btn).toHaveClass(/o-btn-text/)
  })

  test('按钮含图标 SVG', async ({ page }) => {
    const btn = page.locator('[data-testid="float-btn-item-0-light"]')
    await expect(btn.locator('svg').first()).toBeVisible()
  })

  // ---- 维度3：布局与间距 ----

  test('亮色按钮组为竖向 flex 布局', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const direction = await group.evaluate(el => getComputedStyle(el).flexDirection)
    expect(direction).toBe('column')
  })

  test('亮色按钮组宽度为 56px（DSL 溯源：width=56）', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const width = await group.evaluate(el => el.getBoundingClientRect().width)
    // 允许 ±2px 误差
    expect(width).toBeGreaterThanOrEqual(54)
    expect(width).toBeLessThanOrEqual(58)
  })

  test('按钮组 gap 为 16px（DSL 溯源：autoLayoutItemSpacing=16）', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const gap = await group.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBe(16)
  })

  test('按钮组 padding 为 16px（DSL 溯源：autoLayoutPadding=16）', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const paddingTop = await group.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(paddingTop).toBe(16)
  })

  // ---- 维度4：视觉样式 ----

  test('亮色按钮组有圆角 pill 形（border-radius ≥ 100px，DSL 溯源：cornerRadius=100）', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const radius = await group.evaluate(el => parseFloat(getComputedStyle(el).borderTopLeftRadius))
    expect(radius).toBeGreaterThanOrEqual(100)
  })

  test('亮色按钮组背景为白色（fill2 token）', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const bg = await group.evaluate(el => getComputedStyle(el).backgroundColor)
    // --o-color-fill2 = rgb(255,255,255) in light theme
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  test('亮色按钮组有阴影（非 none）', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const shadow = await group.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('分隔线高度为 1px（DSL 溯源：height=1）', async ({ page }) => {
    const divider = page.locator('[data-testid="float-btn-group-light"] .float-btn-divider').first()
    await expect(divider).toBeVisible()
    const height = await divider.evaluate(el => el.getBoundingClientRect().height)
    expect(height).toBe(1)
  })

  test('分隔线宽度为 24px（DSL 溯源：container 56 - 2*padding 16 = 24）', async ({ page }) => {
    const divider = page.locator('[data-testid="float-btn-group-light"] .float-btn-divider').first()
    const width = await divider.evaluate(el => el.getBoundingClientRect().width)
    expect(width).toBe(24)
  })

  test('暗色区块有深色背景（#1f2127 = rgb(31,33,39)）', async ({ page }) => {
    const darkRow = page.locator('[data-testid="float-button-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  // ---- 维度5：交互行为 ----

  test('点击第一个图标按钮不报错（可交互）', async ({ page }) => {
    const btn = page.locator('[data-testid="float-btn-item-0-light"]')
    await expect(btn).toBeVisible()
    // 验证按钮可点击且不抛出异常
    await btn.click()
    // 点击后页面依然正常
    await expect(page.locator('[data-testid="float-btn-group-light"]')).toBeVisible()
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="float-button-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="float-button-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('按钮1（filter）在按钮2（edit）上方', async ({ page }) => {
    const btn0Y = await page.locator('[data-testid="float-btn-item-0-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const btn1Y = await page.locator('[data-testid="float-btn-item-1-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(btn0Y).toBeLessThan(btn1Y)
  })

  test('分隔线1在按钮1和按钮2之间（垂直位置）', async ({ page }) => {
    const btn0Bottom = await page.locator('[data-testid="float-btn-item-0-light"]').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const dividerY = await page.locator('[data-testid="float-btn-group-light"] .float-btn-divider').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    const btn1Y = await page.locator('[data-testid="float-btn-item-1-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(dividerY).toBeGreaterThan(btn0Bottom - 1)
    expect(dividerY).toBeLessThan(btn1Y + 1)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('楼层间 gap 使用 CSS 变量（floor-body gap 非零）', async ({ page }) => {
    const body = page.locator('[data-testid="float-button-row-light"]').locator('..')
    const gap = await body.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('按钮组内图标按钮横向居中（与容器中线对齐）', async ({ page }) => {
    const group = page.locator('[data-testid="float-btn-group-light"]')
    const alignItems = await group.evaluate(el => getComputedStyle(el).alignItems)
    expect(alignItems).toBe('center')
  })

  test('亮色和暗色按钮组宽度相同', async ({ page }) => {
    const lightWidth = await page.locator('[data-testid="float-btn-group-light"]').evaluate(
      el => el.getBoundingClientRect().width
    )
    const darkWidth = await page.locator('[data-testid="float-btn-group-dark"]').evaluate(
      el => el.getBoundingClientRect().width
    )
    expect(Math.abs(lightWidth - darkWidth)).toBeLessThanOrEqual(1)
  })
})
