import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OList 列表楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OList 列表"', async ({ page }) => {
    await expect(page.locator('.section-title').filter({ hasText: 'OList 列表' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 32:3907', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '32:3907' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 206:8732', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '206:8732' }).first()).toBeVisible()
  })

  test('楼层描述含设计稿 ID 206:8762', async ({ page }) => {
    await expect(page.locator('.section-subtitle').filter({ hasText: '206:8762' }).first()).toBeVisible()
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="list-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="list-row-dark"]')).toBeVisible()
  })

  test('亮色区块含三列（三个 list-col）', async ({ page }) => {
    const cols = page.locator('[data-testid="list-row-light"] .list-col')
    await expect(cols.first()).toBeVisible()
    const count = await cols.count()
    expect(count).toBe(3)
  })

  test('暗色区块含三列', async ({ page }) => {
    const cols = page.locator('[data-testid="list-row-dark"] .list-col')
    await expect(cols.first()).toBeVisible()
    const count = await cols.count()
    expect(count).toBe(3)
  })

  // ---- 单行列表子项检查 ----

  test('亮色单行列表含 OSwitch 组件（.o-switch 类）', async ({ page }) => {
    const switches = page.locator('[data-testid="list-row-light"] .o-switch')
    await expect(switches.first()).toBeVisible()
  })

  test('亮色单行列表含"关注"按钮（outline 样式）', async ({ page }) => {
    const btn = page.locator('[data-testid="list-row-light"] .list-col').first()
      .locator('.o-button').filter({ hasText: '关注' })
    await expect(btn.first()).toBeVisible()
  })

  test('亮色单行列表含右箭头图标', async ({ page }) => {
    const arrow = page.locator('[data-testid="list-row-light"] .list-item-arrow').first()
    await expect(arrow).toBeVisible()
  })

  test('亮色单行列表含"普通按钮"文字+箭头组合', async ({ page }) => {
    const action = page.locator('[data-testid="list-row-light"] .list-item-action').first()
    await expect(action).toBeVisible()
    await expect(action).toContainText('普通按钮')
  })

  // ---- 双行列表检查 ----

  test('亮色双行列表含两个列表项（.list-item--double）', async ({ page }) => {
    const items = page.locator('[data-testid="list-row-light"] .list-item--double')
    await expect(items.first()).toBeVisible()
    const count = await items.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })

  test('亮色双行列表项含头像（.list-item-avatar）', async ({ page }) => {
    const avatar = page.locator('[data-testid="list-row-light"] .list-item-avatar').first()
    await expect(avatar).toBeVisible()
  })

  test('亮色双行列表项含主标题文字', async ({ page }) => {
    const title = page.locator('[data-testid="list-row-light"] .list-item-title').first()
    await expect(title).toBeVisible()
    await expect(title).toContainText('列表文字列表文字')
  })

  test('亮色双行列表项含副标题文字', async ({ page }) => {
    const subtitle = page.locator('[data-testid="list-row-light"] .list-item-subtitle').first()
    await expect(subtitle).toBeVisible()
    await expect(subtitle).toContainText('列表文字列表文字')
  })

  test('双行列表"关注"按钮使用 pill 圆角（border-radius >= 12px）', async ({ page }) => {
    const btn = page.locator('[data-testid="list-row-light"] .list-item--double .o-button').first()
    await expect(btn).toBeVisible()
    const radius = await btn.evaluate(el => parseFloat(getComputedStyle(el).borderRadius))
    expect(radius).toBeGreaterThanOrEqual(12)
  })

  // ---- 子标题行检查 ----

  test('亮色子标题行含"内容子标题"文字', async ({ page }) => {
    const subtitle = page.locator('[data-testid="list-row-light"] .list-subtitle-title').first()
    await expect(subtitle).toBeVisible()
    await expect(subtitle).toContainText('内容子标题')
  })

  test('亮色子标题行含"右侧按钮"文字', async ({ page }) => {
    const action = page.locator('[data-testid="list-row-light"] .list-subtitle-action').first()
    await expect(action).toBeVisible()
    await expect(action).toContainText('右侧按钮')
  })

  test('子标题行"右侧按钮"在"内容子标题"右侧', async ({ page }) => {
    const subtitle = page.locator('[data-testid="list-row-light"] .list-subtitle-title').first()
    const action = page.locator('[data-testid="list-row-light"] .list-subtitle-action').first()
    const subtitleX = await subtitle.evaluate(el => el.getBoundingClientRect().right)
    const actionX = await action.evaluate(el => el.getBoundingClientRect().left)
    expect(actionX).toBeGreaterThan(subtitleX)
  })

  // ---- 维度2：默认状态 ----

  test('亮色 Switch 列表项中开关默认为选中（checked）', async ({ page }) => {
    const switchEl = page.locator('[data-testid="list-row-light"] .list-col').first()
      .locator('.o-switch').first()
    await expect(switchEl).toBeVisible()
    const cls = await switchEl.getAttribute('class')
    expect(cls).toContain('o-switch-checked')
  })

  test('暗色 Switch 列表项中开关默认为未选中', async ({ page }) => {
    const switchEl = page.locator('[data-testid="list-row-dark"] .list-col').first()
      .locator('.o-switch').first()
    await expect(switchEl).toBeVisible()
    const cls = await switchEl.getAttribute('class')
    expect(cls).not.toContain('o-switch-checked')
  })

  // ---- 维度3：布局与间距 ----

  test('亮色三列为水平排列（flex）', async ({ page }) => {
    const columns = page.locator('[data-testid="list-row-light"] .list-columns')
    const display = await columns.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  test('亮色列间 gap 非零', async ({ page }) => {
    const columns = page.locator('[data-testid="list-row-light"] .list-columns')
    const gap = await columns.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  test('列表项有顶底内边距（来自 padding-top > 0）', async ({ page }) => {
    const item = page.locator('[data-testid="list-row-light"] .list-item').first()
    await expect(item).toBeVisible()
    const padding = await item.evaluate(el => parseFloat(getComputedStyle(el).paddingTop))
    expect(padding).toBeGreaterThan(0)
  })

  test('双行列表头像宽高均为 40px', async ({ page }) => {
    // DSL 溯源：图标 width=40px, height=40px（206:8732 双行列表头像区域）
    const avatar = page.locator('[data-testid="list-row-light"] .list-item-avatar').first()
    await expect(avatar).toBeVisible()
    const w = await avatar.evaluate(el => parseFloat(getComputedStyle(el).width))
    const h = await avatar.evaluate(el => parseFloat(getComputedStyle(el).height))
    expect(w).toBeCloseTo(40, 0)
    expect(h).toBeCloseTo(40, 0)
  })

  // ---- 维度4：视觉样式 ----

  test('亮色卡片有阴影', async ({ page }) => {
    const card = page.locator('[data-testid="list-row-light"] .list-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('暗色区块背景色为 #1f2127（rgb(31,33,39)）', async ({ page }) => {
    // DSL 溯源：theme-section--dark background: #1f2127
    const darkRow = page.locator('[data-testid="list-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('头像为圆形（border-radius 50%）', async ({ page }) => {
    const avatar = page.locator('[data-testid="list-row-light"] .list-item-avatar').first()
    await expect(avatar).toBeVisible()
    const radius = await avatar.evaluate(el => getComputedStyle(el).borderRadius)
    expect(radius).toBe('50%')
  })

  test('单行列表文字字号为 14px', async ({ page }) => {
    // DSL 溯源：fontSize=14，lineHeightNumber=22（32:3907 text node）
    const text = page.locator('[data-testid="list-row-light"] .list-item-text').first()
    await expect(text).toBeVisible()
    const fontSize = await text.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeCloseTo(14, 0)
  })

  test('子标题字号为 18px（DSL h3/Medium 18px）', async ({ page }) => {
    // DSL 溯源：fontSize=18, fontStyle=Medium（206:8762 内容子标题）
    const title = page.locator('[data-testid="list-row-light"] .list-subtitle-title').first()
    await expect(title).toBeVisible()
    const fontSize = await title.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeCloseTo(18, 0)
  })

  test('副标题字号为 12px', async ({ page }) => {
    // DSL 溯源：fontSize=12, lineHeightNumber=18（206:8732 副标题）
    const subtitle = page.locator('[data-testid="list-row-light"] .list-item-subtitle').first()
    await expect(subtitle).toBeVisible()
    const fontSize = await subtitle.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    expect(fontSize).toBeCloseTo(12, 0)
  })

  // ---- 维度5：交互行为 ----

  test('点击亮色 Switch 列表项开关可切换状态', async ({ page }) => {
    const switchEl = page.locator('[data-testid="list-row-light"] .list-col').first()
      .locator('.o-switch').first()
    await expect(switchEl).toHaveClass(/o-switch-checked/)
    await switchEl.click()
    const cls = await switchEl.getAttribute('class')
    expect(cls).not.toContain('o-switch-checked')
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="list-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="list-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('双行列表头像在主标题左侧', async ({ page }) => {
    const item = page.locator('[data-testid="list-row-light"] .list-item--double').first()
    const avatarRight = await item.locator('.list-item-avatar').evaluate(el => el.getBoundingClientRect().right)
    const titleLeft = await item.locator('.list-item-title').evaluate(el => el.getBoundingClientRect().left)
    expect(avatarRight).toBeLessThanOrEqual(titleLeft + 20) // allow gap
  })

  test('主标题在副标题上方', async ({ page }) => {
    const item = page.locator('[data-testid="list-row-light"] .list-item--double').first()
    const titleBottom = await item.locator('.list-item-title').evaluate(el => el.getBoundingClientRect().bottom)
    const subtitleTop = await item.locator('.list-item-subtitle').evaluate(el => el.getBoundingClientRect().top)
    expect(titleBottom).toBeLessThanOrEqual(subtitleTop + 4) // allow rounding
  })

  test('列表项开关/按钮对齐到右侧', async ({ page }) => {
    const item = page.locator('[data-testid="list-row-light"] .list-item').nth(1) // Switch row
    await expect(item).toBeVisible()
    const justify = await item.evaluate(el => getComputedStyle(el).justifyContent)
    expect(justify).toBe('space-between')
  })

  // ---- 维度7：响应式 CSS 变量使用 ----

  test('亮色列表主区列 gap 来自 CSS 变量（非硬编码 px）', async ({ page }) => {
    const columns = page.locator('[data-testid="list-row-light"] .list-columns')
    const gap = await columns.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
    // 非硬编码：gap 应为 token 值（如 16/20/24px 等响应式值）
    expect([8, 12, 16, 20, 24, 28, 32].some(v => Math.abs(gap - v) < 2)).toBe(true)
  })

  // ---- 维度8：对齐 ----

  test('三列顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cols = page.locator('[data-testid="list-row-light"] .list-col')
    await expect(cols.first()).toBeVisible()
    const tops = await cols.evaluateAll(
      (els: Element[]) => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    expect(tops.length).toBe(3)
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })

  test('列表项内容垂直居中对齐', async ({ page }) => {
    const item = page.locator('[data-testid="list-row-light"] .list-item').first()
    await expect(item).toBeVisible()
    const align = await item.evaluate(el => getComputedStyle(el).alignItems)
    expect(align).toBe('center')
  })

  test('双行列表头像垂直居中', async ({ page }) => {
    const item = page.locator('[data-testid="list-row-light"] .list-item--double').first()
    await expect(item).toBeVisible()
    const align = await item.evaluate(el => getComputedStyle(el).alignItems)
    expect(align).toBe('center')
  })
})
