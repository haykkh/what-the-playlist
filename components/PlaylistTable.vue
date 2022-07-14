<template>
  <div>
    <LoadingBar v-if="musicStore.playlists.length < 1" />
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
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
            <th />
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
            <th />
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

<style lang="scss"></style>
