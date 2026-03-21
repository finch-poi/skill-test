export interface PolicyCard {
  id: number
  cover: string
  title: string
  detail: string
}

export interface PolicyListResult {
  total: number
  list: PolicyCard[]
}

export async function getPolicyList(params: {
  page: number
  pageSize: number
  category?: string
}): Promise<PolicyListResult> {
  // 模拟网络延迟
  await new Promise((r) => setTimeout(r, 200))

  const total = 120
  const list = Array.from({ length: params.pageSize }, (_, i) => {
    const index = (params.page - 1) * params.pageSize + i
    return {
      id: index + 1,
      cover: `https://picsum.photos/seed/${index + 10}/400/240`,
      title: '标题文本标题文本',
      detail:
        '内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本',
    }
  })

  return { total, list }
}
