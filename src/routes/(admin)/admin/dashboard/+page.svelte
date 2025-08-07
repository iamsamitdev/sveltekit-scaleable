<script lang="ts">
  import { onMount } from 'svelte'
  import { adminService } from '$features/admin'
  import { authStore } from '$lib/stores'

  let stats = {
    totalUsers: 0,
    activeUsers: 0,
    totalOrders: 0,
    revenue: 0
  }
  let loading = true

  onMount(async () => {
    try {
      const response = await adminService.getDashboardStats()
      if (response.success) {
        stats = response.data as typeof stats
      }
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      loading = false
    }
  })

  $: user = $authStore.user
</script>

<svelte:head>
  <title>Dashboard - Admin Panel</title>
  <meta
    name="description"
    content="Admin Dashboard for managing the application."
  />
</svelte:head>

<div class="p-6">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    <p class="text-gray-600">ยินดีต้อนรับ {user?.name || 'Admin'}</p>
  </div>

  {#if loading}
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  {:else}
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">ผู้ใช้ทั้งหมด</p>
            <p class="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">ผู้ใช้ที่ออนไลน์</p>
            <p class="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">คำสั่งซื้อ</p>
            <p class="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">รายได้</p>
            <p class="text-2xl font-bold text-gray-900">฿{stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold text-gray-900 mb-4">การดำเนินการด่วน</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/admin/users" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <h3 class="font-semibold text-gray-900">จัดการผู้ใช้</h3>
          <p class="text-gray-600 text-sm">เพิ่ม แก้ไข หรือลบผู้ใช้ในระบบ</p>
        </a>
        <a href="/admin/settings" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <h3 class="font-semibold text-gray-900">ตั้งค่าระบบ</h3>
          <p class="text-gray-600 text-sm">กำหนดค่าการทำงานของแอปพลิเคชัน</p>
        </a>
        <div class="p-4 border border-gray-200 rounded-lg">
          <h3 class="font-semibold text-gray-900">รายงาน</h3>
          <p class="text-gray-600 text-sm">ดูรายงานสถิติการใช้งาน</p>
        </div>
      </div>
    </div>
  {/if}
</div>
