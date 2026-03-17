import { ref, type Ref } from 'vue'
import { startLoading, endLoading } from './useGlobalLoading'

export interface AbortableRequestOptions {
  /** 是否触发全局 loading，默认 true */
  showLoading?: boolean
}

/**
 * 可中止请求 composable
 * 自动取消前一次未完成请求，避免竞态问题
 */
export function useAbortableRequest<TParams, TResult>(
  fetcher: (params: TParams, signal: AbortSignal) => Promise<TResult>,
  options?: AbortableRequestOptions,
) {
  const { showLoading: shouldLoad = true } = options ?? {}

  const data = ref<TResult>() as Ref<TResult | undefined>
  const loading = ref(false)
  const error = ref<Error>()

  let abortController: AbortController | null = null

  async function execute(params: TParams) {
    // 取消上一次请求
    if (abortController) {
      abortController.abort()
    }

    abortController = new AbortController()
    const { signal } = abortController

    loading.value = true
    error.value = undefined
    if (shouldLoad) startLoading()

    try {
      const result = await fetcher(params, signal)
      // 请求完成时若未被中止，更新数据
      if (!signal.aborted) {
        data.value = result
      }
    } catch (e) {
      // 忽略中止错误
      if (e instanceof DOMException && e.name === 'AbortError') {
        return
      }
      if (!signal.aborted) {
        error.value = e as Error
      }
    } finally {
      if (!signal.aborted) {
        loading.value = false
        if (shouldLoad) endLoading()
      }
    }
  }

  function cancel() {
    if (abortController) {
      abortController.abort()
      abortController = null
      loading.value = false
      if (shouldLoad) endLoading()
    }
  }

  return { data, loading, error, execute, cancel }
}
