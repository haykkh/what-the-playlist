import { useAuthStore } from "@/stores"

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  if (!authStore.isLoggedIn) { return "/" }
})
