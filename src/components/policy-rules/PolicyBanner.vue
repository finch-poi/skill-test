<script setup lang="ts">
import { OButton } from '@opensig/opendesign'
</script>

<template>
  <section class="policy-banner">
    <div class="banner-inner">
      <div class="banner-content">
        <h1 class="banner-title">政策规则</h1>
        <p class="banner-desc">
          openUBMC社区以开放治理为核心，通过选举产生的技术委员会主导技术决策、通过透明流程运作、开放技术氛围，保障技术路线公正性和前瞻性。社区倡导「贡献即话语权」，任何开发者均可通过贡献积累晋升为项目维护者或参与技术委员，共同定义openUBMC社区的方向。
        </p>
        <OButton variant="solid" color="primary" class="banner-btn">
          查看更多
          <span class="btn-arrow">▾</span>
        </OButton>
      </div>

      <div class="banner-illustration" aria-hidden="true">
        <div class="illus-card">
          <div class="illus-stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= 4 }">★</span>
          </div>
          <div class="illus-line" />
          <div class="illus-line short" />
          <div class="illus-line" />
          <div class="illus-line short" />
        </div>
        <div class="illus-blob" />
        <div class="illus-dot d1" />
        <div class="illus-dot d2" />
        <div class="illus-dot d3" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.policy-banner {
  background: linear-gradient(135deg, #e8f4ff 0%, #d0e8ff 60%, #c2dcf8 100%);
  padding: 48px 0 40px;
}

.banner-inner {
  max-width: 1416px;
  margin: 0 auto;
  padding: 0 var(--o-gap-7, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--o-gap-8, 48px);
}

.banner-content {
  flex: 1;
  max-width: 600px;
}

.banner-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--o-color-info1);
  line-height: 1.2;
  margin: 0 0 var(--o-gap-4) 0;
}

.banner-desc {
  font-size: var(--o-font_size-text1);
  color: var(--o-color-info2);
  line-height: var(--o-line_height-text1, 1.7);
  margin: 0 0 var(--o-gap-5) 0;
}

.banner-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--o-gap-1);
}

.btn-arrow {
  font-size: 12px;
}

/* 装饰插画 */
.banner-illustration {
  flex-shrink: 0;
  width: 280px;
  height: 180px;
  position: relative;
}

.illus-blob {
  position: absolute;
  right: 0;
  top: 10px;
  width: 200px;
  height: 160px;
  background: linear-gradient(135deg, #4096ff40 0%, #1677ff30 100%);
  border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
}

.illus-card {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 160px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 24px #1677ff22;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.illus-stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #d9d9d9;
  font-size: 14px;
}

.star.filled {
  color: #faad14;
}

.illus-line {
  height: 8px;
  background: #e8f0fe;
  border-radius: 4px;
}

.illus-line.short {
  width: 60%;
  background: #c5d8f8;
}

.illus-dot {
  position: absolute;
  border-radius: 50%;
}

.d1 {
  width: 14px;
  height: 14px;
  background: #1677ff;
  top: 12px;
  right: 30px;
  opacity: 0.7;
}

.d2 {
  width: 8px;
  height: 8px;
  background: #69b1ff;
  bottom: 28px;
  right: 60px;
  opacity: 0.6;
}

.d3 {
  width: 10px;
  height: 10px;
  background: #91caff;
  bottom: 10px;
  right: 20px;
  opacity: 0.5;
}
</style>
