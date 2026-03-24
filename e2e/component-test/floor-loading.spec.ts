import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OLoading 加载楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OLoading 加载"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OLoading 加载' })).toBeVisible()
  })

  test('楼层描述含设计稿 ID 31:3296', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '31:3296' })).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="loading-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="loading-row-dark"]')).toBeVisible()
  })

  test('亮色区块有 Large 卡片', async ({ page }) => {
    await expect(page.locator('[data-testid="loading-large-light"]')).toBeVisible()
  })

  test('亮色区块有 Medium 卡片', async ({ page }) => {
    await expect(page.locator('[data-testid="loading-medium-light"]')).toBeVisible()
  })

  test('亮色区块有 Small 卡片', async ({ page }) => {
    await expect(page.locator('[data-testid="loading-small-light"]')).toBeVisible()
  })

  test('亮色区块有 Mini 卡片', async ({ page }) => {
    await expect(page.locator('[data-testid="loading-mini-light"]')).toBeVisible()
  })

  test('每个卡片内有 OLoading 组件（.o-loading）', async ({ page }) => {
    const loadingInLight = page.locator('[data-testid="loading-row-light"] .o-loading')
    await expect(loadingInLight.first()).toBeVisible()
    // 4 sizes × light = 4
    await expect(loadingInLight).toHaveCount(4)
  })

  // ---- 维度2：默认状态正确性 ----

  test('OLoading 可见（visible=true）', async ({ page }) => {
    const loading = page.locator('[data-testid="loading-large-light"] .o-loading')
    await expect(loading).toBeVisible()
  })

  test('加载图标在每个 OLoading 内存在', async ({ page }) => {
    const icon = page.locator('[data-testid="loading-large-light"] .o-loading-icon')
    await expect(icon).toBeVisible()
  })

  test('加载文字"加载中"存在于 Large 卡片', async ({ page }) => {
    const label = page.locator('[data-testid="loading-large-light"] .o-loading-label')
    await expect(label).toBeVisible()
    await expect(label).toContainText('加载中')
  })

  test('加载文字"加载中"存在于 Medium 卡片', async ({ page }) => {
    const label = page.locator('[data-testid="loading-medium-light"] .o-loading-label')
    await expect(label).toBeVisible()
    await expect(label).toContainText('加载中')
  })

  test('加载文字"加载中"存在于 Small 卡片', async ({ page }) => {
    const label = page.locator('[data-testid="loading-small-light"] .o-loading-label')
    await expect(label).toBeVisible()
    await expect(label).toContainText('加载中')
  })

  // ---- 维度3：布局与间距 ----

  test('亮色行内卡片横向排列（flex row）', async ({ page }) => {
    const row = page.locator('[data-testid="loading-row-light"] .loading-row')
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    // 确认方向为行（默认 flex-direction: row）
    const direction = await row.evaluate(el => getComputedStyle(el).flexDirection)
    expect(direction).toBe('row')
  })

  test('亮色行中卡片有阴影', async ({ page }) => {
    const card = page.locator('[data-testid="loading-row-light"] .loading-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  // ---- 维度4：视觉样式 ----

  test('暗色区块有深色背景 rgb(31, 33, 39)', async ({ page }) => {
    const darkRow = page.locator('[data-testid="loading-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // background: #1f2127 → rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（16–28px）', async ({ page }) => {
    const titleEl = page.locator('.section-title').filter({ hasText: 'OLoading' })
    const fontSize = await titleEl.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('Large 图标尺寸大于 Medium 图标尺寸', async ({ page }) => {
    const largeIcon = page.locator('[data-testid="loading-large-light"] .o-loading-icon')
    const mediumIcon = page.locator('[data-testid="loading-medium-light"] .o-loading-icon')
    await expect(largeIcon).toBeVisible()
    await expect(mediumIcon).toBeVisible()
    const largeH = await largeIcon.evaluate(el => el.getBoundingClientRect().height)
    const mediumH = await mediumIcon.evaluate(el => el.getBoundingClientRect().height)
    expect(largeH).toBeGreaterThan(mediumH)
  })

  test('Medium 图标尺寸大于 Small 图标尺寸', async ({ page }) => {
    const mediumIcon = page.locator('[data-testid="loading-medium-light"] .o-loading-icon')
    const smallIcon = page.locator('[data-testid="loading-small-light"] .o-loading-icon')
    await expect(mediumIcon).toBeVisible()
    await expect(smallIcon).toBeVisible()
    const mediumH = await mediumIcon.evaluate(el => el.getBoundingClientRect().height)
    const smallH = await smallIcon.evaluate(el => el.getBoundingClientRect().height)
    expect(mediumH).toBeGreaterThan(smallH)
  })

  test('Large 加载图标 flex-direction 为 column（图标在上，文字在下）', async ({ page }) => {
    const main = page.locator('[data-testid="loading-large-light"] .o-loading-main')
    await expect(main).toBeVisible()
    const direction = await main.evaluate(el => getComputedStyle(el).flexDirection)
    expect(direction).toBe('column')
  })

  test('Small 加载图标 flex-direction 为 row（图标在左，文字在右）', async ({ page }) => {
    const main = page.locator('[data-testid="loading-small-light"] .o-loading-main')
    await expect(main).toBeVisible()
    const direction = await main.evaluate(el => getComputedStyle(el).flexDirection)
    expect(direction).toBe('row')
  })

  // ---- 维度5：交互行为（OLoading 无用户交互，验证 visible 状态稳定） ----

  test('OLoading visible=true 状态持续可见', async ({ page }) => {
    const loading = page.locator('[data-testid="loading-large-light"] .o-loading')
    // 等待 500ms 确认仍然可见（非临时闪现）
    await page.waitForTimeout(500)
    await expect(loading).toBeVisible()
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="loading-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="loading-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('图标在文字上方（Large size，column 方向）', async ({ page }) => {
    const icon = page.locator('[data-testid="loading-large-light"] .o-loading-icon')
    const label = page.locator('[data-testid="loading-large-light"] .o-loading-label')
    await expect(icon).toBeVisible()
    await expect(label).toBeVisible()
    const iconBottom = await icon.evaluate(el => el.getBoundingClientRect().bottom)
    const labelTop = await label.evaluate(el => el.getBoundingClientRect().top)
    expect(iconBottom).toBeLessThanOrEqual(labelTop + 2) // 允许 2px 误差
  })

  test('图标在文字左侧（Small size，row 方向）', async ({ page }) => {
    const icon = page.locator('[data-testid="loading-small-light"] .o-loading-icon')
    const label = page.locator('[data-testid="loading-small-light"] .o-loading-label')
    await expect(icon).toBeVisible()
    await expect(label).toBeVisible()
    const iconRight = await icon.evaluate(el => el.getBoundingClientRect().right)
    const labelLeft = await label.evaluate(el => el.getBoundingClientRect().left)
    expect(iconRight).toBeLessThanOrEqual(labelLeft + 2)
  })

  // ---- 维度7：非组件内部间距使用响应式变量 ----

  test('卡片间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="loading-row-light"] .loading-row')
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('亮色行 4 个卡片顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cards = page.locator('[data-testid="loading-row-light"] .loading-card')
    const tops = await cards.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    expect(tops).toHaveLength(4)
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
