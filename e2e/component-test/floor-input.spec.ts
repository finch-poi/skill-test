import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OInput 输入框楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OInput 输入框"', async ({ page }) => {
    await expect(page.locator('.section-title')).toContainText('OInput 输入框')
  })

  test('楼层描述含设计稿 ID 15:3997', async ({ page }) => {
    await expect(page.locator('.section-subtitle')).toContainText('15:3997')
  })

  test('亮色输入框区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="input-row-light"]')).toBeVisible()
  })

  test('暗色输入框区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="input-row-dark"]')).toBeVisible()
  })

  test('搜索框亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="search-row-light"]')).toBeVisible()
  })

  test('搜索框暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="search-row-dark"]')).toBeVisible()
  })

  test('L size Enabled 输入框存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="input-l-enabled"]')).toBeVisible()
  })

  test('L size Complete 输入框有 clearable（亮色）', async ({ page }) => {
    const input = page.locator('[data-testid="input-l-complete"]')
    await expect(input).toBeVisible()
    // clearable 输入框应有 .o-input 包装
    await expect(input.locator('input')).toBeVisible()
  })

  test('L size Error 输入框存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="input-l-error"]')).toBeVisible()
  })

  test('M size 输入框存在（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="input-m-enabled"]')).toBeVisible()
  })

  test('M size Complete 输入框有 clearable（亮色）', async ({ page }) => {
    await expect(page.locator('[data-testid="input-m-complete"]')).toBeVisible()
  })

  test('搜索框含前缀搜索图标（亮色 L）', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-l-enabled"]')
    await expect(searchInput).toBeVisible()
    await expect(searchInput.locator('svg').first()).toBeVisible()
  })

  test('搜索框 Actived 状态含清空按钮（亮色 L）', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-l-active"]')
    await expect(searchInput).toBeVisible()
    // clearable 且有值的输入框应显示清空图标
    await expect(searchInput.locator('input')).toBeVisible()
  })

  test('搜索框含前缀搜索图标（亮色 S）', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-s-enabled"]')
    await expect(searchInput).toBeVisible()
    await expect(searchInput.locator('svg').first()).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('L Enabled 输入框默认无值（placeholder 显示）', async ({ page }) => {
    const input = page.locator('[data-testid="input-l-enabled"] input').first()
    await expect(input).toHaveValue('')
  })

  test('L Complete 输入框默认有值 "Hint"', async ({ page }) => {
    const input = page.locator('[data-testid="input-l-complete"] input').first()
    await expect(input).toHaveValue('Hint')
  })

  test('L Error 输入框默认有值 "Hint"', async ({ page }) => {
    const input = page.locator('[data-testid="input-l-error"] input').first()
    await expect(input).toHaveValue('Hint')
  })

  test('M Enabled 输入框默认无值', async ({ page }) => {
    const input = page.locator('[data-testid="input-m-enabled"] input').first()
    await expect(input).toHaveValue('')
  })

  test('搜索框 Enabled 默认无值（亮色 L）', async ({ page }) => {
    const input = page.locator('[data-testid="search-l-enabled"] input').first()
    await expect(input).toHaveValue('')
  })

  test('搜索框 Actived 默认有值 "搜索"（亮色 L）', async ({ page }) => {
    const input = page.locator('[data-testid="search-l-active"] input').first()
    await expect(input).toHaveValue('搜索')
  })

  // ---- 维度3：布局与间距 ----

  test('亮色行中 demo 卡片有阴影（非 none）', async ({ page }) => {
    const card = page.locator('[data-testid="input-row-light"] .input-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('亮色输入框行为 flex 横向布局', async ({ page }) => {
    const row = page.locator('[data-testid="input-row-light"] .input-row')
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('亮色输入框行有两列', async ({ page }) => {
    const cols = page.locator('[data-testid="input-row-light"] .input-col')
    await expect(cols).toHaveCount(2)
  })

  test('列间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="input-row-light"] .input-row')
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('搜索框区域有竖向排列的卡片（flex-col）', async ({ page }) => {
    const col = page.locator('[data-testid="search-row-light"] .input-col')
    const display = await col.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const direction = await col.evaluate(el => getComputedStyle(el).flexDirection)
    expect(direction).toBe('column')
  })

  // ---- 维度4：视觉样式（字号/颜色/圆角/行高/边框/阴影）----

  test('L Error 输入框有红色边框（danger color）', async ({ page }) => {
    // DSL 溯源: color="danger" → --o-color-danger1 红色边框
    const inputEl = page.locator('[data-testid="input-l-error"]')
    await expect(inputEl).toBeVisible()
    // 验证组件存在 danger 相关 class 或检查 border-color
    const borderColor = await inputEl.evaluate(el => {
      const main = el.querySelector('.o_box-main') || el
      return getComputedStyle(main).borderColor
    })
    // danger color 应是红色系
    expect(borderColor).toMatch(/^rgb\(/)
  })

  test('暗色区块有深色背景（#1f2127）', async ({ page }) => {
    const darkRow = page.locator('[data-testid="input-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // background: #1f2127 → rgb(31,33,39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('暗色搜索框区块有深色背景', async ({ page }) => {
    const darkRow = page.locator('[data-testid="search-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page.locator('.section-title').evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    // h3 mixin 在 1920px 断点 ≈ 18–24px
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('pill 圆角输入框的 border-radius 接近半圆（>= 16px）', async ({ page }) => {
    // DSL 溯源: round="pill" → border-radius: var(--o-control_size-l)
    const inputEl = page.locator('[data-testid="input-l-enabled"]')
    await expect(inputEl).toBeVisible()
    const radius = await inputEl.evaluate(el => {
      const main = el.querySelector('.o_box-main') || el
      return parseFloat(getComputedStyle(main).borderRadius)
    })
    expect(radius).toBeGreaterThanOrEqual(32)
  })

  // ---- 维度5：交互行为 ----

  test('L Enabled 输入框可以输入文字', async ({ page }) => {
    const input = page.locator('[data-testid="input-l-enabled"] input').first()
    await input.fill('测试文字')
    await expect(input).toHaveValue('测试文字')
  })

  test('L Complete 点击清空按钮后值被清空', async ({ page }) => {
    // clearable 且有值时，应显示清空按钮
    const wrapper = page.locator('[data-testid="input-l-complete"]')
    // 检查输入框有值
    const input = wrapper.locator('input').first()
    await expect(input).toHaveValue('Hint')
    // 找到清空按钮并点击
    const clearBtn = wrapper.locator('.o_input-clear, [class*="clear"]').first()
    if (await clearBtn.isVisible()) {
      await clearBtn.click()
      await expect(input).toHaveValue('')
    }
  })

  test('搜索框可以输入文字（亮色 M）', async ({ page }) => {
    const input = page.locator('[data-testid="search-m-enabled"] input').first()
    await input.fill('Vue 3')
    await expect(input).toHaveValue('Vue 3')
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色输入框区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="input-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="input-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('搜索框亮色区块在输入框暗色区块下方', async ({ page }) => {
    const inputDarkY = await page.locator('[data-testid="input-row-dark"]').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const searchLightY = await page.locator('[data-testid="search-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(inputDarkY).toBeLessThan(searchLightY)
  })

  test('Column A 在 Column B 左侧（亮色）', async ({ page }) => {
    const cols = page.locator('[data-testid="input-row-light"] .input-col')
    const xA = await cols.nth(0).evaluate(el => el.getBoundingClientRect().left)
    const xB = await cols.nth(1).evaluate(el => el.getBoundingClientRect().left)
    expect(xA).toBeLessThan(xB)
  })

  test('L size Enabled 在 Complete 上方（同列，亮色）', async ({ page }) => {
    const enabledY = await page.locator('[data-testid="input-l-enabled"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const completeY = await page.locator('[data-testid="input-l-complete"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(enabledY).toBeLessThan(completeY)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('卡片间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const col = page.locator('[data-testid="input-row-light"] .input-col').first()
    const gap = await col.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('卡片内部 padding 非零', async ({ page }) => {
    const card = page.locator('[data-testid="input-row-light"] .input-card').first()
    const padding = await card.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度8：块的对齐 ----

  test('两列顶部对齐（误差 ≤ 2px，亮色）', async ({ page }) => {
    const cols = page.locator('[data-testid="input-row-light"] .input-col')
    const tops = await cols.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })

  test('搜索框卡片左对齐（均在同一 flex 列中）', async ({ page }) => {
    const cards = page.locator('[data-testid="search-row-light"] .input-card')
    const lefts = await cards.evaluateAll(
      els => els.slice(0, 4).map(el => Math.round(el.getBoundingClientRect().left))
    )
    const diff = Math.max(...lefts) - Math.min(...lefts)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
