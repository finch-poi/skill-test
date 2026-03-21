import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('form-test-1 复杂信息收集楼层', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  // 维度1：结构与组件正确性
  test('显示"复杂信息收集"标题', async ({ page }) => {
    const titles = page.locator('.section-title')
    await expect(titles.last()).toContainText('复杂信息收集')
  })

  test('使用 ODataTable 组件', async ({ page }) => {
    await expect(page.locator('.o-data-table')).toBeVisible()
  })

  test('表格开启了行选择（复选框）', async ({ page }) => {
    // DSL: selection=true → header 有全选复选框
    await expect(page.locator('.o-data-table .o-checkbox').first()).toBeVisible()
  })

  test('表格有5列表头', async ({ page }) => {
    // DSL: 5 data columns + 1 checkbox column = 6 header cells
    await expect(page.locator('.o-table-header-cell').first()).toBeVisible()
    const headerCells = page.locator('.o-table-header-row .o-table-header-cell')
    const count = await headerCells.count()
    // 5数据列 + 1选择列
    expect(count).toBeGreaterThanOrEqual(5)
  })

  test('表格表头包含标题1至标题5', async ({ page }) => {
    const header = page.locator('.o-table-header')
    await expect(header).toContainText('标题1')
    await expect(header).toContainText('标题2')
    await expect(header).toContainText('标题3')
    await expect(header).toContainText('标题4')
    await expect(header).toContainText('标题5')
  })

  test('表格有5行数据', async ({ page }) => {
    await expect(page.locator('.o-table-body-row').first()).toBeVisible()
    await expect(page.locator('.o-table-body-row')).toHaveCount(5)
  })

  test('最后一列包含文字按钮链接', async ({ page }) => {
    await expect(page.locator('.o-link').first()).toBeVisible()
  })

  test('显示"提交"和"保存"按钮', async ({ page }) => {
    await expect(page.locator('.action-buttons')).toBeVisible()
    await expect(page.locator('.action-buttons').locator('text=提交')).toBeVisible()
    await expect(page.locator('.action-buttons').locator('text=保存')).toBeVisible()
  })

  // 维度2：默认状态正确性
  test('第1行默认预选中（复选框选中）', async ({ page }) => {
    // DSL: selectedKeys = [1], row id=1 pre-selected
    const firstRowCheckbox = page.locator('.o-table-body-row').first().locator('.o-checkbox')
    await expect(firstRowCheckbox).toHaveClass(/o-checkbox-checked/)
  })

  // 维度3：布局与间距
  test('提交按钮在保存按钮左侧', async ({ page }) => {
    const submitRight = await page.locator('.action-buttons').locator('text=提交').evaluate(
      el => el.getBoundingClientRect().right
    )
    const saveLeft = await page.locator('.action-buttons').locator('text=保存').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(submitRight).toBeLessThanOrEqual(saveLeft + 1)
  })

  // 维度5：交互行为
  test('点击未选中行可选中该行', async ({ page }) => {
    const secondRowCheckbox = page.locator('.o-table-body-row').nth(1).locator('.o-checkbox')
    await secondRowCheckbox.click()
    await expect(secondRowCheckbox).toHaveClass(/o-checkbox-checked/)
  })

  // 维度4：视觉样式 - 表格边框
  test('表格有外框边框（border=row-frame）', async ({ page }) => {
    // DSL: 设计图表格有行线 + 外框，无竖分隔线 → border="row-frame"
    // ⚠️ ODataTable border 由 border prop 控制，不体现在容器 DSL strokes 中，需从视觉图判断
    const table = page.locator('.o-data-table')
    const borderTop = await table.evaluate(el => window.getComputedStyle(el).borderTopWidth)
    expect(parseFloat(borderTop)).toBeGreaterThan(0)
  })

  // 维度8：块对齐
  test('操作按钮在表格下方', async ({ page }) => {
    const tableBottom = await page.locator('.o-data-table').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const buttonsTop = await page.locator('.action-buttons').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(tableBottom).toBeLessThanOrEqual(buttonsTop + 1)
  })
})
