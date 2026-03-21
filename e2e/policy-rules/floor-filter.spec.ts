/**
 * 楼层：筛选面板
 * 对应设计稿：分类切换行 + 时间/作者/标签二级筛选行
 */
import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('筛选面板楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ── 结构与组件正确性 ──
  test('可见且含"分类"标签', async ({ page }) => {
    await expect(page.locator('.filter-panel')).toBeVisible()
    await expect(page.locator('.filter-panel')).toContainText('分类')
  })

  test('分类选项至少 10 个（使用 OToggle）', async ({ page }) => {
    const toggles = page.locator('.filter-category .o-toggle')
    await expect(toggles.first()).toBeVisible()
    const count = await toggles.count()
    expect(count).toBeGreaterThanOrEqual(10)
  })

  test('分类区无 radio 圆圈指示器（设计稿无此元素）', async ({ page }) => {
    await expect(page.locator('.filter-category .o-toggle').first()).toBeVisible()
    const radioInputs = page.locator('.filter-category .o-radio-input')
    const count = await radioInputs.count()
    for (let i = 0; i < count; i++) {
      await expect(radioInputs.nth(i)).not.toBeVisible()
    }
  })

  test('"时间"和"作者"输入框可见', async ({ page }) => {
    await expect(page.locator('.filter-panel')).toContainText('时间')
    await expect(page.locator('.filter-panel')).toContainText('作者')
  })

  test('"标签"多选下拉框可见（使用 OSelect）', async ({ page }) => {
    await expect(page.locator('.filter-panel')).toContainText('标签')
    await expect(page.locator('.filter-tag-select')).toBeVisible()
  })

  // ── 默认状态 ──
  test('"全部"分类默认选中（.o-toggle-checked）', async ({ page }) => {
    const allToggle = page.locator('.filter-category .o-toggle').first()
    await expect(allToggle).toBeVisible()
    await expect(allToggle).toHaveClass(/o-toggle-checked/)
  })

  // ── 视觉样式 ──
  test('��描边（背景对比产生视觉分隔，无 border）', async ({ page }) => {
    const borderWidth = await page.locator('.filter-panel').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).borderTopWidth),
    )
    expect(borderWidth).toBe(0)
  })

  test('圆角为 4px', async ({ page }) => {
    const borderRadius = await page.locator('.filter-panel').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).borderRadius),
    )
    expect(borderRadius).toBe(4)
  })

  test('有内边距（≥12px）', async ({ page }) => {
    const paddingTop = await page.locator('.filter-panel').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).paddingTop),
    )
    expect(paddingTop).toBeGreaterThanOrEqual(12)
  })

  test('行间距大于 0', async ({ page }) => {
    const gap = await page.locator('.filter-panel').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).rowGap || window.getComputedStyle(el).gap || '0'),
    )
    expect(gap).toBeGreaterThan(0)
  })

  // ── 交互行为 ──
  test('点击第 2 个分类 Toggle 切换选中，"全部"取消选中', async ({ page }) => {
    const firstToggle = page.locator('.filter-category .o-toggle').first()
    const secondToggle = page.locator('.filter-category .o-toggle').nth(1)
    await expect(firstToggle).toBeVisible()
    await secondToggle.click()
    await expect(secondToggle).toHaveClass(/o-toggle-checked/)
    await expect(firstToggle).not.toHaveClass(/o-toggle-checked/)
  })

  // ── 块的对齐 ──
  test('二级筛选行使用 align-items: center 对齐', async ({ page }) => {
    const alignItems = await page.locator('.filter-secondary').evaluate((el) =>
      window.getComputedStyle(el).alignItems,
    )
    expect(alignItems).toBe('center')
  })

  test('分类标签与筛选项垂直居中对齐（center Y 差值 <8px）', async ({ page }) => {
    const labelRect = await page.locator('.filter-category .filter-label').evaluate((el) =>
      el.getBoundingClientRect(),
    )
    const toggleRect = await page.locator('.filter-category .o-toggle').first().evaluate((el) =>
      el.getBoundingClientRect(),
    )
    const labelCenterY = (labelRect.top + labelRect.bottom) / 2
    const toggleCenterY = (toggleRect.top + toggleRect.bottom) / 2
    expect(Math.abs(labelCenterY - toggleCenterY)).toBeLessThan(8)
  })

  test('筛选标签在对应筛选控件左侧', async ({ page }) => {
    const labelRight = await page.locator('.filter-secondary .filter-label').first().evaluate((el) =>
      el.getBoundingClientRect().right,
    )
    const inputLeft = await page.locator('.filter-secondary .filter-item .o-input').first().evaluate((el) =>
      el.getBoundingClientRect().left,
    )
    expect(labelRight).toBeLessThanOrEqual(inputLeft + 1)
  })
})
