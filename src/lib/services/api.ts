import { browser } from '$app/environment'
import type { ApiResponse } from '$lib/types'
import { getToken, removeTokens } from '$lib/utils/token'

const API_BASE_URL = 'http://localhost:3000/api' // เปลี่ยนตาม API ของคุณ

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    // เพิ่ม Authorization header ถ้ามี token
    if (browser) {
      const token = getToken()
      if (token) {
        defaultHeaders.Authorization = `Bearer ${token}`
      }
    }
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }
    
    try {
      const response = await fetch(url, config)
      
      // ถ้า token หมดอายุ ให้ logout
      if (response.status === 401) {
        removeTokens()
        if (browser) {
          window.location.href = '/login'
        }
      }
      
      const data = await response.json()
      
      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'เกิดข้อผิดพลาด',
          errors: data.errors
        }
      }
      
      return {
        success: true,
        data: data.data || data,
        message: data.message
      }
    } catch (error) {
      console.error('API Error:', error)
      return {
        success: false,
        error: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้'
      }
    }
  }
  
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }
  
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
  
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
  
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiService = new ApiService()
