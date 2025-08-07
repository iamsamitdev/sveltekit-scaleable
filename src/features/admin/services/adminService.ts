import { apiService } from '$lib/services'
import type { User, PaginatedResponse } from '$lib/types'

class AdminService {
  // Dashboard
  async getDashboardStats() {
    return await apiService.get('/admin/dashboard/stats')
  }

  // Users management
  async getUsers(page = 1, limit = 10, search = '') {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search
    })
    
    return await apiService.get<PaginatedResponse<User>>(`/admin/users?${params}`)
  }

  async getUser(id: string) {
    return await apiService.get<User>(`/admin/users/${id}`)
  }

  async createUser(userData: Partial<User>) {
    return await apiService.post<User>('/admin/users', userData)
  }

  async updateUser(id: string, userData: Partial<User>) {
    return await apiService.put<User>(`/admin/users/${id}`, userData)
  }

  async deleteUser(id: string) {
    return await apiService.delete(`/admin/users/${id}`)
  }

  // Settings
  async getSettings() {
    return await apiService.get('/admin/settings')
  }

  async updateSettings(settings: Record<string, any>) {
    return await apiService.put('/admin/settings', settings)
  }
}

export const adminService = new AdminService()
