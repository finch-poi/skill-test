import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OPagination 分页楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OPagination 分页"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OPagination' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 5:8096', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '5:8096' }).first()).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination-row-dark"]')).toBeVisible()
  })

  test('亮色区块包含 All 分页组件', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination-all-light"]')).toBeVisible()
  })

  test('亮色区块包含 Simple 分页组件', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination-simple-light"]')).toBeVisible()
  })

  test('暗色区块包含 All 分页组件', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination-all-dark"]')).toBeVisible()
  })

  test('暗色区块包含 Simple 分页组件', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination-simple-dark"]')).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('All Light — 第 1 页默认选中', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    await expect(pager.locator('.o-pagination-item.active')).toBeVisible()
    const activeText = await pager.locator('.o-pagination-item.active').textContent()
    expect(activeText?.trim()).toBe('1')
  })

  test('All Light — 显示总数文字"共 120 条数据"', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    await expect(pager).toContainText('共 120 条数据')
  })

  test('All Dark — 第 1 页默认选中', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-dark"]')
    await expect(pager.locator('.o-pagination-item.active')).toBeVisible()
    const activeText = await pager.locator('.o-pagination-item.active').textContent()
    expect(activeText?.trim()).toBe('1')
  })

  test('Simple Light — 显示当前页码 12', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-simple-light"]')
    // simple 模式有输入框显示当前页
    const input = pager.locator('input').first()
    await expect(input).toBeVisible()
    const value = await input.inputValue()
    expect(value).toBe('12')
  })

  test('Simple Dark — 显示当前页码 12', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-simple-dark"]')
    const input = pager.locator('input').first()
    await expect(input).toBeVisible()
    const value = await input.inputValue()
    expect(value).toBe('12')
  })

  test('All Light — 有上一页按钮', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    const prevBtn = pager.locator('.o-pagination-prev')
    await expect(prevBtn).toBeVisible()
  })

  test('All Light — 有下一页按钮', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    const nextBtn = pager.locator('.o-pagination-next')
    await expect(nextBtn).toBeVisible()
  })

  // ---- 维度3：布局与间距 ----

  test('亮色区块卡片有 box-shadow', async ({ page }) => {
    const card = page.locator('[data-testid="pagination-row-light"] .pagination-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('亮色区块有 2 个 pagination-card', async ({ page }) => {
    const cards = page.locator('[data-testid="pagination-row-light"] .pagination-card')
    await expect(cards).toHaveCount(2)
  })

  test('暗色区块有 2 个 pagination-card', async ({ page }) => {
    const cards = page.locator('[data-testid="pagination-row-dark"] .pagination-card')
    await expect(cards).toHaveCount(2)
  })

  test('分页组件水平排列（display flex）', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    const display = await pager.evaluate(el => getComputedStyle(el).display)
    // OPagination root is flex
    expect(display).toBe('flex')
  })

  // ---- 维度4：视觉样式 ----

  test('All Light — 激活页码按钮有深色背景', async ({ page }) => {
    // DSL 溯源：选中页码为深色实心背景（设计稿中黑色圆形）
    const pager = page.locator('[data-testid="pagination-all-light"]')
    const activeItem = pager.locator('.o-pagination-item.active')
    await expect(activeItem).toBeVisible()
    const bg = await activeItem.evaluate(el => getComputedStyle(el).backgroundColor)
    // Should have a non-transparent background color
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    expect(bg).not.toBe('transparent')
  })

  test('暗色区块有深色背景 #1f2127', async ({ page }) => {
    const darkRow = page.locator('[data-testid="pagination-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // background: #1f2127 → rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const titleEl = page.locator('.section-title').filter({ hasText: 'OPagination' }).first()
    const fontSize = await titleEl.evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    // h3 mixin 在 1920px 断点 ≈ 18–24px
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('All Light — 页码按钮列表包含多个页码', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    const items = pager.locator('.o-pagination-item')
    const count = await items.count()
    expect(count).toBeGreaterThanOrEqual(6)
  })

  // ---- 维度5：交互行为 ----

  test('All Light — 点击第 2 页按钮切换选中态', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    const items = pager.locator('.o-pagination-item')
    // Click second page item (index 1)
    await items.nth(1).click()
    await expect(items.nth(1)).toHaveClass(/active/)
  })

  test('All Light — 第 1 页时上一页按钮禁用', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-all-light"]')
    const prevBtn = pager.locator('.o-pagination-prev')
    await expect(prevBtn).toBeVisible()
    // prev button should be disabled when on page 1
    const disabled = await prevBtn.evaluate(el => el.getAttribute('disabled') !== null || el.classList.contains('o-pagination-btn-disabled'))
    expect(disabled).toBe(true)
  })

  test('Simple Light — 点击下一页增加页码', async ({ page }) => {
    const pager = page.locator('[data-testid="pagination-simple-light"]')
    const input = pager.locator('input').first()
    const initialValue = await input.inputValue()

    const nextBtn = pager.locator('.o-pagination-next')
    await nextBtn.click()
    await page.waitForTimeout(300)

    const newValue = await input.inputValue()
    expect(parseInt(newValue)).toBe(parseInt(initialValue) + 1)
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="pagination-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="pagination-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('All 卡片在 Simple 卡片上方（亮色）', async ({ page }) => {
    const allY = await page.locator('[data-testid="pagination-all-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const simpleY = await page.locator('[data-testid="pagination-simple-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(allY).toBeLessThan(simpleY)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('floor-body 竖向 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const body = page.locator('[data-testid="pagination-row-light"]').locator('..').first()
    const gap = await body.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('theme-section 内部 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const section = page.locator('[data-testid="pagination-row-light"]')
    const gap = await section.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：块的对齐 ----

  test('亮色区块中两个 pagination-card 左边缘对齐', async ({ page }) => {
    const cards = page.locator('[data-testid="pagination-row-light"] .pagination-card')
    const lefts = await cards.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().left))
    )
    const diff = Math.max(...lefts) - Math.min(...lefts)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
