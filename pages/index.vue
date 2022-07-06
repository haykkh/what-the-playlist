<template>
  <div class="index">
    <UserCard v-if="authStore.isLoggedIn" />
    <a
      v-else
      class="index-authbtn"
      :href="authStore.getUserAuthorizationLink"
    >sign into spotify</a>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()

if (authStore.isLoggedIn && !authStore.user) {
  await authStore.fetchUser()
}
</script>

<style lang="scss">
.index {
  @apply hero min-h-screen;

  &-authbtn {
    @apply btn btn-primary;
  }
}
</style>
