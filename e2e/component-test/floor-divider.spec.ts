import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test ODivider 分割线楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"ODivider 分割线"', async ({ page }) => {
    await expect(page.locator('.section-title')).toContainText('ODivider 分割线')
  })

  test('楼层描述含设计稿 ID 16:4214', async ({ page }) => {
    await expect(page.locator('.section-subtitle')).toContainText('16:4214')
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="divider-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="divider-row-dark"]')).toBeVisible()
  })

  test('亮色区块内有水平实线分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-solid"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-h/)
  })

  test('亮色区块内有水平虚线分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-dashed"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-dashed/)
  })

  test('亮色区块内有水平点线分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-dotted"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-dotted/)
  })

  test('亮色区块内有深色分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-darker"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-darker/)
  })

  test('亮色区块内有带居中标签的分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-label-center"]')
    await expect(divider).toBeVisible()
    await expect(divider.locator('.o-divider-label')).toContainText('文字标签')
  })

  test('亮色区块内有带靠左标签的分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-label-left"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-label-left/)
    await expect(divider.locator('.o-divider-label')).toContainText('开始')
  })

  test('亮色区块内有带靠右标签的分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-label-right"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-label-right/)
    await expect(divider.locator('.o-divider-label')).toContainText('结束')
  })

  test('亮色区块内有垂直分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-v-solid"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-v/)
  })

  test('亮色区块内行内垂直区域含3种垂直分割线', async ({ page }) => {
    const row = page.locator('[data-testid="divider-v-row"]')
    await expect(row).toBeVisible()
    const vDividers = row.locator('.o-divider-v')
    await expect(vDividers).toHaveCount(3)
  })

  test('暗色区块内有水平实线分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-solid-dark"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-h/)
  })

  test('暗色区块内有带标签的分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-label-center-dark"]')
    await expect(divider).toBeVisible()
    await expect(divider.locator('.o-divider-label')).toContainText('文字标签')
  })

  test('暗色区块内有垂直分割线', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-v-solid-dark"]')
    await expect(divider).toBeVisible()
    await expect(divider).toHaveClass(/o-divider-v/)
  })

  // ---- 维度2：默认状态正确性 ----

  test('默认水平分割线有 role="separator"', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-solid"]')
    await expect(divider).toHaveAttribute('role', 'separator')
  })

  test('默认水平分割线宽度撑满容器', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-solid"]')
    const width = await divider.evaluate(el => getComputedStyle(el).width)
    // 宽度应为非零
    expect(parseFloat(width)).toBeGreaterThan(100)
  })

  test('无标签水平分割线内有一个 .o-divider-line', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-solid"]')
    const lines = divider.locator('.o-divider-line')
    await expect(lines).toHaveCount(1)
  })

  test('带标签水平分割线内有两个 .o-divider-line（左右两段）', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-label-center"]')
    const lines = divider.locator('.o-divider-line')
    await expect(lines).toHaveCount(2)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色区块有阴影', async ({ page }) => {
    const section = page.locator('[data-testid="divider-row-light"]')
    const shadow = await section.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('垂直分割线是 inline-block', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-v-solid"]')
    const display = await divider.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('inline-block')
  })

  test('水平分割线 display 为 flex', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-solid"]')
    const display = await divider.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  // ---- 维度4：视觉样式 ----

  test('水平实线分割线含 border-top 样式', async ({ page }) => {
    // DSL 溯源：线段 1px solid var(--o-color-control4)
    const line = page.locator('[data-testid="divider-h-solid"] .o-divider-line').first()
    await expect(line).toBeVisible()
    const borderTop = await line.evaluate(el => getComputedStyle(el).borderTopStyle)
    expect(borderTop).toBe('solid')
  })

  test('虚线分割线含 border-top dashed 样式', async ({ page }) => {
    const line = page.locator('[data-testid="divider-h-dashed"] .o-divider-line').first()
    await expect(line).toBeVisible()
    const borderStyle = await line.evaluate(el => getComputedStyle(el).borderTopStyle)
    expect(borderStyle).toBe('dashed')
  })

  test('点线分割线含 border-top dotted 样式', async ({ page }) => {
    const line = page.locator('[data-testid="divider-h-dotted"] .o-divider-line').first()
    await expect(line).toBeVisible()
    const borderStyle = await line.evaluate(el => getComputedStyle(el).borderTopStyle)
    expect(borderStyle).toBe('dotted')
  })

  test('暗色区块有深色背景 #1f2127', async ({ page }) => {
    const darkRow = page.locator('[data-testid="divider-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page.locator('[data-testid="divider-row-light"]')
      .locator('..')
      .locator('..')
      .locator('.section-title')
      .first()
      .evaluate(el => parseFloat(getComputedStyle(el).fontSize))
      .catch(() => {
        return page.locator('.section-title').evaluateAll(
          els => els.map(el => parseFloat(getComputedStyle(el).fontSize))
        )
      })
    // 取第一个楼层标题的字号（AppSection .section-title）
    const size = Array.isArray(fontSize) ? fontSize[0] : fontSize
    expect(size).toBeGreaterThanOrEqual(32)
    expect(size).toBeLessThanOrEqual(48)
  })

  // ---- 维度5：交互行为（ODivider 为静态组件，无交互） ----
  // ODivider 无交互事件，仅验证静态渲染

  test('分割线为静态组件（无 button/click 等交互属性）', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-h-solid"]')
    const tagName = await divider.evaluate(el => el.tagName.toLowerCase())
    // 分割线应为 div 而非 button
    expect(tagName).not.toBe('button')
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="divider-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="divider-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('带标签分割线中标签位于两线段之间', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-label-center"]')
    const lines = divider.locator('.o-divider-line')
    const label = divider.locator('.o-divider-label')

    const leftLineRight = await lines.first().evaluate(el => el.getBoundingClientRect().right)
    const labelLeft = await label.evaluate(el => el.getBoundingClientRect().left)
    const labelRight = await label.evaluate(el => el.getBoundingClientRect().right)
    const rightLineLeft = await lines.last().evaluate(el => el.getBoundingClientRect().left)

    expect(leftLineRight).toBeLessThanOrEqual(labelLeft + 1) // 左线在标签左侧
    expect(labelRight).toBeLessThanOrEqual(rightLineLeft + 1) // 标签在右线左侧
  })

  test('垂直分割线在相邻文字之间（水平位置）', async ({ page }) => {
    const row = page.locator('[data-testid="divider-v-row"]')
    const texts = row.locator('.inline-text')
    const vDivider = page.locator('[data-testid="divider-v-solid"]')

    const textARight = await texts.first().evaluate(el => el.getBoundingClientRect().right)
    const dividerLeft = await vDivider.evaluate(el => el.getBoundingClientRect().left)
    const dividerRight = await vDivider.evaluate(el => el.getBoundingClientRect().right)
    const textBLeft = await texts.nth(1).evaluate(el => el.getBoundingClientRect().left)

    expect(textARight).toBeLessThanOrEqual(dividerLeft + 15) // 文字在分割线左侧（含margin）
    expect(dividerRight).toBeLessThanOrEqual(textBLeft + 15) // 分割线在下一个文字左侧
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('demo 区块间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const section = page.locator('[data-testid="divider-row-light"]')
    const gap = await section.evaluate(el => parseFloat(getComputedStyle(el).rowGap))
    expect(gap).toBeGreaterThan(0)
  })

  test('demo 区块有内边距（非零）', async ({ page }) => {
    const block = page.locator('[data-testid="divider-row-light"] .demo-block').first()
    await expect(block).toBeVisible()
    const padding = await block.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('带标签分割线的标签与线段垂直居中对齐', async ({ page }) => {
    const divider = page.locator('[data-testid="divider-label-center"]')
    const alignItems = await divider.evaluate(el => getComputedStyle(el).alignItems)
    expect(alignItems).toBe('center')
  })

  test('垂直分割线行内区域内文字与分割线垂直居中（误差 ≤ 4px）', async ({ page }) => {
    const row = page.locator('[data-testid="divider-v-row"]')
    const texts = row.locator('.inline-text')
    const vDivider = page.locator('[data-testid="divider-v-solid"]')

    const textACenterY = await texts.first().evaluate(el => {
      const rect = el.getBoundingClientRect()
      return rect.top + rect.height / 2
    })
    const dividerCenterY = await vDivider.evaluate(el => {
      const rect = el.getBoundingClientRect()
      return rect.top + rect.height / 2
    })

    expect(Math.abs(textACenterY - dividerCenterY)).toBeLessThanOrEqual(4)
  })
})
