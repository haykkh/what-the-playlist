<template>
  <div>
    tracks: {{ musicStore.getNumberOfTracks }}
    <PlaylistTable />
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/stores"

definePageMeta({
  middleware: "auth"
})

const musicStore = useMusicStore()

useNuxtApp().hook("page:finish", async () => {
  if (!(musicStore.getNumberOfTracks > 0)) { await musicStore.fetchAllPlaylistSongs() }
})
</script>
