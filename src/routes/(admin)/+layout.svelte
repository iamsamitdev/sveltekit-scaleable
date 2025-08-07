<script lang="ts">
  import "../../app.css"
  import AdminLayout from "$lib/layouts/AdminLayout.svelte"
  import { authStore } from '$lib/stores'

  interface LayoutData {
    user?: any
    [key: string]: any
  }

  let { children, data } = $props<{ children: any, data: LayoutData }>()

  // อัพเดท user ใน store ถ้ามีข้อมูลจาก server
  $effect(() => {
    if (data?.user) {
      authStore.updateUser(data.user)
    }
  })
</script>

<AdminLayout>
  {@render children?.()}
</AdminLayout>
