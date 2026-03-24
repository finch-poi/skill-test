import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OResult 结果楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OResult 结果"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OResult 结果' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 1740:18598', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '1740:18598' }).first()).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="result-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="result-row-dark"]')).toBeVisible()
  })

  test('亮色区块含 4 个状态图标模式的 OResult', async ({ page }) => {
    const light = page.locator('[data-testid="result-row-light"]')
    const results = light.locator('.o-result')
    await expect(results.first()).toBeVisible()
    const count = await results.count()
    // 4 status + 3 image = 7 total
    expect(count).toBeGreaterThanOrEqual(7)
  })

  test('success 状态 OResult 存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="result-success-light"]')).toBeVisible()
  })

  test('info 状态 OResult 存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="result-info-light"]')).toBeVisible()
  })

  test('warning 状态 OResult 存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="result-warning-light"]')).toBeVisible()
  })

  test('danger 状态 OResult 存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="result-danger-light"]')).toBeVisible()
  })

  test('图片模式 403/404/500 结果卡片存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="result-403-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="result-404-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="result-500-light"]')).toBeVisible()
  })

  test('success OResult 含正确的 status 类（亮色）', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-light"]')
    const result = card.locator('.o-result')
    await expect(result).toHaveClass(/o-result-success/)
  })

  test('danger OResult 含正确的 status 类（亮色）', async ({ page }) => {
    const card = page.locator('[data-testid="result-danger-light"]')
    const result = card.locator('.o-result')
    await expect(result).toHaveClass(/o-result-danger/)
  })

  test('info OResult 含正确的 status 类（亮色）', async ({ page }) => {
    const card = page.locator('[data-testid="result-info-light"]')
    const result = card.locator('.o-result')
    await expect(result).toHaveClass(/o-result-info/)
  })

  test('warning OResult 含正确的 status 类（亮色）', async ({ page }) => {
    const card = page.locator('[data-testid="result-warning-light"]')
    const result = card.locator('.o-result')
    await expect(result).toHaveClass(/o-result-warning/)
  })

  // ---- 维度2：默认状态正确性 ----

  test('success 结果标题为"提交成功"', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-light"]')
    await expect(card).toContainText('提交成功')
  })

  test('danger 结果标题为"提交失败"', async ({ page }) => {
    const card = page.locator('[data-testid="result-danger-light"]')
    await expect(card).toContainText('提交失败')
  })

  test('info 结果标题为"提示信息"', async ({ page }) => {
    const card = page.locator('[data-testid="result-info-light"]')
    await expect(card).toContainText('提示信息')
  })

  test('warning 结果标题为"操作警告"', async ({ page }) => {
    const card = page.locator('[data-testid="result-warning-light"]')
    await expect(card).toContainText('操作警告')
  })

  test('success 结果有操作按钮', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-light"]')
    const btn = card.locator('.o-btn')
    await expect(btn).toBeVisible()
  })

  test('404 图片模式有标题文字', async ({ page }) => {
    const card = page.locator('[data-testid="result-404-light"]')
    await expect(card).toContainText('页面不存在')
  })

  test('403 图片模式有描述文字', async ({ page }) => {
    const card = page.locator('[data-testid="result-403-light"]')
    await expect(card).toContainText('您没有权限访问该页面')
  })

  test('图片模式 OResult 有 #image 插槽内容（.result-illustration）', async ({ page }) => {
    const card = page.locator('[data-testid="result-404-light"]')
    const illustration = card.locator('.result-illustration')
    await expect(illustration).toBeVisible()
  })

  // ---- 维度3：布局与间距 ----

  test('状态图标网格有 flex-wrap 布局', async ({ page }) => {
    const grid = page.locator('[data-testid="result-row-light"] .result-grid').first()
    await expect(grid).toBeVisible()
    const flexWrap = await grid.evaluate(el => getComputedStyle(el).flexWrap)
    expect(flexWrap).toBe('wrap')
  })

  test('result-grid gap 非零', async ({ page }) => {
    const grid = page.locator('[data-testid="result-row-light"] .result-grid').first()
    const gap = await grid.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('结果卡片有内边距（非零）', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-light"]')
    const padding = await card.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度4：视觉样式 ----

  test('暗色区块有深色背景（#1f2127）', async ({ page }) => {
    const darkRow = page.locator('[data-testid="result-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('亮色卡片有阴影（非 none）', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-light"]')
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('亮色结果卡片背景色为 fill2（白色）', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-light"]')
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor)
    // --o-color-fill2 = rgb(255,255,255)
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page.locator('.section-title').filter({ hasText: 'OResult' }).evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('OResult 状态图标在标题左侧（水平排列，桌面视口）', async ({ page }) => {
    // 桌面端 >1440px，图标和标题水平排列
    const card = page.locator('[data-testid="result-success-light"]')
    const header = card.locator('.o-result-header')
    await expect(header).toBeVisible()
    const display = await header.evaluate(el => getComputedStyle(el).flexDirection)
    // 桌面端应为 row（水平）
    expect(['row', 'row-reverse']).toContain(display)
  })

  // ---- 维度5：交互行为 ----

  test('success 结果的按钮可点击（不报错）', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-light"]')
    const btn = card.locator('.o-btn')
    await expect(btn).toBeVisible()
    await btn.click()
    // 按钮点击后页面无报错，仍可见
    await expect(btn).toBeVisible()
  })

  test('图片模式按钮可点击', async ({ page }) => {
    const card = page.locator('[data-testid="result-404-light"]')
    const btn = card.locator('.o-btn')
    await expect(btn).toBeVisible()
    await btn.click()
    await expect(btn).toBeVisible()
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="result-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="result-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('状态图标模式在图片模式上方（亮色区）', async ({ page }) => {
    const row = page.locator('[data-testid="result-row-light"]')
    const grids = row.locator('.result-grid')
    const topY1 = await grids.nth(0).evaluate(el => el.getBoundingClientRect().top)
    const topY2 = await grids.nth(1).evaluate(el => el.getBoundingClientRect().top)
    expect(topY1).toBeLessThan(topY2)
  })

  test('success 卡片在 info 卡片左侧（同行第一、第二）', async ({ page }) => {
    const successX = await page.locator('[data-testid="result-success-light"]').evaluate(
      el => el.getBoundingClientRect().left
    )
    const infoX = await page.locator('[data-testid="result-info-light"]').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(successX).toBeLessThan(infoX)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('主题区块间距来自 CSS 变量（非零）', async ({ page }) => {
    const body = page.locator('.floor-body')
    await expect(body).toBeVisible()
    const gap = await body.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('theme-section padding 非零', async ({ page }) => {
    const section = page.locator('[data-testid="result-row-light"]')
    const padding = await section.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('同行 success/info/warning/danger 卡片顶部对齐（误差 ≤ 4px）', async ({ page }) => {
    const cards = [
      page.locator('[data-testid="result-success-light"]'),
      page.locator('[data-testid="result-info-light"]'),
      page.locator('[data-testid="result-warning-light"]'),
      page.locator('[data-testid="result-danger-light"]'),
    ]
    const tops = await Promise.all(
      cards.map(c => c.evaluate(el => Math.round(el.getBoundingClientRect().top)))
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(4)
  })

  test('暗色区块中的 success 结果也有图标（data-o-theme="e.dark" 下正常渲染）', async ({ page }) => {
    const card = page.locator('[data-testid="result-success-dark"]')
    await expect(card).toBeVisible()
    const result = card.locator('.o-result')
    await expect(result).toHaveClass(/o-result-success/)
  })
})
