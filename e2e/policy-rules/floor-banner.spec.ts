/**
 * 楼层：Banner 轮播区
 * 对应设计稿：页面顶部大幅 Hero 轮播图
 */
import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('Banner 楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ── 结构与组件正确性 ──
  test('使用 OCarousel 轮播组件', async ({ page }) => {
    await expect(page.locator('.banner-carousel.o-carousel')).toBeVisible()
  })

  test('包含 3 张幻灯片（OCarouselItem，effect=toggle 时类名为 o-carousel-item-toggle）', async ({ page }) => {
    await expect(page.locator('.banner-carousel .o-carousel-item-toggle')).toHaveCount(3)
  })

  test('底部指示器可见且位于轮播容器内（3个）', async ({ page }) => {
    await expect(page.locator('.banner-carousel .o-carousel-indicator-item')).toHaveCount(3)
    // toBeVisible() 不检查视口位置，必须额外验证指示器在 carousel 容器内部
    // 防止 toggle 模式 0 高度导致 bottom:19px 的指示器跑到容器顶部以上
    const carouselBox = await page.locator('.banner-carousel').boundingBox()
    const indicatorBox = await page.locator('.banner-carousel .o-carousel-indicator-wrap').boundingBox()
    expect(carouselBox).not.toBeNull()
    expect(indicatorBox).not.toBeNull()
    // 指示器顶部 ≥ carousel 顶部
    expect(indicatorBox!.y).toBeGreaterThanOrEqual(carouselBox!.y - 1)
    // 指示器底部 ≤ carousel 底部
    expect(indicatorBox!.y + indicatorBox!.height).toBeLessThanOrEqual(
      carouselBox!.y + carouselBox!.height + 1,
    )
  })

  test('无静态 <section class="banner">（已替换为轮播）', async ({ page }) => {
    await expect(page.locator('section.banner')).toHaveCount(0)
  })

  test('标题"政策规则"可见（第一张幻灯片）', async ({ page }) => {
    await expect(page.locator('.banner-title').first()).toContainText('政策规则')
  })

  test('描述文字可见', async ({ page }) => {
    await expect(page.locator('.banner-desc').first()).toBeVisible()
  })

  test('"查看更多"按钮可见', async ({ page }) => {
    await expect(
      page.getByRole('link', { name: '查看更多' }).or(page.getByRole('button', { name: '查看更多' })),
    ).toBeVisible()
  })

  // ── 视觉样式（设计值来自设计稿 DSL，画板断点 >1680px） ──
  test('标题字号为 48px（--o-r-font_size-display2 @ widescreen）', async ({ page }) => {
    const fontSize = await page.locator('.banner-title').first().evaluate((el) => window.getComputedStyle(el).fontSize)
    expect(fontSize).toBe('48px')
  })

  test('描述文字行高大于 20px', async ({ page }) => {
    const lineHeight = await page.locator('.banner-desc').first().evaluate((el) =>
      parseFloat(window.getComputedStyle(el).lineHeight),
    )
    expect(lineHeight).toBeGreaterThan(20)
  })

  test('"查看更多"按钮有非透明背景（primary solid 按钮）', async ({ page }) => {
    const btn = page.locator('.banner-carousel .o-btn').first()
    await expect(btn).toBeVisible()
    const bg = await btn.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    expect(bg).not.toBe('transparent')
  })
})
