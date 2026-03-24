<script setup lang="ts">
// 设计稿 ID：1740:18743（Pixso item-id，步骤条）
import { OStep, OStepItem } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OStep 步骤条"
    subtitle="设计稿 ID：1740:18743 · 覆盖 finished/processing/waiting/failed × 水平/垂直 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="step-row-light">
        <div class="theme-label">Light</div>

        <!-- 水平步骤条（含标题） -->
        <div class="step-block">
          <div class="step-block-label">水平步骤条（finished / processing / waiting）</div>
          <OStep direction="h" data-testid="step-h-basic">
            <OStepItem :step-index="0" title="已完成的步骤" status="finished" />
            <OStepItem :step-index="1" title="进行中的步骤" status="processing" />
            <OStepItem :step-index="2" title="未开始的步骤" status="waiting" />
          </OStep>
        </div>

        <!-- 水平步骤条（含 failed 状态，icon=true 显示对勾/感叹号） -->
        <div class="step-block">
          <div class="step-block-label">水平步骤条（finished+icon / failed+icon / waiting）</div>
          <OStep direction="h" data-testid="step-h-failed">
            <OStepItem :step-index="0" title="已提交" description="提交成功" status="finished" :icon="true" />
            <OStepItem :step-index="1" title="审核失败" description="需要重新提交" status="failed" :icon="true" />
            <OStepItem :step-index="2" title="待完成" status="waiting" />
          </OStep>
        </div>

        <!-- 垂直步骤条 -->
        <div class="step-block">
          <div class="step-block-label">垂直步骤条（finished / processing / waiting）</div>
          <OStep direction="v" data-testid="step-v-basic">
            <OStepItem :step-index="0" title="已完成的步骤" description="完成描述信息" status="finished" style="height: 80px" />
            <OStepItem :step-index="1" title="进行中的步骤" description="进行中描述信息" status="processing" style="height: 80px" />
            <OStepItem :step-index="2" title="未开始的步骤" status="waiting" style="height: 80px" />
          </OStep>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="step-row-dark">
        <div class="theme-label">Dark</div>

        <!-- 水平步骤条（含标题） -->
        <div class="step-block">
          <div class="step-block-label">水平步骤条（finished / processing / waiting）</div>
          <OStep direction="h" data-testid="step-h-basic-dark">
            <OStepItem :step-index="0" title="已完成的步骤" status="finished" />
            <OStepItem :step-index="1" title="进行中的步骤" status="processing" />
            <OStepItem :step-index="2" title="未开始的步骤" status="waiting" />
          </OStep>
        </div>

        <!-- 水平步骤条（含 failed 状态） -->
        <div class="step-block">
          <div class="step-block-label">水平步骤条（finished+icon / failed+icon / waiting）</div>
          <OStep direction="h" data-testid="step-h-failed-dark">
            <OStepItem :step-index="0" title="已提交" description="提交成功" status="finished" :icon="true" />
            <OStepItem :step-index="1" title="审核失败" description="需要重新提交" status="failed" :icon="true" />
            <OStepItem :step-index="2" title="待完成" status="waiting" />
          </OStep>
        </div>

        <!-- 垂直步骤条 -->
        <div class="step-block">
          <div class="step-block-label">垂直步骤条（finished / processing / waiting）</div>
          <OStep direction="v" data-testid="step-v-basic-dark">
            <OStepItem :step-index="0" title="已完成的步骤" description="完成描述信息" status="finished" style="height: 80px" />
            <OStepItem :step-index="1" title="进行中的步骤" description="进行中描述信息" status="processing" style="height: 80px" />
            <OStepItem :step-index="2" title="未开始的步骤" status="waiting" style="height: 80px" />
          </OStep>
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

// ---- 步骤条演示块 ----
.step-block {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
}

.theme-section--dark .step-block {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: none;
}

.step-block-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}
</style>
