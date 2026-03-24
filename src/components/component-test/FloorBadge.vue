<script setup lang="ts">
// 设计稿 ID：293:12743, 293:8706（Pixso item-id，徽标）
import { OBadge, OButton } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OBadge 徽标"
    subtitle="设计稿 ID：293:12743 · 293:8706 · 覆盖 数字/圆点 × 单独/附加 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="badge-row-light">
        <div class="theme-label">Light</div>
        <div class="badge-row">

          <!-- 数字徽标 - Single（独立）-->
          <div class="badge-card">
            <div class="badge-label">数字徽标 · 独立（Single）</div>
            <div class="badge-items">
              <OBadge :value="21" color="danger" data-testid="badge-number-single-light" />
            </div>
          </div>

          <!-- 数字徽标 - Group（附加到元素上）-->
          <div class="badge-card">
            <div class="badge-label">数字徽标 · 附加（Group）</div>
            <div class="badge-items">
              <OBadge :value="21" color="danger" data-testid="badge-number-group-light">
                <OButton>消息</OButton>
              </OBadge>
            </div>
          </div>

          <!-- 数字徽标 - 超出最大值 -->
          <div class="badge-card">
            <div class="badge-label">数字徽标 · 超出最大值（max=99）</div>
            <div class="badge-items">
              <OBadge :value="100" :max="99" color="danger" data-testid="badge-number-overflow-light">
                <OButton>通知</OButton>
              </OBadge>
            </div>
          </div>

          <!-- 圆点徽标 - Single（独立）-->
          <div class="badge-card">
            <div class="badge-label">圆点徽标 · 独立（Single）</div>
            <div class="badge-items">
              <OBadge dot color="danger" data-testid="badge-dot-single-light" />
            </div>
          </div>

          <!-- 圆点徽标 - Group（附加到元素上）-->
          <div class="badge-card">
            <div class="badge-label">圆点徽标 · 附加（Group）</div>
            <div class="badge-items">
              <OBadge dot color="danger" data-testid="badge-dot-group-light">
                <OButton>消息</OButton>
              </OBadge>
            </div>
          </div>

          <!-- 多种颜色 -->
          <div class="badge-card">
            <div class="badge-label">多种颜色</div>
            <div class="badge-items">
              <OBadge :value="5" color="primary" data-testid="badge-primary-light">
                <OButton>主要</OButton>
              </OBadge>
              <OBadge :value="5" color="success" data-testid="badge-success-light">
                <OButton>成功</OButton>
              </OBadge>
              <OBadge :value="5" color="warning" data-testid="badge-warning-light">
                <OButton>警告</OButton>
              </OBadge>
              <OBadge :value="5" color="danger" data-testid="badge-danger-light">
                <OButton>危险</OButton>
              </OBadge>
            </div>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="badge-row-dark">
        <div class="theme-label">Dark</div>
        <div class="badge-row">

          <!-- 数字徽标 - Single（独立）-->
          <div class="badge-card">
            <div class="badge-label">数字徽标 · 独立（Single）</div>
            <div class="badge-items">
              <OBadge :value="21" color="danger" data-testid="badge-number-single-dark" />
            </div>
          </div>

          <!-- 数字徽标 - Group（附加到元素上）-->
          <div class="badge-card">
            <div class="badge-label">数字徽标 · 附加（Group）</div>
            <div class="badge-items">
              <OBadge :value="21" color="danger" data-testid="badge-number-group-dark">
                <OButton>消息</OButton>
              </OBadge>
            </div>
          </div>

          <!-- 数字徽标 - 超出最大值 -->
          <div class="badge-card">
            <div class="badge-label">数字徽标 · 超出最大值（max=99）</div>
            <div class="badge-items">
              <OBadge :value="100" :max="99" color="danger" data-testid="badge-number-overflow-dark">
                <OButton>通知</OButton>
              </OBadge>
            </div>
          </div>

          <!-- 圆点徽标 - Single（独立）-->
          <div class="badge-card">
            <div class="badge-label">圆点徽标 · 独立（Single）</div>
            <div class="badge-items">
              <OBadge dot color="danger" data-testid="badge-dot-single-dark" />
            </div>
          </div>

          <!-- 圆点徽标 - Group（附加到元素上）-->
          <div class="badge-card">
            <div class="badge-label">圆点徽标 · 附加（Group）</div>
            <div class="badge-items">
              <OBadge dot color="danger" data-testid="badge-dot-group-dark">
                <OButton>消息</OButton>
              </OBadge>
            </div>
          </div>

          <!-- 多种颜色 -->
          <div class="badge-card">
            <div class="badge-label">多种颜色</div>
            <div class="badge-items">
              <OBadge :value="5" color="primary" data-testid="badge-primary-dark">
                <OButton>主要</OButton>
              </OBadge>
              <OBadge :value="5" color="success" data-testid="badge-success-dark">
                <OButton>成功</OButton>
              </OBadge>
              <OBadge :value="5" color="warning" data-testid="badge-warning-dark">
                <OButton>警告</OButton>
              </OBadge>
              <OBadge :value="5" color="danger" data-testid="badge-danger-dark">
                <OButton>危险</OButton>
              </OBadge>
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

// ---- 行布局 ----
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

// ---- Demo 卡片 ----
.badge-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 160px;
}

// ---- 标签 ----
.badge-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 徽标项容器 ----
.badge-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-6);
  align-items: center;
  padding: var(--o-r-gap-3) 0;
}
</style>
