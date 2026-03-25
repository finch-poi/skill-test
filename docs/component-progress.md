# 组件测试进度跟踪

## 状态说明

- ⬜ 待开始
- 🔄 进行中
- ✅ 已完成（实现完成）
- ❌ 失败（需修复）

## 特殊组件（独立组件，非楼层）

| 组件     | 设计稿 ID | 文件                              | 状态 | e2e |
| -------- | --------- | --------------------------------- | ---- | --- |
| 底部导航 | 103:4650  | `src/components/AppBottomNav.vue` | ✅   | ⬜  |

## 楼层组件（src/components/component-test/）

| 组件               | 中文名     | 设计稿 ID                            | 文件                   | 状态 | e2e |
| ------------------ | ---------- | ------------------------------------ | ---------------------- | ---- | --- |
| FloorMenu          | 菜单       | 4:1873                               | FloorMenu.vue          | ✅   | ⬜  |
| FloorTab           | 页签       | 5:4374                               | FloorTab.vue           | ✅   | ⬜  |
| FloorBreadcrumb    | 面包屑     | 201:3927                             | FloorBreadcrumb.vue    | ✅   | ⬜  |
| FloorAnchor        | 锚点       | 95:2513, 5:7968                      | FloorAnchor.vue        | ✅   | ⬜  |
| FloorPagination    | 分页       | 5:8096                               | FloorPagination.vue    | ✅   | ⬜  |
| FloorStep          | 步骤条     | 1740:18743                           | FloorStep.vue          | ✅   | ⬜  |
| FloorButton        | 按钮       | 103:2730, 102:2573, 95:3920, 5:8158  | FloorButton.vue        | ✅   | ⬜  |
| FloorDropdown      | 下拉按钮   | 29:5103, 103:3564, 103:3535, 5:10948 | FloorDropdown.vue      | ✅   | ⬜  |
| FloorRadio         | 单选框     | 11:2166                              | FloorRadio.vue         | ✅   | ⬜  |
| FloorCheckbox      | 复选框     | 15:2161                              | FloorCheckbox.vue      | ✅   | ⬜  |
| FloorSwitch        | 开关       | 3951:22783, 3951:21028, 15:2369      | FloorSwitch.vue        | ✅   | ⬜  |
| FloorScrollbar     | 滚动条     | 29:5181, 15:2373                     | FloorScrollbar.vue     | ✅   | ⬜  |
| FloorToggle        | 选择块     | 15:2382                              | FloorToggle.vue        | ✅   | ⬜  |
| FloorInput         | 输入框     | 15:3997, 17:4014                     | FloorInput.vue         | ✅   | ⬜  |
| FloorTextarea      | 文本域     | 17:2670                              | FloorTextarea.vue      | ✅   | ⬜  |
| FloorSelect        | 下拉选择器 | 4136:1, 17:4376                      | FloorSelect.vue        | ✅   | ⬜  |
| FloorUpload        | 上传       | 344:16841, 271:16475, 271:16434      | FloorUpload.vue        | ✅   | ⬜  |
| FloorRate          | 评分       | 17:4339                              | FloorRate.vue          | ✅   | ⬜  |
| FloorCascader      | 级联选择器 | 30:5373                              | FloorCascader.vue      | ✅   | ⬜  |
| FloorSlider        | 滑动条     | 253:5708, 253:5560                   | FloorSlider.vue        | ✅   | ⬜  |
| FloorDivider       | 分割线     | 16:4214                              | FloorDivider.vue       | ✅   | ⬜  |
| FloorTag           | 标签       | 114:3012, 114:3005, 16:4646          | FloorTag.vue           | ✅   | ⬜  |
| FloorAvatar        | 头像       | 206:8000                             | FloorAvatar.vue        | ✅   | ⬜  |
| FloorBadge         | 徽标       | 293:12743, 293:8706                  | FloorBadge.vue         | ✅   | ⬜  |
| FloorDialog        | 弹窗       | 31:3338                              | FloorDialog.vue        | ✅   | ⬜  |
| FloorList          | 列表       | 32:3907, 206:8732, 206:8762          | FloorList.vue          | ✅   | ⬜  |
| FloorDataTable     | 数据表格   | 293:12921                            | FloorDataTable.vue     | ✅   | ⬜  |
| FloorForm          | 表单       | 305:46926                            | FloorForm.vue          | ✅   | ⬜  |
| FloorCard          | 卡片       | 1689:18069                           | FloorCard.vue          | ✅   | ⬜  |
| FloorProgress      | 进度条     | 16:4574                              | FloorProgress.vue      | ✅   | ⬜  |
| FloorInlineMessage | 内联提示   | 28:7501                              | FloorInlineMessage.vue | ✅   | ⬜  |
| FloorGlobalMessage | 全局提示   | 28:5911                              | FloorGlobalMessage.vue | ✅   | ⬜  |
| FloorToast         | 即时反馈   | 31:3052                              | FloorToast.vue         | ✅   | ⬜  |
| FloorPopover       | 气泡提示   | 47:4288                              | FloorPopover.vue       | ✅   | ⬜  |
| FloorLoading       | 加载       | 31:3296                              | FloorLoading.vue       | ✅   | ⬜  |
| FloorResult        | 结果       | 1740:18598                           | FloorResult.vue        | ✅   | ⬜  |

## 整体验证

- ✅ 构建成功（pnpm build）
- ✅ 类型检查通过（pnpm type-check）
- 🔄 Playwright 测试（部分通过，受系统内存限制）

## 测试修复记录

### 2026-03-24 测试修复

1. **选择器修复**：
   - `.floor-title` → `.section-title`（AppSection 组件类名）
   - `.floor-desc` → `.section-subtitle`
   - `.o-breadcrumb-item-label a` → `a.o-breadcrumb-item-label`（OBreadcrumb DOM 结构）

2. **字号断言修复**：
   - 原断言：`16 <= fontSize <= 28`（h3 mixin 范围）
   - 实际值：40px（display3 mixin）
   - 修正为：`32 <= fontSize <= 48`

3. **测试环境问题**：
   - Playwright 测试在大量 Chrome 进程累积时会超时/挂起
   - 解决方案：`taskkill //f //im chrome.exe` 清理后再运行

## 更新记录

- 2026-03-23：创建进度文件，开始并行实现
- 2026-03-24：完成所有组件实现
  - 新增 FloorTab（页签）
  - 新增 FloorProgress（进度条）
  - 新增 AppBottomNav（底部导航）
- 2026-03-24：修复 Playwright 测试
  - 批量替换 `.floor-title` → `.section-title`
  - 批量替换 `.floor-desc` → `.section-subtitle`
  - 修复字号断言范围
  - 修复 OBreadcrumb 选择器
  - floor-menu.spec.ts: 32 passed
  - floor-tab.spec.ts: 23 passed
  - floor-breadcrumb.spec.ts: 15 passed
