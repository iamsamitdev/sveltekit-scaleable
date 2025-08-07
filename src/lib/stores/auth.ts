import { writable } from 'svelte/store'
import type { User, Session } from '$lib/types'
import { browser } from '$app/environment'
import { getToken, removeTokens } from '$lib/utils/token'

function createAuthStore() {
  const { subscribe, set, update } = writable<Session>({
    user: null as any,
    token: '',
    isAuthenticated: false
  })

  return {
    subscribe,
    
    // เซ็ต session เมื่อ login สำเร็จ
    setSession: (user: User, token: string) => {
      set({
        user,
        token,
        isAuthenticated: true
      })
    },
    
    // อัพเดท user profile
    updateUser: (userData: Partial<User>) => {
      update(session => ({
        ...session,
        user: { ...session.user, ...userData }
      }))
    },
    
    // ล้าง session เมื่อ logout
    clearSession: () => {
      set({
        user: null as any,
        token: '',
        isAuthenticated: false
      })
      removeTokens()
    },
    
    // ตรวจสอบ session จาก localStorage
    initializeAuth: () => {
      if (browser) {
        const token = getToken()
        if (token) {
          // ตรวจสอบ token และ decode user data
          try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            if (payload.exp > Date.now() / 1000) {
              set({
                user: payload.user,
                token,
                isAuthenticated: true
              })
            } else {
              removeTokens()
            }
          } catch {
            removeTokens()
          }
        }
      }
    }
  }
}

export const authStore = createAuthStore()
