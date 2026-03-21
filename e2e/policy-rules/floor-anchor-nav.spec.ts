/**
 * 楼层：锚点导航条
 * 对应设计稿：Banner 下方的水平锚点导航
 */
import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('锚点导航楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  test('水平排列（使用 OAnchor layout=h）', async ({ page }) => {
    await expect(page.locator('.o-anchor.o-anchor-h')).toBeVisible()
  })

  test('包含 3 个锚点项', async ({ page }) => {
    await expect(page.locator('.o-anchor-item')).toHaveCount(3)
  })
})
