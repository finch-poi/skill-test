<script setup lang="ts">
import { ref } from 'vue'
import { OMenu, OSubMenu, OMenuItem, OInput, OSelect, OOption } from '@opensig/opendesign'

const activeMenu = ref('item-config')
const expandedMenus = ref(['sub-prepare'])

const versionProduct = ref('虚拟化')
const versionRelease = ref('25.09')

const productOptions = ['虚拟化', '容器', '存储']
const versionOptions = ['25.09', '24.03', '23.09', '22.03']

const searchText = ref('')
</script>

<template>
  <aside class="doc-sidebar">
    <!-- Version selector bar -->
    <div class="version-bar">
      <OSelect v-model="versionProduct" size="small" class="version-select">
        <OOption v-for="opt in productOptions" :key="opt" :value="opt" :label="opt" />
      </OSelect>
      <OSelect v-model="versionRelease" size="small" class="version-select">
        <OOption v-for="opt in versionOptions" :key="opt" :value="opt" :label="opt" />
      </OSelect>
    </div>

    <!-- Search input -->
    <div class="search-area">
      <OInput
        v-model="searchText"
        placeholder="在本产品文档搜索"
        clearable
        size="small"
      >
        <template #prefix>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
            <path d="M16.5 16.5L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </template>
      </OInput>
    </div>

    <!-- Navigation menu -->
    <OMenu
      v-model="activeMenu"
      v-model:expanded="expandedMenus"
      size="small"
      arrow-position="left"
      class="doc-menu"
      style="--menu-width: 100%"
    >
      <OSubMenu value="sub-guide">
        <template #title>虚拟化用户指南</template>
      </OSubMenu>

      <OMenuItem value="item-intro">认识虚拟化</OMenuItem>
      <OMenuItem value="item-install">安装虚拟化组件</OMenuItem>

      <OSubMenu value="sub-prepare">
        <template #title>准备使用环境</template>
        <OMenuItem value="item-overview">总体介绍</OMenuItem>
        <OMenuItem value="item-desc">虚拟机描述</OMenuItem>
        <OMenuItem value="item-cpu">虚拟CPU和虚拟内存</OMenuItem>
        <OMenuItem value="item-config">配置虚拟机设备</OMenuItem>
        <OMenuItem value="item-arch">体系架构相关配置</OMenuItem>
        <OMenuItem value="item-common">其他常见配置项</OMenuItem>
        <OMenuItem value="item-xml">XML配置文件示例</OMenuItem>
      </OSubMenu>

      <OMenuItem value="item-manage">管理虚拟机</OMenuItem>
      <OMenuItem value="item-migrate">迁移虚拟机</OMenuItem>
      <OMenuItem value="item-system">管理系统资源</OMenuItem>
      <OMenuItem value="item-device">管理设备</OMenuItem>
      <OMenuItem value="item-device-manage">管理虚拟机可维护性</OMenuItem>
      <OMenuItem value="item-best">最佳实践</OMenuItem>
      <OMenuItem value="item-tools">工具使用指南</OMenuItem>

      <div class="menu-divider">
        <span class="divider-label">相关文档</span>
        <div class="divider-line"></div>
      </div>

      <OMenuItem value="item-api">API参考</OMenuItem>
      <OMenuItem value="item-ascend">Ascend C最佳实践</OMenuItem>
      <OMenuItem value="item-vllm">vLLM Ascend</OMenuItem>
    </OMenu>
  </aside>
</template>

<style lang="scss" scoped>
.doc-sidebar {
  width: 336px;
  flex-shrink: 0;
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
  overflow-y: auto;
  /* DSL: rgba(235,241,250,0.4) blue-tint with inner shadow */
  background: rgba(235, 241, 250, 0.4);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;

  @include scrollbar;
}

.version-bar {
  display: flex;
  gap: var(--o-r-gap-2);
  padding: var(--o-r-gap-2) var(--o-r-gap-4);
  background: var(--o-color-fill2);
  border-bottom: 1px solid var(--o-color-control3);
  flex-shrink: 0;
}

.version-select {
  flex: 1;
}

.search-area {
  padding: var(--o-r-gap-3) var(--o-r-gap-4);
  border-bottom: 1px solid var(--o-color-control3);
  flex-shrink: 0;
}

.doc-menu {
  padding: var(--o-r-gap-3) var(--o-r-gap-2);
  flex: 1;
}

.menu-divider {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-2);
  padding: var(--o-r-gap-3) var(--o-r-gap-2) var(--o-r-gap-2);
}

.divider-label {
  @include tip1;
  color: var(--o-color-info3);
  white-space: nowrap;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: var(--o-color-control3);
}
</style>
