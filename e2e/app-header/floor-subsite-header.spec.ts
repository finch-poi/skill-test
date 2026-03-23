/**
 * Ascend 子站顶部导航还原度测试
 *
 * 设计值来源：Pixso DSL "导航 Navigation/顶部导航" (guid: 57:5659)
 * 子站变体：属性 2=昇腾, 属性 3=子站, Dark=OFF
 * 画板宽度：1920px → viewport 1920×1080
 *
 * ─── 设计值提取表 ───────────────────────────────────────────────────────────
 * | 区域          | 元素              | 属性              | DSL 精确值                  |
 * |--------------|------------------|------------------|---------------------------|
 * | SubHeader    | 整体容器           | background       | rgba(255,255,255,0.95)     |
 * | SubHeader    | 整体容器           | box-shadow       | 0 3px 8px rgba(0,0,0,0.08)|
 * | TopBar       | 顶部迷你栏         | height           | 32px                      |
 * | TopBar       | 顶部迷你栏         | background       | rgb(237,239,242)           |
 * | MainBar      | 主导航栏           | height           | 64px                      |
 * | MainBar      | Logo SVG          | width/height     | 28px                      |
 * | MainBar      | "开发者" 标签      | color            | rgb(0,0,0) (info1 黑色)    |
 * | MainBar      | "开发者" 标签      | font-size        | @1920px=20px (h4 mixin)   |
 * | MainBar      | sub-nav-item     | height           | 64px                      |
 * | MainBar      | sub-nav active   | border-bottom    | rgb(199,0,11)             |
 * | MainBar      | 子导航项           | count            | 7                         |
 * | MainBar      | 搜索框 placeholder | text             | "mindie"                  |
 * | TopBar       | 站点名称           | text             | "昇腾社区首页"               |
 * ──────────────────────────────────────────────────────────────────────────
 */

import { test, expect } from '@playwright/test'

async function gotoPage(page: import('@playwright/test').Page) {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/subsite-header-test')
  await page.waitForSelector('.subsite-header-test-page', { timeout: 10000 })
}

async function gotoPageMobile(page: import('@playwright/test').Page) {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('/subsite-header-test')
  await page.waitForSelector('.subsite-header-test-page', { timeout: 10000 })
}

// ─── 维度 1：结构与组件正确性 ──────────────────────────────────────────────

test.describe('维度1 - 结构与组件正确性', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('subsite-header 容器存在且可见', async ({ page }) => {
    await expect(page.locator('.subsite-header')).toBeVisible()
  })

  test('顶部迷你栏存在且可见', async ({ page }) => {
    await expect(page.locator('.top-bar')).toBeVisible()
  })

  test('站点名称文字正确', async ({ page }) => {
    await expect(page.locator('.site-name')).toContainText('昇腾社区首页')
  })

  test('主导航栏存在', async ({ page }) => {
    await expect(page.locator('.main-bar')).toBeVisible()
  })

  test('Logo 存在', async ({ page }) => {
    await expect(page.locator('.header-logo')).toBeVisible()
  })

  test('Logo 包含文字 "Ascend"', async ({ page }) => {
    await expect(page.locator('.header-logo .logo-text')).toContainText('Ascend')
  })

  test('active-section "开发者" 可见', async ({ page }) => {
    await expect(page.locator('.active-section')).toBeVisible()
    await expect(page.locator('.active-section')).toContainText('开发者')
  })

  test('子导航包含 7 个链接', async ({ page }) => {
    await expect(page.locator('.sub-nav .sub-nav-item')).toHaveCount(7)
  })

  test('子导航链接文字正确', async ({ page }) => {
    const items = page.locator('.sub-nav .sub-nav-item')
    await expect(items.nth(0)).toContainText('主页')
    await expect(items.nth(1)).toContainText('开发')
    await expect(items.nth(2)).toContainText('活动与大赛')
    await expect(items.nth(3)).toContainText('互动问答')
    await expect(items.nth(4)).toContainText('经验分享')
    await expect(items.nth(5)).toContainText('圈子')
    await expect(items.nth(6)).toContainText('文档')
  })

  test('搜索框存在且 placeholder 为 "mindie"', async ({ page }) => {
    await expect(page.locator('.search-input')).toBeVisible()
    await expect(page.locator('.search-input')).toHaveAttribute('placeholder', 'mindie')
  })

  test('"支持" 按钮存在', async ({ page }) => {
    await expect(page.locator('.support-btn')).toBeVisible()
    await expect(page.locator('.support-btn')).toContainText('支持')
  })

  test('未登录状态显示登录和注册按钮', async ({ page }) => {
    await expect(page.locator('.top-login-btn')).toBeVisible()
    await expect(page.locator('.top-register-btn')).toBeVisible()
  })
})

// ─── 维度 2：默认状态正确性 ─────────────────────────────────────────────────

test.describe('维度2 - 默认状态正确性', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('搜索框默认为空', async ({ page }) => {
    await expect(page.locator('.search-input')).toHaveValue('')
  })

  test('移动端菜单默认关闭', async ({ page }) => {
    await expect(page.locator('.mobile-nav')).not.toBeVisible()
  })
})

// ─── 维度 3：布局与间距 ──────────────────────────────────────────────────────

test.describe('维度3 - 布局与间距', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('subsite-header 为 sticky 定位', async ({ page }) => {
    const position = await page.locator('.subsite-header').evaluate(
      el => window.getComputedStyle(el).position
    )
    expect(position).toBe('sticky')
  })

  test('主导航栏 Logo 左边缘距 header 左边缘约 64px', async ({ page }) => {
    // DSL: main-bar-inner padding 0 64px, logo 为第一个内容
    const headerRect = await page.locator('.subsite-header').boundingBox()
    const logoRect = await page.locator('.header-logo').boundingBox()
    const leftOffset = logoRect!.x - headerRect!.x
    // 允许 4px 误差
    expect(leftOffset).toBeGreaterThanOrEqual(60)
    expect(leftOffset).toBeLessThanOrEqual(68)
  })

  test('sub-nav 在 Logo 右侧', async ({ page }) => {
    const logoRight = await page.locator('.header-logo').evaluate(
      el => el.getBoundingClientRect().right
    )
    const navLeft = await page.locator('.sub-nav').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(navLeft).toBeGreaterThan(logoRight - 1)
  })

  test('右侧操作区在 sub-nav 右侧', async ({ page }) => {
    const navRight = await page.locator('.sub-nav').evaluate(
      el => el.getBoundingClientRect().right
    )
    const actionsLeft = await page.locator('.main-bar-actions').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(actionsLeft).toBeGreaterThanOrEqual(navRight - 4)
  })
})

// ─── 维度 4：视觉样式 ────────────────────────────────────────────────────────

test.describe('维度4 - 视觉样式', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('主导航栏高度为 64px', async ({ page }) => {
    // DSL: main-bar height=64
    const height = await page.locator('.main-bar-inner').evaluate(
      el => el.getBoundingClientRect().height
    )
    expect(height).toBe(64)
  })

  test('顶部迷你栏高度为 32px', async ({ page }) => {
    // DSL: top-bar height=32
    const height = await page.locator('.top-bar-inner').evaluate(
      el => el.getBoundingClientRect().height
    )
    expect(height).toBe(32)
  })

  test('header 背景色为 rgba(255,255,255,0.95)', async ({ page }) => {
    // DSL: fillPaints[0] = SOLID white opacity=0.95
    const bg = await page.locator('.subsite-header').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).toBe('rgba(255, 255, 255, 0.95)')
  })

  test('header 具有投影效果（box-shadow）', async ({ page }) => {
    // DSL: effects DROP_SHADOW y=3 radius=8 rgba(0,0,0,0.08)
    const shadow = await page.locator('.subsite-header').evaluate(
      el => window.getComputedStyle(el).boxShadow
    )
    expect(shadow).not.toBe('none')
    expect(shadow).toContain('rgba(0, 0, 0, 0.08)')
  })

  test('"开发者" active-section 颜色为黑色 (info1)', async ({ page }) => {
    // DSL: "开发者" PARAGRAPH fill = r:0,g:0,b:0,a:1 → black
    const color = await page.locator('.active-section').evaluate(
      el => window.getComputedStyle(el).color
    )
    expect(color).toBe('rgb(0, 0, 0)')
  })

  test('"开发者" active-section 字号为 20px (@1920px)', async ({ page }) => {
    // DSL: fontSize=20, lineHeight=28 → @include h4 at ≥1441px = 20px
    const fontSize = await page.locator('.active-section').evaluate(
      el => window.getComputedStyle(el).fontSize
    )
    expect(fontSize).toBe('20px')
  })

  test('注册按钮背景色为 Ascend 红色 rgb(199,0,11)', async ({ page }) => {
    // DSL: Ascend brand color = rgba(199,0,11,1)
    const bg = await page.locator('.top-register-btn').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).toBe('rgb(199, 0, 11)')
  })

  test('注册按钮文字为白色', async ({ page }) => {
    const color = await page.locator('.top-register-btn').evaluate(
      el => window.getComputedStyle(el).color
    )
    expect(color).toBe('rgb(255, 255, 255)')
  })

  test('Logo SVG 高度为 28px', async ({ page }) => {
    // DSL: logo-icon width=28 height=28
    const height = await page.locator('.logo-icon').evaluate(
      el => el.getBoundingClientRect().height
    )
    expect(height).toBe(28)
  })

  test('子导航项字号为 14px (@1920px)', async ({ page }) => {
    // DSL: @include tip1 at ≥1441px = 14px
    const fontSize = await page.locator('.sub-nav-item').first().evaluate(
      el => window.getComputedStyle(el).fontSize
    )
    expect(fontSize).toBe('14px')
  })
})

// ─── 维度 5：交互行为 ────────────────────────────────────────────────────────

test.describe('维度5 - 交互行为', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('子导航项 hover 时颜色变化', async ({ page }) => {
    const item = page.locator('.sub-nav-item').first()
    const colorBefore = await item.evaluate(el => window.getComputedStyle(el).color)
    await item.hover()
    const colorAfter = await item.evaluate(el => window.getComputedStyle(el).color)
    expect(colorAfter).not.toBe(colorBefore)
  })
})

// ─── 维度 6：相对位置关系 ───────────────────────────────────────────────────

test.describe('维度6 - 相对位置关系', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('顶部迷你栏在主导航栏上方', async ({ page }) => {
    const topBarBottom = await page.locator('.top-bar').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const mainBarTop = await page.locator('.main-bar').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(topBarBottom).toBeLessThanOrEqual(mainBarTop + 1)
  })

  test('Logo 在 active-section 左侧', async ({ page }) => {
    const logoRight = await page.locator('.header-logo').evaluate(
      el => el.getBoundingClientRect().right
    )
    const sectionLeft = await page.locator('.active-section').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(logoRight).toBeLessThan(sectionLeft)
  })

  test('sub-nav 在 active-section 右侧', async ({ page }) => {
    const sectionRight = await page.locator('.active-section').evaluate(
      el => el.getBoundingClientRect().right
    )
    const navLeft = await page.locator('.sub-nav').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(navLeft).toBeGreaterThanOrEqual(sectionRight - 4)
  })

  test('搜索框在"支持"按钮左侧', async ({ page }) => {
    const searchRight = await page.locator('.search-box').evaluate(
      el => el.getBoundingClientRect().right
    )
    const supportLeft = await page.locator('.support-btn').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(searchRight).toBeLessThan(supportLeft + 4)
  })
})

// ─── 维度 7：非硬编码间距 ─────────────────────────────────────────────────

test.describe('维度7 - 非硬编码间距', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('主导航栏内容区 padding 为 64px（@1920px）', async ({ page }) => {
    // DSL: main-bar-inner padding 0 64px
    const paddingLeft = await page.locator('.main-bar-inner').evaluate(
      el => parseFloat(window.getComputedStyle(el).paddingLeft)
    )
    expect(paddingLeft).toBe(64)
  })

  test('顶部迷你栏内容区 padding 为 64px（@1920px）', async ({ page }) => {
    const paddingLeft = await page.locator('.top-bar-inner').evaluate(
      el => parseFloat(window.getComputedStyle(el).paddingLeft)
    )
    expect(paddingLeft).toBe(64)
  })
})

// ─── 维度 8：块的对齐 ──────────────────────────────────────────────────────

test.describe('维度8 - 块的对齐', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('Logo 和子导航项垂直居中对齐', async ({ page }) => {
    const logoCenterY = await page.locator('.header-logo').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    const navCenterY = await page.locator('.sub-nav').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    expect(Math.abs(logoCenterY - navCenterY)).toBeLessThan(8)
  })

  test('右侧操作区垂直居中', async ({ page }) => {
    const mainBarCenterY = await page.locator('.main-bar-inner').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    const actionsCenterY = await page.locator('.main-bar-actions').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    expect(Math.abs(mainBarCenterY - actionsCenterY)).toBeLessThan(4)
  })

  test('子导航项高度相同（等高对齐）', async ({ page }) => {
    const heights = await page.locator('.sub-nav-item').evaluateAll(
      items => items.map(i => Math.round(i.getBoundingClientRect().height))
    )
    expect(new Set(heights).size).toBe(1)
  })
})

// ─── 响应式：移动端 ──────────────────────────────────────────────────────────

test.describe('移动端响应式（≤1200px）', () => {
  test.beforeEach(async ({ page }) => { await gotoPageMobile(page) })

  test('移动端顶部迷你栏隐藏', async ({ page }) => {
    await expect(page.locator('.top-bar')).not.toBeVisible()
  })

  test('移动端 sub-nav 隐藏', async ({ page }) => {
    await expect(page.locator('.sub-nav')).not.toBeVisible()
  })

  test('移动端 active-section 隐藏', async ({ page }) => {
    await expect(page.locator('.active-section')).not.toBeVisible()
  })

  test('移动端汉堡菜单按钮可见', async ({ page }) => {
    await expect(page.locator('.mobile-menu-btn')).toBeVisible()
  })

  test('点击汉堡菜单展开导航', async ({ page }) => {
    await page.locator('.mobile-menu-btn').click()
    await expect(page.locator('.mobile-nav')).toBeVisible()
    await expect(page.locator('.mobile-nav-item')).toHaveCount(8) // 1 section + 7 nav items
  })
})
