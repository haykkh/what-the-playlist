<template>
  <div class="callback">
    <div class="callback-alert">
      Loading
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"

const route = useRoute()

const authStore = useAuthStore()

if (typeof route.query.code === "string") {
  authStore.fetchAccessToken(route.query.code).then(() => { navigateTo("/") })
}
</script>

<style lang="scss">
.callback {
  @apply flex justify-center items-center min-h-screen;

  &-alert {
    @apply alert alert-info w-fit;
  }
}
</style>
