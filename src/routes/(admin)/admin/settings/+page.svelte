<script lang="ts">
  import { onMount } from 'svelte'
  import { adminService } from '$features/admin'

  let settings = {
    siteName: '',
    siteDescription: '',
    enableRegistration: true,
    maintenanceMode: false,
    emailNotifications: true,
    maxUploadSize: 10
  }
  
  let loading = true
  let saving = false
  let message = ''

  onMount(async () => {
    try {
      const response = await adminService.getSettings()
      if (response.success && response.data) {
        settings = { ...settings, ...response.data }
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      loading = false
    }
  })

  async function saveSettings() {
    saving = true
    message = ''
    
    try {
      const response = await adminService.updateSettings(settings)
      if (response.success) {
        message = 'บันทึกการตั้งค่าสำเร็จ'
      } else {
        message = response.error || 'เกิดข้อผิดพลาด'
      }
    } catch (error) {
      message = 'เกิดข้อผิดพลาดในการบันทึกการตั้งค่า'
    } finally {
      saving = false
      
      // Clear message after 3 seconds
      setTimeout(() => {
        message = ''
      }, 3000)
    }
  }
</script>

<svelte:head>
  <title>ตั้งค่าระบบ - Admin Panel</title>
</svelte:head>

<div class="p-6">
  <div class="mb-6">
    <h1 class="text-3xl font-bold text-gray-900">ตั้งค่าระบบ</h1>
    <p class="text-gray-600">จัดการการตั้งค่าทั่วไปของแอปพลิเคชัน</p>
  </div>

  {#if message}
    <div class="mb-6 p-4 rounded-lg {message.includes('สำเร็จ') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {message}
    </div>
  {/if}

  {#if loading}
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  {:else}
    <form on:submit|preventDefault={saveSettings} class="space-y-8">
      <!-- General Settings -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-900 mb-4">ข้อมูลทั่วไป</h2>
        
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อเว็บไซต์</label>
            <input
              type="text"
              bind:value={settings.siteName}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ชื่อเว็บไซต์ของคุณ"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">คำอธิบายเว็บไซต์</label>
            <textarea
              bind:value={settings.siteDescription}
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="คำอธิบายเกี่ยวกับเว็บไซต์ของคุณ"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- User Settings -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-900 mb-4">การตั้งค่าผู้ใช้</h2>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="enableRegistration"
              bind:checked={settings.enableRegistration}
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="enableRegistration" class="ml-2 block text-sm text-gray-900">
              เปิดให้ลงทะเบียนผู้ใช้ใหม่
            </label>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              id="emailNotifications"
              bind:checked={settings.emailNotifications}
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="emailNotifications" class="ml-2 block text-sm text-gray-900">
              ส่งการแจ้งเตือนทางอีเมล
            </label>
          </div>
        </div>
      </div>

      <!-- System Settings -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-gray-900 mb-4">การตั้งค่าระบบ</h2>
        
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="maintenanceMode"
              bind:checked={settings.maintenanceMode}
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="maintenanceMode" class="ml-2 block text-sm text-gray-900">
              โหมดบำรุงรักษา (ปิดเว็บไซต์ชั่วคราว)
            </label>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ขนาดไฟล์สูงสุดที่อัพโหลดได้ (MB)
            </label>
            <input
              type="number"
              bind:value={settings.maxUploadSize}
              min="1"
              max="100"
              class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
        </button>
      </div>
    </form>
  {/if}
</div>
