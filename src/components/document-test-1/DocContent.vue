<script setup lang="ts">
import { h } from 'vue'
import {
  OMessage,
  OBreadcrumb,
  OBreadcrumbItem,
  OLink,
  ODataTable,
  OButton,
} from '@opensig/opendesign'
import type { DataTableColumnT } from '@opensig/opendesign'

// ---- Table 1: disk element attributes ----
const disk1Columns: DataTableColumnT[] = [
  { key: 'element', label: '元素', width: '15%' },
  { key: 'attr', label: '属性', width: '15%' },
  { key: 'meaning', label: '含义', width: '30%' },
  {
    key: 'values',
    label: '属性值及其含义',
    width: '40%',
    formatter: ({ cellValue }) => {
      const lines = String(cellValue).split('\n')
      return h(
        'div',
        { style: 'line-height: 1.6' },
        lines
          .map((line, i) => (i < lines.length - 1 ? [h('span', line), h('br')] : h('span', line)))
          .flat(),
      )
    },
  },
]

const disk1Data = [
  {
    id: 1,
    element: 'disk',
    attr: 'type',
    meaning: '指定后端存储介质类型。',
    values: 'block：块设备\nfile：文件设备\ndir：目录路径\nnetwork：网络磁盘',
  },
  {
    id: 2,
    element: '',
    attr: 'device',
    meaning: '指定呈现给虚拟机的存储介质',
    values: 'disk：磁盘（默认）\nfloppy：软盘\ncdrom：光盘',
  },
]

// ---- Table 2: parameter description ----
const param2Columns: DataTableColumnT[] = [
  { key: 'param', label: '参数名', width: '25%' },
  { key: 'io', label: '输入/输出', width: '20%' },
  { key: 'meaning', label: '含义', width: '55%' },
]

const param2Data = [
  {
    id: 1,
    param: 'dstLocal',
    io: '输入',
    meaning: '目标本地存储路径，指定虚拟机数据写入的本地磁盘位置。',
  },
  {
    id: 2,
    param: 'dstGlobal',
    io: '输入',
    meaning: '目标全局存储路径，指定跨节点共享存储的目标位置。',
  },
  {
    id: 3,
    param: 'repeatParams',
    io: '输入',
    meaning: '重复执行参数，控制数据搬运操作的重复次数及间隔时间。',
  },
  {
    id: 4,
    param: 'calCount',
    io: '输出',
    meaning: '计算完成的数量，返回成功完成数据搬运操作的累计计数。',
  },
]

const xmlExample = `<domain type='kvm'>
  ...
  <devices>
    <interface type='bridge'>
      <source bridge='br0'/>
      <model type='virtio'/>
    </interface>
  </devices>
  ...
</domain>`
</script>

<template>
  <main class="doc-content">
    <!-- Success notification -->
    <OMessage
      status="success"
      closable
      :duration="5000"
      title="用于表示操作顺利达成，5秒后消失"
      class="content-message"
    />

    <!-- Breadcrumb -->
    <OBreadcrumb class="content-breadcrumb">
      <OBreadcrumbItem href="#">文档中心</OBreadcrumbItem>
      <OBreadcrumbItem href="#">虚拟化</OBreadcrumbItem>
      <OBreadcrumbItem>配置虚拟机设备</OBreadcrumbItem>
    </OBreadcrumb>

    <!-- Page title area -->
    <div class="page-title-area">
      <h1 class="page-title">
        配置虚拟设备
        <span class="anchor-icon" title="锚点链接">∞</span>
      </h1>
      <div class="title-actions">
        <OLink color="primary" target="_blank" href="#">
          链接按钮
          <template #suffix>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <polyline
                points="15 3 21 3 21 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <line
                x1="10"
                y1="14"
                x2="21"
                y2="3"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </template>
        </OLink>
      </div>
    </div>

    <!-- Decorative banner -->
    <div class="banner-area">
      <svg
        class="banner-deco"
        viewBox="0 0 600 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMax slice"
      >
        <path
          d="M600 160H0V120L80 80L160 100L240 40L340 70L420 20L500 50L560 10L600 30V160Z"
          fill="rgba(255,255,255,0.06)"
        />
        <path
          d="M600 160H200V140L280 110L360 130L440 90L520 110L580 80L600 90V160Z"
          fill="rgba(255,255,255,0.08)"
        />
        <ellipse cx="520" cy="40" rx="90" ry="55" fill="rgba(255,255,255,0.05)" />
        <ellipse cx="460" cy="60" rx="60" ry="38" fill="rgba(255,255,255,0.06)" />
      </svg>
    </div>

    <!-- Section 1: 存储设备 -->
    <section class="content-section">
      <h2 class="section-heading">
        存储设备
        <span class="anchor-icon">∞</span>
      </h2>

      <p class="section-label"><strong>概述</strong></p>
      <p class="section-text">
        XML配置文件可以配置虚拟磁存储设备信息，包括
        dstLocal　存储介质及其存储类型等信息，本节介绍存储设备的配置方法。
      </p>

      <OMessage status="info" title="标题" class="inline-message">
        正文内容正文内容正文内容正文内容
      </OMessage>

      <h3 class="subsection-heading">
        元素介绍
        <span class="anchor-icon">∞</span>
      </h3>
      <p class="section-text">
        XML配置文件使用disk元素来配置设备，disk常见的属性如表1所示，常见子元素及子元素属性如表2所示。
      </p>

      <!-- Table 1 caption -->
      <div class="table-caption">
        <span>表1：元素disk的常用属性</span>
        <OButton variant="text" color="primary" size="small" class="expand-btn">展开 ▼</OButton>
      </div>

      <ODataTable
        :data="disk1Data"
        :columns="disk1Columns"
        border="all"
        size="small"
        class="content-table"
      />

      <h3 class="subsection-heading">
        配置示例
        <span class="anchor-icon">∞</span>
      </h3>
      <p class="section-text">
        以下示例展示了如何通过XML配置文件配置虚拟机的网络设备，使用桥接模式连接到宿主机的 br0
        网桥，并指定使用 virtio 驱动模型。
      </p>

      <pre class="code-block"><code>{{ xmlExample }}</code></pre>
    </section>

    <!-- Section 2: 参数说明 -->
    <section class="content-section">
      <h2 class="section-heading">
        参数说明
        <span class="anchor-icon">∞</span>
      </h2>

      <!-- Table 2 caption -->
      <div class="table-caption">
        <span>表2：普通数据搬运接口参数说明</span>
      </div>

      <ODataTable
        :data="param2Data"
        :columns="param2Columns"
        border="all"
        size="small"
        class="content-table"
      />
    </section>

    <!-- Floating action buttons -->
    <div class="floating-actions">
      <OButton variant="outline" size="small" class="action-btn" title="文档反馈">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </OButton>
      <OButton variant="outline" size="small" class="action-btn" title="评价">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
          <path
            d="M8 14s1.5 2 4 2 4-2 4-2"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <line
            x1="9"
            y1="9"
            x2="9.01"
            y2="9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <line
            x1="15"
            y1="9"
            x2="15.01"
            y2="9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </OButton>
      <OButton variant="outline" size="small" class="action-btn" title="刷新">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            points="1 4 1 10 7 10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.51 15a9 9 0 102.13-9.36L1 10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </OButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.doc-content {
  flex: 1;
  padding: var(--o-r-gap-6) var(--o-r-gap-8);
  position: relative;
  overflow-y: auto;
  background: var(--o-color-fill2);
  min-width: 0;

  @include scrollbar;
}

.content-message {
  margin-bottom: var(--o-r-gap-4);
}

.content-breadcrumb {
  margin-bottom: var(--o-r-gap-4);
}

.page-title-area {
  margin-bottom: var(--o-r-gap-4);
}

.page-title {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-2);
  margin: 0 0 var(--o-r-gap-2) 0;
  @include h2;
  font-weight: 700;
  color: var(--o-color-info1);
}

.anchor-icon {
  font-size: 0.8em;
  color: var(--o-color-info3);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

h1:hover .anchor-icon,
h2:hover .anchor-icon,
h3:hover .anchor-icon {
  opacity: 1;
}

.title-actions {
  margin-top: var(--o-r-gap-2);
}

.banner-area {
  height: 160px;
  background: linear-gradient(90deg, #1a3d87 0%, #2153cf 60%, #5878d4 100%);
  border-radius: var(--o-radius-m);
  margin-bottom: var(--o-r-gap-6);
  overflow: hidden;
  position: relative;
}

.banner-deco {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 60%;
  pointer-events: none;
}

.content-section {
  margin-bottom: var(--o-r-gap-8);
}

.section-heading {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-2);
  margin: 0 0 var(--o-r-gap-4) 0;
  padding-top: var(--o-r-gap-6);
  @include h2;
  font-weight: 600;
  color: var(--o-color-info1);
  border-top: 1px solid var(--o-color-control3);
}

.subsection-heading {
  display: flex;
  align-items: center;
  gap: var(--o-r-gap-2);
  margin: var(--o-r-gap-5) 0 var(--o-r-gap-3) 0;
  @include h3;
  font-weight: 600;
  color: var(--o-color-info1);
}

.section-label {
  margin: 0 0 var(--o-r-gap-2) 0;
  @include text1;
  color: var(--o-color-info1);
}

.section-text {
  margin: 0 0 var(--o-r-gap-4) 0;
  @include text1;
  color: var(--o-color-info2);
}

.inline-message {
  margin-bottom: var(--o-r-gap-4);
}

.table-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--o-r-gap-2);
  @include tip1;
  color: var(--o-color-info2);
}

.expand-btn {
  padding: 0 4px;
}

.content-table {
  margin-bottom: var(--o-r-gap-5);
}

.code-block {
  background: var(--o-color-fill1);
  border-radius: var(--o-radius-xs);
  padding: var(--o-r-gap-4);
  font-family: monospace;
  @include tip1;
  color: var(--o-color-info2);
  overflow-x: auto;
  margin: var(--o-r-gap-3) 0;
  white-space: pre;
}

.code-block code {
  background: none;
  padding: 0;
  font-family: inherit;
}

/* Floating action buttons — OButton 尺寸覆盖为 40×40 */
.floating-actions {
  position: fixed;
  right: var(--o-r-gap-6);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-2);
  z-index: 10;
}

.action-btn.o-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  justify-content: center;
}
</style>
