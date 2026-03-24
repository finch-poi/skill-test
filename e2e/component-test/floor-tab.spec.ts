import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：5:4374（页签）
// 画板宽 1920px → viewport 1920×1080（>1680px 断点）

test.describe('FloorTab - 结构与主题区块', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色区块存在', async ({ page }) => {
    const light = page.locator('[data-testid="tab-row-light"]')
    await expect(light).toBeVisible()
  })

  test('暗色区块存在且带 data-o-theme="e.dark"', async ({ page }) => {
    const dark = page.locator('[data-testid="tab-row-dark"]')
    await expect(dark).toBeVisible()
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })
})

test.describe('FloorTab - Text 变体（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('Large text 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-text-large-light"]')
    await expect(tab).toBeVisible()
  })

  test('Medium text 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-text-medium-light"]')
    await expect(tab).toBeVisible()
  })

  test('Small text 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-text-small-light"]')
    await expect(tab).toBeVisible()
  })

  test('Text 页签渲染为 .o-tab 类', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-text-large-light"]')
    await expect(tab).toHaveClass(/o-tab/)
  })
})

test.describe('FloorTab - Solid 变体（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('Large solid 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-solid-large-light"]')
    await expect(tab).toBeVisible()
  })

  test('Medium solid 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-solid-medium-light"]')
    await expect(tab).toBeVisible()
  })

  test('Small solid 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-solid-small-light"]')
    await expect(tab).toBeVisible()
  })
})

test.describe('FloorTab - Button 变体（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('Large button 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-button-large-light"]')
    await expect(tab).toBeVisible()
  })

  test('Medium button 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-button-medium-light"]')
    await expect(tab).toBeVisible()
  })

  test('Small button 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-button-small-light"]')
    await expect(tab).toBeVisible()
  })
})

test.describe('FloorTab - 自定义导航', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色自定义导航页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-custom-nav-light"]')
    await expect(tab).toBeVisible()
  })

  test('暗色自定义导航页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-custom-nav-dark"]')
    await expect(tab).toBeVisible()
  })
})

test.describe('FloorTab - 导航栏左对齐', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色左对齐页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-align-left-light"]')
    await expect(tab).toBeVisible()
  })

  test('暗色左对齐页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-align-left-dark"]')
    await expect(tab).toBeVisible()
  })

  test('亮色左对齐导航栏 justify-content: flex-start', async ({ page }) => {
    const navs = page.locator('[data-testid="tab-align-left-light"] .o-tab-navs').first()
    const jc = await navs.evaluate((el) => window.getComputedStyle(el).justifyContent)
    expect(jc).toBe('flex-start')
  })

  test('暗色左对齐导航栏 justify-content: flex-start', async ({ page }) => {
    const navs = page.locator('[data-testid="tab-align-left-dark"] .o-tab-navs').first()
    const jc = await navs.evaluate((el) => window.getComputedStyle(el).justifyContent)
    expect(jc).toBe('flex-start')
  })
})

test.describe('FloorTab - 暗色主题', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('暗色 text large 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-text-large-dark"]')
    await expect(tab).toBeVisible()
  })

  test('暗色 solid medium 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-solid-medium-dark"]')
    await expect(tab).toBeVisible()
  })

  test('暗色 button small 页签存在', async ({ page }) => {
    const tab = page.locator('[data-testid="tab-button-small-dark"]')
    await expect(tab).toBeVisible()
  })
})

test.describe('FloorTab - 布局与间距', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('tab-row 使用 flex 布局', async ({ page }) => {
    const row = page.locator('[data-testid="tab-row-light"] .tab-row').first()
    await expect(row).toBeVisible()
    const display = await row.evaluate((el) => window.getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('暗色区块背景色为深色（#1f2127）', async ({ page }) => {
    const dark = page.locator('[data-testid="tab-row-dark"]')
    const bg = await dark.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })
})
