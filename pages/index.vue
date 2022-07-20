<template>
  <div class="index">
    <UserCard v-if="authStore.isLoggedIn" />
    <a
      v-else
      class="index-authbtn"
      :href="authStore.getUserAuthorizationLink"
    >continue with spotify</a>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores"

const authStore = useAuthStore()

if (authStore.isLoggedIn && !authStore.user) {
  await authStore.fetchUser()
}
</script>

<style lang="scss">
.index {
  @apply min-h-screen flex flex-col justify-center items-center;

  &-authbtn {
    @apply btn btn-primary;
  }
}
</style>
