<script lang="ts">
  import { goto } from '$app/navigation'
  import { authService } from '../services'
  import { authFormStore } from '../stores'
  import { validateForm, validatePassword } from '$lib/utils'
  import type { RegisterData } from '$lib/types'

  let formData: RegisterData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  $: ({ isLoading, errors, message } = $authFormStore)

  async function handleSubmit() {
    authFormStore.clearErrors()
    
    // Validate form
    const validation = validateForm(formData, {
      name: ['required', 'min:2'],
      email: ['required', 'email'],
      password: ['required'],
      confirmPassword: ['required']
    })
    
    let formErrors = { ...validation.errors }
    
    // Validate password strength
    if (formData.password) {
      const passwordValidation = validatePassword(formData.password)
      if (!passwordValidation.isValid) {
        formErrors.password = passwordValidation.errors
      }
    }
    
    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = ['รหัสผ่านไม่ตรงกัน']
    }
    
    if (Object.keys(formErrors).length > 0) {
      authFormStore.setErrors(formErrors)
      return
    }
    
    authFormStore.setLoading(true)
    
    try {
      const response = await authService.register(formData)
      
      if (response.success) {
        authFormStore.setMessage('สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ')
        setTimeout(() => {
          goto('/login')
        }, 2000)
      } else {
        authFormStore.setMessage(response.error || 'เกิดข้อผิดพลาด')
        if (response.errors) {
          authFormStore.setErrors(response.errors)
        }
      }
    } catch (error) {
      authFormStore.setMessage('เกิดข้อผิดพลาดในการสมัครสมาชิก')
    } finally {
      authFormStore.setLoading(false)
    }
  }
</script>

<div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-center mb-6">สมัครสมาชิก</h2>
  
  {#if message}
    <div class="mb-4 p-3 rounded {message.includes('สำเร็จ') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
      {message}
    </div>
  {/if}
  
  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="กรอกชื่อของคุณ"
        disabled={isLoading}
      />
      {#if errors.name}
        <div class="mt-1 text-sm text-red-600">
          {#each errors.name as error}
            <div>{error}</div>
          {/each}
        </div>
      {/if}
    </div>

    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
      <input
        type="email"
        id="email"
        bind:value={formData.email}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="กรอกอีเมลของคุณ"
        disabled={isLoading}
      />
      {#if errors.email}
        <div class="mt-1 text-sm text-red-600">
          {#each errors.email as error}
            <div>{error}</div>
          {/each}
        </div>
      {/if}
    </div>
    
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700 mb-2">รหัสผ่าน</label>
      <input
        type="password"
        id="password"
        bind:value={formData.password}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="กรอกรหัสผ่าน"
        disabled={isLoading}
      />
      {#if errors.password}
        <div class="mt-1 text-sm text-red-600">
          {#each errors.password as error}
            <div>{error}</div>
          {/each}
        </div>
      {/if}
    </div>

    <div class="mb-6">
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่าน</label>
      <input
        type="password"
        id="confirmPassword"
        bind:value={formData.confirmPassword}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="กรอกรหัสผ่านอีกครั้ง"
        disabled={isLoading}
      />
      {#if errors.confirmPassword}
        <div class="mt-1 text-sm text-red-600">
          {#each errors.confirmPassword as error}
            <div>{error}</div>
          {/each}
        </div>
      {/if}
    </div>
    
    <button
      type="submit"
      disabled={isLoading}
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
    </button>
  </form>
  
  <div class="mt-4 text-center">
    <a href="/login" class="text-blue-600 hover:text-blue-800">
      มีบัญชีแล้ว? เข้าสู่ระบบ
    </a>
  </div>
</div>
