/**
 * 楼层：卡片列表 + 分页
 * 对应设计稿：3 列卡片网格 + 底部分页组件
 */
import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('卡片列表楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ── 结构与组件正确性 ──
  test('使用 OCard 组件，显示 20 张（默认 pageSize=20）', async ({ page }) => {
    await expect(page.locator('.o-card')).toHaveCount(20)
  })

  test('每张卡片有封面图区域（.o-card-cover）', async ({ page }) => {
    await expect(page.locator('.o-card .o-card-cover').first()).toBeVisible()
    const count = await page.locator('.o-card .o-card-cover').count()
    expect(count).toBe(20)
  })

  test('每张卡片有标题（.o-card-title）', async ({ page }) => {
    await expect(page.locator('.o-card .o-card-title').first()).toBeVisible()
    const count = await page.locator('.o-card .o-card-title').count()
    expect(count).toBeGreaterThanOrEqual(20)
  })

  test('使用 OPagination 组件', async ({ page }) => {
    await expect(page.locator('.o-pagination')).toBeVisible()
  })

  test('显示总条数 120', async ({ page }) => {
    await expect(page.locator('.o-pagination')).toContainText('120')
  })

  // ── 默认状态 ──
  test('初始第 1 页激活（.o-pagination-item.active）', async ({ page }) => {
    const activePage = page.locator('.o-pagination-item.active')
    await expect(activePage).toContainText('1')
  })

  test('默认每页 20 条', async ({ page }) => {
    await expect(page.locator('.o-pagination')).toContainText('20')
  })

  // ── 布局与间距 ──
  test('卡片网格为 3 列布局', async ({ page }) => {
    const grid = page.locator('.card-grid')
    await expect(grid).toBeVisible()
    // gridTemplateColumns 返回实际像素值（如 "384px 384px 384px"），3个值即为3列
    const gridStyle = await grid.evaluate((el) => window.getComputedStyle(el).gridTemplateColumns)
    const columnCount = gridStyle.trim().split(/\s+/).length
    expect(columnCount).toBe(3)
  })

  test('卡片网格间距大于 0', async ({ page }) => {
    const gap = await page.locator('.card-grid').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).columnGap || '0'),
    )
    expect(gap).toBeGreaterThan(0)
  })

  // ── 视觉样式 ──
  test('OCard 有圆角', async ({ page }) => {
    await expect(page.locator('.o-card').first()).toBeVisible()
    const borderRadius = await page.locator('.o-card').first().evaluate((el) =>
      parseFloat(window.getComputedStyle(el).borderRadius),
    )
    expect(borderRadius).toBeGreaterThan(0)
  })

  test('OCard 悬停时出现阴影（hoverable）', async ({ page }) => {
    const card = page.locator('.o-card').first()
    await expect(card).toBeVisible()
    await card.hover()
    // 等待 CSS transition 完成
    await page.waitForTimeout(300)
    const shadow = await card.evaluate((el) => window.getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  // ── 交互行为 ──
  test('点击分页第 2 页，第 2 页变为激活状态', async ({ page }) => {
    await page.locator('.o-pagination-item').filter({ hasText: '2' }).click()
    await expect(page.locator('.o-pagination-item.active')).toContainText('2')
  })

  // ── 块的对齐 ──
  test('同行前 3 张卡片顶部对齐（top 差值 ≤1px）', async ({ page }) => {
    await expect(page.locator('.o-card').first()).toBeVisible()
    const tops = await page.locator('.o-card').evaluateAll((cards) =>
      cards.slice(0, 3).map((c) => c.getBoundingClientRect().top),
    )
    expect(Math.max(...tops) - Math.min(...tops)).toBeLessThanOrEqual(1)
  })

  test('卡片网格各列宽度相等（等分 1fr）', async ({ page }) => {
    await expect(page.locator('.o-card').first()).toBeVisible()
    const widths = await page.locator('.o-card').evaluateAll((cards) =>
      cards.slice(0, 3).map((c) => Math.round(c.getBoundingClientRect().width)),
    )
    expect(new Set(widths).size).toBe(1)
  })

  test('分页组件在容器中水平居中（中心偏差 <2px）', async ({ page }) => {
    const wrap = await page.locator('.pagination-wrap').evaluate((el) => el.getBoundingClientRect())
    const pager = await page.locator('.o-pagination').evaluate((el) => el.getBoundingClientRect())
    const wrapCenter = (wrap.left + wrap.right) / 2
    const pagerCenter = (pager.left + pager.right) / 2
    expect(Math.abs(wrapCenter - pagerCenter)).toBeLessThan(2)
  })
})
