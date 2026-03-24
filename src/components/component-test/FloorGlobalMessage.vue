<script setup lang="ts">
// 设计稿 ID：28:5911（Pixso item-id，全局提示）
import { OMessage, useMessage, OButton } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

const message = useMessage()

function showSuccess() {
  message.success({ content: '用于表示操作顺利达成，5秒后消失', duration: 5000, closable: true })
}

function showInfo() {
  message.info({ content: '用于表示普通操作信息提示，5秒后消失', duration: 5000, closable: true })
}

function showDanger() {
  message.danger({ content: '用于表示操作引起严重的后果，10秒后消失', duration: 10000, closable: true })
}

function showWarning() {
  message.warning({ content: '用于表示操作引起一定后果，10秒后消失', duration: 10000, closable: true })
}

function showLoading() {
  message.loading({ content: '用于表示操作正在生效的过程中，5秒后消失', duration: 5000, closable: true })
}
</script>

<template>
  <AppSection
    title="OMessage 全局提示"
    subtitle="设计稿 ID：28:5911 · 覆盖 success/info/danger/warning/loading × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="global-msg-row-light">
        <div class="theme-label">Light</div>
        <div class="msg-list">
          <OMessage status="success" closable :default-visible="true">
            用于表示操作顺利达成，5秒后消失
          </OMessage>
          <OMessage status="info" closable :default-visible="true">
            用于表示普通操作信息提示，5秒后消失
          </OMessage>
          <OMessage status="danger" closable :default-visible="true">
            用于表示操作引起严重的后果，10秒后消失
          </OMessage>
          <OMessage status="warning" closable :default-visible="true">
            用于表示操作引起一定后果，10秒后消失
          </OMessage>
          <OMessage status="loading" closable :default-visible="true">
            用于表示操作正在生效的过程中，5秒后消失
          </OMessage>
        </div>

        <div class="btn-row">
          <div class="btn-group-label">命令式触发</div>
          <div class="btn-group">
            <OButton status="success" size="small" @click="showSuccess">成功</OButton>
            <OButton status="info" size="small" @click="showInfo">提示</OButton>
            <OButton status="danger" size="small" @click="showDanger">错误</OButton>
            <OButton status="warning" size="small" @click="showWarning">警告</OButton>
            <OButton size="small" @click="showLoading">加载</OButton>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="global-msg-row-dark">
        <div class="theme-label">Dark</div>
        <div class="msg-list">
          <OMessage status="success" closable :default-visible="true">
            用于表示操作顺利达成，5秒后消失
          </OMessage>
          <OMessage status="info" closable :default-visible="true">
            用于表示普通操作信息提示，5秒后消失
          </OMessage>
          <OMessage status="danger" closable :default-visible="true">
            用于表示操作引起严重的后果，10秒后消失
          </OMessage>
          <OMessage status="warning" closable :default-visible="true">
            用于表示操作引起一定后果，10秒后消失
          </OMessage>
          <OMessage status="loading" closable :default-visible="true">
            用于表示操作正在生效的过程中，5秒后消失
          </OMessage>
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

.msg-list {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.btn-row {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.btn-group-label {
  @include tip1;
  color: var(--o-color-info3);
}

.btn-group {
  display: flex;
  gap: var(--o-r-gap-3);
  flex-wrap: wrap;
}
</style>
