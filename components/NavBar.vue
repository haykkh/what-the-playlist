<template>
  <div class="navbar">
    <div class="navbar-left">
      <LogoType />
    </div>
    <div v-if="authStore.isLoggedIn" class="navbar-right">
      <div class="navbar-right-profile">
        <label tabindex="0" class="navbar-right-profile-avatar">
          <div v-if="user?.images" class="navbar-right-profile-avatar-container">
            <img :src="user.images[0].url" class="navabr-right-profile-avatar-container-img">
          </div>
        </label>
        <ul tabindex="0" class="navbar-right-profile-dropdown dropdown-content">
          <li><a @click="authStore.logout">Logout</a></li>
        </ul>
      </div>
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
.navbar {
  @apply bg-base-100;

  &-left {
    @apply flex-1;
  }

  &-right {
    @apply flex-none menu menu-horizontal p-0;

    &-profile {
      @apply dropdown dropdown-end;

      &-avatar {
        @apply btn btn-ghost btn-square avatar;

        &-container {
          @apply w-10;
        }
      }

      &-dropdown {
        @apply mt-1 p-2 shadow menu menu-compact bg-base-100;
      }
    }
  }
}
</style>
