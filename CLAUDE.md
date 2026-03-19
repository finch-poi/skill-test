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
- **opendesign-tokens**：设计令牌系统及主题相关令牌参考，本项目使用的主题是`OpenEuler`
- **openeuler-frontend-tools**：openEuler 前端工具函数、composables 及 mixins

开发中组件和变量应优先使用opendesign设计系统相关的内容

## 改进Skill

本项目是一个测试项目，旨在通过还原设计图来找出opendesign生态skill中存在的问题，所以在发现代码实现与设计图存在差别时，
你应该找到为什么会存在这个差别，然后看应该如何优化opendesign生态的skill(可编辑对应文件)，优化skill后应用最新的skill修复该问题

