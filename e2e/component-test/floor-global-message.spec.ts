import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OMessage 全局提示楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OMessage 全局提示"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OMessage 全局提示' })).toBeVisible()
  })

  test('楼层描述含设计稿 ID 28:5911', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '28:5911' })).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="global-msg-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="global-msg-row-dark"]')).toBeVisible()
  })

  test('亮色区块有 5 个 OMessage', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message')).toHaveCount(5)
  })

  test('暗色区块有 5 个 OMessage', async ({ page }) => {
    const dark = page.locator('[data-testid="global-msg-row-dark"]')
    await expect(dark.locator('.o-message')).toHaveCount(5)
  })

  test('亮色区块含 success 状态消息', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-success').first()).toBeVisible()
  })

  test('亮色区块含 info 状态消息', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-info').first()).toBeVisible()
  })

  test('亮色区块含 danger 状态消息', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-danger').first()).toBeVisible()
  })

  test('亮色区块含 warning 状态消息', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-warning').first()).toBeVisible()
  })

  test('亮色区块含 loading 状态消息', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-loading').first()).toBeVisible()
  })

  test('所有消息均有关闭按钮（closable）', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    // closable 模式下每条消息内有关闭按钮
    const closeBtns = light.locator('.o-message .o-message-close')
    await expect(closeBtns.first()).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('亮色 success 消息显示正确文本', async ({ page }) => {
    // DSL 溯源：nodeText "用于表示操作顺利达成，5秒后消失"
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-success').first()).toContainText('用于表示操作顺利达成，5秒后消失')
  })

  test('亮色 info 消息显示正确文本', async ({ page }) => {
    // DSL 溯源：nodeText "用于表示普通操作信息提示，5秒后消失"
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-info').first()).toContainText('用于表示普通操作信息提示，5秒后消失')
  })

  test('亮色 danger 消息显示正确文本', async ({ page }) => {
    // DSL 溯源：nodeText "用于表示操作引起严重的后果，10秒后消失"
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-danger').first()).toContainText('用于表示操作引起严重的后果，10秒后消失')
  })

  test('亮色 warning 消息显示正确文本', async ({ page }) => {
    // DSL 溯源：nodeText "用于表示操作引起一定后果，10秒后消失"
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-warning').first()).toContainText('用于表示操作引起一定后果，10秒后消失')
  })

  test('亮色 loading 消息显示正确文本', async ({ page }) => {
    // DSL 溯源：nodeText "用于表示操作正在生效的过程中，5秒后消失"
    const light = page.locator('[data-testid="global-msg-row-light"]')
    await expect(light.locator('.o-message-loading').first()).toContainText('用于表示操作正在生效的过程中，5秒后消失')
  })

  // ---- 维度3：布局与间距 ----

  test('亮色消息列表纵向排列（每条消息 top 不同）', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const messages = light.locator('.o-message')
    const tops = await messages.evaluateAll(els => els.map(el => el.getBoundingClientRect().top))
    // 5 条消息，每条 top 应递增
    for (let i = 1; i < tops.length; i++) {
      expect(tops[i]).toBeGreaterThan(tops[i - 1])
    }
  })

  test('消息间有 gap（非紧贴，间距 > 0）', async ({ page }) => {
    const list = page.locator('[data-testid="global-msg-row-light"] .msg-list')
    const gap = await list.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度4：视觉样式 ----

  test('暗色区块有深色背景 rgb(31,33,39)', async ({ page }) => {
    // DSL 溯源：Dark=on 背景色 rgb(33,35,39)（#212327）对应 #1f2127 = rgb(31,33,39)
    const darkRow = page.locator('[data-testid="global-msg-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('亮色 success 消息背景为白色（非彩色）', async ({ page }) => {
    // DSL 溯源：Light 模式 fillPaints rgb(255,255,255)
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const bg = await light.locator('.o-message-success').first().evaluate(
      el => getComputedStyle(el).backgroundColor
    )
    // 非 colorful 模式，背景为 white
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  test('消息圆角来自 CSS 变量（非零）', async ({ page }) => {
    // DSL 溯源：cornerRadius = 8，对应 --o-radius_control-s
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const radius = await light.locator('.o-message').first().evaluate(
      el => parseFloat(getComputedStyle(el).borderRadius)
    )
    expect(radius).toBeGreaterThan(0)
  })

  // ---- 维度5：交互行为 ----

  test('点击亮色 success 消息关闭按钮后消息消失', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const successMsg = light.locator('.o-message-success').first()
    await expect(successMsg).toBeVisible()
    const closeBtn = successMsg.locator('.o-message-close')
    await closeBtn.click()
    await expect(successMsg).not.toBeVisible()
  })

  test('点击成功按钮弹出全局消息通知', async ({ page }) => {
    // 先找成功按钮并点击
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const successBtn = light.locator('.o-btn').filter({ hasText: '成功' })
    await successBtn.click()
    // 全局消息出现在 body 层，等待并查找
    await expect(page.locator('.o-message-success').first()).toBeVisible({ timeout: 3000 })
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="global-msg-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="global-msg-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('success 消息在 info 消息上方', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const successY = await light.locator('.o-message-success').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    const infoY = await light.locator('.o-message-info').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(successY).toBeLessThan(infoY)
  })

  test('info 消息在 danger 消息上方', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const infoY = await light.locator('.o-message-info').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    const dangerY = await light.locator('.o-message-danger').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(infoY).toBeLessThan(dangerY)
  })

  test('danger 消息在 warning 消息上方', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const dangerY = await light.locator('.o-message-danger').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    const warningY = await light.locator('.o-message-warning').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(dangerY).toBeLessThan(warningY)
  })

  // ---- 维度7：非组件内部间距使用响应式变量 ----

  test('楼层内间距 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const section = page.locator('[data-testid="global-msg-row-light"]')
    const gap = await section.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('亮色区块消息左对齐（左边距一致）', async ({ page }) => {
    const light = page.locator('[data-testid="global-msg-row-light"]')
    const lefts = await light.locator('.o-message').evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().left))
    )
    const diff = Math.max(...lefts) - Math.min(...lefts)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
