import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('FloorCard - OCard 卡片组件', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // 维度1：结构与组件正确性
  test('1. 亮色区块存在，包含3种卡片变体', async ({ page }) => {
    const lightRow = page.locator('[data-testid="card-row-light"]')
    await expect(lightRow).toBeVisible()

    // 图片卡片
    await expect(page.locator('[data-testid="card-image-light"]')).toBeVisible()
    // 小图标卡片
    await expect(page.locator('[data-testid="card-small-icon-light"]')).toBeVisible()
    // 大图标卡片
    await expect(page.locator('[data-testid="card-large-icon-light"]')).toBeVisible()
  })

  test('2. 暗色区块存在，包含3种卡片变体', async ({ page }) => {
    const darkRow = page.locator('[data-testid="card-row-dark"]')
    await expect(darkRow).toBeVisible()

    await expect(page.locator('[data-testid="card-image-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="card-small-icon-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="card-large-icon-dark"]')).toBeVisible()
  })

  // 维度2：默认状态正确性
  test('3. 图片卡片包含封面区域和内容区', async ({ page }) => {
    const card = page.locator('[data-testid="card-image-light"]')
    await expect(card).toBeVisible()

    // OCard DOM: .o-card-cover（封面区域）
    await expect(card.locator('.o-card-cover').first()).toBeVisible()

    // 标题
    await expect(card.locator('.o-card-title').first()).toBeVisible()
    await expect(card.locator('.o-card-title').first()).toContainText('标题文本标题文本')
  })

  test('4. 小图标卡片包含 titleIcon 和 footer 链接', async ({ page }) => {
    const card = page.locator('[data-testid="card-small-icon-light"]')
    await expect(card).toBeVisible()

    // header 包含标题图标
    const header = card.locator('.o-card-header').first()
    await expect(header).toBeVisible()
    // footer 包含链接按钮
    const footer = card.locator('.o-card-footer').first()
    await expect(footer).toBeVisible()
    await expect(footer.locator('a, .o-link').first()).toBeVisible()
  })

  test('5. 大图标卡片包含 icon 区域', async ({ page }) => {
    const card = page.locator('[data-testid="card-large-icon-light"]')
    await expect(card).toBeVisible()

    // OCard DOM: .o-card-icon（图标区域）
    await expect(card.locator('.o-card-icon').first()).toBeVisible()

    // 标题
    await expect(card.locator('.o-card-title').first()).toContainText('标题文本标题文本')
  })

  // 维度3：布局与间距
  test('6. 亮色区卡片行使用 flex wrap 横向排列', async ({ page }) => {
    const cardRow = page.locator('[data-testid="card-row-light"] .card-row')
    await expect(cardRow).toBeVisible()
    const display = await cardRow.evaluate((el) => getComputedStyle(el).display)
    expect(display).toBe('flex')
    const flexWrap = await cardRow.evaluate((el) => getComputedStyle(el).flexWrap)
    expect(flexWrap).toBe('wrap')
  })

  // 维度4：视觉样式
  test('7. 图片卡片封面图显示（cover-placeholder 存在）', async ({ page }) => {
    const card = page.locator('[data-testid="card-image-light"]')
    const cover = card.locator('.cover-placeholder').first()
    await expect(cover).toBeVisible()
    await expect(cover).toContainText('图片比例16:9')
  })

  test('8. 暗色区 data-o-theme 属性设置正确', async ({ page }) => {
    const darkSection = page.locator('[data-testid="card-row-dark"]')
    const theme = await darkSection.getAttribute('data-o-theme')
    expect(theme).toBe('e.dark')
  })

  // 维度5：相对位置关系
  test('9. 亮色区三列卡片横向排列顺序：图片、小图标、大图标', async ({ page }) => {
    const cols = page.locator('[data-testid="card-row-light"] .card-col')
    await expect(cols).toHaveCount(3)

    const imageCard = page.locator('[data-testid="card-image-light"]')
    const smallIconCard = page.locator('[data-testid="card-small-icon-light"]')
    const largeIconCard = page.locator('[data-testid="card-large-icon-light"]')

    const imgBox = await imageCard.boundingBox()
    const smallBox = await smallIconCard.boundingBox()
    const largeBox = await largeIconCard.boundingBox()

    expect(imgBox).not.toBeNull()
    expect(smallBox).not.toBeNull()
    expect(largeBox).not.toBeNull()

    // 图片卡片在最左，大图标卡片在最右
    expect(imgBox!.x).toBeLessThan(smallBox!.x)
    expect(smallBox!.x).toBeLessThan(largeBox!.x)
  })

  // 维度6：暗色主题背景色
  test('10. 暗色区块背景色为 #1f2127', async ({ page }) => {
    const darkSection = page.locator('[data-testid="card-row-dark"]')
    const bg = await darkSection.evaluate((el) => getComputedStyle(el).backgroundColor)
    // rgb(31, 33, 39) = #1f2127
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  // 维度7：标题内容正确性
  test('11. 卡片标题文本正确', async ({ page }) => {
    const lightCards = [
      page.locator('[data-testid="card-image-light"]'),
      page.locator('[data-testid="card-small-icon-light"]'),
      page.locator('[data-testid="card-large-icon-light"]'),
    ]
    for (const card of lightCards) {
      await expect(card.locator('.o-card-title').first()).toContainText('标题文本标题文本')
    }
  })

  // 维度8：OCard 渲染为 .o-card
  test('12. OCard 渲染为 .o-card 类元素', async ({ page }) => {
    const imageCard = page.locator('[data-testid="card-image-light"]')
    const oCard = imageCard.locator('.o-card').first()
    await expect(oCard).toBeVisible()
  })
})
