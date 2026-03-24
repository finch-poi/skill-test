<script setup lang="ts">
// 设计稿 ID：114:3012, 114:3005, 16:4646（Pixso item-id，标签）
import { ref } from 'vue'
import { OTag, OIconInfo } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// Closable tag visibility refs
const closableVisible1 = ref(true)
const closableVisible2 = ref(true)
const closableVisible3 = ref(true)
const closableVisible4 = ref(true)

function resetVisible() {
  closableVisible1.value = true
  closableVisible2.value = true
  closableVisible3.value = true
  closableVisible4.value = true
}
</script>

<template>
  <AppSection
    title="OTag 标签"
    subtitle="设计稿 ID：114:3012 · 114:3005 · 16:4646 · 覆盖状态标签/信息标签/运营标签 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="tag-row-light">
        <div class="theme-label">Light</div>

        <!-- 状态标签 (114:3012) -->
        <div class="group-section">
          <div class="group-label">状态标签 · L / M / S</div>

          <!-- L size -->
          <div class="tag-row-label">大号 (L)</div>
          <div class="tag-row" data-testid="tag-status-light-l">
            <OTag color="success" size="large">已完成</OTag>
            <OTag color="primary" size="large">进行中</OTag>
            <OTag color="danger" size="large">未通过</OTag>
            <OTag color="normal" size="large">已结束</OTag>
            <OTag color="warning" size="large">已购买</OTag>
            <OTag color="primary" size="large">已通过</OTag>
          </div>

          <!-- M size -->
          <div class="tag-row-label">中号 (M)</div>
          <div class="tag-row" data-testid="tag-status-light-m">
            <OTag color="success" size="medium">已完成</OTag>
            <OTag color="primary" size="medium">进行中</OTag>
            <OTag color="danger" size="medium">未通过</OTag>
            <OTag color="normal" size="medium">已结束</OTag>
            <OTag color="warning" size="medium">已购买</OTag>
            <OTag color="primary" size="medium">已通过</OTag>
          </div>

          <!-- S size -->
          <div class="tag-row-label">小号 (S)</div>
          <div class="tag-row" data-testid="tag-status-light-s">
            <OTag color="success" size="small">已完成</OTag>
            <OTag color="primary" size="small">进行中</OTag>
            <OTag color="danger" size="small">未通过</OTag>
            <OTag color="normal" size="small">已结束</OTag>
          </div>
        </div>

        <!-- 信息标签 (114:3005) -->
        <div class="group-section">
          <div class="group-label">信息标签 · 实心/描边/带图标/可关闭</div>

          <div class="tag-row-label">实心 solid（L / M / S）</div>
          <div class="tag-row" data-testid="tag-info-solid-light">
            <OTag color="primary" size="large">标签</OTag>
            <OTag color="primary" size="medium">标签</OTag>
            <OTag color="primary" size="small">标签</OTag>
            <OTag color="success" size="large">标签</OTag>
            <OTag color="danger" size="large">标签</OTag>
            <OTag color="warning" size="large">标签</OTag>
            <OTag color="normal" size="large">标签</OTag>
            <OTag color="primary" size="large">标签</OTag>
          </div>

          <div class="tag-row-label">描边 outline（L / M / S）</div>
          <div class="tag-row" data-testid="tag-info-outline-light">
            <OTag variant="outline" color="primary" size="large">标签</OTag>
            <OTag variant="outline" color="primary" size="medium">标签</OTag>
            <OTag variant="outline" color="primary" size="small">标签</OTag>
            <OTag variant="outline" color="success" size="large">标签</OTag>
            <OTag variant="outline" color="danger" size="large">标签</OTag>
            <OTag variant="outline" color="warning" size="large">标签</OTag>
            <OTag variant="outline" color="normal" size="large">标签</OTag>
          </div>

          <div class="tag-row-label">带图标</div>
          <div class="tag-row" data-testid="tag-info-icon-light">
            <OTag color="primary" size="large">
              <template #icon><OIconInfo /></template>
              标签
            </OTag>
            <OTag color="success" size="large">
              <template #icon><OIconInfo /></template>
              标签
            </OTag>
            <OTag variant="outline" color="primary" size="large">
              <template #icon><OIconInfo /></template>
              标签
            </OTag>
            <OTag variant="outline" color="normal" size="large">
              <template #icon><OIconInfo /></template>
              标签
            </OTag>
          </div>

          <div class="tag-row-label">可关闭 closable
            <button class="reset-btn" @click="resetVisible">重置</button>
          </div>
          <div class="tag-row" data-testid="tag-info-closable-light">
            <OTag
              v-model:visible="closableVisible1"
              closable
              color="primary"
              size="large"
            >可关闭</OTag>
            <OTag
              v-model:visible="closableVisible2"
              closable
              color="success"
              size="large"
            >可关闭</OTag>
            <OTag
              v-model:visible="closableVisible3"
              closable
              variant="outline"
              color="primary"
              size="large"
            >可关闭</OTag>
            <OTag
              v-model:visible="closableVisible4"
              closable
              color="normal"
              size="medium"
            >可关闭</OTag>
          </div>
        </div>

        <!-- 运营标签 (16:4646) -->
        <div class="group-section">
          <div class="group-label">运营标签 · 单色/渐变色/自定颜色 + round="pill"</div>

          <div class="tag-row-label">单色（L / M / S）</div>
          <div class="tag-row" data-testid="tag-op-solid-light">
            <!-- 单色使用 CSS 变量覆盖实现红色品牌色 -->
            <OTag
              size="large"
              round="pill"
              class="tag-op-brand"
            >标签</OTag>
            <OTag
              size="medium"
              round="pill"
              class="tag-op-brand"
            >标签</OTag>
            <OTag
              size="small"
              round="pill"
              class="tag-op-brand"
            >标签</OTag>
          </div>

          <div class="tag-row-label">渐变色（L / M / S）</div>
          <div class="tag-row" data-testid="tag-op-gradient-light">
            <OTag
              size="large"
              round="pill"
              class="tag-op-gradient"
            >标签</OTag>
            <OTag
              size="medium"
              round="pill"
              class="tag-op-gradient"
            >标签</OTag>
            <OTag
              size="small"
              round="pill"
              class="tag-op-gradient"
            >标签</OTag>
          </div>

          <div class="tag-row-label">自定颜色（L / M / S）</div>
          <div class="tag-row" data-testid="tag-op-custom-light">
            <OTag
              size="large"
              round="pill"
              class="tag-op-custom"
            >标签</OTag>
            <OTag
              size="medium"
              round="pill"
              class="tag-op-custom"
            >标签</OTag>
            <OTag
              size="small"
              round="pill"
              class="tag-op-custom"
            >标签</OTag>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="tag-row-dark">
        <div class="theme-label">Dark</div>

        <!-- 状态标签 dark -->
        <div class="group-section">
          <div class="group-label">状态标签 · L / M / S</div>

          <div class="tag-row-label">大号 (L)</div>
          <div class="tag-row" data-testid="tag-status-dark-l">
            <OTag color="success" size="large">已完成</OTag>
            <OTag color="primary" size="large">进行中</OTag>
            <OTag color="danger" size="large">未通过</OTag>
            <OTag color="normal" size="large">已结束</OTag>
            <OTag color="warning" size="large">已购买</OTag>
            <OTag color="primary" size="large">已通过</OTag>
          </div>

          <div class="tag-row-label">中号 (M)</div>
          <div class="tag-row" data-testid="tag-status-dark-m">
            <OTag color="success" size="medium">已完成</OTag>
            <OTag color="primary" size="medium">进行中</OTag>
            <OTag color="danger" size="medium">未通过</OTag>
            <OTag color="normal" size="medium">已结束</OTag>
          </div>

          <div class="tag-row-label">小号 (S)</div>
          <div class="tag-row" data-testid="tag-status-dark-s">
            <OTag color="success" size="small">已完成</OTag>
            <OTag color="primary" size="small">进行中</OTag>
            <OTag color="danger" size="small">未通过</OTag>
            <OTag color="normal" size="small">已结束</OTag>
          </div>
        </div>

        <!-- 信息标签 dark -->
        <div class="group-section">
          <div class="group-label">信息标签 · 实心/描边/带图标</div>

          <div class="tag-row-label">实心 solid</div>
          <div class="tag-row" data-testid="tag-info-solid-dark">
            <OTag color="primary" size="large">标签</OTag>
            <OTag color="primary" size="medium">标签</OTag>
            <OTag color="primary" size="small">标签</OTag>
            <OTag color="success" size="large">标签</OTag>
            <OTag color="danger" size="large">标签</OTag>
            <OTag color="normal" size="large">标签</OTag>
          </div>

          <div class="tag-row-label">描边 outline</div>
          <div class="tag-row" data-testid="tag-info-outline-dark">
            <OTag variant="outline" color="primary" size="large">标签</OTag>
            <OTag variant="outline" color="primary" size="medium">标签</OTag>
            <OTag variant="outline" color="success" size="large">标签</OTag>
            <OTag variant="outline" color="danger" size="large">标签</OTag>
            <OTag variant="outline" color="normal" size="large">标签</OTag>
          </div>

          <div class="tag-row-label">带图标</div>
          <div class="tag-row" data-testid="tag-info-icon-dark">
            <OTag color="primary" size="large">
              <template #icon><OIconInfo /></template>
              标签
            </OTag>
            <OTag variant="outline" color="primary" size="large">
              <template #icon><OIconInfo /></template>
              标签
            </OTag>
          </div>
        </div>

        <!-- 运营标签 dark -->
        <div class="group-section">
          <div class="group-label">运营标签 · 单色/渐变色/自定颜色 + round="pill"</div>

          <div class="tag-row-label">单色</div>
          <div class="tag-row" data-testid="tag-op-solid-dark">
            <OTag size="large" round="pill" class="tag-op-brand">标签</OTag>
            <OTag size="medium" round="pill" class="tag-op-brand">标签</OTag>
            <OTag size="small" round="pill" class="tag-op-brand">标签</OTag>
          </div>

          <div class="tag-row-label">渐变色</div>
          <div class="tag-row" data-testid="tag-op-gradient-dark">
            <OTag size="large" round="pill" class="tag-op-gradient">标签</OTag>
            <OTag size="medium" round="pill" class="tag-op-gradient">标签</OTag>
            <OTag size="small" round="pill" class="tag-op-gradient">标签</OTag>
          </div>

          <div class="tag-row-label">自定颜色（dark 模式透明度更高）</div>
          <div class="tag-row" data-testid="tag-op-custom-dark">
            <OTag size="large" round="pill" class="tag-op-custom-dark">标签</OTag>
            <OTag size="medium" round="pill" class="tag-op-custom-dark">标签</OTag>
            <OTag size="small" round="pill" class="tag-op-custom-dark">标签</OTag>
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

// ---- 分组区块 ----
.group-section {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
  padding: var(--o-r-gap-4);
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
}

.group-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
  margin-bottom: var(--o-r-gap-1);
}

.tag-row-label {
  @include tip2;
  color: var(--o-color-info3);
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-2);
}

// ---- 标签行 ----
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-2);
  align-items: center;
}

// ---- 重置按钮 ----
.reset-btn {
  @include tip2;
  cursor: pointer;
  background: none;
  border: 1px solid var(--o-color-control1);
  border-radius: var(--o-radius-xs);
  color: var(--o-color-info2);
  padding: 0 var(--o-r-gap-2);
  line-height: 1.6;

  &:hover {
    color: var(--o-color-primary1);
    border-color: var(--o-color-primary1);
  }
}

// ---- 运营标签自定义颜色 ----
// 单色：Ascend 品牌红 rgb(199,0,11)
.tag-op-brand {
  --tag-bg-color: rgb(199, 0, 11);
  --tag-bd-color: rgb(199, 0, 11);
  --tag-color: #fff;
}

// 渐变色：蓝紫渐变（DSL: rgba(46,83,250,0.15) → rgba(123,37,244,0.15) light off）
// light 模式用 0.15 opacity，dark 模式用 0.25 opacity
.tag-op-gradient {
  --tag-bg-color: transparent;
  --tag-bd-color: transparent;
  --tag-color: var(--o-color-info1);
  position: relative;

  :deep(.o-tag) {
    background: linear-gradient(
      to right,
      rgba(46, 83, 250, 0.15),
      rgba(123, 37, 244, 0.15)
    );
    border-color: transparent;
  }
}

// 自定颜色（light off）: rgba(46,83,250,0.15) 单色半透明蓝
.tag-op-custom {
  --tag-bg-color: rgba(46, 83, 250, 0.15);
  --tag-bd-color: rgba(46, 83, 250, 0.15);
  --tag-color: var(--o-color-info1);
}

// 自定颜色（dark on）: rgba(46,83,250,0.25) 单色半透明蓝（更高不透明度）
.tag-op-custom-dark {
  --tag-bg-color: rgba(46, 83, 250, 0.25);
  --tag-bd-color: rgba(46, 83, 250, 0.25);
  --tag-color: var(--o-color-info1);
}
</style>
