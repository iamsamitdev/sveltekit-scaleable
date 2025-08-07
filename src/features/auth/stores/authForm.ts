import { writable } from 'svelte/store'

interface AuthFormState {
  isLoading: boolean
  errors: Record<string, string[]>
  message: string
}

function createAuthFormStore() {
  const { subscribe, set, update } = writable<AuthFormState>({
    isLoading: false,
    errors: {},
    message: ''
  })

  return {
    subscribe,
    setLoading: (loading: boolean) => {
      update(state => ({ ...state, isLoading: loading }))
    },
    setErrors: (errors: Record<string, string[]>) => {
      update(state => ({ ...state, errors }))
    },
    setMessage: (message: string) => {
      update(state => ({ ...state, message }))
    },
    clearErrors: () => {
      update(state => ({ ...state, errors: {}, message: '' }))
    },
    reset: () => {
      set({ isLoading: false, errors: {}, message: '' })
    }
  }
}

export const authFormStore = createAuthFormStore()
