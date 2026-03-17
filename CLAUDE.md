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

## Skills

本项目在 `../opendesign-skills` 中包含以下 Claude Code skills：

- **opendesign-components**：OpenDesign Vue 组件库使用指南及 API 参考
- **opendesign-tokens**：设计令牌系统及主题相关令牌参考
- **openeuler-frontend-tools**：openEuler 前端工具函数、composables 及 mixins

### 注意
- 你每次调用skill之前，应该判断skill基于上次调用有没有更新
- 若有更新，则判断更新对于本次调用任务有无帮助，若有帮助应该应用新的skill
