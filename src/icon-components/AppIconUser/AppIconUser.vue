<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

let globalId = 0;
export default defineComponent({
  name: 'AppIconUser',
  svgType: 'fill',
  setup() {
    const classNames = ['o-svg-icon', 'app-icon-user', 'type-fill'];
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
      <path d="M0 0h24v24H0z" class="user_svg__icon/01公共图标/鲲鹏/24px/人"/><g class="user_svg__编组 user_svg__13"><path d="M0 0h24v24H0z" class="user_svg__矩形"/><path d="M.5.5h23v23H.5z" class="user_svg__矩形"/><path fill-opacity=".8" fill-rule="evenodd" d="M7.06 7.748a4.942 4.942 0 1 1 4.784 4.94c-4.232.08-7.63 3.435-7.63 7.554a.7.7 0 1 1-1.4 0c0-3.96 2.632-7.313 6.279-8.498A4.94 4.94 0 0 1 7.06 7.748m5.007 3.542-.069-.004-.14.001a3.542 3.542 0 1 1 .21.003m4.274 1.058c2.959 1.548 4.847 4.558 4.847 7.896a.7.7 0 0 1-1.4 0c0-2.808-1.592-5.345-4.096-6.655a.7.7 0 1 1 .649-1.24" class="user_svg__形状结合"/></g>
    </template>
  </svg>
</template>