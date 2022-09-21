<template>
  <div>
    <LoadingBar v-if="musicStore.getNumberOfPlaylists < 1" />
    <div class="playlist-table">
      <table class="playlist-table-table">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox">
              </label>
            </th>
            <th>Name</th>
            <th>Owner</th>
            <th>Tracks</th>
          </tr>
        </thead>
        <tbody>
          <PlaylistTableRow v-for="playlist in musicStore.playlists" :key="playlist.id" :playlist="playlist" />
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th />
            <th>Name</th>
            <th>Owner</th>
            <th>Tracks</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/stores"

const musicStore = useMusicStore()
</script>

<style lang="scss">
.playlist-table {
  @apply overflow-x-auto w-full;

  &-table {
    @apply table w-full border border-base-200 rounded-lg;
    border-spacing: 0px;
    border-collapse: unset;
  }

}
</style>
