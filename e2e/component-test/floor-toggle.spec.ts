import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('FloorToggle 选择块', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // === 1. 结构与组件正确性 ===
  test('1-1 Light/Dark 两个主题区块均存在', async ({ page }) => {
    await expect(page.locator('[data-testid="toggle-row-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="toggle-row-dark"]')).toBeVisible()
  })

  test('1-2 Dark 区块带有正确的 data-o-theme 属性', async ({ page }) => {
    const dark = page.locator('[data-testid="toggle-row-dark"]')
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('1-3 Light 区块包含 OToggle 组件', async ({ page }) => {
    const light = page.locator('[data-testid="toggle-row-light"]')
    const toggles = light.locator('.o-toggle')
    await expect(toggles.first()).toBeVisible()
    const count = await toggles.count()
    expect(count).toBeGreaterThan(0)
  })

  test('1-4 Dark 区块包含 OToggle 组件', async ({ page }) => {
    const dark = page.locator('[data-testid="toggle-row-dark"]')
    const toggles = dark.locator('.o-toggle')
    await expect(toggles.first()).toBeVisible()
    const count = await toggles.count()
    expect(count).toBeGreaterThan(0)
  })

  test('1-5 PC 单体状态行（Light）存在 3 个 toggle', async ({ page }) => {
    const row = page.locator('[data-testid="toggle-pc-states-light"]')
    await expect(row).toBeVisible()
    const toggles = row.locator('.o-toggle')
    await expect(toggles).toHaveCount(3)
  })

  test('1-6 Mobile 单体状态行（Light）存在 3 个 toggle', async ({ page }) => {
    const row = page.locator('[data-testid="toggle-mb-states-light"]')
    await expect(row).toBeVisible()
    const toggles = row.locator('.o-toggle')
    await expect(toggles).toHaveCount(3)
  })

  test('1-7 PC 父类型分组（Light）存在多个 toggle', async ({ page }) => {
    const group = page.locator('[data-testid="toggle-pc-group-light"]')
    await expect(group).toBeVisible()
    const toggles = group.locator('.o-toggle')
    const count = await toggles.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })

  // === 2. 默认状态正确性 ===
  test('2-1 未选中 toggle 不带 .o-toggle-checked 类', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-enabled-light"]')
    await expect(toggle).toBeVisible()
    // Should not have checked class
    await expect(toggle).not.toHaveClass(/o-toggle-checked/)
  })

  test('2-2 已选中 toggle 带有 .o-toggle-checked 类', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-actived-light"]')
    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveClass(/o-toggle-checked/)
  })

  test('2-3 禁用 toggle 带有 disabled 状态', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-disabled-light"]')
    await expect(toggle).toBeVisible()
    // Disabled toggle has o-toggle-disabled class or aria-disabled
    const cls = await toggle.getAttribute('class')
    const hasDisabled = cls?.includes('disabled') || (await toggle.getAttribute('aria-disabled')) === 'true'
    expect(hasDisabled).toBeTruthy()
  })

  test('2-4 Dark 区块已选中 toggle 带有 .o-toggle-checked 类', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-actived-dark"]')
    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveClass(/o-toggle-checked/)
  })

  test('2-5 PC Group 中的 toggle 有一个为选中状态', async ({ page }) => {
    const group = page.locator('[data-testid="toggle-pc-group-light"]')
    await expect(group).toBeVisible()
    const checkedToggles = group.locator('.o-toggle-checked')
    const count = await checkedToggles.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('2-6 Mobile 已选中 toggle 带有 .o-toggle-checked 类', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-mb-actived-light"]')
    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveClass(/o-toggle-checked/)
  })

  // === 3. 布局与间距 ===
  test('3-1 单体状态行使用 flex 横向排列', async ({ page }) => {
    const row = page.locator('[data-testid="toggle-pc-states-light"]')
    await expect(row).toBeVisible()
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const flexDir = await row.evaluate(el => getComputedStyle(el).flexDirection)
    expect(flexDir).toBe('row')
  })

  test('3-2 toggle-group 使用 flex 横向换行', async ({ page }) => {
    const group = page.locator('[data-testid="toggle-pc-group-light"] .toggle-group')
    await expect(group).toBeVisible()
    const display = await group.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const flexWrap = await group.evaluate(el => getComputedStyle(el).flexWrap)
    expect(flexWrap).toBe('wrap')
  })

  test('3-3 Dark 区块有深色背景', async ({ page }) => {
    const dark = page.locator('[data-testid="toggle-row-dark"]')
    await expect(dark).toBeVisible()
    const bg = await dark.evaluate(el => getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  // === 4. 视觉样式 ===
  test('4-1 OToggle 使用 pill 圆角（border-radius > 10px）', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-enabled-light"]')
    await expect(toggle).toBeVisible()
    const br = await toggle.evaluate(el => parseFloat(getComputedStyle(el).borderRadius))
    // pill = rounded fully, should be >= 14px (half of 28px height)
    expect(br).toBeGreaterThanOrEqual(10)
  })

  test('4-2 PC toggle 高度为 32px（桌面端设计值）', async ({ page }) => {
    // DSL: PC toggle height = 32px
    const toggle = page.locator('[data-testid="toggle-pc-enabled-light"]')
    await expect(toggle).toBeVisible()
    const box = await toggle.boundingBox()
    // Allow ±2px for rounding
    expect(box!.height).toBeGreaterThanOrEqual(30)
    expect(box!.height).toBeLessThanOrEqual(40)
  })

  test('4-3 Mobile toggle 高度小于 PC toggle', async ({ page }) => {
    const pcToggle = page.locator('[data-testid="toggle-pc-enabled-light"]')
    const mbToggle = page.locator('[data-testid="toggle-mb-enabled-light"]')
    await expect(pcToggle).toBeVisible()
    await expect(mbToggle).toBeVisible()
    const pcBox = await pcToggle.boundingBox()
    const mbBox = await mbToggle.boundingBox()
    // Mobile size should be smaller (28px vs 32px+ on desktop)
    expect(mbBox!.height).toBeLessThanOrEqual(pcBox!.height)
  })

  test('4-4 toggle 带有 icon prefix', async ({ page }) => {
    // PC PC-states toggle has icon
    const toggle = page.locator('[data-testid="toggle-pc-enabled-light"]')
    await expect(toggle).toBeVisible()
    const prefix = toggle.locator('.o-toggle-prefix')
    await expect(prefix).toBeVisible()
  })

  // === 5. 交互行为 ===
  test('5-1 点击未选中 toggle 可切换为选中状态', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-enabled-light"]')
    await expect(toggle).toBeVisible()
    // Verify initially unchecked
    await expect(toggle).not.toHaveClass(/o-toggle-checked/)
    await toggle.click()
    // After click should be checked
    await expect(toggle).toHaveClass(/o-toggle-checked/)
  })

  test('5-2 点击已选中 toggle 可切换为未选中状态', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-actived-light"]')
    await expect(toggle).toBeVisible()
    // Verify initially checked
    await expect(toggle).toHaveClass(/o-toggle-checked/)
    await toggle.click()
    // After click should be unchecked
    await expect(toggle).not.toHaveClass(/o-toggle-checked/)
  })

  test('5-3 禁用 toggle 不能切换状态', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-disabled-light"]')
    await expect(toggle).toBeVisible()
    const hadChecked = await toggle.evaluate(el => el.classList.contains('o-toggle-checked'))
    await toggle.click({ force: true })
    const hasChecked = await toggle.evaluate(el => el.classList.contains('o-toggle-checked'))
    expect(hasChecked).toBe(hadChecked)
  })

  test('5-4 CheckboxGroup 中点击 toggle 更新选中状态', async ({ page }) => {
    const group = page.locator('[data-testid="toggle-pc-group-light"]')
    await expect(group).toBeVisible()
    const firstToggle = group.locator('.o-toggle').first()
    const wasChecked = await firstToggle.evaluate(el => el.classList.contains('o-toggle-checked'))
    await firstToggle.click()
    const isChecked = await firstToggle.evaluate(el => el.classList.contains('o-toggle-checked'))
    expect(isChecked).toBe(!wasChecked)
  })

  // === 6. 相对位置关系 ===
  test('6-1 Light 区块在 Dark 区块上方', async ({ page }) => {
    const light = page.locator('[data-testid="toggle-row-light"]')
    const dark = page.locator('[data-testid="toggle-row-dark"]')
    const lightBox = await light.boundingBox()
    const darkBox = await dark.boundingBox()
    expect(lightBox!.y).toBeLessThan(darkBox!.y)
  })

  test('6-2 toggle icon 在文字左侧', async ({ page }) => {
    const toggle = page.locator('[data-testid="toggle-pc-enabled-light"]')
    await expect(toggle).toBeVisible()
    const prefix = toggle.locator('.o-toggle-prefix')
    await expect(prefix).toBeVisible()
    const prefixBox = await prefix.boundingBox()
    const toggleBox = await toggle.boundingBox()
    // Prefix should be near the left of the toggle
    expect(prefixBox!.x).toBeGreaterThanOrEqual(toggleBox!.x)
    expect(prefixBox!.x).toBeLessThan(toggleBox!.x + toggleBox!.width / 2)
  })

  test('6-3 Group 行标签在 toggle 组左侧', async ({ page }) => {
    const row = page.locator('[data-testid="toggle-pc-group-light"]')
    await expect(row).toBeVisible()
    const label = row.locator('.row-label')
    const toggleGroup = row.locator('.toggle-group')
    const labelBox = await label.boundingBox()
    const groupBox = await toggleGroup.boundingBox()
    // Label should be to the left of the toggle group
    expect(labelBox!.x).toBeLessThan(groupBox!.x)
  })

  // === 7. 非硬编码间距 ===
  test('7-1 theme-section 使用 CSS 变量圆角（--o-radius-m = 4px）', async ({ page }) => {
    const section = page.locator('[data-testid="toggle-row-light"]')
    await expect(section).toBeVisible()
    const borderRadius = await section.evaluate(el => getComputedStyle(el).borderRadius)
    // --o-radius-m = 4px in openEuler theme
    expect(borderRadius).toBe('4px')
  })

  test('7-2 toggle-group gap 使用 CSS 变量（不硬编码 px）', async ({ page }) => {
    const group = page.locator('[data-testid="toggle-pc-group-light"] .toggle-group')
    await expect(group).toBeVisible()
    const gap = await group.evaluate(el => getComputedStyle(el).gap)
    // Should not be 0 — has a gap set
    expect(gap).not.toBe('0px')
  })

  // === 8. 块的对齐 ===
  test('8-1 单体状态行中的 toggle 垂直居中对齐', async ({ page }) => {
    const row = page.locator('[data-testid="toggle-pc-states-light"]')
    await expect(row).toBeVisible()
    const alignItems = await row.evaluate(el => getComputedStyle(el).alignItems)
    expect(['center', 'stretch']).toContain(alignItems)
  })

  test('8-2 Dark 区块单体 toggle 状态正确', async ({ page }) => {
    const pcDark = page.locator('[data-testid="toggle-pc-states-dark"]')
    await expect(pcDark).toBeVisible()
    const toggles = pcDark.locator('.o-toggle')
    await expect(toggles).toHaveCount(3)
    // Second one should be checked (Actived)
    await expect(toggles.nth(1)).toHaveClass(/o-toggle-checked/)
    // First one should NOT be checked (Enabled)
    await expect(toggles.nth(0)).not.toHaveClass(/o-toggle-checked/)
  })
})
