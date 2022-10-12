<template>
  <footer class="foot">
    made with&nbsp;<span class="foot-red">❤</span>&nbsp;and&nbsp;<IconSpotify class="foot-spotifylogo" />&nbsp;by&nbsp;<a class="foot-red" href="https://hayk.earth">Հայկ</a>
  </footer>
</template>

<script setup lang="ts">
import IconSpotify from "@/assets/svg/Spotify_Logo_RGB_Black.svg"

</script>

<style lang="scss">
.foot {
  @apply flex items-center justify-center mt-auto m-2 h-6 font-fixedsys;

  &-red {
    @apply text-primary;
  }

  &-spotifylogo {
    @apply h-full;
  }
}
</style>
