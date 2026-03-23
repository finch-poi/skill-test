import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

test.describe('component-test OMenu 菜单楼层', () => {
  test.beforeEach(async ({ page }) => {
    await gotoPage(page)
  })

  // ---- 维度1：结构与组件正确性 ----

  test('楼层标题含"OMenu 菜单"', async ({ page }) => {
    await expect(page.locator('.floor-title')).toContainText('OMenu 菜单')
  })

  test('楼层描述含设计稿 ID 4:1873', async ({ page }) => {
    await expect(page.locator('.floor-desc')).toContainText('4:1873')
  })

  test('亮色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="menu-row-light"]')).toBeVisible()
  })

  test('暗色区块存在', async ({ page }) => {
    await expect(page.locator('[data-testid="menu-row-dark"]')).toBeVisible()
  })

  test('Column B 中 Group1 和 Group2 是两个独立 OMenu', async ({ page }) => {
    // 验证 Group1 和 Group2 是两个不同的 .o-menu 节点
    const g1 = page.locator('[data-testid="menu-group1"]')
    const g2 = page.locator('[data-testid="menu-group2"]')
    await expect(g1).toBeVisible()
    await expect(g2).toBeVisible()
    // 两者不是同一节点（边界框不重叠）
    const y1 = await g1.evaluate(el => el.getBoundingClientRect().bottom)
    const y2 = await g2.evaluate(el => el.getBoundingClientRect().top)
    expect(y1).toBeLessThan(y2)
  })

  test('Column C 中 S 状态展示和 S Group 是两个独立 OMenu', async ({ page }) => {
    const sStates = page.locator('[data-testid="menu-s-states"]')
    const sGroup = page.locator('[data-testid="menu-s-group"]')
    await expect(sStates).toBeVisible()
    await expect(sGroup).toBeVisible()
    const y1 = await sStates.evaluate(el => el.getBoundingClientRect().bottom)
    const y2 = await sGroup.evaluate(el => el.getBoundingClientRect().top)
    expect(y1).toBeLessThan(y2)
  })

  test('M size 菜单使用 OIconFilter（不是项目自定义图标）', async ({ page }) => {
    // OIconFilter 渲染为 SVG，在 OSubMenu icon slot 中
    const menu = page.locator('[data-testid="menu-m-states"]')
    await expect(menu.locator('.o-sub-menu-title-icon svg').first()).toBeVisible()
  })

  test('M size 菜单 level2 ic_ 变体含图标', async ({ page }) => {
    // ic_Enabled / ic_Actived 的 OMenuItem 也带 icon slot
    const menu = page.locator('[data-testid="menu-m-states"]')
    await expect(menu.locator('.o-menu-item-icon svg').first()).toBeVisible()
  })

  test('S size 菜单无图标（level1/2/3 均无 icon slot）', async ({ page }) => {
    // S items 不带图标
    const menu = page.locator('[data-testid="menu-s-states"]')
    const iconCount = await menu.locator('.o-menu-item-icon').count()
    expect(iconCount).toBe(0)
  })

  test('S size 菜单有 .o-menu-small 和 .o-menu-arrow-left 类', async ({ page }) => {
    await expect(page.locator('[data-testid="menu-s-states"]')).toHaveClass(/o-menu-small/)
    await expect(page.locator('[data-testid="menu-s-states"]')).toHaveClass(/o-menu-arrow-left/)
  })

  test('S Group 菜单有嵌套三级结构', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-s-group"]')
    const nestedSub = menu.locator('.o-sub-menu .o-sub-menu')
    await expect(nestedSub.first()).toBeVisible()
  })

  // ---- 维度2：默认状态正确性 ----

  test('M states 菜单默认选中 m-l2-ic-actived（ic_ 图标二级项高亮）', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-m-states"]')
    await expect(menu.locator('.o-menu-item-selected').first()).toBeVisible()
  })

  test('Group1 默认展开且有选中项', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-group1"]')
    await expect(menu.locator('.o-menu-item-selected').first()).toBeVisible()
    await expect(menu.locator('.o-sub-menu-children').first()).toBeVisible()
  })

  test('Group2 默认展开且有选中项（text_ 无图标变体）', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-group2"]')
    await expect(menu.locator('.o-menu-item-selected').first()).toBeVisible()
  })

  test('S Group 默认展开多层并有选中项', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-s-group"]')
    await expect(menu.locator('.o-menu-item-selected').first()).toBeVisible()
  })

  // ---- 维度3：布局与间距 ----

  test('亮色行中 demo 卡片有阴影（非 none）', async ({ page }) => {
    const card = page.locator('[data-testid="menu-row-light"] .menu-card').first()
    await expect(card).toBeVisible()
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow)
    expect(shadow).not.toBe('none')
  })

  test('Column B 内有 2 个 demo 卡片（Group1 和 Group2 独立卡片）', async ({ page }) => {
    const col = page.locator('[data-testid="menu-row-light"] .menu-col').nth(1)
    const cards = col.locator('.menu-card')
    await expect(cards).toHaveCount(2)
  })

  test('Column C 内有 2 个 demo 卡片（S states 和 S Group 独立卡片）', async ({ page }) => {
    const col = page.locator('[data-testid="menu-row-light"] .menu-col').nth(2)
    const cards = col.locator('.menu-card')
    await expect(cards).toHaveCount(2)
  })

  test('亮色行三列并排（flex 横向）', async ({ page }) => {
    const row = page.locator('[data-testid="menu-row-light"] .menu-row')
    const display = await row.evaluate(el => getComputedStyle(el).display)
    expect(display).toBe('flex')
  })

  // ---- 维度4：视觉样式 ----

  test('S Group 选中项有渐变背景（非纯色）', async ({ page }) => {
    // DSL 溯源：rgba(46,83,250,0.15) → rgba(123,37,244,0.15) 蓝紫渐变
    const menu = page.locator('[data-testid="menu-s-group"]')
    const selectedItem = menu.locator('.o-menu-item-selected').first()
    await expect(selectedItem).toBeVisible()
    const bg = await selectedItem.evaluate(el => getComputedStyle(el).backgroundImage)
    // backgroundImage 应为 linear-gradient
    expect(bg).toContain('gradient')
  })

  test('M size 菜单选中项背景为纯色（非渐变）', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-group1"]')
    const selectedItem = menu.locator('.o-menu-item-selected').first()
    await expect(selectedItem).toBeVisible()
    const bg = await selectedItem.evaluate(el => getComputedStyle(el).backgroundImage)
    // 纯色选中背景 backgroundImage 应为 none
    expect(bg).toBe('none')
  })

  test('暗色区块有深色背景', async ({ page }) => {
    const darkRow = page.locator('[data-testid="menu-row-dark"]')
    const bg = await darkRow.evaluate(el => getComputedStyle(el).backgroundColor)
    // background: #1f2127 → rgb(31,33,39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })

  test('楼层标题字号来自响应式 mixin（非零）', async ({ page }) => {
    const fontSize = await page.locator('.floor-title').evaluate(
      el => parseFloat(getComputedStyle(el).fontSize)
    )
    // h3 mixin 在 1920px 断点 ≈ 18–24px
    expect(fontSize).toBeGreaterThanOrEqual(16)
    expect(fontSize).toBeLessThanOrEqual(28)
  })

  // ---- 维度5：交互行为 ----

  test('点击 M states 未选中项可切换选中态', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-m-states"]')
    const firstItem = menu.locator('.o-menu-item').first()
    await firstItem.click()
    await expect(firstItem).toHaveClass(/o-menu-item-selected/)
  })

  test('点击 Group1 折叠的同级项可展开', async ({ page }) => {
    const menu = page.locator('[data-testid="menu-group1"]')
    // g1-l1-a 和 g1-l1-b 是 OMenuItem，直接可点击
    const lastItem = menu.locator('.o-menu-item').last()
    await lastItem.click()
    await expect(lastItem).toHaveClass(/o-menu-item-selected/)
  })

  test('S Group 点击未选中的可见三级项可切换选中态', async ({ page }) => {
    // sg-sub2-3 已展开，sg-l3-3 可见且未选中
    const menu = page.locator('[data-testid="menu-s-group"]')
    // 取第 3 个三级项（sg-l3-3，在 sg-sub2-3 内，非已选项）
    // force:true 绕过 o-sub-menu-children-wrap 覆盖层拦截
    const target = menu.locator('.o-sub-menu-children .o-sub-menu-children .o-menu-item').nth(2)
    await expect(target).toBeVisible()
    await target.click({ force: true })
    await expect(target).toHaveClass(/o-menu-item-selected/)
  })

  // ---- 维度6：相对位置 ----

  test('亮色区块在暗色区块上方', async ({ page }) => {
    const lightY = await page.locator('[data-testid="menu-row-light"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const darkY = await page.locator('[data-testid="menu-row-dark"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(lightY).toBeLessThan(darkY)
  })

  test('Column A 在 Column B 左侧', async ({ page }) => {
    const colA = page.locator('[data-testid="menu-m-states"]')
    const colB = page.locator('[data-testid="menu-group1"]')
    const xA = await colA.evaluate(el => el.getBoundingClientRect().left)
    const xB = await colB.evaluate(el => el.getBoundingClientRect().left)
    expect(xA).toBeLessThan(xB)
  })

  test('Column B 在 Column C 左侧', async ({ page }) => {
    const colB = page.locator('[data-testid="menu-group1"]')
    const colC = page.locator('[data-testid="menu-s-states"]')
    const xB = await colB.evaluate(el => el.getBoundingClientRect().left)
    const xC = await colC.evaluate(el => el.getBoundingClientRect().left)
    expect(xB).toBeLessThan(xC)
  })

  test('Group1 在 Group2 上方（同列，垂直排列）', async ({ page }) => {
    const g1Y = await page.locator('[data-testid="menu-group1"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    const g2Y = await page.locator('[data-testid="menu-group2"]').evaluate(
      el => el.getBoundingClientRect().top
    )
    expect(g1Y).toBeLessThan(g2Y)
  })

  // ---- 维度7：非组件内部间距使用响应式变量 ----

  test('列间 gap 来自 CSS 变量（非零）', async ({ page }) => {
    const row = page.locator('[data-testid="menu-row-light"] .menu-row')
    const gap = await row.evaluate(el => parseFloat(getComputedStyle(el).gap))
    expect(gap).toBeGreaterThan(0)
  })

  // ---- 维度8：对齐 ----

  test('三列顶部对齐（误差 ≤ 2px）', async ({ page }) => {
    const cols = page.locator('[data-testid="menu-row-light"] .menu-col')
    const tops = await cols.evaluateAll(
      els => els.map(el => Math.round(el.getBoundingClientRect().top))
    )
    const diff = Math.max(...tops) - Math.min(...tops)
    expect(diff).toBeLessThanOrEqual(2)
  })
})
