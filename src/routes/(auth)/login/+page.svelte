<script lang="ts">
  import LoginForm from "$features/auth/components/LoginForm.svelte"
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { authStore } from '$lib/stores'

  let redirectTo: string | null = null

  onMount(() => {
    // ถ้าล็อกอินแล้วให้ redirect ไปหน้าแรก
    if ($authStore.isAuthenticated) {
      goto('/admin/dashboard')
      return
    }
    
    // เก็บ redirect parameter
    redirectTo = $page.url.searchParams.get('redirect')
  })

  // Handle successful login redirect
  $: if ($authStore.isAuthenticated && redirectTo) {
    goto(decodeURIComponent(redirectTo))
  }
</script>

<svelte:head>
  <title>เข้าสู่ระบบ - SvelteKit App</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <LoginForm />
</div>
