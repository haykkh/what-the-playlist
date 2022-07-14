<template>
  <div class="navbar">
    <div class="navbar-start">
      <div class="navbar-start-mobile">
        <label tabindex="0" class="navbar-start-mobile-burger">
          <svg xmlns="http://www.w3.org/2000/svg" class="navbar-start-mobile-burger-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <!-- this <ul> has daisyui specific classes -->
        <ul tabindex="0" class="navbar-start-mobile-menu dropdown-content">
          <li>
            <NuxtLink to="/playlists">
              playlists
            </NuxtLink>
          </li>
          <li tabindex="0">
            <a class="justify-between">
              me
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
            </a>
            <ul class="p-2">
              <li>
                <NuxtLink to="/profile">
                  profile
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <NuxtLink to="/" class="navbar-start-logo">
        what the playlist
      </NuxtLink>
    </div>

    <ul class="navbar-center">
      <li>
        <NuxtLink to="/playlists">
          playlists
        </NuxtLink>
      </li>

      <li tabindex="0">
        <a>
          me
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
        </a>
        <ul class="p-2 z-50">
          <li>
            <NuxtLink to="/profile">
              profile
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>

    <div class="navbar-end">
      <a
        v-if="!authStore.isLoggedIn"
        class="navbar-end-btn"
        :href="authStore.getUserAuthorizationLink"
      >sign in</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores"

const authStore = useAuthStore()
</script>

<style lang="scss">
.navbar {
  @apply bg-base-100;

  &-start {
    &-mobile {
      @apply dropdown;

      &-burger {
        @apply btn btn-ghost md:hidden;

        &-svg {
          @apply h-5 w-5;
        }
      }

      &-menu {
        @apply menu menu-compact mt-3 p-2 shadow bg-base-100 rounded-box w-52;
        // this has daisyui specific classes
        // that are classed on the element
      }
    }

    &-logo {
      @apply btn btn-ghost normal-case text-xl;
    }
  }

  &-center {
    @apply hidden md:menu md:menu-horizontal p-0;
  }

  &-end {
    &-btn {
      @apply btn;
    }
  }
}
</style>
