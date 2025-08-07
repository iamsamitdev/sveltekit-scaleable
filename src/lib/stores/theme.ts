import { writable } from 'svelte/store'

type Theme = 'light' | 'dark'

function createThemeStore() {
  const { subscribe, set } = writable<Theme>('light')

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      set(theme)
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
      }
    },
    initializeTheme: () => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as Theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = savedTheme || (prefersDark ? 'dark' : 'light')
        
        set(theme)
        document.documentElement.setAttribute('data-theme', theme)
      }
    }
  }
}

export const themeStore = createThemeStore()
