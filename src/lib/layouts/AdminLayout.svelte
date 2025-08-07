<script lang="ts">
  import AdminFooter from "$lib/components/AdminFooter.svelte"
  import AdminNavbar from "$lib/components/AdminNavbar.svelte"
  import AdminSidebar from "$lib/components/AdminSidebar.svelte"

  let { children } = $props()
  let sidebarOpen = false

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen
  }
</script>

<div class="min-h-screen bg-gray-100">
  <AdminNavbar {toggleSidebar} {sidebarOpen} />
  
  <!-- Overlay for mobile -->
  {#if sidebarOpen}
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      on:click={toggleSidebar}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Escape' && toggleSidebar()}
    ></div>
  {/if}
  
  <div class="flex">
    <AdminSidebar {sidebarOpen} />
    <div class="flex-1 lg:ml-64 flex flex-col min-h-[calc(100vh-4rem)] transition-all duration-300">
      <main class="flex-1 p-4 lg:p-6 pt-6">
        {@render children?.()}
      </main>
      <AdminFooter />
    </div>
  </div>
</div>
