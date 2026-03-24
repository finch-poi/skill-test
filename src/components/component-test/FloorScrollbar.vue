<script setup lang="ts">
// 设计稿 ID：29:5181, 15:2373（Pixso item-id，滚动条）
import { OScroller } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OScroller / OScrollbar 滚动条"
    subtitle="设计稿 ID：29:5181（竖向）· 15:2373（横向）· 覆盖 L/M size × Light/Dark"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="scrollbar-row-light">
        <div class="theme-label">Light</div>

        <div class="demo-row">
          <!-- 竖向 L size (medium) -->
          <div class="demo-card">
            <div class="demo-card-label">竖向 · L size (medium)</div>
            <OScroller
              class="scroller-demo scroller-demo--vertical"
              show-type="always"
              :disabled-x="true"
              data-testid="scroller-vertical-l-light"
            >
              <div class="scroll-content scroll-content--tall">
                <p v-for="i in 20" :key="i">第 {{ i }} 行内容——这是一段用于演示垂直滚动条的文字</p>
              </div>
            </OScroller>
          </div>

          <!-- 竖向 M size (small) -->
          <div class="demo-card">
            <div class="demo-card-label">竖向 · M size (small)</div>
            <OScroller
              class="scroller-demo scroller-demo--vertical"
              size="small"
              show-type="always"
              :disabled-x="true"
              data-testid="scroller-vertical-m-light"
            >
              <div class="scroll-content scroll-content--tall">
                <p v-for="i in 20" :key="i">第 {{ i }} 行内容——这是一段用于演示垂直滚动条的文字</p>
              </div>
            </OScroller>
          </div>

          <!-- 横向 L size (medium) -->
          <div class="demo-card">
            <div class="demo-card-label">横向 · L size (medium)</div>
            <OScroller
              class="scroller-demo scroller-demo--horizontal"
              show-type="always"
              :disabled-y="true"
              data-testid="scroller-horizontal-l-light"
            >
              <div class="scroll-content scroll-content--wide">
                <span v-for="i in 30" :key="i" class="scroll-item">项目 {{ i }}</span>
              </div>
            </OScroller>
          </div>

          <!-- 横向 M size (small) -->
          <div class="demo-card">
            <div class="demo-card-label">横向 · M size (small)</div>
            <OScroller
              class="scroller-demo scroller-demo--horizontal"
              size="small"
              show-type="always"
              :disabled-y="true"
              data-testid="scroller-horizontal-m-light"
            >
              <div class="scroll-content scroll-content--wide">
                <span v-for="i in 30" :key="i" class="scroll-item">项目 {{ i }}</span>
              </div>
            </OScroller>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="scrollbar-row-dark">
        <div class="theme-label">Dark</div>

        <div class="demo-row">
          <!-- 竖向 L size (medium) dark -->
          <div class="demo-card">
            <div class="demo-card-label">竖向 · L size (medium)</div>
            <OScroller
              class="scroller-demo scroller-demo--vertical"
              show-type="always"
              :disabled-x="true"
              data-testid="scroller-vertical-l-dark"
            >
              <div class="scroll-content scroll-content--tall">
                <p v-for="i in 20" :key="i">第 {{ i }} 行内容——这是一段用于演示垂直滚动条的文字</p>
              </div>
            </OScroller>
          </div>

          <!-- 竖向 M size (small) dark -->
          <div class="demo-card">
            <div class="demo-card-label">竖向 · M size (small)</div>
            <OScroller
              class="scroller-demo scroller-demo--vertical"
              size="small"
              show-type="always"
              :disabled-x="true"
              data-testid="scroller-vertical-m-dark"
            >
              <div class="scroll-content scroll-content--tall">
                <p v-for="i in 20" :key="i">第 {{ i }} 行内容——这是一段用于演示垂直滚动条的文字</p>
              </div>
            </OScroller>
          </div>

          <!-- 横向 L size (medium) dark -->
          <div class="demo-card">
            <div class="demo-card-label">横向 · L size (medium)</div>
            <OScroller
              class="scroller-demo scroller-demo--horizontal"
              show-type="always"
              :disabled-y="true"
              data-testid="scroller-horizontal-l-dark"
            >
              <div class="scroll-content scroll-content--wide">
                <span v-for="i in 30" :key="i" class="scroll-item">项目 {{ i }}</span>
              </div>
            </OScroller>
          </div>

          <!-- 横向 M size (small) dark -->
          <div class="demo-card">
            <div class="demo-card-label">横向 · M size (small)</div>
            <OScroller
              class="scroller-demo scroller-demo--horizontal"
              size="small"
              show-type="always"
              :disabled-y="true"
              data-testid="scroller-horizontal-m-dark"
            >
              <div class="scroll-content scroll-content--wide">
                <span v-for="i in 30" :key="i" class="scroll-item">项目 {{ i }}</span>
              </div>
            </OScroller>
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

// ---- Demo 行 ----
.demo-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;
  flex-wrap: wrap;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

// ---- Demo 卡片 ----
.demo-card {
  flex: 1;
  min-width: 200px;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.demo-card-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- OScroller 演示区 ----
.scroller-demo {
  border-radius: var(--o-radius-m);
  background: var(--o-color-fill1);
}

.scroller-demo--vertical {
  height: 200px;
}

.scroller-demo--horizontal {
  height: 60px;
}

// ---- 滚动内容 ----
.scroll-content {
  color: var(--o-color-info2);
}

.scroll-content--tall {
  @include text2;
  padding: var(--o-r-gap-3) var(--o-r-gap-4);

  p {
    margin: 0;
    padding: var(--o-r-gap-2) 0;
    white-space: nowrap;
    border-bottom: 1px solid var(--o-color-fill3);

    &:last-child {
      border-bottom: none;
    }
  }
}

.scroll-content--wide {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-4);
  padding: var(--o-r-gap-3) var(--o-r-gap-4);
  white-space: nowrap;
}

.scroll-item {
  @include text2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  padding: var(--o-r-gap-2) var(--o-r-gap-3);
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  color: var(--o-color-info2);
  white-space: nowrap;
  flex-shrink: 0;
}
</style>
