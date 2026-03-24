<script setup lang="ts">
// 设计稿 ID：15:3997, 17:4014（Pixso item-id，输入框）
import { ref } from 'vue'
import {
  OInput,
  OButton,
  OIconSearch,
  OIconClose,
} from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// ---- 输入框示例数据 ----
const valEmpty = ref('')
const valFilled = ref('Hint')
const valLabel = ref('')
const valPhone = ref('')
const valCode = ref('')
const valError = ref('Hint')

const valEmptyM = ref('')
const valFilledM = ref('Hint')

const valEmptyDark = ref('')
const valFilledDark = ref('Hint')
const valLabelDark = ref('')
const valPhoneDark = ref('')
const valCodeDark = ref('')
const valErrorDark = ref('Hint')

const valEmptyMDark = ref('')
const valFilledMDark = ref('Hint')

// ---- 搜索框示例数据 ----
const searchL = ref('')
const searchLActive = ref('搜索')
const searchM = ref('')
const searchMActive = ref('搜索')
const searchS = ref('')
const searchSActive = ref('搜索')
const searchMb = ref('')
const searchMbActive = ref('搜索')

const searchLDark = ref('')
const searchLActiveDark = ref('搜索')
const searchMDark = ref('')
const searchMActiveDark = ref('搜索')
const searchSDark = ref('')
const searchSActiveDark = ref('搜索')
const searchMbDark = ref('')
const searchMbActiveDark = ref('搜索')
</script>

<template>
  <AppSection
    title="OInput 输入框"
    subtitle="设计稿 ID：15:3997 · 覆盖 L/M/Mb × Enabled/Complete/Error/Group-tittle/Group-number/Group-btn × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="input-row-light">
        <div class="theme-label">Light</div>
        <div class="input-row">

          <!-- Column A：L size -->
          <div class="input-col">
            <div class="input-card">
              <div class="input-label">L size · Enabled（空）</div>
              <OInput
                v-model="valEmpty"
                size="large"
                placeholder="Hint"
                round="pill"
                data-testid="input-l-enabled"
              />
            </div>

            <div class="input-card">
              <div class="input-label">L size · Complete（有值 + 清空）</div>
              <OInput
                v-model="valFilled"
                size="large"
                placeholder="Hint"
                clearable
                round="pill"
                data-testid="input-l-complete"
              />
            </div>

            <div class="input-card">
              <div class="input-label">L size · Group-tittle（必填标签）</div>
              <div class="input-with-label">
                <span class="required-label"><span class="asterisk">*</span> Tittle</span>
                <OInput
                  v-model="valLabel"
                  size="large"
                  placeholder="Hint"
                  round="pill"
                  data-testid="input-l-label"
                />
              </div>
            </div>

            <div class="input-card">
              <div class="input-label">L size · Group-number（手机号前置）</div>
              <OInput
                v-model="valPhone"
                size="large"
                placeholder="Hint"
                round="pill"
                data-testid="input-l-group-number"
              >
                <template #prepend>
                  <span class="prepend-text">+86（中国）<span class="prepend-arrow">∨</span></span>
                </template>
              </OInput>
            </div>

            <div class="input-card">
              <div class="input-label">L size · Group-btn（验证码）</div>
              <OInput
                v-model="valCode"
                size="large"
                placeholder="请输入"
                round="pill"
                data-testid="input-l-group-btn"
              >
                <template #extra>
                  <OButton variant="text" size="small" color="primary">发送验证码</OButton>
                </template>
              </OInput>
            </div>

            <div class="input-card">
              <div class="input-label">L size · Error（错误状态）</div>
              <OInput
                v-model="valError"
                size="large"
                placeholder="Hint"
                round="pill"
                color="danger"
                data-testid="input-l-error"
              />
            </div>
          </div>

          <!-- Column B：M size (Mb) -->
          <div class="input-col">
            <div class="input-card">
              <div class="input-label">M size · Enabled（空）</div>
              <OInput
                v-model="valEmptyM"
                size="medium"
                placeholder="Hint"
                round="pill"
                data-testid="input-m-enabled"
              />
            </div>

            <div class="input-card">
              <div class="input-label">M size · Complete（有值 + 清空）</div>
              <OInput
                v-model="valFilledM"
                size="medium"
                placeholder="Hint"
                clearable
                round="pill"
                data-testid="input-m-complete"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="input-row-dark">
        <div class="theme-label">Dark</div>
        <div class="input-row">

          <!-- Dark Column A：L size -->
          <div class="input-col">
            <div class="input-card">
              <div class="input-label">L size · Enabled（空）</div>
              <OInput
                v-model="valEmptyDark"
                size="large"
                placeholder="Hint"
                round="pill"
                data-testid="input-l-enabled-dark"
              />
            </div>

            <div class="input-card">
              <div class="input-label">L size · Complete（有值 + 清空）</div>
              <OInput
                v-model="valFilledDark"
                size="large"
                placeholder="Hint"
                clearable
                round="pill"
                data-testid="input-l-complete-dark"
              />
            </div>

            <div class="input-card">
              <div class="input-label">L size · Group-tittle（必填标签）</div>
              <div class="input-with-label">
                <span class="required-label"><span class="asterisk">*</span></span>
                <OInput
                  v-model="valLabelDark"
                  size="large"
                  placeholder="Hint"
                  round="pill"
                  data-testid="input-l-label-dark"
                />
              </div>
            </div>

            <div class="input-card">
              <div class="input-label">L size · Group-number（手机号前置）</div>
              <OInput
                v-model="valPhoneDark"
                size="large"
                placeholder="Hint"
                round="pill"
                data-testid="input-l-group-number-dark"
              >
                <template #prepend>
                  <span class="prepend-text">+86（中国）<span class="prepend-arrow">∨</span></span>
                </template>
              </OInput>
            </div>

            <div class="input-card">
              <div class="input-label">L size · Group-btn（验证码）</div>
              <OInput
                v-model="valCodeDark"
                size="large"
                placeholder="请输入"
                round="pill"
                data-testid="input-l-group-btn-dark"
              >
                <template #extra>
                  <OButton variant="text" size="small" color="primary">发送验证码</OButton>
                </template>
              </OInput>
            </div>

            <div class="input-card">
              <div class="input-label">L size · Error（错误状态）</div>
              <OInput
                v-model="valErrorDark"
                size="large"
                placeholder="Hint"
                round="pill"
                color="danger"
                data-testid="input-l-error-dark"
              />
            </div>
          </div>

          <!-- Dark Column B：M size -->
          <div class="input-col">
            <div class="input-card">
              <div class="input-label">M size · Enabled（空）</div>
              <OInput
                v-model="valEmptyMDark"
                size="medium"
                placeholder="Hint"
                round="pill"
                data-testid="input-m-enabled-dark"
              />
            </div>

            <div class="input-card">
              <div class="input-label">M size · Complete（有值 + 清空）</div>
              <OInput
                v-model="valFilledMDark"
                size="medium"
                placeholder="Hint"
                clearable
                round="pill"
                data-testid="input-m-complete-dark"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- ===== 搜索框 亮色 ===== -->
      <div class="theme-section" data-testid="search-row-light">
        <div class="theme-label">Light · 搜索框 Search（17:4014）</div>
        <div class="input-col search-col">

          <div class="input-card">
            <div class="input-label">L size · Enabled</div>
            <OInput v-model="searchL" size="large" placeholder="搜索" round="pill" data-testid="search-l-enabled">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">L size · Actived（有值 + 清空）</div>
            <OInput v-model="searchLActive" size="large" placeholder="搜索" round="pill" clearable data-testid="search-l-active">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">M size · Enabled</div>
            <OInput v-model="searchM" size="medium" placeholder="搜索" round="pill" data-testid="search-m-enabled">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">M size · Actived（有值 + 清空）</div>
            <OInput v-model="searchMActive" size="medium" placeholder="搜索" round="pill" clearable data-testid="search-m-active">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">S size · Enabled</div>
            <OInput v-model="searchS" size="small" placeholder="搜索" round="pill" data-testid="search-s-enabled">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">S size · Actived（有值 + 清空）</div>
            <OInput v-model="searchSActive" size="small" placeholder="搜索" round="pill" clearable data-testid="search-s-active">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">Mb size（medium + pill）· Enabled</div>
            <OInput v-model="searchMb" size="medium" placeholder="搜索" round="pill" data-testid="search-mb-enabled">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">Mb size · Actived（有值 + 清空）</div>
            <OInput v-model="searchMbActive" size="medium" placeholder="搜索" round="pill" clearable data-testid="search-mb-active">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>
        </div>
      </div>

      <!-- ===== 搜索框 暗色 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="search-row-dark">
        <div class="theme-label">Dark · 搜索框 Search</div>
        <div class="input-col search-col">

          <div class="input-card">
            <div class="input-label">L size · Enabled</div>
            <OInput v-model="searchLDark" size="large" placeholder="搜索" round="pill" data-testid="search-l-enabled-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">L size · Actived（有值 + 清空）</div>
            <OInput v-model="searchLActiveDark" size="large" placeholder="搜索" round="pill" clearable data-testid="search-l-active-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">M size · Enabled</div>
            <OInput v-model="searchMDark" size="medium" placeholder="搜索" round="pill" data-testid="search-m-enabled-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">M size · Actived（有值 + 清空）</div>
            <OInput v-model="searchMActiveDark" size="medium" placeholder="搜索" round="pill" clearable data-testid="search-m-active-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">S size · Enabled</div>
            <OInput v-model="searchSDark" size="small" placeholder="搜索" round="pill" data-testid="search-s-enabled-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">S size · Actived（有值 + 清空）</div>
            <OInput v-model="searchSActiveDark" size="small" placeholder="搜索" round="pill" clearable data-testid="search-s-active-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">Mb size · Enabled</div>
            <OInput v-model="searchMbDark" size="medium" placeholder="搜索" round="pill" data-testid="search-mb-enabled-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
          </div>

          <div class="input-card">
            <div class="input-label">Mb size · Actived（有值 + 清空）</div>
            <OInput v-model="searchMbActiveDark" size="medium" placeholder="搜索" round="pill" clearable data-testid="search-mb-active-dark">
              <template #prefix><OIconSearch /></template>
            </OInput>
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

// ---- 列布局 ----
.input-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

.input-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
  min-width: 0;
}

.search-col {
  max-width: 420px;
}

// ---- Demo 卡片 ----
.input-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

// ---- 标签 ----
.input-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 必填标签行 ----
.input-with-label {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-3);
}

.required-label {
  @include text1;
  color: var(--o-color-info2);
  white-space: nowrap;
  flex-shrink: 0;
}

.asterisk {
  color: var(--o-color-danger1);
  margin-right: 2px;
}

// ---- Prepend 文本 ----
.prepend-text {
  @include tip1;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  padding: 0 var(--o-r-gap-3);
}

.prepend-arrow {
  font-size: 0.75em;
}
</style>
