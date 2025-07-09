// plugins/auth.client.ts
import { useAuthStore } from '@/stores/useAuthStore'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  authStore.user 
})
