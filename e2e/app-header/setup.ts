import type { Page } from '@playwright/test'

/**
 * 设计稿画板宽度 1920px（>1680px widescreen 断点）
 * DSL node: "属性 1=PC,属性 2=昇腾,属性 3=主站,Dark=OFF", width=1920
 */
export async function gotoPage(page: Page) {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto('/')
  await page.waitForSelector('.home-page', { timeout: 10000 })
}

/**
 * 移动端视口（≤1200px，导航栏隐藏，汉堡菜单显示）
 */
export async function gotoPageMobile(page: Page) {
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto('/')
  await page.waitForSelector('.home-page', { timeout: 10000 })
}
