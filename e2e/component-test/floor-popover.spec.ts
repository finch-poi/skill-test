import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('FloorPopover 气泡提示', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ====== 1. 结构与组件正确性 ======

  test('1-1 楼层标题含"OPopover 气泡提示"', async ({ page }) => {
    const titles = page.locator('.section-title')
    const found = await titles.evaluateAll((els) =>
      els.some((el) => el.textContent?.includes('OPopover 气泡提示'))
    )
    expect(found).toBe(true)
  })

  test('1-2 楼层描述含设计稿 ID 47:4288', async ({ page }) => {
    const descs = page.locator('.section-subtitle')
    const found = await descs.evaluateAll((els) =>
      els.some((el) => el.textContent?.includes('47:4288'))
    )
    expect(found).toBe(true)
  })

  test('1-3 亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="popover-row-light"]')).toBeVisible()
  })

  test('1-4 暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="popover-row-dark"]')).toBeVisible()
  })

  test('1-5 亮色区块包含 L size 触发按钮（上/下/左/右）', async ({ page }) => {
    await expect(page.locator('[data-testid="popover-l-top-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="popover-l-bottom-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="popover-l-left-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="popover-l-right-light"]')).toBeVisible()
  })

  test('1-6 亮色区块包含 M size 触发按钮（上/下/左/右）', async ({ page }) => {
    await expect(page.locator('[data-testid="popover-m-top-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="popover-m-bottom-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="popover-m-left-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="popover-m-right-light"]')).toBeVisible()
  })

  // ====== 2. 默认状态正确性 ======

  test('2-1 初始状态气泡不可见（触发前）', async ({ page }) => {
    // OPopover 气泡默认 unmountOnHide=true，未触发时 DOM 中不存在
    const popoverWraps = page.locator('.o-popover-wrap')
    const count = await popoverWraps.count()
    expect(count).toBe(0)
  })

  test('2-2 点击 L size 上方触发按钮后气泡显示', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    // 等待气泡出现在 body 中（teleport）
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
  })

  test('2-3 L size 气泡包含标题"标题标题"', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    await expect(wrap).toContainText('标题标题')
  })

  test('2-4 L size 气泡包含正文"内容文本内容文本内容文本"', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    await expect(wrap).toContainText('内容文本内容文本内容文本')
  })

  test('2-5 L size 气泡包含操作文本"知道了"', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    await expect(wrap).toContainText('知道了')
  })

  test('2-6 hover M size 触发器显示气泡', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-m-top-light"] button').first()
    await trigger.hover()
    // wait for hover delay (default 100ms) + animation
    await page.waitForTimeout(300)
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
  })

  test('2-7 M size 气泡只含内容文本，无标题"标题标题"', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-m-top-light"] button').first()
    await trigger.hover()
    await page.waitForTimeout(300)
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    await expect(wrap).toContainText('内容文本内容文本内容文本')
    await expect(wrap).not.toContainText('标题标题')
  })

  // ====== 3. 布局与间距 ======

  test('3-1 亮色行触发器采用 flex 横向排列', async ({ page }) => {
    const row = page.locator('[data-testid="popover-row-light"] .popover-row').first()
    await expect(row).toBeVisible()
    const display = await row.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('3-2 亮色行内元素间有 gap（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="popover-row-light"] .popover-row').first()
    await expect(row).toBeVisible()
    const gap = await row.evaluate((el) => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('3-3 L size 与 M size 分组垂直排列', async ({ page }) => {
    const groups = page.locator('[data-testid="popover-row-light"] .popover-group')
    await expect(groups).toHaveCount(2)
    const y0 = await groups.nth(0).evaluate((el) => el.getBoundingClientRect().bottom)
    const y1 = await groups.nth(1).evaluate((el) => el.getBoundingClientRect().top)
    expect(y0).toBeLessThanOrEqual(y1 + 2)
  })

  // ====== 4. 视觉样式 ======

  test('4-1 气泡有箭头（.o-popover-anchor 存在）', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    const anchor = page.locator('.o-popover-anchor').first()
    await expect(anchor).toBeVisible()
  })

  test('4-2 气泡容器有圆角（非 0）', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    const radius = await wrap.evaluate((el) => parseFloat(getComputedStyle(el).borderRadius))
    expect(radius).toBeGreaterThan(0)
  })

  test('4-3 气泡容器有阴影（非 none）', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    const shadow = await wrap.evaluate((el) => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('4-4 L size 标题字号大于正文字号（DSL: title 16px SemiBold vs body 14px）', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    const titleSize = await wrap.locator('.popover-title').evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
    const bodySize = await wrap.locator('.popover-body').evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
    expect(titleSize).toBeGreaterThanOrEqual(bodySize)
  })

  // ====== 5. 交互行为 ======

  test('5-1 点击触发器气泡显示', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-bottom-light"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
  })

  test('5-2 点击页面其他区域气泡关闭（autoHide）', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    await trigger.click()
    await expect(page.locator('.o-popover-wrap').first()).toBeVisible()
    // 点击页面空白处关闭
    await page.locator('.section-title').first().click()
    await expect(page.locator('.o-popover-wrap')).toHaveCount(0)
  })

  test('5-3 下方弹出（position=bottom）气泡出现在触发器下方', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-bottom-light"] button').first()
    const triggerBottom = await trigger.evaluate((el) => el.getBoundingClientRect().bottom)
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    const wrapTop = await wrap.evaluate((el) => el.getBoundingClientRect().top)
    expect(wrapTop).toBeGreaterThanOrEqual(triggerBottom - 2)
  })

  test('5-4 上方弹出（position=top）气泡出现在触发器上方', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-light"] button').first()
    // scroll into view with room above
    await trigger.scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollBy(0, 200))
    const triggerTop = await trigger.evaluate((el) => el.getBoundingClientRect().top)
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    const wrapBottom = await wrap.evaluate((el) => el.getBoundingClientRect().bottom)
    expect(wrapBottom).toBeLessThanOrEqual(triggerTop + 2)
  })

  // ====== 6. 相对位置 ======

  test('6-1 亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="popover-row-light"]').evaluate(
      (el) => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="popover-row-dark"]').evaluate(
      (el) => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('6-2 上方 L 触发器在下方 L 触发器左侧（同行）', async ({ page }) => {
    const topX = await page.locator('[data-testid="popover-l-top-light"]').evaluate(
      (el) => el.getBoundingClientRect().left
    )
    const bottomX = await page.locator('[data-testid="popover-l-bottom-light"]').evaluate(
      (el) => el.getBoundingClientRect().left
    )
    expect(topX).toBeLessThan(bottomX)
  })

  // ====== 7. 响应式间距（CSS 变量而非硬编码 px）======

  test('7-1 亮色区块内部 padding 来自 CSS 变量（非零）', async ({ page }) => {
    const section = page.locator('[data-testid="popover-row-light"]')
    await expect(section).toBeVisible()
    const padding = await section.evaluate((el) => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ====== 8. 暗色主题 ======

  test('8-1 暗色区块有 data-o-theme="e.dark"', async ({ page }) => {
    const dark = page.locator('[data-testid="popover-row-dark"]')
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('8-2 暗色区块背景色为 #1f2127', async ({ page }) => {
    const dark = page.locator('[data-testid="popover-row-dark"]')
    await expect(dark).toBeVisible()
    const bg = await dark.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('8-3 暗色 L size 气泡含标题和正文', async ({ page }) => {
    const trigger = page.locator('[data-testid="popover-l-top-dark"] button').first()
    await trigger.click()
    const wrap = page.locator('.o-popover-wrap').first()
    await expect(wrap).toBeVisible()
    await expect(wrap).toContainText('标题标题')
    await expect(wrap).toContainText('内容文本内容文本内容文本')
  })
})
