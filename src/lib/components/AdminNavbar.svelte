<script lang="ts">
  import { authStore } from '$lib/stores'
  import { authService } from '$features/auth'

  $: user = $authStore.user

  async function handleLogout() {
    await authService.logout()
  }
</script>

<!-- Admin Navbar -->
<header class="flex justify-between items-center p-4 bg-gray-800 text-white">
  <div class="text-lg font-bold">Admin Panel</div>
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-2">
      <div class="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
        <span class="text-sm font-medium">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </span>
      </div>
      <span>{user?.name || 'Admin'}</span>
    </div>
    
    <a href="/" class="hover:underline">กลับหน้าหลัก</a>
    
    <button
      on:click={handleLogout}
      class="hover:underline bg-red-600 px-3 py-1 rounded"
    >
      ออกจากระบบ
    </button>
  </div>
</header>
