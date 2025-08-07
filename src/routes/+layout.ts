import { authStore } from '$lib/stores'
import { getToken } from '$lib/utils/token'

export const load = async () => {
  // Initialize auth store on app start
  if (typeof window !== 'undefined') {
    const token = getToken()
    if (token) {
      authStore.initializeAuth()
    }
  }
  
  return {}
}
