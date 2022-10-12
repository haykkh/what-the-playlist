<template>
  <TrackSearch v-if="authStore.isLoggedIn && (musicStore.getNumberOfTracks > 0)" />
  <div v-else-if="!authStore.isLoggedIn" class="index-hero">
    <h1 class="index-hero-title">
      what the #$!% was that playlist?
    </h1>
    <p class="index-hero-subtitle">
      Ever hear a song for the first time in years and remember that one playlist you made 4 years ago but think to yourself <span class="index-hero-subtitle-highlight">what the #$!% was the name of that playlist?</span>
    </p>
    <a class="index-hero-btn" :href="authStore.getUserAuthorizationLink">
      continue with
      <IconSpotify class="index-hero-btn-spotifylogo" />
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
.index-hero {
  @apply flex flex-col grow justify-center items-center text-center max-w-md m-auto gap-6 p-6;

  &-title {
    @apply text-xl font-bold;
  }

  &-subtitle {
    @apply text-sm;

    &-highlight {
      @apply italic text-primary-content;
    }
  }

  &-btn {
    @apply btn btn-primary flex-nowrap gap-x-2;

    &-spotifylogo {
      @apply h-7;
    }
  }
}
</style>
