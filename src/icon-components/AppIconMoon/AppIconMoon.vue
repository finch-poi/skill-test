<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

let globalId = 0;
export default defineComponent({
  name: 'AppIconMoon',
  svgType: 'fill',
  setup() {
    const classNames = ['o-svg-icon', 'app-icon-moon', 'type-fill'];
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
      <path d="M0 0h24v24H0z" class="moon_svg__icon/01公共图标/鲲鹏/24px/人备份"/><g class="moon_svg__编组 moon_svg__88"><path d="M0 0h24v24H0z" class="moon_svg__矩形"/><path d="M.5.5h23v23H.5z" class="moon_svg__矩形"/><path fill-opacity=".8" fill-rule="evenodd" d="M12 2.3q-.655 0-1.293.086a.7.7 0 0 0-.486 1.086 6.3 6.3 0 0 1-6.866 9.61.7.7 0 0 0-.87.812 9.7 9.7 0 0 0 9.516 7.806c5.357 0 9.7-4.343 9.7-9.7S17.358 2.3 12 2.3m0 1.4h-.043l.058.122c.402.888.635 1.85.677 2.845L12.7 7a7.7 7.7 0 0 1-8.382 7.67l-.186-.021.076.217a8.31 8.31 0 0 0 7.528 5.43l.264.004a8.3 8.3 0 1 0 0-16.6" class="moon_svg__形状结合"/></g>
    </template>
  </svg>
</template>