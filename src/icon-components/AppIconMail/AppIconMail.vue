<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

let globalId = 0;
export default defineComponent({
  name: 'AppIconMail',
  svgType: 'fill',
  setup() {
    const classNames = ['o-svg-icon', 'app-icon-mail', 'type-fill'];
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
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z"/>
    </template>
  </svg>
</template>