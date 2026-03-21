import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('document-test-1 侧边栏楼层', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  // 维度1：结构与组件正确性
  test('侧边栏可见', async ({ page }) => {
    await expect(page.locator('.doc-sidebar')).toBeVisible()
  })

  test('版本选择器可见', async ({ page }) => {
    // DSL: version bar with two OSelect
    await expect(page.locator('.version-bar')).toBeVisible()
    await expect(page.locator('.version-bar .o-select').first()).toBeVisible()
  })

  test('搜索框可见', async ({ page }) => {
    await expect(page.locator('.search-area .o-input')).toBeVisible()
  })

  test('使用 OMenu 组件', async ({ page }) => {
    await expect(page.locator('.o-menu')).toBeVisible()
  })

  test('菜单包含"配置虚拟机设备"选中项', async ({ page }) => {
    // DSL: item-config is the active/selected menu item
    const selectedItem = page.locator('.o-menu-item.o-menu-item-selected')
    await expect(selectedItem).toBeVisible()
    await expect(selectedItem).toContainText('配置虚拟机设备')
  })

  test('菜单包含"准备使用环境"子菜单（展开状态）', async ({ page }) => {
    await expect(page.locator('.o-menu')).toContainText('准备使用环境')
    await expect(page.locator('.o-menu')).toContainText('配置虚拟机设备')
  })

  test('相关文档分区可见', async ({ page }) => {
    await expect(page.locator('.divider-label')).toContainText('相关文档')
  })

  // 维度2：默认状态正确性
  test('版本选择器默认值为"虚拟化"和"25.09"', async ({ page }) => {
    const versionBar = page.locator('.version-bar')
    await expect(versionBar).toContainText('虚拟化')
    await expect(versionBar).toContainText('25.09')
  })

  // 维度3：布局
  test('侧边栏宽度约为336px', async ({ page }) => {
    // DSL: sidebar width = 336px
    const width = await page.locator('.doc-sidebar').evaluate(
      el => el.getBoundingClientRect().width
    )
    expect(width).toBeCloseTo(336, -1) // -1 = tolerance ±5px
  })

  // 维度6：相对位置
  test('侧边栏在内容区左侧', async ({ page }) => {
    const sidebarRight = await page.locator('.doc-sidebar').evaluate(
      el => el.getBoundingClientRect().right
    )
    const contentLeft = await page.locator('.doc-content').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(sidebarRight).toBeLessThanOrEqual(contentLeft + 2)
  })

  // 维度4：视觉样式 - 背景色与阴影
  test('侧边栏背景色有蓝色调（非纯白）', async ({ page }) => {
    // DSL: 矩形2 fillPaints = rgba(235,241,250,0.4) 蓝色浅调
    const bg = await page.locator('.doc-sidebar').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    // 不应该是纯白
    expect(bg).not.toBe('rgb(255, 255, 255)')
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    // 蓝色通道应高于红色通道（蓝色调）
    const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (match) {
      const [, r, , b] = match.map(Number)
      expect(b).toBeGreaterThan(r)
    }
  })

  test('内容区背景色为白色', async ({ page }) => {
    // DSL: 右侧内容区 背景白色
    const bg = await page.locator('.doc-content').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).toBe('rgb(255, 255, 255)')
  })
})
