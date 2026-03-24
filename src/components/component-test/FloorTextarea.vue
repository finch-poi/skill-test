<script setup lang="ts">
// 设计稿 ID：17:2670（Pixso item-id，文本域）
import { ref } from 'vue'
import { OTextarea } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

const valueEmpty = ref('')
const valueContent = ref('已输入的文字内容')
</script>

<template>
  <AppSection
    title="OTextarea 文本域"
    subtitle="设计稿 ID：17:2670 · 覆盖 Enabled/Complete/Error × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="textarea-row-light">
        <div class="theme-label">Light</div>
        <div class="textarea-grid">

          <!-- Enabled（空，含 placeholder） -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled（placeholder）</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-enabled-light"
            />
          </div>

          <!-- Enabled（solid 变体，含 placeholder） -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled · Solid</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-solid-light"
            />
          </div>

          <!-- Complete（有内容） -->
          <div class="textarea-cell">
            <div class="cell-label">Complete（有内容）</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-complete-light"
            />
          </div>

          <!-- Complete · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Complete · Solid</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-complete-solid-light"
            />
          </div>

          <!-- Error（danger） -->
          <div class="textarea-cell">
            <div class="cell-label">Error</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              color="danger"
              resize="none"
              data-testid="textarea-error-light"
            />
            <div class="error-text">错误提示</div>
          </div>

          <!-- Error · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Error · Solid</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              color="danger"
              variant="solid"
              resize="none"
              data-testid="textarea-error-solid-light"
            />
            <div class="error-text">错误提示</div>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="textarea-row-dark">
        <div class="theme-label">Dark</div>
        <div class="textarea-grid">

          <!-- Enabled（空） -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled（placeholder）</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-enabled-dark"
            />
          </div>

          <!-- Enabled · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Enabled · Solid</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-solid-dark"
            />
          </div>

          <!-- Complete -->
          <div class="textarea-cell">
            <div class="cell-label">Complete（有内容）</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              resize="none"
              data-testid="textarea-complete-dark"
            />
          </div>

          <!-- Complete · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Complete · Solid</div>
            <OTextarea
              v-model="valueContent"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              variant="solid"
              resize="none"
              data-testid="textarea-complete-solid-dark"
            />
          </div>

          <!-- Error -->
          <div class="textarea-cell">
            <div class="cell-label">Error</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              color="danger"
              resize="none"
              data-testid="textarea-error-dark"
            />
            <div class="error-text">错误提示</div>
          </div>

          <!-- Error · Solid -->
          <div class="textarea-cell">
            <div class="cell-label">Error · Solid</div>
            <OTextarea
              v-model="valueEmpty"
              placeholder="Hint"
              :max-length="100"
              show-length="always"
              color="danger"
              variant="solid"
              resize="none"
              data-testid="textarea-error-solid-dark"
            />
            <div class="error-text">错误提示</div>
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

// ---- 2-column grid ----
.textarea-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--o-r-gap-5);

  @include respond('<=pad') {
    grid-template-columns: 1fr;
  }
}

// ---- 单个 textarea 卡片 ----
.textarea-cell {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.cell-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

.error-text {
  @include tip1;
  color: var(--o-color-danger1);
}
</style>
