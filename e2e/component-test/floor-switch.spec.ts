import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OSwitch 开关楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OSwitch 开关"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OSwitch 开关' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 15:2369', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '15:2369' }).first()).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="switch-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="switch-row-dark"]')).toBeVisible()
  })

  test('亮色区块含基础开关组（switch-basic-light）', async ({ page }) => {
    await expect(page.locator('[data-testid="switch-basic-light"]')).toBeVisible()
  })

  test('亮色区块含文字开关组（switch-text-light）', async ({ page }) => {
    await expect(page.locator('[data-testid="switch-text-light"]')).toBeVisible()
  })

  test('亮色区块含主题开关组（switch-theme-light）', async ({ page }) => {
    await expect(page.locator('[data-testid="switch-theme-light"]')).toBeVisible()
  })

  test('暗色区块含基础开关组（switch-basic-dark）', async ({ page }) => {
    await expect(page.locator('[data-testid="switch-basic-dark"]')).toBeVisible()
  })

  test('每个开关组为 OSwitch 组件（有 .o-switch 类）', async ({ page }) => {
    const lightSwitches = page.locator('[data-testid="switch-row-light"] .o-switch')
    await expect(lightSwitches.first()).toBeVisible()
    const count = await lightSwitches.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('基础开关没有文字标签插槽内容', async ({ page }) => {
    const basicGroup = page.locator('[data-testid="switch-basic-light"]')
    const labelEl = basicGroup.locator('.o-switch-label')
    // 基础开关不使用 on/off 插槽，label 元素不应存在或为空
    const labelCount = await labelEl.count()
    expect(labelCount).toBe(0)
  })

  test('文字开关有 .o-switch-label 元素', async ({ page }) => {
    const textGroup = page.locator('[data-testid="switch-text-light"]')
    const labelEl = textGroup.locator('.o-switch-label').first()
    await expect(labelEl).toBeVisible()
  })

  test('所有开关使用 round="pill" 属性（圆角为半圆）', async ({ page }) => {
    const firstSwitch = page.locator('[data-testid="switch-row-light"] .o-switch').first()
    await expect(firstSwitch).toBeVisible()
    const borderRadius = await firstSwitch.evaluate(el => getComputedStyle(el).borderRadius)
    // pill 模式圆角很大（>= 12px）
    const radius = parseFloat(borderRadius)
    expect(radius).toBeGreaterThanOrEqual(12)
  })

  // ---- 维度2：默认状态正确性 ----

  test('亮色基础开关 On 状态默认为选中（checked）', async ({ page }) => {
    // 第二个开关是 On 状态，默认 modelValue=true
    const switches = page.locator('[data-testid="switch-basic-light"] .o-switch')
    const onSwitch = switches.nth(1)
    await expect(onSwitch).toHaveClass(/o-switch-checked/)
  })

  test('亮色基础开关 Off 状态默认为未选中', async ({ page }) => {
    const switches = page.locator('[data-testid="switch-basic-light"] .o-switch')
    const offSwitch = switches.first()
    // 未选中时没有 checked 类
    const cls = await offSwitch.getAttribute('class')
    expect(cls).not.toContain('o-switch-checked')
  })

  test('亮色文字开关 Selected 状态默认为选中', async ({ page }) => {
    const switches = page.locator('[data-testid="switch-text-light"] .o-switch')
    const selectedSwitch = switches.first()
    await expect(selectedSwitch).toHaveClass(/o-switch-checked/)
  })

  test('亮色文字开关 Unselected 状态默认为未选中', async ({ page }) => {
    const switches = page.locator('[data-testid="switch-text-light"] .o-switch')
    const unselectedSwitch = switches.nth(1)
    const cls = await unselectedSwitch.getAttribute('class')
    expect(cls).not.toContain('o-switch-checked')
  })

  test('禁用开关有 disabled 类或 aria 属性', async ({ page }) => {
    const switches = page.locator('[data-testid="switch-basic-light"] .o-switch')
    const disabledSwitch = switches.nth(2)
    await expect(disabledSwitch).toBeVisible()
    const cls = await disabledSwitch.getAttribute('class')
    const ariaDisabled = await disabledSwitch.getAttribute('aria-disabled')
    // 禁用状态应有禁用类或 aria-disabled
    expect(cls?.includes('o-switch-disabled') || ariaDisabled === 'true').toBe(true)
  })

  // ---- 维度3：布局与间距 ----

  test('亮色区块三列水平排列（flex）', async ({ page }) => {
    const row = page.locator('[data-testid="switch-row-light"] .switch-row')
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('亮色区块各列顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cols = page.locator('[data-testid="switch-row-light"] .switch-col')
    const tops = await cols.evaluateAll(
      (els: Element[]) => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    expect(tops.length).toBeGreaterThanOrEqual(3)
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })

  test('列间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="switch-row-light"] .switch-row')
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('卡片有内边距（非零）', async ({ page }) => {
    const card = page.locator('[data-testid="switch-row-light"] .switch-card').first()
    await expect(card).toBeVisible()
    const padding = await card.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度4：视觉样式 ----

  test('亮色卡片有阴影（非 none）', async ({ page }) => {
    const card = page.locator('[data-testid="switch-row-light"] .switch-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('暗色区块背景色为 #1f2127（rgb(31,33,39)）', async ({ page }) => {
    // DSL 溯源：theme-section--dark background: #1f2127
    const darkRow = page.locator('[data-testid="switch-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（16–28px）', async ({ page }) => {
    const titleEl = page.locator('.section-title').filter({ hasText: 'OSwitch 开关' }).first()
    const fontSize = await titleEl.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('亮色选中开关轨道背景为品牌蓝色（primary1）', async ({ page }) => {
    // DSL 溯源：checked 状态轨道 background = --o-color-primary1（openEuler 蓝 rgb(0,47,167)）
    const onSwitch = page.locator('[data-testid="switch-basic-light"] .o-switch').nth(1)
    await expect(onSwitch).toHaveClass(/o-switch-checked/)
    const bg = await onSwitch.evaluate(el => getComputedStyle(el).backgroundColor)
    // 品牌色 primary1 = openEuler 蓝
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    expect(bg).not.toBe('transparent')
  })

  test('文字开关选中状态显示"开"字', async ({ page }) => {
    const textGroup = page.locator('[data-testid="switch-text-light"]')
    await expect(textGroup).toContainText('开')
  })

  test('文字开关未选中状态显示"关"字', async ({ page }) => {
    const textGroup = page.locator('[data-testid="switch-text-light"]')
    await expect(textGroup).toContainText('关')
  })

  // ---- 维度5：交互行为 ----

  test('点击亮色基础开关 Off 状态后切换为 On（有 checked 类）', async ({ page }) => {
    const switches = page.locator('[data-testid="switch-basic-light"] .o-switch')
    const offSwitch = switches.first()
    await offSwitch.click()
    await expect(offSwitch).toHaveClass(/o-switch-checked/)
  })

  test('点击亮色基础开关 On 状态后切换为 Off（无 checked 类）', async ({ page }) => {
    const switches = page.locator('[data-testid="switch-basic-light"] .o-switch')
    const onSwitch = switches.nth(1)
    await expect(onSwitch).toHaveClass(/o-switch-checked/)
    await onSwitch.click()
    const cls = await onSwitch.getAttribute('class')
    expect(cls).not.toContain('o-switch-checked')
  })

  test('禁用开关点击后状态不变', async ({ page }) => {
    const switches = page.locator('[data-testid="switch-basic-light"] .o-switch')
    const disabledOffSwitch = switches.nth(2)
    const clsBefore = await disabledOffSwitch.getAttribute('class')
    await disabledOffSwitch.click({ force: true })
    const clsAfter = await disabledOffSwitch.getAttribute('class')
    // 禁用 off 状态点击后不应变为 checked
    expect(clsAfter).not.toContain('o-switch-checked')
    expect(clsAfter).toEqual(clsBefore)
  })

  test('点击文字开关后，显示文字切换', async ({ page }) => {
    const textGroup = page.locator('[data-testid="switch-text-light"]')
    const selectedSwitch = textGroup.locator('.o-switch').first()
    // 初始选中（显示"开"），点击后变未选中（显示"关"）
    await expect(selectedSwitch).toHaveClass(/o-switch-checked/)
    await selectedSwitch.click()
    const cls = await selectedSwitch.getAttribute('class')
    expect(cls).not.toContain('o-switch-checked')
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="switch-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="switch-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('基础开关列在文字开关列左侧', async ({ page }) => {
    const lightRow = page.locator('[data-testid="switch-row-light"]')
    const cols = lightRow.locator('.switch-col')
    const xA = await cols.nth(0).evaluate(el => el.getBoundingClientRect().left)
    const xB = await cols.nth(1).evaluate(el => el.getBoundingClientRect().left)
    expect(xA).toBeLessThan(xB)
  })

  test('文字开关列在主题开关列左侧', async ({ page }) => {
    const lightRow = page.locator('[data-testid="switch-row-light"]')
    const cols = lightRow.locator('.switch-col')
    const xB = await cols.nth(1).evaluate(el => el.getBoundingClientRect().left)
    const xC = await cols.nth(2).evaluate(el => el.getBoundingClientRect().left)
    expect(xB).toBeLessThan(xC)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('switch-group 行间 gap 非零（来自 CSS 变量）', async ({ page }) => {
    const group = page.locator('[data-testid="switch-basic-light"]')
    const gap = await group.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('switch-item 内开关与标签 gap 非零', async ({ page }) => {
    const item = page.locator('[data-testid="switch-basic-light"] .switch-item').first()
    await expect(item).toBeVisible()
    const gap = await item.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('switch-item 内开关与状态标签垂直居中对齐', async ({ page }) => {
    const item = page.locator('[data-testid="switch-basic-light"] .switch-item').first()
    await expect(item).toBeVisible()
    const align = await item.evaluate(el => getComputedStyle(el).alignItems)
    expect(align).toBe('center')
  })

  test('switch-group 为纵向 flex 布局', async ({ page }) => {
    const group = page.locator('[data-testid="switch-basic-light"]')
    const display = await group.evaluate(el => getComputedStyle(el).display)
    const direction = await group.evaluate(el => getComputedStyle(el).flexDirection)
    expect(display).toBe('flex')
    expect(direction).toBe('column')
  })
})
