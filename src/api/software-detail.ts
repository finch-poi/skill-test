// import { request } from './request'

// ---- Core Detail Interfaces ----

export interface SoftwareDetailInfo {
  name: string
  icon: string
  iconBg: string
  description: string
  externalLink: string
  version: string
}

export interface InstallStep {
  title: string
  command: string
}

export interface InstallMethod {
  label: string
  value: string
  steps: InstallStep[]
}

export interface RequiresItem {
  id: string
  requires: string
  flags: string
  rel: string
  ver: string
  epoch: string
}

export interface ProvidesItem {
  id: string
  provides: string
  flags: string
  rel: string
  ver: string
  epoch: string
}

export interface MoreInfoData {
  requires: RequiresItem[]
  provides: ProvidesItem[]
}

export interface MaintainerData {
  maintainer: string
  email: string
  repoUrl: string
  repoLabel: string
}

export interface BasicInfoData {
  versionSupport: string
  category: string
  repo: string
  repoLink: string
  repoSource: string
}

export interface ClassificationData {
  level: string
  descriptionLink: string
}

export interface ComplianceData {
  license: string
}

export interface VersionSupportRow {
  id: string
  eulerVersion: string
  arch: string
  isCurrent: boolean
}

export interface FeedbackItem {
  id: string
  title: string
  tags: string[]
  description: string
  author: string
  date: string
  status: '待分析' | '进行中' | '已完成' | '已驳回'
}

export interface FeedbackHistoryResponse {
  list: FeedbackItem[]
  total: number
}

export interface SoftwareDetailResponse {
  info: SoftwareDetailInfo
  installMethods: InstallMethod[]
  moreInfo: MoreInfoData
  maintainer: MaintainerData
  basicInfo: BasicInfoData
  classification: ClassificationData
  compliance: ComplianceData
  versionSupport: VersionSupportRow[]
}

// ---- Mock Data ----

const MOCK_DETAIL: SoftwareDetailResponse = {
  info: {
    name: 'Redis',
    icon: 'https://redis.io/wp-content/uploads/2024/04/Logotype.svg',
    iconBg: '#dc382d',
    description:
      'Redis is an advanced key-value store. It is often referred to as a datstructure server since keys can contain strings, hashes ,lists, sets anorted sets.Redis is an advanced key-value store. It is often referred to as a datstructure server since keys can contain strings, hashes ,lists, sets anorted sets.Redis is an advanced key-value store. It is often referred to as a datstructure server since keys can contain strings, hashes ,lists, sets anorted ...',
    externalLink: 'https://redis.io',
    version: '4.0.14-6.oe2409',
  },
  installMethods: [
    {
      label: '在线安装',
      value: 'online',
      steps: [
        {
          title: '添加源',
          command:
            'dnf config-manager --add-repo https://repo.openeuler.org/openEuler-24.03-LTS-SP1/everything/aarch64',
        },
        {
          title: '更新源索引',
          command: 'dnf clean all && dnf makecache',
        },
        {
          title: '安装 redis 软件包',
          command: 'dnf install redis',
        },
      ],
    },
    {
      label: '下载安装',
      value: 'download',
      steps: [
        {
          title: '下载 RPM 包',
          command:
            'wget https://repo.openeuler.org/openEuler-24.03-LTS-SP1/everything/aarch64/Packages/redis-4.0.14-6.oe2409.aarch64.rpm',
        },
        {
          title: '安装 RPM 包',
          command: 'rpm -ivh redis-4.0.14-6.oe2409.aarch64.rpm',
        },
      ],
    },
  ],
  moreInfo: {
    requires: [
      { id: '1', requires: 'redis6', flags: 'EQ', rel: '6.oe2209', ver: '6.0.11', epoch: '0' },
      {
        id: '2',
        requires: 'redis6-devel',
        flags: 'EQ',
        rel: '6.oe2209',
        ver: '6.0.11',
        epoch: '0',
      },
      { id: '3', requires: 'redis6-doc', flags: 'EQ', rel: '6.oe2209', ver: '6.0.11', epoch: '0' },
      {
        id: '4',
        requires: 'redis6-debuginfo',
        flags: 'EQ',
        rel: '6.oe2209',
        ver: '6.0.11',
        epoch: '0',
      },
      {
        id: '5',
        requires: 'redis6-debugsource',
        flags: 'EQ',
        rel: '6.oe2209',
        ver: '6.0.11',
        epoch: '0',
      },
    ],
    provides: [
      {
        id: '1',
        provides: 'config(redis)',
        flags: 'EQ',
        rel: '',
        ver: '4.0.14-6.oe2409',
        epoch: '',
      },
      { id: '2', provides: 'redis', flags: 'EQ', rel: '', ver: '4.0.14-6.oe2409', epoch: '' },
    ],
  },
  maintainer: {
    maintainer: 'openEuler community',
    email: 'wufengguang@huawei.com',
    repoUrl: 'https://github.com/redis/node-redis',
    repoLabel: 'github.com/redis/node-redis',
  },
  basicInfo: {
    versionSupport: 'openEuler-24.03-LTS-SP1',
    category: '其他',
    repo: 'openEuler官方仓库',
    repoLink: 'https://repo.openeuler.org/',
    repoSource: 'EPOL',
  },
  classification: {
    level: 'L1',
    descriptionLink: 'https://www.openeuler.org/zh/blog/20230220-level/',
  },
  compliance: {
    license: 'BSD-3-Clause license',
  },
  versionSupport: [
    { id: '1', eulerVersion: 'openEuler-24.03-LTS', arch: 'aarch64', isCurrent: true },
    { id: '2', eulerVersion: 'openEuler-24.03-LTS', arch: 'x86_64', isCurrent: false },
    { id: '3', eulerVersion: 'openEuler-23.09', arch: 'aarch64', isCurrent: false },
    { id: '4', eulerVersion: 'openEuler-23.09', arch: 'x86_64', isCurrent: false },
    { id: '5', eulerVersion: 'openEuler-23.03', arch: 'aarch64', isCurrent: false },
    { id: '6', eulerVersion: 'openEuler-23.03', arch: 'x86_64', isCurrent: false },
    { id: '7', eulerVersion: 'openEuler-22.09', arch: 'aarch64', isCurrent: false },
    { id: '8', eulerVersion: 'openEuler-22.09', arch: 'x86_64', isCurrent: false },
    { id: '9', eulerVersion: 'openEuler-22.03-LTS-SP3', arch: 'aarch64', isCurrent: false },
    { id: '10', eulerVersion: 'openEuler-22.03-LTS-SP3', arch: 'x86_64', isCurrent: false },
  ],
}

const MOCK_FEEDBACK: FeedbackItem[] = [
  {
    id: '1',
    title: 'config-manager缺失',
    tags: ['紧急'],
    description:
      '【EasySoftware】【OEPKG】openEuler-20.03-LTS-SP1building-openeulerstandard_aarch64&aarch64&appweb8.2.1...',
    author: 'bot',
    date: '2024-12-01',
    status: '待分析',
  },
  {
    id: '2',
    title: '安装后服务无法启动',
    tags: [],
    description: '在 openEuler-24.03-LTS 上安装 redis 后，systemctl start redis 报错...',
    author: '用户A',
    date: '2024-11-15',
    status: '进行中',
  },
  {
    id: '3',
    title: '版本兼容性问题',
    tags: [],
    description: 'Redis 4.0 版本与某些客户端库不兼容，建议升级到 6.x...',
    author: '用户B',
    date: '2024-10-20',
    status: '已完成',
  },
]

// ---- Mock Delay Helper ----

function mockDelay(min: number, max: number, signal?: AbortSignal): Promise<void> {
  const delay = min + Math.random() * (max - min)
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, delay)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

// ---- API Functions ----

export async function fetchSoftwareDetail(
  params: { name: string },
  signal?: AbortSignal,
): Promise<SoftwareDetailResponse> {
  await mockDelay(300, 800, signal)
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
  // Real: return request<SoftwareDetailResponse>(`/software/detail/${params.name}`, { signal })
  void params
  return MOCK_DETAIL
}

export async function fetchFeedbackHistory(
  params: { name: string; status?: string; page?: number; pageSize?: number },
  signal?: AbortSignal,
): Promise<FeedbackHistoryResponse> {
  await mockDelay(200, 500, signal)
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
  // Real: return request<FeedbackHistoryResponse>(`/software/${params.name}/feedback`, { params, signal })
  let filtered = [...MOCK_FEEDBACK]
  if (params.status && params.status !== '全部') {
    filtered = filtered.filter((item) => item.status === params.status)
  }
  return { list: filtered, total: filtered.length }
}
