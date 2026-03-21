import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('form-test-1 步骤条楼层', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  // 维度1：结构与组件正确性
  test('面包屑导航可见且包含"当前页面"', async ({ page }) => {
    const breadcrumb = page.locator('.o-breadcrumb')
    await expect(breadcrumb).toBeVisible()
    await expect(breadcrumb).toContainText('当前页面')
  })

  test('面包屑包含6个导航项', async ({ page }) => {
    await expect(page.locator('.o-breadcrumb-item')).toHaveCount(6)
  })

  test('使用 OStep 步骤条组件', async ({ page }) => {
    await expect(page.locator('.o-step')).toBeVisible()
  })

  test('步骤条有3个步骤项', async ({ page }) => {
    await expect(page.locator('.o-step-item')).toHaveCount(3)
  })

  // 维度2：默认状态正确性
  test('第1步状态为 finished（已完成）', async ({ page }) => {
    // DSL: Step 1 status=finished，不传 icon → .o-step-item-finished
    await expect(page.locator('.o-step-item').nth(0)).toHaveClass(/o-step-item-finished/)
  })

  test('第1步圆圈内显示序号"1"而非勾选图标', async ({ page }) => {
    // DSL: 设计图 Step 1 圆圈内显示数字 "1"
    // icon=true 会在圆圈内渲染 SVG 图标（finished→✓），不传 icon 则显示序号
    // ⚠️ 禁止对 finished 步骤使用 icon=true，除非设计图明确要求勾选图标
    const svgCount = await page.locator('.o-step-item').nth(0).locator('svg').count()
    expect(svgCount).toBe(0)
  })

  test('第2步状态为 processing（进行中）', async ({ page }) => {
    // DSL: Step 2 status=processing → .o-step-item-processing
    await expect(page.locator('.o-step-item').nth(1)).toHaveClass(/o-step-item-processing/)
  })

  test('第3步状态为 waiting（未开始）', async ({ page }) => {
    // DSL: Step 3 status=waiting → .o-step-item-waiting
    await expect(page.locator('.o-step-item').nth(2)).toHaveClass(/o-step-item-waiting/)
  })

  test('步骤标题文字正确', async ({ page }) => {
    const items = page.locator('.o-step-item')
    await expect(items.nth(0)).toContainText('已完成的步骤')
    await expect(items.nth(1)).toContainText('进行中的步骤')
    await expect(items.nth(2)).toContainText('未开始的步骤')
  })

  // 维度6：相对位置 - 面包屑在步骤条上方
  test('面包屑在步骤条上方', async ({ page }) => {
    // DSL: breadcrumb top=0, step below breadcrumb
    const breadcrumbBottom = await page.locator('.o-breadcrumb').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const stepTop = await page.locator('.o-step').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(breadcrumbBottom).toBeLessThanOrEqual(stepTop + 1)
  })

  // 维度4：视觉样式 - 页面与卡片背景色
  test('页面背景色为灰色（fill1，非纯白）', async ({ page }) => {
    // DSL: 页面背景 var(--o-color-fill1) ≈ 不是纯白 #ffffff
    const bg = await page.locator('.page').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).not.toBe('rgb(255, 255, 255)')
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
  })

  test('内容卡片背景色为白色', async ({ page }) => {
    // DSL: 画板 378 fillPaints = rgba(255,255,255,1)
    const bg = await page.locator('.content-card').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  test('内容卡片有圆角（≥4px）', async ({ page }) => {
    // DSL: 画板 378 cornerRadius = 4
    const radius = await page.locator('.content-card').evaluate(
      el => parseFloat(window.getComputedStyle(el).borderRadius)
    )
    expect(radius).toBeGreaterThanOrEqual(4)
  })

  test('面包屑在卡片外（灰色背景上）', async ({ page }) => {
    // 面包屑的顶部 y < 内容卡片的顶部 y
    const breadcrumbTop = await page.locator('.o-breadcrumb').evaluate(
      el => el.getBoundingClientRect().top
    )
    const cardTop = await page.locator('.content-card').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(breadcrumbTop).toBeLessThan(cardTop)
  })
})
