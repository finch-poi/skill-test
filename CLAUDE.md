# Project: skill-test

## Tech Stack

- **Framework**: Vue 3.6 (beta/vapor) + TypeScript
- **Build Tool**: Vite 8 (beta)
- **State Management**: Pinia 3
- **Router**: Vue Router 5
- **Package Manager**: pnpm (with workspace overrides for Vue beta)
- **Testing**: Vitest + @vue/test-utils
- **Linting**: ESLint + oxlint + eslint-plugin-vue
- **Formatting**: oxfmt
- **Type Checking**: vue-tsc

## Development Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Type check + build
pnpm build-only   # Build without type check
pnpm type-check   # Run vue-tsc type checking
pnpm test:unit    # Run unit tests with Vitest
pnpm lint         # Run oxlint + eslint with auto-fix
pnpm format       # Format src/ with oxfmt
pnpm preview      # Preview production build
```

## Code Conventions

- Use Vue 3 Composition API with `<script setup lang="ts">` for all components
- Use TypeScript strict mode
- Path alias: `@` maps to `./src`
- Store files go in `src/stores/` using Pinia's `defineStore` with composition function style
- Route definitions in `src/router/index.ts`
- Unit tests in `src/__tests__/` with `.spec.ts` suffix

## Skills

This project includes the following Claude Code skills in `../opendesign-skills`:

- **opendesign-components**: OpenDesign Vue component library usage guide and API references
- **opendesign-tokens**: Design token system with theme-specific token references
- **openeuler-frontend-tools**: openEuler frontend utility functions, composables, and mixins
