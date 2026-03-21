import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('form-test-1 会议基础信息楼层', () => {
  test.beforeEach(async ({ page }) => { await gotoPage(page) })

  // 维度1：结构与组件正确性
  test('显示"会议基础信息"标题', async ({ page }) => {
    const titles = page.locator('.section-title')
    await expect(titles.first()).toContainText('会议基础信息')
  })

  test('使用 OForm 表单组件', async ({ page }) => {
    await expect(page.locator('.o-form').first()).toBeVisible()
  })

  test('有4个必填字段（红星号标记）', async ({ page }) => {
    // DSL: 标题文本(OSelect)、标题文本最大宽度(OInput)、录制会议(OSelect)、是否是重复会议(ORadio) = 4个required
    await expect(page.locator('.o-form-item-required')).toHaveCount(4)
  })

  test('包含 OSelect 选择器组件', async ({ page }) => {
    await expect(page.locator('.o-form .o-select').first()).toBeVisible()
  })

  test('包含 OInput 输入框组件', async ({ page }) => {
    await expect(page.locator('.o-form .o-input').first()).toBeVisible()
  })

  test('包含 ORadioGroup 单选框组', async ({ page }) => {
    await expect(page.locator('.o-radio-group')).toBeVisible()
  })

  test('包含 OTextarea 文本域', async ({ page }) => {
    await expect(page.locator('.o-textarea')).toBeVisible()
  })

  test('包含文件上传按钮', async ({ page }) => {
    await expect(page.locator('text=上传文件')).toBeVisible()
  })

  test('上传提示文字可见', async ({ page }) => {
    await expect(page.locator('text=只能上传doc、xlsm、pptx文件格式')).toBeVisible()
  })

  // 维度2：默认状态正确性
  test('单选框默认选中"重复"', async ({ page }) => {
    // DSL: repeatRadio 默认值 '1' = 重复
    const checkedRadio = page.locator('.o-radio-group .o-radio-checked')
    await expect(checkedRadio).toBeVisible()
    await expect(checkedRadio).toContainText('重复')
  })

  test('单选框有"重复"和"不重复"两个选项', async ({ page }) => {
    const group = page.locator('.o-radio-group')
    await expect(group).toContainText('重复')
    await expect(group).toContainText('不重复')
  })

  test('文本域有 placeholder "请输入"', async ({ page }) => {
    const textarea = page.locator('.o-textarea textarea')
    await expect(textarea).toHaveAttribute('placeholder', '请输入')
  })

  // 维度4：视觉样式
  test('表单标题字号使用响应式变量（非零高度）', async ({ page }) => {
    // DSL: section-title font-size = var(--o-r-font_size-h4) ≈ 20px at widescreen
    const fontSize = await page.locator('.section-title').first().evaluate(
      el => parseFloat(window.getComputedStyle(el).fontSize)
    )
    // DSL node: section title, fontSize ≈ 20px at >1440px breakpoint
    expect(fontSize).toBeGreaterThanOrEqual(18)
    expect(fontSize).toBeLessThanOrEqual(24)
  })

  // 维度5：交互行为
  test('点击"不重复"单选框可切换选中状态', async ({ page }) => {
    const notRepeatRadio = page.locator('.o-radio-group .o-radio').nth(1)
    await notRepeatRadio.click()
    await expect(notRepeatRadio).toHaveClass(/o-radio-checked/)
  })
})
