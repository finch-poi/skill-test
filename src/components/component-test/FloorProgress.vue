<script setup lang="ts">
// 设计稿 ID：16:4574（Pixso item-id，进度条）
import { OProgress, OIconDone, OIconClose } from '@opensig/opendesign'
import AppSection from '@/components/AppSection.vue'
</script>

<template>
  <AppSection
    title="OProgress 进度条"
    subtitle="设计稿 ID：16:4574 · 覆盖 line/circle × primary/success/warning/danger × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">
      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="progress-row-light">
        <div class="theme-label">Light</div>

        <!-- Line variant -->
        <div class="progress-group">
          <div class="group-label">线形进度条（line）</div>
          <div class="progress-row">
            <div class="progress-card">
              <div class="card-label">Primary · 30%</div>
              <OProgress
                :percentage="30"
                color="primary"
                data-testid="progress-line-primary-light"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Success · 60%</div>
              <OProgress
                :percentage="60"
                color="success"
                data-testid="progress-line-success-light"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Warning · 80%</div>
              <OProgress
                :percentage="80"
                color="warning"
                data-testid="progress-line-warning-light"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Danger · 100%</div>
              <OProgress
                :percentage="100"
                color="danger"
                data-testid="progress-line-danger-light"
              />
            </div>
          </div>
        </div>

        <!-- Small size -->
        <div class="progress-group">
          <div class="group-label">小号线形（size="small"）</div>
          <div class="progress-row">
            <div class="progress-card">
              <div class="card-label">Primary · 45%</div>
              <OProgress
                :percentage="45"
                size="small"
                color="primary"
                data-testid="progress-line-small-primary-light"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Success · 75%</div>
              <OProgress
                :percentage="75"
                size="small"
                color="success"
                data-testid="progress-line-small-success-light"
              />
            </div>
          </div>
        </div>

        <!-- Circle variant -->
        <div class="progress-group">
          <div class="group-label">环形进度条（circle）</div>
          <div class="progress-row">
            <div class="progress-card progress-card--center">
              <div class="card-label">Primary · 25%</div>
              <OProgress
                variant="circle"
                :percentage="25"
                color="primary"
                data-testid="progress-circle-primary-light"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Success · 70%</div>
              <OProgress
                variant="circle"
                :percentage="70"
                color="success"
                data-testid="progress-circle-success-light"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Warning · 90%</div>
              <OProgress
                variant="circle"
                :percentage="90"
                color="warning"
                data-testid="progress-circle-warning-light"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Danger · 100%</div>
              <OProgress
                variant="circle"
                :percentage="100"
                color="danger"
                data-testid="progress-circle-danger-light"
              >
                <template #icon>
                  <OIconDone class="progress-icon progress-icon--success" />
                </template>
              </OProgress>
            </div>
          </div>
        </div>

        <!-- Circle small -->
        <div class="progress-group">
          <div class="group-label">小环形（size="small"）</div>
          <div class="progress-row">
            <div class="progress-card progress-card--center">
              <div class="card-label">Primary · 40%</div>
              <OProgress
                variant="circle"
                :percentage="40"
                size="small"
                color="primary"
                data-testid="progress-circle-small-primary-light"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Danger · 100%</div>
              <OProgress
                variant="circle"
                :percentage="100"
                size="small"
                color="danger"
                data-testid="progress-circle-small-danger-light"
              >
                <template #icon>
                  <OIconClose class="progress-icon progress-icon--danger" />
                </template>
              </OProgress>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div
        class="theme-section theme-section--dark"
        data-o-theme="e.dark"
        data-testid="progress-row-dark"
      >
        <div class="theme-label">Dark</div>

        <!-- Line variant Dark -->
        <div class="progress-group">
          <div class="group-label">线形进度条</div>
          <div class="progress-row">
            <div class="progress-card">
              <div class="card-label">Primary · 30%</div>
              <OProgress
                :percentage="30"
                color="primary"
                data-testid="progress-line-primary-dark"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Success · 60%</div>
              <OProgress
                :percentage="60"
                color="success"
                data-testid="progress-line-success-dark"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Warning · 80%</div>
              <OProgress
                :percentage="80"
                color="warning"
                data-testid="progress-line-warning-dark"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Danger · 100%</div>
              <OProgress :percentage="100" color="danger" data-testid="progress-line-danger-dark" />
            </div>
          </div>
        </div>

        <!-- Small size Dark -->
        <div class="progress-group">
          <div class="group-label">小号线形</div>
          <div class="progress-row">
            <div class="progress-card">
              <div class="card-label">Primary · 45%</div>
              <OProgress
                :percentage="45"
                size="small"
                color="primary"
                data-testid="progress-line-small-primary-dark"
              />
            </div>

            <div class="progress-card">
              <div class="card-label">Success · 75%</div>
              <OProgress
                :percentage="75"
                size="small"
                color="success"
                data-testid="progress-line-small-success-dark"
              />
            </div>
          </div>
        </div>

        <!-- Circle variant Dark -->
        <div class="progress-group">
          <div class="group-label">环形进度条</div>
          <div class="progress-row">
            <div class="progress-card progress-card--center">
              <div class="card-label">Primary · 25%</div>
              <OProgress
                variant="circle"
                :percentage="25"
                color="primary"
                data-testid="progress-circle-primary-dark"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Success · 70%</div>
              <OProgress
                variant="circle"
                :percentage="70"
                color="success"
                data-testid="progress-circle-success-dark"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Warning · 90%</div>
              <OProgress
                variant="circle"
                :percentage="90"
                color="warning"
                data-testid="progress-circle-warning-dark"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Danger · 100%</div>
              <OProgress
                variant="circle"
                :percentage="100"
                color="danger"
                data-testid="progress-circle-danger-dark"
              >
                <template #icon>
                  <OIconDone class="progress-icon progress-icon--success" />
                </template>
              </OProgress>
            </div>
          </div>
        </div>

        <!-- Circle small Dark -->
        <div class="progress-group">
          <div class="group-label">小环形</div>
          <div class="progress-row">
            <div class="progress-card progress-card--center">
              <div class="card-label">Primary · 40%</div>
              <OProgress
                variant="circle"
                :percentage="40"
                size="small"
                color="primary"
                data-testid="progress-circle-small-primary-dark"
              />
            </div>

            <div class="progress-card progress-card--center">
              <div class="card-label">Danger · 100%</div>
              <OProgress
                variant="circle"
                :percentage="100"
                size="small"
                color="danger"
                data-testid="progress-circle-small-danger-dark"
              >
                <template #icon>
                  <OIconClose class="progress-icon progress-icon--danger" />
                </template>
              </OProgress>
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

// ---- 分组 ----
.progress-group {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.group-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 行布局 ----
.progress-row {
  display: flex;
  gap: var(--o-r-gap-5);
  align-items: flex-start;
  flex-wrap: wrap;

  @include respond('<=pad') {
    flex-direction: column;
  }
}

// ---- 卡片 ----
.progress-card {
  flex: 1;
  min-width: 200px;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-m);
  padding: var(--o-r-gap-5);
  box-shadow: var(--o-shadow-1);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.progress-card--center {
  align-items: center;
}

.card-label {
  @include tip1;
  font-weight: 600;
  color: var(--o-color-info3);
}

// ---- 环形图标 ----
.progress-icon {
  width: 24px;
  height: 24px;
}

.progress-icon--success {
  color: var(--o-color-success1);
}

.progress-icon--danger {
  color: var(--o-color-danger1);
}
</style>
