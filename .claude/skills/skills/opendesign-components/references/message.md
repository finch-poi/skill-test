# OMessage 消息提示

## Part A：设计理解卡

OMessage 是消息提示组件，用于操作反馈信息的展示。支持内联使用（直接放在模板中）和命令式调用（通过 useMessage 函数动态创建）两种方式。提供五种状态、彩色背景模式、自动关闭、手动关闭等功能。

### 状态

**status**（属性）：消息状态类型。"info" 信息提示、"success" 成功、"warning" 警告、"danger" 危险/错误、"loading" 加载中。不同状态对应不同颜色和图标。默认 info。

**colorful**（属性）：是否使用彩色背景。开启后消息背景色跟随状态颜色变化，并在左侧显示彩色侧边条。默认关闭。

### 显示控制

**visible**（属性）：消息是否可见（v-model 双向绑定）。

**defaultVisible**（属性）：非受控模式下消息是否默认可见。默认可见。

**duration**（属性）：消息自动关闭的持续时间（毫秒）。未设置或小于等于 0 时不自动关闭。鼠标悬停在消息上时暂停计时。

**closable**（属性）：是否显示关闭按钮，允许手动关闭。默认关闭。

**beforeClose**（属性）：关闭前的钩子函数。返回 true 允许关闭，返回 false 阻止关闭。支持异步。

### 内容

**title**（属性）：消息标题文字。

**title 插槽**（插槽）：替换标题区域。使用后 title 属性失效。

**default 插槽**（插槽）：消息正文内容。

**icon 插槽**（插槽）：替换状态图标区域。

### 事件

**duration-end**（事件）：自动关闭计时结束时触发。

**close**（事件）：消息关闭时触发。

---

### useMessage 命令式调用

通过 `useMessage()` 创建消息实例，可指定 target 元素使消息出现在该元素附近。

**show / info / success / warning / danger / loading** 方法：显示对应状态的消息。返回关闭函数。

**close**：关闭当前 useMessage 实例创建的所有消息。

**closeAll**：关闭所有实例创建的全部消息。

命令式调用额外支持：position（消息在目标元素的 top 或 bottom）、targetAlign（消息对齐方式 center/left/right）、content（消息内容）、onDurationEnd 和 onClose 回调。默认 duration 为 3000ms。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），消息内边距、文字大小、图标尺寸缩小；在平板横屏及以下（≤1200px），消息间距进一步缩小；在平板竖屏及以下（≤840px），带标题的消息标题文字缩小、图标缩至最小、彩色模式侧边条变窄。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OMessage, useMessage } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type MessageStatusT = 'info' | 'success' | 'warning' | 'danger' | 'loading';
type MessagePositionT = 'top' | 'bottom';

type MessageParamsT = Partial<MessagePropsT & {
  content: string | VNode | Component;
  position: MessagePositionT;
  targetAlign?: 'center' | 'left' | 'right';
  icon: VNode | Component;
  onDurationEnd: () => void;
  onClose: (ev?: MouseEvent) => void;
}>;
```

### OMessage Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | `undefined` | 是否可见（v-model） |
| defaultVisible | `boolean` | — | `true` | 默认可见 |
| status | `MessageStatusT` | `'info'` / `'success'` / `'warning'` / `'danger'` / `'loading'` | `'info'` | 状态 |
| colorful | `boolean` | — | `false` | 彩色背景 |
| duration | `number` | — | — | 自动关闭时间（ms） |
| closable | `boolean` | — | `false` | 可手动关闭 |
| beforeClose | `() => Promise<boolean> \| boolean` | — | — | 关闭前钩子 |
| title | `string` | — | — | 标题 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 显示状态变化时 |
| duration-end | — | 自动关闭计时结束 |
| close | `(ev?: MouseEvent)` | 消息关闭时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 消息正文 | 无 |
| icon | — | 始终 | 状态图标 | 对应 status 的默认图标 |
| title | — | 有 title prop 或 title 插槽时 | 标题文字 | `{{ title }}` |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| close(ev?) | `ev?: MouseEvent` | 关闭消息 |

### useMessage API

```typescript
const message = useMessage(target?);
// target: string | ComponentPublicInstance | HTMLElement | Ref<...>

message.show(params);    // 显示消息，返回 close 函数
message.info(params);    // info 状态
message.success(params); // success 状态
message.warning(params); // warning 状态
message.danger(params);  // danger 状态
message.loading(params); // loading 状态
message.close();         // 关闭本实例所有消息
message.closeAll();      // 关闭所有消息
```

- `params` 可以是字符串（直接作为 content）或 `MessageParamsT` 对象
- 命令式调用默认 `duration: 3000`，`position: 'top'`

### 典型使用场景与调用模板

**场景 1：内联消息（页面级提示）**
适用于：页面固定位置的信息提示
```vue
<OMessage status="success" colorful>操作成功</OMessage>
<OMessage status="warning" closable :duration="5000">这是一条可关闭的警告</OMessage>
```

**场景 2：带标题和正文**
适用于：需详细说明的提示
```vue
<OMessage status="info" colorful title="提示标题">
  这是消息的详细内容说明。
</OMessage>
```

**场景 3：命令式全局消息**
适用于：操作反馈弹出提示
```vue
<script setup>
import { useMessage, OButton } from '@opensig/opendesign';
const message = useMessage();
const showSuccess = () => {
  message.success('保存成功');
};
</script>
<template>
  <OButton @click="showSuccess">保存</OButton>
</template>
```

**场景 4：指定目标元素附近显示**
适用于：表单提交反馈等局部提示
```vue
<script setup>
import { useTemplateRef } from 'vue';
import { useMessage } from '@opensig/opendesign';
const container = useTemplateRef('form-area');
const message = useMessage(container);
const onSubmit = () => {
  message.success({ content: '提交成功', position: 'bottom', targetAlign: 'right' });
};
</script>
<template>
  <div ref="form-area">
    <OButton @click="onSubmit">提交</OButton>
  </div>
</template>
```

**场景 5：手动关闭消息**
适用于：需要程序控制关闭时机
```vue
<script setup>
import { useMessage } from '@opensig/opendesign';
const message = useMessage();
let closeLoading: (() => void) | null = null;
const startLoading = () => {
  closeLoading = message.loading({ content: '处理中...', duration: 0 });
};
const stopLoading = () => {
  closeLoading?.();
};
</script>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 全局弹出消息 | `useMessage()` + `.success()` | 命令式最常见 |
| 内联提示 | `status` + `colorful` | 页面固定提示 |
| 可关闭 | `closable` + `duration: 0` | 手动关闭 |
| 带标题 | `title` + default 插槽 | 标题+详情 |
| 自动关闭 | `:duration="3000"` | 3 秒后关闭 |
| 定位消息 | `useMessage(target)` + `position` + `targetAlign` | 目标元素附近 |

### 响应式行为表

| 维度 | ≤840px | 841–1200px | 1201–1440px | >1440px |
|------|--------|-----------|-------------|---------|
| 内边距 | 4px 12px | — | 7px 12px | 标准 |
| 文字 | — | — | tip1 | 标准 |
| 图标 | 控件 xs | — | 控件 s | 标准 |
| 间距 | — | 8px | 12px | 标准 |
| 彩色侧边条 | 3px | — | — | 标准 |
| 带标题时标题字号 | tip2 | — | — | 标准 |

