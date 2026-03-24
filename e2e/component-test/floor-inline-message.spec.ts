import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OMessage 内联提示楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OMessage 内联提示"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OMessage 内联提示' })).toBeVisible()
  })

  test('楼层描述含设计稿 ID 28:7501', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '28:7501' })).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="inline-msg-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="inline-msg-row-dark"]')).toBeVisible()
  })

  test('亮色区块有 4 个列', async ({ page }) => {
    const cols = page.locator('[data-testid="inline-msg-row-light"] .msg-col')
    await expect(cols).toHaveCount(4)
  })

  test('暗色区块有 4 个列', async ({ page }) => {
    const cols = page.locator('[data-testid="inline-msg-row-dark"] .msg-col')
    await expect(cols).toHaveCount(4)
  })

  test('亮色区块每列有 4 个 OMessage（4种状态）', async ({ page }) => {
    const firstCol = page.locator('[data-testid="inline-msg-row-light"] .msg-col').first()
    const messages = firstCol.locator('.o-message')
    await expect(messages).toHaveCount(4)
  })

  test('亮色列1 有 success 状态消息', async ({ page }) => {
    await expect(page.locator('[data-testid="inline-msg-title-success"]')).toBeVisible()
  })

  test('亮色列1 有 info 状态消息', async ({ page }) => {
    await expect(page.locator('[data-testid="inline-msg-title-info"]')).toBeVisible()
  })

  test('亮色列1 有 danger 状态消息', async ({ page }) => {
    await expect(page.locator('[data-testid="inline-msg-title-danger"]')).toBeVisible()
  })

  test('亮色列1 有 warning 状态消息', async ({ page }) => {
    await expect(page.locator('[data-testid="inline-msg-title-warning"]')).toBeVisible()
  })

  test('亮色列2 消息有关闭按钮（closable）', async ({ page }) => {
    const col2 = page.locator('[data-testid="inline-msg-row-light"] .msg-col').nth(1)
    const closeBtn = col2.locator('.o-message-close').first()
    await expect(closeBtn).toBeVisible()
  })

  test('亮色列1 消息无关闭按钮', async ({ page }) => {
    const msg = page.locator('[data-testid="inline-msg-title-success"]')
    await expect(msg).toBeVisible()
    const closeBtn = msg.locator('.o-message-close')
    await expect(closeBtn).toHaveCount(0)
  })

  test('亮色列3 消息有 colorful 类', async ({ page }) => {
    await expect(
      page.locator('[data-testid="inline-msg-colorful-title-success"]')
    ).toHaveClass(/o-message-colorful/)
  })

  test('亮色列1 消息无 colorful 类（白色背景）', async ({ page }) => {
    const msg = page.locator('[data-testid="inline-msg-title-success"]')
    await expect(msg).toBeVisible()
    const cls = await msg.getAttribute('class')
    expect(cls).not.toContain('o-message-colorful')
  })

  test('亮色列4 消息同时有 colorful 类和关闭按钮', async ({ page }) => {
    const msg = page.locator('[data-testid="inline-msg-colorful-closable-success"]')
    await expect(msg).toHaveClass(/o-message-colorful/)
    await expect(msg.locator('.o-message-close')).toBeVisible()
  })

  test('亮色列1 success 消息有 .o-message-success 类', async ({ page }) => {
    await expect(
      page.locator('[data-testid="inline-msg-title-success"]')
    ).toHaveClass(/o-message-success/)
  })

  test('亮色列1 info 消息有 .o-message-info 类', async ({ page }) => {
    await expect(
      page.locator('[data-testid="inline-msg-title-info"]')
    ).toHaveClass(/o-message-info/)
  })

  test('亮色列1 danger 消息有 .o-message-danger 类', async ({ page }) => {
    await expect(
      page.locator('[data-testid="inline-msg-title-danger"]')
    ).toHaveClass(/o-message-danger/)
  })

  test('亮色列1 warning 消息有 .o-message-warning 类', async ({ page }) => {
    await expect(
      page.locator('[data-testid="inline-msg-title-warning"]')
    ).toHaveClass(/o-message-warning/)
  })

  test('亮色列1 消息有标题区域', async ({ page }) => {
    const msg = page.locator('[data-testid="inline-msg-title-success"]')
    await expect(msg.locator('.o-message-title')).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('亮色列2 消息默认可见（defaultVisible=true）', async ({ page }) => {
    const msg = page.locator('[data-testid="inline-msg-closable-success"]')
    await expect(msg).toBeVisible()
  })

  test('暗色列1 有 4 个消息（4种状态）', async ({ page }) => {
    const firstCol = page.locator('[data-testid="inline-msg-row-dark"] .msg-col').first()
    await expect(firstCol.locator('.o-message')).toHaveCount(4)
  })

  test('暗色列3 success 消息有 colorful 类', async ({ page }) => {
    await expect(
      page.locator('[data-testid="inline-msg-dark-colorful-title-success"]')
    ).toHaveClass(/o-message-colorful/)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色列间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const grid = page.locator('[data-testid="inline-msg-row-light"] .msg-grid')
    const gap = await grid.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('消息列表内 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const msgList = page.locator('[data-testid="inline-msg-row-light"] .msg-list').first()
    const gap = await msgList.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('亮色四列横向排列（flex row）', async ({ page }) => {
    const grid = page.locator('[data-testid="inline-msg-row-light"] .msg-grid')
    const display = await grid.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const flexDir = await grid.evaluate(el => getComputedStyle(el).flexDirection)
    expect(flexDir).toBe('row')
  })

  // ---- 维度4：视觉样式（字号/颜色/圆角/行高/边框/阴影）----

  test('亮色列1 消息有阴影（非 none）', async ({ page }) => {
    // DSL 溯源：默认模式有 box-shadow (--o-shadow-2)，colorful 模式无阴影
    const msg = page.locator('[data-testid="inline-msg-title-success"]')
    await expect(msg).toBeVisible()
    const shadow = await msg.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('亮色列3 colorful 消息无阴影', async ({ page }) => {
    // DSL 溯源：colorful 模式 shadow=none
    const msg = page.locator('[data-testid="inline-msg-colorful-title-success"]')
    await expect(msg).toBeVisible()
    const shadow = await msg.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).toBe('none')
  })

  test('暗色区块有深色背景', async ({ page }) => {
    const darkRow = page.locator('[data-testid="inline-msg-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // background: #1f2127 → rgb(31,33,39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const floors = page.locator('.section-title').filter({ hasText: 'OMessage 内联提示' })
    const fontSize = await floors.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    // 字号 mixin 在 1920px 断点下应在合理范围内
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  // ---- 维度5：交互行为 ----

  test('点击亮色列2 success 消息的关闭按钮后消息消失', async ({ page }) => {
    const msg = page.locator('[data-testid="inline-msg-closable-success"]')
    await expect(msg).toBeVisible()
    await msg.locator('.o-message-close').click()
    await expect(msg).not.toBeVisible()
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="inline-msg-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="inline-msg-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('列1 在列2 左侧', async ({ page }) => {
    const col1 = page.locator('[data-testid="inline-msg-row-light"] .msg-col').nth(0)
    const col2 = page.locator('[data-testid="inline-msg-row-light"] .msg-col').nth(1)
    const x1 = await col1.evaluate(el => el.getBoundingClientRect().left)
    const x2 = await col2.evaluate(el => el.getBoundingClientRect().left)
    expect(x1).toBeLessThan(x2)
  })

  test('列2 在列3 左侧', async ({ page }) => {
    const col2 = page.locator('[data-testid="inline-msg-row-light"] .msg-col').nth(1)
    const col3 = page.locator('[data-testid="inline-msg-row-light"] .msg-col').nth(2)
    const x2 = await col2.evaluate(el => el.getBoundingClientRect().left)
    const x3 = await col3.evaluate(el => el.getBoundingClientRect().left)
    expect(x2).toBeLessThan(x3)
  })

  test('列3 在列4 左侧', async ({ page }) => {
    const col3 = page.locator('[data-testid="inline-msg-row-light"] .msg-col').nth(2)
    const col4 = page.locator('[data-testid="inline-msg-row-light"] .msg-col').nth(3)
    const x3 = await col3.evaluate(el => el.getBoundingClientRect().left)
    const x4 = await col4.evaluate(el => el.getBoundingClientRect().left)
    expect(x3).toBeLessThan(x4)
  })

  test('每列内消息从上到下垂直排列（success 在 info 上方）', async ({ page }) => {
    const successY = await page.locator('[data-testid="inline-msg-title-success"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const infoY = await page.locator('[data-testid="inline-msg-title-info"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(successY).toBeLessThan(infoY)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('暗色区块 msg-grid 间距来自 CSS 变量（非零）', async ({ page }) => {
    const grid = page.locator('[data-testid="inline-msg-row-dark"] .msg-grid')
    const gap = await grid.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('亮色四列顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cols = page.locator('[data-testid="inline-msg-row-light"] .msg-col')
    const tops = await cols.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
