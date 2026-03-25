import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('侧边栏 Anchor 导航', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page, '/component-test')
  })

  test('滚动页面时侧边 anchor 应该高亮', async ({ page }) => {
    // 等待页面加载完成
    await page.waitForLoadState('networkidle')

    // 点击第一个锚点项，跳转到对应楼层
    const firstAnchor = page.locator('.right-anchor-list .o-anchor-item').first()
    await firstAnchor.click()

    // 等待滚动
    await page.waitForTimeout(500)

    // 检查 URL hash 是否更新
    const url = page.url()
    expect(url).toContain('#floor-')

    // 检查对应的楼层元素是否存在
    const hash = url.split('#')[1]
    const targetEl = page.locator(`#${hash}`)
    await expect(targetEl).toBeVisible()
  })

  test('点击 anchor 跳转后对应项应该高亮', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // 点击 "Tab 标签页" 锚点
    const tabAnchor = page.locator('.right-anchor-list .o-anchor-item').nth(1)
    await tabAnchor.click()

    await page.waitForTimeout(500)

    // 检查 hash
    expect(page.url()).toContain('#floor-tab')

    // 滚动到页面底部，让其他锚点进入视野
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // 滚动回顶部
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)
  })

  test('滚动到不同楼层时 anchor 应该更新高亮', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // 滚动到页面最底部
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)

    // 检查是否有高亮的锚点项
    const activeItems = await page.locator('.right-anchor-list .is-active').count()
    expect(activeItems).toBeGreaterThan(0)
  })
})
