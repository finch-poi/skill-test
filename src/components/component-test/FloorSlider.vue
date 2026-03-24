<script setup lang="ts">
// 设计稿 ID：253:5708, 253:5560（Pixso item-id，滑动条）
import { ref } from 'vue'
import { OSlider } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- 连续滑动条 values ----
const continuousDefault = ref(0)
const continuousSelected = ref(42)

// ---- 带输入框 ----
const continuousInput = ref(30)

// ---- 范围滑动条 ----
const rangeValue = ref<[number, number]>([20, 60])

// ---- 间续（showStops）滑动条 ----
const stopsDefault = ref(0)
const stopsSelected = ref(4)

// ---- 带 marks 的间续滑动条 ----
const marksValue = ref(4)
const sliderMarks: Record<number, string> = {
  0: '0', 1: '1', 2: '2', 3: '3', 4: '4',
  5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10',
}

// ---- 禁用 ----
const disabledValue = ref(30)
const disabledStops = ref(4)
</script>

<template>
  <AppSection
    title="OSlider 滑动条"
    subtitle="设计稿 ID：253:5708, 253:5560 · 覆盖连续/间续/范围/禁用 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="slider-row-light">
        <div class="theme-label">Light</div>

        <!-- Row 1: 连续滑动条 -->
        <div class="slider-group">
          <div class="group-label">连续滑动条（Continuous）</div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">默认（value=0）</div>
              <OSlider
                v-model="continuousDefault"
                data-testid="slider-continuous-default"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">已选中（value=42）</div>
              <OSlider
                v-model="continuousSelected"
                data-testid="slider-continuous-selected"
              />
            </div>
          </div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">带输入框和单位</div>
              <OSlider
                v-model="continuousInput"
                show-input
                unit="M"
                data-testid="slider-with-input"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">范围选择（range）</div>
              <OSlider
                v-model="rangeValue"
                range
                data-testid="slider-range"
              />
            </div>
          </div>
        </div>

        <!-- Row 2: 间续滑动条（showStops） -->
        <div class="slider-group">
          <div class="group-label">间续滑动条（showStops）</div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">未选中（value=0）</div>
              <OSlider
                v-model="stopsDefault"
                show-stops
                :step="10"
                data-testid="slider-stops-default"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">已选中（value=4/10）</div>
              <OSlider
                v-model="stopsSelected"
                show-stops
                :step="1"
                :max="10"
                data-testid="slider-stops-selected"
              />
            </div>
          </div>
          <div class="slider-row">
            <div class="slider-item slider-item--wide">
              <div class="item-label">带标记（marks）</div>
              <OSlider
                v-model="marksValue"
                show-stops
                :step="1"
                :max="10"
                :marks="sliderMarks"
                data-testid="slider-marks"
              />
            </div>
          </div>
        </div>

        <!-- Row 3: 禁用 -->
        <div class="slider-group">
          <div class="group-label">禁用状态（disabled）</div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">连续禁用</div>
              <OSlider
                v-model="disabledValue"
                disabled
                data-testid="slider-disabled"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">间续禁用</div>
              <OSlider
                v-model="disabledStops"
                show-stops
                :step="1"
                :max="10"
                disabled
                data-testid="slider-stops-disabled"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="slider-row-dark">
        <div class="theme-label">Dark</div>

        <!-- Row 1: 连续滑动条 -->
        <div class="slider-group">
          <div class="group-label">连续滑动条（Continuous）</div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">默认（value=0）</div>
              <OSlider
                v-model="continuousDefault"
                data-testid="slider-continuous-default-dark"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">已选中（value=42）</div>
              <OSlider
                v-model="continuousSelected"
                data-testid="slider-continuous-selected-dark"
              />
            </div>
          </div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">带输入框和单位</div>
              <OSlider
                v-model="continuousInput"
                show-input
                unit="M"
                data-testid="slider-with-input-dark"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">范围选择（range）</div>
              <OSlider
                v-model="rangeValue"
                range
                data-testid="slider-range-dark"
              />
            </div>
          </div>
        </div>

        <!-- Row 2: 间续滑动条（showStops） -->
        <div class="slider-group">
          <div class="group-label">间续滑动条（showStops）</div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">未选中（value=0）</div>
              <OSlider
                v-model="stopsDefault"
                show-stops
                :step="10"
                data-testid="slider-stops-default-dark"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">已选中（value=4/10）</div>
              <OSlider
                v-model="stopsSelected"
                show-stops
                :step="1"
                :max="10"
                data-testid="slider-stops-selected-dark"
              />
            </div>
          </div>
          <div class="slider-row">
            <div class="slider-item slider-item--wide">
              <div class="item-label">带标记（marks）</div>
              <OSlider
                v-model="marksValue"
                show-stops
                :step="1"
                :max="10"
                :marks="sliderMarks"
                data-testid="slider-marks-dark"
              />
            </div>
          </div>
        </div>

        <!-- Row 3: 禁用 -->
        <div class="slider-group">
          <div class="group-label">禁用状态（disabled）</div>
          <div class="slider-row">
            <div class="slider-item">
              <div class="item-label">连续禁用</div>
              <OSlider
                v-model="disabledValue"
                disabled
                data-testid="slider-disabled-dark"
              />
            </div>
            <div class="slider-item">
              <div class="item-label">间续禁用</div>
              <OSlider
                v-model="disabledStops"
                show-stops
                :step="1"
                :max="10"
                disabled
                data-testid="slider-stops-disabled-dark"
              />
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

// ---- 分组 ----
.slider-group {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  padding: var(--o-r-gap-5);
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  box-shadow: var(--o-shadow-1);
}

.group-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 滑动条行 ----
.slider-row {
  display: flex;
  gap: var(--o-r-gap-6);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

// ---- 单项 ----
.slider-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
  min-width: 0;

  &--wide {
    flex: 2;
  }
}

.item-label {
  @include tip2;
  color: var(--o-color-info3);
}
</style>
