<script lang="ts">
  import { onMount } from 'svelte'
  import { adminService, adminStore } from '$features/admin'
  import type { User } from '$lib/types'

  let searchTerm = ''
  let showModal = false
  let editingUser: User | null = null
  let newUser = {
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user'
  }

  $: ({ users, loading, error, pagination } = $adminStore)

  onMount(() => {
    loadUsers()
  })

  async function loadUsers(page = 1) {
    adminStore.setLoading(true)
    try {
      const response = await adminService.getUsers(page, 10, searchTerm)
      if (response.success && response.data) {
        adminStore.setUsers(response.data.data ?? [], response.data.pagination)
      } else {
        adminStore.setError(response.error || 'เกิดข้อผิดพลาด')
      }
    } catch (error) {
      adminStore.setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้')
    } finally {
      adminStore.setLoading(false)
    }
  }

  function openCreateModal() {
    editingUser = null
    newUser = { name: '', email: '', role: 'user' }
    showModal = true
  }

  function openEditModal(user: User) {
    editingUser = user
    newUser = { name: user.name, email: user.email, role: user.role }
    showModal = true
  }

  function closeModal() {
    showModal = false
    editingUser = null
  }

  async function saveUser() {
    try {
      let response
      if (editingUser) {
        response = await adminService.updateUser(editingUser.id, newUser)
      } else {
        response = await adminService.createUser(newUser)
      }

      if (response.success) {
        loadUsers(pagination.page)
        closeModal()
      } else {
        alert(response.error || 'เกิดข้อผิดพลาด')
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
    }
  }

  async function deleteUser(user: User) {
    if (confirm(`คุณแน่ใจหรือไม่ที่จะลบผู้ใช้ ${user.name}?`)) {
      try {
        const response = await adminService.deleteUser(user.id)
        if (response.success) {
          loadUsers(pagination.page)
        } else {
          alert(response.error || 'เกิดข้อผิดพลาด')
        }
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการลบข้อมูล')
      }
    }
  }

  function handleSearch() {
    loadUsers(1)
  }
</script>

<svelte:head>
  <title>จัดการผู้ใช้ - Admin Panel</title>
</svelte:head>

<div class="p-6">
  <div class="mb-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold text-gray-900">จัดการผู้ใช้</h1>
      <button
        on:click={openCreateModal}
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        เพิ่มผู้ใช้ใหม่
      </button>
    </div>

    <!-- Search -->
    <div class="flex gap-4">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="ค้นหาผู้ใช้..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        on:click={handleSearch}
        class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        ค้นหา
      </button>
    </div>
  </div>

  {#if error}
    <div class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      {error}
    </div>
  {/if}

  {#if loading}
    <div class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  {:else}
    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ใช้</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">บทบาท</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่สร้าง</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each users as user (user.id)}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{user.name}</div>
                    <div class="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-semibold rounded-full {user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}">
                  {user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้ทั่วไป'}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString('th-TH')}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  on:click={() => openEditModal(user)}
                  class="text-blue-600 hover:text-blue-900 mr-4"
                >
                  แก้ไข
                </button>
                <button
                  on:click={() => deleteUser(user)}
                  class="text-red-600 hover:text-red-900"
                >
                  ลบ
                </button>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                ไม่พบข้อมูลผู้ใช้
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    {#if pagination.totalPages > 1}
      <div class="mt-6 flex justify-center">
        <nav class="flex gap-2">
          {#each Array(pagination.totalPages) as _, i}
            <button
              on:click={() => loadUsers(i + 1)}
              class="px-3 py-2 rounded-lg {pagination.page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
            >
              {i + 1}
            </button>
          {/each}
        </nav>
      </div>
    {/if}
  {/if}
</div>

<!-- Modal -->
{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {editingUser ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่'}
      </h2>
      
      <form on:submit|preventDefault={saveUser}>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
          <input
            type="text"
            bind:value={newUser.name}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
          <input
            type="email"
            bind:value={newUser.email}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">บทบาท</label>
          <select
            bind:value={newUser.role}
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">ผู้ใช้ทั่วไป</option>
            <option value="admin">ผู้ดูแลระบบ</option>
          </select>
        </div>
        
        <div class="flex gap-4">
          <button
            type="button"
            on:click={closeModal}
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editingUser ? 'อัพเดท' : 'สร้าง'}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
