<template>
  <div class="index">
    <UserCard v-if="authStore.isLoggedIn" />
    <a
      v-else
      class="index-authbtn"
      :href="authStore.getUserAuthorizationLink"
    >sign into spotify</a>

    <button class="index-get-playlists" @click="getPlaylists">
      get playlists
    </button>
    <ul v-if="musicStore.playlists">
      <li v-for="playlist in musicStore.playlists" :key="playlist.id">
        <NuxtLink :to="`/playlists/${playlist.id}`">
          {{ playlist.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, useMusicStore } from "@/stores"

const authStore = useAuthStore()
const musicStore = useMusicStore()

if (authStore.isLoggedIn && !authStore.user) {
  await authStore.fetchUser()
}

const getPlaylists = async () => {
  await musicStore.fetchPlaylists()
}
</script>

<style lang="scss">
.index {
  @apply min-h-screen flex flex-col justify-center items-center;

  &-authbtn {
    @apply btn btn-primary;
  }

  &-get-playlists {
    @apply btn btn-secondary;
  }
}
</style>
