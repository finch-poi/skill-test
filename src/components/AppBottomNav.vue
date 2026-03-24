<script setup lang="ts">
// 设计稿 ID：103:4650（Pixso item-id，底部导航）
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { OIconFilter, OIconSearch, OIconAdd, OIconStar, OIconEllipsis } from '@opensig/opendesign'

const route = useRoute()
const router = useRouter()

interface NavItem {
  key: string
  label: string
  icon: typeof OIconFilter
  path: string
}

const navItems: NavItem[] = [
  { key: 'home', label: '首页', icon: OIconFilter, path: '/' },
  { key: 'discover', label: '发现', icon: OIconSearch, path: '/policy-rules' },
  { key: 'publish', label: '发布', icon: OIconAdd, path: '/form-test-1' },
  { key: 'message', label: '消息', icon: OIconStar, path: '/document-test-1' },
  { key: 'profile', label: '我的', icon: OIconEllipsis, path: '/subsite-header-test' },
]

const activeKey = computed(() => {
  const current = navItems.find((item) => item.path === route.path)
  return current?.key ?? 'home'
})

function handleNav(item: NavItem) {
  router.push(item.path)
}
</script>

<template>
  <nav class="app-bottom-nav" data-testid="bottom-nav">
    <div class="nav-list">
      <button
        v-for="item in navItems"
        :key="item.key"
        class="nav-item"
        :class="{ 'nav-item--active': activeKey === item.key }"
        :data-testid="`bottom-nav-${item.key}`"
        @click="handleNav(item)"
      >
        <component :is="item.icon" class="nav-icon" />
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.app-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--o-color-fill2);
  box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.08);
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 56px;
  max-width: 600px;
  margin: 0 auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--o-color-info3);
  transition: color var(--o-duration-m1) var(--o-easing-standard-out);

  &:hover {
    color: var(--o-color-info2);
  }

  &--active {
    color: var(--o-color-primary1);

    &:hover {
      color: var(--o-color-primary1);
    }
  }
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.nav-label {
  @include tip2;
  font-weight: 500;
}
</style>
