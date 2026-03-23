<script setup lang="ts">
const footerColumns = [
  {
    title: '关于openEuler',
    links: ['成员单位', '组织架构', '社区章程', '贡献看板', '社区介绍'],
  },
  {
    title: '新闻与资讯',
    links: ['新闻', '博客', '白皮书'],
  },
  {
    title: '获取与下载',
    links: ['获取openEuler操作系统', '获取木兰宽松许可证', '商业发行版', '软件中心'],
  },
  {
    title: '支持与服务',
    links: ['文档', 'FAQ', '联系我们', '反馈问题'],
  },
  {
    title: '互动与交流',
    links: ['邮件列表', '活动', '论坛'],
  },
  {
    title: '贡献与成长',
    links: ['SIG中心', '贡献攻略', '课程中心'],
  },
]
</script>

<template>
  <footer class="app-footer">
    <div class="footer-main">
      <div class="footer-inner">
        <div class="footer-desc">
          <p>openEuler是由开放原子开源基金会孵化的全场景开源操作系统项目，面向数字基础设施四大核心场景（服务器、云计算、边缘计算、嵌入式），全面支持ARM、x86、RISC-V、loongArch、PowerPC、SW-64等多样性计算架构</p>
          <img src="https://openeuler.org/img/atom-logo.png" alt="开放原子" height="40" />
        </div>
        <div class="footer-columns">
          <div v-for="col in footerColumns" :key="col.title" class="footer-col">
            <h4 class="footer-col-title">{{ col.title }}</h4>
            <ul class="footer-col-links">
              <li v-for="link in col.links" :key="link">
                <a href="#">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>版权所有 © 2025 openEuler 保留一切权利 | 备案号：京ICP备2020036654号-1</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background: #1a1a2e;
  color: #ccc;
  margin-top: auto;
}

.footer-main {
  padding: var(--o-r-gap-8) 0 var(--o-r-gap-6);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--o-r-gap-7);
  display: flex;
  gap: var(--o-r-gap-8);
}

.footer-desc {
  flex: 0 0 240px;
  @include tip1;
  color: #999;
}

.footer-desc img {
  margin-top: var(--o-r-gap-4);
  filter: brightness(0.8);
}

.footer-columns {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--o-r-gap-4);
}

.footer-col-title {
  margin: 0 0 var(--o-r-gap-3);
  @include tip1;
  font-weight: 600;
  color: #fff;
}

.footer-col-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--o-r-gap-2);
}

.footer-col-links a {
  @include tip2;
  color: #999;
  text-decoration: none;
}

.footer-col-links a:hover {
  color: #fff;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--o-r-gap-4) var(--o-r-gap-7);
  text-align: center;
  @include tip2;
  color: #666;
}
</style>
