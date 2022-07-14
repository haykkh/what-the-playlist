<template>
  <tr class="table-row">
    <th class="table-row-check">
      <label>
        <input type="checkbox" class="table-row-check-box">
      </label>
    </th>

    <td class="table-row-name">
      <img class="table-row-name-avatar" :src="playlist?.images?.[0]?.url" alt="Avatar Tailwind CSS Component">

      <div class="table-row-name-text">
        <NuxtLink class="table-row-name-text-name" :to="`/playlists/${playlist.id}`">
          {{ playlist.name }}
        </NuxtLink>

        <p class="table-row-name-text-description">
          {{ playlist.description }}
        </p>
      </div>
    </td>

    <td class="table-row-owner">
      <p class="table-row-owner-name">
        {{ playlist.owner.display_name }}
      </p>
      <span class="table-row-owner-public">{{ playlist.public ? "Public" : "Private" }} playlist</span>
    </td>

    <td class="table-row-tracks">
      {{ playlist.tracks.total }}
    </td>

    <th class="table-row-details">
      <NuxtLink :to="`/playlists/${playlist.id}`" class="table-row-details-btn">
        details
      </NuxtLink>
    </th>
  </tr>
</template>

<script setup lang="ts">
import { IPlaylist } from "@/stores/music"

defineProps<{
  playlist: IPlaylist
}>()
</script>

<style lang="scss">
.table-row {
  &-check {
    &-box {
      @apply checkbox;
    }
  }

  &-name {
    @apply flex items-center space-x-3;

    &-avatar {
      @apply w-12 h-12 object-cover;
    }

    &-text {
      &-name {
        @apply font-bold;
      }

      &-description {
        @apply text-sm opacity-50;
      }
    }
  }

  &-owner {
    &-name {
    }

    &-public {
      @apply badge badge-ghost badge-sm;
    }
  }

  &-details {
    &-btn {
      @apply btn btn-ghost btn-xs;
    }
  }
}
</style>
