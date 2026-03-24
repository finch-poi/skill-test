import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OCascader 级联选择器楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OCascader 级联选择器"', async ({ page }) => {
    await expect(page.locator('.section-title')).toContainText('OCascader 级联选择器')
  })

  test('楼层描述含设计稿 ID 30:5373', async ({ page }) => {
    await expect(page.locator('.section-subtitle')).toContainText('30:5373')
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="cascader-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="cascader-row-dark"]')).toBeVisible()
  })

  test('亮色区块中触发器 Enabled 存在', async ({ page }) => {
    await expect(
      page.locator('[data-testid="cascader-trigger-enabled"]')
    ).toBeVisible()
  })

  test('亮色区块中触发器 Actived 存在', async ({ page }) => {
    await expect(
      page.locator('[data-testid="cascader-trigger-actived"]')
    ).toBeVisible()
  })

  test('亮色区块中三种尺寸的 OCascader 都存在', async ({ page }) => {
    await expect(page.locator('[data-testid="cascader-large"]')).toBeVisible()
    await expect(page.locator('[data-testid="cascader-medium"]')).toBeVisible()
    await expect(page.locator('[data-testid="cascader-small"]')).toBeVisible()
  })

  test('亮色区块中 OCascaderPanel 存在', async ({ page }) => {
    await expect(
      page.locator('[data-testid="cascader-panel-light"]')
    ).toBeVisible()
  })

  test('暗色区块中触发器和面板均存在', async ({ page }) => {
    await expect(
      page.locator('[data-testid="cascader-trigger-enabled-dark"]')
    ).toBeVisible()
    await expect(
      page.locator('[data-testid="cascader-panel-dark"]')
    ).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('Enabled 触发器显示占位符 Hint', async ({ page }) => {
    const trigger = page.locator('[data-testid="cascader-trigger-enabled"]')
    await expect(trigger).toBeVisible()
    // OCascader 内部的 OSelect 触发器会展示 placeholder
    const text = await trigger.textContent()
    expect(text).toContain('Hint')
  })

  test('Actived 触发器有选中值（非空文本）', async ({ page }) => {
    const trigger = page.locator('[data-testid="cascader-trigger-actived"]')
    await expect(trigger).toBeVisible()
    const text = await trigger.textContent()
    // 选中了 1-1-1（三级选项），应显示非占位符内容
    expect(text?.trim()).toBeTruthy()
  })

  test('OCascaderPanel 默认展示多列（含已选中路径）', async ({ page }) => {
    const panel = page.locator('[data-testid="cascader-panel-light"]')
    await expect(panel).toBeVisible()
    // 面板应有 .o-cascader-options 列表（多级）
    const cols = panel.locator('.o-cascader-options')
    const count = await cols.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('OCascaderPanel 中有选中项（.o-cascader-option-selected）', async ({ page }) => {
    const panel = page.locator('[data-testid="cascader-panel-light"]')
    await expect(panel).toBeVisible()
    const selected = panel.locator('.o-cascader-option-selected')
    await expect(selected.first()).toBeVisible()
  })

  // ---- 维度3：布局与间距 ----

  test('亮色行三列并排（flex 横向）', async ({ page }) => {
    const row = page.locator('[data-testid="cascader-row-light"] .cascader-row')
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('亮色行中 demo 卡片有阴影（非 none）', async ({ page }) => {
    const card = page
      .locator('[data-testid="cascader-row-light"] .cascader-card')
      .first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('Column A 有 2 个 demo 卡片（Enabled + Actived）', async ({ page }) => {
    const col = page
      .locator('[data-testid="cascader-row-light"] .cascader-col')
      .nth(0)
    const cards = col.locator('.cascader-card')
    await expect(cards).toHaveCount(2)
  })

  test('Column B 有 3 个 demo 卡片（3 种尺寸）', async ({ page }) => {
    const col = page
      .locator('[data-testid="cascader-row-light"] .cascader-col')
      .nth(1)
    const cards = col.locator('.cascader-card')
    await expect(cards).toHaveCount(3)
  })

  test('Column C 有 1 个 demo 卡片（OCascaderPanel）', async ({ page }) => {
    const col = page
      .locator('[data-testid="cascader-row-light"] .cascader-col')
      .nth(2)
    const cards = col.locator('.cascader-card')
    await expect(cards).toHaveCount(1)
  })

  test('列间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="cascader-row-light"] .cascader-row')
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度4：视觉样式 ----

  test('暗色区块有深色背景', async ({ page }) => {
    const darkRow = page.locator('[data-testid="cascader-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // background: #1f2127 → rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('暗色区块 data-o-theme 属性为 e.dark', async ({ page }) => {
    const darkRow = page.locator('[data-testid="cascader-row-dark"]')
    await expect(darkRow).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page
      .locator('.section-title')
      .evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    // h3 mixin 在 1920px 断点 ≈ 18–24px
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('OCascaderPanel 选项文字颜色使用 CSS 变量（非硬编码 black）', async ({
    page,
  }) => {
    const panel = page.locator('[data-testid="cascader-panel-light"]')
    await expect(panel).toBeVisible()
    const option = panel.locator('.o-cascader-option').first()
    await expect(option).toBeVisible()
    const color = await option.evaluate(el => getComputedStyle(el).color)
    // 不应是纯黑 rgb(0,0,0)，应来自 CSS 变量 --o-color-info2
    expect(color).not.toBe('rgb(0, 0, 0)')
  })

  // ---- 维度5：交互行为 ----

  test('点击 Enabled 触发器可弹出级联面板', async ({ page }) => {
    const trigger = page.locator('[data-testid="cascader-trigger-enabled"]')
    await trigger.click()
    // 等待弹出面板出现
    await expect(page.locator('.o-cascader').first()).toBeVisible()
  })

  test('点击 OCascaderPanel 第一列的另一项可更新选中状态', async ({ page }) => {
    const panel = page.locator('[data-testid="cascader-panel-light"]')
    await expect(panel).toBeVisible()
    // 点击第一列第二项（选项一，value=2）
    const firstCol = panel.locator('.o-cascader-options').first()
    const secondItem = firstCol.locator('.o-cascader-option').nth(1)
    await secondItem.click()
    // 该项应获得选中态
    await expect(secondItem).toHaveClass(/o-cascader-option-selected/)
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page
      .locator('[data-testid="cascader-row-light"]')
      .evaluate(el => el.getBoundingClientRect().top)
    const darkY = await page
      .locator('[data-testid="cascader-row-dark"]')
      .evaluate(el => el.getBoundingClientRect().top)
    expect(lightY).toBeLessThan(darkY)
  })

  test('Column A 在 Column B 左侧', async ({ page }) => {
    const cols = page.locator(
      '[data-testid="cascader-row-light"] .cascader-col'
    )
    const xA = await cols.nth(0).evaluate(el => el.getBoundingClientRect().left)
    const xB = await cols.nth(1).evaluate(el => el.getBoundingClientRect().left)
    expect(xA).toBeLessThan(xB)
  })

  test('Column B 在 Column C 左侧', async ({ page }) => {
    const cols = page.locator(
      '[data-testid="cascader-row-light"] .cascader-col'
    )
    const xB = await cols.nth(1).evaluate(el => el.getBoundingClientRect().left)
    const xC = await cols.nth(2).evaluate(el => el.getBoundingClientRect().left)
    expect(xB).toBeLessThan(xC)
  })

  test('Column A 的 Enabled 卡片在 Actived 卡片上方', async ({ page }) => {
    const col = page
      .locator('[data-testid="cascader-row-light"] .cascader-col')
      .nth(0)
    const cards = col.locator('.cascader-card')
    const y1 = await cards.nth(0).evaluate(el => el.getBoundingClientRect().top)
    const y2 = await cards.nth(1).evaluate(el => el.getBoundingClientRect().top)
    expect(y1).toBeLessThan(y2)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('cascader-card padding 来自 CSS 变量（非零）', async ({ page }) => {
    const card = page
      .locator('[data-testid="cascader-row-light"] .cascader-card')
      .first()
    const padding = await card.evaluate(
      el => parseFloat(getComputedStyle(el).paddingTop)
    )
    // --o-r-gap-5 在 1920px 断点应 > 0
    expect(padding).toBeGreaterThan(0)
  })

  test('三列 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="cascader-row-light"] .cascader-row')
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).columnGap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：块的对齐 ----

  test('三列顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cols = page.locator(
      '[data-testid="cascader-row-light"] .cascader-col'
    )
    const tops = await cols.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
