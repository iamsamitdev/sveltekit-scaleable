<script lang="ts">
  import "../app.css"
  import { onMount } from 'svelte'
  import { authStore, themeStore } from '$lib/stores'
  import favicon from "$lib/assets/favicon.svg"

  let { children } = $props()

  onMount(() => {
    // Initialize theme
    themeStore.initializeTheme()
    
    // Initialize auth
    authStore.initializeAuth()
  })
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>SvelteKit Scaleable App</title>
</svelte:head>

{@render children()}
