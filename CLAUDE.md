# 项目：skill-test

## 技术栈

- **框架**：Vue 3.6 (beta/vapor) + TypeScript
- **构建工具**：Vite 8 (beta)
- **状态管理**：Pinia 3
- **路由**：Vue Router 5
- **包管理器**：pnpm（通过 workspace overrides 使用 Vue beta）
- **测试**：Vitest + @vue/test-utils
- **代码检查**：ESLint + oxlint + eslint-plugin-vue
- **代码格式化**：oxfmt
- **类型检查**：vue-tsc

## 开发命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 类型检查 + 构建
pnpm build-only   # 仅构建（不做类型检查）
pnpm type-check   # 运行 vue-tsc 类型检查
pnpm test:unit    # 使用 Vitest 运行单元测试
pnpm lint         # 运行 oxlint + eslint 并自动修复
pnpm format       # 使用 oxfmt 格式化 src/
pnpm preview      # 预览生产构建
```

## 代码规范

- 所有组件使用 Vue 3 Composition API 配合 `<script setup lang="ts">`
- 使用 TypeScript strict 模式
- 路径别名：`@` 映射到 `./src`
- Store 文件放在 `src/stores/`，使用 Pinia 的 `defineStore` 组合函数风格
- 路由定义在 `src/router/index.ts`
- 单元测试放在 `src/__tests__/`，文件后缀为 `.spec.ts`
- 应合理的拆分组件，优先使用opendesign生态内容

### 样式规范

- **所有 `<style>` 标签必须加 `lang="scss"`**，不允许裸 CSS
- Mixin 已通过 `vite.config.ts` 的 `css.preprocessorOptions.scss.additionalData` 全局注入，**各 `.vue` 文件中直接使用 `@include`，禁止手动 `@use` mixin 文件**
- 响应式断点统一使用 `@include respond-to(...)` mixin，文件路径 `src/assets/style/mixin/screen.scss`
- 字号响应式使用 `@include h1` / `@include text1` 等 font mixin，文件路径 `src/assets/style/mixin/font.scss`
- 如 mixin 文件尚未创建，参考 `../opendesign-skills/skills/openeuler-frontend-tools/references/mixins.md` 创建

### 布局规范

- 页面顶层内容区使用 `.o-r-grid-container` 类，主要块宽度使用 `--o-r-grid-N` 变量
- 布局时参考 `https://www.hiascend.com/` 各屏幕断点下的表现作为视觉参考标准
- 需要响应式多列布局时，优先使用 `ORow` + `OCol` 组件（见 grid.md Skill）

### CSS Token 强制约定

- **背景色**：页面背景 `--o-color-fill1`，卡片/区块白色背景 `--o-color-fill2`，嵌套背景 `--o-color-fill3`
- **⛔ 严禁使用** `--o-color-bg1`、`--o-color-bg2`（不存在，解析为 transparent）
- **⛔ 严禁使用** `--o-r-radius-1`（不存在，圆角变量是 `--o-radius-xs/s/m/l/xl`）
- **边框**：只有当 DSL `strokes` 非空时才写 `border`，**不要给卡片/容器默认加边框**
- 可滚动的固定高度区域必须设置 `overflow-y: auto`，推荐使用 OScroller 组件或 `@include scrollbar` mixin

### 经验固化规范

发现 Skill 问题或工作流漏洞时，**必须同时更新以下位置**，不能只更新 MEMORY.md：

| 问题类型 | 必须更新的文件 |
|---------|-------------|
| Token 名称不存在 / 错误 | `../opendesign-skills/skills/opendesign-tokens/SKILL.md` |
| 组件 prop / DOM class 不准确 | `../opendesign-skills/skills/opendesign-components/references/{name}.md` |
| 工作流步骤缺失 / 规则不完整 | `docs/pixso-tdd-workflow.md` |
| 项目级约定（路由/全局CSS/工具路径） | 本文件（`CLAUDE.md`） |

## 公共代码维护规则

**凡修改以下"公共/共享"文件，必须同步更新 MEMORY.md 中的「公共代码索引」部分**：

| 目录/文件 | 维护内容 |
|-----------|---------|
| `src/components/` | 组件名、props、用法示例 |
| `src/composables/` | 函数签名、返回值、使用示例 |
| `src/api/request.ts` | 接口签名、BASE_URL、参数说明 |
| `src/icon-components/` | 图标组件清单 |
| `src/router/index.ts` | 路由表（路径 → 视图名） |
| `src/main.ts` | 全局初始化逻辑 |
| `src/App.vue` | 根组件结构 |

> 具体页面文件（`src/views/`）无需维护到公共索引，仅在 MEMORY.md「已实现页面」列表中更新路由条目即可。

## Skills

本项目在 `../opendesign-skills` 中包含以下 Claude Code skills：

- **opendesign-components**：OpenDesign Vue 组件库使用指南及 API 参考
- **opendesign-tokens**：设计令牌系统及主题相关令牌参考，本项目使用的主题是`OpenEuler`
- **openeuler-frontend-tools**：openEuler 前端工具函数、composables 及 mixins

开发中组件和变量应优先使用opendesign设计系统相关的内容

## 改进Skill

本项目是一个测试项目，旨在通过还原设计图来找出opendesign生态skill中存在的问题，所以在发现代码实现与设计图存在差别时，
你应该找到为什么会存在这个差别，然后看应该如何优化opendesign生态的skill(可编辑对应文件)，优化skill后应用最新的skill修复该问题
不管是修改skill还是修改本项目的工作流，你的**究极目的是要像素级还原页面，保证之前犯过的错误不会再发生**，不然**世界上就会有好多小动物死掉**

## 设计图还原标准工作流

收到"还原设计图"任务时，**必须**遵循 `docs/pixso-tdd-workflow.md` 中定义的完整流程：

1. 用 Pixso MCP 读取设计稿（`mcp__pixso__get_image` + `mcp__pixso__get_node_dsl`）
2. 识别组件 → 读取对应 Skill 文件（`../opendesign-skills/skills/opendesign-components/references/`）
3. 先生成 Playwright 测试（Red ❌）
4. 再实现页面代码
5. 运行测试 → 按 Level 0/1/2 分析失败原因 → 修复 Skill 和/或代码
6. 循环直到全部通过（Green ✅）

测试必须覆盖 8 个维度（详见工作流文件）：
1. 结构与组件正确性
2. 默认状态正确性
3. 布局与间距
4. 视觉样式（字号/颜色/圆角/行高/边框/阴影）
5. 交互行为（点击/hover）
6. 相对位置关系（元素上下左右顺序、对齐方式）
7. 非组件内部间距使用响应式 CSS 变量（不硬编码 px）
8. 块的对齐（同级元素顶部/底部/居中对齐，等分宽度）

**⚠️ 重要**：所有还原度检测测试必须将浏览器视口设置为与设计稿断点一致的宽度（从 Pixso DSL 的画板宽度推断）。在 `beforeEach` 中调用 `page.setViewportSize()`，确保响应式布局、字号、间距等属性的断言值与设计稿所在断点匹配。

详细规范、Playwright 测试写法规范、已知 DOM class 知识库见：`docs/pixso-tdd-workflow.md`

### Playwright 运行命令

```bash
# 使用系统 Chrome（无需下载浏览器）
npx playwright test e2e/{file}.spec.ts --project="Google Chrome" --reporter=line
```

