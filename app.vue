<template>
  <div data-theme="cyberpunk" class="min-h-screen">
    <div class="max-w-4xl m-auto flex flex-col min-h-screen">
      <NuxtLayout>
        <Notification />
        <NavBar />
        <NuxtPage />
      </NuxtLayout>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "what the playlist",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    { name: "description", content: "what playlist was that song in again??" }
  ]
})
</script>
