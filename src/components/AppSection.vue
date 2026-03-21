<script setup lang="ts">
interface AppSectionPropsT {
  title?: string | string[]
  subtitle?: string
  /** 全宽模式：section-wrapper 不加 padding，适合背景延伸到视口边缘的楼层 */
  full?: boolean
  /** 标题/副标题是否居中（默认 true） */
  headerJustifyCenter?: boolean
}

const props = withDefaults(defineProps<AppSectionPropsT>(), {
  title: undefined,
  subtitle: undefined,
  full: false,
  headerJustifyCenter: true,
})
</script>

<template>
  <div class="app-section" :class="{ 'is-full': props.full }">
    <div class="section-wrapper">
      <slot name="main">
        <!-- header：有 title / subtitle / header 插槽时才渲染 -->
        <div
          v-if="$slots.header || props.title || props.subtitle"
          class="section-header"
          :class="{ 'is-left': !props.headerJustifyCenter }"
        >
          <slot name="header">
            <template v-if="Array.isArray(props.title)">
              <h2 v-for="item in props.title" :key="item" class="section-title">{{ item }}</h2>
            </template>
            <h2 v-else-if="$slots.title || props.title" class="section-title">
              <slot name="title">{{ props.title }}</slot>
            </h2>
            <p v-if="$slots.subtitle || props.subtitle" class="section-subtitle">
              <slot name="subtitle">{{ props.subtitle }}</slot>
            </p>
          </slot>
        </div>

        <!-- body -->
        <div v-if="$slots.default" class="section-body">
          <slot></slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-section {
  // 默认模式：section-wrapper 居中并加响应式 padding
  .section-wrapper {
    max-width: 1920px;
    padding: 0 var(--o-r-grid-padding);
    margin: var(--o-r-gap-10) auto 0;
  }

  // 最后一个楼层底部留白
  &:last-child {
    .section-wrapper {
      padding-bottom: var(--o-r-gap-10);
    }
  }

  // 全宽模式：去掉内边距，适合背景/图片延伸到视口的楼层
  &.is-full {
    .section-wrapper {
      max-width: 100%;
      width: 100%;
      padding: 0;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .section-header {
    margin-bottom: var(--o-r-gap-7);

    &.is-left {
      .section-title,
      .section-subtitle {
        justify-content: flex-start;
        text-align: left;
      }
    }
  }

  .section-title {
    display: flex;
    justify-content: center;
    font-size: var(--o-r-font_size-display3);
    font-weight: 500;
    line-height: 1.4;
    color: var(--o-color-info1);
    margin: 0;
  }

  .section-subtitle {
    display: flex;
    justify-content: center;
    margin-top: var(--o-r-gap-3);
    font-size: var(--o-r-font_size-text1);
    line-height: 1.6;
    color: var(--o-color-info2);
    text-align: center;
  }

  .section-body {}
}
</style>
