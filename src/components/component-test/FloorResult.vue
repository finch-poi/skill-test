<script setup lang="ts">
// 设计稿 ID：1740:18598（Pixso item-id，结果）
import { OResult, OButton } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

const statusItems = [
  { status: 'success' as const, title: '提交成功', description: '您的申请已成功提交，等待审核中' },
  { status: 'info' as const, title: '提示信息', description: '请注意查收您的邮件通知' },
  { status: 'warning' as const, title: '操作警告', description: '当前操作存在风险，请谨慎确认' },
  { status: 'danger' as const, title: '提交失败', description: '网络异常，请检查连接后重试' },
]

const imageItems = [
  { key: '403', title: '无访问权限', description: '您没有权限访问该页面' },
  { key: '404', title: '页面不存在', description: '您访问的页面已被删除或不存在' },
  { key: '500', title: '服务器错误', description: '服务器内部错误，请稍后重试' },
]
</script>

<template>
  <AppSection
    title="OResult 结果"
    subtitle="设计稿 ID：1740:18598 · 覆盖 success/info/warning/danger × 亮/暗 + 图片模式"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="result-row-light">
        <div class="theme-label">Light — 状态图标模式（status prop）</div>
        <div class="result-grid">
          <div
            v-for="item in statusItems"
            :key="item.status"
            class="result-card"
            :data-testid="`result-${item.status}-light`"
          >
            <OResult
              :status="item.status"
              :title="item.title"
              :description="item.description"
            >
              <template #extra>
                <OButton variant="outline" color="primary" round="pill" size="small">
                  返回首页
                </OButton>
              </template>
            </OResult>
          </div>
        </div>

        <div class="theme-label theme-label--mt">Light — 图片插画模式（#image 插槽）</div>
        <div class="result-grid">
          <div
            v-for="item in imageItems"
            :key="item.key"
            class="result-card"
            :data-testid="`result-${item.key}-light`"
          >
            <OResult
              :title="item.title"
              :description="item.description"
            >
              <template #image>
                <div class="result-illustration" :data-error-code="item.key">
                  <span class="error-code">{{ item.key }}</span>
                </div>
              </template>
              <template #extra>
                <OButton variant="solid" color="primary" round="pill" size="small">
                  强调按钮
                </OButton>
              </template>
            </OResult>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="result-row-dark">
        <div class="theme-label">Dark — 状态图标模式（status prop）</div>
        <div class="result-grid">
          <div
            v-for="item in statusItems"
            :key="item.status"
            class="result-card"
            :data-testid="`result-${item.status}-dark`"
          >
            <OResult
              :status="item.status"
              :title="item.title"
              :description="item.description"
            >
              <template #extra>
                <OButton variant="outline" color="primary" round="pill" size="small">
                  返回首页
                </OButton>
              </template>
            </OResult>
          </div>
        </div>

        <div class="theme-label theme-label--mt">Dark — 图片插画模式（#image 插槽）</div>
        <div class="result-grid">
          <div
            v-for="item in imageItems"
            :key="item.key"
            class="result-card"
            :data-testid="`result-${item.key}-dark`"
          >
            <OResult
              :title="item.title"
              :description="item.description"
            >
              <template #image>
                <div class="result-illustration" :data-error-code="item.key">
                  <span class="error-code">{{ item.key }}</span>
                </div>
              </template>
              <template #extra>
                <OButton variant="solid" color="primary" round="pill" size="small">
                  强调按钮
                </OButton>
              </template>
            </OResult>
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

.theme-label--mt {
  margin-top: var(--o-r-gap-4);
}

// ---- 结果网格 ----
.result-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-6);
}

.result-card {
  flex: 1 1 220px;
  min-width: 0;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6) var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  align-items: stretch;

  :deep(.o-result) {
    width: 100%;
  }
}

// ---- 插画占位 ----
.result-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 140px;
  background: var(--o-color-fill1);
  border-radius: var(--o-radius-m);
}

.error-code {
  @include h2;
  font-weight: 700;
  color: var(--o-color-info3);
  letter-spacing: 0.1em;
}
</style>
