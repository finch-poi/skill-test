import type { Page } from '@playwright/test'

/** 设计稿画板宽度 1922px（widescreen 断点 >1680px） */
export async function gotoPage(page: Page) {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/form-test-1')
  // 等待 Vue 应用挂载完成
  await page.waitForSelector('.page', { timeout: 10000 })
}
