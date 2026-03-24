<script setup lang="ts">
// 设计稿 ID：17:4339（Pixso item-id，评分）
import { ref } from 'vue'
import { ORate } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'

// 可交互评分（Enabled → 选完后变 Complete）
const scoreLight = ref(0)
const scoreDark = ref(0)

// 只读展示（Complete 状态固定值）
const readonlyScore = 4
</script>

<template>
  <AppSection
    title="ORate 评分"
    subtitle="设计稿 ID：17:4339 · 覆盖 Complete/Enabled/Pressed × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="rate-row-light">
        <div class="theme-label">Light</div>

        <div class="rate-grid">

          <!-- Complete 状态：只读展示 4.0 分 -->
          <div class="rate-card">
            <div class="rate-card-label">Complete（只读展示 4.0）</div>
            <div class="rate-row">
              <ORate
                :default-value="readonlyScore"
                readonly
                size="medium"
                data-testid="rate-complete-light"
              />
              <span class="rate-score">4.0</span>
              <button class="rate-btn" type="button">
                <span class="rate-btn-emoji">😊</span>
                我要评分
              </button>
            </div>
          </div>

          <!-- Enabled 状态：可交互，初始 0 分 -->
          <div class="rate-card">
            <div class="rate-card-label">Enabled（可交互）</div>
            <div class="rate-row">
              <ORate
                v-model="scoreLight"
                size="medium"
                data-testid="rate-enabled-light"
              />
              <span class="rate-score rate-score--empty">暂无评分</span>
              <button class="rate-btn" type="button">
                <span class="rate-btn-emoji">😊</span>
                我要评分
              </button>
            </div>
          </div>

          <!-- Pressed 状态：5 颗小星一行展示（medium size，评分进行中） -->
          <div class="rate-card">
            <div class="rate-card-label">Pressed（评分中 1 分）</div>
            <div class="rate-row">
              <ORate
                :default-value="1"
                size="medium"
                data-testid="rate-pressed-light"
              />
            </div>
          </div>

          <!-- 额外：large size / half star / clearable -->
          <div class="rate-card">
            <div class="rate-card-label">Large + 半星 + 可清空</div>
            <div class="rate-row">
              <ORate
                :default-value="2.5"
                size="large"
                allow-half
                clearable
                data-testid="rate-half-light"
              />
            </div>
          </div>

          <!-- 各颜色展示 -->
          <div class="rate-card">
            <div class="rate-card-label">颜色变体（primary / success / warning / danger）</div>
            <div class="rate-colors">
              <ORate :default-value="3" readonly size="medium" color="primary" data-testid="rate-color-primary-light" />
              <ORate :default-value="3" readonly size="medium" color="success" data-testid="rate-color-success-light" />
              <ORate :default-value="3" readonly size="medium" color="warning" data-testid="rate-color-warning-light" />
              <ORate :default-value="3" readonly size="medium" color="danger" data-testid="rate-color-danger-light" />
            </div>
          </div>

          <!-- 带文字提示 -->
          <div class="rate-card">
            <div class="rate-card-label">带文字提示 labels</div>
            <div class="rate-row">
              <ORate
                :default-value="3"
                size="large"
                color="primary"
                :labels="['非常不满意', '不满意', '一般', '满意', '非常满意']"
                data-testid="rate-labels-light"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark"
           data-testid="rate-row-dark">
        <div class="theme-label">Dark</div>

        <div class="rate-grid">

          <!-- Complete 状态：只读展示 4.0 分 -->
          <div class="rate-card">
            <div class="rate-card-label">Complete（只读展示 4.0）</div>
            <div class="rate-row">
              <ORate
                :default-value="readonlyScore"
                readonly
                size="medium"
                data-testid="rate-complete-dark"
              />
              <span class="rate-score">4.0</span>
              <button class="rate-btn" type="button">
                <span class="rate-btn-emoji">😊</span>
                我要评分
              </button>
            </div>
          </div>

          <!-- Enabled 状态：可交互，初始 0 分 -->
          <div class="rate-card">
            <div class="rate-card-label">Enabled（可交互）</div>
            <div class="rate-row">
              <ORate
                v-model="scoreDark"
                size="medium"
                data-testid="rate-enabled-dark"
              />
              <span class="rate-score rate-score--empty">暂无评分</span>
              <button class="rate-btn" type="button">
                <span class="rate-btn-emoji">😊</span>
                我要评分
              </button>
            </div>
          </div>

          <!-- Pressed 状态 -->
          <div class="rate-card">
            <div class="rate-card-label">Pressed（评分中 1 分）</div>
            <div class="rate-row">
              <ORate
                :default-value="1"
                size="medium"
                data-testid="rate-pressed-dark"
              />
            </div>
          </div>

          <!-- Large + half star -->
          <div class="rate-card">
            <div class="rate-card-label">Large + 半星 + 可清空</div>
            <div class="rate-row">
              <ORate
                :default-value="2.5"
                size="large"
                allow-half
                clearable
                data-testid="rate-half-dark"
              />
            </div>
          </div>

          <!-- 各颜色展示 -->
          <div class="rate-card">
            <div class="rate-card-label">颜色变体（primary / success / warning / danger）</div>
            <div class="rate-colors">
              <ORate :default-value="3" readonly size="medium" color="primary" data-testid="rate-color-primary-dark" />
              <ORate :default-value="3" readonly size="medium" color="success" data-testid="rate-color-success-dark" />
              <ORate :default-value="3" readonly size="medium" color="warning" data-testid="rate-color-warning-dark" />
              <ORate :default-value="3" readonly size="medium" color="danger" data-testid="rate-color-danger-dark" />
            </div>
          </div>

          <!-- 带文字提示 -->
          <div class="rate-card">
            <div class="rate-card-label">带文字提示 labels</div>
            <div class="rate-row">
              <ORate
                :default-value="3"
                size="large"
                color="primary"
                :labels="['非常不满意', '不满意', '一般', '满意', '非常满意']"
                data-testid="rate-labels-dark"
              />
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

// ---- 卡片网格 ----
.rate-grid {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.rate-card {
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}

.rate-card-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 评分行（星 + 分值 + 按钮） ----
.rate-row {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-4);
  flex-wrap: wrap;
}

.rate-score {
  @include text2;
  color: var(--o-color-info2);
}

.rate-score--empty {
  color: var(--o-color-info3);
}

// 简单文字按钮模拟设计稿中的"我要评分"
.rate-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--o-color-info2);
  @include text2;

  &:hover {
    color: var(--o-color-info1);
  }
}

.rate-btn-emoji {
  font-size: 1em;
}

// ---- 颜色变体行 ----
.rate-colors {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-3);
}
</style>
