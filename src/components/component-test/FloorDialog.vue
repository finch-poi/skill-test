<script setup lang="ts">
// 设计稿 ID：31:3338（Pixso item-id，弹窗）
import { ref } from 'vue'
import { ODialog, OButton } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- Light theme trigger states ----
const lightDialog1 = ref(false)
const lightDialog2 = ref(false)
const lightDialog3 = ref(false)
const lightDialog4 = ref(false)
const lightDialog5 = ref(false)

// ---- Dark theme trigger states ----
const darkDialog1 = ref(false)
const darkDialog2 = ref(false)
const darkDialog3 = ref(false)
const darkDialog4 = ref(false)
const darkDialog5 = ref(false)

const bodyText = '文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落文本段落'
const longTitle = '标题标题标题标题标题标题'
const shortTitle = '标题'
</script>

<template>
  <AppSection
    title="ODialog 弹窗"
    subtitle="设计稿 ID：31:3338 · 覆盖 弹窗/对话框 × 1-2按钮 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="dialog-row-light">
        <div class="theme-label">Light</div>
        <div class="dialog-row">

          <!-- 变体1：弹窗 2个按钮（带关闭按钮，强调+普通） -->
          <div class="dialog-cell">
            <div class="cell-label">弹窗 · 2个按钮</div>
            <OButton size="small" @click="lightDialog1 = true" data-testid="btn-light-dialog1">打开</OButton>
            <ODialog
              v-model:visible="lightDialog1"
              data-testid="dialog-light-1"
              :actions="[
                { id: 'confirm', label: '强调按钮', color: 'primary', variant: 'solid', onClick: () => { lightDialog1 = false } },
                { id: 'cancel', label: '普通按钮', onClick: () => { lightDialog1 = false } },
              ]"
            >
              <template #header>{{ longTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体2：对话框 2个按钮（确定/取消，竖线分隔） -->
          <div class="dialog-cell">
            <div class="cell-label">对话框 · 2个按钮</div>
            <OButton size="small" @click="lightDialog2 = true" data-testid="btn-light-dialog2">打开</OButton>
            <ODialog
              v-model:visible="lightDialog2"
              data-testid="dialog-light-2"
              :actions="[
                { id: 'confirm', label: '确定', color: 'primary', variant: 'solid', onClick: () => { lightDialog2 = false } },
                { id: 'cancel', label: '取消', onClick: () => { lightDialog2 = false } },
              ]"
            >
              <template #header>{{ shortTitle }}标题标题标题</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体3：对话框 1个按钮（知道了） -->
          <div class="dialog-cell">
            <div class="cell-label">对话框 · 1个按钮</div>
            <OButton size="small" @click="lightDialog3 = true" data-testid="btn-light-dialog3">打开</OButton>
            <ODialog
              v-model:visible="lightDialog3"
              data-testid="dialog-light-3"
              :actions="[
                { id: 'ok', label: '知道了', color: 'primary', variant: 'solid', onClick: () => { lightDialog3 = false } },
              ]"
            >
              <template #header>{{ shortTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体4：弹窗 2个按钮（无关闭按钮） -->
          <div class="dialog-cell">
            <div class="cell-label">弹窗 · 无关闭 · 2按钮</div>
            <OButton size="small" @click="lightDialog4 = true" data-testid="btn-light-dialog4">打开</OButton>
            <ODialog
              v-model:visible="lightDialog4"
              hide-close
              data-testid="dialog-light-4"
              :actions="[
                { id: 'confirm', label: '确定', color: 'primary', variant: 'solid', onClick: () => { lightDialog4 = false } },
                { id: 'cancel', label: '取消', onClick: () => { lightDialog4 = false } },
              ]"
            >
              <template #header>{{ shortTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体5：弹窗 1个按钮（取消，无关闭按钮） -->
          <div class="dialog-cell">
            <div class="cell-label">弹窗 · 无关闭 · 1按钮</div>
            <OButton size="small" @click="lightDialog5 = true" data-testid="btn-light-dialog5">打开</OButton>
            <ODialog
              v-model:visible="lightDialog5"
              hide-close
              data-testid="dialog-light-5"
              :actions="[
                { id: 'cancel', label: '取消', onClick: () => { lightDialog5 = false } },
              ]"
            >
              <template #header>{{ shortTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="dialog-row-dark">
        <div class="theme-label">Dark</div>
        <div class="dialog-row">

          <!-- 变体1：弹窗 2个按钮 -->
          <div class="dialog-cell">
            <div class="cell-label">弹窗 · 2个按钮</div>
            <OButton size="small" @click="darkDialog1 = true" data-testid="btn-dark-dialog1">打开</OButton>
            <ODialog
              v-model:visible="darkDialog1"
              data-testid="dialog-dark-1"
              :actions="[
                { id: 'confirm', label: '强调按钮', color: 'primary', variant: 'solid', onClick: () => { darkDialog1 = false } },
                { id: 'cancel', label: '普通按钮', onClick: () => { darkDialog1 = false } },
              ]"
            >
              <template #header>{{ longTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体2：对话框 2个按钮 -->
          <div class="dialog-cell">
            <div class="cell-label">对话框 · 2个按钮</div>
            <OButton size="small" @click="darkDialog2 = true" data-testid="btn-dark-dialog2">打开</OButton>
            <ODialog
              v-model:visible="darkDialog2"
              data-testid="dialog-dark-2"
              :actions="[
                { id: 'confirm', label: '确定', color: 'primary', variant: 'solid', onClick: () => { darkDialog2 = false } },
                { id: 'cancel', label: '取消', onClick: () => { darkDialog2 = false } },
              ]"
            >
              <template #header>标题标题标题标题</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体3：对话框 1个按钮 -->
          <div class="dialog-cell">
            <div class="cell-label">对话框 · 1个按钮</div>
            <OButton size="small" @click="darkDialog3 = true" data-testid="btn-dark-dialog3">打开</OButton>
            <ODialog
              v-model:visible="darkDialog3"
              data-testid="dialog-dark-3"
              :actions="[
                { id: 'ok', label: '知道了', color: 'primary', variant: 'solid', onClick: () => { darkDialog3 = false } },
              ]"
            >
              <template #header>{{ shortTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体4：弹窗 无关闭 2按钮 -->
          <div class="dialog-cell">
            <div class="cell-label">弹窗 · 无关闭 · 2按钮</div>
            <OButton size="small" @click="darkDialog4 = true" data-testid="btn-dark-dialog4">打开</OButton>
            <ODialog
              v-model:visible="darkDialog4"
              hide-close
              data-testid="dialog-dark-4"
              :actions="[
                { id: 'confirm', label: '确定', color: 'primary', variant: 'solid', onClick: () => { darkDialog4 = false } },
                { id: 'cancel', label: '取消', onClick: () => { darkDialog4 = false } },
              ]"
            >
              <template #header>{{ shortTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
          </div>

          <!-- 变体5：弹窗 无关闭 1按钮 -->
          <div class="dialog-cell">
            <div class="cell-label">弹窗 · 无关闭 · 1按钮</div>
            <OButton size="small" @click="darkDialog5 = true" data-testid="btn-dark-dialog5">打开</OButton>
            <ODialog
              v-model:visible="darkDialog5"
              hide-close
              data-testid="dialog-dark-5"
              :actions="[
                { id: 'cancel', label: '取消', onClick: () => { darkDialog5 = false } },
              ]"
            >
              <template #header>{{ shortTitle }}</template>
              <p>{{ bodyText }}</p>
            </ODialog>
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

.dialog-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--o-r-gap-4);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.dialog-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--o-r-gap-3);
  min-width: 0;
}

.cell-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}
</style>
