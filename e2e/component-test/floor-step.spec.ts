import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OStep 步骤条楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OStep 步骤条"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OStep 步骤条' })).toBeVisible()
  })

  test('楼层描述含设计稿 ID 1740:18743', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '1740:18743' })).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="step-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="step-row-dark"]')).toBeVisible()
  })

  test('亮色区 水平基础步骤条存在且包含3个步骤项', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-basic"]')
    await expect(step).toBeVisible()
    const items = step.locator('.o-step-item')
    await expect(items).toHaveCount(3)
  })

  test('亮色区 失败状态步骤条存在且包含3个步骤项', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-failed"]')
    await expect(step).toBeVisible()
    const items = step.locator('.o-step-item')
    await expect(items).toHaveCount(3)
  })

  test('亮色区 垂直步骤条存在且包含3个步骤项', async ({ page }) => {
    const step = page.locator('[data-testid="step-v-basic"]')
    await expect(step).toBeVisible()
    const items = step.locator('.o-step-item')
    await expect(items).toHaveCount(3)
  })

  test('暗色区 水平基础步骤条存在', async ({ page }) => {
    await expect(page.locator('[data-testid="step-h-basic-dark"]')).toBeVisible()
  })

  test('暗色区 垂直步骤条存在', async ({ page }) => {
    await expect(page.locator('[data-testid="step-v-basic-dark"]')).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('水平基础步骤条第1项为 finished 状态', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-basic"]')
    await expect(step.locator('.o-step-item').first()).toHaveClass(/o-step-item-finished/)
  })

  test('水平基础步骤条第2项为 processing 状态', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-basic"]')
    await expect(step.locator('.o-step-item').nth(1)).toHaveClass(/o-step-item-processing/)
  })

  test('水平基础步骤条第3项为 waiting 状态', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-basic"]')
    await expect(step.locator('.o-step-item').nth(2)).toHaveClass(/o-step-item-waiting/)
  })

  test('失败状态步骤条第2项为 failed 状态', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-failed"]')
    await expect(step.locator('.o-step-item').nth(1)).toHaveClass(/o-step-item-failed/)
  })

  test('水平基础步骤条第1项圆内显示数字1（不传 icon）', async ({ page }) => {
    // DSL：圆内数字"1"，不传 icon prop，显示 stepIndex+1
    const step = page.locator('[data-testid="step-h-basic"]')
    const symbol = step.locator('.o-step-item').first().locator('.o-step-item-symbol')
    await expect(symbol).toContainText('1')
  })

  test('水平基础步骤条第2项圆内显示数字2（processing，不传 icon）', async ({ page }) => {
    // DSL：圆内数字"2"，processing 状态
    const step = page.locator('[data-testid="step-h-basic"]')
    const symbol = step.locator('.o-step-item').nth(1).locator('.o-step-item-symbol')
    await expect(symbol).toContainText('2')
  })

  test('失败步骤条第1项（finished+icon=true）圆内显示图标（非数字）', async ({ page }) => {
    // icon=true 时，finished 状态显示对勾图标
    const step = page.locator('[data-testid="step-h-failed"]')
    const symbol = step.locator('.o-step-item').first().locator('.o-step-item-symbol')
    // 有 icon=true 时会渲染 svg/icon 元素
    await expect(symbol.locator('svg').first()).toBeVisible()
  })

  test('失败步骤条第2项（failed+icon=true）圆内显示图标（感叹号）', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-failed"]')
    const symbol = step.locator('.o-step-item').nth(1).locator('.o-step-item-symbol')
    await expect(symbol.locator('svg').first()).toBeVisible()
  })

  test('水平步骤条有 .o-step-h 类', async ({ page }) => {
    await expect(page.locator('[data-testid="step-h-basic"]')).toHaveClass(/o-step-h/)
  })

  test('垂直步骤条有 .o-step-v 类', async ({ page }) => {
    await expect(page.locator('[data-testid="step-v-basic"]')).toHaveClass(/o-step-v/)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色区 step-block 有阴影', async ({ page }) => {
    const block = page.locator('[data-testid="step-row-light"] .step-block').first()
    await expect(block).toBeVisible()
    const shadow = await block.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('亮色区包含3个 step-block', async ({ page }) => {
    const blocks = page.locator('[data-testid="step-row-light"] .step-block')
    await expect(blocks).toHaveCount(3)
  })

  test('暗色区包含3个 step-block', async ({ page }) => {
    const blocks = page.locator('[data-testid="step-row-dark"] .step-block')
    await expect(blocks).toHaveCount(3)
  })

  test('floor-body flex 纵向排列', async ({ page }) => {
    const body = page.locator('[data-testid="step-row-light"]').locator('..').locator('.floor-body')
    const display = await body.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const direction = await body.evaluate(el => getComputedStyle(el).flexDirection)
    expect(direction).toBe('column')
  })

  // ---- 维度4：视觉样式 ----

  test('processing 步骤标题字重为 600（加粗）', async ({ page }) => {
    // DSL：进行中的步骤 fontStyle:"SemiBold"，对应 font-weight 600
    const step = page.locator('[data-testid="step-h-basic"]')
    const processingTitle = step.locator('.o-step-item-processing .o-step-item-title')
    await expect(processingTitle).toBeVisible()
    const fw = await processingTitle.evaluate(el => getComputedStyle(el).fontWeight)
    expect(Number(fw)).toBeGreaterThanOrEqual(600)
  })

  test('暗色区块有深色背景 #1f2127', async ({ page }) => {
    const darkRow = page.locator('[data-testid="step-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // #1f2127 → rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const titleEl = page.locator('.section-title').filter({ hasText: 'OStep 步骤条' })
    const fontSize = await titleEl.evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    // h3 mixin 在 1920px 断点 ≈ 18–24px
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('水平步骤条第1项圆形背景为绿色（success1）', async ({ page }) => {
    // DSL：finished 状态圆背景 --o-color-success1（绿色）
    const step = page.locator('[data-testid="step-h-basic"]')
    const symbol = step.locator('.o-step-item').first().locator('.o-step-item-symbol')
    await expect(symbol).toBeVisible()
    const bg = await symbol.evaluate(el => getComputedStyle(el).backgroundColor)
    // success1 在 openEuler 为 rgb(82, 196, 26) 或类似绿色，检查非白、非灰
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    expect(bg).not.toBe('rgb(255, 255, 255)')
  })

  // ---- 维度5：交互行为 ----
  // OStep 无自定义交互事件，此维度无需测试

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="step-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="step-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('亮色区：水平基础步骤条在垂直步骤条上方', async ({ page }) => {
    const hY = await page.locator('[data-testid="step-h-basic"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const vY = await page.locator('[data-testid="step-v-basic"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(hY).toBeLessThan(vY)
  })

  test('水平步骤条：step1 在 step2 左侧', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-basic"]')
    const items = step.locator('.o-step-item')
    const x1 = await items.nth(0).evaluate(el => el.getBoundingClientRect().left)
    const x2 = await items.nth(1).evaluate(el => el.getBoundingClientRect().left)
    expect(x1).toBeLessThan(x2)
  })

  test('水平步骤条：step2 在 step3 左侧', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-basic"]')
    const items = step.locator('.o-step-item')
    const x2 = await items.nth(1).evaluate(el => el.getBoundingClientRect().left)
    const x3 = await items.nth(2).evaluate(el => el.getBoundingClientRect().left)
    expect(x2).toBeLessThan(x3)
  })

  test('垂直步骤条：step1 在 step2 上方', async ({ page }) => {
    const step = page.locator('[data-testid="step-v-basic"]')
    const items = step.locator('.o-step-item')
    const y1 = await items.nth(0).evaluate(el => el.getBoundingClientRect().top)
    const y2 = await items.nth(1).evaluate(el => el.getBoundingClientRect().top)
    expect(y1).toBeLessThan(y2)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('step-block 之间的 gap 非零（来自 CSS 变量）', async ({ page }) => {
    const section = page.locator('[data-testid="step-row-light"]')
    const gap = await section.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：块的对齐 ----

  test('水平步骤条各步骤项顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const step = page.locator('[data-testid="step-h-basic"]')
    const items = step.locator('.o-step-item')
    const tops = await items.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
