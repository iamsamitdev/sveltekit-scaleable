import { browser } from '$app/environment'

const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export function setToken(token: string): void {
  if (browser) {
    localStorage.setItem(TOKEN_KEY, token)
  }
}

export function getToken(): string | null {
  if (browser) {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

export function setRefreshToken(refreshToken: string): void {
  if (browser) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

export function getRefreshToken(): string | null {
  if (browser) {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }
  return null
}

export function removeTokens(): void {
  if (browser) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const now = Date.now() / 1000
    return payload.exp < now
  } catch {
    return true
  }
}
