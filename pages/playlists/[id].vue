<template>
  <div>
    {{ route.params.id }}

    <pre>
      {{ musicStore.getOnePlaylist(route.params.id) }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/stores"

const route = useRoute()

const musicStore = useMusicStore()

onMounted(async () => musicStore.getOnePlaylist(route.params.id) ?? await musicStore.fetchOnePlaylist(route.params.id))
</script>

<style lang="scss">

</style>
