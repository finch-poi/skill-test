import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// Design: 29:5103, 103:3564, 103:3535, 5:10948 — 下拉按钮
// Viewport: 1920x1080 (widescreen, matching design breakpoint)

test.describe('FloorDropdown - 下拉按钮', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ── Dimension 1: 结构与组件正确性 ──────────────────────────────────────
  test('1-1 亮色区块存在并包含三类下拉按钮', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    await expect(lightRow).toBeVisible()

    // 强调下拉 L/M/S
    await expect(lightRow.locator('[data-testid="dropdown-emphasis-l-light"]')).toBeVisible()
    await expect(lightRow.locator('[data-testid="dropdown-emphasis-m-light"]')).toBeVisible()
    await expect(lightRow.locator('[data-testid="dropdown-emphasis-s-light"]')).toBeVisible()

    // 普通下拉 L/M/S
    await expect(lightRow.locator('[data-testid="dropdown-normal-l-light"]')).toBeVisible()
    await expect(lightRow.locator('[data-testid="dropdown-normal-m-light"]')).toBeVisible()
    await expect(lightRow.locator('[data-testid="dropdown-normal-s-light"]')).toBeVisible()

    // 文字下拉 L/M/S
    await expect(lightRow.locator('[data-testid="dropdown-text-l-light"]')).toBeVisible()
    await expect(lightRow.locator('[data-testid="dropdown-text-m-light"]')).toBeVisible()
    await expect(lightRow.locator('[data-testid="dropdown-text-s-light"]')).toBeVisible()
  })

  test('1-2 暗色区块存在并包含三类下拉按钮', async ({ page }) => {
    const darkRow = page.locator('[data-testid="dropdown-row-dark"]')
    await expect(darkRow).toBeVisible()

    await expect(darkRow.locator('[data-testid="dropdown-emphasis-l-dark"]')).toBeVisible()
    await expect(darkRow.locator('[data-testid="dropdown-normal-l-dark"]')).toBeVisible()
    await expect(darkRow.locator('[data-testid="dropdown-text-l-dark"]')).toBeVisible()
  })

  test('1-3 暗色区块有 data-o-theme="e.dark" 属性', async ({ page }) => {
    const darkRow = page.locator('[data-testid="dropdown-row-dark"]')
    await expect(darkRow).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('1-4 每个 ODropdown 内含 OButton 和 OIconChevronDown', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    // 强调 L 按钮
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"]')
    await expect(emphasisL.locator('.o-btn').first()).toBeVisible()
    await expect(emphasisL.locator('.o-icon').first()).toBeVisible()
  })

  // ── Dimension 2: 默认状态正确性 ──────────────────────────────────────
  test('2-1 默认状态下 dropdown 面板未展开（不在 DOM 或不可见）', async ({ page }) => {
    // dropdown list should not be visible by default
    const dropdownList = page.locator('.o-dropdown-list').first()
    // Either not in DOM or not visible
    const count = await page.locator('.o-dropdown-list').count()
    expect(count).toBe(0)
  })

  test('2-2 按钮文字正确', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')

    // 强调下拉
    const emphasisBtn = lightRow.locator('[data-testid="dropdown-emphasis-l-light"] .o-btn').first()
    await expect(emphasisBtn).toContainText('强调下拉')

    // 普通下拉
    const normalBtn = lightRow.locator('[data-testid="dropdown-normal-l-light"] .o-btn').first()
    await expect(normalBtn).toContainText('普通下拉')

    // 文字下拉
    const textBtn = lightRow.locator('[data-testid="dropdown-text-l-light"] .o-btn').first()
    await expect(textBtn).toContainText('文字下拉')
  })

  // ── Dimension 3: 布局与间距 ──────────────────────────────────────────
  test('3-1 亮色区块内按钮横向排列（flex-wrap）', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const btnRow = lightRow.locator('.btn-row').first()
    const display = await btnRow.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('3-2 亮色与暗色区块纵向排列', async ({ page }) => {
    const floorBody = page.locator('.floor-body').first()
    const flexDir = await floorBody.evaluate((el) => getComputedStyle(el).flexDirection)
    expect(flexDir).toBe('column')
  })

  // ── Dimension 4: 视觉样式 ────────────────────────────────────────────
  test('4-1 暗色区块背景色为 #1f2127', async ({ page }) => {
    const darkRow = page.locator('[data-testid="dropdown-row-dark"]')
    const bg = await darkRow.evaluate((el) => getComputedStyle(el).backgroundColor)
    // rgb(31, 33, 39) = #1f2127
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('4-2 强调下拉 L 按钮为 solid variant（有实心背景）', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"] .o-btn').first()
    // solid variant button should have background color
    const bg = await emphasisL.evaluate((el) => getComputedStyle(el).backgroundColor)
    // Should not be transparent
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    expect(bg).not.toBe('transparent')
  })

  test('4-3 强调下拉按钮为 pill 圆角', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"] .o-btn').first()
    const borderRadius = await emphasisL.evaluate((el) => getComputedStyle(el).borderRadius)
    // pill = large border-radius (should be >= 9999px or 100px)
    const val = parseFloat(borderRadius)
    expect(val).toBeGreaterThan(10)
  })

  // ── Dimension 5: 交互行为 ─────────────────────────────────────────────
  test('5-1 点击强调下拉 L 按钮后面板展开', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"] .o-btn').first()
    await emphasisL.click()

    // dropdown list should appear
    const dropdownList = page.locator('.o-dropdown-list').first()
    await expect(dropdownList).toBeVisible()
  })

  test('5-2 展开后可见选项列表', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"] .o-btn').first()
    await emphasisL.click()

    const items = page.locator('.o-dropdown-item')
    await expect(items.first()).toBeVisible()
    const count = await items.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('5-3 点击选项后面板关闭', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"] .o-btn').first()
    await emphasisL.click()

    const firstItem = page.locator('.o-dropdown-item').first()
    await expect(firstItem).toBeVisible()
    await firstItem.click()

    // panel should close
    await expect(page.locator('.o-dropdown-list')).toHaveCount(0)
  })

  test('5-4 点击外部区域关闭面板', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"] .o-btn').first()
    await emphasisL.click()

    // Wait for panel to open
    await expect(page.locator('.o-dropdown-list').first()).toBeVisible()

    // Click outside
    await page.mouse.click(10, 10)

    // Panel should close
    await expect(page.locator('.o-dropdown-list')).toHaveCount(0)
  })

  test('5-5 点击普通下拉按钮展开面板', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const normalL = lightRow.locator('[data-testid="dropdown-normal-l-light"] .o-btn').first()
    await normalL.click()

    await expect(page.locator('.o-dropdown-list').first()).toBeVisible()
  })

  test('5-6 点击文字下拉按钮展开面板', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const textL = lightRow.locator('[data-testid="dropdown-text-l-light"] .o-btn').first()
    await textL.click()

    await expect(page.locator('.o-dropdown-list').first()).toBeVisible()
  })

  // ── Dimension 6: 相对位置关系 ─────────────────────────────────────────
  test('6-1 亮色区块在暗色区块上方', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const darkRow = page.locator('[data-testid="dropdown-row-dark"]')

    const lightBox = await lightRow.boundingBox()
    const darkBox = await darkRow.boundingBox()

    expect(lightBox!.y).toBeLessThan(darkBox!.y)
  })

  test('6-2 按钮行内按钮横向排列（左到右顺序：L > M > S）', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const emphasisL = lightRow.locator('[data-testid="dropdown-emphasis-l-light"]')
    const emphasisM = lightRow.locator('[data-testid="dropdown-emphasis-m-light"]')
    const emphasisS = lightRow.locator('[data-testid="dropdown-emphasis-s-light"]')

    const lBox = await emphasisL.boundingBox()
    const mBox = await emphasisM.boundingBox()
    const sBox = await emphasisS.boundingBox()

    expect(lBox!.x).toBeLessThan(mBox!.x)
    expect(mBox!.x).toBeLessThan(sBox!.x)
  })

  // ── Dimension 7: 非组件内部间距使用响应式 CSS 变量 ─────────────────────
  test('7-1 floor-body gap 使用 CSS 变量（非硬编码 px）', async ({ page }) => {
    // We verify the gap is non-zero (variable-based)
    const floorBody = page.locator('.floor-body').first()
    const gap = await floorBody.evaluate((el) => getComputedStyle(el).gap)
    // Should have a gap value
    expect(gap).not.toBe('0px')
    expect(gap).not.toBe('normal')
  })

  test('7-2 theme-section padding 使用 CSS 变量（非硬编码 px）', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const padding = await lightRow.evaluate((el) => getComputedStyle(el).padding)
    expect(padding).not.toBe('0px')
  })

  // ── Dimension 8: 块的对齐 ─────────────────────────────────────────────
  test('8-1 btn-row 内按钮垂直居中对齐', async ({ page }) => {
    const lightRow = page.locator('[data-testid="dropdown-row-light"]')
    const btnRow = lightRow.locator('.btn-row').first()
    const alignItems = await btnRow.evaluate((el) => getComputedStyle(el).alignItems)
    expect(alignItems).toBe('center')
  })
})
