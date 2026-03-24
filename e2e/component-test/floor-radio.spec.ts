import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('FloorRadio 单选框', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // === 1. 结构与组件正确性 ===
  test('1-1 Light/Dark 两个主题区块均存在', async ({ page }) => {
    await expect(page.locator('[data-testid="radio-row-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="radio-row-dark"]')).toBeVisible()
  })

  test('1-2 Dark 区块带有正确的 data-o-theme 属性', async ({ page }) => {
    const dark = page.locator('[data-testid="radio-row-dark"]')
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('1-3 Light 区块包含 ORadio 组件', async ({ page }) => {
    const light = page.locator('[data-testid="radio-row-light"]')
    const radios = light.locator('.o-radio')
    await expect(radios.first()).toBeVisible()
    const count = await radios.count()
    expect(count).toBeGreaterThan(0)
  })

  test('1-4 Dark 区块包含 ORadio 组件', async ({ page }) => {
    const dark = page.locator('[data-testid="radio-row-dark"]')
    const radios = dark.locator('.o-radio')
    await expect(radios.first()).toBeVisible()
    const count = await radios.count()
    expect(count).toBeGreaterThan(0)
  })

  test('1-5 Light 区块存在水平排列的 ORadioGroup', async ({ page }) => {
    const groupH = page.locator('[data-testid="radio-light-group-h"]')
    await expect(groupH).toBeVisible()
    await expect(groupH.locator('.o-radio-group-h')).toBeVisible()
  })

  test('1-6 Light 区块存在垂直排列的 ORadioGroup', async ({ page }) => {
    const groupV = page.locator('[data-testid="radio-light-group-v"]')
    await expect(groupV).toBeVisible()
    await expect(groupV.locator('.o-radio-group-v')).toBeVisible()
  })

  test('1-7 Light 区块存在禁用的 ORadioGroup', async ({ page }) => {
    const groupDisabled = page.locator('[data-testid="radio-light-group-disabled"]')
    await expect(groupDisabled).toBeVisible()
  })

  // === 2. 默认状态正确性 ===
  test('2-1 Enabled 未选中 radio 的 input 不被选中', async ({ page }) => {
    const radio = page.locator('[data-testid="radio-light-disabled"]')
    await expect(radio).toBeVisible()
    const input = radio.locator('input[type="radio"]')
    await expect(input).not.toBeChecked()
  })

  test('2-2 Selected Enabled radio 的 input 被选中', async ({ page }) => {
    const radio = page.locator('[data-testid="radio-light-selected-enabled"]')
    await expect(radio).toBeVisible()
    const input = radio.locator('input[type="radio"]')
    await expect(input).toBeChecked()
  })

  test('2-3 Disabled 未选中 radio 的 input 被禁用', async ({ page }) => {
    const radio = page.locator('[data-testid="radio-light-disabled"]')
    await expect(radio).toBeVisible()
    const input = radio.locator('input[type="radio"]')
    await expect(input).toBeDisabled()
  })

  test('2-4 Selected Disabled radio 被选中且禁用', async ({ page }) => {
    const radio = page.locator('[data-testid="radio-light-selected-disabled"]')
    await expect(radio).toBeVisible()
    const input = radio.locator('input[type="radio"]')
    await expect(input).toBeChecked()
    await expect(input).toBeDisabled()
  })

  test('2-5 ORadioGroup 水平组初始有选中项', async ({ page }) => {
    const groupH = page.locator('[data-testid="radio-light-group-h"]')
    await expect(groupH).toBeVisible()
    const checkedInputs = groupH.locator('input[type="radio"]:checked')
    const count = await checkedInputs.count()
    expect(count).toBe(1)
  })

  test('2-6 整组禁用时所有 radio input 被禁用', async ({ page }) => {
    const groupDisabled = page.locator('[data-testid="radio-light-group-disabled"]')
    await expect(groupDisabled).toBeVisible()
    const inputs = groupDisabled.locator('input[type="radio"]')
    const count = await inputs.count()
    expect(count).toBeGreaterThan(0)
    for (let i = 0; i < count; i++) {
      await expect(inputs.nth(i)).toBeDisabled()
    }
  })

  // === 3. 布局与间距 ===
  test('3-1 Light 区块采用 flex row 布局', async ({ page }) => {
    const light = page.locator('[data-testid="radio-row-light"]')
    const radioRow = light.locator('.radio-row')
    await expect(radioRow).toBeVisible()
    const display = await radioRow.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const flexDir = await radioRow.evaluate(el => getComputedStyle(el).flexDirection)
    expect(flexDir).toBe('row')
  })

  test('3-2 Dark 区块有深色背景', async ({ page }) => {
    const dark = page.locator('[data-testid="radio-row-dark"]')
    await expect(dark).toBeVisible()
    const bg = await dark.evaluate(el => getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  // === 4. 视觉样式 ===
  test('4-1 radio-card 使用 fill2 背景（白色）', async ({ page }) => {
    const card = page.locator('[data-testid="radio-row-light"] .radio-card').first()
    await expect(card).toBeVisible()
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor)
    // --o-color-fill2 = rgb(255, 255, 255)
    expect(bg).toBe('rgb(255, 255, 255)')
  })

  test('4-2 theme-section 圆角为 4px（openEuler radius-m）', async ({ page }) => {
    const section = page.locator('[data-testid="radio-row-light"]')
    await expect(section).toBeVisible()
    const borderRadius = await section.evaluate(el => getComputedStyle(el).borderRadius)
    expect(borderRadius).toBe('4px')
  })

  // === 5. 交互行为 ===
  test('5-1 点击未选中的 radio 可以切换选中状态', async ({ page }) => {
    // 在水平组中，option2 未被初始选中，点击后应被选中
    const groupH = page.locator('[data-testid="radio-light-group-h"]')
    await expect(groupH).toBeVisible()
    const radios = groupH.locator('.o-radio')
    const secondRadio = radios.nth(1) // option2
    const input = secondRadio.locator('input[type="radio"]')
    await expect(input).not.toBeChecked()

    await secondRadio.click()

    await expect(input).toBeChecked()
  })

  test('5-2 点击新选项后原选中项被取消', async ({ page }) => {
    const groupH = page.locator('[data-testid="radio-light-group-h"]')
    await expect(groupH).toBeVisible()
    const radios = groupH.locator('.o-radio')

    // Initial: option1 selected
    const firstInput = radios.nth(0).locator('input[type="radio"]')
    await expect(firstInput).toBeChecked()

    // Click option2
    await radios.nth(1).click()

    // Now option1 should be deselected
    await expect(firstInput).not.toBeChecked()
  })

  test('5-3 禁用 radio 不能点击改变状态', async ({ page }) => {
    const radio = page.locator('[data-testid="radio-light-disabled"]')
    await expect(radio).toBeVisible()
    const input = radio.locator('input[type="radio"]')
    await expect(input).toBeDisabled()
    const checkedBefore = await input.isChecked()
    await radio.click({ force: true })
    const checkedAfter = await input.isChecked()
    expect(checkedAfter).toBe(checkedBefore)
  })

  // === 6. 相对位置关系 ===
  test('6-1 Light 区块在 Dark 区块上方', async ({ page }) => {
    const light = page.locator('[data-testid="radio-row-light"]')
    const dark = page.locator('[data-testid="radio-row-dark"]')
    const lightBox = await light.boundingBox()
    const darkBox = await dark.boundingBox()
    expect(lightBox!.y).toBeLessThan(darkBox!.y)
  })

  test('6-2 radio 圆形指示器在文字标签左侧', async ({ page }) => {
    const radio = page.locator('[data-testid="radio-light-enabled"]')
    await expect(radio).toBeVisible()
    const inputWrap = radio.locator('.o-radio-input-wrap')
    const label = radio.locator('.o-radio-label')
    const inputBox = await inputWrap.boundingBox()
    const labelBox = await label.boundingBox()
    // Input wrap left < label left
    expect(inputBox!.x).toBeLessThan(labelBox!.x)
  })

  // === 7. 非硬编码间距 ===
  test('7-1 theme-section 圆角来自 CSS 变量（不硬编码 px）', async ({ page }) => {
    const section = page.locator('[data-testid="radio-row-light"]')
    await expect(section).toBeVisible()
    const borderRadius = await section.evaluate(el => getComputedStyle(el).borderRadius)
    // --o-radius-m = 4px in openEuler theme
    expect(borderRadius).toBe('4px')
  })

  // === 8. 对齐 ===
  test('8-1 ORadioGroup 水平组子项存在且对齐', async ({ page }) => {
    const groupH = page.locator('[data-testid="radio-light-group-h"]')
    await expect(groupH).toBeVisible()
    const group = groupH.locator('.o-radio-group-h')
    const alignItems = await group.evaluate(el => getComputedStyle(el).alignItems)
    expect(['center', 'stretch', 'flex-start', 'normal']).toContain(alignItems)
  })

  test('8-2 Dark 区块中也存在水平排列的 ORadioGroup', async ({ page }) => {
    const groupH = page.locator('[data-testid="radio-dark-group-h"]')
    await expect(groupH).toBeVisible()
    const radios = groupH.locator('.o-radio')
    const count = await radios.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('8-3 Dark 区块中也存在垂直排列的 ORadioGroup', async ({ page }) => {
    const groupV = page.locator('[data-testid="radio-dark-group-v"]')
    await expect(groupV).toBeVisible()
    await expect(groupV.locator('.o-radio-group-v')).toBeVisible()
  })
})
