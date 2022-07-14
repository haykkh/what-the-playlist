<template>
  <PlaylistTable />
</template>

<script setup lang="ts">
import { useMusicStore } from "@/stores"

definePageMeta({
  middleware: "auth"
})

const musicStore = useMusicStore()

onMounted(() => !(musicStore.playlists.length > 0) ? musicStore.fetchPlaylists() : null)
</script>
