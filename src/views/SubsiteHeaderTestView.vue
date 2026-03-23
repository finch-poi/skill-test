<script setup lang="ts">
import AppHeaderSubSite from '@/components/AppHeaderSubSite.vue'
</script>

<template>
  <div class="subsite-header-test-page">
    <AppHeaderSubSite />
    <main class="page-content">
      <p>子站导航测试页面</p>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.subsite-header-test-page {
  min-height: 100vh;
  background: var(--o-color-fill1);
}

.page-content {
  padding: var(--o-r-gap-7);
  @include text1;
  color: var(--o-color-info2);
}
</style>
