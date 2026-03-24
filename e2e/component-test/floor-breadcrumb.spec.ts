import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：201:3927（Pixso item-id，面包屑）
// 画板宽度：622px（StateGroup），组件宽度：454px，视口设为 1920px（>laptop 断点）

test.describe('FloorBreadcrumb 面包屑楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // 维度 1：结构与组件正确性
  test('1. 渲染 Light 和 Dark 两个主题区块', async ({ page }) => {
    await expect(page.getByTestId('breadcrumb-row-light')).toBeVisible()
    await expect(page.getByTestId('breadcrumb-row-dark')).toBeVisible()
  })

  test('2. 每个区块内包含 OBreadcrumb 组件', async ({ page }) => {
    const lightSection = page.getByTestId('breadcrumb-row-light')
    const darkSection = page.getByTestId('breadcrumb-row-dark')

    await expect(lightSection.locator('.o-breadcrumb').first()).toBeVisible()
    await expect(darkSection.locator('.o-breadcrumb').first()).toBeVisible()
  })

  // 维度 2：默认状态正确性
  test('3. 面包屑共 6 个面包屑项（Light）', async ({ page }) => {
    const lightBreadcrumb = page
      .getByTestId('breadcrumb-row-light')
      .locator('.o-breadcrumb')
      .first()
    await expect(lightBreadcrumb).toBeVisible()
    const items = lightBreadcrumb.locator('.o-breadcrumb-item')
    await expect(items).toHaveCount(6)
  })

  test('4. 面包屑共 6 个面包屑项（Dark）', async ({ page }) => {
    const darkBreadcrumb = page.getByTestId('breadcrumb-row-dark').locator('.o-breadcrumb').first()
    await expect(darkBreadcrumb).toBeVisible()
    const items = darkBreadcrumb.locator('.o-breadcrumb-item')
    await expect(items).toHaveCount(6)
  })

  test('5. 面包屑项文本内容正确（Light）', async ({ page }) => {
    const lightSection = page.getByTestId('breadcrumb-row-light')
    await expect(lightSection).toContainText('首页')
    await expect(lightSection).toContainText('一级页面')
    await expect(lightSection).toContainText('二级页面')
    await expect(lightSection).toContainText('三级页面')
    await expect(lightSection).toContainText('四级页')
    await expect(lightSection).toContainText('当前页面')
  })

  test('6. 面包屑项文本内容正确（Dark）', async ({ page }) => {
    const darkSection = page.getByTestId('breadcrumb-row-dark')
    await expect(darkSection).toContainText('首页')
    await expect(darkSection).toContainText('一级页面')
    await expect(darkSection).toContainText('二级页面')
    await expect(darkSection).toContainText('三级页面')
    await expect(darkSection).toContainText('四级页')
    await expect(darkSection).toContainText('当前页面')
  })

  // 维度 3：布局与间距
  test('7. 面包屑水平排列（flex row）', async ({ page }) => {
    const breadcrumb = page.getByTestId('breadcrumb-row-light').locator('.o-breadcrumb').first()
    const display = await breadcrumb.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const flexDirection = await breadcrumb.evaluate((el) => getComputedStyle(el).flexDirection)
    // OBreadcrumb 默认水平（row）排列
    expect(['row', 'row-reverse']).toContain(flexDirection)
  })

  // 维度 4：视觉样式（DSL 溯源）
  test('8. 前 5 项（可点击链接）渲染为 <a> 标签', async ({ page }) => {
    // DSL: href 项 → 渲染为 <a> 标签
    const lightBreadcrumb = page
      .getByTestId('breadcrumb-row-light')
      .locator('.o-breadcrumb')
      .first()
    await expect(lightBreadcrumb).toBeVisible()
    const links = lightBreadcrumb.locator('a.o-breadcrumb-item-label')
    // 5 个有 href 的 item
    await expect(links).toHaveCount(5)
  })

  test('9. 最后一项（当前页面）渲染为 <span>（无 href）', async ({ page }) => {
    // DSL: 末尾 item 不设 href → 渲染为 span
    const lightBreadcrumb = page
      .getByTestId('breadcrumb-row-light')
      .locator('.o-breadcrumb')
      .first()
    await expect(lightBreadcrumb).toBeVisible()
    const lastItem = lightBreadcrumb.locator('.o-breadcrumb-item').last()
    // 最后一项的 label 是 span，不是 a
    const span = lastItem.locator('span.o-breadcrumb-item-label')
    await expect(span.first()).toBeVisible()
  })

  // 维度 5：相对位置关系
  test('10. Dark 区块有深色背景', async ({ page }) => {
    // DSL: Dark=on 区块背景 #1f2127
    const darkSection = page.getByTestId('breadcrumb-row-dark')
    const bg = await darkSection.evaluate((el) => getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('11. Dark 区块有 data-o-theme="e.dark" 属性', async ({ page }) => {
    const darkSection = page.getByTestId('breadcrumb-row-dark')
    await expect(darkSection).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('12. Light 区块无暗色背景（默认白色背景）', async ({ page }) => {
    // Light 主题区块使用 box-shadow（不设 background），应为透明或白色
    const lightSection = page.getByTestId('breadcrumb-row-light')
    const bg = await lightSection.evaluate((el) => getComputedStyle(el).backgroundColor)
    // 不应为暗色背景 rgb(31,33,39)
    expect(bg).not.toBe('rgb(31, 33, 39)')
  })

  // 维度 6：楼层标题结构
  test('13. AppSection 标题为 OBreadcrumb 面包屑', async ({ page }) => {
    // AppSection 标题包含文字
    await expect(
      page
        .locator('.section-title, .o-section-title, h2')
        .filter({ hasText: 'OBreadcrumb 面包屑' })
        .first(),
    ).toBeVisible()
  })

  // 维度 7：分隔符存在
  test('14. 面包屑项之间有分隔符', async ({ page }) => {
    // DSL: 使用默认箭头图标分隔符（OBreadcrumb 默认）
    const lightBreadcrumb = page
      .getByTestId('breadcrumb-row-light')
      .locator('.o-breadcrumb')
      .first()
    await expect(lightBreadcrumb).toBeVisible()
    const separators = lightBreadcrumb.locator('.o-breadcrumb-item-separator')
    // 6 个 item 有 6 个 separator 区域（最后一个隐藏）
    const count = await separators.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })

  // 维度 8：内容区有背景（面包屑演示包装）
  test('15. 面包屑演示区有白色背景包装', async ({ page }) => {
    const lightWrap = page
      .getByTestId('breadcrumb-row-light')
      .locator('.breadcrumb-demo-wrap')
      .first()
    await expect(lightWrap).toBeVisible()
    const bg = await lightWrap.evaluate((el) => getComputedStyle(el).backgroundColor)
    // var(--o-color-fill2) = rgb(255,255,255) in light theme
    expect(bg).toBe('rgb(255, 255, 255)')
  })
})
