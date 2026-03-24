<script setup lang="ts">
// 设计稿 ID：206:8000（Pixso item-id，头像）
import AppSection from '@/components/AppSection.vue'
import AppIconUser from '@/icon-components/AppIconUser/AppIconUser.vue'
import { OIconAscend } from '@opensig/opendesign'
</script>

<template>
  <AppSection
    title="Avatar 头像"
    subtitle="设计稿 ID：206:8000 · 覆盖 尺寸/形状/类型 × 亮/暗"
    :header-justify-center="false"
  >
    <div class="floor-body">

      <!-- ===== 亮色主题 ===== -->
      <div class="theme-section" data-testid="avatar-row-light">
        <div class="theme-label">Light</div>

        <!-- Row 1: 不同尺寸 icon 头像 -->
        <div class="avatar-group">
          <div class="group-label">图标头像 · 尺寸变体</div>
          <div class="avatar-row">
            <div class="avatar-item">
              <div class="avatar avatar--xl avatar--circle avatar--default" data-testid="avatar-xl-light">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">XL 80px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--lg avatar--circle avatar--default" data-testid="avatar-lg-light">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">L 64px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--default" data-testid="avatar-md-light">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">M 48px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--sm avatar--circle avatar--default" data-testid="avatar-sm-light">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">S 36px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--xs avatar--circle avatar--default" data-testid="avatar-xs-light">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">XS 24px</span>
            </div>
          </div>
        </div>

        <!-- Row 2: 文字头像 -->
        <div class="avatar-group">
          <div class="group-label">文字头像 · 尺寸变体</div>
          <div class="avatar-row">
            <div class="avatar-item">
              <div class="avatar avatar--xl avatar--circle avatar--primary" data-testid="avatar-text-xl-light">
                <span class="avatar-text">A</span>
              </div>
              <span class="avatar-size-label">XL</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--lg avatar--circle avatar--primary">
                <span class="avatar-text">AB</span>
              </div>
              <span class="avatar-size-label">L</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--primary">
                <span class="avatar-text">AB</span>
              </div>
              <span class="avatar-size-label">M</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--sm avatar--circle avatar--primary">
                <span class="avatar-text">A</span>
              </div>
              <span class="avatar-size-label">S</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--xs avatar--circle avatar--primary">
                <span class="avatar-text">A</span>
              </div>
              <span class="avatar-size-label">XS</span>
            </div>
          </div>
        </div>

        <!-- Row 3: 形状变体 + 颜色变体 -->
        <div class="avatar-group">
          <div class="group-label">形状 × 颜色变体</div>
          <div class="avatar-row">
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--default" data-testid="avatar-circle-light">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">圆形</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--square avatar--default" data-testid="avatar-square-light">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">方形</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--primary" data-testid="avatar-primary-light">
                <span class="avatar-text">P</span>
              </div>
              <span class="avatar-size-label">Primary</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--success" data-testid="avatar-success-light">
                <span class="avatar-text">S</span>
              </div>
              <span class="avatar-size-label">Success</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--warning" data-testid="avatar-warning-light">
                <span class="avatar-text">W</span>
              </div>
              <span class="avatar-size-label">Warning</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--danger" data-testid="avatar-danger-light">
                <span class="avatar-text">D</span>
              </div>
              <span class="avatar-size-label">Danger</span>
            </div>
          </div>
        </div>

        <!-- Row 4: 图片头像 + 头像组 -->
        <div class="avatar-group">
          <div class="group-label">图片头像 · 头像组</div>
          <div class="avatar-row" style="align-items: center; gap: var(--o-r-gap-7);">
            <!-- 图片头像 -->
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--img" data-testid="avatar-img-light">
                <img
                  src="https://avatars.githubusercontent.com/u/1?v=4"
                  alt="User Avatar"
                  class="avatar-img"
                  @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                />
                <AppIconUser class="avatar-icon avatar-icon--fallback" />
              </div>
              <span class="avatar-size-label">图片</span>
            </div>

            <!-- 头像组叠加 -->
            <div class="avatar-item">
              <div class="avatar-group-stack" data-testid="avatar-group-light">
                <div class="avatar avatar--sm avatar--circle avatar--primary avatar-stack">
                  <span class="avatar-text">A</span>
                </div>
                <div class="avatar avatar--sm avatar--circle avatar--success avatar-stack">
                  <span class="avatar-text">B</span>
                </div>
                <div class="avatar avatar--sm avatar--circle avatar--warning avatar-stack">
                  <span class="avatar-text">C</span>
                </div>
                <div class="avatar avatar--sm avatar--circle avatar--default avatar-stack">
                  <span class="avatar-text">+3</span>
                </div>
              </div>
              <span class="avatar-size-label">头像组</span>
            </div>

            <!-- 带徽标的头像 -->
            <div class="avatar-item">
              <div class="avatar-with-badge" data-testid="avatar-badge-light">
                <div class="avatar avatar--md avatar--circle avatar--primary">
                  <span class="avatar-text">U</span>
                </div>
                <span class="avatar-badge avatar-badge--online"></span>
              </div>
              <span class="avatar-size-label">在线状态</span>
            </div>

            <!-- 带徽标的头像（忙碌） -->
            <div class="avatar-item">
              <div class="avatar-with-badge">
                <div class="avatar avatar--md avatar--circle avatar--default">
                  <AppIconUser class="avatar-icon" />
                </div>
                <span class="avatar-badge avatar-badge--busy"></span>
              </div>
              <span class="avatar-size-label">忙碌状态</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== 暗色主题 ===== -->
      <div class="theme-section theme-section--dark" data-o-theme="e.dark" data-testid="avatar-row-dark">
        <div class="theme-label">Dark</div>

        <!-- Row 1: 不同尺寸 icon 头像 (Dark) -->
        <div class="avatar-group">
          <div class="group-label">图标头像 · 尺寸变体</div>
          <div class="avatar-row">
            <div class="avatar-item">
              <div class="avatar avatar--xl avatar--circle avatar--default" data-testid="avatar-xl-dark">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">XL 80px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--lg avatar--circle avatar--default" data-testid="avatar-lg-dark">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">L 64px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--default" data-testid="avatar-md-dark">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">M 48px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--sm avatar--circle avatar--default" data-testid="avatar-sm-dark">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">S 36px</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--xs avatar--circle avatar--default" data-testid="avatar-xs-dark">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">XS 24px</span>
            </div>
          </div>
        </div>

        <!-- Row 2: 文字头像 (Dark) -->
        <div class="avatar-group">
          <div class="group-label">文字头像 · 尺寸变体</div>
          <div class="avatar-row">
            <div class="avatar-item">
              <div class="avatar avatar--xl avatar--circle avatar--primary" data-testid="avatar-text-xl-dark">
                <span class="avatar-text">A</span>
              </div>
              <span class="avatar-size-label">XL</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--lg avatar--circle avatar--primary">
                <span class="avatar-text">AB</span>
              </div>
              <span class="avatar-size-label">L</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--primary">
                <span class="avatar-text">AB</span>
              </div>
              <span class="avatar-size-label">M</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--sm avatar--circle avatar--primary">
                <span class="avatar-text">A</span>
              </div>
              <span class="avatar-size-label">S</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--xs avatar--circle avatar--primary">
                <span class="avatar-text">A</span>
              </div>
              <span class="avatar-size-label">XS</span>
            </div>
          </div>
        </div>

        <!-- Row 3: 形状变体 + 颜色变体 (Dark) -->
        <div class="avatar-group">
          <div class="group-label">形状 × 颜色变体</div>
          <div class="avatar-row">
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--default" data-testid="avatar-circle-dark">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">圆形</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--square avatar--default" data-testid="avatar-square-dark">
                <AppIconUser class="avatar-icon" />
              </div>
              <span class="avatar-size-label">方形</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--primary" data-testid="avatar-primary-dark">
                <span class="avatar-text">P</span>
              </div>
              <span class="avatar-size-label">Primary</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--success" data-testid="avatar-success-dark">
                <span class="avatar-text">S</span>
              </div>
              <span class="avatar-size-label">Success</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--warning" data-testid="avatar-warning-dark">
                <span class="avatar-text">W</span>
              </div>
              <span class="avatar-size-label">Warning</span>
            </div>
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--danger" data-testid="avatar-danger-dark">
                <span class="avatar-text">D</span>
              </div>
              <span class="avatar-size-label">Danger</span>
            </div>
          </div>
        </div>

        <!-- Row 4: 图片头像 + 头像组 (Dark) -->
        <div class="avatar-group">
          <div class="group-label">图片头像 · 头像组</div>
          <div class="avatar-row" style="align-items: center; gap: var(--o-r-gap-7);">
            <div class="avatar-item">
              <div class="avatar avatar--md avatar--circle avatar--img" data-testid="avatar-img-dark">
                <img
                  src="https://avatars.githubusercontent.com/u/1?v=4"
                  alt="User Avatar"
                  class="avatar-img"
                  @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
                />
                <AppIconUser class="avatar-icon avatar-icon--fallback" />
              </div>
              <span class="avatar-size-label">图片</span>
            </div>

            <div class="avatar-item">
              <div class="avatar-group-stack" data-testid="avatar-group-dark">
                <div class="avatar avatar--sm avatar--circle avatar--primary avatar-stack">
                  <span class="avatar-text">A</span>
                </div>
                <div class="avatar avatar--sm avatar--circle avatar--success avatar-stack">
                  <span class="avatar-text">B</span>
                </div>
                <div class="avatar avatar--sm avatar--circle avatar--warning avatar-stack">
                  <span class="avatar-text">C</span>
                </div>
                <div class="avatar avatar--sm avatar--circle avatar--default avatar-stack">
                  <span class="avatar-text">+3</span>
                </div>
              </div>
              <span class="avatar-size-label">头像组</span>
            </div>

            <div class="avatar-item">
              <div class="avatar-with-badge" data-testid="avatar-badge-dark">
                <div class="avatar avatar--md avatar--circle avatar--primary">
                  <span class="avatar-text">U</span>
                </div>
                <span class="avatar-badge avatar-badge--online"></span>
              </div>
              <span class="avatar-size-label">在线状态</span>
            </div>

            <div class="avatar-item">
              <div class="avatar-with-badge">
                <div class="avatar avatar--md avatar--circle avatar--default">
                  <AppIconUser class="avatar-icon" />
                </div>
                <span class="avatar-badge avatar-badge--busy"></span>
              </div>
              <span class="avatar-size-label">忙碌状态</span>
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

// ---- 头像分组 ----
.avatar-group {
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-4);
}

.group-label {
  @include tip1;
  color: var(--o-color-info3);
}

.avatar-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--o-r-gap-5);
}

.avatar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--o-r-gap-2);
}

.avatar-size-label {
  @include tip2;
  color: var(--o-color-info3);
}

// ---- Avatar 基础样式 ----
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  user-select: none;

  // 尺寸变体
  &--xl {
    width: 80px;
    height: 80px;
  }

  &--lg {
    width: 64px;
    height: 64px;
  }

  &--md {
    width: 48px;
    height: 48px;
  }

  &--sm {
    width: 36px;
    height: 36px;
  }

  &--xs {
    width: 24px;
    height: 24px;
  }

  // 形状变体
  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: var(--o-radius-m);
  }

  // 颜色变体
  &--default {
    background: var(--o-color-control4-light);
    color: var(--o-color-info2);
  }

  &--primary {
    background: var(--o-color-primary1);
    color: #fff;
  }

  &--success {
    background: var(--o-color-success1);
    color: #fff;
  }

  &--warning {
    background: var(--o-color-warning1);
    color: #fff;
  }

  &--danger {
    background: var(--o-color-danger1);
    color: #fff;
  }

  &--img {
    background: var(--o-color-control4-light);
  }
}

// ---- 图标 ----
.avatar-icon {
  width: 60%;
  height: 60%;
  color: var(--o-color-info2);
}

.avatar-icon--fallback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// ---- 文字 ----
.avatar-text {
  @include tip1;
  font-weight: 600;
  color: inherit;
  line-height: 1;
  pointer-events: none;
}

// xl/lg 文字稍大
.avatar--xl .avatar-text,
.avatar--lg .avatar-text {
  @include text2;
  font-weight: 600;
  color: inherit;
}

// ---- 图片 ----
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  position: relative;
  z-index: 1;
}

// ---- 头像组叠加 ----
.avatar-group-stack {
  display: flex;
  flex-direction: row;

  .avatar-stack {
    margin-left: -8px;
    border: 2px solid var(--o-color-fill2);
    box-sizing: border-box;

    &:first-child {
      margin-left: 0;
    }
  }
}

.theme-section--dark .avatar-group-stack .avatar-stack {
  border-color: #1f2127;
}

// ---- 头像带徽标 ----
.avatar-with-badge {
  position: relative;
  display: inline-flex;
}

.avatar-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--o-color-fill2);
  box-sizing: border-box;

  &--online {
    background: var(--o-color-success1);
  }

  &--busy {
    background: var(--o-color-warning1);
  }
}

.theme-section--dark .avatar-badge {
  border-color: #1f2127;
}
</style>
