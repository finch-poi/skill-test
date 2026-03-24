import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：114:3012, 114:3005, 16:4646（标签 FloorTag）
// 视口宽度 1920px（>1680 widescreen 断点）

test.describe('FloorTag · 结构与组件正确性', () => {
  test('light 和 dark 主题区块都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-row-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-row-dark"]')).toBeVisible()
  })

  test('dark 区块带有 data-o-theme="e.dark" 属性', async ({ page }) => {
    await gotoPage(page)
    const darkSection = page.locator('[data-testid="tag-row-dark"]')
    await expect(darkSection).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('light 状态标签各 size 行都渲染了 OTag', async ({ page }) => {
    await gotoPage(page)
    // L size row
    const lRow = page.locator('[data-testid="tag-status-light-l"]')
    await expect(lRow).toBeVisible()
    await expect(lRow.locator('.o-tag')).toHaveCount(6)
    // M size row
    const mRow = page.locator('[data-testid="tag-status-light-m"]')
    await expect(mRow.locator('.o-tag')).toHaveCount(6)
    // S size row
    const sRow = page.locator('[data-testid="tag-status-light-s"]')
    await expect(sRow.locator('.o-tag')).toHaveCount(4)
  })

  test('light 信息标签实心/描边/带图标/可关闭区块都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-info-solid-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-outline-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-icon-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-closable-light"]')).toBeVisible()
  })

  test('light 运营标签单色/渐变色/自定颜色区块都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-op-solid-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-gradient-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-custom-light"]')).toBeVisible()
  })
})

test.describe('FloorTag · 默认状态与颜色正确性', () => {
  test('状态标签 light L 含 success/primary/danger/normal 颜色变体', async ({ page }) => {
    await gotoPage(page)
    const lRow = page.locator('[data-testid="tag-status-light-l"]')
    // success
    await expect(lRow.locator('.o-tag-success').first()).toBeVisible()
    // primary
    await expect(lRow.locator('.o-tag-primary').first()).toBeVisible()
    // danger
    await expect(lRow.locator('.o-tag-danger').first()).toBeVisible()
    // normal
    await expect(lRow.locator('.o-tag-normal').first()).toBeVisible()
  })

  test('信息标签实心区块含 outline 变体', async ({ page }) => {
    await gotoPage(page)
    const outlineRow = page.locator('[data-testid="tag-info-outline-light"]')
    await expect(outlineRow.locator('.o-tag-outline').first()).toBeVisible()
  })

  test('信息标签带图标区块含图标元素', async ({ page }) => {
    await gotoPage(page)
    const iconRow = page.locator('[data-testid="tag-info-icon-light"]')
    await expect(iconRow.locator('.o-tag-icon').first()).toBeVisible()
  })

  test('信息标签可关闭区块含关闭按钮', async ({ page }) => {
    await gotoPage(page)
    const closableRow = page.locator('[data-testid="tag-info-closable-light"]')
    await expect(closableRow.locator('.o-tag-close').first()).toBeVisible()
  })

  test('运营标签使用 round="pill" 呈现胶囊形', async ({ page }) => {
    await gotoPage(page)
    const opRow = page.locator('[data-testid="tag-op-solid-light"]')
    const firstTag = opRow.locator('.o-tag').first()
    await expect(firstTag).toBeVisible()
    // pill 模式下 border-radius 应为 50% 或足够大的 px 值（大于高度一半）
    const borderRadius = await firstTag.evaluate((el) => {
      return window.getComputedStyle(el).borderRadius
    })
    // pill: 100px or 50% or similar large value
    expect(borderRadius).toBeTruthy()
    // verify it's a round shape — computed value should not be 4px (--o-radius-m)
    expect(borderRadius).not.toBe('4px')
  })
})

test.describe('FloorTag · 尺寸正确性', () => {
  test('L 标签高度为 28px（>1440px 断点）', async ({ page }) => {
    await gotoPage(page)
    const lTag = page.locator('[data-testid="tag-status-light-l"] .o-tag').first()
    await expect(lTag).toBeVisible()
    const height = await lTag.evaluate((el) => {
      return Math.round(el.getBoundingClientRect().height)
    })
    // At 1920px viewport, large = 28px
    expect(height).toBe(28)
  })

  test('M 标签高度为 20px', async ({ page }) => {
    await gotoPage(page)
    const mTag = page.locator('[data-testid="tag-status-light-m"] .o-tag').first()
    await expect(mTag).toBeVisible()
    const height = await mTag.evaluate((el) => {
      return Math.round(el.getBoundingClientRect().height)
    })
    expect(height).toBe(20)
  })

  test('S 标签高度为 16px', async ({ page }) => {
    await gotoPage(page)
    const sTag = page.locator('[data-testid="tag-status-light-s"] .o-tag').first()
    await expect(sTag).toBeVisible()
    const height = await sTag.evaluate((el) => {
      return Math.round(el.getBoundingClientRect().height)
    })
    expect(height).toBe(16)
  })

  test('运营标签三种 size 都存在', async ({ page }) => {
    await gotoPage(page)
    const opRow = page.locator('[data-testid="tag-op-solid-light"]')
    await expect(opRow.locator('.o-tag')).toHaveCount(3)
  })
})

test.describe('FloorTag · 布局与间距', () => {
  test('tag-row 使用 flex-wrap 横向排列', async ({ page }) => {
    await gotoPage(page)
    const tagRow = page.locator('[data-testid="tag-status-light-l"]')
    const display = await tagRow.evaluate((el) => window.getComputedStyle(el).display)
    const flexWrap = await tagRow.evaluate((el) => window.getComputedStyle(el).flexWrap)
    expect(display).toBe('flex')
    expect(flexWrap).toBe('wrap')
  })

  test('dark 区块有深色背景', async ({ page }) => {
    await gotoPage(page)
    const darkSection = page.locator('[data-testid="tag-row-dark"]')
    const bg = await darkSection.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })
})

test.describe('FloorTag · 交互行为', () => {
  test('可关闭标签点击关闭后消失', async ({ page }) => {
    await gotoPage(page)
    const closableRow = page.locator('[data-testid="tag-info-closable-light"]')
    const firstCloseBtn = closableRow.locator('.o-tag-close').first()
    await expect(firstCloseBtn).toBeVisible()
    // Click close
    await firstCloseBtn.click()
    // Tag should no longer be visible
    await expect(closableRow.locator('.o-tag').first()).not.toBeVisible()
  })
})

test.describe('FloorTag · 相对位置关系', () => {
  test('light 区块在 dark 区块之前（上方）', async ({ page }) => {
    await gotoPage(page)
    const lightBox = await page.locator('[data-testid="tag-row-light"]').boundingBox()
    const darkBox = await page.locator('[data-testid="tag-row-dark"]').boundingBox()
    expect(lightBox!.y).toBeLessThan(darkBox!.y)
  })

  test('状态标签 L 行在 M 行之前（上方）', async ({ page }) => {
    await gotoPage(page)
    const lBox = await page.locator('[data-testid="tag-status-light-l"]').boundingBox()
    const mBox = await page.locator('[data-testid="tag-status-light-m"]').boundingBox()
    expect(lBox!.y).toBeLessThan(mBox!.y)
  })
})

test.describe('FloorTag · dark 主题下 OTag 颜色正确渲染', () => {
  test('dark 区块内状态标签可见', async ({ page }) => {
    await gotoPage(page)
    const darkLRow = page.locator('[data-testid="tag-status-dark-l"]')
    await expect(darkLRow).toBeVisible()
    await expect(darkLRow.locator('.o-tag')).toHaveCount(6)
  })

  test('dark 区块内信息标签实心和描边都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-info-solid-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-outline-dark"]')).toBeVisible()
  })

  test('dark 区块内运营标签各行存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-op-solid-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-gradient-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-custom-dark"]')).toBeVisible()
  })
})
