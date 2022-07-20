<template>
  <div class="navbar">
    <div class="navbar-left">
      <LogoType />
    </div>
    <ul v-if="authStore.isLoggedIn" class="navbar-right">
      <li>
        <NuxtLink to="/playlists">
          playlists
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores"

const authStore = useAuthStore()
</script>

<style lang="scss">
.navbar {
  @apply bg-base-100;

  &-left {
    @apply flex-1;
  }

  &-right {
    @apply flex-none menu menu-horizontal p-0;
  }
}
</style>
