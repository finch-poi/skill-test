/**
 * 跨楼层：页面整体布局、相对位置、响应式 CSS 变量、全局元素
 * 包含：Header/Footer、楼层间位置关系、主内容区约束、响应式 token 验证
 */
import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('页面整体布局', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ── 全局元素 ──
  test('Header 导航栏可见', async ({ page }) => {
    await expect(page.locator('.app-header')).toBeVisible()
  })

  test('页脚可见', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible()
  })

  // ── 相对位置关系（楼层间顺序） ──
  test('Banner 在锚点导航上方', async ({ page }) => {
    const bannerBottom = await page.locator('.banner-carousel').evaluate((el) => el.getBoundingClientRect().bottom)
    const anchorTop = await page.locator('.anchor-nav-wrap').evaluate((el) => el.getBoundingClientRect().top)
    expect(bannerBottom).toBeLessThanOrEqual(anchorTop + 1)
  })

  test('锚点导航在筛选面板上方', async ({ page }) => {
    const anchorBottom = await page.locator('.anchor-nav-wrap').evaluate((el) => el.getBoundingClientRect().bottom)
    const filterTop = await page.locator('.filter-panel').evaluate((el) => el.getBoundingClientRect().top)
    expect(anchorBottom).toBeLessThanOrEqual(filterTop + 1)
  })

  test('筛选面板在卡片网格上方', async ({ page }) => {
    const filterBottom = await page.locator('.filter-panel').evaluate((el) => el.getBoundingClientRect().bottom)
    const gridTop = await page.locator('.card-grid').evaluate((el) => el.getBoundingClientRect().top)
    expect(filterBottom).toBeLessThanOrEqual(gridTop + 1)
  })

  test('卡片网格在分页上方', async ({ page }) => {
    const gridBottom = await page.locator('.card-grid').evaluate((el) => el.getBoundingClientRect().bottom)
    const paginationTop = await page.locator('.o-pagination').evaluate((el) => el.getBoundingClientRect().top)
    expect(gridBottom).toBeLessThanOrEqual(paginationTop + 1)
  })

  // ── 布局约束 ──
  test('主内容区宽度有最大限制（内容区 max-width:1488px，不超过 1500px）', async ({ page }) => {
    const width = await page.locator('.main-content').evaluate((el) => el.getBoundingClientRect().width)
    // max-width:1488px，padding:0 → 总可见宽度 ≤1488px
    // 验证内容区是被约束的（远小于 1920px 视口宽度）
    expect(width).toBeLessThanOrEqual(1500)
    expect(width).toBeLessThan(1920)
  })

  // ── 响应式 CSS 变量（间距来自 token，不硬编码 px） ──
  test('卡片网格 gap 大于 0（间距来自 CSS 变量）', async ({ page }) => {
    await expect(page.locator('.card-grid')).toBeVisible()
    const gap = await page.locator('.card-grid').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).columnGap || '0'),
    )
    expect(gap).toBeGreaterThan(0)
  })

  test('主内容区有垂直方向内边距', async ({ page }) => {
    const paddingTop = await page.locator('.main-content').evaluate((el) =>
      parseFloat(window.getComputedStyle(el).paddingTop),
    )
    expect(paddingTop).toBeGreaterThan(0)
  })
})
