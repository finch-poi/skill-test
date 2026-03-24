<script setup lang="ts">
// 设计稿 ID：28:7501（Pixso item-id，内联提示）
import { OMessage } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

const statuses = ['success', 'info', 'danger', 'warning'] as const
</script>

<template>
  <AppSection
    title="OMessage 内联提示"
    subtitle="设计稿 ID：28:7501 · 覆盖 success/info/danger/warning × 标题+正文 / 仅正文 × 默认 / colorful × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="inline-msg-row-light">
        <div class="theme-label">Light</div>
        <div class="msg-grid">

          <!-- 列1：title + content，无 close，非 colorful -->
          <div class="msg-col">
            <div class="col-label">标题 + 正文 · 默认</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                title="标题"
                :data-testid="`inline-msg-title-${s}`"
              >
                正文内容正文内容正文内容正文内容
              </OMessage>
            </div>
          </div>

          <!-- 列2：仅 content，带 close，非 colorful -->
          <div class="msg-col">
            <div class="col-label">仅正文 · closable</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                closable
                :data-testid="`inline-msg-closable-${s}`"
              >
                提示常驻信息文本
              </OMessage>
            </div>
          </div>

          <!-- 列3：title + content，无 close，colorful -->
          <div class="msg-col">
            <div class="col-label">标题 + 正文 · colorful</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                colorful
                title="标题"
                :data-testid="`inline-msg-colorful-title-${s}`"
              >
                正文内容正文内容正文内容正文内容正文
              </OMessage>
            </div>
          </div>

          <!-- 列4：仅 content，带 close，colorful -->
          <div class="msg-col">
            <div class="col-label">仅正文 · colorful + closable</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                colorful
                closable
                :data-testid="`inline-msg-colorful-closable-${s}`"
              >
                提示常驻信息文本
              </OMessage>
            </div>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="inline-msg-row-dark"
      >
        <div class="theme-label">Dark</div>
        <div class="msg-grid">

          <!-- 暗色列1：title + content，无 close，非 colorful -->
          <div class="msg-col">
            <div class="col-label">标题 + 正文 · 默认</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                title="标题"
                :data-testid="`inline-msg-dark-title-${s}`"
              >
                正文内容正文内容正文内容正文内容
              </OMessage>
            </div>
          </div>

          <!-- 暗色列2：仅 content，带 close，非 colorful -->
          <div class="msg-col">
            <div class="col-label">仅正文 · closable</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                closable
                :data-testid="`inline-msg-dark-closable-${s}`"
              >
                提示常驻信息文本
              </OMessage>
            </div>
          </div>

          <!-- 暗色列3：title + content，无 close，colorful -->
          <div class="msg-col">
            <div class="col-label">标题 + 正文 · colorful</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                colorful
                title="标题"
                :data-testid="`inline-msg-dark-colorful-title-${s}`"
              >
                正文内容正文内容正文内容正文内容正文
              </OMessage>
            </div>
          </div>

          <!-- 暗色列4：仅 content，带 close，colorful -->
          <div class="msg-col">
            <div class="col-label">仅正文 · colorful + closable</div>
            <div class="msg-list">
              <OMessage
                v-for="s in statuses"
                :key="s"
                :status="s"
                colorful
                closable
                :data-testid="`inline-msg-dark-colorful-closable-${s}`"
              >
                提示常驻信息文本
              </OMessage>
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

// ---- 4列栅格 ----
.msg-grid {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.msg-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

// ---- 列标签 ----
.col-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 消息列表 ----
.msg-list {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}
</style>
