<template>
  <div v-if="musicStore.getNumberOfTracks" class="track-search">
    <div class="track-search-box">
      <input v-model="search" placeholder="here comes the..." class="track-search-box-input">
      <div class="track-search-box-advanced">
        <input type="checkbox" class="track-search-box-advanced-collapse-checkbox">
        <div class="track-search-box-advanced-title">
          Advanced options
          <Icon name="teenyicons:down-small-solid" class="track-search-box-advanced-title-arrow" />
        </div>
        <div class="track-search-box-advanced-content collapse-content">
          <div class="track-search-box-advanced-content-range">
            <label class="track-search-box-advanced-content-range-label">
              Fuzziness
              <div class="tooltip" data-tip="zero: exact matches only &#xa; non-zero: + approximate matches">
                <Icon name="teenyicons:info-circle-solid" />
              </div>
            </label>
            <input
              v-model.number="extendedFuse.options.threshold"
              type="range"
              min="0"
              max="1"
              step="any"
              class="track-search-box-advanced-content-range-input"
            >
          </div>
          <div class="track-search-box-advanced-content-searchcontents">
            <label class="track-search-box-advanced-content-searchcontents-label">
              Search song name
            </label>
            <input v-model="extendedFuse.options.keys" value="tracks.track.name" type="checkbox" class="track-search-box-advanced-content-searchcontents-checkbox">
          </div>
          <div class="track-search-box-advanced-content-searchcontents">
            <label class="track-search-box-advanced-content-searchcontents-label">
              Search artist name
            </label>
            <input v-model="extendedFuse.options.keys" value="tracks.track.artists.name" type="checkbox" class="track-search-box-advanced-content-searchcontents-checkbox">
          </div>
          <div class="track-search-box-advanced-content-searchcontents">
            <label class="track-search-box-advanced-content-searchcontents-label">
              Search album name
            </label>
            <input v-model="extendedFuse.options.keys" value="tracks.track.album.name" type="checkbox" class="track-search-box-advanced-content-searchcontents-checkbox">
          </div>
        </div>
      </div>
    </div>
    <p v-if="noResults">
      No results for <span class="track-search-results-searchterm">{{ search }}</span>.
    </p>
    <p v-if="search === ''" class="track-search-results-brief">
      what the playlist looks through your created and followed playlists to find the one with that song/album/artist you just can't get out of your head.<br><br>
      Type in the field above to get started.
    </p>
    <div class="track-search-results">
      <a v-for="({ item }, i) in resultsRaw" :key="i" class="track-search-results-result" :href="item.external_urls.spotify">
        <img :src="item?.images?.[0]?.url" :alt="item.name" class="track-search-results-result-image">
        <div class="track-search-results-result-body">
          <h2 class="track-search-results-result-body-name">
            {{ item.name }}
          </h2>
          <p class="track-search-results-result-body-description">
            {{ item.description }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import Fuse from "fuse.js"
import { useVueFuse } from "vue-fuse"
import { Ref } from "vue"

import { useMusicStore, type IPlaylist } from "@/stores"

const musicStore = useMusicStore()

const { playlists } = storeToRefs(musicStore)

const { fuse, search, resultsRaw, noResults, runSearch } = useVueFuse(playlists, {
  keys: ["tracks.track.name", "tracks.track.artists.name", "tracks.track.album.name"],
  includeMatches: true,
  findAllMatches: true,
  ignoreFieldNorm: true,
  includeScore: true,
  threshold: 0.2
})

// need to extend fuse as it doesn't normally let you access fuse.value.options
interface IExtendedFuse<T> extends Fuse<T> {
  options: Fuse.IFuseOptions<T>
}
const extendedFuse = fuse as Ref<IExtendedFuse<IPlaylist>>

// if threshold is changed, re run search
watch(() => extendedFuse.value.options.threshold, () => runSearch(search.value))

// if keys are changed, recreate fuse
watch(() => extendedFuse.value.options.keys, () => {
  fuse.value = new Fuse(playlists.value, extendedFuse.value.options)
  runSearch(search.value)
})

</script>

<style lang="scss">
.track-search {
  @apply p-4 sm:p-8 gap-4 sm:gap-8 flex flex-col items-center;

  &-box {
    @apply w-96 bg-primary flex flex-col p-8 gap-4;

    &-input {
      @apply input w-full  max-w-xs bg-neutral text-neutral-content placeholder:text-base-300;
    }

    &-advanced {
      @apply collapse overflow-visible;

      &-collapse-checkbox {
        padding: 0 !important;
        min-height: 0 !important;
      }

      &-title {
        @apply p-0 text-base;
        min-height: 0 !important;

        &-arrow {
          @apply transition-all ease-in-out;
        }
      }

      // rotate title arrow 180 deg when collapse is open
      &-collapse-checkbox:checked ~ &-title &-title-arrow {
        @apply rotate-180;

      }

      // show -content when collapse is open
      &-collapse-checkbox:checked ~ &-content {
        @apply block;
      }

      // hide -content when collapse is open
      &-collapse-checkbox ~ &-content {
        @apply hidden;
      }

      &-content {
        @apply collapse-content space-y-2 overflow-visible;
        padding: 0 !important;
        padding-top: 0.5rem !important;

        &-range {
          @apply max-w-xs space-y-2 flex items-center justify-between;
          &-label {
            @apply text-sm;

              .tooltip {
                &:before {
                  white-space: pre;
                }
              }
          }

          &-input {
            @apply range range-sm;
            width: unset !important;
            margin-top: 0 !important;
          }
        }

        &-searchcontents {
          @apply label p-0;
          &-label {
            @apply text-sm label-text;
          }

          &-checkbox{
            @apply checkbox checkbox-sm;
            animation: none !important;
          }
        }
      }
    }
  }

  &-results {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4;

    &-searchterm {
      @apply italic text-primary;
    }

    &-brief {
      @apply w-96;
    }

    &-result {
      @apply card card-compact bg-base-100  text-neutral-content;

      &-image {
        @apply aspect-square object-cover;
      }
      &-body {
        @apply card-body bg-neutral p-4;
        &-name {
          @apply font-semibold card-title text-base;
        }

        &-description {
          @apply text-sm;
        }
      }
    }
  }
}
</style>
