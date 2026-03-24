<script setup lang="ts">
// 设计稿 ID：5:4374（Pixso item-id，页签）
import { ref } from 'vue'
import { OTab, OTabPane, OIconFilter } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// Text variant states
const activeTextLarge = ref('tab1')
const activeTextMedium = ref('tab1')
const activeTextSmall = ref('tab1')

// Solid variant states
const activeSolidLarge = ref('tab1')
const activeSolidMedium = ref('tab1')
const activeSolidSmall = ref('tab1')

// Button variant states
const activeButtonLarge = ref('tab1')
const activeButtonMedium = ref('tab1')
const activeButtonSmall = ref('tab1')

// Custom nav (with icon)
const activeCustomNav = ref('tab1')

// Left aligned
const activeLeftAlign = ref('tab1')
</script>

<template>
  <AppSection
    title="OTab 页签"
    subtitle="设计稿 ID：5:4374 · 覆盖 text/solid/button × L/M/S × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="tab-row-light">
        <div class="theme-label">Light</div>

        <!-- Text variant -->
        <div class="tab-group">
          <div class="group-label">Text 变体（底部指示线）</div>
          <div class="tab-row">
            <div class="tab-card">
              <div class="card-label">Large</div>
              <OTab
                v-model="activeTextLarge"
                variant="text"
                size="large"
                data-testid="tab-text-large-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Medium</div>
              <OTab
                v-model="activeTextMedium"
                variant="text"
                size="medium"
                data-testid="tab-text-medium-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Small</div>
              <OTab
                v-model="activeTextSmall"
                variant="text"
                size="small"
                data-testid="tab-text-small-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>
          </div>
        </div>

        <!-- Solid variant -->
        <div class="tab-group">
          <div class="group-label">Solid 变体（背景填充）</div>
          <div class="tab-row">
            <div class="tab-card">
              <div class="card-label">Large</div>
              <OTab
                v-model="activeSolidLarge"
                variant="solid"
                size="large"
                data-testid="tab-solid-large-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Medium</div>
              <OTab
                v-model="activeSolidMedium"
                variant="solid"
                size="medium"
                data-testid="tab-solid-medium-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Small</div>
              <OTab
                v-model="activeSolidSmall"
                variant="solid"
                size="small"
                data-testid="tab-solid-small-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>
          </div>
        </div>

        <!-- Button variant -->
        <div class="tab-group">
          <div class="group-label">Button 变体（圆角按钮）</div>
          <div class="tab-row">
            <div class="tab-card">
              <div class="card-label">Large · pill</div>
              <OTab
                v-model="activeButtonLarge"
                variant="button"
                round="pill"
                size="large"
                data-testid="tab-button-large-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Medium · pill</div>
              <OTab
                v-model="activeButtonMedium"
                variant="button"
                round="pill"
                size="medium"
                data-testid="tab-button-medium-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Small · pill</div>
              <OTab
                v-model="activeButtonSmall"
                variant="button"
                round="pill"
                size="small"
                data-testid="tab-button-small-light"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>
          </div>
        </div>

        <!-- Custom nav with icon -->
        <div class="tab-group">
          <div class="group-label">自定义导航（图标 + 文字）</div>
          <div class="tab-card">
            <OTab
              v-model="activeCustomNav"
              variant="text"
              size="medium"
              data-testid="tab-custom-nav-light"
            >
              <OTabPane value="tab1">
                <template #nav><OIconFilter /> 标签一</template>
                <div class="pane-content">标签一的内容</div>
              </OTabPane>
              <OTabPane value="tab2">
                <template #nav><OIconFilter /> 标签二</template>
                <div class="pane-content">标签二的内容</div>
              </OTabPane>
              <OTabPane value="tab3">
                <template #nav><OIconFilter /> 标签三</template>
                <div class="pane-content">标签三的内容</div>
              </OTabPane>
            </OTab>
          </div>
        </div>

        <!-- Left aligned -->
        <div class="tab-group">
          <div class="group-label">导航栏左对齐</div>
          <div class="tab-card">
            <OTab
              v-model="activeLeftAlign"
              variant="text"
              size="medium"
              class="tab-align-left"
              data-testid="tab-align-left-light"
            >
              <OTabPane value="tab1" label="标签一">
                <div class="pane-content">标签一的内容</div>
              </OTabPane>
              <OTabPane value="tab2" label="标签二">
                <div class="pane-content">标签二的内容</div>
              </OTabPane>
              <OTabPane value="tab3" label="标签三">
                <div class="pane-content">标签三的内容</div>
              </OTabPane>
            </OTab>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="tab-row-dark"
      >
        <div class="theme-label">Dark</div>

        <!-- Text variant Dark -->
        <div class="tab-group">
          <div class="group-label">Text 变体</div>
          <div class="tab-row">
            <div class="tab-card">
              <div class="card-label">Large</div>
              <OTab
                v-model="activeTextLarge"
                variant="text"
                size="large"
                data-testid="tab-text-large-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Medium</div>
              <OTab
                v-model="activeTextMedium"
                variant="text"
                size="medium"
                data-testid="tab-text-medium-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Small</div>
              <OTab
                v-model="activeTextSmall"
                variant="text"
                size="small"
                data-testid="tab-text-small-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>
          </div>
        </div>

        <!-- Solid variant Dark -->
        <div class="tab-group">
          <div class="group-label">Solid 变体</div>
          <div class="tab-row">
            <div class="tab-card">
              <div class="card-label">Large</div>
              <OTab
                v-model="activeSolidLarge"
                variant="solid"
                size="large"
                data-testid="tab-solid-large-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Medium</div>
              <OTab
                v-model="activeSolidMedium"
                variant="solid"
                size="medium"
                data-testid="tab-solid-medium-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Small</div>
              <OTab
                v-model="activeSolidSmall"
                variant="solid"
                size="small"
                data-testid="tab-solid-small-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>
          </div>
        </div>

        <!-- Button variant Dark -->
        <div class="tab-group">
          <div class="group-label">Button 变体</div>
          <div class="tab-row">
            <div class="tab-card">
              <div class="card-label">Large · pill</div>
              <OTab
                v-model="activeButtonLarge"
                variant="button"
                round="pill"
                size="large"
                data-testid="tab-button-large-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Medium · pill</div>
              <OTab
                v-model="activeButtonMedium"
                variant="button"
                round="pill"
                size="medium"
                data-testid="tab-button-medium-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>

            <div class="tab-card">
              <div class="card-label">Small · pill</div>
              <OTab
                v-model="activeButtonSmall"
                variant="button"
                round="pill"
                size="small"
                data-testid="tab-button-small-dark"
              >
                <OTabPane value="tab1" label="标签一">
                  <div class="pane-content">标签一的内容</div>
                </OTabPane>
                <OTabPane value="tab2" label="标签二">
                  <div class="pane-content">标签二的内容</div>
                </OTabPane>
                <OTabPane value="tab3" label="标签三">
                  <div class="pane-content">标签三的内容</div>
                </OTabPane>
              </OTab>
            </div>
          </div>
        </div>

        <!-- Custom nav with icon Dark -->
        <div class="tab-group">
          <div class="group-label">自定义导航</div>
          <div class="tab-card">
            <OTab
              v-model="activeCustomNav"
              variant="text"
              size="medium"
              data-testid="tab-custom-nav-dark"
            >
              <OTabPane value="tab1">
                <template #nav><OIconFilter /> 标签一</template>
                <div class="pane-content">标签一的内容</div>
              </OTabPane>
              <OTabPane value="tab2">
                <template #nav><OIconFilter /> 标签二</template>
                <div class="pane-content">标签二的内容</div>
              </OTabPane>
              <OTabPane value="tab3">
                <template #nav><OIconFilter /> 标签三</template>
                <div class="pane-content">标签三的内容</div>
              </OTabPane>
            </OTab>
          </div>
        </div>

        <!-- Left aligned Dark -->
        <div class="tab-group">
          <div class="group-label">导航栏左对齐</div>
          <div class="tab-card">
            <OTab
              v-model="activeLeftAlign"
              variant="text"
              size="medium"
              class="tab-align-left"
              data-testid="tab-align-left-dark"
            >
              <OTabPane value="tab1" label="标签一">
                <div class="pane-content">标签一的内容</div>
              </OTabPane>
              <OTabPane value="tab2" label="标签二">
                <div class="pane-content">标签二的内容</div>
              </OTabPane>
              <OTabPane value="tab3" label="标签三">
                <div class="pane-content">标签三的内容</div>
              </OTabPane>
            </OTab>
          </div>
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

// ---- 主题区块 ----
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

// ---- 分组 ----
.tab-group {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.group-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 行布局 ----
.tab-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

// ---- 卡片 ----
.tab-card {
  flex: 1;
  min-width: 0;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.card-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 面板内容 ----
.pane-content {
  @include text1;
  color: var(--o-color-info2);
  padding: var(--o-r-gap-4) 0;
}

// ---- 左对齐 ----
.tab-align-left {
  --tab-nav-justify: flex-start;
}
</style>
