import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：293:12743（数字徽标）, 293:8706（圆点徽标）

test.describe('FloorBadge 徽标', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ====== 1. 结构与组件正确性 ======
  test('1-1 亮色区块存在并包含 OBadge', async ({ page }) => {
    const light = page.locator('[data-testid="badge-row-light"]')
    await expect(light).toBeVisible()
    // OBadge 根节点 class 为 .o-badge
    const badges = light.locator('.o-badge')
    await expect(badges).toHaveCount(10) // 10 个 OBadge 实例
  })

  test('1-2 暗色区块存在并包含 OBadge', async ({ page }) => {
    const dark = page.locator('[data-testid="badge-row-dark"]')
    await expect(dark).toBeVisible()
    const badges = dark.locator('.o-badge')
    await expect(badges).toHaveCount(10)
  })

  test('1-3 数字徽标独立（Single）存在', async ({ page }) => {
    // 亮色
    await expect(page.locator('[data-testid="badge-number-single-light"]')).toBeVisible()
    // 暗色
    await expect(page.locator('[data-testid="badge-number-single-dark"]')).toBeVisible()
  })

  test('1-4 圆点徽标独立（Single）存在', async ({ page }) => {
    await expect(page.locator('[data-testid="badge-dot-single-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="badge-dot-single-dark"]')).toBeVisible()
  })

  // ====== 2. 默认状态正确性 ======
  test('2-1 数字徽标 Group 亮色：显示数字 21（来自设计稿 293:12743）', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-group-light"]')
    await expect(badge).toBeVisible()
    // 徽标内容区
    const sup = badge.locator('.o-badge-content')
    await expect(sup).toBeVisible()
    await expect(sup).toContainText('21')
  })

  test('2-2 超出最大值：显示 99+', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-overflow-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    await expect(sup).toContainText('99+')
  })

  test('2-3 圆点徽标 dot 模式：badge-content 无文字内容', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-dot-group-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    await expect(sup).toBeVisible()
    // dot 模式不显示文字
    await expect(sup).not.toContainText(/\d/)
  })

  test('2-4 数字徽标 Group 暗色：显示数字 21', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-group-dark"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    await expect(sup).toContainText('21')
  })

  // ====== 3. 布局与间距 ======
  test('3-1 亮色区块的徽标卡片排列为 flex-wrap 行布局', async ({ page }) => {
    const light = page.locator('[data-testid="badge-row-light"]')
    const badgeRow = light.locator('.badge-row')
    await expect(badgeRow).toBeVisible()
    const display = await badgeRow.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('3-2 每个 badge-card 内含 badge-items', async ({ page }) => {
    const cards = page.locator('[data-testid="badge-row-light"] .badge-card')
    await expect(cards).toHaveCount(6)
    // 每个 card 都有 badge-items
    for (let i = 0; i < 6; i++) {
      const items = cards.nth(i).locator('.badge-items')
      await expect(items).toBeVisible()
    }
  })

  // ====== 4. 视觉样式（字号/颜色/圆角）======
  test('4-1 数字徽标背景色为 danger 红色（DSL: rgba(199,0,11,1)）', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-single-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    const bg = await sup.evaluate((el) => getComputedStyle(el).backgroundColor)
    // danger 颜色 rgb(199,0,11)
    expect(bg).toBe('rgb(199, 0, 11)')
  })

  test('4-2 圆点徽标背景色为 danger 红色（DSL: rgba(199,0,11,1)）', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-dot-single-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    const bg = await sup.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(199, 0, 11)')
  })

  test('4-3 dot 模式徽标高度/宽度为 6px（DSL: 6×6px 圆点）', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-dot-single-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    const { width, height } = await sup.evaluate((el) => {
      const style = getComputedStyle(el)
      return { width: style.width, height: style.height }
    })
    expect(width).toBe('6px')
    expect(height).toBe('6px')
  })

  test('4-4 数字徽标高度为 12px（DSL: height 12px）', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-single-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    const height = await sup.evaluate((el) => getComputedStyle(el).height)
    expect(height).toBe('12px')
  })

  test('4-5 数字徽标文字颜色为白色', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-single-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    const color = await sup.evaluate((el) => getComputedStyle(el).color)
    expect(color).toBe('rgb(255, 255, 255)')
  })

  // ====== 5. 暗色主题 ======
  test('5-1 暗色区块有 data-o-theme="e.dark"', async ({ page }) => {
    const dark = page.locator('[data-testid="badge-row-dark"]')
    await expect(dark).toBeVisible()
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('5-2 暗色区块背景色为 #1f2127', async ({ page }) => {
    const dark = page.locator('[data-testid="badge-row-dark"]')
    await expect(dark).toBeVisible()
    const bg = await dark.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)') // #1f2127
  })

  test('5-3 暗色数字徽标显示 21（Group）', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-group-dark"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    await expect(sup).toContainText('21')
  })

  // ====== 6. 相对位置（附加到元素时定位到右上角）======
  test('6-1 Group 模式：徽标 badge-content 定位在宿主元素右上角', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-group-light"]')
    await expect(badge).toBeVisible()
    const sup = badge.locator('.o-badge-content')
    const position = await sup.evaluate((el) => getComputedStyle(el).position)
    expect(position).toBe('absolute')
  })

  test('6-2 Single 模式：独立徽标 badge-content 为 static/relative 定位', async ({ page }) => {
    const badge = page.locator('[data-testid="badge-number-single-light"]')
    await expect(badge).toBeVisible()
    // 独立模式 .o-badge-only class 存在
    const hasOnlyClass = await badge.evaluate((el) => el.classList.contains('o-badge-only'))
    expect(hasOnlyClass).toBe(true)
  })

  // ====== 7. 多颜色变体存在 ======
  test('7-1 亮色：primary/success/warning/danger 四种颜色徽标均存在', async ({ page }) => {
    await expect(page.locator('[data-testid="badge-primary-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="badge-success-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="badge-warning-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="badge-danger-light"]')).toBeVisible()
  })

  test('7-2 暗色：primary/success/warning/danger 四种颜色徽标均存在', async ({ page }) => {
    await expect(page.locator('[data-testid="badge-primary-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="badge-success-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="badge-warning-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="badge-danger-dark"]')).toBeVisible()
  })
})
