# 设计图 ID ↔ 代码文件映射表

收到"还原设计图"任务时，先查本文件确认设计 ID 与代码文件的对应关系。
**本文件是权威索引**，每次新增/修改页面时必须同步更新。

---

## 格式说明

```
页面路由         设计图 ID（一个页面/块可对应多个 ID）     主视图文件                  楼层组件目录
/route           主画板 ID          子画板 ID（可选）       src/views/XxxView.vue       src/components/{page}/
```

---

## 页面 ↔ 设计图映射

| 页面名称 | 路由 | 设计图 ID | 主视图 | 组件目录 | e2e 目录 |
|---------|------|---------|-------|---------|---------|
| 多步骤表单 | `/form-test-1` | `2:24919` | `src/views/FormTest1View.vue` | `src/components/form-test-1/` | `e2e/form-test-1/` |
| 政策规则 | `/policy-rules` | `2:30326` | `src/views/PolicyRulesView.vue` | `src/components/policy-rules/`（暂无） | `e2e/policy-rules/`（暂无） |
| 文档详情 | `/document-test-1` | `2:37111` | `src/views/DocumentTest1View.vue` | `src/components/document-test-1/` | `e2e/document-test-1/` |
| 子站导航测试 | `/subsite-header-test` | — | `src/views/SubsiteHeaderTestView.vue` | — | `e2e/app-header/` |

---

## 公共组件 ↔ 设计图映射

> 公共级别组件（src/components/）在此记录设计图位置，便于查找样式溯源。

| 组件名 | 文件路径 | 设计图 ID | 设计图位置说明 | e2e 目录 |
|-------|---------|---------|--------------|---------|
| AppHeader | `src/components/AppHeader.vue` | `57:5659`（StateGroup 变体之一） | 导航 Navigation/顶部导航 → 属性1=PC, 属性2=昇腾, 属性3=主站, Dark=OFF | `e2e/app-header/floor-main-header.spec.ts` |
| AppHeaderSubSite | `src/components/AppHeaderSubSite.vue` | `57:5659`（StateGroup 变体之一） | 导航 Navigation/顶部导航 → 属性1=PC, 属性2=昇腾, 属性3=子站, Dark=OFF | `e2e/app-header/floor-subsite-header.spec.ts` |
| AppFooter | `src/components/AppFooter.vue` | — | 暂无独立设计图 ID | — |
| AppSection | `src/components/AppSection.vue` | — | 通用楼层容器，无独立设计图 | — |

---

## 子块级映射（当页面某个楼层有独立设计图 ID 时在此记录）

> 如设计师将某个楼层/弹窗单独出图，在此追加记录，保持可溯源。

| 所属页面 | 块名称 | 设计图 ID | 对应楼层组件 |
|---------|--------|---------|------------|
| （暂无） | — | — | — |

---

## 维护规则

1. **新增页面时**：在「页面 ↔ 设计图映射」表中追加一行
2. **一个页面对应多个设计图**：在同一行的「设计图 ID」列用换行或 `、` 分隔列出所有 ID
3. **某个楼层/弹窗单独出图**：在「子块级映射」表追加记录
4. **设计图有版本迭代**：更新 ID，并在旁边注释旧 ID 废弃日期（如 `2:99999（2026-01-01 废弃）`）
5. **查找设计图**：收到 Pixso URL 时，从 `item-id=X:Y` 提取 ID，在本表反查对应代码文件
