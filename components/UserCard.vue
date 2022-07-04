<template>
  <div class="user-card">
    <div class="user-card-body">
      This is a user card
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.user-card {
  @apply card bg-primary shadow-xl w-96 h-96;

  &-body {
    @apply card-body items-center text-center;
  }
}
</style>
