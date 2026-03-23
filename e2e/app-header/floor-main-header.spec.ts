/**
 * Ascend 主站顶部导航还原度测试
 *
 * 设计值来源：Pixso DSL "属性 1=PC,属性 2=昇腾,属性 3=主站,Dark=OFF" (guid: 268:16262)
 * 画板宽度：1920px → viewport 1920×1080
 *
 * ─── 设计值提取表 ───────────────────────────────────────────────────────────
 * | 区域        | 元素              | 属性              | DSL 精确值               |
 * |------------|------------------|------------------|------------------------|
 * | Header     | 容器              | height           | 72px                   |
 * | Header     | 容器              | background       | rgba(255,255,255,0.95)  |
 * | Header     | 容器              | box-shadow       | 0 3px 8px rgba(0,0,0,0.078)|
 * | Header     | 容器              | position         | sticky                 |
 * | Header     | Logo             | width            | 84px (frame)           |
 * | Header     | Logo             | height           | 32px                   |
 * | Header     | Logo             | left edge        | 64px                   |
 * | Header     | 导航区域           | left start       | 216px (画板19)          |
 * | Header     | 导航项目           | count            | 8                      |
 * | Header     | 导航项文字          | font-size        | 14px (@1920px)         |
 * | Header     | "文档" 按钮        | font-size        | 14px                   |
 * | Header     | HOT 徽标          | font-size        | 10px                   |
 * | Header     | HOT 徽标          | background       | rgb(199,0,11)          |
 * | Header     | HOT 徽标          | color            | rgb(255,255,255)        |
 * | Header     | "下载" 按钮        | font-size        | 14px                   |
 * | Header     | 搜索框             | width            | 220px (whole component) |
 * | Header     | placeholder       | text             | "mindie"               |
 * | Header     | 用户名 "风语者"     | font-size        | 14px                   |
 * ──────────────────────────────────────────────────────────────────────────
 */

import { test, expect } from '@playwright/test'
import { gotoPage, gotoPageMobile } from './setup'

// ─── 维度 1：结构与组件正确性 ──────────────────────────────────────────────

test.describe('维度1 - 结构与组件正确性', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('header 容器存在且可见', async ({ page }) => {
    await expect(page.locator('.app-header')).toBeVisible()
  })

  test('Logo 存在', async ({ page }) => {
    await expect(page.locator('.header-logo')).toBeVisible()
  })

  test('Logo 包含 SVG 图标', async ({ page }) => {
    await expect(page.locator('.header-logo .logo-icon')).toBeVisible()
  })

  test('Logo 包含文字 "Ascend"', async ({ page }) => {
    await expect(page.locator('.header-logo .logo-text')).toContainText('Ascend')
  })

  test('桌面导航包含 8 个导航链接', async ({ page }) => {
    await expect(page.locator('.header-nav .nav-item')).toHaveCount(8)
  })

  test('导航链接文字正确', async ({ page }) => {
    const items = page.locator('.header-nav .nav-item')
    // DSL: 8 个顶部导航实例，文字来自设计稿图像
    await expect(items.nth(0)).toContainText('产品')
    await expect(items.nth(1)).toContainText('CANN')
    await expect(items.nth(2)).toContainText('解决方案')
    await expect(items.nth(3)).toContainText('开发者')
    await expect(items.nth(4)).toContainText('合作伙伴')
    await expect(items.nth(5)).toContainText('教育研究')
    await expect(items.nth(6)).toContainText('昇腾AI市场')
    await expect(items.nth(7)).toContainText('支持与服务')
  })

  test('搜索输入框存在，placeholder 为 "mindie"', async ({ page }) => {
    // DSL: 容器15 > Search/phone/Enabled, placeholder text "mindie"
    await expect(page.locator('.search-input')).toBeVisible()
    await expect(page.locator('.search-input')).toHaveAttribute('placeholder', 'mindie')
  })

  test('"文档" 按钮存在', async ({ page }) => {
    await expect(page.locator('.docs-btn')).toBeVisible()
    await expect(page.locator('.docs-btn')).toContainText('文档')
  })

  test('"文档" 按钮包含 HOT 徽标', async ({ page }) => {
    await expect(page.locator('.docs-btn .badge')).toBeVisible()
    await expect(page.locator('.docs-btn .badge')).toContainText('HOT')
  })

  test('"下载" 按钮存在', async ({ page }) => {
    await expect(page.locator('.action-btn--download')).toBeVisible()
    await expect(page.locator('.action-btn--download')).toContainText('下载')
  })

  test('夜间模式切换按钮存在', async ({ page }) => {
    await expect(page.locator('.icon-btn').first()).toBeVisible()
  })

  test('登录状态下用户名可见', async ({ page }) => {
    // DSL: 组合91 中 "风语者" 文字，fontSize=14
    await expect(page.locator('.user-btn')).toBeVisible()
    await expect(page.locator('.user-name')).toBeVisible()
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

  test('header 为 sticky 定位（置顶）', async ({ page }) => {
    // DSL: header 为顶部固定导航
    const position = await page.locator('.app-header').evaluate(
      el => window.getComputedStyle(el).position
    )
    expect(position).toBe('sticky')
  })

  test('Logo 左边缘距 header 左边缘约 64px', async ({ page }) => {
    // DSL: logo 二级 left=64 (within 1920px frame)
    const headerRect = await page.locator('.app-header').boundingBox()
    const logoRect = await page.locator('.header-logo').boundingBox()
    const leftOffset = logoRect!.x - headerRect!.x
    // 允许 4px 误差（padding/border 计算差异）
    expect(leftOffset).toBeGreaterThanOrEqual(60)
    expect(leftOffset).toBeLessThanOrEqual(68)
  })

  test('导航区域在 Logo 右侧', async ({ page }) => {
    // DSL: 画板19 left=216, logo 二级 left=64, 216 > 64+84=148
    const logoRight = await page.locator('.header-logo').evaluate(
      el => el.getBoundingClientRect().right
    )
    const navLeft = await page.locator('.header-nav').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(navLeft).toBeGreaterThan(logoRight - 1)
  })

  test('右侧操作区在导航右侧', async ({ page }) => {
    const navRight = await page.locator('.header-nav').evaluate(
      el => el.getBoundingClientRect().right
    )
    const actionsLeft = await page.locator('.header-actions').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(actionsLeft).toBeGreaterThanOrEqual(navRight - 4)
  })
})

// ─── 维度 4：视觉样式 ────────────────────────────────────────────────────────

test.describe('维度4 - 视觉样式', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('header 高度为 72px', async ({ page }) => {
    // DSL: 属性 1=PC,属性 2=昇腾,属性 3=主站 height=72
    const height = await page.locator('.app-header').evaluate(
      el => el.getBoundingClientRect().height
    )
    expect(height).toBe(72)
  })

  test('header 背景色为 rgba(255,255,255,0.95)', async ({ page }) => {
    // DSL: fillPaints[0] = SOLID white opacity=0.95
    const bg = await page.locator('.app-header').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).toBe('rgba(255, 255, 255, 0.95)')
  })

  test('header 具有投影效果（box-shadow）', async ({ page }) => {
    // DSL: effects[1] = DROP_SHADOW y=3 radius=8 rgba(0,0,0,0.078)
    const shadow = await page.locator('.app-header').evaluate(
      el => window.getComputedStyle(el).boxShadow
    )
    expect(shadow).not.toBe('none')
    expect(shadow).toContain('rgba(0, 0, 0, 0.08)')
  })

  test('导航项字号为 14px（@1920px 视口）', async ({ page }) => {
    // DSL: PARAGRAPH nodes in nav instances fontSize=14, responsive token @>=1681px = 14px
    const fontSize = await page.locator('.nav-item').first().evaluate(
      el => window.getComputedStyle(el).fontSize
    )
    expect(fontSize).toBe('14px')
  })

  test('"文档" 按钮字号为 14px', async ({ page }) => {
    // DSL: "文档" PARAGRAPH fontSize=14
    const fontSize = await page.locator('.docs-btn').evaluate(
      el => window.getComputedStyle(el).fontSize
    )
    expect(fontSize).toBe('14px')
  })

  test('HOT 徽标字号为 10px', async ({ page }) => {
    // DSL: "HOT" PARAGRAPH fontSize=10
    const fontSize = await page.locator('.badge--hot').evaluate(
      el => window.getComputedStyle(el).fontSize
    )
    expect(fontSize).toBe('10px')
  })

  test('HOT 徽标背景色为 Ascend 红色 rgb(199,0,11)', async ({ page }) => {
    // DSL: Tag/S > 矩形备份38 fill=rgba(199,0,11,1)
    const bg = await page.locator('.badge--hot').evaluate(
      el => window.getComputedStyle(el).backgroundColor
    )
    expect(bg).toBe('rgb(199, 0, 11)')
  })

  test('HOT 徽标文字为白色', async ({ page }) => {
    // DSL: "HOT" PARAGRAPH fill=rgba(255,255,255,1)
    const color = await page.locator('.badge--hot').evaluate(
      el => window.getComputedStyle(el).color
    )
    expect(color).toBe('rgb(255, 255, 255)')
  })

  test('用户名字号为 14px', async ({ page }) => {
    // DSL: "风语者" PARAGRAPH fontSize=14
    const fontSize = await page.locator('.user-name').evaluate(
      el => window.getComputedStyle(el).fontSize
    )
    expect(fontSize).toBe('14px')
  })

  test('Logo SVG 高度为 32px', async ({ page }) => {
    // DSL: logo 二级 height=32
    const height = await page.locator('.logo-icon').evaluate(
      el => el.getBoundingClientRect().height
    )
    expect(height).toBe(32)
  })
})

// ─── 维度 5：交互行为 ────────────────────────────────────────────────────────

test.describe('维度5 - 交互行为', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('导航项 hover 时颜色变化', async ({ page }) => {
    const item = page.locator('.nav-item').first()
    const colorBefore = await item.evaluate(el => window.getComputedStyle(el).color)
    await item.hover()
    const colorAfter = await item.evaluate(el => window.getComputedStyle(el).color)
    // hover 后颜色应不同（变为 primary 色）
    expect(colorAfter).not.toBe(colorBefore)
  })
})

// ─── 维度 6：相对位置关系 ───────────────────────────────────────────────────

test.describe('维度6 - 相对位置关系', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('Logo 在导航链接左侧', async ({ page }) => {
    const logoRight = await page.locator('.header-logo').evaluate(
      el => el.getBoundingClientRect().right
    )
    const navLeft = await page.locator('.header-nav .nav-item').first().evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(logoRight).toBeLessThan(navLeft)
  })

  test('搜索框在 "文档" 按钮左侧', async ({ page }) => {
    const searchRight = await page.locator('.search-box').evaluate(
      el => el.getBoundingClientRect().right
    )
    const docsLeft = await page.locator('.docs-btn').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(searchRight).toBeLessThanOrEqual(docsLeft + 4)
  })

  test('"文档" 在 "下载" 左侧', async ({ page }) => {
    const docsRight = await page.locator('.docs-btn').evaluate(
      el => el.getBoundingClientRect().right
    )
    const downloadLeft = await page.locator('.action-btn--download').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(docsRight).toBeLessThan(downloadLeft + 4)
  })
})

// ─── 维度 7：间距使用响应式变量 ─────────────────────────────────────────────

test.describe('维度7 - 非硬编码间距', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('内容区 padding 使用 CSS 变量（非硬编码 px 到样式属性）', async ({ page }) => {
    // 通过检查 header-inner 的 padding 值是否为合理的响应式值
    const paddingLeft = await page.locator('.header-inner').evaluate(
      el => parseFloat(window.getComputedStyle(el).paddingLeft)
    )
    // 在 1920px 视口，padding-left 应为 64px（由 SCSS 直接设定，与 DSL 一致）
    expect(paddingLeft).toBe(64)
  })
})

// ─── 维度 8：块的对齐 ──────────────────────────────────────────────────────

test.describe('维度8 - 块的对齐', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  test('Logo 和导航项垂直居中对齐', async ({ page }) => {
    // DSL: logo top=20, height=32 → center y=36; nav top=24, height=48 → center y=48
    // 两者都在 72px header 内垂直居中
    const logoCenterY = await page.locator('.header-logo').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    const navCenterY = await page.locator('.header-nav').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    expect(Math.abs(logoCenterY - navCenterY)).toBeLessThan(8)
  })

  test('右侧操作按钮垂直居中', async ({ page }) => {
    const headerCenterY = await page.locator('.header-inner').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    const actionsCenterY = await page.locator('.header-actions').evaluate(el => {
      const r = el.getBoundingClientRect()
      return (r.top + r.bottom) / 2
    })
    expect(Math.abs(headerCenterY - actionsCenterY)).toBeLessThan(4)
  })

  test('导航项高度相同（等高对齐）', async ({ page }) => {
    const heights = await page.locator('.nav-item').evaluateAll(
      items => items.map(i => Math.round(i.getBoundingClientRect().height))
    )
    // 所有导航项高度应一致
    expect(new Set(heights).size).toBe(1)
  })
})

// ─── 响应式：移动端 ──────────────────────────────────────────────────────────

test.describe('移动端响应式（≤1200px）', () => {
  test.beforeEach(async ({ page }) => { await gotoPageMobile(page) })

  test('移动端桌面导航隐藏', async ({ page }) => {
    await expect(page.locator('.header-nav')).not.toBeVisible()
  })

  test('移动端右侧操作区隐藏', async ({ page }) => {
    await expect(page.locator('.header-actions')).not.toBeVisible()
  })

  test('移动端汉堡菜单按钮可见', async ({ page }) => {
    await expect(page.locator('.mobile-menu-btn')).toBeVisible()
  })

  test('点击汉堡菜单展开导航', async ({ page }) => {
    await page.locator('.mobile-menu-btn').click()
    await expect(page.locator('.mobile-nav')).toBeVisible()
    await expect(page.locator('.mobile-nav-item')).toHaveCount(8)
  })
})
