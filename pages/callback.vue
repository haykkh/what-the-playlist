<template>
  <div />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores"
const route = useRoute()

const authStore = useAuthStore()

if (typeof route.query.code === "string") {
  authStore.login(route.query.code)

  if (authStore.isLoggedIn) {
    navigateTo("/")
  }
}
</script>
