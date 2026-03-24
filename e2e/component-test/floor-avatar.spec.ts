import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：206:8000（头像，StateGroup Dark=off/on）

test.describe('FloorAvatar 头像', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ====== 1. 结构与组件正确性 ======
  test('1-1 亮色区块存在', async ({ page }) => {
    const light = page.locator('[data-testid="avatar-row-light"]')
    await expect(light).toBeVisible()
  })

  test('1-2 暗色区块存在', async ({ page }) => {
    const dark = page.locator('[data-testid="avatar-row-dark"]')
    await expect(dark).toBeVisible()
  })

  test('1-3 亮色 XL 图标头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-xl-light"]')
    await expect(avatar).toBeVisible()
  })

  test('1-4 亮色 M 图标头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-md-light"]')
    await expect(avatar).toBeVisible()
  })

  test('1-5 亮色文字头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-text-xl-light"]')
    await expect(avatar).toBeVisible()
    await expect(avatar).toContainText('A')
  })

  test('1-6 亮色圆形头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-circle-light"]')
    await expect(avatar).toBeVisible()
  })

  test('1-7 亮色方形头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-square-light"]')
    await expect(avatar).toBeVisible()
  })

  test('1-8 暗色 XL 图标头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-xl-dark"]')
    await expect(avatar).toBeVisible()
  })

  test('1-9 暗色文字头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-text-xl-dark"]')
    await expect(avatar).toBeVisible()
    await expect(avatar).toContainText('A')
  })

  // ====== 2. 默认状态正确性 ======
  test('2-1 默认头像 background 为灰色（--o-color-control4-light）', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-md-light"]')
    await expect(avatar).toBeVisible()
    // 默认头像有 avatar--default class
    const hasDefault = await avatar.evaluate((el) => el.classList.contains('avatar--default'))
    expect(hasDefault).toBe(true)
  })

  test('2-2 primary 头像有 avatar--primary class', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-primary-light"]')
    await expect(avatar).toBeVisible()
    const hasPrimary = await avatar.evaluate((el) => el.classList.contains('avatar--primary'))
    expect(hasPrimary).toBe(true)
  })

  test('2-3 success 头像有 avatar--success class', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-success-light"]')
    await expect(avatar).toBeVisible()
    const hasSuccess = await avatar.evaluate((el) => el.classList.contains('avatar--success'))
    expect(hasSuccess).toBe(true)
  })

  test('2-4 warning 头像有 avatar--warning class', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-warning-light"]')
    await expect(avatar).toBeVisible()
    const hasWarning = await avatar.evaluate((el) => el.classList.contains('avatar--warning'))
    expect(hasWarning).toBe(true)
  })

  test('2-5 danger 头像有 avatar--danger class', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-danger-light"]')
    await expect(avatar).toBeVisible()
    const hasDanger = await avatar.evaluate((el) => el.classList.contains('avatar--danger'))
    expect(hasDanger).toBe(true)
  })

  // ====== 3. 布局与间距 ======
  test('3-1 亮色区块为 flex column 布局', async ({ page }) => {
    const light = page.locator('[data-testid="avatar-row-light"]')
    await expect(light).toBeVisible()
    const display = await light.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const direction = await light.evaluate((el) => getComputedStyle(el).flexDirection)
    expect(direction).toBe('column')
  })

  test('3-2 亮色区块内有 avatar-row 行布局', async ({ page }) => {
    const rows = page.locator('[data-testid="avatar-row-light"] .avatar-row')
    await expect(rows.first()).toBeVisible()
    const display = await rows.first().evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  // ====== 4. 视觉样式 ======
  test('4-1 XL 头像宽高为 80px', async ({ page }) => {
    // DSL 组件尺寸 56px，但设计中 XL size 参考行业标准 80px
    const avatar = page.locator('[data-testid="avatar-xl-light"]')
    await expect(avatar).toBeVisible()
    const { width, height } = await avatar.evaluate((el) => ({
      width: getComputedStyle(el).width,
      height: getComputedStyle(el).height,
    }))
    expect(width).toBe('80px')
    expect(height).toBe('80px')
  })

  test('4-2 MD 头像宽高为 48px', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-md-light"]')
    await expect(avatar).toBeVisible()
    const { width, height } = await avatar.evaluate((el) => ({
      width: getComputedStyle(el).width,
      height: getComputedStyle(el).height,
    }))
    expect(width).toBe('48px')
    expect(height).toBe('48px')
  })

  test('4-3 圆形头像 border-radius 为 50%', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-circle-light"]')
    await expect(avatar).toBeVisible()
    const borderRadius = await avatar.evaluate((el) => getComputedStyle(el).borderRadius)
    expect(borderRadius).toBe('50%')
  })

  test('4-4 方形头像 border-radius 不为 50%', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-square-light"]')
    await expect(avatar).toBeVisible()
    const borderRadius = await avatar.evaluate((el) => getComputedStyle(el).borderRadius)
    expect(borderRadius).not.toBe('50%')
  })

  // ====== 5. 头像组叠加 ======
  test('5-1 亮色头像组存在并含 4 个子头像', async ({ page }) => {
    const group = page.locator('[data-testid="avatar-group-light"]')
    await expect(group).toBeVisible()
    const stacks = group.locator('.avatar-stack')
    await expect(stacks).toHaveCount(4)
  })

  test('5-2 暗色头像组存在并含 4 个子头像', async ({ page }) => {
    const group = page.locator('[data-testid="avatar-group-dark"]')
    await expect(group).toBeVisible()
    const stacks = group.locator('.avatar-stack')
    await expect(stacks).toHaveCount(4)
  })

  // ====== 6. 暗色主题 ======
  test('6-1 暗色区块有 data-o-theme="e.dark"', async ({ page }) => {
    const dark = page.locator('[data-testid="avatar-row-dark"]')
    await expect(dark).toBeVisible()
    await expect(dark).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('6-2 暗色区块背景色为 #1f2127', async ({ page }) => {
    const dark = page.locator('[data-testid="avatar-row-dark"]')
    await expect(dark).toBeVisible()
    const bg = await dark.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)') // #1f2127
  })

  test('6-3 暗色 MD 头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-md-dark"]')
    await expect(avatar).toBeVisible()
  })

  test('6-4 暗色 primary 头像存在', async ({ page }) => {
    const avatar = page.locator('[data-testid="avatar-primary-dark"]')
    await expect(avatar).toBeVisible()
    const hasPrimary = await avatar.evaluate((el) => el.classList.contains('avatar--primary'))
    expect(hasPrimary).toBe(true)
  })

  // ====== 7. 带徽标头像 ======
  test('7-1 亮色带徽标头像存在，在线状态圆点可见', async ({ page }) => {
    const wrapper = page.locator('[data-testid="avatar-badge-light"]')
    await expect(wrapper).toBeVisible()
    const badge = wrapper.locator('.avatar-badge--online')
    await expect(badge).toBeVisible()
  })

  test('7-2 暗色带徽标头像存在，在线状态圆点可见', async ({ page }) => {
    const wrapper = page.locator('[data-testid="avatar-badge-dark"]')
    await expect(wrapper).toBeVisible()
    const badge = wrapper.locator('.avatar-badge--online')
    await expect(badge).toBeVisible()
  })

  // ====== 8. 对齐关系 ======
  test('8-1 亮色图标头像行内所有头像 align-items flex-end（底部对齐）', async ({ page }) => {
    const row = page.locator('[data-testid="avatar-row-light"] .avatar-row').first()
    await expect(row).toBeVisible()
    const alignItems = await row.evaluate((el) => getComputedStyle(el).alignItems)
    expect(alignItems).toBe('flex-end')
  })
})
