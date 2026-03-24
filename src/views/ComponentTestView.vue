<script setup lang="ts">
import FloorMenu from '@/components/component-test/FloorMenu.vue'
import FloorTab from '@/components/component-test/FloorTab.vue'
import FloorBreadcrumb from '@/components/component-test/FloorBreadcrumb.vue'
import FloorAnchor from '@/components/component-test/FloorAnchor.vue'
import FloorPagination from '@/components/component-test/FloorPagination.vue'
import FloorStep from '@/components/component-test/FloorStep.vue'
import FloorButton from '@/components/component-test/FloorButton.vue'
import FloorDropdown from '@/components/component-test/FloorDropdown.vue'
import FloorRadio from '@/components/component-test/FloorRadio.vue'
import FloorCheckbox from '@/components/component-test/FloorCheckbox.vue'
import FloorSwitch from '@/components/component-test/FloorSwitch.vue'
import FloorScrollbar from '@/components/component-test/FloorScrollbar.vue'
import FloorToggle from '@/components/component-test/FloorToggle.vue'
import FloorFloatButton from '@/components/component-test/FloorFloatButton.vue'
import FloorInput from '@/components/component-test/FloorInput.vue'
import FloorTextarea from '@/components/component-test/FloorTextarea.vue'
import FloorSelect from '@/components/component-test/FloorSelect.vue'
import FloorUpload from '@/components/component-test/FloorUpload.vue'
import FloorRate from '@/components/component-test/FloorRate.vue'
import FloorCascader from '@/components/component-test/FloorCascader.vue'
import FloorSlider from '@/components/component-test/FloorSlider.vue'
import FloorDivider from '@/components/component-test/FloorDivider.vue'
import FloorTag from '@/components/component-test/FloorTag.vue'
import FloorAvatar from '@/components/component-test/FloorAvatar.vue'
import FloorBadge from '@/components/component-test/FloorBadge.vue'
import FloorDialog from '@/components/component-test/FloorDialog.vue'
import FloorList from '@/components/component-test/FloorList.vue'
import FloorDataTable from '@/components/component-test/FloorDataTable.vue'
import FloorForm from '@/components/component-test/FloorForm.vue'
import FloorCard from '@/components/component-test/FloorCard.vue'
import FloorProgress from '@/components/component-test/FloorProgress.vue'
import FloorInlineMessage from '@/components/component-test/FloorInlineMessage.vue'
import FloorGlobalMessage from '@/components/component-test/FloorGlobalMessage.vue'
import FloorToast from '@/components/component-test/FloorToast.vue'
import FloorPopover from '@/components/component-test/FloorPopover.vue'
import FloorLoading from '@/components/component-test/FloorLoading.vue'
import FloorResult from '@/components/component-test/FloorResult.vue'
import AppBottomNav from '@/components/AppBottomNav.vue'
import { OAnchor, OAnchorItem, OButton } from '@opensig/opendesign'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

import '@opensig/opendesign-token/themes/a.light.token.css'
import '@opensig/opendesign-token/themes/a.dark.token.css'

const scrollToHash = () => {
  const hash = window.location.hash.slice(1)
  if (hash) {
    nextTick(() => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }
}

onMounted(() => {
  scrollToHash()
  window.addEventListener('hashchange', scrollToHash)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', scrollToHash)
})

const anchorItems = [
  { id: 'floor-menu', title: 'Menu 菜单' },
  { id: 'floor-tab', title: 'Tab 标签页' },
  { id: 'floor-breadcrumb', title: 'Breadcrumb 面包屑' },
  { id: 'floor-anchor', title: 'Anchor 锚点' },
  { id: 'floor-pagination', title: 'Pagination 分页' },
  { id: 'floor-step', title: 'Step 步骤条' },
  { id: 'floor-button', title: 'Button 按钮' },
  { id: 'floor-dropdown', title: 'Dropdown 下拉菜单' },
  { id: 'floor-radio', title: 'Radio 单选框' },
  { id: 'floor-checkbox', title: 'Checkbox 复选框' },
  { id: 'floor-switch', title: 'Switch 开关' },
  { id: 'floor-scrollbar', title: 'Scrollbar 滚动条' },
  { id: 'floor-toggle', title: 'Toggle 切换' },
  { id: 'floor-float-button', title: 'FloatButton 悬浮按钮' },
  { id: 'floor-input', title: 'Input 输入框' },
  { id: 'floor-textarea', title: 'Textarea 文本域' },
  { id: 'floor-select', title: 'Select 选择器' },
  { id: 'floor-upload', title: 'Upload 上传' },
  { id: 'floor-rate', title: 'Rate 评分' },
  { id: 'floor-cascader', title: 'Cascader 级联选择器' },
  { id: 'floor-slider', title: 'Slider 滑块' },
  { id: 'floor-divider', title: 'Divider 分割线' },
  { id: 'floor-tag', title: 'Tag 标签' },
  { id: 'floor-avatar', title: 'Avatar 头像' },
  { id: 'floor-badge', title: 'Badge 徽标' },
  { id: 'floor-dialog', title: 'Dialog 对话框' },
  { id: 'floor-list', title: 'List 列表' },
  { id: 'floor-data-table', title: 'DataTable 数据表格' },
  { id: 'floor-form', title: 'Form 表单' },
  { id: 'floor-card', title: 'Card 卡片' },
  { id: 'floor-progress', title: 'Progress 进度条' },
  { id: 'floor-inline-message', title: 'InlineMessage 内联消息' },
  { id: 'floor-global-message', title: 'GlobalMessage 全局消息' },
  { id: 'floor-toast', title: 'Toast 轻提示' },
  { id: 'floor-popover', title: 'Popover 气泡卡片' },
  { id: 'floor-loading', title: 'Loading 加载' },
  { id: 'floor-result', title: 'Result 结果' },
]

const collapsed = ref(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const originalTheme = ref('')

onMounted(() => {
  originalTheme.value = document.documentElement.getAttribute('data-o-theme') || 'e.light'
  document.documentElement.setAttribute('data-o-theme', 'a.light')
})

onUnmounted(() => {
  document.documentElement.setAttribute('data-o-theme', originalTheme.value)
})
</script>

<template>
  <div class="component-test-page" id="component-test-page">
    <!-- 主内容区域 -->
    <div class="component-test-content">
      <div id="floor-menu"><FloorMenu /></div>
      <div id="floor-tab"><FloorTab /></div>
      <div id="floor-breadcrumb"><FloorBreadcrumb /></div>
      <div id="floor-anchor"><FloorAnchor /></div>
      <div id="floor-pagination"><FloorPagination /></div>
      <div id="floor-step"><FloorStep /></div>
      <div id="floor-button"><FloorButton /></div>
      <div id="floor-dropdown"><FloorDropdown /></div>
      <div id="floor-radio"><FloorRadio /></div>
      <div id="floor-checkbox"><FloorCheckbox /></div>
      <div id="floor-switch"><FloorSwitch /></div>
      <div id="floor-scrollbar"><FloorScrollbar /></div>
      <div id="floor-toggle"><FloorToggle /></div>
      <div id="floor-float-button"><FloorFloatButton /></div>
      <div id="floor-input"><FloorInput /></div>
      <div id="floor-textarea"><FloorTextarea /></div>
      <div id="floor-select"><FloorSelect /></div>
      <div id="floor-upload"><FloorUpload /></div>
      <div id="floor-rate"><FloorRate /></div>
      <div id="floor-cascader"><FloorCascader /></div>
      <div id="floor-slider"><FloorSlider /></div>
      <div id="floor-divider"><FloorDivider /></div>
      <div id="floor-tag"><FloorTag /></div>
      <div id="floor-avatar"><FloorAvatar /></div>
      <div id="floor-badge"><FloorBadge /></div>
      <div id="floor-dialog"><FloorDialog /></div>
      <div id="floor-list"><FloorList /></div>
      <div id="floor-data-table"><FloorDataTable /></div>
      <div id="floor-form"><FloorForm /></div>
      <div id="floor-card"><FloorCard /></div>
      <div id="floor-progress"><FloorProgress /></div>
      <div id="floor-inline-message"><FloorInlineMessage /></div>
      <div id="floor-global-message"><FloorGlobalMessage /></div>
      <div id="floor-toast"><FloorToast /></div>
      <div id="floor-popover"><FloorPopover /></div>
      <div id="floor-loading"><FloorLoading /></div>
      <div id="floor-result"><FloorResult /></div>
      <AppBottomNav />
    </div>

    <!-- 右侧锚点导航 -->
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
          container="#component-test-page"
          :target-offset="20"
          class="right-anchor-list"
        >
          <OAnchorItem
            v-for="item in anchorItems"
            :key="item.id"
            :href="`#${item.id}`"
            :title="item.title"
          />
        </OAnchor>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-test-page {
  display: flex;
  min-height: 100vh;
  background: var(--o-color-fill1);
}

.component-test-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--o-r-gap-6);
  padding-right: var(--o-r-gap-8);

  @include respond('<=pad') {
    padding: var(--o-r-gap-4);
    padding-right: var(--o-r-gap-4);
  }
}

.right-anchor-nav {
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: var(--o-r-gap-6);
  height: calc(100vh - var(--o-r-gap-12));
  max-height: calc(100vh - 80px);
  margin: var(--o-r-gap-6) var(--o-r-gap-6) var(--o-r-gap-6) 0;
  overflow: hidden;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-l);
  box-shadow: var(--o-shadow-1);
  border: 1px solid var(--o-color-control2-light);
  transition:
    width 0.3s ease,
    margin 0.3s ease;
  display: flex;
  flex-direction: column;

  @include respond('<=pad') {
    display: none;
  }
}

.right-anchor-nav--collapsed {
  width: 48px;
  margin-right: var(--o-r-gap-4);

  .collapse-btn {
    transform: rotate(180deg);
  }

  .anchor-header {
    justify-content: center;
    padding: var(--o-r-gap-3) var(--o-r-gap-2);
  }

  .anchor-body {
    display: none;
  }
}

.anchor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--o-r-gap-4) var(--o-r-gap-5);
  border-bottom: 1px solid var(--o-color-control3);
  background: linear-gradient(
    180deg,
    rgba(var(--o-primary-rgb, 0, 82, 204), 0.03) 0%,
    transparent 100%
  );
  flex-shrink: 0;
}

.anchor-title {
  @include text1;
  font-weight: 600;
  color: var(--o-color-info1);
  letter-spacing: 0.02em;
}

.collapse-btn {
  padding: 6px;
  color: var(--o-color-info3);
  transition:
    transform 0.3s ease,
    color 0.2s ease;
  border-radius: var(--o-radius-s);

  &:hover {
    color: var(--o-color-primary1);
    background: rgba(var(--o-primary-rgb, 0, 82, 204), 0.08);
  }
}

.anchor-body {
  padding: var(--o-r-gap-4) var(--o-r-gap-3);
  flex: 1;
  overflow-y: auto;

  @include scrollbar;
}

.right-anchor-list {
  :deep(.o-anchor) {
    padding-left: var(--o-r-gap-3);
  }

  :deep(.o-anchor-item) {
    display: block;
    margin-bottom: 2px;
  }

  :deep(.o-anchor-item-link) {
    padding: var(--o-r-gap-2) var(--o-r-gap-3);
    border-radius: var(--o-radius-s);
    transition: all 0.2s ease;
  }

  :deep(.o-anchor-item-link:hover) {
    background: rgba(var(--o-primary-rgb, 0, 82, 204), 0.06);
  }

  :deep(.o-anchor-item.o-anchor-item--active .o-anchor-item-link) {
    background: rgba(var(--o-primary-rgb, 0, 82, 204), 0.1);
  }
}
</style>
