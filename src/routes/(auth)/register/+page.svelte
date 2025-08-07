<script lang="ts">
  import RegisterForm from "$features/auth/components/RegisterForm.svelte"
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { authStore } from '$lib/stores'

  onMount(() => {
    // ถ้าล็อกอินแล้วให้ redirect ไปหน้าแรก
    if ($authStore.isAuthenticated) {
      goto('/admin/dashboard')
    }
  })
</script>

<svelte:head>
  <title>สมัครสมาชิก - SvelteKit App</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <RegisterForm />
</div>
