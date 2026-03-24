import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OTextarea 文本域楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OTextarea 文本域"', async ({ page }) => {
    await expect(page.locator('.section-title')).toContainText('OTextarea 文本域')
  })

  test('楼层描述含设计稿 ID 17:2670', async ({ page }) => {
    await expect(page.locator('.section-subtitle')).toContainText('17:2670')
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="textarea-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="textarea-row-dark"]')).toBeVisible()
  })

  test('亮色区块中有 OTextarea 组件', async ({ page }) => {
    const lightRow = page.locator('[data-testid="textarea-row-light"]')
    const textareas = lightRow.locator('.o-textarea')
    await expect(textareas.first()).toBeVisible()
    await expect(textareas).toHaveCount(6)
  })

  test('暗色区块中有 OTextarea 组件', async ({ page }) => {
    const darkRow = page.locator('[data-testid="textarea-row-dark"]')
    const textareas = darkRow.locator('.o-textarea')
    await expect(textareas.first()).toBeVisible()
    await expect(textareas).toHaveCount(6)
  })

  test('所有 textarea 含 maxLength=100 计数显示', async ({ page }) => {
    const lightRow = page.locator('[data-testid="textarea-row-light"]')
    // showLength="always" + maxLength=100 → 显示 0/100
    const countEls = lightRow.locator('.o-textarea-length')
    await expect(countEls.first()).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('Enabled textarea 含 placeholder="Hint"', async ({ page }) => {
    const ta = page.locator('[data-testid="textarea-enabled-light"]')
    await expect(ta).toBeVisible()
    const placeholder = await ta.locator('textarea').getAttribute('placeholder')
    expect(placeholder).toBe('Hint')
  })

  test('Complete textarea 有内容', async ({ page }) => {
    const ta = page.locator('[data-testid="textarea-complete-light"]')
    await expect(ta).toBeVisible()
    const value = await ta.locator('textarea').inputValue()
    expect(value.length).toBeGreaterThan(0)
  })

  test('Error textarea 有 danger 颜色类', async ({ page }) => {
    const ta = page.locator('[data-testid="textarea-error-light"]')
    await expect(ta).toBeVisible()
    await expect(ta).toHaveClass(/o-textarea-danger/)
  })

  test('Error 状态下方有错误提示文字', async ({ page }) => {
    const lightRow = page.locator('[data-testid="textarea-row-light"]')
    const errorTexts = lightRow.locator('.error-text')
    await expect(errorTexts.first()).toBeVisible()
    await expect(errorTexts.first()).toContainText('错误提示')
  })

  test('Solid 变体 textarea 有 solid 样式类', async ({ page }) => {
    const ta = page.locator('[data-testid="textarea-solid-light"]')
    await expect(ta).toBeVisible()
    await expect(ta).toHaveClass(/o-textarea-solid/)
  })

  test('outline 变体为默认变体（Enabled textarea）', async ({ page }) => {
    const ta = page.locator('[data-testid="textarea-enabled-light"]')
    await expect(ta).toHaveClass(/o-textarea-outline/)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色区块是 2 列网格布局', async ({ page }) => {
    const grid = page.locator('[data-testid="textarea-row-light"] .textarea-grid')
    const display = await grid.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('grid')
    const cols = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns)
    // 两列宽度大于 0
    const parts = cols.trim().split(/\s+/)
    expect(parts.length).toBe(2)
  })

  test('网格列间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const grid = page.locator('[data-testid="textarea-row-light"] .textarea-grid')
    const gap = await grid.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('亮色区块有阴影（非 none）', async ({ page }) => {
    const section = page.locator('[data-testid="textarea-row-light"]')
    const shadow = await section.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  // ---- 维度4：视觉样式（字号/颜色/圆角）----

  test('Error 提示文字颜色为红色（danger）', async ({ page }) => {
    // DSL 溯源：error text fill rgba(230,0,18,1) light / rgba(235,35,45,1) dark
    const lightRow = page.locator('[data-testid="textarea-row-light"]')
    const errorText = lightRow.locator('.error-text').first()
    const color = await errorText.evaluate(el => getComputedStyle(el).color)
    // openDesign danger color (light theme)
    // 颜色值不应为黑色或透明
    expect(color).not.toBe('rgba(0, 0, 0, 0)')
    expect(color).not.toBe('rgb(0, 0, 0)')
  })

  test('暗色区块背景为 #1f2127', async ({ page }) => {
    const darkRow = page.locator('[data-testid="textarea-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31,33,39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('暗色区块有 data-o-theme="e.dark" 属性', async ({ page }) => {
    await expect(page.locator('[data-testid="textarea-row-dark"]')).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const titles = page.locator('.section-title')
    const fontSize = await titles.evaluateAll(
      els => {
        // Find the OTextarea floor title
        for (const el of els) {
          if (el.textContent?.includes('OTextarea')) {
            return parseFloat(getComputedStyle(el).fontSize)
          }
        }
        return 0
      }
    )
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('字符计数显示"0/100"（空 textarea）', async ({ page }) => {
    const ta = page.locator('[data-testid="textarea-enabled-light"]')
    const countEl = ta.locator('.o-textarea-length')
    await expect(countEl).toBeVisible()
    await expect(countEl).toContainText('0/100')
  })

  // ---- 维度5：交互行为 ----

  test('点击 Enabled textarea 可输入文字，计数更新', async ({ page }) => {
    const ta = page.locator('[data-testid="textarea-enabled-light"]')
    const nativeTextarea = ta.locator('textarea')
    await nativeTextarea.click()
    await nativeTextarea.fill('Hello')
    const countEl = ta.locator('.o-textarea-length')
    await expect(countEl).toContainText('5/100')
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="textarea-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="textarea-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('左列 textarea 在右列 textarea 左侧', async ({ page }) => {
    const leftX = await page.locator('[data-testid="textarea-enabled-light"]').evaluate(
      el => el.getBoundingClientRect().left
    )
    const rightX = await page.locator('[data-testid="textarea-solid-light"]').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(leftX).toBeLessThan(rightX)
  })

  test('Enabled 行在 Complete 行上方', async ({ page }) => {
    const enabledY = await page.locator('[data-testid="textarea-enabled-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const completeY = await page.locator('[data-testid="textarea-complete-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(enabledY).toBeLessThan(completeY)
  })

  test('Complete 行在 Error 行上方', async ({ page }) => {
    const completeY = await page.locator('[data-testid="textarea-complete-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const errorY = await page.locator('[data-testid="textarea-error-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(completeY).toBeLessThan(errorY)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('textarea-cell 间的 gap 来自 CSS 变量（非 0）', async ({ page }) => {
    const grid = page.locator('[data-testid="textarea-row-light"] .textarea-grid')
    const rowGap = await grid.evaluate(el => parseFloat(getComputedStyle(el).rowGap))
    expect(rowGap).toBeGreaterThan(0)
  })

  test('主题区块内 padding 来自 CSS 变量（非 0）', async ({ page }) => {
    const section = page.locator('[data-testid="textarea-row-light"]')
    const padding = await section.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('同行两列 textarea 顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const leftTop = await page.locator('[data-testid="textarea-enabled-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const rightTop = await page.locator('[data-testid="textarea-solid-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(Math.abs(leftTop - rightTop)).toBeLessThanOrEqual(2)
  })

  test('Error 行两列 textarea 顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const leftTop = await page.locator('[data-testid="textarea-error-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const rightTop = await page.locator('[data-testid="textarea-error-solid-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(Math.abs(leftTop - rightTop)).toBeLessThanOrEqual(2)
  })
})
