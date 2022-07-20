<template>
  <div data-theme="cyberpunk" class="min-h-screen">
    <div class="max-w-4xl m-auto">
      <NuxtLayout>
        <NavBar />
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "what that playlist",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [
    { name: "description", content: "what playlist was that song in again??" }
  ]
})
</script>
