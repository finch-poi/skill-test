<script setup lang="ts">
import { ref } from 'vue'
import { OAnchor, OAnchorItem, OButton } from '@opensig/opendesign'

interface AnchorItem {
  id: string
  title: string
}

const props = withDefaults(
  defineProps<{
    items?: AnchorItem[]
  }>(),
  {
    items: () => [],
  },
)

const collapsed = ref(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <div class="right-anchor-nav" :class="{ 'right-anchor-nav--collapsed': collapsed }">
    <div class="anchor-header">
      <span v-if="!collapsed" class="anchor-title">目录</span>
      <OButton variant="text" size="small" class="collapse-btn" @click="toggleCollapse">
        <template #icon>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </OButton>
    </div>
    <div v-if="!collapsed" class="anchor-body">
      <OAnchor
        layout="v"
        size="small"
        :target-offset="80"
        :change-hash="false"
        class="right-anchor-list"
      >
        <OAnchorItem
          v-for="item in items"
          :key="item.id"
          :href="`#${item.id}`"
          :title="item.title"
        />
      </OAnchor>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-anchor-nav {
  position: fixed;
  right: var(--o-r-gap-6);
  top: 80px;
  width: 180px;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  box-shadow: var(--o-shadow-1);
  z-index: 100;
  transition: width 0.3s ease;
  overflow: hidden;

  @include respond('<=pad') {
    display: none;
  }
}

.right-anchor-nav--collapsed {
  width: 40px;

  .collapse-btn {
    transform: rotate(180deg);
  }
}

.anchor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--o-r-gap-3) var(--o-r-gap-2);
  border-bottom: 1px solid var(--o-color-control3);
}

.anchor-title {
  @include text1;
  font-weight: 600;
  color: var(--o-color-info1);
}

.collapse-btn {
  padding: 4px;
  color: var(--o-color-info3);
  transition: transform 0.3s ease;

  &:hover {
    color: var(--o-color-info1);
  }
}

.anchor-body {
  padding: var(--o-r-gap-2);
  max-height: calc(100vh - 160px);
  overflow-y: auto;

  @include scrollbar;
}

.right-anchor-list {
  :deep(.o-anchor-item) {
    display: block;
  }
}
</style>
