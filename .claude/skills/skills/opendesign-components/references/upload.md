# OUpload 上传

## Part A：设计理解卡

OUpload 是文件上传组件，支持点击选择和拖拽上传。包含三种文件列表展示模式（文字、图片列表、图片卡片）。支持自定义上传请求、上传前/选择前拦截、手动/自动上传、缩略图生成、上传进度展示等。

### 文件列表

**modelValue**（属性）：文件列表（v-model 双向绑定）。数组中每项包含 id、name、file、status（pending/uploading/finished/failed）、percent 等信息。

**defaultFileList**（属性）：非受控模式下的默认文件列表。

### 选择

**accept**（属性）：可选文件的 MIME 类型限制，如 "image/jpeg;image/png"。

**multiple**（属性）：是否支持多文件上传。

**disabled**（属性）：是否禁用上传。

**beforeSelect**（属性）：选择文件前的拦截回调。返回 false 阻止选择。

**onAfterSelect**（属性）：选择后的处理回调。可自定义文件对象的构造。

### 上传

**uploadRequest**（属性）：自定义上传请求函数。接收 onProgress/onSuccess/onError 回调和 file 信息，需返回包含 abort 方法的对象。

**lazyUpload**（属性）：是否手动触发上传。false 时选择后自动上传。默认自动上传。

**onBeforeUpload**（属性）：上传前的拦截回调。返回 false 阻止上传，返回 File 替换上传文件。

**onBeforeRemove**（属性）：删除前的拦截回调。返回 false 阻止删除。

### 展示

**listType**（属性）：文件列表展示模式。"text" 文字列表、"picture" 图片列表、"picture-card" 图片卡片。默认 text。

**btnLabel**（属性）：上传按钮文字。

**showProgress**（属性）：上传中是否显示进度条。默认关闭。

**createThumbnail**（属性）：自定义缩略图生成函数。

### 拖拽

**draggable**（属性）：是否支持拖拽上传。

**dragLabel**（属性）：拖拽区域提示文本。

**dragHoverLabel**（属性）：拖拽中的提示文本。

### 插槽区域

**default 插槽**（插槽）：自定义上传触发区域（text/picture 模式下的选择按钮区域）。

**select-drag 插槽**（插槽）：自定义拖拽区域。

**select-drag-extra 插槽**（插槽）：拖拽区域额外内容。

**select-extra 插槽**（插槽）：选择按钮后的额外内容区域。

**select-add 插槽**（插槽）：picture-card 模式下自定义添加卡片内容。

**select-add-label 插槽**（插槽）：picture-card 模式下自定义添加卡片标签文字。

**item 插槽**（插槽）：自定义文件列表项渲染。接收 item（当前文件对象 UploadFileT）作为插槽参数。

### 事件

**progress**（事件）：上传进度变化时触发。

**success**（事件）：单文件上传成功时触发。

**error**（事件）：单文件上传失败时触发。

**change**（事件）：文件列表变化时触发。

**select**（事件）：选择文件后触发。

**itemRemove**（事件）：删除文件时触发。

**itemRetry**（事件）：重新上传时触发。

**itemReplace**（事件）：替换文件时触发。

**itemPreview**（事件）：预览文件时触发。

**itemClick**（事件）：点击文件项时触发。

📱 **响应式行为**：本组件无响应式差异。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OUpload } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type UploadFileStatusT = 'pending' | 'uploading' | 'finished' | 'failed';
type UploadListTypeT = 'text' | 'picture' | 'picture-card';

interface UploadFileT {
  id: string | number;
  name: string;
  file?: File;
  status?: UploadFileStatusT;
  message?: string;
  messageClass?: string;
  retry?: boolean;
  percent?: number;
  request?: UploadRequestT;
  icon?: string | boolean | Component;
  imgUrl?: string;
}

interface UploadRequestOptionT {
  onProgress: (percent: number, event?: ProgressEvent) => void;
  onSuccess: (response?: { messages?: string; [k: string]: unknown }) => void;
  onError: (response?: { messages?: string; [k: string]: unknown }, retry?: boolean) => void;
  file: UploadFileT;
}

interface UploadRequestT {
  abort: () => void;
}
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `UploadFileT[]` | — | — | 文件列表（v-model） |
| defaultFileList | `UploadFileT[]` | — | — | 默认文件列表 |
| accept | `string` | — | — | MIME 类型限制 |
| disabled | `boolean` | — | `false` | 禁用 |
| multiple | `boolean` | — | `false` | 多文件 |
| beforeSelect | `(value: UploadFileT[]) => Promise<boolean> \| boolean` | — | — | 选择前拦截 |
| onAfterSelect | `(fileList: FileList) => Promise<UploadFileT[]>` | — | — | 选择后处理 |
| btnLabel | `string` | — | — | 按钮文字 |
| uploadRequest | `(options: UploadRequestOptionT) => UploadRequestT` | — | — | 自定义上传 |
| lazyUpload | `boolean` | — | `false` | 手动上传 |
| onBeforeUpload | `(file: UploadFileT) => Promise<boolean \| File>` | — | — | 上传前拦截 |
| onBeforeRemove | `(file: UploadFileT) => Promise<boolean>` | — | — | 删除前拦截 |
| draggable | `boolean` | — | `false` | 拖拽上传 |
| dragLabel | `string` | — | — | 拖拽提示 |
| dragHoverLabel | `string` | — | — | 拖拽中提示 |
| listType | `UploadListTypeT` | `'text'` / `'picture'` / `'picture-card'` | `'text'` | 列表展示模式 |
| createThumbnail | `(file: File) => Promise<string>` | — | — | 缩略图生成 |
| showProgress | `boolean` | — | `false` | 显示进度条 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: UploadFileT[])` | 文件列表变化时 |
| progress | `(value: UploadFileT)` | 上传进度变化 |
| success | `(value: UploadFileT)` | 上传成功 |
| error | `(value: UploadFileT)` | 上传失败 |
| change | `(value: UploadFileT[])` | 文件列表变化 |
| select | `(value: UploadFileT[])` | 选择文件后 |
| itemRemove | `(value: UploadFileT, evt: Event)` | 删除文件 |
| itemRetry | `(value: UploadFileT, evt: Event)` | 重新上传 |
| itemReplace | `(value: UploadFileT, evt: Event)` | 替换文件 |
| itemPreview | `(value: UploadFileT, evt: Event)` | 预览文件 |
| itemClick | `(value: UploadFileT, evt: Event)` | 点击文件项 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | text/picture 模式 | 选择按钮区域 | 默认上传按钮 |
| select-drag | — | draggable 时 | 拖拽区域 | 默认拖拽区域 |
| select-drag-extra | — | draggable 时 | 拖拽区域额外内容 | 无 |
| select-extra | — | 有插槽时 | 选择按钮后内容 | 无 |
| select-add | — | picture-card 模式 | 添加卡片内容 | 加号图标+标签 |
| select-add-label | — | picture-card 模式 | 添加卡片标签 | `btnLabel` 文字 |
| item | `{ item: UploadFileT }` | 始终 | 文件列表项 | 默认列表项渲染 |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| upload() | — | 手动触发所有文件上传 |
| select() | — | 打开文件选择对话框 |
| retry(file, force?) | `UploadFileT, boolean` | 重新上传指定文件 |
| replace(file) | `UploadFileT` | 替换指定文件 |
| replaceById(id, newFile) | `string, UploadFileT` | 按 id 替换文件 |
| replaceByIndex(index, newFile) | `number, UploadFileT` | 按索引替换文件 |
| removeById(id) | `string \| number` | 按 id 删除文件 |
| removeByIndex(index) | `number` | 按索引删除文件 |
| removeAll() | — | 删除所有文件 |
| previewItemById(id) | `number \| string` | 按 id 预览文件 |
| previewItemByIndex(index) | `number` | 按索引预览文件 |

### 典型使用场景与调用模板

**场景 1：基础上传**
适用于：简单文件上传
```vue
<script setup>
import { ref } from 'vue';
const fileList = ref([]);
const uploadRequest = ({ file, onProgress, onSuccess, onError }) => {
  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = (e) => onProgress(Math.round(e.loaded / e.total * 100));
  xhr.onload = () => onSuccess({ messages: '上传成功' });
  xhr.onerror = () => onError({ messages: '上传失败' }, true);
  // xhr.open(...); xhr.send(file.file);
  return { abort: () => xhr.abort() };
};
</script>
<template>
  <OUpload v-model="fileList" :upload-request="uploadRequest" />
</template>
```

**场景 2：拖拽上传**
适用于：大文件或批量上传
```vue
<OUpload
  v-model="fileList"
  draggable
  multiple
  drag-label="点击或拖拽文件到此处"
  drag-hover-label="释放文件"
  :upload-request="uploadRequest"
/>
```

**场景 3：图片卡片模式**
适用于：图片上传预览
```vue
<OUpload
  v-model="fileList"
  list-type="picture-card"
  accept="image/jpeg;image/png"
  :upload-request="uploadRequest"
  @item-preview="handlePreview"
/>
```

**场景 4：手动上传**
适用于：选择完毕后统一上传
```vue
<script setup>
import { ref } from 'vue';
const uploadRef = ref();
const fileList = ref([]);
</script>
<template>
  <OUpload ref="uploadRef" v-model="fileList" lazy-upload :upload-request="uploadRequest" />
  <OButton @click="uploadRef.upload()">开始上传</OButton>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础上传 | `v-model` + `:upload-request` | 最常见 |
| 拖拽 | `draggable` + `drag-label` | 拖拽区域 |
| 图片卡片 | `list-type="picture-card"` + `accept` | 图片上传 |
| 图片列表 | `list-type="picture"` | 缩略图列表 |
| 手动上传 | `lazy-upload` + ref.upload() | 延迟上传 |
| 多文件 | `multiple` | 批量选择 |
| 进度条 | `show-progress` | 显示上传进度 |

### 响应式行为表

本组件无响应式差异。
