<script setup lang="ts">
import { ref } from 'vue'
import { OIconSearch, OIconClose } from '@opensig/opendesign'
import { AppIconAscendLogo, AppIconMenu, AppIconMoon, AppIconSun, AppIconUser } from '@/icon-components'
import { useTheme } from '@/composables/useTheme'

interface SubNavItem {
  label: string
  href?: string
}

interface Props {
  /** 子站名称，显示在顶部迷你栏 */
  siteName?: string
  /** 当前所在的子站分区（如 "开发者"、"技术主页" 等） */
  activeSection?: string
  /** 搜索框占位文字 */
  searchPlaceholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  siteName: '昇腾社区首页',
  activeSection: '开发者',
  searchPlaceholder: 'mindie',
})

const subNavItems: SubNavItem[] = [
  { label: '主页' },
  { label: '开发' },
  { label: '活动与大赛' },
  { label: '互动问答' },
  { label: '经验分享' },
  { label: '圈子' },
  { label: '文档' },
]

const mobileMenuOpen = ref(false)
const searchQuery = ref('')

const { isDark, toggleTheme } = useTheme()

// 模拟登录状态（实际项目中应从 store/auth 获取）
const isLoggedIn = ref(false)
const userName = ref('')

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="subsite-header">
    <!-- 顶部迷你栏 -->
    <div class="top-bar">
      <div class="top-bar-inner">
        <a href="/" class="site-name">{{ props.siteName }}</a>
        <div class="top-bar-actions">
          <template v-if="isLoggedIn">
            <button class="user-mini-btn">
              <AppIconUser class="mini-icon" />
              <span>{{ userName }}</span>
            </button>
          </template>
          <template v-else>
            <a href="#" class="top-login-btn">登录</a>
            <a href="#" class="top-register-btn">注册</a>
          </template>
        </div>
      </div>
    </div>

    <!-- 主导航栏 -->
    <div class="main-bar">
      <div class="main-bar-inner">
        <!-- Logo -->
        <a href="/" class="header-logo" aria-label="Ascend 昇腾">
          <AppIconAscendLogo class="logo-icon" />
          <span class="logo-text">Ascend</span>
        </a>

        <!-- 当前分区标识 -->
        <div class="section-divider"></div>
        <span class="active-section">{{ props.activeSection }}</span>

        <!-- 子导航链接 -->
        <nav class="sub-nav">
          <a
            v-for="item in subNavItems"
            :key="item.label"
            :href="item.href || '#'"
            class="sub-nav-item"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- 右侧操作区 -->
        <div class="main-bar-actions">
          <!-- 搜索框 -->
          <div class="search-box">
            <input
              v-model="searchQuery"
              class="search-input"
              :placeholder="props.searchPlaceholder"
              type="search"
              aria-label="搜索"
            />
            <OIconSearch class="search-icon" />
          </div>

          <!-- 夜间模式 -->
          <button class="icon-btn" :aria-label="isDark ? '切换浅色模式' : '切换深色模式'" @click="toggleTheme">
            <AppIconSun v-if="isDark" class="header-icon" />
            <AppIconMoon v-else class="header-icon" />
          </button>

          <!-- 支持 -->
          <a href="#" class="support-btn">支持</a>
        </div>

        <!-- 移动端按钮 -->
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
    </div>

    <!-- 移动端遮罩 -->
    <div
      v-if="mobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    />

    <!-- 移动端菜单 -->
    <nav v-if="mobileMenuOpen" class="mobile-nav">
      <a href="#" class="mobile-nav-item mobile-nav-item--section">
        {{ props.activeSection }}
      </a>
      <a
        v-for="item in subNavItems"
        :key="item.label"
        href="#"
        class="mobile-nav-item"
        @click="closeMobileMenu"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
// Ascend 品牌色（DSL: active tab inner-shadow color = rgba(199,0,11,1)）
$ascend-brand: rgb(199, 0, 11);

.subsite-header {
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

// ── 顶部迷你栏 ──────────────────────────────────────────
.top-bar {
  border-bottom: 1px solid var(--o-color-control3);
  // TODO(token): DSL 值 rgb(237,239,242)，最近 fill3=rgb(237,237,240)，ΔG=2 ΔB=2
  background: var(--o-color-fill3);

  @include respond('<=pad') {
    display: none;
  }
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 64px;
}

.site-name {
  @include tip1;
  color: var(--o-color-info2);
  text-decoration: none;
  transition: color var(--o-duration-s);

  &:hover {
    color: #{$ascend-brand};
  }
}

.top-bar-actions {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-3);
}

.top-login-btn {
  @include tip1;
  color: var(--o-color-info2);
  text-decoration: none;
  padding: 2px var(--o-r-gap-3);
  border: 1px solid var(--o-color-control3);
  border-radius: var(--o-radius-m);
  transition: color var(--o-duration-s), border-color var(--o-duration-s);

  &:hover {
    color: #{$ascend-brand};
    border-color: #{$ascend-brand};
  }
}

.top-register-btn {
  @include tip1;
  color: #fff;
  text-decoration: none;
  padding: 2px var(--o-r-gap-3);
  background: #{$ascend-brand};
  border: 1px solid #{$ascend-brand};
  border-radius: var(--o-radius-m);
  transition: opacity var(--o-duration-s);

  &:hover {
    opacity: 0.85;
  }
}

.user-mini-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  @include tip1;
  color: var(--o-color-info1);
  background: none;
  border: none;
  cursor: pointer;
}

.mini-icon {
  width: 16px;
  height: 16px;
}

// ── 主导航栏 ──────────────────────────────────────────
.main-bar-inner {
  display: flex;
  align-items: center;
  height: 64px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 64px;
  gap: var(--o-r-gap-4);

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
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}

.logo-text {
  @include text2;
  font-weight: 600;
  color: var(--o-color-info1);

  @include respond('phone') {
    display: none;
  }
}

.section-divider {
  width: 1px;
  height: 16px;
  background: var(--o-color-control3);
  flex-shrink: 0;

  @include respond('<=pad') {
    display: none;
  }
}

.active-section {
  @include h4;
  font-weight: 600;
  color: var(--o-color-info1);
  white-space: nowrap;
  flex-shrink: 0;

  @include respond('<=pad') {
    display: none;
  }
}

// 子导航链接
.sub-nav {
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;

  @include respond('<=pad') {
    display: none;
  }
}

.sub-nav-item {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 var(--o-r-gap-3);
  @include tip1;
  color: var(--o-color-info2);
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color var(--o-duration-s), border-color var(--o-duration-s);

  &:hover {
    color: var(--o-color-info1);
    border-bottom-color: #{$ascend-brand};
  }

  &.is-active {
    color: var(--o-color-info1);
    border-bottom-color: #{$ascend-brand};
  }
}

// 右侧操作区
.main-bar-actions {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-3);
  flex-shrink: 0;
  margin-left: auto;

  @include respond('<=pad') {
    display: none;
  }
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 140px;
  height: 30px;
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
  width: 14px;
  height: 14px;
  color: var(--o-color-info3);
  pointer-events: none;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
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
  width: 18px;
  height: 18px;
}

.support-btn {
  @include tip1;
  color: var(--o-color-info2);
  text-decoration: none;
  padding: 0 var(--o-r-gap-2);
  transition: color var(--o-duration-s);

  &:hover {
    color: #{$ascend-brand};
  }
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

// 移动端遮罩
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 199;

  @include respond('>pad') {
    display: none;
  }
}

// 移动端菜单展开
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
  display: block;
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

  &--section {
    @include text2;
    font-weight: 600;
    color: #{$ascend-brand};
  }
}
</style>
