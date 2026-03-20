<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

let globalId = 0;
export default defineComponent({
  name: 'AppIconCopy',
  svgType: 'fill',
  setup() {
    const classNames = ['o-svg-icon', 'app-icon-copy', 'type-fill'];
    const isClient = ref(false);
    onMounted(() => {
      isClient.value = true;
    });
    return {
      isClient,
      classNames,
      globalId: globalId++,
    };
  },
});
</script>
<template>
  <svg viewBox="0 0 24 24" :class="classNames">
    <template v-if="isClient">
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"/>
    </template>
  </svg>
</template>