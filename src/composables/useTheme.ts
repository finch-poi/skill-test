import { computed, ref } from 'vue'

type Theme = `${string}.${'light' | 'dark'}`

const STORAGE_KEY = 'o-theme'

const theme = ref<Theme>(
  (localStorage.getItem(STORAGE_KEY) as Theme | null) ??
    (document.documentElement.getAttribute('data-o-theme') as Theme | null) ??
    'e.light',
)

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-o-theme', t)
  localStorage.setItem(STORAGE_KEY, t)
}

// Apply immediately so the composable is self-contained
applyTheme(theme.value)

export function useTheme() {
  const isDark = computed(() => theme.value.endsWith('.dark'))

  function toggleTheme() {
    const suffix = theme.value.endsWith('.dark') ? '.light' : '.dark'
    const prefix = theme.value.replace(/\.(light|dark)$/, '')
    theme.value = `${prefix}${suffix}` as Theme
    applyTheme(theme.value)
  }

  return { theme, isDark, toggleTheme }
}
