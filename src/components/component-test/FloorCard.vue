<script setup lang="ts">
// 设计稿 ID：1689:18069（Pixso item-id，卡片）
import { OCard, OIconFilter, OLink } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OCard 卡片"
    subtitle="设计稿 ID：1689:18069 · 覆盖图片/小图标/大图标 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="card-row-light">
        <div class="theme-label">Light</div>
        <div class="card-row">
          <!-- 图片卡片 -->
          <div class="card-col">
            <div class="variant-label">图片卡片（带封面）</div>
            <OCard
              :cover-ratio="16 / 9"
              title="标题文本标题文本"
              detail="内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本"
              hoverable
              data-testid="card-image-light"
            >
              <template #cover>
                <div class="cover-placeholder">图片比例16:9</div>
              </template>
            </OCard>
          </div>

          <!-- 小图标卡片 -->
          <div class="card-col">
            <div class="variant-label">小图标卡片（titleIcon + footer 链接）</div>
            <OCard
              :title-icon="OIconFilter"
              title="标题文本标题文本"
              detail="内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本文本内容"
              data-testid="card-small-icon-light"
            >
              <template #footer>
                <OLink>链接按钮</OLink>
                <OLink href="#">链接按钮</OLink>
              </template>
            </OCard>
          </div>

          <!-- 大图标卡片 -->
          <div class="card-col">
            <div class="variant-label">大图标卡片（icon 图标）</div>
            <OCard
              :icon="OIconFilter"
              title="标题文本标题文本"
              detail="内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本文本内容"
              data-testid="card-large-icon-light"
            />
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="card-row-dark"
      >
        <div class="theme-label">Dark</div>
        <div class="card-row">
          <!-- 图片卡片 Dark -->
          <div class="card-col">
            <div class="variant-label">图片卡片（带封面）</div>
            <OCard
              :cover-ratio="16 / 9"
              title="标题文本标题文本"
              detail="内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本"
              hoverable
              data-testid="card-image-dark"
            >
              <template #cover>
                <div class="cover-placeholder cover-placeholder--dark">图片比例16:9</div>
              </template>
            </OCard>
          </div>

          <!-- 小图标卡片 Dark -->
          <div class="card-col">
            <div class="variant-label">小图标卡片（titleIcon + footer 链接）</div>
            <OCard
              :title-icon="OIconFilter"
              title="标题文本标题文本"
              detail="内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本文本内容"
              data-testid="card-small-icon-dark"
            >
              <template #footer>
                <OLink>链接按钮</OLink>
                <OLink href="#">链接按钮</OLink>
              </template>
            </OCard>
          </div>

          <!-- 大图标卡片 Dark -->
          <div class="card-col">
            <div class="variant-label">大图标卡片（icon 图标）</div>
            <OCard
              :icon="OIconFilter"
              title="标题文本标题文本"
              detail="内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本文本内容"
              data-testid="card-large-icon-dark"
            />
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

.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.card-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.variant-label {
  @include tip1;
  color: var(--o-color-info3);
}

.cover-placeholder {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: rgb(225, 228, 237);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--o-radius-m);
  color: rgb(131, 140, 168);
  @include text1;
}

.cover-placeholder--dark {
  background: rgb(73, 75, 81);
  color: rgb(133, 137, 150);
}
</style>
