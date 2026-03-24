<script setup lang="ts">
// 设计稿 ID：95:2513, 5:7968（Pixso item-id，锚点）
import { OAnchor, OAnchorItem } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OAnchor 锚点"
    subtitle="设计稿 ID：95:2513（水平锚点）· 5:7968（垂直锚点）"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <!-- ===== 水平锚点（95:2513） ===== -->
      <div class="group-title">水平锚点（layout="h"）</div>

      <!-- 亮色主题 水平 -->
      <div class="theme-section" data-testid="anchor-row-light">
        <div class="theme-label">Light · 水平锚点</div>
        <div class="anchor-scroll-wrap" id="anchor-h-light-wrap">
          <OAnchor
            layout="h"
            container="#anchor-h-light-wrap"
            :change-hash="false"
            data-testid="anchor-h-light"
          >
            <OAnchorItem href="#h-section-1" title="一级锚点" />
            <OAnchorItem href="#h-section-2" title="一级锚点 (选中)" />
            <OAnchorItem href="#h-section-3" title="一级锚点" />
          </OAnchor>
          <div class="h-content">
            <div id="h-section-1" class="h-target">区块一</div>
            <div id="h-section-2" class="h-target h-target--selected">区块二</div>
            <div id="h-section-3" class="h-target">区块三</div>
          </div>
        </div>
      </div>

      <!-- 暗色主题 水平 -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="anchor-row-dark"
      >
        <div class="theme-label">Dark · 水平锚点</div>
        <div class="anchor-scroll-wrap" id="anchor-h-dark-wrap">
          <OAnchor
            layout="h"
            container="#anchor-h-dark-wrap"
            :change-hash="false"
            data-testid="anchor-h-dark"
          >
            <OAnchorItem href="#hd-section-1" title="一级锚点" />
            <OAnchorItem href="#hd-section-2" title="一级锚点 (选中)" />
            <OAnchorItem href="#hd-section-3" title="一级锚点" />
          </OAnchor>
          <div class="h-content">
            <div id="hd-section-1" class="h-target">区块一</div>
            <div id="hd-section-2" class="h-target h-target--selected">区块二</div>
            <div id="hd-section-3" class="h-target">区块三</div>
          </div>
        </div>
      </div>

      <!-- ===== 垂直锚点（5:7968） ===== -->
      <div class="group-title">垂直锚点（layout="v"）</div>

      <!-- 亮色主题 垂直 - 4 columns -->
      <div class="theme-section theme-section--v" data-testid="anchor-v-light">
        <div class="theme-label">Light · 垂直锚点各变体</div>
        <div class="anchor-v-row">
          <!-- Column 1: M/level1 - 仅一级，medium size -->
          <div class="anchor-col">
            <div class="anchor-card">
              <div class="anchor-label">Medium · Level1</div>
              <div class="v-scroll-wrap" id="v-m-l1-wrap">
                <OAnchor
                  layout="v"
                  size="medium"
                  container="#v-m-l1-wrap"
                  :change-hash="false"
                  data-testid="anchor-v-m-level1"
                >
                  <OAnchorItem href="#v-m-l1-s1" title="一级锚点" />
                  <OAnchorItem href="#v-m-l1-s2" title="一级锚点" />
                  <OAnchorItem href="#v-m-l1-s3" title="一级锚点 (选中)" />
                  <OAnchorItem href="#v-m-l1-s4" title="一级锚点" />
                  <OAnchorItem href="#v-m-l1-s5" title="一级锚点" />
                </OAnchor>
                <div class="v-content">
                  <div id="v-m-l1-s1" class="v-target">一级锚点区块</div>
                  <div id="v-m-l1-s2" class="v-target">一级锚点区块</div>
                  <div id="v-m-l1-s3" class="v-target">一级锚点区块</div>
                  <div id="v-m-l1-s4" class="v-target">一级锚点区块</div>
                  <div id="v-m-l1-s5" class="v-target">一级锚点区块</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2: M/level2 - 含二级子项，medium size -->
          <div class="anchor-col">
            <div class="anchor-card">
              <div class="anchor-label">Medium · Level1 + Level2</div>
              <div class="v-scroll-wrap" id="v-m-l2-wrap">
                <OAnchor
                  layout="v"
                  size="medium"
                  container="#v-m-l2-wrap"
                  :change-hash="false"
                  data-testid="anchor-v-m-level2"
                >
                  <OAnchorItem href="#v-m-l2-s1" title="二级锚点" />
                  <OAnchorItem href="#v-m-l2-s2" title="二级锚点 (选中)" />
                  <OAnchorItem href="#v-m-l2-s3" title="一级锚点">
                    <OAnchorItem href="#v-m-l2-s3-1" title="二级锚点" />
                    <OAnchorItem href="#v-m-l2-s3-2" title="二级锚点" />
                    <OAnchorItem href="#v-m-l2-s3-3" title="二级锚点" />
                  </OAnchorItem>
                  <OAnchorItem href="#v-m-l2-s4" title="一级锚点 (选中)" />
                  <OAnchorItem href="#v-m-l2-s5" title="一级锚点" />
                </OAnchor>
                <div class="v-content">
                  <div id="v-m-l2-s1" class="v-target">二级锚点区块 1</div>
                  <div id="v-m-l2-s2" class="v-target">二级锚点区块 2</div>
                  <div id="v-m-l2-s3" class="v-target">一级锚点区块 3</div>
                  <div id="v-m-l2-s3-1" class="v-target">子区块 3-1</div>
                  <div id="v-m-l2-s3-2" class="v-target">子区块 3-2</div>
                  <div id="v-m-l2-s3-3" class="v-target">子区块 3-3</div>
                  <div id="v-m-l2-s4" class="v-target">一级锚点区块 4</div>
                  <div id="v-m-l2-s5" class="v-target">一级锚点区块 5</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 3: S/level1 - 仅一级，small size -->
          <div class="anchor-col">
            <div class="anchor-card">
              <div class="anchor-label">Small · Level1</div>
              <div class="v-scroll-wrap" id="v-s-l1-wrap">
                <OAnchor
                  layout="v"
                  size="small"
                  container="#v-s-l1-wrap"
                  :change-hash="false"
                  data-testid="anchor-v-s-level1"
                >
                  <OAnchorItem href="#v-s-l1-s1" title="一级锚点" />
                  <OAnchorItem href="#v-s-l1-s2" title="一级锚点 (选中)" />
                  <OAnchorItem href="#v-s-l1-s3" title="一级锚点" />
                  <OAnchorItem href="#v-s-l1-s4" title="一级锚点" />
                  <OAnchorItem href="#v-s-l1-s5" title="一级锚点" />
                </OAnchor>
                <div class="v-content">
                  <div id="v-s-l1-s1" class="v-target">一级锚点区块</div>
                  <div id="v-s-l1-s2" class="v-target">一级锚点区块</div>
                  <div id="v-s-l1-s3" class="v-target">一级锚点区块</div>
                  <div id="v-s-l1-s4" class="v-target">一级锚点区块</div>
                  <div id="v-s-l1-s5" class="v-target">一级锚点区块</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Column 4: S/level2 - 含二级子项，small size，带选中二级项 -->
          <div class="anchor-col">
            <div class="anchor-card">
              <div class="anchor-label">Small · Level1 + Level2</div>
              <div class="v-scroll-wrap" id="v-s-l2-wrap">
                <OAnchor
                  layout="v"
                  size="small"
                  container="#v-s-l2-wrap"
                  :change-hash="false"
                  data-testid="anchor-v-s-level2"
                >
                  <OAnchorItem href="#v-s-l2-s1" title="二级锚点" />
                  <OAnchorItem href="#v-s-l2-s2" title="一级锚点 (选中)">
                    <OAnchorItem href="#v-s-l2-s2-1" title="二级锚点 (选中)" />
                    <OAnchorItem href="#v-s-l2-s2-2" title="二级锚点" />
                    <OAnchorItem href="#v-s-l2-s2-3" title="二级锚点" />
                    <OAnchorItem href="#v-s-l2-s2-4" title="二级锚点" />
                  </OAnchorItem>
                  <OAnchorItem href="#v-s-l2-s3" title="一级锚点" />
                </OAnchor>
                <div class="v-content">
                  <div id="v-s-l2-s1" class="v-target">二级锚点区块</div>
                  <div id="v-s-l2-s2" class="v-target">一级锚点区块</div>
                  <div id="v-s-l2-s2-1" class="v-target">子区块 2-1</div>
                  <div id="v-s-l2-s2-2" class="v-target">子区块 2-2</div>
                  <div id="v-s-l2-s2-3" class="v-target">子区块 2-3</div>
                  <div id="v-s-l2-s2-4" class="v-target">子区块 2-4</div>
                  <div id="v-s-l2-s3" class="v-target">一级锚点区块</div>
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

.group-title {
  @include h4;
  font-weight: 600;
  color: var(--o-color-info2);
  margin-bottom: calc(-1 * var(--o-r-gap-3));
}

// ---- 主题区块 ----
.theme-section {
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-5);
  background: var(--o-color-fill2);
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

// ---- 水平锚点演示容器 ----
.anchor-scroll-wrap {
  height: 200px;
  overflow-y: auto;
  background: var(--o-color-fill1);
  border-radius: var(--o-radius-m);
  position: relative;
}

.h-content {
  padding: 0 var(--o-r-gap-5);
}

.h-target {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include text1;
  color: var(--o-color-info3);
  border-bottom: 1px solid var(--o-color-fill3);
}

.h-target--selected {
  @include text1;
  font-weight: 600;
  color: var(--o-color-info1);
}

// ---- 垂直锚点区块 ----
.theme-section--v {
  background: var(--o-color-fill2);
}

.anchor-v-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.anchor-col {
  flex: 1;
  min-width: 0;
}

.anchor-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.anchor-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 垂直锚点演示容器 ----
.v-scroll-wrap {
  display: flex;
  gap: var(--o-r-gap-4);
  max-height: 320px;
  overflow-y: auto;
  position: relative;

  :deep(.o-anchor-v) {
    position: sticky;
    top: 0;
    flex-shrink: 0;
  }
}

.v-content {
  flex: 1;
  min-width: 0;
}

.v-target {
  height: 80px;
  display: flex;
  align-items: center;
  padding-left: var(--o-r-gap-3);
  @include tip1;
  color: var(--o-color-info3);
  border-bottom: 1px solid var(--o-color-fill3);
}
</style>
