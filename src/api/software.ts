import { request } from './request'

export interface SoftwareItem {
  name: string
  icon: string
  iconBg: string
  description: string
  domain: string
}

export interface SoftwareQueryParams {
  keyword?: string
  versions?: string[]
  archs?: string[]
  domains?: string[]
  tab?: string
  page?: number
  pageSize?: number
}

export interface SoftwareListResponse {
  list: SoftwareItem[]
  total: number
}

// ---- Mock 数据 ----
const MOCK_ITEMS: SoftwareItem[] = [
  {
    name: 'alertmanager',
    icon: '🔔',
    iconBg: '#e8453c',
    description:
      'Alertmanager处理客户端应用程序（例如Prometheus服务器）发送的警报。它负责重复数据删除、分组，并将它们路由到正确的接收器集成，例如电子邮件、PagerDuty 或 OpsGenie。',
    domain: '数据库',
  },
  {
    name: 'bind9',
    icon: '🌐',
    iconBg: '#2a6496',
    description:
      'BIND9 (Berkeley Internet Name Domain 9) 是一款开源的域名系统（DNS）软件，用于将域名转换为对应的IP地址，包括权威服务器、递归解析器和相关工具。',
    domain: 'AI',
  },
  {
    name: 'bisheng-jdk',
    icon: '☕',
    iconBg: '#40b884',
    description:
      'BiSheng JDK（BiSheng Java Development Kit），即毕昇JDK，是华为内部基于OpenJDK定制的Huawei JDK的开源版本，是一个高性能、可用于生产环境的OpenJDK发行版。',
    domain: '分布式存储',
  },
  {
    name: 'ceph',
    icon: '💾',
    iconBg: '#f15a24',
    description:
      'Ceph 是一种开源的分布式存储系统，提供对象存储、块存储和文件系统存储，适用于大规模集群部署场景。',
    domain: '分布式存储',
  },
  {
    name: 'docker-ce',
    icon: '🐳',
    iconBg: '#0db7ed',
    description:
      'Docker CE (Community Edition) 是一个开源的容器化平台，允许开发者打包、分发和运行应用程序在轻量级容器中。',
    domain: '云服务',
  },
  {
    name: 'elasticsearch',
    icon: '🔍',
    iconBg: '#fed10a',
    description:
      'Elasticsearch 是一个基于 Lucene 的分布式、RESTful 风格的搜索和数据分析引擎，广泛用于全文搜索、日志分析和实时数据分析。',
    domain: '大数据',
  },
  {
    name: 'grafana',
    icon: '📊',
    iconBg: '#f46800',
    description:
      'Grafana 是一个开源的数据可视化和监控平台，支持多种数据源，提供丰富的仪表板和告警功能。',
    domain: '数据库',
  },
  {
    name: 'hadoop',
    icon: '🐘',
    iconBg: '#ffcc00',
    description:
      'Apache Hadoop 是一个开源框架，支持使用简单的编程模型在计算机集群上分布式存储和处理大规模数据集。',
    domain: '大数据',
  },
  {
    name: 'kafka',
    icon: '📨',
    iconBg: '#231f20',
    description:
      'Apache Kafka 是一个开源的分布式事件流平台，用于高性能数据管道、流分析、数据集成和关键任务应用。',
    domain: '大数据',
  },
  {
    name: 'kubernetes',
    icon: '⎈',
    iconBg: '#326ce5',
    description:
      'Kubernetes 是一个开源容器编排平台，自动化容器化应用程序的部署、扩展和管理。',
    domain: '云服务',
  },
  {
    name: 'mindspore',
    icon: '🧠',
    iconBg: '#6c3ec9',
    description:
      'MindSpore 是华为开源的全场景深度学习框架，支持端边云全场景协同训练和推理。',
    domain: 'AI',
  },
  {
    name: 'mysql',
    icon: '🐬',
    iconBg: '#00758f',
    description:
      'MySQL 是全球最流行的开源关系型数据库管理系统，广泛应用于Web应用程序的数据存储。',
    domain: '数据库',
  },
]

function mockFilter(params: SoftwareQueryParams): SoftwareListResponse {
  let filtered = [...MOCK_ITEMS]

  if (params.keyword) {
    const kw = params.keyword.toLowerCase()
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(kw) || item.description.toLowerCase().includes(kw),
    )
  }

  if (params.domains && params.domains.length > 0) {
    filtered = filtered.filter((item) => params.domains!.includes(item.domain))
  }

  // 版本和架构筛选在 mock 中仅模拟，不实际过滤
  const total = filtered.length
  const page = params.page ?? 1
  const size = params.pageSize ?? 20
  const start = (page - 1) * size
  const list = filtered.slice(start, start + size)

  return { list, total }
}

/**
 * 获取软件列表
 * Mock 模式：延迟 300-800ms 模拟网络请求
 */
export async function fetchSoftwareList(
  params: SoftwareQueryParams,
  signal?: AbortSignal,
): Promise<SoftwareListResponse> {
  // Mock 延迟
  const delay = 300 + Math.random() * 500
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, delay)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })

  // 若已中止则抛出
  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError')
  }

  return mockFilter(params)

  // 真实请求时替换为：
  // return request<SoftwareListResponse>('/software/list', { params: { ...params }, signal })
}
