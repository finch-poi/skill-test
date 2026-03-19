export interface PolicyItem {
  id: number
  title: string
  summary: string
  cover: string
  category: string
  author: string
  date: string
  tags: string[]
}

export interface PolicyQueryParams {
  page?: number
  pageSize?: number
  category?: string
  time?: string
  author?: string
  tags?: string[]
}

export interface PolicyListResult {
  total: number
  list: PolicyItem[]
}

// ---- 静态枚举 ----

export const POLICY_CATEGORIES = [
  '全部',
  '工具链/语言/运行',
  '架构/处理器/内核/驱动',
  '桌面/图形系统',
  '基础功能/特性/工具',
  '行业解决方案/应用',
  '通用中间件',
  '云原生基础设施',
  '社区职能组织',
  '构建系统/工具/依赖',
  '社区生态进展',
  '软件包管理相关',
  '版本发行相关',
  '社区基础设施',
  '其他',
] as const

export const POLICY_AUTHORS = ['张三', '李四', '王五', '赵六', '陈七']

export const POLICY_TAGS = ['规范', '贡献', '合规', '路线图', '治理', '流程', '版本', '工具链']

export const POLICY_TIME_OPTIONS = [
  { label: '全部', value: '' },
  { label: '2025 年', value: '2025' },
  { label: '2024 年', value: '2024' },
  { label: '2023 年', value: '2023' },
]

// ---- Mock 数据生成 ----

const TITLES = [
  'openEuler 技术委员会工作规范',
  '社区贡献者晋升路径规则',
  '开源项目合规使用指南',
  'SIG 组申请与退出管理办法',
  '版本发布流程规范',
  '补丁提交与审查规则',
  '安全漏洞处理流程',
  'Maintainer 职责与权利说明',
  '社区行为准则（Code of Conduct）',
  'openEuler 品牌使用规范',
  '技术路线评审机制',
  '代码许可证合规指南',
  '发行版构建与测试规范',
  'CI/CD 流水线治理说明',
  '依赖引入评审规则',
  '文档贡献与维护指引',
  '社区活动组织规范',
  '国际化与本地化规则',
  '用户反馈处理机制',
  '商业发行版兼容性规范',
]

const SUMMARIES = [
  '本规范详细说明了相关操作流程，明确各角色职责分工，确保社区活动有序开展，所有参与者均需遵守本规范中的约定内容。',
  '为保障社区技术决策的公正性与透明度，本文档对核心流程进行了系统性说明，提供完整的操作指引和注意事项。',
  '本指南旨在帮助开发者快速理解相关规则要求，避免常见问题，提升协作效率，适用于所有社区成员和合作伙伴。',
  '本文档从实践角度出发，结合社区真实案例，总结了行之有效的操作规范，持续更新以反映最新的社区决策。',
]

function buildMockItem(i: number): PolicyItem {
  const categories = POLICY_CATEGORIES.slice(1) as unknown as string[]
  return {
    id: i,
    title: TITLES[(i - 1) % TITLES.length]!,
    summary: SUMMARIES[(i - 1) % SUMMARIES.length]!,
    cover: `https://picsum.photos/seed/${i + 10}/400/240`,
    category: categories[(i - 1) % categories.length]!,
    author: POLICY_AUTHORS[(i - 1) % POLICY_AUTHORS.length]!,
    date: `${2024 + (i % 2)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    tags: [
      POLICY_TAGS[(i - 1) % POLICY_TAGS.length]!,
      POLICY_TAGS[i % POLICY_TAGS.length]!,
    ].filter((v, idx, arr) => arr.indexOf(v) === idx),
  }
}

const ALL_ITEMS: PolicyItem[] = Array.from({ length: 120 }, (_, i) => buildMockItem(i + 1))

// ---- API 函数 ----

export function fetchPolicyList(params: PolicyQueryParams): Promise<PolicyListResult> {
  const { page = 1, pageSize = 20, category, time, author, tags } = params

  return new Promise((resolve) => {
    setTimeout(() => {
      let list = [...ALL_ITEMS]

      if (category && category !== '全部') {
        list = list.filter((item) => item.category === category)
      }
      if (time) {
        list = list.filter((item) => item.date.startsWith(time))
      }
      if (author) {
        list = list.filter((item) => item.author === author)
      }
      if (tags && tags.length > 0) {
        list = list.filter((item) => tags.some((t) => item.tags.includes(t)))
      }

      const total = list.length
      const start = (page - 1) * pageSize
      resolve({ total, list: list.slice(start, start + pageSize) })
    }, 400)
  })
}
