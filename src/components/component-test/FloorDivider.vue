<script setup lang="ts">
// 设计稿 ID：16:4214（Pixso item-id，分割线）
import { ODivider } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="ODivider 分割线"
    subtitle="设计稿 ID：16:4214 · 覆盖 水平/垂直 × 实线/虚线/点线 × 带标签 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="divider-row-light">
        <div class="theme-label">Light</div>

        <!-- 水平分割线变体 -->
        <div class="demo-block">
          <div class="demo-block-label">水平分割线（Horizontal）</div>

          <div class="demo-item">
            <span class="demo-item-title">实线 solid（默认）</span>
            <div class="content-text">上方内容区域</div>
            <ODivider data-testid="divider-h-solid" />
            <div class="content-text">下方内容区域</div>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">虚线 dashed</span>
            <div class="content-text">上方内容区域</div>
            <ODivider variant="dashed" data-testid="divider-h-dashed" />
            <div class="content-text">下方内容区域</div>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">点线 dotted</span>
            <div class="content-text">上方内容区域</div>
            <ODivider variant="dotted" data-testid="divider-h-dotted" />
            <div class="content-text">下方内容区域</div>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">深色 darker</span>
            <div class="content-text">上方内容区域</div>
            <ODivider darker data-testid="divider-h-darker" />
            <div class="content-text">下方内容区域</div>
          </div>
        </div>

        <!-- 带标签的水平分割线 -->
        <div class="demo-block">
          <div class="demo-block-label">带标签分割线（Label）</div>

          <div class="demo-item">
            <span class="demo-item-title">标签居中（center，默认）</span>
            <ODivider data-testid="divider-label-center">文字标签</ODivider>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">标签靠左（left）</span>
            <ODivider label-position="left" data-testid="divider-label-left">开始</ODivider>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">标签靠右（right）</span>
            <ODivider label-position="right" data-testid="divider-label-right">结束</ODivider>
          </div>
        </div>

        <!-- 垂直分割线 -->
        <div class="demo-block">
          <div class="demo-block-label">垂直分割线（Vertical）</div>

          <div class="demo-item">
            <span class="demo-item-title">行内垂直分割</span>
            <div class="inline-row" data-testid="divider-v-row">
              <span class="inline-text">项目 A</span>
              <ODivider direction="v" data-testid="divider-v-solid" />
              <span class="inline-text">项目 B</span>
              <ODivider direction="v" variant="dashed" data-testid="divider-v-dashed" />
              <span class="inline-text">项目 C</span>
              <ODivider direction="v" variant="dotted" data-testid="divider-v-dotted" />
              <span class="inline-text">项目 D</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="divider-row-dark">
        <div class="theme-label">Dark</div>

        <!-- 水平分割线变体 -->
        <div class="demo-block">
          <div class="demo-block-label">水平分割线（Horizontal）</div>

          <div class="demo-item">
            <span class="demo-item-title">实线 solid（默认）</span>
            <div class="content-text">上方内容区域</div>
            <ODivider data-testid="divider-h-solid-dark" />
            <div class="content-text">下方内容区域</div>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">虚线 dashed</span>
            <div class="content-text">上方内容区域</div>
            <ODivider variant="dashed" data-testid="divider-h-dashed-dark" />
            <div class="content-text">下方内容区域</div>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">深色 darker</span>
            <div class="content-text">上方内容区域</div>
            <ODivider darker data-testid="divider-h-darker-dark" />
            <div class="content-text">下方内容区域</div>
          </div>
        </div>

        <!-- 带标签的水平分割线 -->
        <div class="demo-block">
          <div class="demo-block-label">带标签分割线（Label）</div>

          <div class="demo-item">
            <span class="demo-item-title">标签居中（center，默认）</span>
            <ODivider data-testid="divider-label-center-dark">文字标签</ODivider>
          </div>

          <div class="demo-item">
            <span class="demo-item-title">标签靠左（left）</span>
            <ODivider label-position="left" data-testid="divider-label-left-dark">开始</ODivider>
          </div>
        </div>

        <!-- 垂直分割线 -->
        <div class="demo-block">
          <div class="demo-block-label">垂直分割线（Vertical）</div>

          <div class="demo-item">
            <span class="demo-item-title">行内垂直分割</span>
            <div class="inline-row" data-testid="divider-v-row-dark">
              <span class="inline-text">项目 A</span>
              <ODivider direction="v" data-testid="divider-v-solid-dark" />
              <span class="inline-text">项目 B</span>
              <ODivider direction="v" variant="dashed" data-testid="divider-v-dashed-dark" />
              <span class="inline-text">项目 C</span>
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

// ---- Demo 区块 ----
.demo-block {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.demo-block-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  margin-bottom: var(--o-r-gap-2);
}

// ---- Demo 条目 ----
.demo-item {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-2);
  padding: var(--o-r-gap-3) 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--o-color-control4);
  }
}

.demo-item-title {
  @include tip1;
  color: var(--o-color-info3);
}

.content-text {
  @include text1;
  color: var(--o-color-info2);
  padding: var(--o-r-gap-2) 0;
}

// ---- 垂直分割线行内布局 ----
.inline-row {
  display: flex;
  align-items: center;
}

.inline-text {
  @include text1;
  color: var(--o-color-info1);
}
</style>
