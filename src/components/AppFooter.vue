<script setup lang="ts">
import { OLink, ODivider } from '@opensig/opendesign'

const footerSections = [
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
    links: ['获取openEuler操作系统', '最新社区发行版', '商业发行版', '软件中心'],
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

const friendLinks = [
  '木兰开源社区',
  '鳃朋社区',
  '鳃鹏小智',
  '鹏城实验室',
  'InfoQ',
  '开源社',
  '中科曙光',
  'Authing',
  'openGauss',
  '昇思MindSpore',
  'Elgaira',
]
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <p class="footer-slogan">
        openEuler 是由开放原子开源基金会（OpenAtom Foundation）孵化及运营的开源项目
      </p>
    </div>

    <ODivider />

    <div class="footer-links">
      <div v-for="section in footerSections" :key="section.title" class="footer-col">
        <h4 class="footer-col-title">{{ section.title }}</h4>
        <OLink
          v-for="link in section.links"
          :key="link"
          color="normal"
          class="footer-link"
        >
          {{ link }}
        </OLink>
      </div>
    </div>

    <ODivider />

    <div class="footer-friend-links">
      <span class="friend-label">友情链接</span>
      <OLink
        v-for="link in friendLinks"
        :key="link"
        color="normal"
        class="friend-link"
      >
        {{ link }}
      </OLink>
    </div>

    <ODivider />

    <div class="footer-bottom">
      <div class="footer-brand">
        <img
          src="https://www.openeuler.org/img/logo/dark.svg"
          alt="openEuler"
          class="footer-logo"
        />
        <p class="footer-email">contact@openeuler.org</p>
      </div>
      <div class="footer-legal">
        <div class="legal-links">
          <OLink color="normal">品牌</OLink>
          <span>|</span>
          <OLink color="normal">隐私政策</OLink>
          <span>|</span>
          <OLink color="normal">法律声明</OLink>
        </div>
        <p class="copyright">版权所有 © 2024 openEuler 保留一切权利</p>
        <p class="license">遵循 木兰宽松许可证第2版（MulanPSL 2）</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #191b22;
  color: rgba(255, 255, 255, 0.8);
  padding: var(--o-gap-7) 0;
}

.footer-top {
  text-align: center;
  padding-bottom: var(--o-gap-5);
}

.footer-slogan {
  font-size: var(--o-font_size-text1);
}

.footer-links {
  max-width: 1416px;
  margin: 0 auto;
  padding: var(--o-gap-5) var(--o-gap-5);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--o-gap-5);
}

.footer-col-title {
  font-size: var(--o-font_size-text1);
  font-weight: 500;
  color: #fff;
  margin-bottom: var(--o-gap-3);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-2);
}

.footer-link {
  font-size: var(--o-font_size-tip1);
  color: rgba(255, 255, 255, 0.6) !important;
}

.footer-friend-links {
  max-width: 1416px;
  margin: 0 auto;
  padding: var(--o-gap-4) var(--o-gap-5);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--o-gap-4);
}

.friend-label {
  font-size: var(--o-font_size-tip1);
  color: rgba(255, 255, 255, 0.6);
}

.friend-link {
  font-size: var(--o-font_size-tip1);
  color: rgba(255, 255, 255, 0.5) !important;
}

.footer-bottom {
  max-width: 1416px;
  margin: 0 auto;
  padding: var(--o-gap-5) var(--o-gap-5) 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-2);
}

.footer-logo {
  height: 24px;
  width: auto;
  object-fit: contain;
  align-self: flex-start;
}

.footer-email {
  font-size: var(--o-font_size-tip1);
  color: rgba(255, 255, 255, 0.6);
}

.footer-legal {
  text-align: right;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: var(--o-gap-3);
  justify-content: flex-end;
  margin-bottom: var(--o-gap-2);
  font-size: var(--o-font_size-tip1);
  color: rgba(255, 255, 255, 0.6);
}

.copyright,
.license {
  font-size: var(--o-font_size-tip2);
  color: rgba(255, 255, 255, 0.5);
  margin-top: var(--o-gap-1);
}
</style>
