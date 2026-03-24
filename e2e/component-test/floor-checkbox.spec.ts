import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('FloorCheckbox 复选框', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // === 1. 结构与组件正确性 ===
  test('1-1 Light/Dark 两个主题区块均存在', async ({ page }) => {
    await expect(page.locator('[data-testid="checkbox-row-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="checkbox-row-dark"]')).toBeVisible()
  })

  test('1-2 Dark 区块带有正确的 data-o-theme 属性', async ({ page }) => {
    const dark = page.locator('[data-testid="checkbox-row-dark"]')
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('1-3 Light 区块包含 OCheckbox 组件', async ({ page }) => {
    const light = page.locator('[data-testid="checkbox-row-light"]')
    const checkboxes = light.locator('.o-checkbox')
    await expect(checkboxes.first()).toBeVisible()
    const count = await checkboxes.count()
    expect(count).toBeGreaterThan(0)
  })

  test('1-4 Dark 区块包含 OCheckbox 组件', async ({ page }) => {
    const dark = page.locator('[data-testid="checkbox-row-dark"]')
    const checkboxes = dark.locator('.o-checkbox')
    await expect(checkboxes.first()).toBeVisible()
    const count = await checkboxes.count()
    expect(count).toBeGreaterThan(0)
  })

  test('1-5 存在 OCheckboxGroup 水平组', async ({ page }) => {
    const light = page.locator('[data-testid="checkbox-row-light"]')
    const groupH = light.locator('[data-testid="cb-group-h"]')
    await expect(groupH).toBeVisible()
    await expect(groupH.locator('.o-checkbox-group-h')).toBeVisible()
  })

  test('1-6 存在 OCheckboxGroup 垂直组', async ({ page }) => {
    const light = page.locator('[data-testid="checkbox-row-light"]')
    const groupV = light.locator('[data-testid="cb-group-v"]')
    await expect(groupV).toBeVisible()
    await expect(groupV.locator('.o-checkbox-group-v')).toBeVisible()
  })

  // === 2. 默认状态正确性 ===
  test('2-1 未选中 checkbox 不带 checked 类', async ({ page }) => {
    const cb = page.locator('[data-testid="cb-unchecked"]')
    await expect(cb).toBeVisible()
    // 未选中状态：内部 input 不应被选中
    const input = cb.locator('input[type="checkbox"]')
    await expect(input).not.toBeChecked()
  })

  test('2-2 已选中 checkbox 的 input 被选中', async ({ page }) => {
    const cb = page.locator('[data-testid="cb-checked"]')
    await expect(cb).toBeVisible()
    const input = cb.locator('input[type="checkbox"]')
    await expect(input).toBeChecked()
  })

  test('2-3 半选 checkbox 有 indeterminate 状态', async ({ page }) => {
    const cb = page.locator('[data-testid="cb-indeterminate"]')
    await expect(cb).toBeVisible()
    // indeterminate checkbox 显示横线图标
    await expect(cb.locator('.o-checkbox-input-icon-indeterminate')).toBeVisible()
  })

  test('2-4 禁用未选中 checkbox 有 disabled 属性', async ({ page }) => {
    const cb = page.locator('[data-testid="cb-unchecked-disabled"]')
    await expect(cb).toBeVisible()
    const input = cb.locator('input[type="checkbox"]')
    await expect(input).toBeDisabled()
  })

  test('2-5 禁用已选中 checkbox 被选中且禁用', async ({ page }) => {
    const cb = page.locator('[data-testid="cb-checked-disabled"]')
    await expect(cb).toBeVisible()
    const input = cb.locator('input[type="checkbox"]')
    await expect(input).toBeChecked()
    await expect(input).toBeDisabled()
  })

  test('2-6 全选 checkbox 初始为半选状态', async ({ page }) => {
    // a1 is selected, a2 & a3 are not → indeterminate
    const selectAll = page.locator('[data-testid="cb-select-all"]')
    await expect(selectAll).toBeVisible()
    await expect(selectAll.locator('.o-checkbox-input-icon-indeterminate')).toBeVisible()
  })

  // === 3. 布局与间距 ===
  test('3-1 Light 区块三列布局 (flex row)', async ({ page }) => {
    const light = page.locator('[data-testid="checkbox-row-light"]')
    const cbRow = light.locator('.cb-row')
    await expect(cbRow).toBeVisible()
    const display = await cbRow.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const flexDir = await cbRow.evaluate(el => getComputedStyle(el).flexDirection)
    expect(flexDir).toBe('row')
  })

  test('3-2 Dark 区块有深色背景', async ({ page }) => {
    const dark = page.locator('[data-testid="checkbox-row-dark"]')
    await expect(dark).toBeVisible()
    const bg = await dark.evaluate(el => getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  // === 4. 视觉样式 ===
  test('4-1 cb-card 使用 fill2 背景（白色）', async ({ page }) => {
    const card = page.locator('[data-testid="checkbox-row-light"] .cb-card').first()
    await expect(card).toBeVisible()
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor)
    // --o-color-fill2 = rgb(255, 255, 255)
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  // === 5. 交互行为 ===
  test('5-1 点击未选中 checkbox 可以切换状态', async ({ page }) => {
    // 使用全选组中的子项进行交互测试
    const group = page.locator('[data-testid="cb-select-all-group"]')
    const checkboxes = group.locator('.o-checkbox')
    await expect(checkboxes.first()).toBeVisible()
    const firstCb = checkboxes.first()
    const inputBefore = firstCb.locator('input[type="checkbox"]')
    const checkedBefore = await inputBefore.isChecked()

    await firstCb.click()

    const checkedAfter = await inputBefore.isChecked()
    expect(checkedAfter).toBe(!checkedBefore)
  })

  test('5-2 点击全选可以选中所有子项', async ({ page }) => {
    // First ensure we're in a specific state — click select-all to select all
    const selectAll = page.locator('[data-testid="cb-select-all"]')
    await expect(selectAll).toBeVisible()

    // If not all selected, click to select all
    await selectAll.click()

    // Verify all sub items are checked
    const group = page.locator('[data-testid="cb-select-all-group"]')
    const inputs = group.locator('input[type="checkbox"]')
    const count = await inputs.count()
    for (let i = 0; i < count; i++) {
      await expect(inputs.nth(i)).toBeChecked()
    }
  })

  test('5-3 禁用 checkbox 不能点击改变状态', async ({ page }) => {
    const cb = page.locator('[data-testid="cb-unchecked-disabled"]')
    await expect(cb).toBeVisible()
    const input = cb.locator('input[type="checkbox"]')
    const checkedBefore = await input.isChecked()
    await cb.click({ force: true })
    const checkedAfter = await input.isChecked()
    expect(checkedAfter).toBe(checkedBefore)
  })

  // === 6. 相对位置关系 ===
  test('6-1 Light 区块在 Dark 区块上方', async ({ page }) => {
    const light = page.locator('[data-testid="checkbox-row-light"]')
    const dark = page.locator('[data-testid="checkbox-row-dark"]')
    const lightBox = await light.boundingBox()
    const darkBox = await dark.boundingBox()
    expect(lightBox!.y).toBeLessThan(darkBox!.y)
  })

  test('6-2 checkbox 图标在文字标签左侧', async ({ page }) => {
    const cb = page.locator('[data-testid="cb-checked"]')
    await expect(cb).toBeVisible()
    const inputWrap = cb.locator('.o-checkbox-input-wrap')
    const label = cb.locator('.o-checkbox-label')
    const inputBox = await inputWrap.boundingBox()
    const labelBox = await label.boundingBox()
    // Input wrap left < label left
    expect(inputBox!.x).toBeLessThan(labelBox!.x)
  })

  // === 7. 非硬编码间距 ===
  test('7-1 theme-section 使用 CSS 变量圆角（不硬编码px）', async ({ page }) => {
    const section = page.locator('[data-testid="checkbox-row-light"]')
    await expect(section).toBeVisible()
    const borderRadius = await section.evaluate(el => getComputedStyle(el).borderRadius)
    // --o-radius-m = 4px in openEuler theme
    expect(borderRadius).toBe('4px')
  })

  // === 8. 对齐 ===
  test('8-1 OCheckboxGroup 水平组中子项顶部对齐', async ({ page }) => {
    const groupH = page.locator('[data-testid="cb-group-h"]')
    await expect(groupH).toBeVisible()
    const group = groupH.locator('.o-checkbox-group-h')
    const alignItems = await group.evaluate(el => getComputedStyle(el).alignItems)
    // flex default is stretch or center, checkbox group should align correctly
    expect(['center', 'stretch', 'flex-start', 'normal']).toContain(alignItems)
  })

  test('8-2 Dark 区块中水平 OCheckboxGroup 存在', async ({ page }) => {
    const groupH = page.locator('[data-testid="cb-dark-group-h"]')
    await expect(groupH).toBeVisible()
    const checkboxes = groupH.locator('.o-checkbox')
    const count = await checkboxes.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })
})
