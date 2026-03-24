<script setup lang="ts">
// 设计稿 ID：29:5103, 103:3564, 103:3535, 5:10948（Pixso item-id，下拉按钮）
import { ref } from 'vue'
import { ODropdown, ODropdownItem, OButton, OIconChevronDown } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// 强调下拉 visible states
const visibleEmphasisL = ref(false)
const visibleEmphasisM = ref(false)
const visibleEmphasisS = ref(false)
const visibleEmphasisLDark = ref(false)
const visibleEmphasisMDark = ref(false)
const visibleEmphasisSDark = ref(false)

// 普通下拉 visible states
const visibleNormalL = ref(false)
const visibleNormalM = ref(false)
const visibleNormalS = ref(false)
const visibleNormalLDark = ref(false)
const visibleNormalMDark = ref(false)
const visibleNormalSDark = ref(false)

// 文字下拉 visible states
const visibleTextL = ref(false)
const visibleTextM = ref(false)
const visibleTextS = ref(false)
const visibleTextLDark = ref(false)
const visibleTextMDark = ref(false)
const visibleTextSDark = ref(false)
</script>

<template>
  <AppSection
    title="ODropdown 下拉按钮"
    subtitle="设计稿 ID：29:5103, 103:3564, 103:3535, 5:10948 · 强调/普通/文字 × L/M/S × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="dropdown-row-light">
        <div class="theme-label">Light</div>

        <!-- 强调下拉 -->
        <div class="group-label">强调下拉（Solid）</div>
        <div class="btn-row">
          <!-- L size -->
          <ODropdown
            v-model:visible="visibleEmphasisL"
            trigger="click-outclick"
            data-testid="dropdown-emphasis-l-light"
          >
            <OButton variant="solid" color="primary" :size="'large'" round="pill">
              强调下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleEmphasisL }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项一" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
              <ODropdownItem label="默认选项" value="opt4" />
              <ODropdownItem label="默认选项" value="opt5" />
              <ODropdownItem label="默认选项" value="opt6" />
            </template>
          </ODropdown>

          <!-- M size -->
          <ODropdown
            v-model:visible="visibleEmphasisM"
            trigger="click-outclick"
            data-testid="dropdown-emphasis-m-light"
          >
            <OButton variant="solid" color="primary" :size="'medium'" round="pill">
              强调下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleEmphasisM }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <!-- S size -->
          <ODropdown
            v-model:visible="visibleEmphasisS"
            trigger="click-outclick"
            data-testid="dropdown-emphasis-s-light"
          >
            <OButton variant="solid" color="primary" :size="'small'" round="pill">
              强调下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleEmphasisS }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>
        </div>

        <!-- 普通下拉 -->
        <div class="group-label">普通下拉（Outline）</div>
        <div class="btn-row">
          <!-- L size -->
          <ODropdown
            v-model:visible="visibleNormalL"
            trigger="click-outclick"
            data-testid="dropdown-normal-l-light"
          >
            <OButton variant="outline" color="primary" :size="'large'" round="pill">
              普通下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleNormalL }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <!-- M size -->
          <ODropdown
            v-model:visible="visibleNormalM"
            trigger="click-outclick"
            data-testid="dropdown-normal-m-light"
          >
            <OButton variant="outline" color="primary" :size="'medium'" round="pill">
              普通下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleNormalM }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <!-- S size -->
          <ODropdown
            v-model:visible="visibleNormalS"
            trigger="click-outclick"
            data-testid="dropdown-normal-s-light"
          >
            <OButton variant="outline" color="primary" :size="'small'" round="pill">
              普通下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleNormalS }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>
        </div>

        <!-- 文字下拉 -->
        <div class="group-label">文字下拉（Text）</div>
        <div class="btn-row">
          <!-- L size -->
          <ODropdown
            v-model:visible="visibleTextL"
            trigger="click-outclick"
            data-testid="dropdown-text-l-light"
          >
            <OButton variant="text" :size="'large'">
              文字下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleTextL }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <!-- M size -->
          <ODropdown
            v-model:visible="visibleTextM"
            trigger="click-outclick"
            data-testid="dropdown-text-m-light"
          >
            <OButton variant="text" :size="'medium'">
              文字下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleTextM }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <!-- S size -->
          <ODropdown
            v-model:visible="visibleTextS"
            trigger="click-outclick"
            data-testid="dropdown-text-s-light"
          >
            <OButton variant="text" :size="'small'">
              文字下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleTextS }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="dropdown-row-dark"
      >
        <div class="theme-label">Dark</div>

        <!-- 强调下拉 Dark -->
        <div class="group-label">强调下拉（Solid）</div>
        <div class="btn-row">
          <ODropdown
            v-model:visible="visibleEmphasisLDark"
            trigger="click-outclick"
            data-testid="dropdown-emphasis-l-dark"
          >
            <OButton variant="solid" color="primary" :size="'large'" round="pill">
              强调下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleEmphasisLDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项一" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <ODropdown
            v-model:visible="visibleEmphasisMDark"
            trigger="click-outclick"
            data-testid="dropdown-emphasis-m-dark"
          >
            <OButton variant="solid" color="primary" :size="'medium'" round="pill">
              强调下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleEmphasisMDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <ODropdown
            v-model:visible="visibleEmphasisSDark"
            trigger="click-outclick"
            data-testid="dropdown-emphasis-s-dark"
          >
            <OButton variant="solid" color="primary" :size="'small'" round="pill">
              强调下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleEmphasisSDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>
        </div>

        <!-- 普通下拉 Dark -->
        <div class="group-label">普通下拉（Outline）</div>
        <div class="btn-row">
          <ODropdown
            v-model:visible="visibleNormalLDark"
            trigger="click-outclick"
            data-testid="dropdown-normal-l-dark"
          >
            <OButton variant="outline" color="primary" :size="'large'" round="pill">
              普通下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleNormalLDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <ODropdown
            v-model:visible="visibleNormalMDark"
            trigger="click-outclick"
            data-testid="dropdown-normal-m-dark"
          >
            <OButton variant="outline" color="primary" :size="'medium'" round="pill">
              普通下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleNormalMDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <ODropdown
            v-model:visible="visibleNormalSDark"
            trigger="click-outclick"
            data-testid="dropdown-normal-s-dark"
          >
            <OButton variant="outline" color="primary" :size="'small'" round="pill">
              普通下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleNormalSDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>
        </div>

        <!-- 文字下拉 Dark -->
        <div class="group-label">文字下拉（Text）</div>
        <div class="btn-row">
          <ODropdown
            v-model:visible="visibleTextLDark"
            trigger="click-outclick"
            data-testid="dropdown-text-l-dark"
          >
            <OButton variant="text" :size="'large'">
              文字下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleTextLDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <ODropdown
            v-model:visible="visibleTextMDark"
            trigger="click-outclick"
            data-testid="dropdown-text-m-dark"
          >
            <OButton variant="text" :size="'medium'">
              文字下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleTextMDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>

          <ODropdown
            v-model:visible="visibleTextSDark"
            trigger="click-outclick"
            data-testid="dropdown-text-s-dark"
          >
            <OButton variant="text" :size="'small'">
              文字下拉
              <template #suffix>
                <OIconChevronDown :class="{ 'icon-rotate': visibleTextSDark }" />
              </template>
            </OButton>
            <template #dropdown>
              <ODropdownItem label="默认选项" value="opt1" />
              <ODropdownItem label="默认选项" value="opt2" />
              <ODropdownItem label="默认选项" value="opt3" />
            </template>
          </ODropdown>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.floor-body {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-6);
}

.theme-section {
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-5);
}

.theme-section--dark {
  background: #1f2127;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
}

.theme-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.group-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-4);
  align-items: center;
}

.icon-rotate {
  transform: rotate(180deg);
  transition: transform var(--o-duration-m2) var(--o-easing-standard-out);
}
</style>
