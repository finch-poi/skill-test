/**
 * 基础请求封装
 * 基于 fetch，支持 AbortController 取消请求
 */

import { startLoading, endLoading } from '@/composables/useGlobalLoading'

const BASE_URL = '/api'

export interface RequestOptions extends Omit<RequestInit, 'signal'> {
  params?: Record<string, string | number | string[] | undefined>
  signal?: AbortSignal
  /** 是否触发全局 loading，默认 true */
  showLoading?: boolean
}

function buildQueryString(params: Record<string, string | number | string[] | undefined>): string {
  const searchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v))
    } else {
      searchParams.append(key, String(value))
    }
  }
  const qs = searchParams.toString()
  return qs ? `?${qs}` : ''
}

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { params, showLoading: shouldLoad = true, ...fetchOptions } = options

  if (shouldLoad) startLoading()

  const fullUrl = `${BASE_URL}${url}${params ? buildQueryString(params) : ''}`

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  } finally {
    if (shouldLoad) endLoading()
  }
}
