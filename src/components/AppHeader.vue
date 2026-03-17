<script setup lang="ts">
import { OLink, OIcon } from '@opensig/opendesign'
import { AppIconMoon, AppIconUser } from '@/icon-components'

defineProps<{
  activeNav?: string
}>()
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <div class="header-left">
        <div class="logo">
          <img
            src="https://www.openeuler.org/img/logo/light.svg"
            alt="openEuler"
            class="logo-img"
          />
          <span class="logo-text">软件中心</span>
        </div>
        <nav class="nav">
          <OLink
            color="normal"
            class="nav-link"
            :class="{ active: activeNav === 'home' }"
          >
            主页
          </OLink>
          <OLink
            color="normal"
            class="nav-link"
            :class="{ active: activeNav === 'domain' }"
          >
            领域应用
          </OLink>
          <OLink
            :color="activeNav === 'software-list' ? 'primary' : 'normal'"
            class="nav-link"
            :class="{ active: activeNav === 'software-list' }"
          >
            软件列表
          </OLink>
          <OLink
            color="normal"
            class="nav-link"
            :class="{ active: activeNav === 'version-support' }"
          >
            软件版本支持
          </OLink>
        </nav>
      </div>
      <div class="header-right">
        <OIcon :icon="AppIconMoon" />
        <OIcon :icon="AppIconUser" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--o-color-fill2);
  border-bottom: 1px solid var(--o-color-control3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-5);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--o-gap-7);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--o-gap-3);
}

.logo-img {
  height: 24px;
}

.logo-text {
  font-size: var(--o-font_size-text1);
  font-weight: 500;
  color: var(--o-color-info1);
  border-left: 1px solid var(--o-color-control3);
  padding-left: var(--o-gap-3);
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--o-gap-6);
}

.nav-link {
  font-size: var(--o-font_size-text1);
}

.nav-link.active {
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--o-gap-5);
  color: var(--o-color-info2);
  cursor: pointer;
}
</style>
