import { defineStore } from "pinia"

import { useAuthStore, useNotificationStore, type INotification } from "@/stores"

export interface ITrackItem {
  album: {
    name: string
  }
  artists: {
    name: string
  }[]
  name: string
}

export interface IPlaylist {
  collaborative: boolean
  description: string | null
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: number
  }
  href: string
  id: string
  images: {
    url: string
    height: number
    width: number
  }[]
  name: string
  owner: {
    external_urls: {
      spotify: string
    }
    followers: {
      href: string
      total: number
    }
    href: string
    id: string
    type: "user"
    uri:string
    display_name: string
  }
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    items: ITrackItem[] | void
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  type: string
  uri: string
}

interface MusicState {
  playlists: IPlaylist[]
}

export const useMusicStore = defineStore({
  id: "music",

  state: (): MusicState => ({
    playlists: []
  }),

  actions: {
    async fetchSpotifyPlaylists (): Promise<IPlaylist[]> {
      const notificationStore = useNotificationStore()

      const loadingNotification: INotification = {
        content: "Loading playlists",
        showProgress: true,
        persist: true
      }

      notificationStore.addNotification(loadingNotification)
      this.playlists = await useSpottyPagedFetch<IPlaylist>("/me/playlists") ?? []

      await notificationStore.removeNotification(loadingNotification)
      return this.playlists
    },

    async updateDbUserPlaylists () {
      const authStore = useAuthStore()

      const user = {
        key: authStore.user.id,
        playlists: this.getPlaylistIds
      }

      return await $fetch("/api/db/users/put-many", { method: "post", body: { items: [user] } })
    },

    async fetchDbPlaylists (): Promise<IPlaylist[] | null> {
      const queries = this.playlists.map(playlist => ({ id: playlist.id }))

      return await $fetch<IPlaylist[]>("/api/db/playlists/fetch", { method: "post", body: { queries } })
    },

    async updateDbPlaylists (playlists: IPlaylist[]): Promise<IPlaylist[] | null> {
      const items = playlists.map(playlist => ({ ...playlist, key: playlist.id }))

      return await $fetch<IPlaylist[]>("/api/db/playlists/put-many", { method: "post", body: { items } })
    },

    async updateAllDbPlaylists (): Promise<IPlaylist[] | null> {
      const items = this.playlists.map(playlist => ({ ...playlist, key: playlist.id }))

      return await $fetch<IPlaylist[]>("/api/db/playlists/put-many", { method: "post", body: { items } })
    },

    async fetchAllPlaylistSongs (): Promise<IPlaylist[]> {
      if (!(this.getNumberOfPlaylists > 0)) { await this.fetchSpotifyPlaylists() }
      const notificationStore = useNotificationStore()

      const loadingNotification: INotification = {
        content: "Loading songs (this can take up to a minute or two)",
        showProgress: true,
        persist: true
      }
      notificationStore.addNotification(loadingNotification)

      if (this.playlists) {
        const dbPlaylists = await this.fetchDbPlaylists()

        // map array of db playlists to object where keys are the ids of playlists
        // eg
        //  dbPlaylists = [{ id: "XYZ", ...}, { id: "ABC", ...}, ...]
        //  => dbPlaylistObject = { XYZ: { id: "XYZ", ...}, ABC: { id: "ABC", ...}, ...}
        const dbPlaylistObject = dbPlaylists?.reduce((a, v) => ({ ...a, [v.id]: v }), <Record<string, IPlaylist>>{})

        // gather playlists that are different between spotify and database
        // aka the db variant needs to be updated
        const updatedPlaylists: IPlaylist[] = []

        // map over this.playlists and:
        // if dbPlaylist has the same snapshot_id as this.playlist
        //  => return dbPlaylist
        // else
        //  => fetch all the new tracks and add them to this.playlist, return that
        // also add updated playlists to updatedPlaylists
        this.playlists = await Promise.all(this.playlists.map(async (playlist: IPlaylist) => {
          const dbPlaylist = dbPlaylistObject?.[playlist.id]

          if (dbPlaylist && playlist.snapshot_id === dbPlaylist.snapshot_id) {
            return dbPlaylist
          }

          const updatedPlaylist = {
            ...playlist,
            tracks: {
              ...playlist.tracks,
              items: await useSpottyPagedFetch<ITrackItem>(`/playlists/${playlist.id}/tracks`, {
                params: {
                  fields: "next,items(track(name,album(name),artists(name)))"
                }
              })
            }
          }

          updatedPlaylists.push(updatedPlaylist)

          return updatedPlaylist
        }))

        this.updateDbPlaylists(updatedPlaylists)
      }

      await notificationStore.removeNotification(loadingNotification)

      return this.playlists
    }
  },

  getters: {
    getOnePlaylist: state => (id: string): IPlaylist | undefined => state.playlists.find(el => el.id === id),

    getNumberOfPlaylists: (state): number => state.playlists?.length ?? 0,

    getNumberOfTracks: (state): number => state.playlists.reduce((sum, playlist) => sum + playlist.tracks.total, 0),

    getPlaylistIds: state => state.playlists.map(playlist => playlist.id)
  }
})
