<template>
  <TrackSearch v-if="authStore.isLoggedIn && (musicStore.getNumberOfTracks > 0)" />
  <div v-else-if="!authStore.isLoggedIn" class="index-auth">
    <a
      class="index-auth-btn"
      :href="authStore.getUserAuthorizationLink"
    >continue with spotify</a>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, useMusicStore } from "@/stores"

const authStore = useAuthStore()
const musicStore = useMusicStore()

if (authStore.isLoggedIn && !authStore.user) { await authStore.fetchUser() }

if (!(musicStore.getNumberOfTracks > 0) && authStore.isLoggedIn) { await musicStore.fetchAllPlaylistSongs() }
</script>

<style lang="scss">
.index-auth {
  @apply flex flex-col grow justify-center items-center;

  &-btn {
    @apply btn btn-primary;
  }
}
</style>
