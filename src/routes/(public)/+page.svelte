<script lang="ts">
  import { authStore } from '$lib/stores'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  $: user = $authStore.user
  $: isAuthenticated = $authStore.isAuthenticated
  
  let errorMessage = ''

  onMount(() => {
    // ตรวจสอบ error parameter จาก URL
    const error = $page.url.searchParams.get('error')
    if (error === 'unauthorized') {
      errorMessage = 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้'
    }
  })
</script>

<svelte:head>
  <title>หน้าหลัก - SvelteKit Scaleable App</title>
  <meta name="description" content="แอปพลิเคชัน SvelteKit ที่ขยายตัวได้" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Hero Section -->
  <div class="bg-blue-600 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          ยินดีต้อนรับสู่ SvelteKit App
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-blue-100">
          แอปพลิเคชันที่ออกแบบมาเพื่อรองรับการขยายตัว พร้อม Authentication และ Admin Panel
        </p>
        
        {#if errorMessage}
          <div class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto">
            {errorMessage}
          </div>
        {/if}
        
        {#if isAuthenticated}
          <div class="space-y-4">
            <p class="text-blue-100">สวัสดี, {user?.name}!</p>
            
            {#if user?.role === 'admin'}
              <div class="space-x-4">
                <a
                  href="/admin/dashboard"
                  class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  เข้าสู่ Admin Panel
                </a>
              </div>
            {:else}
              <p class="text-blue-100">คุณได้เข้าสู่ระบบแล้ว</p>
            {/if}
          </div>
        {:else}
          <div class="space-x-4">
            <a
              href="/login"
              class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              เข้าสู่ระบบ
            </a>
            <a
              href="/register"
              class="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              สมัครสมาชิก
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">คุณสมบัติหลัก</h2>
        <p class="text-gray-600">สิ่งที่คุณจะได้รับจากแอปพลิเคชันนี้</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center p-6 bg-white rounded-lg shadow-md">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Authentication</h3>
          <p class="text-gray-600">ระบบเข้าสู่ระบบที่ปลอดภัย พร้อม JWT และ Role-based Access</p>
        </div>
        
        <div class="text-center p-6 bg-white rounded-lg shadow-md">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Admin Panel</h3>
          <p class="text-gray-600">หน้าจัดการสำหรับผู้ดูแลระบบ พร้อมการจัดการผู้ใช้และการตั้งค่า</p>
        </div>
        
        <div class="text-center p-6 bg-white rounded-lg shadow-md">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Scaleable Architecture</h3>
          <p class="text-gray-600">โครงสร้างที่ออกแบบมาเพื่อรองรับการขยายตัวและการพัฒนาในอนาคต</p>
        </div>
      </div>
    </div>
  </div>
</div>
