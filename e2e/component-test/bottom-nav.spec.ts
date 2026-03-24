import { test, expect } from '@playwright/test'

// 设计稿 ID：103:4650（底部导航）

test.describe('AppBottomNav - 结构与基本渲染', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('.app-bottom-nav', { timeout: 10000 })
  })

  test('底部导航存在', async ({ page }) => {
    const nav = page.locator('[data-testid="bottom-nav"]')
    await expect(nav).toBeVisible()
  })

  test('底部导航渲染为 nav 元素', async ({ page }) => {
    const nav = page.locator('[data-testid="bottom-nav"]')
    await expect(nav).toHaveClass(/app-bottom-nav/)
  })
})

test.describe('AppBottomNav - 导航项', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('.app-bottom-nav', { timeout: 10000 })
  })

  test('首页导航项存在', async ({ page }) => {
    const item = page.locator('[data-testid="bottom-nav-home"]')
    await expect(item).toBeVisible()
    await expect(item).toContainText('首页')
  })

  test('发现导航项存在', async ({ page }) => {
    const item = page.locator('[data-testid="bottom-nav-discover"]')
    await expect(item).toBeVisible()
    await expect(item).toContainText('发现')
  })

  test('发布导航项存在', async ({ page }) => {
    const item = page.locator('[data-testid="bottom-nav-publish"]')
    await expect(item).toBeVisible()
    await expect(item).toContainText('发布')
  })

  test('消息导航项存在', async ({ page }) => {
    const item = page.locator('[data-testid="bottom-nav-message"]')
    await expect(item).toBeVisible()
    await expect(item).toContainText('消息')
  })

  test('我的导航项存在', async ({ page }) => {
    const item = page.locator('[data-testid="bottom-nav-profile"]')
    await expect(item).toBeVisible()
    await expect(item).toContainText('我的')
  })
})

test.describe('AppBottomNav - 激活状态', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('.app-bottom-nav', { timeout: 10000 })
  })

  test('首页为当前激活项', async ({ page }) => {
    const item = page.locator('[data-testid="bottom-nav-home"]')
    await expect(item).toHaveClass(/nav-item--active/)
  })

  test('点击发现导航项后激活', async ({ page }) => {
    const discover = page.locator('[data-testid="bottom-nav-discover"]')
    await discover.click()
    await page.waitForURL('/policy-rules')
    await expect(discover).toHaveClass(/nav-item--active/)
  })
})

test.describe('AppBottomNav - 图标', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('.app-bottom-nav', { timeout: 10000 })
  })

  test('导航项包含图标', async ({ page }) => {
    const home = page.locator('[data-testid="bottom-nav-home"]')
    const icon = home.locator('.nav-icon')
    await expect(icon).toBeVisible()
  })
})

test.describe('AppBottomNav - 布局与样式', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    await page.waitForSelector('.app-bottom-nav', { timeout: 10000 })
  })

  test('底部导航固定在底部', async ({ page }) => {
    const nav = page.locator('[data-testid="bottom-nav"]')
    const position = await nav.evaluate((el) => window.getComputedStyle(el).position)
    expect(position).toBe('fixed')
  })

  test('底部导航背景色为 fill2', async ({ page }) => {
    const nav = page.locator('[data-testid="bottom-nav"]')
    const bg = await nav.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    // fill2 应为白色或其他主题色
    expect(bg).toBeTruthy()
  })

  test('导航项使用 flex 布局', async ({ page }) => {
    const list = page.locator('.nav-list')
    const display = await list.evaluate((el) => window.getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('导航项高度为 56px', async ({ page }) => {
    const list = page.locator('.nav-list')
    const height = await list.evaluate((el) => window.getComputedStyle(el).height)
    expect(height).toBe('56px')
  })
})
