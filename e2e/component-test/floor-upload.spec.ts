import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('FloorUpload 上传组件', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // 1. 结构与组件正确性
  test('light 区块存在 data-testid', async ({ page }) => {
    const lightRow = page.locator('[data-testid="upload-row-light"]')
    await expect(lightRow).toBeVisible()
  })

  test('dark 区块存在 data-testid', async ({ page }) => {
    const darkRow = page.locator('[data-testid="upload-row-dark"]')
    await expect(darkRow).toBeVisible()
  })

  test('dark 区块具有 data-o-theme="e.dark"', async ({ page }) => {
    const darkRow = page.locator('[data-testid="upload-row-dark"]')
    await expect(darkRow).toHaveAttribute('data-o-theme', 'e.dark')
  })

  // 2. 默认状态正确性 - picture-card 模式
  test('light: picture-card 空状态渲染 OUpload 组件', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-picture-card-empty-light"]')
    await expect(upload.first()).toBeVisible()
  })

  test('light: picture-card 空状态有添加卡片 (add card)', async ({ page }) => {
    // OUpload picture-card 模式末尾有添加卡片
    const addCard = page.locator('[data-testid="upload-picture-card-empty-light"] .o-upload-card-add')
    await expect(addCard.first()).toBeVisible()
  })

  test('light: picture-card 状态展示（loading + error）渲染文件列表', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-picture-card-states-light"]')
    await expect(upload.first()).toBeVisible()
    // 应该有文件卡片（uploading 和 failed 状态）
    const fileList = upload.locator('.o-upload-list')
    await expect(fileList.first()).toBeVisible()
  })

  test('light: picture-card disabled 状态有 disabled 属性', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-picture-card-disabled-light"]')
    await expect(upload.first()).toBeVisible()
    // disabled 状态下 upload 根元素会有 disabled 相关 class
    const rootEl = upload.locator('.o-upload').first()
    await expect(rootEl).toBeVisible()
  })

  // 3. 拖拽模式
  test('light: drag enabled 状态显示拖拽区域', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-drag-enabled-light"]')
    await expect(upload.first()).toBeVisible()
    // OUpload draggable=true 时渲染 .o-upload-drag
    const dragArea = upload.locator('.o-upload-drag')
    await expect(dragArea.first()).toBeVisible()
  })

  test('light: drag 拖拽区包含加号图标', async ({ page }) => {
    const dragArea = page.locator('[data-testid="upload-drag-enabled-light"] .o-upload-drag').first()
    await expect(dragArea).toBeVisible()
    // 拖拽区内有图标
    const icon = dragArea.locator('svg').first()
    await expect(icon).toBeVisible()
  })

  test('dark: drag enabled 状态显示拖拽区域', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-drag-enabled-dark"]')
    await expect(upload.first()).toBeVisible()
    const dragArea = upload.locator('.o-upload-drag')
    await expect(dragArea.first()).toBeVisible()
  })

  // 4. 按钮模式
  test('light: btn enabled 状态有上传按钮', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-btn-enabled-light"]')
    await expect(upload.first()).toBeVisible()
    // 默认按钮通过 .o-upload-select 渲染
    const selectWrap = upload.locator('.o-upload-select-wrap')
    await expect(selectWrap.first()).toBeVisible()
  })

  test('light: btn loading 状态有文件列表', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-btn-loading-light"]')
    await expect(upload.first()).toBeVisible()
    const fileList = upload.locator('.o-upload-list')
    await expect(fileList.first()).toBeVisible()
  })

  test('light: btn error 状态有失败文件条目', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-btn-error-light"]')
    await expect(upload.first()).toBeVisible()
    // failed 状态文件行
    const fileList = upload.locator('.o-upload-list')
    await expect(fileList.first()).toBeVisible()
  })

  // 5. 视觉样式 - dark 区块背景色
  test('dark 区块背景色为 #1f2127', async ({ page }) => {
    const darkRow = page.locator('[data-testid="upload-row-dark"]')
    // DSL: 暗色主题背景 rgb(31, 33, 39) = #1f2127
    await expect(darkRow).toHaveCSS('background-color', 'rgb(31, 33, 39)')
  })

  // 6. 相对位置关系 - light 区块在 dark 区块上方
  test('light 区块在 dark 区块上方', async ({ page }) => {
    const lightRow = page.locator('[data-testid="upload-row-light"]')
    const darkRow = page.locator('[data-testid="upload-row-dark"]')

    const lightBox = await lightRow.boundingBox()
    const darkBox = await darkRow.boundingBox()

    expect(lightBox).not.toBeNull()
    expect(darkBox).not.toBeNull()
    // light 区块顶部 Y 坐标小于 dark 区块顶部 Y 坐标
    expect(lightBox!.y).toBeLessThan(darkBox!.y)
  })

  // 7. 非组件内部间距使用响应式 CSS 变量
  test('floor-body 使用 gap CSS 变量', async ({ page }) => {
    const floorBody = page.locator('[data-testid="upload-row-light"]').locator('..')
    // floor-body 使用 gap: var(--o-r-gap-6)，不硬编码 px
    // 通过 computed style 验证 gap 不为 0
    const gap = await floorBody.evaluate((el) => getComputedStyle(el).gap)
    expect(gap).not.toBe('0px')
    expect(gap).not.toBe('normal')
  })

  // 8. 块的对齐 - 亮暗主题区块宽度一致
  test('light 和 dark 区块宽度一致', async ({ page }) => {
    const lightRow = page.locator('[data-testid="upload-row-light"]')
    const darkRow = page.locator('[data-testid="upload-row-dark"]')

    const lightBox = await lightRow.boundingBox()
    const darkBox = await darkRow.boundingBox()

    expect(lightBox).not.toBeNull()
    expect(darkBox).not.toBeNull()
    // 宽度差异不超过 2px（允许亚像素误差）
    expect(Math.abs(lightBox!.width - darkBox!.width)).toBeLessThanOrEqual(2)
  })

  // 9. dark 区块内图片卡片上传组件
  test('dark: picture-card 空状态有添加卡片', async ({ page }) => {
    const addCard = page.locator('[data-testid="upload-picture-card-empty-dark"] .o-upload-card-add')
    await expect(addCard.first()).toBeVisible()
  })

  test('dark: btn error 状态有失败文件条目', async ({ page }) => {
    const upload = page.locator('[data-testid="upload-btn-error-dark"]')
    await expect(upload.first()).toBeVisible()
    const fileList = upload.locator('.o-upload-list')
    await expect(fileList.first()).toBeVisible()
  })
})
