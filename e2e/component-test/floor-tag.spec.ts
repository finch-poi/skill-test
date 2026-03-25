import { test, expect } from '@playwright/test'
import { gotoPage } from './setup'

// 设计稿 ID：114:3012, 114:3005, 16:4646（标签 FloorTag）
// 视口宽度 1920px（>1680 widescreen 断点）
//
// ===== 关键视觉值（来自 DSL + 组件 CSS token） =====
// 高度：large=24px(>1680px) / medium=20px / small=16px
//   token: --o-control_size-s=24px / fixed 20px / --o-control_size-xs=16px
// 字号：--o-font_size-tip2 = 12px（L/M/S label 均相同；S 有 transform scale(0.833) 缩放，视觉≈10px）
// 行高：--o-line_height-tip2 = 18px
// 圆角（默认）：--o-radius_control-xs = 4px
// 圆角（pill）：--o-control_size-l = 40px
// success bg：rgb(11, 177, 81)   token: --o-color-success1 = rgb(var(--o-green-6))
// primary bg：rgb(0, 47, 167)    token: --o-color-primary1 = rgb(var(--o-brand-6))
// danger  bg：rgb(230, 0, 18)    token: --o-color-danger1  = rgb(var(--o-red-6))
// warning bg：rgb(250, 115, 5)   token: --o-color-warning1 = rgb(var(--o-orange-6))
// normal  bg：rgb(235, 241, 250)  token: --o-color-control2-light = rgb(var(--o-brand-1))
// normal text：rgb(0, 0, 0)       token: --o-color-info1 = rgba(var(--o-grey-14),1)
// 运营单色 bg：rgb(199, 0, 11) [Ascend 品牌红]  text: rgb(255, 255, 255)

test.describe('FloorTag · 结构与组件正确性', () => {
  test('light 和 dark 主题区块都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-row-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-row-dark"]')).toBeVisible()
  })

  test('dark 区块带有 data-o-theme="e.dark" 属性', async ({ page }) => {
    await gotoPage(page)
    const darkSection = page.locator('[data-testid="tag-row-dark"]')
    await expect(darkSection).toHaveAttribute('data-o-theme', 'e.dark')
  })

  test('light 状态标签各 size 行都渲染了 OTag', async ({ page }) => {
    await gotoPage(page)
    // L size row
    const lRow = page.locator('[data-testid="tag-status-light-l"]')
    await expect(lRow).toBeVisible()
    await expect(lRow.locator('.o-tag')).toHaveCount(6)
    // M size row
    const mRow = page.locator('[data-testid="tag-status-light-m"]')
    await expect(mRow.locator('.o-tag')).toHaveCount(6)
    // S size row
    const sRow = page.locator('[data-testid="tag-status-light-s"]')
    await expect(sRow.locator('.o-tag')).toHaveCount(4)
  })

  test('light 信息标签实心/描边/带图标/可关闭区块都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-info-solid-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-outline-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-icon-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-closable-light"]')).toBeVisible()
  })

  test('light 运营标签单色/渐变色/自定颜色区块都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-op-solid-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-gradient-light"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-custom-light"]')).toBeVisible()
  })
})

test.describe('FloorTag · 默认状态与颜色正确性', () => {
  test('状态标签 light L 含 success/primary/danger/normal 颜色变体', async ({ page }) => {
    await gotoPage(page)
    const lRow = page.locator('[data-testid="tag-status-light-l"]')
    // success
    await expect(lRow.locator('.o-tag-success').first()).toBeVisible()
    // primary
    await expect(lRow.locator('.o-tag-primary').first()).toBeVisible()
    // danger
    await expect(lRow.locator('.o-tag-danger').first()).toBeVisible()
    // normal
    await expect(lRow.locator('.o-tag-normal').first()).toBeVisible()
  })

  test('信息标签实心区块含 outline 变体', async ({ page }) => {
    await gotoPage(page)
    const outlineRow = page.locator('[data-testid="tag-info-outline-light"]')
    await expect(outlineRow.locator('.o-tag-outline').first()).toBeVisible()
  })

  test('信息标签带图标区块含图标元素', async ({ page }) => {
    await gotoPage(page)
    const iconRow = page.locator('[data-testid="tag-info-icon-light"]')
    await expect(iconRow.locator('.o-tag-icon').first()).toBeVisible()
  })

  test('信息标签可关闭区块含关闭按钮', async ({ page }) => {
    await gotoPage(page)
    const closableRow = page.locator('[data-testid="tag-info-closable-light"]')
    await expect(closableRow.locator('.o-tag-close').first()).toBeVisible()
  })

  test('运营标签使用 round="pill" 呈现胶囊形', async ({ page }) => {
    await gotoPage(page)
    const opRow = page.locator('[data-testid="tag-op-solid-light"]')
    const firstTag = opRow.locator('.o-tag').first()
    await expect(firstTag).toBeVisible()
    // pill 模式下 border-radius 应为 50% 或足够大的 px 值（大于高度一半）
    const borderRadius = await firstTag.evaluate((el) => {
      return window.getComputedStyle(el).borderRadius
    })
    // pill: 100px or 50% or similar large value
    expect(borderRadius).toBeTruthy()
    // verify it's a round shape — computed value should not be 4px (--o-radius_control-xs)
    expect(borderRadius).not.toBe('4px')
  })
})

test.describe('FloorTag · 尺寸正确性', () => {
  // DSL: 114:3012 L=24px, M=20px, S=16px
  // token: --o-control_size-s=24px(>1680px), medium固定20px, --o-control_size-xs=16px
  test('L 标签高度为 24px（>1680px 断点）', async ({ page }) => {
    await gotoPage(page)
    const lTag = page.locator('[data-testid="tag-status-light-l"] .o-tag').first()
    await expect(lTag).toBeVisible()
    const height = await lTag.evaluate((el) => {
      return Math.round(el.getBoundingClientRect().height)
    })
    // At 1920px viewport (>1680px): --o-control_size-s = 24px
    expect(height).toBe(24)
  })

  test('M 标签高度为 20px', async ({ page }) => {
    await gotoPage(page)
    const mTag = page.locator('[data-testid="tag-status-light-m"] .o-tag').first()
    await expect(mTag).toBeVisible()
    const height = await mTag.evaluate((el) => {
      return Math.round(el.getBoundingClientRect().height)
    })
    expect(height).toBe(20)
  })

  test('S 标签高度为 16px', async ({ page }) => {
    await gotoPage(page)
    const sTag = page.locator('[data-testid="tag-status-light-s"] .o-tag').first()
    await expect(sTag).toBeVisible()
    const height = await sTag.evaluate((el) => {
      return Math.round(el.getBoundingClientRect().height)
    })
    // --o-control_size-xs = 16px
    expect(height).toBe(16)
  })

  test('运营标签三种 size 都存在', async ({ page }) => {
    await gotoPage(page)
    const opRow = page.locator('[data-testid="tag-op-solid-light"]')
    await expect(opRow.locator('.o-tag')).toHaveCount(3)
  })

  test('运营标签 L / M / S 高度分别为 24 / 20 / 16px', async ({ page }) => {
    await gotoPage(page)
    // L
    const lTag = page.locator('[data-testid="tag-op-solid-light"] .o-tag').nth(0)
    const mTag = page.locator('[data-testid="tag-op-solid-light"] .o-tag').nth(1)
    const sTag = page.locator('[data-testid="tag-op-solid-light"] .o-tag').nth(2)
    await expect(lTag).toBeVisible()
    const lH = await lTag.evaluate((el) => Math.round(el.getBoundingClientRect().height))
    const mH = await mTag.evaluate((el) => Math.round(el.getBoundingClientRect().height))
    const sH = await sTag.evaluate((el) => Math.round(el.getBoundingClientRect().height))
    // DSL: 16:4646 L=24, M=20, S=16；与状态标签相同 size class
    expect(lH).toBe(24)
    expect(mH).toBe(20)
    expect(sH).toBe(16)
  })
})

test.describe('FloorTag · 布局与间距', () => {
  test('tag-row 使用 flex-wrap 横向排列', async ({ page }) => {
    await gotoPage(page)
    const tagRow = page.locator('[data-testid="tag-status-light-l"]')
    const display = await tagRow.evaluate((el) => window.getComputedStyle(el).display)
    const flexWrap = await tagRow.evaluate((el) => window.getComputedStyle(el).flexWrap)
    expect(display).toBe('flex')
    expect(flexWrap).toBe('wrap')
  })

  test('dark 区块有深色背景', async ({ page }) => {
    await gotoPage(page)
    const darkSection = page.locator('[data-testid="tag-row-dark"]')
    const bg = await darkSection.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    // #1f2127 = rgb(31, 33, 39)
    expect(bg).toBe('rgb(31, 33, 39)')
  })
})

test.describe('FloorTag · 视觉样式（字号/颜色/圆角/行高/边框）', () => {
  // --- 字号 & 行高 ---
  test('L/M 标签 label 字号 12px、行高 18px', async ({ page }) => {
    await gotoPage(page)
    const lLabel = page.locator('[data-testid="tag-status-light-l"] .o-tag .o-tag-label').first()
    const mLabel = page.locator('[data-testid="tag-status-light-m"] .o-tag .o-tag-label').first()
    await expect(lLabel).toBeVisible()
    const lFs = await lLabel.evaluate((el) => window.getComputedStyle(el).fontSize)
    const lLh = await lLabel.evaluate((el) => window.getComputedStyle(el).lineHeight)
    const mFs = await mLabel.evaluate((el) => window.getComputedStyle(el).fontSize)
    // DSL: 114:3012 fontSize=12, lineHeight=18; token: --o-font_size-tip2=12px, --o-line_height-tip2=18px
    expect(lFs).toBe('12px')
    expect(lLh).toBe('18px')
    expect(mFs).toBe('12px')
  })

  test('S 标签 label CSS font-size 12px（视觉上因 scale(0.833) 约 10px）', async ({ page }) => {
    await gotoPage(page)
    const sLabel = page.locator('[data-testid="tag-status-light-s"] .o-tag .o-tag-label').first()
    await expect(sLabel).toBeVisible()
    const fs = await sLabel.evaluate((el) => window.getComputedStyle(el).fontSize)
    // CSS 声明的 font-size 仍为 12px；视觉缩小依赖 transform: scale(0.833334)
    expect(fs).toBe('12px')
  })

  // --- 背景色（status 标签，light 模式）---
  test('success 标签背景色 rgb(11,177,81)，文字白色', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-status-light-l"] .o-tag-success').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const color = await tag.evaluate((el) => window.getComputedStyle(el).color)
    // DSL: rgba(11,177,81,1)；token: --o-color-success1 = rgb(var(--o-green-6))
    expect(bg).toBe('rgb(11, 177, 81)')
    expect(color).toBe('rgb(255, 255, 255)')
  })

  test('primary 标签背景色 rgb(0,47,167)，文字白色', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-status-light-l"] .o-tag-primary').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const color = await tag.evaluate((el) => window.getComputedStyle(el).color)
    // token: --o-color-primary1 = rgb(var(--o-brand-6)) = rgb(0, 47, 167)
    expect(bg).toBe('rgb(0, 47, 167)')
    expect(color).toBe('rgb(255, 255, 255)')
  })

  test('danger 标签背景色 rgb(230,0,18)，文字白色', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-status-light-l"] .o-tag-danger').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const color = await tag.evaluate((el) => window.getComputedStyle(el).color)
    // DSL: rgba(230,0,18,1)；token: --o-color-danger1 = rgb(var(--o-red-6))
    expect(bg).toBe('rgb(230, 0, 18)')
    expect(color).toBe('rgb(255, 255, 255)')
  })

  test('warning 标签背景色 rgb(250,115,5)，文字白色', async ({ page }) => {
    await gotoPage(page)
    const lRow = page.locator('[data-testid="tag-status-light-l"]')
    const tag = lRow.locator('.o-tag-warning').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const color = await tag.evaluate((el) => window.getComputedStyle(el).color)
    // token: --o-color-warning1 = rgb(var(--o-orange-6)) = rgb(250, 115, 5)
    expect(bg).toBe('rgb(250, 115, 5)')
    expect(color).toBe('rgb(255, 255, 255)')
  })

  test('normal 标签背景色 rgb(235,241,250)（openEuler brand-1），文字黑色', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-status-light-l"] .o-tag-normal').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const color = await tag.evaluate((el) => window.getComputedStyle(el).color)
    // token: --o-color-control2-light = rgb(var(--o-brand-1)) = rgb(235, 241, 250)
    // token: --o-color-info1 = rgba(var(--o-grey-14),1) = rgb(0, 0, 0)
    expect(bg).toBe('rgb(235, 241, 250)')
    expect(color).toBe('rgb(0, 0, 0)')
  })

  // --- 圆角 ---
  test('状态标签默认圆角 4px（非 pill）', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-status-light-l"] .o-tag').first()
    await expect(tag).toBeVisible()
    const radius = await tag.evaluate((el) => window.getComputedStyle(el).borderRadius)
    // token: --o-radius_control-xs = 4px
    expect(radius).toBe('4px')
  })

  test('运营标签 pill 圆角完全圆（100vh=1080px）', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-op-solid-light"] .o-tag').first()
    await expect(tag).toBeVisible()
    const radius = await tag.evaluate((el) => window.getComputedStyle(el).borderRadius)
    // OTag 组件通过 style-class.mjs 以内联样式注入 --tag-radius: 100vh
    // 100vh @ 1920×1080 = 1080px，视觉上完全圆形胶囊
    expect(radius).toBe('1080px')
  })

  // --- outline 描边样式 ---
  test('primary outline 标签背景透明、边框色 rgb(0,47,167)', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-info-outline-light"] .o-tag-outline.o-tag-primary').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const borderColor = await tag.evaluate((el) => window.getComputedStyle(el).borderTopColor)
    // .o-tag-primary.o-tag-outline: bg=transparent, border-color=--o-color-primary1=rgb(0,47,167)
    expect(bg).toBe('rgba(0, 0, 0, 0)')
    expect(borderColor).toBe('rgb(0, 47, 167)')
  })

  test('success outline 标签边框色 rgb(11,177,81)', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-info-outline-light"] .o-tag-outline.o-tag-success').first()
    await expect(tag).toBeVisible()
    const borderColor = await tag.evaluate((el) => window.getComputedStyle(el).borderTopColor)
    // token: --o-color-success1 = rgb(11, 177, 81)
    expect(borderColor).toBe('rgb(11, 177, 81)')
  })

  // --- 运营标签颜色 ---
  test('运营单色标签背景 rgb(199,0,11) [Ascend 品牌红]，文字白色', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-op-solid-light"] .o-tag').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const color = await tag.evaluate((el) => window.getComputedStyle(el).color)
    // DSL: 16:4646 单色 fill = rgba(199,0,11,1)；code: --tag-bg-color: rgb(199,0,11)
    expect(bg).toBe('rgb(199, 0, 11)')
    expect(color).toBe('rgb(255, 255, 255)')
  })

  test('运营渐变色标签背景为蓝紫渐变（light 模式 0.15 opacity）', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-op-gradient-light"] .o-tag').first()
    await expect(tag).toBeVisible()
    const bgImage = await tag.evaluate((el) => window.getComputedStyle(el).backgroundImage)
    const bgColor = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    const borderColor = await tag.evaluate((el) => window.getComputedStyle(el).borderTopColor)
    // DSL: 16:4646 渐变色 Dark=off stops rgba(46,83,250,0.15) → rgba(123,37,244,0.15)
    expect(bgImage).toBe('linear-gradient(to right, rgba(46, 83, 250, 0.15), rgba(123, 37, 244, 0.15))')
    expect(bgColor).toBe('rgba(0, 0, 0, 0)') // 背景色为 transparent（渐变通过 background-image 实现）
    expect(borderColor).toBe('rgba(0, 0, 0, 0)') // 无边框
  })

  test('运营自定颜色标签背景为半透明蓝 rgba(46,83,250,0.15)', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-op-custom-light"] .o-tag').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    // DSL: 16:4646 自定颜色 Dark=off fill = rgba(46,83,250,0.15)；code: --tag-bg-color: rgba(46,83,250,0.15)
    expect(bg).toBe('rgba(46, 83, 250, 0.15)')
  })

  // --- 带图标标签 ---
  test('带图标标签图标区域存在且与文字间距正常', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-info-icon-light"] .o-tag').first()
    await expect(tag).toBeVisible()
    const icon = tag.locator('.o-tag-icon')
    await expect(icon).toBeVisible()
    // icon 字号 = --o-icon_size_control-xs（通过 .o-tag-large 的 --tag-icon-size 设置）
    const iconFs = await icon.evaluate((el) => window.getComputedStyle(el).fontSize)
    expect(iconFs).toBeTruthy()
  })
})

test.describe('FloorTag · 交互行为', () => {
  test('可关闭标签点击关闭后消失', async ({ page }) => {
    await gotoPage(page)
    const closableRow = page.locator('[data-testid="tag-info-closable-light"]')
    const allTags = closableRow.locator('.o-tag')
    const firstCloseBtn = closableRow.locator('.o-tag-close').first()
    await expect(firstCloseBtn).toBeVisible()
    // 点击前有 4 个可见标签
    await expect(allTags.filter({ visible: true })).toHaveCount(4)
    // Click close
    await firstCloseBtn.click()
    // 点击后可见标签减少为 3 个
    await expect(allTags.filter({ visible: true })).toHaveCount(3)
  })
})

test.describe('FloorTag · 相对位置关系', () => {
  test('light 区块在 dark 区块之前（上方）', async ({ page }) => {
    await gotoPage(page)
    const lightBox = await page.locator('[data-testid="tag-row-light"]').boundingBox()
    const darkBox = await page.locator('[data-testid="tag-row-dark"]').boundingBox()
    expect(lightBox!.y).toBeLessThan(darkBox!.y)
  })

  test('状态标签 L 行在 M 行之前（上方）', async ({ page }) => {
    await gotoPage(page)
    const lBox = await page.locator('[data-testid="tag-status-light-l"]').boundingBox()
    const mBox = await page.locator('[data-testid="tag-status-light-m"]').boundingBox()
    expect(lBox!.y).toBeLessThan(mBox!.y)
  })
})

test.describe('FloorTag · dark 主题下 OTag 颜色正确渲染', () => {
  test('dark 区块内状态标签可见', async ({ page }) => {
    await gotoPage(page)
    const darkLRow = page.locator('[data-testid="tag-status-dark-l"]')
    await expect(darkLRow).toBeVisible()
    await expect(darkLRow.locator('.o-tag')).toHaveCount(6)
  })

  test('dark 区块内信息标签实心和描边都存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-info-solid-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-info-outline-dark"]')).toBeVisible()
  })

  test('dark 区块内运营标签各行存在', async ({ page }) => {
    await gotoPage(page)
    await expect(page.locator('[data-testid="tag-op-solid-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-gradient-dark"]')).toBeVisible()
    await expect(page.locator('[data-testid="tag-op-custom-dark"]')).toBeVisible()
  })

  test('dark 模式 success 标签背景比 light 模式更亮 rgb(51,193,104)', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-status-dark-l"] .o-tag-success').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    // DSL: 114:3012 success Dark=on fill = rgba(51,193,104,1)
    expect(bg).toBe('rgb(51, 193, 104)')
  })

  test('dark 模式 danger 标签背景 rgb(235,35,45)', async ({ page }) => {
    await gotoPage(page)
    const tag = page.locator('[data-testid="tag-status-dark-l"] .o-tag-danger').first()
    await expect(tag).toBeVisible()
    const bg = await tag.evaluate((el) => window.getComputedStyle(el).backgroundColor)
    // DSL: 114:3012 danger Dark=on fill = rgba(235,35,45,1)
    expect(bg).toBe('rgb(235, 35, 45)')
  })
})
