import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：16:4574（进度条）
// 画板宽 1920px → viewport 1920×1080（>1680px 断点）

test.describe('FloorProgress - 结构与主题区块', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色区块存在', async ({ page }) => {
    const light = page.locator('[data-testid="progress-row-light"]')
    await expect(light).toBeVisible()
  })

  test('暗色区块存在且带 data-o-theme="e.dark"', async ({ page }) => {
    const dark = page.locator('[data-testid="progress-row-dark"]')
    await expect(dark).toBeVisible()
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })
})

test.describe('FloorProgress - 线形进度条（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('Primary 线形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-primary-light"]')
    await expect(progress).toBeVisible()
  })

  test('Success 线形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-success-light"]')
    await expect(progress).toBeVisible()
  })

  test('Warning 线形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-warning-light"]')
    await expect(progress).toBeVisible()
  })

  test('Danger 线形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-danger-light"]')
    await expect(progress).toBeVisible()
  })

  test('进度条渲染为 .o-progress 类', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-primary-light"]')
    await expect(progress).toHaveClass(/o-progress/)
  })
})

test.describe('FloorProgress - 小号线形（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('小号 Primary 进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-small-primary-light"]')
    await expect(progress).toBeVisible()
  })

  test('小号 Success 进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-small-success-light"]')
    await expect(progress).toBeVisible()
  })
})

test.describe('FloorProgress - 内部文字（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('内部文字 Primary 进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-inside-primary-light"]')
    await expect(progress).toBeVisible()
  })

  test('内部文字 Success 进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-inside-success-light"]')
    await expect(progress).toBeVisible()
  })
})

test.describe('FloorProgress - 环形进度条（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('Primary 环形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-primary-light"]')
    await expect(progress).toBeVisible()
  })

  test('Success 环形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-success-light"]')
    await expect(progress).toBeVisible()
  })

  test('Warning 环形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-warning-light"]')
    await expect(progress).toBeVisible()
  })

  test('Danger 环形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-danger-light"]')
    await expect(progress).toBeVisible()
  })

  test('环形进度条包含 SVG', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-primary-light"]')
    const svg = progress.locator('svg')
    await expect(svg).toBeVisible()
  })
})

test.describe('FloorProgress - 小环形（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('小号 Primary 环形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-small-primary-light"]')
    await expect(progress).toBeVisible()
  })

  test('小号 Danger 环形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-small-danger-light"]')
    await expect(progress).toBeVisible()
  })
})

test.describe('FloorProgress - 暗色主题', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('暗色线形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-line-primary-dark"]')
    await expect(progress).toBeVisible()
  })

  test('暗色环形进度条存在', async ({ page }) => {
    const progress = page.locator('[data-testid="progress-circle-primary-dark"]')
    await expect(progress).toBeVisible()
  })
})

test.describe('FloorProgress - 布局与间距', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('progress-row 使用 flex 布局', async ({ page }) => {
    const row = page.locator('[data-testid="progress-row-light"] .progress-row').first()
    await expect(row).toBeVisible()
    const display = await row.evaluate((el) => window.getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('暗色区块背景色为深色（#1f2127）', async ({ page }) => {
    const dark = page.locator('[data-testid="progress-row-dark"]')
    const bg = await dark.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })
})
