<template>
  <div v-if="user" class="user-card">
    <template v-if="user.images">
      <figure v-if="user.images.length > 0" class="user-card-figure">
        <img :src="user.images[0].url" class="user-card-figure-img">
      </figure>
    </template>

    <div class="user-card-body">
      <a class="user-card-body-title" :href="user.href">
        {{ user.display_name }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useAuthStore } from "@/stores"

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
</script>

<style lang="scss">
.user-card {
  @apply card bg-primary shadow-xl w-96;

  &-figure {
    &-img {
      @apply w-full;
    }
  }

  &-body {
    @apply card-body items-center text-center;

    &-title {
      @apply card-title;
    }
  }
}
</style>
