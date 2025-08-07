<script lang="ts">
  import { authStore } from '$lib/stores'
  import { authService } from '$features/auth'
  import { onMount } from 'svelte'

  $: user = $authStore.user
  $: isAuthenticated = $authStore.isAuthenticated

  let scrollY = 0
  let navbarHeight = 64 // 16 * 4 = 64px (h-16)

  async function handleLogout() {
    await authService.logout()
  }

  onMount(() => {
    // Add padding to body to compensate for fixed navbar
    document.body.style.paddingTop = `${navbarHeight}px`
    
    return () => {
      // Cleanup on unmount
      document.body.style.paddingTop = '0'
    }
  })
</script>

<svelte:window bind:scrollY />

<nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-all duration-300 {scrollY > 50 ? 'shadow-xl backdrop-blur-sm bg-white/95' : ''}">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          <div class="h-8 w-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">SK</span>
          </div>
          <span>SvelteKit App</span>
        </a>
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-6">
        {#if isAuthenticated}
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-full">
              <div class="h-6 w-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span class="text-white text-xs font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span class="text-sm text-gray-700">สวัสดี, {user?.name}</span>
            </div>
            
            {#if user?.role === 'admin'}
              <a 
                href="/admin/dashboard" 
                class="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
              >
                <span>👑</span>
                <span>Admin Panel</span>
              </a>
            {/if}
            
            <button
              on:click={handleLogout}
              class="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all hover:shadow-lg"
            >
              <span>🚪</span>
              <span>ออกจากระบบ</span>
            </button>
          </div>
        {:else}
          <div class="flex items-center space-x-4">
            <a 
              href="/login" 
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              เข้าสู่ระบบ
            </a>
            <a 
              href="/register" 
              class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              สมัครสมาชิก
            </a>
          </div>
        {/if}
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden flex items-center">
        <button 
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="เปิดเมนู"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="md:hidden border-t border-gray-200 bg-white">
    <div class="px-4 py-3 space-y-2">
      {#if isAuthenticated}
        <div class="flex items-center space-x-3 pb-3 border-b border-gray-100">
          <div class="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{user?.name}</p>
            <p class="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        {#if user?.role === 'admin'}
          <a 
            href="/admin/dashboard" 
            class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <span>👑</span>
            <span>Admin Panel</span>
          </a>
        {/if}
        
        <button
          on:click={handleLogout}
          class="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
        >
          <span>🚪</span>
          <span>ออกจากระบบ</span>
        </button>
      {:else}
        <a 
          href="/login" 
          class="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          เข้าสู่ระบบ
        </a>
        <a 
          href="/register" 
          class="block px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"
        >
          สมัครสมาชิก
        </a>
      {/if}
    </div>
  </div>
</nav>
