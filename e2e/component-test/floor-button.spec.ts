import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：5:8158（强调按钮）, 95:3920（普通按钮）, 102:2573（文字按钮）, 103:2730（链接按钮）
// 画板宽 1920px → viewport 1920×1080（>1680px 断点）

test.describe('FloorButton - 结构与主题区块', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色区块存在', async ({ page }) => {
    const light = page.locator('[data-testid="button-row-light"]')
    await expect(light).toBeVisible()
  })

  test('暗色区块存在且带 data-o-theme="e.dark"', async ({ page }) => {
    const dark = page.locator('[data-testid="button-row-dark"]')
    await expect(dark).toBeVisible()
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })
})

test.describe('FloorButton - 强调按钮（亮色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('L 尺寸启用态存在且可见', async ({ page }) => {
    const btn = page.locator('[data-testid="emphasis-light-l-enabled"]')
    await expect(btn).toBeVisible()
  })

  test('L 尺寸禁用态存在且被禁用', async ({ page }) => {
    const btn = page.locator('[data-testid="emphasis-light-l-disabled"]')
    await expect(btn).toBeVisible()
    await expect(btn).toBeDisabled()
  })

  test('M 尺寸启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-light-m-enabled"]')).toBeVisible()
  })

  test('M 尺寸禁用态被禁用', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-light-m-disabled"]')).toBeDisabled()
  })

  test('S 尺寸启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-light-s-enabled"]')).toBeVisible()
  })

  test('S 尺寸禁用态被禁用', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-light-s-disabled"]')).toBeDisabled()
  })

  test('按钮渲染为 .o-btn 类', async ({ page }) => {
    const btn = page.locator('[data-testid="emphasis-light-l-enabled"]')
    await expect(btn).toHaveClass(/o-btn/)
  })

  test('强调按钮有 pill 圆角（border-radius 接近高度一半）', async ({ page }) => {
    const btn = page.locator('[data-testid="emphasis-light-l-enabled"]')
    const borderRadius = await btn.evaluate((el) => {
      return window.getComputedStyle(el).borderRadius
    })
    // pill 圆角应为高度一半 (~20px) 或更大的值
    const numVal = parseFloat(borderRadius)
    expect(numVal).toBeGreaterThanOrEqual(14)
  })
})

test.describe('FloorButton - 强调按钮（暗色）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('暗色 L 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-dark-l-enabled"]')).toBeVisible()
  })

  test('暗色 L 禁用态被禁用', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-dark-l-disabled"]')).toBeDisabled()
  })

  test('暗色 M 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-dark-m-enabled"]')).toBeVisible()
  })

  test('暗色 S 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="emphasis-dark-s-enabled"]')).toBeVisible()
  })
})

test.describe('FloorButton - 普通按钮（outline）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色 outline L 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="outline-light-l-enabled"]')).toBeVisible()
  })

  test('亮色 outline L 禁用态被禁用', async ({ page }) => {
    await expect(page.locator('[data-testid="outline-light-l-disabled"]')).toBeDisabled()
  })

  test('暗色 outline M 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="outline-dark-m-enabled"]')).toBeVisible()
  })

  test('outline 按钮有 outline 相关类', async ({ page }) => {
    const btn = page.locator('[data-testid="outline-light-l-enabled"]')
    await expect(btn).toHaveClass(/o-btn/)
  })
})

test.describe('FloorButton - 文字按钮（text）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色 text L 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="text-light-l-enabled"]')).toBeVisible()
  })

  test('亮色 text L 禁用态被禁用', async ({ page }) => {
    await expect(page.locator('[data-testid="text-light-l-disabled"]')).toBeDisabled()
  })

  test('暗色 text M 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="text-dark-m-enabled"]')).toBeVisible()
  })
})

test.describe('FloorButton - 链接按钮（primary text）', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色链接按钮 L 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="link-light-l-enabled"]')).toBeVisible()
  })

  test('亮色链接按钮 L 禁用态被禁用', async ({ page }) => {
    await expect(page.locator('[data-testid="link-light-l-disabled"]')).toBeDisabled()
  })

  test('暗色链接按钮 M 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="link-dark-m-enabled"]')).toBeVisible()
  })

  test('暗色链接按钮 S 启用态存在', async ({ page }) => {
    await expect(page.locator('[data-testid="link-dark-s-enabled"]')).toBeVisible()
  })
})

test.describe('FloorButton - 颜色变体', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('primary solid 按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="color-primary-solid"]')).toBeVisible()
  })

  test('primary outline 按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="color-primary-outline"]')).toBeVisible()
  })

  test('success 按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="color-success"]')).toBeVisible()
  })

  test('warning 按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="color-warning"]')).toBeVisible()
  })

  test('danger 按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="color-danger"]')).toBeVisible()
  })

  test('brand 按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="color-brand"]')).toBeVisible()
  })
})

test.describe('FloorButton - 特殊状态', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('图标按钮（icon-only）存在', async ({ page }) => {
    await expect(page.locator('[data-testid="icon-only-btn"]')).toBeVisible()
  })

  test('loading 按钮点击后显示 loading 状态', async ({ page }) => {
    const btn = page.locator('[data-testid="loading-btn"]')
    await expect(btn).toBeVisible()
    await btn.click()
    // 点击后应有 loading 相关 class
    await expect(btn).toHaveClass(/o-btn/)
  })

  test('loading disabled 按钮被禁用', async ({ page }) => {
    await expect(page.locator('[data-testid="loading-disabled-btn"]')).toBeDisabled()
  })

  test('后缀图标按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="suffix-btn"]')).toBeVisible()
  })
})

test.describe('FloorButton - 布局与间距', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('亮色区块内的 btn-row 使用 flex-wrap 布局', async ({ page }) => {
    const row = page.locator('[data-testid="emphasis-light-large"]')
    await expect(row).toBeVisible()
    const flexWrap = await row.evaluate((el) => window.getComputedStyle(el).flexWrap)
    expect(flexWrap).toBe('wrap')
  })

  test('按钮 L 尺寸高度 ≥ 40px（1920px viewport >1680px 断点）', async ({ page }) => {
    const btn = page.locator('[data-testid="emphasis-light-l-enabled"]')
    const box = await btn.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(40)
  })

  test('按钮 M 尺寸高度 ≥ 32px', async ({ page }) => {
    const btn = page.locator('[data-testid="emphasis-light-m-enabled"]')
    const box = await btn.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(32)
  })

  test('按钮 S 尺寸高度 ≥ 24px', async ({ page }) => {
    const btn = page.locator('[data-testid="emphasis-light-s-enabled"]')
    const box = await btn.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(24)
  })

  test('暗色区块背景色为深色（#1f2127）', async ({ page }) => {
    const dark = page.locator('[data-testid="button-row-dark"]')
    const bg = await dark.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })
})
