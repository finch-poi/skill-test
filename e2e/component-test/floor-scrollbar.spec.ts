import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OScroller / OScrollbar 滚动条楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OScroller"', async ({ page }) => {
    // AppSection 渲染的标题 class
    await expect(
      page.locator('.section-title').filter({ hasText: 'OScroller' }).first(),
    ).toBeVisible()
  })

  test('楼层描述含设计稿 ID 29:5181', async ({ page }) => {
    await expect(
      page.locator('.section-subtitle').filter({ hasText: '29:5181' }).first(),
    ).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="scrollbar-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="scrollbar-row-dark"]')).toBeVisible()
  })

  test('亮色区块内有 4 个 OScroller（竖向L/M + 横向L/M）', async ({ page }) => {
    const row = page.locator('[data-testid="scrollbar-row-light"]')
    await expect(row.locator('.o-scroller')).toHaveCount(4)
  })

  test('暗色区块内有 4 个 OScroller', async ({ page }) => {
    const row = page.locator('[data-testid="scrollbar-row-dark"]')
    await expect(row.locator('.o-scroller')).toHaveCount(4)
  })

  test('竖向 L size 亮色 OScroller 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="scroller-vertical-l-light"]')).toBeVisible()
  })

  test('竖向 M size 亮色 OScroller 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="scroller-vertical-m-light"]')).toBeVisible()
  })

  test('横向 L size 亮色 OScroller 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="scroller-horizontal-l-light"]')).toBeVisible()
  })

  test('横向 M size 亮色 OScroller 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="scroller-horizontal-m-light"]')).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('竖向 L size show-type=always：滚动条元素存在于 DOM', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-vertical-l-light"]')
    await expect(scroller).toBeVisible()
    // OScrollbar 在 DOM 中渲染为 .o-scrollbar
    const scrollbar = scroller.locator('.o-scrollbar')
    await expect(scrollbar).toBeAttached()
  })

  test('竖向 M size 有 small 类（size=small）', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-vertical-m-light"]')
    const scrollbar = scroller.locator('.o-scrollbar')
    await expect(scrollbar).toHaveClass(/o-scrollbar-small/)
  })

  test('竖向 L size 有 medium 类（默认 size=medium）', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-vertical-l-light"]')
    const scrollbar = scroller.locator('.o-scrollbar')
    await expect(scrollbar).toHaveClass(/o-scrollbar-medium/)
  })

  test('横向 M size 有 small 类', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-horizontal-m-light"]')
    const scrollbar = scroller.locator('.o-scrollbar')
    await expect(scrollbar).toHaveClass(/o-scrollbar-small/)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色区块内 demo-row 使用 flex 横向排列', async ({ page }) => {
    const row = page.locator('[data-testid="scrollbar-row-light"] .demo-row')
    const display = await row.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('亮色区块内有 4 个 demo 卡片', async ({ page }) => {
    const row = page.locator('[data-testid="scrollbar-row-light"]')
    await expect(row.locator('.demo-card')).toHaveCount(4)
  })

  test('竖向 scroller 高度为 200px', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-vertical-l-light"]')
    const height = await scroller.evaluate((el) => el.getBoundingClientRect().height)
    expect(height).toBeCloseTo(200, 0)
  })

  test('卡片间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="scrollbar-row-light"] .demo-row')
    const gap = await row.evaluate((el) => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('亮色 demo 卡片有阴影（非 none）', async ({ page }) => {
    const card = page.locator('[data-testid="scrollbar-row-light"] .demo-card').first()
    const shadow = await card.evaluate((el) => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  // ---- 维度4：视觉样式（字号/颜色/圆角/行高） ----

  test('暗色区块背景为 #1f2127（rgb(31,33,39)）', async ({ page }) => {
    // DSL 溯源：Dark 区块 background: #1f2127
    const darkRow = page.locator('[data-testid="scrollbar-row-dark"]')
    const bg = await darkRow.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('暗色区块设置了 data-o-theme="e.dark"', async ({ page }) => {
    const darkRow = page.locator('[data-testid="scrollbar-row-dark"]')
    await expect(darkRow).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page
      .locator('.section-title')
      .filter({ hasText: 'OScroller' })
      .first()
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
    // h3 mixin 在 1920px 断点 ≥ 16px
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('scroller 容器背景色为 fill1（浅灰）', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-vertical-l-light"]')
    const bg = await scroller.evaluate((el) => getComputedStyle(el).backgroundColor)
    // --o-color-fill1 = rgb(243,243,245)
    expect(bg).toBe('rgb(243, 243, 245)')
  })

  // ---- 维度5：交互行为 ----

  test('竖向 scroller 可以滚动（scrollTop 可变）', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-vertical-l-light"]')
    // 找到内部滚动容器
    const container = scroller.locator('.o-scroller-container')
    await expect(container).toBeVisible()
    // 执行滚动
    await container.evaluate((el) => {
      el.scrollTop = 100
    })
    const scrollTop = await container.evaluate((el) => el.scrollTop)
    expect(scrollTop).toBeGreaterThan(0)
  })

  test('横向 scroller 可以滚动（scrollLeft 可变）', async ({ page }) => {
    const scroller = page.locator('[data-testid="scroller-horizontal-l-light"]')
    const container = scroller.locator('.o-scroller-container')
    await expect(container).toBeVisible()
    await container.evaluate((el) => {
      el.scrollLeft = 100
    })
    const scrollLeft = await container.evaluate((el) => el.scrollLeft)
    expect(scrollLeft).toBeGreaterThan(0)
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page
      .locator('[data-testid="scrollbar-row-light"]')
      .evaluate((el) => el.getBoundingClientRect().top)
    const darkY = await page
      .locator('[data-testid="scrollbar-row-dark"]')
      .evaluate((el) => el.getBoundingClientRect().top)
    expect(lightY).toBeLessThan(darkY)
  })

  test('竖向 L 卡片在竖向 M 卡片左侧', async ({ page }) => {
    const lX = await page
      .locator('[data-testid="scroller-vertical-l-light"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    const mX = await page
      .locator('[data-testid="scroller-vertical-m-light"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    expect(lX).toBeLessThan(mX)
  })

  test('竖向卡片组在横向卡片组左侧', async ({ page }) => {
    const vertX = await page
      .locator('[data-testid="scroller-vertical-l-light"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    const horizX = await page
      .locator('[data-testid="scroller-horizontal-l-light"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    expect(vertX).toBeLessThan(horizX)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('theme-section padding 非零（来自响应式变量）', async ({ page }) => {
    const section = page.locator('[data-testid="scrollbar-row-light"]')
    const padding = await section.evaluate((el) => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  test('demo-card gap 非零（来自响应式变量）', async ({ page }) => {
    const card = page.locator('[data-testid="scrollbar-row-light"] .demo-card').first()
    const gap = await card.evaluate((el) => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('亮色区块 4 个 demo 卡片顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cards = page.locator('[data-testid="scrollbar-row-light"] .demo-card')
    const tops = await cards.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top)),
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
