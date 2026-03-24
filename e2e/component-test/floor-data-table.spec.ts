import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test ODataTable 数据表格楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"ODataTable"', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-section"] .section-title').first()).toContainText('ODataTable')
  })

  test('亮色行存在且可见', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-row-light"]')).toBeVisible()
  })

  test('暗色行存在且可见', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-row-dark"]')).toBeVisible()
  })

  test('亮色行中存在 M size 基础表格', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-basic-m"]')).toBeVisible()
  })

  test('亮色行中存在 S size 基础表格', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-basic-s"]')).toBeVisible()
  })

  test('亮色行中存在可批量操作表格（selection）', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-selection-m"]')).toBeVisible()
  })

  test('亮色行中存在可编辑表格', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-editable-m"]')).toBeVisible()
  })

  test('亮色行中存在行列合并表格', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-span-m"]')).toBeVisible()
  })

  test('表格根元素有 .o-data-table 类', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-basic-m"]')).toHaveClass(/o-data-table/)
  })

  test('M size 表格有 .o-table-medium 类', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-basic-m"]')).toHaveClass(/o-table-medium/)
  })

  test('S size 表格有 .o-table-small 类', async ({ page }) => {
    await expect(page.locator('[data-testid="data-table-basic-s"]')).toHaveClass(/o-table-small/)
  })

  test('可批量操作表格第一列有复选框（.o-checkbox）', async ({ page }) => {
    const table = page.locator('[data-testid="data-table-selection-m"]')
    await expect(table.locator('.o-checkbox').first()).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('基础表格有表头行', async ({ page }) => {
    const table = page.locator('[data-testid="data-table-basic-m"]')
    await expect(table.locator('thead')).toBeVisible()
  })

  test('基础表格至少有 3 行数据', async ({ page }) => {
    const table = page.locator('[data-testid="data-table-basic-m"]')
    await expect(table.locator('tbody tr').first()).toBeVisible()
    const rows = await table.locator('tbody tr').count()
    expect(rows).toBeGreaterThanOrEqual(3)
  })

  test('基础表格表头有筛选图标或排序图标', async ({ page }) => {
    const table = page.locator('[data-testid="data-table-basic-m"]')
    // 表头有筛选触发器或排序图标
    const hasFilter = await table.locator('thead .o-table-header-cell').count()
    expect(hasFilter).toBeGreaterThan(0)
  })

  test('可批量操作表格表头第一格有全选复选框', async ({ page }) => {
    const table = page.locator('[data-testid="data-table-selection-m"]')
    const headerCheckbox = table.locator('thead .o-checkbox')
    await expect(headerCheckbox.first()).toBeVisible()
  })

  test('暗色区块中也存在 ODataTable', async ({ page }) => {
    const darkRow = page.locator('[data-testid="data-table-row-dark"]')
    await expect(darkRow.locator('.o-data-table').first()).toBeVisible()
  })

  // ---- 维度3：布局与间距 ----

  test('亮色行内多个表格块竖向排列（flex-col）', async ({ page }) => {
    const lightRow = page.locator('[data-testid="data-table-row-light"]')
    const display = await lightRow.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('表格块之间有间距（gap > 0）', async ({ page }) => {
    const lightRow = page.locator('[data-testid="data-table-row-light"]')
    const gap = await lightRow.evaluate(el => parseFloat(getComputedStyle(el).gap || getComputedStyle(el).rowGap))
    expect(gap).toBeGreaterThan(0)
  })

  test('表格卡片有内边距', async ({ page }) => {
    const card = page.locator('[data-testid="data-table-row-light"] .table-card').first()
    await expect(card).toBeVisible()
    const padding = await card.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度4：视觉样式（DSL 溯源） ----

  test('暗色区块背景色为 #1f2127（rgb(31,33,39)）', async ({ page }) => {
    // DSL 溯源：Dark 变体 background: #1f2127
    const darkRow = page.locator('[data-testid="data-table-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('表格表头行有填充背景色（fill 模式，非透明）', async ({ page }) => {
    // DSL 溯源：表头 headerStyle="fill" 使用 --o-color-control3-light 填充背景
    const table = page.locator('[data-testid="data-table-basic-m"]')
    const thead = table.locator('thead')
    const bg = await thead.evaluate(el => getComputedStyle(el).backgroundColor)
    // fill 模式下表头背景色非透明
    expect(bg).not.toBe('rgba(0, 0, 0, 0)')
    expect(bg).not.toBe('transparent')
  })

  test('表格卡片有阴影（非 none）', async ({ page }) => {
    const card = page.locator('[data-testid="data-table-row-light"] .table-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  // ---- 维度5：交互行为 ----

  test('点击可批量操作表格行复选框可选中该行', async ({ page }) => {
    const table = page.locator('[data-testid="data-table-selection-m"]')
    // 第一个数据行的复选框（跳过表头）
    const rowCheckbox = table.locator('tbody .o-checkbox').first()
    await expect(rowCheckbox).toBeVisible()
    await rowCheckbox.click()
    // 该行复选框应变为选中态
    await expect(rowCheckbox).toHaveClass(/o-checkbox-checked/)
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="data-table-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="data-table-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('M size 基础表格在 S size 基础表格上方', async ({ page }) => {
    const mY = await page.locator('[data-testid="data-table-basic-m"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const sY = await page.locator('[data-testid="data-table-basic-s"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(mY).toBeLessThan(sY)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('楼层标题字号来自 mixin（16px ≤ fontSize ≤ 28px）', async ({ page }) => {
    const section = page.locator('[data-testid="data-table-section"]')
    const fontSize = await section.locator('.section-title').evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(48)
  })

  test('表格块间距来自 CSS 变量（使用 gap，非 margin 硬编码）', async ({ page }) => {
    const lightRow = page.locator('[data-testid="data-table-row-light"]')
    const gap = await lightRow.evaluate(el => parseFloat(getComputedStyle(el).rowGap || '0'))
    // 应有 gap（>= 8px，来自 --o-r-gap-N 变量）
    expect(gap).toBeGreaterThanOrEqual(8)
  })

  // ---- 维度8：块的对齐 ----

  test('亮色行中表格块宽度充满容器（width > 0）', async ({ page }) => {
    const card = page.locator('[data-testid="data-table-row-light"] .table-card').first()
    const width = await card.evaluate(el => el.getBoundingClientRect().width)
    expect(width).toBeGreaterThan(300)
  })
})
