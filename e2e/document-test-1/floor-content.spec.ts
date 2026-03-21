import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('document-test-1 内容区楼层', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  // 维度1：结构与组件正确性
  test('成功消息提示可见', async ({ page }) => {
    // DSL: OMessage status="success" closable, duration=5000
    await expect(page.locator('.o-message-success')).toBeVisible()
    await expect(page.locator('.o-message-success')).toHaveClass(/o-message-success/)
  })

  test('消息提示包含正确文字', async ({ page }) => {
    await expect(page.locator('.o-message-success')).toContainText('用于表示操作顺利达成')
  })

  test('消息提示有关闭按钮', async ({ page }) => {
    await expect(page.locator('.o-message-success .o-message-close')).toBeVisible()
  })

  test('面包屑导航可见', async ({ page }) => {
    await expect(page.locator('.content-breadcrumb')).toBeVisible()
    await expect(page.locator('.content-breadcrumb')).toContainText('文档中心')
    await expect(page.locator('.content-breadcrumb')).toContainText('虚拟化')
    await expect(page.locator('.content-breadcrumb')).toContainText('配置虚拟机设备')
  })

  test('页面标题"配置虚拟设备"可见', async ({ page }) => {
    await expect(page.locator('.page-title')).toBeVisible()
    await expect(page.locator('.page-title')).toContainText('配置虚拟设备')
  })

  test('链接按钮可见', async ({ page }) => {
    await expect(page.locator('.title-actions .o-link')).toBeVisible()
    await expect(page.locator('.title-actions .o-link')).toContainText('链接按钮')
  })

  test('装饰性 banner 图片区域可见', async ({ page }) => {
    await expect(page.locator('.banner-area')).toBeVisible()
  })

  test('存储设备章节标题可见', async ({ page }) => {
    await expect(page.locator('.section-heading').first()).toContainText('存储设备')
  })

  test('包含 OMessage info 提示框', async ({ page }) => {
    await expect(page.locator('.o-message-info')).toBeVisible()
  })

  test('元素介绍章节标题可见', async ({ page }) => {
    await expect(page.locator('.subsection-heading').first()).toContainText('元素介绍')
  })

  test('表1标题可见', async ({ page }) => {
    await expect(page.locator('.table-caption').first()).toContainText('表1：元素disk的常用属性')
  })

  test('第一个数据表格使用 ODataTable 组件', async ({ page }) => {
    await expect(page.locator('.o-data-table').first()).toBeVisible()
  })

  test('表1有2行数据', async ({ page }) => {
    await expect(page.locator('.o-data-table').first().locator('.o-table-body-row').first()).toBeVisible()
    const rows = await page.locator('.o-data-table').first().locator('.o-table-body-row').count()
    expect(rows).toBe(2)
  })

  test('代码块可见且包含 XML 内容', async ({ page }) => {
    await expect(page.locator('.code-block')).toBeVisible()
    await expect(page.locator('.code-block')).toContainText('domain')
  })

  test('配置示例章节标题可见', async ({ page }) => {
    await expect(page.locator('.subsection-heading').last()).toContainText('配置示例')
  })

  test('参数说明章节标题可见', async ({ page }) => {
    const headings = page.locator('.section-heading')
    await expect(headings.last()).toContainText('参数说明')
  })

  test('表2有4行数据', async ({ page }) => {
    await expect(page.locator('.o-data-table').last().locator('.o-table-body-row').first()).toBeVisible()
    const rows = await page.locator('.o-data-table').last().locator('.o-table-body-row').count()
    expect(rows).toBe(4)
  })

  test('右侧悬浮按钮可见', async ({ page }) => {
    await expect(page.locator('.floating-actions')).toBeVisible()
    const buttons = page.locator('.floating-actions .action-btn')
    await expect(buttons).toHaveCount(3)
  })

  // 维度4：视觉样式
  test('页面标题字号大于等于24px', async ({ page }) => {
    // DSL: page-title font-size = var(--o-r-font_size-h2) ≈ 28px at widescreen
    const fontSize = await page.locator('.page-title').evaluate(
      el => parseFloat(window.getComputedStyle(el).fontSize)
    )
    // DSL node: page title, fontSize ≥ 24px at widescreen
    expect(fontSize).toBeGreaterThanOrEqual(24)
  })

  test('banner 区域高度为 160px', async ({ page }) => {
    // DSL: banner-area height = 160px
    const height = await page.locator('.banner-area').evaluate(
      el => el.getBoundingClientRect().height
    )
    expect(height).toBe(160)
  })

  test('banner 背景为蓝色渐变', async ({ page }) => {
    // DSL: banner background = linear-gradient(90deg, #1a3d87...)
    const bg = await page.locator('.banner-area').evaluate(
      el => window.getComputedStyle(el).backgroundImage
    )
    expect(bg).toContain('gradient')
  })

  // 维度5：交互行为
  test('关闭消息按钮可点击', async ({ page }) => {
    await page.locator('.o-message-success .o-message-close').click()
    // 消息关闭后不可见
    await expect(page.locator('.o-message.o-message-success')).not.toBeVisible()
  })

  // 维度6：相对位置
  test('消息在面包屑上方', async ({ page }) => {
    const messageBottom = await page.locator('.content-message').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const breadcrumbTop = await page.locator('.content-breadcrumb').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(messageBottom).toBeLessThanOrEqual(breadcrumbTop + 1)
  })

  test('页面标题在 banner 上方', async ({ page }) => {
    const titleBottom = await page.locator('.page-title-area').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const bannerTop = await page.locator('.banner-area').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(titleBottom).toBeLessThanOrEqual(bannerTop + 1)
  })

  // 维度4：视觉样式补充 - 各主要块背景色/边框/圆角
  test('banner 有圆角（≥4px）', async ({ page }) => {
    // DSL: banner cornerRadius = var(--o-radius-m)
    const radius = await page.locator('.banner-area').evaluate(
      el => parseFloat(window.getComputedStyle(el).borderRadius)
    )
    expect(radius).toBeGreaterThanOrEqual(4)
  })

  test('代码块有背景色（非透明非纯白）', async ({ page }) => {
    // DSL: code-block background = var(--o-color-fill2) 浅灰
    const bg = await page.locator('.code-block').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    expect(bg).not.toBe('rgb(255, 255, 255)')
  })

  test('代码块有圆角', async ({ page }) => {
    // DSL: code-block border-radius = var(--o-radius-xs)
    const radius = await page.locator('.code-block').evaluate(
      el => parseFloat(window.getComputedStyle(el).borderRadius)
    )
    expect(radius).toBeGreaterThan(0)
  })

  test('章节标题有上边框分隔线', async ({ page }) => {
    // DSL: section-heading border-top 分隔章节
    const borderWidth = await page.locator('.section-heading').first().evaluate(
      el => parseFloat(window.getComputedStyle(el).borderTopWidth)
    )
    expect(borderWidth).toBeGreaterThan(0)
  })

  test('悬浮操作按钮使用 OButton 组件（非原生 button）', async ({ page }) => {
    // DSL: floating action buttons → OButton variant="outline"
    await expect(page.locator('.floating-actions .o-btn').first()).toBeVisible()
    await expect(page.locator('.floating-actions .o-btn')).toHaveCount(3)
  })

  test('悬浮操作按钮有边框', async ({ page }) => {
    // DSL: OButton variant="outline" → 有边框
    const borderWidth = await page.locator('.floating-actions .o-btn').first().evaluate(
      el => parseFloat(window.getComputedStyle(el).borderWidth)
    )
    expect(borderWidth).toBeGreaterThan(0)
  })
})
