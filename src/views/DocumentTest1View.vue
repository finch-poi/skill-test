<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import DocSidebar from '@/components/document-test-1/DocSidebar.vue'
import DocContent from '@/components/document-test-1/DocContent.vue'
</script>

<template>
  <div class="document-test-1">
    <AppHeader />

    <div class="page-body">
      <DocSidebar />
      <DocContent />
    </div>

    <AppFooter />
  </div>
</template>

<style lang="scss" scoped>
.document-test-1 {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--o-color-fill2);
}

.page-body {
  display: flex;
  flex: 1;
  align-items: stretch;
  overflow: hidden;
}
</style>
