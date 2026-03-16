# Utils 工具函数参考文档

本文档详细说明 openEuler Portal 项目中所有可用的工具函数。

## common.ts

通用工具函数集合，包括 URL 参数处理、Cookie 操作、时间格式化等。

### 导入

```typescript
import {
  getUrlParams,
  getUrlParam,
  replaceUrlParam,
  getCookie,
  setCookie,
  removeCookie,
  checkOriginLink,
  changeTimeStamp,
  detectGitPlatform,
} from '~@/utils/common';
```

## URL 参数处理

### getUrlParams

获取 URL 中的所有搜索参数。

#### 函数签名

```typescript
function getUrlParams(url: string): URLSearchParams
```

#### 参数

- `url`: 完整的 URL 字符串

#### 返回值

`URLSearchParams` 对象，包含所有 URL 参数

#### 使用示例

```typescript
const url = 'https://example.com/page?id=123&name=test';
const params = getUrlParams(url);

console.log(params.get('id'));    // '123'
console.log(params.get('name'));  // 'test'
```

### getUrlParam

获取当前页面 URL 中的指定参数值。

#### 函数签名

```typescript
function getUrlParam(query: string): string
```

#### 参数

- `query`: 要获取的参数名

#### 返回值

参数值字符串，如果不存在则返回空字符串

#### 使用示例

```typescript
// 当前 URL: https://example.com/page?id=123&name=test

const id = getUrlParam('id');      // '123'
const name = getUrlParam('name');  // 'test'
const missing = getUrlParam('foo'); // ''
```

### replaceUrlParam

替换当前 URL 中的参数名（保持参数值不变）。

#### 函数签名

```typescript
function replaceUrlParam(oldQuery: string, newQuery: string): void
```

#### 参数

- `oldQuery`: 旧的参数名
- `newQuery`: 新的参数名

#### 使用示例

```typescript
// 当前 URL: https://example.com/page?oldId=123

replaceUrlParam('oldId', 'id');
// URL 变为: https://example.com/page?id=123
```

#### 注意事项

- 只有当旧参数存在且新参数不存在时才会替换
- 会使用 `window.history.replaceState` 更新 URL，不会刷新页面

## Cookie 操作

### getCookie

获取指定 key 的 cookie 值。

#### 函数签名

```typescript
function getCookie(key: string): string | undefined
```

#### 参数

- `key`: Cookie 的 key

#### 返回值

Cookie 值，如果不存在则返回 `undefined`

#### 使用示例

```typescript
const theme = getCookie('theme');        // 'dark' 或 undefined
const userId = getCookie('userId');      // '12345' 或 undefined
```

### setCookie

设置 cookie。

#### 函数签名

```typescript
function setCookie(
  key: string,
  value: string,
  day?: number,
  domain?: string
): void
```

#### 参数

- `key`: Cookie 的 key
- `value`: Cookie 的值
- `day`: Cookie 的过期时间（天数），默认为 1 天
- `domain`: Cookie 的域名，默认为 `location.hostname`

#### 使用示例

```typescript
// 设置主题 cookie，7 天后过期
setCookie('theme', 'dark', 7);

// 设置用户 ID cookie，30 天后过期，指定域名
setCookie('userId', '12345', 30, '.example.com');

// 使用默认过期时间（1 天）
setCookie('language', 'zh');
```

### removeCookie

删除指定 key 的 cookie。

#### 函数签名

```typescript
function removeCookie(key: string): void
```

#### 参数

- `key`: 要删除的 Cookie 的 key

#### 使用示例

```typescript
removeCookie('theme');
removeCookie('userId');
```

## 链接和域名检查

### checkOriginLink

检查链接是否是同域名链接。

#### 函数签名

```typescript
function checkOriginLink(path: string): boolean
```

#### 参数

- `path`: 要检查的链接路径

#### 返回值

如果是同域名链接返回 `true`，否则返回 `false`

#### 同域名判断规则

链接包含以下任一域名时认为是同域名：
- `import.meta.env.VITE_COOKIE_DOMAIN` 环境变量值
- `.openeuler.org`
- `clasign.osinfra.cn`
- `openeuler.openatom.cn`

#### 使用示例

```typescript
const link1 = 'https://www.openeuler.org/page';
const link2 = 'https://example.com/page';

console.log(checkOriginLink(link1));  // true
console.log(checkOriginLink(link2));  // false
```

## 时间格式化

### changeTimeStamp

将时间戳转换为 `xxxx/xx/xx` 格式的日期字符串。

#### 函数签名

```typescript
function changeTimeStamp(timestamp: number): string
```

#### 参数

- `timestamp`: 待转换的时间戳（毫秒）

#### 返回值

格式化后的日期字符串，格式为 `YYYY/MM/DD`

#### 使用示例

```typescript
const timestamp = Date.now();
const dateStr = changeTimeStamp(timestamp);
console.log(dateStr);  // '2024/01/15'

// 使用具体时间戳
const date = changeTimeStamp(1705276800000);
console.log(date);  // '2024/01/15'
```

## Git 平台检测

### detectGitPlatform

判断链接来自哪个 Git 平台（Gitee 或 AtomGit）。

#### 函数签名

```typescript
function detectGitPlatform(url: string): 'gitee' | 'atomgit' | 'unknown'
```

#### 参数

- `url`: 链接字符串

#### 返回值

- `'gitee'`: Gitee 平台
- `'atomgit'`: AtomGit 平台
- `'unknown'`: 未知平台或无效输入

#### 使用示例

```typescript
const giteeUrl = 'https://gitee.com/user/repo';
const atomgitUrl = 'https://atomgit.com/user/repo';
const otherUrl = 'https://github.com/user/repo';

console.log(detectGitPlatform(giteeUrl));   // 'gitee'
console.log(detectGitPlatform(atomgitUrl)); // 'atomgit'
console.log(detectGitPlatform(otherUrl));   // 'unknown'
console.log(detectGitPlatform(''));         // 'unknown'
```

#### 匹配规则

- **Gitee**: 匹配 `gitee.com` 域名（支持 `http://`、`https://` 和 `www.` 前缀）
- **AtomGit**: 匹配 `atomgit.com` 域名（支持 `http://`、`https://` 和 `www.` 前缀）

## locale.ts

语言环境相关工具函数。

### 导入

```typescript
import { getCurrentLocale } from '~@/utils/locale';
```

### getCurrentLocale

获取当前的语言环境。

#### 函数签名

```typescript
function getCurrentLocale(): 'zh' | 'en'
```

#### 返回值

- `'zh'`: 中文环境
- `'en'`: 英文环境（默认）

#### 语言检测优先级

1. 如果 `localStorage.getItem('locale')` 存在，使用该值（'zh' 或 'en'）
2. 否则根据 `navigator.language` 判断（以 'zh' 开头为中文，否则为英文）
3. 服务器端构建时默认返回 'zh'

#### 使用示例

```typescript
const currentLang = getCurrentLocale();
console.log(currentLang);  // 'zh' 或 'en'

// 根据语言显示不同内容
if (getCurrentLocale() === 'zh') {
  console.log('当前是中文环境');
} else {
  console.log('Current locale is English');
}
```

## 完整使用示例

### 示例 1: URL 参数和 Cookie 结合使用

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUrlParam, setCookie, getCookie } from '~@/utils/common';

const userId = ref('');

onMounted(() => {
  // 从 URL 参数获取用户 ID
  const urlUserId = getUrlParam('userId');
  
  if (urlUserId) {
    // 如果 URL 中有用户 ID，保存到 Cookie
    setCookie('userId', urlUserId, 30);
    userId.value = urlUserId;
  } else {
    // 否则从 Cookie 读取
    const cookieUserId = getCookie('userId');
    userId.value = cookieUserId || '';
  }
});
</script>
```

### 示例 2: 时间戳格式化显示

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { changeTimeStamp } from '~@/utils/common';

const props = defineProps<{
  timestamp: number;
}>();

const formattedDate = computed(() => {
  return changeTimeStamp(props.timestamp);
});
</script>

<template>
  <div>
    <p>发布时间: {{ formattedDate }}</p>
  </div>
</template>
```

### 示例 3: Git 平台链接处理

```vue
<script setup lang="ts">
import { detectGitPlatform, checkOriginLink } from '~@/utils/common';

const handleLinkClick = (url: string) => {
  // 检查是否是同域名链接
  if (checkOriginLink(url)) {
    // 同域名链接，使用内部路由
    router.push(url);
  } else {
    // 外部链接，新窗口打开
    window.open(url, '_blank');
  }
  
  // 检测 Git 平台
  const platform = detectGitPlatform(url);
  if (platform !== 'unknown') {
    console.log(`链接来自 ${platform} 平台`);
    // 可以发送埋点数据
    // trackEvent('git_link_click', { platform });
  }
};
</script>
```

### 示例 4: 语言环境检测

```vue
<script setup lang="ts">
import { getCurrentLocale } from '~@/utils/locale';
import { useLocale } from '~@/composables/useLocale';

const { changeLocale } = useLocale();

// 页面加载时同步语言
onMounted(() => {
  const currentLang = getCurrentLocale();
  changeLocale(currentLang);
});
</script>
```

## 注意事项

1. **Cookie 操作**: `setCookie` 和 `removeCookie` 使用 `js-cookie` 库，确保已安装该依赖
2. **URL 参数**: `getUrlParam` 和 `replaceUrlParam` 操作的是当前页面的 URL，需要确保在浏览器环境中使用
3. **时间戳**: `changeTimeStamp` 接受毫秒级时间戳，如果使用秒级时间戳需要先乘以 1000
4. **语言检测**: `getCurrentLocale` 在服务器端构建时默认返回 'zh'，客户端会根据 localStorage 或浏览器语言判断











