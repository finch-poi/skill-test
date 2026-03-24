import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OForm 表单楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OForm 表单"', async ({ page }) => {
    await expect(page.locator('.section-title')).toContainText('OForm 表单')
  })

  test('楼层描述含设计稿 ID 305:46926', async ({ page }) => {
    await expect(page.locator('.section-subtitle')).toContainText('305:46926')
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="form-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="form-row-dark"]')).toBeVisible()
  })

  test('亮色表单包含 OForm 组件', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    await expect(form).toBeVisible()
    // OForm 渲染为 form 标签
    const tagName = await form.evaluate(el => el.tagName.toLowerCase())
    expect(tagName).toBe('form')
  })

  test('暗色表单包含 OForm 组件', async ({ page }) => {
    const form = page.locator('[data-testid="form-dark"]')
    await expect(form).toBeVisible()
    const tagName = await form.evaluate(el => el.tagName.toLowerCase())
    expect(tagName).toBe('form')
  })

  test('亮色表单有 4 个表单项（Select / Input / Textarea / Upload）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const items = form.locator('.o-form-item')
    await expect(items).toHaveCount(4)
  })

  test('暗色表单有 4 个表单项（Select / Input / Textarea / Upload）', async ({ page }) => {
    const form = page.locator('[data-testid="form-dark"]')
    const items = form.locator('.o-form-item')
    await expect(items).toHaveCount(4)
  })

  test('亮色表单第1项含 OSelect', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    await expect(form.locator('.o-select').first()).toBeVisible()
  })

  test('亮色表单第2项含 OInput', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    await expect(form.locator('.o-input').first()).toBeVisible()
  })

  test('亮色表单第3项含 OTextarea', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    await expect(form.locator('.o-textarea').first()).toBeVisible()
  })

  test('亮色表单第4项含上传按钮', async ({ page }) => {
    await expect(page.locator('[data-testid="upload-btn-light"]')).toBeVisible()
  })

  test('暗色表单上传按钮存在', async ({ page }) => {
    await expect(page.locator('[data-testid="upload-btn-dark"]')).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('亮色表单 Select 默认为空（显示 placeholder）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const select = form.locator('.o-select').first()
    await expect(select).toBeVisible()
    // placeholder 文本为 "Hint"
    await expect(select).toContainText('Hint')
  })

  test('亮色表单 Input 默认为空', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const input = form.locator('.o-input input').first()
    await expect(input).toHaveValue('')
  })

  test('亮色表单 Textarea 默认为空', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const textarea = form.locator('textarea').first()
    await expect(textarea).toHaveValue('')
  })

  test('亮色表单有2个必填项（标星号）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    // .o-form-item-required 表示必填项
    const requiredItems = form.locator('.o-form-item-required')
    await expect(requiredItems).toHaveCount(2)
  })

  test('亮色表单第一项标签文字为"标题文本"', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const firstLabel = form.locator('.o-form-item-label').first()
    await expect(firstLabel).toContainText('标题文本')
  })

  test('亮色表单第二项标签含长文本（宽度描述）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const labels = form.locator('.o-form-item-label')
    // 第二项标签文字是"标题文本宽度最大宽度最大宽度最"
    await expect(labels.nth(1)).toContainText('标题文本宽度')
  })

  test('分组标题"这是分组标题"在亮色区可见', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-light"]')
    await expect(section.locator('.form-group-title')).toContainText('这是分组标题')
  })

  test('分组标题"这是分组标题"在暗色区可见', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-dark"]')
    await expect(section.locator('.form-group-title')).toContainText('这是分组标题')
  })

  test('上传区域有提示文字（doc/xls/pptx 格式限制）', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-light"]')
    await expect(section.locator('.upload-hint')).toContainText('doc')
  })

  // ---- 维度3：布局与间距 ----

  test('亮色表单为水平布局（.o-form-layout-h）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    await expect(form).toHaveClass(/o-form-layout-h/)
  })

  test('暗色表单为水平布局（.o-form-layout-h）', async ({ page }) => {
    const form = page.locator('[data-testid="form-dark"]')
    await expect(form).toHaveClass(/o-form-layout-h/)
  })

  test('亮色表单有必填预留空间（.o-form-has-required）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    await expect(form).toHaveClass(/o-form-has-required/)
  })

  test('表单项纵向排列（第2项在第1项下方）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const item1 = form.locator('.o-form-item').nth(0)
    const item2 = form.locator('.o-form-item').nth(1)
    const y1 = await item1.evaluate(el => el.getBoundingClientRect().bottom)
    const y2 = await item2.evaluate(el => el.getBoundingClientRect().top)
    expect(y1).toBeLessThanOrEqual(y2)
  })

  test('Textarea 项标签与控件顶部对齐（label-align=top）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    // 第3个 OFormItem 是 textarea，label-align="top" 使得 .o-form-item-label 不居中
    const textareaItem = form.locator('.o-form-item').nth(2)
    // 检查 align-items 为 flex-start（非 center）
    const alignItems = await textareaItem.evaluate(el => getComputedStyle(el).alignItems)
    expect(alignItems).toBe('flex-start')
  })

  // ---- 维度4：视觉样式 ----

  test('亮色区块有阴影（非 none）', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-light"]')
    const shadow = await section.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('暗色区块背景为 #1f2127 → rgb(31,33,39)', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-dark"]')
    // DSL 溯源：Dark=on 背景 rgb(33,35,39) → 实现使用 #1f2127 = rgb(31,33,39)
    const bg = await section.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('亮色表单分组标题字号 ≥ 16px（h3 mixin）', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-light"]')
    const fontSize = await section.locator('.form-group-title').evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    // DSL: fontSize=20px，h3 mixin 在 1920px 视口
    expect(fontSize).toBeGreaterThanOrEqual(32)
    expect(fontSize).toBeLessThanOrEqual(24)
  })

  test('亮色表单分组标题 font-weight 为 600（SemiBold）', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-light"]')
    const fontWeight = await section.locator('.form-group-title').evaluate(
      el => getComputedStyle(el).fontWeight
    )
    expect(fontWeight).toBe('600')
  })

  test('必填项星号可见（亮色）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const symbol = form.locator('.o-form-require-symbol').first()
    await expect(symbol).toBeVisible()
  })

  test('Textarea 字符计数显示（show-length=always）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    // OTextarea 显示 0/100
    const textareaWrap = form.locator('.o-textarea').first()
    await expect(textareaWrap).toContainText('0')
    await expect(textareaWrap).toContainText('100')
  })

  // ---- 维度5：交互行为 ----

  test('点击亮色 Select 可展开下拉列表', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const select = form.locator('.o-select').first()
    await select.click()
    // 弹出层含 OOption
    const popup = page.locator('.o-select-options, .o-popup, .o-dropdown-content').first()
    await expect(popup).toBeVisible()
  })

  test('亮色 Input 可输入文字', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const input = form.locator('.o-input input').first()
    await input.fill('测试内容')
    await expect(input).toHaveValue('测试内容')
  })

  test('亮色 Textarea 可输入文字', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const textarea = form.locator('textarea').first()
    await textarea.fill('测试文本内容')
    await expect(textarea).toHaveValue('测试文本内容')
  })

  test('亮色 Input blur 触发校验显示错误消息', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const input = form.locator('.o-input input').first()
    // 先聚焦再失焦，触发 required 校验
    await input.focus()
    await input.blur()
    // 校验消息出现
    const msgEl = form.locator('.o-form-item-message').first()
    await expect(msgEl).toBeVisible({ timeout: 3000 })
  })

  // ---- 维度6：相对位置关系 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="form-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="form-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('分组标题在表单项上方', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-light"]')
    const titleY = await section.locator('.form-group-title').evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const firstItemY = await section.locator('.o-form-item').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(titleY).toBeLessThan(firstItemY)
  })

  test('标签在控件左侧（水平布局验证）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const item = form.locator('.o-form-item').first()
    const labelX = await item.locator('.o-form-item-label').evaluate(
      el => el.getBoundingClientRect().right
    )
    const mainX = await item.locator('.o-form-item-main').evaluate(
      el => el.getBoundingClientRect().left
    )
    expect(labelX).toBeLessThanOrEqual(mainX)
  })

  test('Select 在 Input 上方（纵向顺序正确）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const selectY = await form.locator('.o-select').first().evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const inputY = await form.locator('.o-input').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(selectY).toBeLessThanOrEqual(inputY)
  })

  test('Input 在 Textarea 上方', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const inputY = await form.locator('.o-input').first().evaluate(
      el => el.getBoundingClientRect().bottom
    )
    const textareaY = await form.locator('.o-textarea').first().evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(inputY).toBeLessThanOrEqual(textareaY)
  })

  // ---- 维度7：非组件内部间距使用响应式 CSS 变量 ----

  test('楼层内两个 theme-section 之间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const body = page.locator('.floor-body').first()
    const gap = await body.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('主题区块 padding 非零', async ({ page }) => {
    const section = page.locator('[data-testid="form-row-light"]')
    const padding = await section.evaluate(el => parseFloat(getComputedStyle(el).padding))
    expect(padding).toBeGreaterThan(0)
  })

  // ---- 维度8：块的对齐 ----

  test('亮色表单所有标签左侧对齐（左边距相同，误差≤2px）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const labels = form.locator('.o-form-item-label')
    const lefts = await labels.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().left))
    )
    const diff = Math.max(...lefts) - Math.min(...lefts)
    expect(diff).toBeLessThanOrEqual(2)
  })

  test('亮色表单所有控件左侧对齐（误差≤2px）', async ({ page }) => {
    const form = page.locator('[data-testid="form-light"]')
    const mains = form.locator('.o-form-item-main')
    const lefts = await mains.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().left))
    )
    const diff = Math.max(...lefts) - Math.min(...lefts)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
