<script setup lang="ts">
import { OStep, OStepItem } from '@opensig/opendesign'
</script>

<template>
  <div class="floor-step">
    <OStep class="step-bar" direction="h">
      <OStepItem :step-index="0" title="已完成的步骤" status="finished" />
      <OStepItem :step-index="1" title="进行中的步骤" status="processing" />
      <OStepItem :step-index="2" title="未开始的步骤" status="waiting" />
    </OStep>
  </div>
</template>

<style lang="scss" scoped>
.floor-step {
  padding: var(--o-r-gap-5) 0;
}

.step-bar {
  max-width: var(--o-r-grid-8);
  margin: 0 auto;
}
</style>
