<script setup lang="ts">
import { ref } from 'vue'
import { OIconSearch, OIconChevronDown, OIconClose } from '@opensig/opendesign'
import { AppIconAscendLogo, AppIconMenu, AppIconMoon, AppIconSun, AppIconUser } from '@/icon-components'
import { useTheme } from '@/composables/useTheme'

interface NavItem {
  label: string
  href?: string
  hasDropdown?: boolean
}

const mainNavItems: NavItem[] = [
  { label: '产品', hasDropdown: true },
  { label: 'CANN', hasDropdown: true },
  { label: '解决方案', hasDropdown: true },
  { label: '开发者', hasDropdown: true },
  { label: '合作伙伴', hasDropdown: true },
  { label: '教育研究', hasDropdown: false },
  { label: '昇腾AI市场', hasDropdown: false },
  { label: '支持与服务', hasDropdown: true },
]

const mobileMenuOpen = ref(false)
const searchQuery = ref('')

const { isDark, toggleTheme } = useTheme()

// 模拟登录状态（实际项目中应从 store/auth 获取）
const isLoggedIn = ref(true)
const userName = ref('风语者')

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <!-- Logo -->
      <a href="/" class="header-logo" aria-label="Ascend 昇腾">
        <AppIconAscendLogo class="logo-icon" />
        <span class="logo-text">Ascend</span>
      </a>

      <!-- 桌面导航 -->
      <nav class="header-nav">
        <a
          v-for="item in mainNavItems"
          :key="item.label"
          :href="item.href || '#'"
          class="nav-item"
        >
          <span>{{ item.label }}</span>
          <OIconChevronDown v-if="item.hasDropdown" class="nav-arrow" />
        </a>
      </nav>

      <!-- 右侧操作区 -->
      <div class="header-actions">
        <!-- 搜索框 -->
        <div class="search-box">
          <input
            v-model="searchQuery"
            class="search-input"
            placeholder="mindie"
            type="search"
            aria-label="搜索"
          />
          <OIconSearch class="search-icon" />
        </div>

        <!-- 文档按钮 -->
        <a href="#" class="docs-btn">
          文档
          <span class="badge badge--hot">HOT</span>
        </a>

        <!-- 下载按钮 -->
        <button class="action-btn action-btn--download">
          下载
          <OIconChevronDown class="action-chevron" />
        </button>

        <!-- 夜间模式 -->
        <button class="icon-btn" :aria-label="isDark ? '切换浅色模式' : '切换深色模式'" @click="toggleTheme">
          <AppIconSun v-if="isDark" class="header-icon" />
          <AppIconMoon v-else class="header-icon" />
        </button>

        <!-- 用户区域 -->
        <template v-if="isLoggedIn">
          <button class="user-btn">
            <span class="user-avatar">
              <AppIconUser class="avatar-icon" />
            </span>
            <span class="user-name">{{ userName }}</span>
            <OIconChevronDown class="user-chevron" />
          </button>
        </template>
        <template v-else>
          <a href="#" class="login-btn">登录</a>
        </template>
      </div>

      <!-- 移动端汉堡菜单 -->
      <button
        class="mobile-menu-btn"
        :aria-expanded="mobileMenuOpen"
        :aria-label="mobileMenuOpen ? '关闭菜单' : '打开菜单'"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <OIconClose v-if="mobileMenuOpen" class="mobile-menu-icon" />
        <AppIconMenu v-else class="mobile-menu-icon" />
      </button>
    </div>

    <!-- 移动端菜单遮罩 -->
    <div
      v-if="mobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    />

    <!-- 移动端菜单展开 -->
    <nav v-if="mobileMenuOpen" class="mobile-nav">
      <a
        v-for="item in mainNavItems"
        :key="item.label"
        href="#"
        class="mobile-nav-item"
        @click="closeMobileMenu"
      >
        <span>{{ item.label }}</span>
        <OIconChevronDown v-if="item.hasDropdown" class="mobile-nav-arrow" />
      </a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
// Ascend 品牌色（DSL: Tag/S 矩形备份38 fill=rgba(199,0,11,1)）
$ascend-brand: rgb(199, 0, 11);

.app-header {
  position: sticky;
  top: 0;
  z-index: 200;
  width: 100%;
  // TODO(token): 无对应半透明 token，用 --o-grey-1 raw 值加透明度近似
  // light=rgba(255,255,255,0.95) exact；dark=rgba(0,0,0,0.95) 深色毛玻璃
  background: rgba(var(--o-grey-1), 0.95);
  backdrop-filter: blur(6px);
  box-shadow: var(--o-shadow-1);
}

.header-inner {
  display: flex;
  align-items: center;
  height: 72px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 64px;
  gap: var(--o-r-gap-6);

  @include respond('<=pad') {
    padding: 0 var(--o-r-gap-7);
    height: 56px;
  }
}

// Logo
.header-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
  color: var(--o-color-info1);
}

.logo-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.logo-text {
  @include h4;
  font-weight: 600;
  color: var(--o-color-info1);
  letter-spacing: 0.02em;

  @include respond('phone') {
    display: none;
  }
}

// 桌面导航
.header-nav {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0;
  overflow: hidden;

  @include respond('<=pad') {
    display: none;
  }
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 var(--o-r-gap-3);
  height: 72px;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  color: var(--o-color-info1);
  border-bottom: 2px solid transparent;
  transition: color var(--o-duration-s), border-color var(--o-duration-s);

  @include tip1;

  &:hover {
    color: #{$ascend-brand};
    border-bottom-color: #{$ascend-brand};
  }

  &.is-active {
    color: #{$ascend-brand};
    border-bottom-color: #{$ascend-brand};
  }
}

.nav-arrow {
  width: 14px;
  height: 14px;
  color: var(--o-color-info3);
  flex-shrink: 0;
  margin-top: 1px;
}

// 右侧操作区
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-3);
  flex-shrink: 0;
  margin-left: auto;

  @include respond('<=pad') {
    display: none;
  }
}

// 搜索框
.search-box {
  position: relative;
  display: flex;
  align-items: center;

  @include respond('<=laptop') {
    display: none;
  }
}

.search-input {
  width: 160px;
  height: 32px;
  padding: 0 var(--o-r-gap-5) 0 var(--o-r-gap-3);
  @include tip1;
  color: var(--o-color-info1);
  background: var(--o-color-fill1);
  border: 1px solid var(--o-color-control3);
  border-radius: var(--o-radius-m);
  outline: none;
  transition: border-color var(--o-duration-s);

  &::placeholder {
    color: var(--o-color-info3);
  }

  &:focus {
    border-color: #{$ascend-brand};
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
}

.search-icon {
  position: absolute;
  right: var(--o-r-gap-2);
  width: 16px;
  height: 16px;
  color: var(--o-color-info3);
  pointer-events: none;
}

// 文档按钮
.docs-btn {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-1);
  height: 32px;
  padding: 0 var(--o-r-gap-3);
  @include tip1;
  color: var(--o-color-info1);
  text-decoration: none;
  border-radius: var(--o-radius-m);
  transition: color var(--o-duration-s);

  &:hover {
    color: #{$ascend-brand};
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 4px;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 600;
  line-height: 14px;
}

.badge--hot {
  background: #{$ascend-brand};
  color: #fff;
}

// 操作按钮（下载等）
.action-btn {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 32px;
  padding: 0 var(--o-r-gap-3);
  @include tip1;
  color: var(--o-color-info1);
  background: none;
  border: none;
  border-radius: var(--o-radius-m);
  cursor: pointer;
  transition: color var(--o-duration-s);

  &:hover {
    color: #{$ascend-brand};
  }
}

.action-chevron {
  width: 14px;
  height: 14px;
}

// 图标按钮
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  border-radius: var(--o-radius-m);
  cursor: pointer;
  color: var(--o-color-info2);
  transition: color var(--o-duration-s);

  &:hover {
    color: var(--o-color-info1);
  }
}

.header-icon {
  width: 20px;
  height: 20px;
}

// 用户按钮
.user-btn {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-1);
  height: 32px;
  padding: 0 var(--o-r-gap-2);
  @include tip1;
  color: var(--o-color-info1);
  background: none;
  border: none;
  border-radius: var(--o-radius-m);
  cursor: pointer;
  transition: color var(--o-duration-s);

  &:hover {
    color: #{$ascend-brand};
  }
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--o-color-fill3);
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-icon {
  width: 16px;
  height: 16px;
  color: var(--o-color-info2);
}

.user-name {
  max-width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-chevron {
  width: 14px;
  height: 14px;
}

.login-btn {
  @include tip1;
  color: #{$ascend-brand};
  text-decoration: none;
  padding: 0 var(--o-r-gap-2);
}

// 移动端汉堡/关闭按钮
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--o-color-info1);
  border-radius: var(--o-radius-m);
  margin-left: auto;
  transition: color var(--o-duration-s);

  &:hover {
    color: #{$ascend-brand};
  }

  @include respond('<=pad') {
    display: flex;
  }
}

.mobile-menu-icon {
  width: 22px;
  height: 22px;
}

// 移动端遮罩层
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 199;

  @include respond('>pad') {
    display: none;
  }
}

// 移动端导航菜单
.mobile-nav {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  background: var(--o-color-fill2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-top: 1px solid var(--o-color-control3);
  animation: mobile-nav-slide-down var(--o-duration-m2) var(--o-easing-standard-out) both;

  @include respond('>pad') {
    display: none;
  }
}

@keyframes mobile-nav-slide-down {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--o-r-gap-4) var(--o-r-gap-7);
  @include text1;
  color: var(--o-color-info1);
  text-decoration: none;
  border-bottom: 1px solid var(--o-color-control3);
  transition: color var(--o-duration-s), background var(--o-duration-s);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: #{$ascend-brand};
    background: var(--o-color-fill1);
  }
}

.mobile-nav-arrow {
  width: 16px;
  height: 16px;
  color: var(--o-color-info3);
  flex-shrink: 0;
}
</style>
