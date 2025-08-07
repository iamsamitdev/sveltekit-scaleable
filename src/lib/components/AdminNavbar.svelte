<script lang="ts">
  import { authStore } from '$lib/stores'
  import { authService } from '$features/auth'

  // Subscribe to authStore and extract user
  import { get } from 'svelte/store';

  // Use Svelte's reactive $ syntax to access the store value
  // Remove invalid $derived import and usage

  // Access user from authStore reactively
  $: user = $authStore?.user ?? null;
  const $authStore = authStore;

  let { toggleSidebar, sidebarOpen }: { toggleSidebar?: () => void, sidebarOpen?: boolean } = $props()

  async function handleLogout() {
    await authService.logout()
  }
</script>

<!-- Admin Navbar -->
<header class="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-gray-800 text-white border-b border-gray-700">
  <div class="flex items-center space-x-4">
    <!-- Mobile Menu Toggle -->
    <button 
      class="lg:hidden p-1 rounded hover:bg-gray-700 transition-colors"
      on:click={toggleSidebar}
      aria-label="Toggle Sidebar"
    >
      {#if sidebarOpen}
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {:else}
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      {/if}
    </button>
    
    <div class="text-lg font-bold">Admin Panel</div>
    <div class="hidden md:block text-sm text-gray-300">
      ระบบจัดการแอปพลิเคชัน
    </div>
  </div>
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-2">
      <div class="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
        <span class="text-sm font-medium">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </span>
      </div>
      <div class="hidden md:block">
        <span class="text-sm">{user?.name || 'Admin'}</span>
        <div class="text-xs text-gray-300">ผู้ดูแลระบบ</div>
      </div>
    </div>
    
    <a href="/" class="hover:underline text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition-colors">
      🏠 กลับหน้าหลัก
    </a>
    
    <button
      on:click={handleLogout}
      class="hover:underline bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm"
    >
      🚪 ออกจากระบบ
    </button>
  </div>
</header>
