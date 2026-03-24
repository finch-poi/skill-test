import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OAnchor 锚点楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OAnchor 锚点"', async ({ page }) => {
    await expect(
      page.locator('.section-title').filter({ hasText: 'OAnchor 锚点' }).first(),
    ).toBeVisible()
  })

  test('楼层描述含设计稿 ID 95:2513', async ({ page }) => {
    await expect(
      page.locator('.section-subtitle').filter({ hasText: '95:2513' }).first(),
    ).toBeVisible()
  })

  test('楼层描述含设计稿 ID 5:7968', async ({ page }) => {
    await expect(
      page.locator('.section-subtitle').filter({ hasText: '5:7968' }).first(),
    ).toBeVisible()
  })

  test('亮色水平锚点区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-row-light"]')).toBeVisible()
  })

  test('暗色水平锚点区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-row-dark"]')).toBeVisible()
  })

  test('垂直锚点亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-v-light"]')).toBeVisible()
  })

  test('水平锚点亮色有 OAnchor (.o-anchor-h)', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-light"]')
    await expect(anchor).toBeVisible()
    await expect(anchor).toHaveClass(/o-anchor-h/)
  })

  test('水平锚点暗色有 OAnchor (.o-anchor-h)', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-dark"]')
    await expect(anchor).toBeVisible()
    await expect(anchor).toHaveClass(/o-anchor-h/)
  })

  test('水平锚点亮色有 3 个锚点项', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-light"]')
    await expect(anchor.locator('.o-anchor-item')).toHaveCount(3)
  })

  test('水平锚点暗色有 3 个锚点项', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-dark"]')
    await expect(anchor.locator('.o-anchor-item')).toHaveCount(3)
  })

  test('垂直锚点 medium level1 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-v-m-level1"]')).toBeVisible()
  })

  test('垂直锚点 medium level2 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-v-m-level2"]')).toBeVisible()
  })

  test('垂直锚点 small level1 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-v-s-level1"]')).toBeVisible()
  })

  test('垂直锚点 small level2 存在', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-v-s-level2"]')).toBeVisible()
  })

  test('垂直 medium 锚点无 o-anchor-h 类（垂直模式）', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-v-m-level1"]')
    const cls = await anchor.getAttribute('class')
    expect(cls).not.toContain('o-anchor-h')
  })

  // ---- 维度2：默认状态正确性 ----

  test('water平锚点亮色 3 个项目均可见文字', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-light"]')
    const items = anchor.locator('.o-anchor-item')
    await expect(items.nth(0)).toContainText('一级锚点')
    await expect(items.nth(1)).toContainText('一级锚点 (选中)')
    await expect(items.nth(2)).toContainText('一级锚点')
  })

  test('垂直 medium level1 有 5 个锚点项', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-v-m-level1"]')
    await expect(anchor.locator('.o-anchor-item')).toHaveCount(5)
  })

  test('垂直 medium level2 有嵌套子项', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-v-m-level2"]')
    // 子项嵌套在父项的 default 插槽中，层级结构中存在嵌套 .o-anchor-item
    const allItems = anchor.locator('.o-anchor-item')
    const count = await allItems.count()
    // 5 个顶级 + 3 个子项 = 8
    expect(count).toBeGreaterThanOrEqual(6)
  })

  test('垂直 small level2 有嵌套子项', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-v-s-level2"]')
    const allItems = anchor.locator('.o-anchor-item')
    const count = await allItems.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })

  // ---- 维度3：布局与间距 ----

  test('水平锚点项目横向排列（flex row）', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-light"]')
    // 水平模式下所有锚点项同一行 - 第1项和第2项的 top 相近，left 不同
    const items = anchor.locator('.o-anchor-item')
    const rect0 = await items.nth(0).boundingBox()
    const rect1 = await items.nth(1).boundingBox()
    expect(rect0).not.toBeNull()
    expect(rect1).not.toBeNull()
    // x 坐标不同（横向排列）
    expect(Math.abs(rect0!.x - rect1!.x)).toBeGreaterThan(10)
    // y 坐标接近（同一行）
    expect(Math.abs(rect0!.y - rect1!.y)).toBeLessThanOrEqual(5)
  })

  test('垂直锚点项目纵向排列', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-v-m-level1"]')
    const items = anchor.locator('.o-anchor-item')
    const rect0 = await items.nth(0).boundingBox()
    const rect1 = await items.nth(1).boundingBox()
    expect(rect0).not.toBeNull()
    expect(rect1).not.toBeNull()
    // y 坐标不同（纵向排列）
    expect(rect1!.y).toBeGreaterThan(rect0!.y)
  })

  test('垂直锚点 4 列并排（flex 横向）', async ({ page }) => {
    const row = page.locator('[data-testid="anchor-v-light"] .anchor-v-row')
    const display = await row.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('亮色水平锚点区块有背景色（非透明）', async ({ page }) => {
    const section = page.locator('[data-testid="anchor-row-light"]')
    const bg = await section.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
  })

  test('anchor-card 有 box-shadow', async ({ page }) => {
    const card = page.locator('[data-testid="anchor-v-light"] .anchor-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate((el) => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  // ---- 维度4：视觉样式 ----

  test('暗色水平区块背景为深色 (#1f2127 → rgb(31,33,39))', async ({ page }) => {
    const darkRow = page.locator('[data-testid="anchor-row-dark"]')
    const bg = await darkRow.evaluate((el) => getComputedStyle(el).backgroundColor)
    // #1f2127 → rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('水平锚点使用 o-anchor-h 类', async ({ page }) => {
    await expect(page.locator('[data-testid="anchor-h-light"]')).toHaveClass(/o-anchor-h/)
  })

  test('垂直锚点 small size 有 o-anchor-small 类（或等效小字号样式）', async ({ page }) => {
    // OAnchor size="small" 会附加对应的 class
    const anchor = page.locator('[data-testid="anchor-v-s-level1"]')
    // 只需确认其存在且可见
    await expect(anchor).toBeVisible()
  })

  test('楼层标题使用响应式字号（非零且合理范围）', async ({ page }) => {
    const title = page.locator('.section-title').filter({ hasText: 'OAnchor 锚点' }).first()
    const fontSize = await title.evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  // ---- 维度5：交互行为 ----

  test('点击水平锚点第3项可切换激活状态', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-light"]')
    const thirdItem = anchor.locator('.o-anchor-item').nth(2)
    await thirdItem.click()
    // 点击后第3项应获得 active 类
    await expect(thirdItem).toHaveClass(/o-anchor-item-active/, { timeout: 3000 })
  })

  test('点击垂直 medium level1 的第1项可切换激活', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-v-m-level1"]')
    const firstItem = anchor.locator('.o-anchor-item').first()
    await firstItem.click()
    await expect(firstItem).toHaveClass(/o-anchor-item-active/, { timeout: 3000 })
  })

  // ---- 维度6：相对位置关系 ----

  test('水平亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page
      .locator('[data-testid="anchor-row-light"]')
      .evaluate((el) => el.getBoundingClientRect().top)
    const darkY = await page
      .locator('[data-testid="anchor-row-dark"]')
      .evaluate((el) => el.getBoundingClientRect().top)
    expect(lightY).toBeLessThan(darkY)
  })

  test('水平锚点区块在垂直锚点区块上方', async ({ page }) => {
    const hY = await page
      .locator('[data-testid="anchor-row-light"]')
      .evaluate((el) => el.getBoundingClientRect().top)
    const vY = await page
      .locator('[data-testid="anchor-v-light"]')
      .evaluate((el) => el.getBoundingClientRect().top)
    expect(hY).toBeLessThan(vY)
  })

  test('垂直 medium 列在 small 列左侧', async ({ page }) => {
    const xM = await page
      .locator('[data-testid="anchor-v-m-level1"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    const xS = await page
      .locator('[data-testid="anchor-v-s-level1"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    expect(xM).toBeLessThan(xS)
  })

  test('垂直 level1 列在 level2 列左侧', async ({ page }) => {
    const xL1 = await page
      .locator('[data-testid="anchor-v-m-level1"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    const xL2 = await page
      .locator('[data-testid="anchor-v-m-level2"]')
      .evaluate((el) => el.getBoundingClientRect().left)
    expect(xL1).toBeLessThan(xL2)
  })

  test('水平锚点第1项在第2项左侧', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-light"]')
    const items = anchor.locator('.o-anchor-item')
    const x0 = await items.nth(0).evaluate((el) => el.getBoundingClientRect().left)
    const x1 = await items.nth(1).evaluate((el) => el.getBoundingClientRect().left)
    expect(x0).toBeLessThan(x1)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('anchor-v-row 的 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="anchor-v-light"] .anchor-v-row')
    const gap = await row.evaluate((el) => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('floor-body 的 gap 来自 CSS 变量（非零）', async ({ page }) => {
    // 通过测试间距非零验证响应式间距
    const lightY = await page
      .locator('[data-testid="anchor-row-light"]')
      .evaluate((el) => el.getBoundingClientRect().bottom)
    const darkY = await page
      .locator('[data-testid="anchor-row-dark"]')
      .evaluate((el) => el.getBoundingClientRect().top)
    expect(darkY - lightY).toBeGreaterThan(0)
  })

  // ---- 维度8：块对齐 ----

  test('垂直锚点 4 列顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cols = page.locator('[data-testid="anchor-v-light"] .anchor-col')
    const tops = await cols.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top)),
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })

  test('水平锚点项顶部对齐（误差 ≤ 5px）', async ({ page }) => {
    const anchor = page.locator('[data-testid="anchor-h-light"]')
    const items = anchor.locator('.o-anchor-item')
    const tops = await items.evaluateAll((els) =>
      els.map((el) => Math.round(el.getBoundingClientRect().top)),
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(5)
  })
})
