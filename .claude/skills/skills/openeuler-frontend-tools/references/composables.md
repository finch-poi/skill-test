# Composables 参考文档

本文档详细说明 openEuler Portal 项目中所有可用的 Vue 3 Composables。

## useScreen

响应式屏幕尺寸检测和适配工具。

### 导入

```typescript
import { useScreen, Size } from '~@/composables/useScreen';
```

### 功能说明

提供屏幕尺寸检测、比较和响应式状态，支持以下屏幕尺寸：
- `Phone`: 0-600px
- `PadV`: 601-840px
- `PadH`: 841-1200px
- `Laptop`: 1201-1440px

### 返回值

```typescript
const {
  // 屏幕尺寸信息
  current,        // 当前屏幕尺寸（ref: 'phone' | 'pad_v' | 'pad_h' | 'laptop'）
  size,           // 屏幕尺寸对象（reactive: { width: number, height: number }）
  getSize,        // 获取指定宽度的屏幕尺寸分类函数
  
  // Phone 相关
  isPhone,        // 是否为手机（computed: boolean）
  gtPhone,        // 大于手机尺寸（computed: boolean）
  
  // Pad 相关
  isPad,          // 是否为平板（computed: boolean）
  lePad,          // 小于等于平板尺寸（computed: boolean）
  gtPad,          // 大于平板尺寸（computed: boolean）
  
  // PadV 相关
  isPadV,         // 是否为竖屏平板（computed: boolean）
  lePadV,         // 小于等于竖屏平板尺寸（computed: boolean）
  gtPadV,         // 大于竖屏平板尺寸（computed: boolean）
  
  // PadH 相关
  isPadH,         // 是否为横屏平板（computed: boolean）
  
  // Laptop 相关
  isLaptop,       // 是否为笔记本（computed: boolean）
  leLaptop,       // 小于等于笔记本尺寸（computed: boolean）
  gtLaptop,       // 大于笔记本尺寸（computed: boolean）
  isPadToLaptop,  // 平板到笔记本尺寸（computed: boolean）
  isPadVToLaptop, // 竖屏平板到笔记本尺寸（computed: boolean）
} = useScreen();
```

### 使用示例

```vue
<script setup lang="ts">
import { useScreen } from '~@/composables/useScreen';

const { isPhone, isPad, isLaptop, current, size } = useScreen();

// 根据屏幕尺寸显示不同内容
const showMobileMenu = computed(() => isPhone.value);
const showTabletMenu = computed(() => isPad.value);
const showDesktopMenu = computed(() => isLaptop.value);
</script>

<template>
  <div>
    <p>当前屏幕尺寸: {{ current }}</p>
    <p>屏幕宽度: {{ size.width }}px</p>
    <p>屏幕高度: {{ size.height }}px</p>
    
    <MobileMenu v-if="isPhone" />
    <TabletMenu v-else-if="isPad" />
    <DesktopMenu v-else />
  </div>
</template>
```

### 屏幕尺寸配置

```typescript
export const ScreenConfig = {
  [Size.Phone]: 600,    // 0-600px
  [Size.PadV]: 840,     // 601-840px
  [Size.PadH]: 1200,    // 841-1200px
  [Size.Laptop]: 1440,  // 1201-1440px
};
```

## useLocale

国际化语言切换工具。

### 导入

```typescript
import { useLocale } from '~@/composables/useLocale';
```

### 功能说明

提供语言切换、翻译和语言状态检测功能，支持中文（zh）和英文（en）。

### 返回值

```typescript
const {
  t,           // 翻译函数（i18n.t）
  $t,          // 翻译函数别名
  locale,      // 当前语言（WritableComputedRef<'zh' | 'en'>）
  isZh,        // 是否为中文（computed: boolean）
  isEn,        // 是否为英文（computed: boolean）
  changeLocale, // 切换语言函数
} = useLocale();
```

### 使用示例

```vue
<script setup lang="ts">
import { useLocale } from '~@/composables/useLocale';

const { t, locale, isZh, changeLocale } = useLocale();

// 切换语言
const toggleLanguage = () => {
  changeLocale(); // 切换当前语言
  // 或指定语言
  // changeLocale('en');
  // changeLocale('zh');
};
</script>

<template>
  <div>
    <h1>{{ t('welcome.title') }}</h1>
    <p>当前语言: {{ locale }}</p>
    <button @click="toggleLanguage">
      {{ isZh ? 'Switch to English' : '切换到中文' }}
    </button>
  </div>
</template>
```

## useClipboard

剪贴板操作工具。

### 导入

```typescript
import { useClipboard } from '~@/composables/useClipboard';
```

### 功能说明

提供复制文本到剪贴板的功能，基于 clipboard.js 库。

### 参数

```typescript
useClipboard({
  text: string,        // 要复制的文本
  target: MouseEvent,  // 触发复制的事件对象
  success?: Function,  // 复制成功回调
  error?: Function,    // 复制失败回调
});
```

### 使用示例

```vue
<script setup lang="ts">
import { useClipboard } from '~@/composables/useClipboard';

const copyText = '要复制的文本内容';

const handleCopy = (event: MouseEvent) => {
  useClipboard({
    text: copyText,
    target: event,
    success: () => {
      console.log('复制成功');
      // 可以显示提示消息
    },
    error: () => {
      console.error('复制失败');
    },
  });
};
</script>

<template>
  <button @click="handleCopy">复制文本</button>
</template>
```

## useDebounceSearch

防抖搜索工具。

### 导入

```typescript
import { useDebounceSearch } from '~@/composables/useDebounceSearch';
```

### 功能说明

提供防抖功能的搜索函数，基于 @vueuse/core 的 useDebounceFn。

### 参数

```typescript
const debouncedFn = useDebounceSearch(
  fn: Function,  // 要防抖的函数
  delay?: number // 防抖延迟时间（毫秒），默认 300ms
);
```

### 使用示例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useDebounceSearch } from '~@/composables/useDebounceSearch';

const searchKeyword = ref('');
const searchResults = ref([]);

// 搜索函数
const performSearch = async (keyword: string) => {
  if (!keyword.trim()) return;
  
  // 执行搜索逻辑
  const results = await fetchSearchResults(keyword);
  searchResults.value = results;
};

// 创建防抖搜索函数
const debouncedSearch = useDebounceSearch(performSearch, 500);

// 监听输入变化
watch(searchKeyword, (newKeyword) => {
  debouncedSearch(newKeyword);
});
</script>

<template>
  <input v-model="searchKeyword" placeholder="搜索..." />
  <div v-for="result in searchResults" :key="result.id">
    {{ result.title }}
  </div>
</template>
```

## useCheckbox

复选框状态管理工具。

### 导入

```typescript
import { useCheckbox } from '~@/composables/useCheckbox';
```

### 功能说明

提供复选框和全选功能的完整状态管理，支持全选、清空和不确定状态。

### 参数

```typescript
const {
  checkboxes,
  indeterminate,
  parentCheckbox,
  isCheckedAll,
  clearCheckboxes,
  checkAll,
} = useCheckbox(
  datasource: MaybeRefOrGetter<T[]>,  // 数据源
  cbValueExtractor: (item: T) => string | number  // 提取复选框值的函数
);
```

### 返回值

```typescript
{
  checkboxes: Ref<(string | number)[]>,      // 选中的复选框值数组
  indeterminate: Ref<boolean>,              // 是否为不确定状态
  parentCheckbox: Ref<(string | number)[]>,  // 父复选框状态（全选）
  isCheckedAll: ComputedRef<boolean>,       // 是否全选
  clearCheckboxes: () => void,               // 清空所有选择
  checkAll: () => void,                      // 全选
}
```

### 使用示例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useCheckbox } from '~@/composables/useCheckbox';

interface Item {
  id: number;
  name: string;
}

const items = ref<Item[]>([
  { id: 1, name: '选项1' },
  { id: 2, name: '选项2' },
  { id: 3, name: '选项3' },
]);

const {
  checkboxes,
  indeterminate,
  parentCheckbox,
  isCheckedAll,
  clearCheckboxes,
  checkAll,
} = useCheckbox(items, (item) => item.id);
</script>

<template>
  <div>
    <!-- 全选复选框 -->
    <label>
      <input
        type="checkbox"
        :checked="isCheckedAll"
        :indeterminate="indeterminate"
        @change="isCheckedAll ? clearCheckboxes() : checkAll()"
      />
      全选
    </label>
    
    <!-- 选项列表 -->
    <div v-for="item in items" :key="item.id">
      <label>
        <input
          type="checkbox"
          :value="item.id"
          v-model="checkboxes"
        />
        {{ item.name }}
      </label>
    </div>
    
    <p>已选择: {{ checkboxes.length }} 项</p>
  </div>
</template>
```

## useScrollBottom

滚动到底部检测工具。

### 导入

```typescript
import useScrollBottom from '~@/composables/useScrollBottom';
```

### 功能说明

检测滚动容器是否滚动到底部，触发回调函数。适用于无限滚动、加载更多等场景。

### 参数

```typescript
useScrollBottom(
  scrollerRef: Ref<InstanceType<typeof OScroller>>,  // OScroller 组件引用
  callback: () => void  // 滚动到底部时的回调函数
);
```

### 使用示例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { OScroller } from '@opensig/opendesign';
import useScrollBottom from '~@/composables/useScrollBottom';

const scrollerRef = ref<InstanceType<typeof OScroller>>();
const items = ref([...]);
const loading = ref(false);

const loadMore = async () => {
  if (loading.value) return;
  
  loading.value = true;
  // 加载更多数据
  const newItems = await fetchMoreItems();
  items.value.push(...newItems);
  loading.value = false;
};

useScrollBottom(scrollerRef, loadMore);
</script>

<template>
  <OScroller ref="scrollerRef">
    <div v-for="item in items" :key="item.id">
      {{ item.content }}
    </div>
    <div v-if="loading">加载中...</div>
  </OScroller>
</template>
```

## useInViewDuration

元素可见时长统计工具。

### 导入

```typescript
import useInViewDuration from '~@/composables/useInViewDuration';
```

### 功能说明

记录元素在页面可见状态的停留时间，适用于统计用户浏览时长、埋点等场景。

### 参数

```typescript
const { isInView, ...rest } = useInViewDuration(
  el: MaybeComputedElementRef,  // DOM 元素引用
  cb: (duration: number) => void,  // 元素离开可见区域时的回调，duration 为停留时长（毫秒）
  threshold?: { enter: number; leave: number }  // 可见性阈值，默认 { enter: 1, leave: 0 }
);
```

### 使用示例

```vue
<script setup lang="ts">
import { ref } from 'vue';
import useInViewDuration from '~@/composables/useInViewDuration';

const elementRef = ref<HTMLElement>();
const viewDuration = ref(0);

const handleViewDuration = (duration: number) => {
  viewDuration.value = duration;
  console.log(`元素可见时长为: ${duration}ms`);
  // 可以发送埋点数据
  // trackEvent('element_view_duration', { duration });
};

const { isInView } = useInViewDuration(
  elementRef,
  handleViewDuration,
  { enter: 0.5, leave: 0 }  // 50% 可见时认为进入，完全不可见时认为离开
);
</script>

<template>
  <div ref="elementRef">
    <p>元素是否可见: {{ isInView ? '是' : '否' }}</p>
    <p>上次可见时长: {{ viewDuration }}ms</p>
  </div>
</template>
```











