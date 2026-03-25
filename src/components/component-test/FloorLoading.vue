<script setup lang="ts">
// 设计稿 ID：31:3296（Pixso item-id，加载）
import { OLoading, vLoading } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
// ⚠️ v-loading 指令注意事项：
// 使用 v-loading 指令时，目标容器必须设置 position: relative（或其他非 static 定位），
// 否则加载覆盖层会相对于最近的定位祖先定位，可能超出容器范围或覆盖错误区域。
</script>

<template>
  <AppSection
    title="OLoading 加载"
    subtitle="设计稿 ID：31:3296 · 覆盖 Large/Medium/Small/Mini × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <!-- 亮色区块 -->
      <div data-testid="loading-row-light" class="loading-section">
        <div class="loading-row">
          <div class="loading-card" data-testid="loading-large-light">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="large" label="加载中" />
          </div>
          <div class="loading-card" data-testid="loading-medium-light">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="medium" label="加载中" />
          </div>
          <div class="loading-card" data-testid="loading-small-light">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="small" label="加载中" />
          </div>
          <div class="loading-card" data-testid="loading-mini-light">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="mini" label="加载中" />
          </div>
        </div>
      </div>

      <!-- v-loading 指令示例 -->
      <!-- ⚠️ 容器必须有 position: relative，否则覆盖层会定位到错误位置 -->
      <div class="loading-section">
        <div class="directive-section-label">v-loading 指令方式（容器需 position: relative）</div>
        <div class="loading-row">
          <!-- boolean 简写：true = visible, mask=true, wrapper=null（容器内渲染） -->
          <div class="loading-directive-card" v-loading="true">
            <p class="directive-card-text">boolean 简写</p>
            <p class="directive-card-text">mask=true（默认）</p>
          </div>
          <!-- 对象配置：指定 label + size，mask=true（默认） -->
          <div class="loading-directive-card" v-loading="{ visible: true, label: '加载中', size: 'large' }">
            <p class="directive-card-text">对象配置</p>
            <p class="directive-card-text">label + size</p>
          </div>
          <!-- 对象配置：mask=false，仅显示 spinner -->
          <div class="loading-directive-card" v-loading="{ visible: true, mask: false, size: 'medium', label: '处理中' }">
            <p class="directive-card-text">mask=false</p>
            <p class="directive-card-text">无遮罩</p>
          </div>
        </div>
      </div>

      <!-- 暗色区块 -->
      <div data-testid="loading-row-dark" class="loading-section loading-section-dark" data-o-theme="dark">
        <div class="loading-row">
          <div class="loading-card">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="large" label="加载中" />
          </div>
          <div class="loading-card">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="medium" label="加载中" />
          </div>
          <div class="loading-card">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="small" label="加载中" />
          </div>
          <div class="loading-card">
            <OLoading :visible="true" :mask="false" :wrapper="null" size="mini" label="加载中" />
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

.loading-section {
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-6);
  background: var(--o-color-fill2);
}

.loading-section-dark {
  background: rgb(31, 33, 39);
}

.loading-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--o-r-gap-6);
}

.loading-card {
  position: relative;
  padding: var(--o-r-gap-6);
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  box-shadow: var(--o-shadow-1);
  min-height: 160px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.directive-section-label {
  @include tip1;
  color: var(--o-color-info3);
  margin-bottom: var(--o-r-gap-4);
}

.loading-directive-card {
  position: relative; /* ⚠️ v-loading 指令必须 */
  padding: var(--o-r-gap-6);
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  box-shadow: var(--o-shadow-1);
  min-height: 140px;
  min-width: 140px;
  overflow: hidden;
}

.directive-card-text {
  @include tip1;
  color: var(--o-color-info3);
  margin: 0 0 var(--o-r-gap-2);
}
</style>
