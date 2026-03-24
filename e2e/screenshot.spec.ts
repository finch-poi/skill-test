import { test } from '@playwright/test'

test('screenshot component-test page', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/component-test')
  await page.waitForTimeout(2000)
  await page.screenshot({ path: 'test-results/component-test-page.png', fullPage: false })
})

test('screenshot component-test page scrolled', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/component-test')
  await page.waitForTimeout(2000)
  await page.evaluate(() => window.scrollTo(0, 800))
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/component-test-page-scrolled.png', fullPage: false })
})
