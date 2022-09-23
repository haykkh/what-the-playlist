<template>
  <div />
</template>

<script setup lang="ts">
import { useAuthStore, useNotificationStore, type INotification } from "@/stores"
const route = useRoute()

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

if (typeof route.query.code === "string") {
  authStore.login(route.query.code)

  if (authStore.isLoggedIn) {
    navigateTo("/")
  }
}

const loadingNotification: INotification = {
  content: "Loading",
  showProgress: true,
  persist: true
}

onMounted(() => notificationStore.addNotification(loadingNotification))

onUnmounted(() => notificationStore.removeNotification(loadingNotification))
</script>
