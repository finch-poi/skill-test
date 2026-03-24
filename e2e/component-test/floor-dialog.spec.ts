import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test ODialog 弹窗楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"ODialog 弹窗"', async ({ page }) => {
    await expect(page.locator('.section-title')).toContainText('ODialog 弹窗')
  })

  test('楼层描述含设计稿 ID 31:3338', async ({ page }) => {
    await expect(page.locator('.section-subtitle')).toContainText('31:3338')
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="dialog-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="dialog-row-dark"]')).toBeVisible()
  })

  test('亮色区块有 5 个触发按钮', async ({ page }) => {
    const row = page.locator('[data-testid="dialog-row-light"]')
    const btns = row.locator('.o-btn')
    await expect(btns).toHaveCount(5)
  })

  test('暗色区块有 5 个触发按钮', async ({ page }) => {
    const row = page.locator('[data-testid="dialog-row-dark"]')
    const btns = row.locator('.o-btn')
    await expect(btns).toHaveCount(5)
  })

  // ---- 维度2：默认状态正确性 ----

  test('初始状态下所有弹窗均关闭（无 .o-dlg-main 可见）', async ({ page }) => {
    const dialogs = page.locator('.o-dlg-main')
    // dialogs should not be visible (all closed by default)
    const count = await dialogs.count()
    expect(count).toBe(0)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色区块有阴影（非 none）', async ({ page }) => {
    const section = page.locator('[data-testid="dialog-row-light"]')
    const shadow = await section.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('亮色区块内对话框单元格横向排列（flex）', async ({ page }) => {
    const row = page.locator('[data-testid="dialog-row-light"] .dialog-row')
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  // ---- 维度4：视觉样式 ----

  test('暗色区块有深色背景 rgb(31,33,39)', async ({ page }) => {
    const darkRow = page.locator('[data-testid="dialog-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page.locator('.section-title').evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    // h3 mixin 在 1920px 断点 ≈ 16–28px
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  // ---- 维度5：交互行为（点击触发弹窗）----

  test('点击亮色区块第1个按钮弹出弹窗（有标题和内容）', async ({ page }) => {
    await page.locator('[data-testid="btn-light-dialog1"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    // 标题区
    await expect(dialog.locator('.o-dlg-header')).toBeVisible()
    // 主体内容
    await expect(dialog.locator('.o-dlg-body')).toBeVisible()
    // 底部按钮区
    await expect(dialog.locator('.o-dlg-actions')).toBeVisible()
  })

  test('亮色弹窗1有两个操作按钮（强调按钮+普通按钮）', async ({ page }) => {
    await page.locator('[data-testid="btn-light-dialog1"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    const actionBtns = dialog.locator('.o-dlg-actions .o-btn')
    await expect(actionBtns).toHaveCount(2)
    await expect(actionBtns.first()).toContainText('强调按钮')
    await expect(actionBtns.last()).toContainText('普通按钮')
  })

  test('亮色弹窗1有关闭按钮（.o-dlg-btn-close）', async ({ page }) => {
    await page.locator('[data-testid="btn-light-dialog1"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.o-dlg-btn-close')).toBeVisible()
  })

  test('点击关闭按钮可关闭亮色弹窗1', async ({ page }) => {
    await page.locator('[data-testid="btn-light-dialog1"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    await dialog.locator('.o-dlg-btn-close').click()
    await expect(dialog).not.toBeVisible()
  })

  test('亮色弹窗3只有1个操作按钮（知道了）', async ({ page }) => {
    await page.locator('[data-testid="btn-light-dialog3"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    const actionBtns = dialog.locator('.o-dlg-actions .o-btn')
    await expect(actionBtns).toHaveCount(1)
    await expect(actionBtns.first()).toContainText('知道了')
  })

  test('亮色弹窗4无关闭按钮（hide-close）', async ({ page }) => {
    await page.locator('[data-testid="btn-light-dialog4"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    const closeBtn = dialog.locator('.o-dlg-btn-close')
    const count = await closeBtn.count()
    expect(count).toBe(0)
  })

  test('点击取消按钮可关闭亮色弹窗2', async ({ page }) => {
    await page.locator('[data-testid="btn-light-dialog2"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    const cancelBtn = dialog.locator('.o-dlg-actions .o-btn').last()
    await cancelBtn.click()
    await expect(dialog).not.toBeVisible()
  })

  test('点击暗色区块第1个按钮也能弹出弹窗', async ({ page }) => {
    await page.locator('[data-testid="btn-dark-dialog1"]').click()
    const dialog = page.locator('.o-dlg-main').first()
    await expect(dialog).toBeVisible()
    await expect(dialog.locator('.o-dlg-header')).toBeVisible()
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="dialog-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="dialog-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量（非零）----

  test('亮色 dialog-row 内 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="dialog-row-light"] .dialog-row')
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('亮色区块内各单元格顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cells = page.locator('[data-testid="dialog-row-light"] .dialog-cell')
    const tops = await cells.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    if (tops.length > 1) {
      const diff = Math.max(...tops) - Math.min(...tops)
      expect(diff).toBeLessThanOrEqual(2)
    }
  })
})
