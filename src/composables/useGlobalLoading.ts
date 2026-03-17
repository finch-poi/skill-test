import { ref, computed } from 'vue'

const _count = ref(0)

/**
 * 全局 loading 状态
 * 基于计数器：请求开始 +1，结束 -1，count > 0 即为 loading
 */
export const isGlobalLoading = computed(() => _count.value > 0)

export function startLoading() {
  _count.value++
}

export function endLoading() {
  _count.value = Math.max(0, _count.value - 1)
}
