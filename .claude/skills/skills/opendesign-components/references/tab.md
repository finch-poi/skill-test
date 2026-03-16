# OTab 标签页

## Part A：设计理解卡

OTab 是标签页组件，用于在不同内容区域之间切换。包含 OTab（标签页容器）和 OTabPane（标签面板）。支持三种风格、溢出省略与更多菜单、可添加/可删除页签、懒加载和过渡动画。

### 值

**modelValue**（属性）：当前选中的页签值（v-model 双向绑定）。未设置时默认激活第一个页签。

### 外观

**variant**（属性）：页签风格。"text" 文字型（带底部指示线滑动动画）、"solid" 实心型、"button" 按钮型。默认 text。

**size**（属性）：页签尺寸。"large" 大号、"medium" 中号、"small" 小号。

**round**（属性）：圆角值。仅 button 模式可用。"pill" 半圆或 CSS 值。

**line**（属性）：是否显示底部分隔线。button 模式不可用。默认开启。

**buttonInverse**（属性）：button 模式下是否使用反色风格。默认关闭。

**headerClass**（属性）：标签导航栏自定义类名。

### 溢出处理

**maxShow**（属性）：最大显示页签数量。超出的页签收入"更多"菜单，桌面端为 Popup 弹出，移动端为 Dialog 底部弹出。

**moreLabel**（属性）：超出时"更多"按钮的文案。默认"更多"。

### 渲染控制

**lazy**（属性）：是否在首次激活时才渲染面板内容（全局设置）。默认关闭。

**addable**（属性）：是否在导航栏末尾显示添加按钮。默认关闭。

**addInactive**（属性）：新增页签后是否不自动激活。默认关闭（即默认自动激活新页签）。

### 插槽区域

**prefix 插槽**（插槽）：导航栏左侧前缀区域。

**suffix 插槽**（插槽）：导航栏右侧后缀区域。

**anchor 插槽**（插槽）：替换 text 模式下的底部指示线动画。仅 text 模式有效。

**default 插槽**（插槽）：放置 OTabPane 组件。

### 事件

**change**（事件）：切换页签后触发。可获取新值和旧值。

**delete**（事件）：删除页签时触发。可获取被删除页签的值。

**add**（事件）：点击添加按钮时触发。

---

### OTabPane 标签面板

**value**（属性）：页签唯一标识值。

**label**（属性）：页签显示标题。未传 value 时用作标识。

**disabled**（属性）：是否禁用该页签。默认关闭。

**closable**（属性）：是否可删除该页签。开启后页签上出现关闭图标。默认关闭。

**transition**（属性）：页签切换过渡动画名。默认 "o-fade-in"。

**lazy**（属性）：该面板是否在首次激活时才渲染（单独设置，优先级高于 OTab 的 lazy）。默认关闭。

**unmountOnHide**（属性）：隐藏时是否卸载面板内容。默认关闭。

#### OTabPane 插槽

**nav 插槽**（插槽）：替换页签导航标签。用于自定义图标+文字组合等复杂导航内容。

**default 插槽**（插槽）：面板内容。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），页签文字和图标缩小，间距减小；在平板竖屏及以下（≤840px），文字进一步缩小、间距紧凑、指示线高度减小。button 模式在各断点下内边距随之调整。溢出的页签在移动端使用 Dialog 底部弹出菜单（而非 Popup）。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OTab, OTabPane } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type TabVariantT = 'solid' | 'text' | 'button';
type SizeT = 'large' | 'medium' | 'small';
```

### OTab Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string \| number` | — | `undefined` | 选中页签值（v-model） |
| variant | `TabVariantT` | `'solid'` / `'text'` / `'button'` | `'text'` | 页签风格 |
| size | `SizeT` | `'large'` / `'medium'` / `'small'` | — | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角（仅 button 模式） |
| lazy | `boolean` | — | `false` | 首次激活才渲染 |
| addable | `boolean` | — | `false` | 是否可添加页签 |
| addInactive | `boolean` | — | `false` | 新增页签不自动激活 |
| maxShow | `number` | — | — | 最大显示页签数 |
| moreLabel | `string` | — | `'更多'` | 更多按钮文案 |
| line | `boolean` | — | `true` | 显示底部线（非 button） |
| buttonInverse | `boolean` | — | `false` | button 反色模式 |
| headerClass | `string \| object \| array` | — | — | 导航栏类名 |

### OTabPane Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number` | — | `undefined` | 页签标识值 |
| label | `string` | — | `undefined` | 页签标题 |
| transition | `string` | — | `'o-fade-in'` | 切换过渡动画 |
| disabled | `boolean` | — | `false` | 禁用页签 |
| closable | `boolean` | — | `false` | 可删除 |
| lazy | `boolean` | — | `false` | 首次激活才渲染 |
| unmountOnHide | `boolean` | — | `false` | 隐藏时卸载 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: string \| number)` | 选中值变化时 |
| change | `(value: string \| number, oldValue?: string \| number)` | 切换页签后 |
| delete | `(value: string \| number)` | 删除页签时 |
| add | `(evt: MouseEvent)` | 点击添加按钮 |

### Slots 表

**OTab 插槽：**

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 面板区域 | 无 |
| prefix | — | 有插槽时 | 导航栏左侧 | 无 |
| suffix | — | 有插槽时 | 导航栏右侧 | 无 |
| anchor | — | variant="text" 时 | 指示线 | 默认滑动线 |

**OTabPane 插槽：**

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 面板挂载时 | 面板内容 | 无 |
| nav | — | 始终 | 导航标签 | `label \|\| value` 文字 |

### 典型使用场景与调用模板

**场景 1：基础标签页**
适用于：内容区域切换
```vue
<script setup>
import { ref } from 'vue';
const activeTab = ref('tab1');
</script>
<template>
  <OTab v-model="activeTab">
    <OTabPane value="tab1" label="标签一">内容一</OTabPane>
    <OTabPane value="tab2" label="标签二">内容二</OTabPane>
    <OTabPane value="tab3" label="标签三">内容三</OTabPane>
  </OTab>
</template>
```

**场景 2：按钮风格**
适用于：工具栏式切换
```vue
<OTab v-model="activeTab" variant="button" round="pill">
  <OTabPane value="all" label="全部" />
  <OTabPane value="published" label="已发布" />
  <OTabPane value="draft" label="草稿" />
</OTab>
```

**场景 3：自定义导航标签**
适用于：图标+文字的复杂导航
```vue
<OTab v-model="activeTab">
  <OTabPane value="home">
    <template #nav><OIconHome /> 首页</template>
    首页内容
  </OTabPane>
  <OTabPane value="settings">
    <template #nav><OIconSettings /> 设置</template>
    设置内容
  </OTabPane>
</OTab>
```

**场景 4：可增删页签**
适用于：动态标签页管理
```vue
<script setup>
import { ref } from 'vue';
const tabs = ref([{ value: 'tab1', label: '标签一' }]);
let count = 1;
const onAdd = () => {
  count++;
  tabs.value.push({ value: `tab${count}`, label: `标签${count}` });
};
const onDelete = (val) => {
  tabs.value = tabs.value.filter(t => t.value !== val);
};
</script>
<template>
  <OTab addable @add="onAdd" @delete="onDelete">
    <OTabPane v-for="tab in tabs" :key="tab.value" :value="tab.value" :label="tab.label" closable>
      {{ tab.label }} 的内容
    </OTabPane>
  </OTab>
</template>
```

**场景 5：溢出更多菜单**
适用于：大量标签页需要折叠
```vue
<OTab v-model="activeTab" :max-show="5" more-label="展开更多">
  <OTabPane v-for="i in 10" :key="i" :value="`tab${i}`" :label="`标签 ${i}`">
    内容 {{ i }}
  </OTabPane>
</OTab>
```

**场景 6：懒加载**
适用于：面板内容较重时延迟渲染
```vue
<OTab v-model="activeTab" lazy>
  <OTabPane value="tab1" label="基础信息">基础信息内容</OTabPane>
  <OTabPane value="tab2" label="详细数据" unmount-on-hide>详细数据（每次切走都卸载）</OTabPane>
</OTab>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础文字标签 | `v-model` + `variant="text"`（默认） | 最常见 |
| 按钮风格 | `variant="button"` + `round="pill"` | 工具栏 |
| 反色按钮 | `variant="button"` + `button-inverse` | 深色背景 |
| 可增删 | `addable` + `@add` + `@delete` + `closable`（TabPane） | 动态管理 |
| 溢出折叠 | `:max-show` + `more-label` | 大量标签 |
| 延迟渲染 | `lazy` | 首次激活才渲染 |
| 自定义导航 | OTabPane `#nav` 插槽 | 图标+文字 |

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| large 文字 | tip1 | text2 | 标准 |
| medium 文字 | tip1 | text1 | 标准 |
| small 文字 | tip1 | tip1 | 标准 |
| large 图标 | 控件 s | 控件 m | 标准 |
| large 间距 | 16px | 32px | 标准 |
| small 间距 | 12px | 24px | 标准 |
| 溢出更多菜单 | Dialog 底部弹出 | Popup 弹出 | Popup 弹出 |

触控 vs 指针差异：

| 场景 | 触控设备 | 指针设备 |
|------|---------|---------|
| 溢出菜单 | ODialog 底部弹出 | OPopup hover 触发 |

