import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

// จัดการ CORS
const corsHandle: Handle = async ({ event, resolve }) => {
  // ถ้าเป็น preflight request
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  const response = await resolve(event)
  
  // เพิ่ม CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

// จัดการ Authentication
const authHandle: Handle = async ({ event, resolve }) => {
  // ดึง token จาก header
  const authHeader = event.request.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  
  if (token) {
    try {
      // ตรวจสอบ token (ในการใช้งานจริงควรตรวจสอบกับ database หรือ JWT secret)
      const payload = JSON.parse(atob(token.split('.')[1]))
      
      // ตรวจสอบว่า token ยังไม่หมดอายุ
      if (payload.exp > Date.now() / 1000) {
        // เก็บข้อมูล user ใน locals สำหรับใช้ใน route handlers
        event.locals.user = payload.user
        event.locals.token = token
      }
    } catch (error) {
      // Token ไม่ถูกต้อง
      console.error('Invalid token:', error)
    }
  }
  
  return resolve(event)
}

// รวม handles ทั้งหมด
export const handle = sequence(corsHandle, authHandle)
