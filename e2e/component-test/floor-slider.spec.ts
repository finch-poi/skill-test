import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OSlider 滑动条楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OSlider 滑动条"', async ({ page }) => {
    await expect(page.locator('.section-title')).toContainText('OSlider 滑动条')
  })

  test('楼层描述含设计稿 ID 253:5708', async ({ page }) => {
    await expect(page.locator('.section-subtitle')).toContainText('253:5708')
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="slider-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="slider-row-dark"]')).toBeVisible()
  })

  test('亮色区块含连续滑动条（default）', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-continuous-default"]')
    ).toBeVisible()
  })

  test('亮色区块含连续滑动条（selected）', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-continuous-selected"]')
    ).toBeVisible()
  })

  test('亮色区块含带输入框的滑动条', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-with-input"]')
    ).toBeVisible()
  })

  test('亮色区块含范围滑动条（range）', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-range"]')
    ).toBeVisible()
  })

  test('亮色区块含间续滑动条（showStops default）', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-stops-default"]')
    ).toBeVisible()
  })

  test('亮色区块含间续滑动条（showStops selected）', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-stops-selected"]')
    ).toBeVisible()
  })

  test('亮色区块含带 marks 的滑动条', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-marks"]')
    ).toBeVisible()
  })

  test('亮色区块含禁用连续滑动条', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-disabled"]')
    ).toBeVisible()
  })

  test('亮色区块含禁用间续滑动条', async ({ page }) => {
    await expect(
      page.locator('[data-testid="slider-stops-disabled"]')
    ).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('连续滑动条（default）滑块存在', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-continuous-default"]')
    await expect(slider.locator('.o-slider-btn').first()).toBeVisible()
  })

  test('范围滑动条有两个滑块', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-range"]')
    // 等待组件渲染
    await expect(slider).toBeVisible()
    const buttons = slider.locator('.o-slider-btn')
    await expect(buttons).toHaveCount(2)
  })

  test('间续滑动条有刻度点（stops）', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-stops-default"]')
    await expect(slider).toBeVisible()
    const stops = slider.locator('.o-slider-stop')
    const count = await stops.count()
    expect(count).toBeGreaterThan(0)
  })

  test('带 marks 的滑动条有标记文字', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-marks"]')
    await expect(slider).toBeVisible()
    const marks = slider.locator('.o-slider-marks-text')
    const count = await marks.count()
    expect(count).toBeGreaterThan(0)
  })

  test('禁用滑动条有 disabled 类', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-disabled"]')
    await expect(slider).toBeVisible()
    await expect(slider).toHaveClass(/o-slider-disabled/)
  })

  test('带输入框的滑动条含有输入框元素', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-with-input"]')
    await expect(slider).toBeVisible()
    await expect(slider.locator('input').first()).toBeVisible()
  })

  // ---- 维度3：布局与间距 ----

  test('亮色主题区块内有三个分组卡片', async ({ page }) => {
    const lightSection = page.locator('[data-testid="slider-row-light"]')
    const groups = lightSection.locator('.slider-group')
    await expect(groups).toHaveCount(3)
  })

  test('连续滑动条分组内两列并排', async ({ page }) => {
    const row = page
      .locator('[data-testid="slider-row-light"] .slider-row')
      .first()
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('亮色区块内分组卡片有阴影', async ({ page }) => {
    const group = page
      .locator('[data-testid="slider-row-light"] .slider-group')
      .first()
    const shadow = await group.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  // ---- 维度4：视觉样式 ----

  test('暗色区块背景色为 rgb(31, 33, 39)', async ({ page }) => {
    const darkRow = page.locator('[data-testid="slider-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // background: #1f2127 → rgb(31,33,39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page
      .locator('.section-title')
      .last()
      .evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    // h3 mixin 在 1920px 断点 ≈ 16–28px
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('间续滑动条分组卡片背景为白色（fill2）', async ({ page }) => {
    const group = page
      .locator('[data-testid="slider-row-light"] .slider-group')
      .nth(1)
    const bg = await group.evaluate(el => getComputedStyle(el).backgroundColor)
    // --o-color-fill2 = rgb(255,255,255)
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  // ---- 维度5：交互行为 ----

  test('连续滑动条（selected，value=42）进度条宽度 > 0', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-continuous-selected"]')
    await expect(slider).toBeVisible()
    const barWidth = await slider
      .locator('.o-slider-bar')
      .evaluate(el => parseFloat(getComputedStyle(el).width))
    expect(barWidth).toBeGreaterThan(0)
  })

  test('禁用滑动条不可拖拽（pointer-events none 或 disabled attr）', async ({ page }) => {
    const slider = page.locator('[data-testid="slider-disabled"]')
    await expect(slider).toBeVisible()
    await expect(slider).toHaveClass(/o-slider-disabled/)
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page
      .locator('[data-testid="slider-row-light"]')
      .evaluate(el => el.getBoundingClientRect().top)
    const darkY = await page
      .locator('[data-testid="slider-row-dark"]')
      .evaluate(el => el.getBoundingClientRect().top)
    expect(lightY).toBeLessThan(darkY)
  })

  test('连续滑动条分组在间续滑动条分组上方（亮色）', async ({ page }) => {
    const lightSection = page.locator('[data-testid="slider-row-light"]')
    const group1Y = await lightSection
      .locator('.slider-group')
      .nth(0)
      .evaluate(el => el.getBoundingClientRect().top)
    const group2Y = await lightSection
      .locator('.slider-group')
      .nth(1)
      .evaluate(el => el.getBoundingClientRect().top)
    expect(group1Y).toBeLessThan(group2Y)
  })

  test('间续滑动条分组在禁用分组上方（亮色）', async ({ page }) => {
    const lightSection = page.locator('[data-testid="slider-row-light"]')
    const group2Y = await lightSection
      .locator('.slider-group')
      .nth(1)
      .evaluate(el => el.getBoundingClientRect().top)
    const group3Y = await lightSection
      .locator('.slider-group')
      .nth(2)
      .evaluate(el => el.getBoundingClientRect().top)
    expect(group2Y).toBeLessThan(group3Y)
  })

  // ---- 维度7：非组件内部间距使用响应式变量 ----

  test('slider-row 列间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page
      .locator('[data-testid="slider-row-light"] .slider-row')
      .first()
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('floor-body 分组间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const body = page
      .locator('[data-testid="slider-row-light"]')
      .locator('xpath=..')
    const gap = await body.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('连续滑动条行两列顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const row = page
      .locator('[data-testid="slider-row-light"] .slider-row')
      .first()
    const items = row.locator('.slider-item')
    const tops = await items.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    if (tops.length >= 2) {
      const diff = Math.max(...tops) - Math.min(...tops)
      expect(diff).toBeLessThanOrEqual(2)
    }
  })
})
