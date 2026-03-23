<script setup lang="ts">
import { OButton } from '@opensig/opendesign'

const navLinks = ['下载', '开发', '文档', '学习', '支持', '社区', '动态']
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <a href="/" class="logo">
        <img src="https://openeuler.org/img/logo.png" alt="OpenEuler" height="28" />
      </a>
      <nav class="nav-links">
        <a v-for="link in navLinks" :key="link" href="#" class="nav-item">{{ link }}</a>
      </nav>
      <div class="header-actions">
        <div class="search-box">
          <input placeholder="搜索" class="search-input" />
        </div>
        <OButton variant="text" size="small">源码</OButton>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: var(--o-color-fill2);
  border-bottom: 1px solid var(--o-color-control3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--o-r-gap-7);
  height: 56px;
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-6);
}

.logo img {
  display: block;
}

.nav-links {
  display: flex;
  gap: var(--o-r-gap-5);
  flex: 1;
}

.nav-item {
  @include tip1;
  color: var(--o-color-info1);
  text-decoration: none;
  white-space: nowrap;
}

.nav-item:hover {
  color: var(--o-color-primary1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-3);
}

.search-box {
  border: 1px solid var(--o-color-control3);
  border-radius: 4px;
  overflow: hidden;
}

.search-input {
  border: none;
  outline: none;
  padding: var(--o-r-gap-1) var(--o-r-gap-3);
  @include tip1;
  background: transparent;
  color: var(--o-color-info1);
  width: 120px;
}
</style>
