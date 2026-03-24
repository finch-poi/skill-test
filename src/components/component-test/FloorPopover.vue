<script setup lang="ts">
// 设计稿 ID：47:4288（Pixso item-id，气泡提示）
import { OPopover, OButton } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OPopover 气泡提示"
    subtitle="设计稿 ID：47:4288 · 覆盖 L/M × 上/下/左/右 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="popover-row-light">
        <div class="theme-label">Light</div>

        <!-- L size: 上/左/下/右 -->
        <div class="popover-group">
          <div class="group-label">L size（含标题 + 内容 + 操作）</div>
          <div class="popover-row">

            <div class="popover-item" data-testid="popover-l-top-light">
              <OPopover position="top" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>上方弹出</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-l-bottom-light">
              <OPopover position="bottom" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>下方弹出</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-l-left-light">
              <OPopover position="left" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>左侧弹出</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-l-right-light">
              <OPopover position="right" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>右侧弹出</OButton>
                </template>
              </OPopover>
            </div>

          </div>
        </div>

        <!-- M size: 上/左/下/右 -->
        <div class="popover-group">
          <div class="group-label">M size（仅内容文本）</div>
          <div class="popover-row">

            <div class="popover-item" data-testid="popover-m-top-light">
              <OPopover position="top" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停上方</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-m-bottom-light">
              <OPopover position="bottom" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停下方</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-m-left-light">
              <OPopover position="left" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停左侧</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-m-right-light">
              <OPopover position="right" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停右侧</OButton>
                </template>
              </OPopover>
            </div>

          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="popover-row-dark">
        <div class="theme-label">Dark</div>

        <!-- L size: 上/左/下/右 -->
        <div class="popover-group">
          <div class="group-label">L size（含标题 + 内容 + 操作）</div>
          <div class="popover-row">

            <div class="popover-item" data-testid="popover-l-top-dark">
              <OPopover position="top" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>上方弹出</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-l-bottom-dark">
              <OPopover position="bottom" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>下方弹出</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-l-left-dark">
              <OPopover position="left" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>左侧弹出</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-l-right-dark">
              <OPopover position="right" trigger="click" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-l">
                  <div class="popover-title">标题标题</div>
                  <div class="popover-body">内容文本内容文本内容文本</div>
                  <div class="popover-action">知道了</div>
                </div>
                <template #target>
                  <OButton>右侧弹出</OButton>
                </template>
              </OPopover>
            </div>

          </div>
        </div>

        <!-- M size: 上/左/下/右 -->
        <div class="popover-group">
          <div class="group-label">M size（仅内容文本）</div>
          <div class="popover-row">

            <div class="popover-item" data-testid="popover-m-top-dark">
              <OPopover position="top" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停上方</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-m-bottom-dark">
              <OPopover position="bottom" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停下方</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-m-left-dark">
              <OPopover position="left" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停左侧</OButton>
                </template>
              </OPopover>
            </div>

            <div class="popover-item" data-testid="popover-m-right-dark">
              <OPopover position="right" trigger="hover" :adjust-width="false" :adjust-min-width="false">
                <div class="popover-content-m">内容文本内容文本内容文本</div>
                <template #target>
                  <OButton variant="text">悬停右侧</OButton>
                </template>
              </OPopover>
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
.popover-group {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.group-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 触发器行 ----
.popover-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-5);
  align-items: center;
  padding: var(--o-r-gap-4) 0;
}

.popover-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

// ---- Popover 内容：L size ----
.popover-content-l {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-2);
  min-width: 168px;
  max-width: 200px;
}

.popover-title {
  @include h4;
  font-weight: 600;
  color: var(--o-color-info1);
}

.popover-body {
  @include tip1;
  color: var(--o-color-info2);
}

.popover-action {
  @include tip1;
  color: var(--o-color-primary1);
  text-align: right;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
}

// ---- Popover 内容：M size ----
.popover-content-m {
  @include tip1;
  color: var(--o-color-info1);
  max-width: 200px;
}
</style>
