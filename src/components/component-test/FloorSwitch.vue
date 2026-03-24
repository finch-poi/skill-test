<script setup lang="ts">
// 设计稿 ID：3951:22783, 3951:21028, 15:2369（Pixso item-id，开关）
import { ref } from 'vue'
import { OSwitch } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- 基础开关（15:2369）：Unselected/Selected × Light/Dark ----
const basicLightOff = ref(false)
const basicLightOn = ref(true)
const basicDarkOff = ref(false)
const basicDarkOn = ref(true)

// ---- 文字开关（3951:21028）：带 开/关 文字标签 ----
const textLightSelected = ref(true)
const textLightUnselected = ref(false)
const textDarkSelected = ref(true)
const textDarkUnselected = ref(false)

// ---- 主题开关（3951:22783）：带图标（月亮/太阳）----
const themeLightOn = ref(true)
const themeLightOff = ref(false)
const themeDarkOn = ref(true)
const themeDarkOff = ref(false)
</script>

<template>
  <AppSection
    title="OSwitch 开关"
    subtitle="设计稿 ID：15:2369, 3951:21028, 3951:22783 · 基础/文字/主题开关 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="switch-row-light">
        <div class="theme-label">Light</div>
        <div class="switch-row">

          <!-- Column A：基础开关（15:2369）-->
          <div class="switch-col">
            <div class="switch-card">
              <div class="switch-card-label">基础开关</div>
              <div class="switch-group" data-testid="switch-basic-light">
                <div class="switch-item">
                  <OSwitch v-model="basicLightOff" round="pill" />
                  <span class="switch-state-label">Off</span>
                </div>
                <div class="switch-item">
                  <OSwitch v-model="basicLightOn" round="pill" />
                  <span class="switch-state-label">On</span>
                </div>
                <div class="switch-item">
                  <OSwitch :model-value="false" round="pill" disabled />
                  <span class="switch-state-label">Disabled Off</span>
                </div>
                <div class="switch-item">
                  <OSwitch :model-value="true" round="pill" disabled />
                  <span class="switch-state-label">Disabled On</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Column B：文字开关（3951:21028）-->
          <div class="switch-col">
            <div class="switch-card">
              <div class="switch-card-label">文字开关</div>
              <div class="switch-group" data-testid="switch-text-light">
                <div class="switch-item">
                  <OSwitch v-model="textLightSelected" round="pill">
                    <template #on>开</template>
                    <template #off>关</template>
                  </OSwitch>
                  <span class="switch-state-label">Selected</span>
                </div>
                <div class="switch-item">
                  <OSwitch v-model="textLightUnselected" round="pill">
                    <template #on>开</template>
                    <template #off>关</template>
                  </OSwitch>
                  <span class="switch-state-label">Unselected</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Column C：主题开关（3951:22783）-->
          <div class="switch-col">
            <div class="switch-card">
              <div class="switch-card-label">主题开关</div>
              <div class="switch-group" data-testid="switch-theme-light">
                <div class="switch-item">
                  <OSwitch v-model="themeLightOff" round="pill">
                    <template #active>🌙</template>
                    <template #inactive>☀️</template>
                  </OSwitch>
                  <span class="switch-state-label">Light mode (off)</span>
                </div>
                <div class="switch-item">
                  <OSwitch v-model="themeLightOn" round="pill">
                    <template #active>🌙</template>
                    <template #inactive>☀️</template>
                  </OSwitch>
                  <span class="switch-state-label">Dark mode (on)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="switch-row-dark">
        <div class="theme-label">Dark</div>
        <div class="switch-row">

          <!-- Dark Column A：基础开关 -->
          <div class="switch-col">
            <div class="switch-card">
              <div class="switch-card-label">基础开关</div>
              <div class="switch-group" data-testid="switch-basic-dark">
                <div class="switch-item">
                  <OSwitch v-model="basicDarkOff" round="pill" />
                  <span class="switch-state-label">Off</span>
                </div>
                <div class="switch-item">
                  <OSwitch v-model="basicDarkOn" round="pill" />
                  <span class="switch-state-label">On</span>
                </div>
                <div class="switch-item">
                  <OSwitch :model-value="false" round="pill" disabled />
                  <span class="switch-state-label">Disabled Off</span>
                </div>
                <div class="switch-item">
                  <OSwitch :model-value="true" round="pill" disabled />
                  <span class="switch-state-label">Disabled On</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Dark Column B：文字开关 -->
          <div class="switch-col">
            <div class="switch-card">
              <div class="switch-card-label">文字开关</div>
              <div class="switch-group" data-testid="switch-text-dark">
                <div class="switch-item">
                  <OSwitch v-model="textDarkSelected" round="pill">
                    <template #on>开</template>
                    <template #off>关</template>
                  </OSwitch>
                  <span class="switch-state-label">Selected</span>
                </div>
                <div class="switch-item">
                  <OSwitch v-model="textDarkUnselected" round="pill">
                    <template #on>开</template>
                    <template #off>关</template>
                  </OSwitch>
                  <span class="switch-state-label">Unselected</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Dark Column C：主题开关 -->
          <div class="switch-col">
            <div class="switch-card">
              <div class="switch-card-label">主题开关</div>
              <div class="switch-group" data-testid="switch-theme-dark">
                <div class="switch-item">
                  <OSwitch v-model="themeDarkOff" round="pill">
                    <template #active>🌙</template>
                    <template #inactive>☀️</template>
                  </OSwitch>
                  <span class="switch-state-label">Light mode (off)</span>
                </div>
                <div class="switch-item">
                  <OSwitch v-model="themeDarkOn" round="pill">
                    <template #active>🌙</template>
                    <template #inactive>☀️</template>
                  </OSwitch>
                  <span class="switch-state-label">Dark mode (on)</span>
                </div>
              </div>
            </div>
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

// ---- 列布局 ----
.switch-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.switch-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

// ---- Demo 卡片 ----
.switch-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.switch-card-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 开关条目 ----
.switch-group {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.switch-item {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-3);
}

.switch-state-label {
  @include tip1;
  color: var(--o-color-info3);
}
</style>
