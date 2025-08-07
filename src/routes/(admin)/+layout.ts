import { redirect } from '@sveltejs/kit'
import { browser } from '$app/environment'
import { getToken, isTokenExpired } from '$lib/utils/token'

export const load = async ({ url }: any) => {
  // ถ้าไม่ได้อยู่ใน browser ให้ผ่าน (สำหรับ SSR)
  if (!browser) {
    return {}
  }
  
  const token = getToken()
  
  // ถ้าไม่มี token หรือ token หมดอายุ
  if (!token || isTokenExpired(token)) {
    // เปลี่ยนเส้นทางไปหน้า login พร้อมกับ redirect parameter
    const redirectTo = encodeURIComponent(url.pathname + url.search)
    throw redirect(302, `/login?redirect=${redirectTo}`)
  }
  
  // ตรวจสอบ role จาก token
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    
    // ตรวจสอบว่าเป็น admin หรือไม่
    if (payload.user?.role !== 'admin') {
      throw redirect(302, '/?error=unauthorized')
    }
    
    return {
      user: payload.user
    }
  } catch (error) {
    // ถ้า decode token ไม่ได้
    throw redirect(302, '/login')
  }
}
