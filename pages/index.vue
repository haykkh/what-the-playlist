<template>
  <TrackSearch v-if="authStore.isLoggedIn && (musicStore.getNumberOfTracks > 0)" />
  <div v-else-if="!authStore.isLoggedIn" class="index-auth">
    <a class="index-auth-btn" :href="authStore.getUserAuthorizationLink">
      continue with
      <IconSpotify class="index-auth-btn-spotifylogo" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, useMusicStore } from "@/stores"

import IconSpotify from "@/assets/svg/Spotify_Logo_RGB_Black.svg"

const authStore = useAuthStore()
const musicStore = useMusicStore()

if (authStore.isLoggedIn && !authStore.user) { await authStore.fetchUser() }

if (!(musicStore.getNumberOfTracks > 0) && authStore.isLoggedIn) { await musicStore.fetchAllPlaylistSongs() }
</script>

<style lang="scss">
.index-auth {
  @apply flex flex-col grow justify-center items-center;

  &-btn {
    @apply btn btn-primary flex-nowrap gap-x-2;

    &-spotifylogo {
      @apply h-7;
    }
  }
}
</style>
