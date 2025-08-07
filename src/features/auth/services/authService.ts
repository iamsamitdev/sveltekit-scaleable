import { apiService } from '$lib/services'
import type { LoginCredentials, RegisterData, AuthResponse, User } from '$lib/types'
import { setToken, setRefreshToken } from '$lib/utils/token'
import { authStore } from '$lib/stores'

class AuthService {
  async login(credentials: LoginCredentials) {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials)
    
    if (response.success && response.data) {
      const { user, token, refreshToken } = response.data
      
      // เก็บ token ใน localStorage
      setToken(token)
      if (refreshToken) {
        setRefreshToken(refreshToken)
      }
      
      // อัพเดท auth store
      authStore.setSession(user, token)
      
      return response
    }
    
    return response
  }
  
  async register(data: RegisterData) {
    return await apiService.post<AuthResponse>('/auth/register', data)
  }
  
  async logout() {
    try {
      await apiService.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      authStore.clearSession()
    }
  }
  
  async getCurrentUser() {
    const response = await apiService.get<User>('/auth/me')
    
    if (response.success && response.data) {
      authStore.updateUser(response.data)
    }
    
    return response
  }
  
  async refreshToken() {
    return await apiService.post<AuthResponse>('/auth/refresh')
  }
  
  async forgotPassword(email: string) {
    return await apiService.post('/auth/forgot-password', { email })
  }
  
  async resetPassword(token: string, password: string) {
    return await apiService.post('/auth/reset-password', { token, password })
  }
}

export const authService = new AuthService()
