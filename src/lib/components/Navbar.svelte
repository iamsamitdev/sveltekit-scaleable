<script lang="ts">
  import { authStore } from '$lib/stores'
  import { authService } from '$features/auth'

  $: user = $authStore.user
  $: isAuthenticated = $authStore.isAuthenticated

  async function handleLogout() {
    await authService.logout()
  }
</script>

<nav class="bg-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="text-xl font-bold text-gray-900">
          SvelteKit App
        </a>
      </div>
      
      <div class="flex items-center space-x-4">
        {#if isAuthenticated}
          <span class="text-gray-700">สวัสดี, {user?.name}</span>
          
          {#if user?.role === 'admin'}
            <a href="/admin/dashboard" class="text-blue-600 hover:text-blue-800">
              Admin Panel
            </a>
          {/if}
          
          <button
            on:click={handleLogout}
            class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            ออกจากระบบ
          </button>
        {:else}
          <a href="/login" class="text-blue-600 hover:text-blue-800">
            เข้าสู่ระบบ
          </a>
          <a href="/register" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            สมัครสมาชิก
          </a>
        {/if}
      </div>
    </div>
  </div>
</nav>
