<script lang="ts">
  import { page } from '$app/stores'
  import { authStore } from '$lib/stores'
  
  $: currentPath = $page.url.pathname;
  $: user = $authStore.user;

  let { sidebarOpen = false }: { sidebarOpen?: boolean } = $props()

  // Navigation items
  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'แดชบอร์ด',
      icon: '📊'
    },
    {
      href: '/admin/users',
      label: 'จัดการผู้ใช้',
      icon: '👥'
    },
    {
      href: '/admin/settings',
      label: 'ตั้งค่าระบบ',
      icon: '⚙️'
    }
  ]

  function isActive(href: string): boolean {
    return currentPath === href || currentPath.startsWith(href + '/')
  }
</script>

<!-- Admin Sidebar -->
<nav class="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl overflow-y-auto z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}">
  <!-- Header -->
  <div class="p-6 border-b border-gray-700">
    <div class="flex items-center space-x-3">
      <div class="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <span class="text-lg font-bold">A</span>
      </div>
      <div>
        <h2 class="text-lg font-semibold">Admin Panel</h2>
        <p class="text-sm text-gray-300">ระบบจัดการ</p>
      </div>
    </div>
  </div>

  <!-- User Info -->
  <div class="p-4 border-b border-gray-700">
    <div class="flex items-center space-x-3">
      <div class="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center">
        <span class="text-sm font-medium">
          {user?.name?.charAt(0).toUpperCase() || 'A'}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-white truncate">
          {user?.name || 'Admin'}
        </p>
        <p class="text-xs text-gray-300 truncate">
          {user?.email || 'admin@example.com'}
        </p>
      </div>
      <div class="h-2 w-2 bg-green-400 rounded-full"></div>
    </div>
  </div>

  <!-- Navigation -->
  <div class="p-4">
    <nav class="space-y-2">
      {#each navItems as item}
        <a
          href={item.href}
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700 {isActive(item.href) 
            ? 'bg-blue-600 shadow-lg shadow-blue-600/20' 
            : 'text-gray-300 hover:text-white'}"
        >
          <span class="text-lg">{item.icon}</span>
          <span class="font-medium">{item.label}</span>
          {#if isActive(item.href)}
            <div class="ml-auto h-2 w-2 bg-white rounded-full"></div>
          {/if}
        </a>
      {/each}
    </nav>
  </div>

  <!-- Quick Actions -->
  <div class="p-4 border-t border-gray-700 mt-auto">
    <div class="space-y-2">
      <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        การดำเนินการด่วน
      </h3>
      
      <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
        <span>🔄</span>
        <span>รีเฟรชข้อมูล</span>
      </button>
      
      <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
        <span>📊</span>
        <span>ส่งออกรายงาน</span>
      </button>
      
      <button class="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
        <span>🔔</span>
        <span>การแจ้งเตือน</span>
        <span class="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
      </button>
    </div>
  </div>

  <!-- Bottom Info -->
  <div class="p-4 border-t border-gray-700">
    <div class="text-xs text-gray-400 space-y-1">
      <div class="flex justify-between">
        <span>เวอร์ชัน:</span>
        <span>v1.0.0</span>
      </div>
      <div class="flex justify-between">
        <span>สถานะ:</span>
        <span class="text-green-400">ทำงานปกติ</span>
      </div>
    </div>
  </div>
</nav>
