import { defineStore } from "pinia"

import { useNotificationStore, type INotification } from "@/stores"

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
    async fetchPlaylists (): Promise<IPlaylist[]> {
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

    async fetchAllPlaylistSongs (): Promise<IPlaylist[]> {
      if (!(this.getNumberOfPlaylists > 0)) { await this.fetchPlaylists() }
      const notificationStore = useNotificationStore()

      const loadingNotification: INotification = {
        content: "Loading songs (this can take up to a minute or two)",
        showProgress: true,
        persist: true
      }
      notificationStore.addNotification(loadingNotification)

      if (this.playlists) {
        this.playlists = await Promise.all(this.playlists.map(async (playlist: IPlaylist) => ({
        // map over this.playlists and add tracks to each playlists' tracks attr
          ...playlist,
          tracks: {
            ...playlist.tracks,
            items: await useSpottyPagedFetch<ITrackItem>(`/playlists/${playlist.id}/tracks`, {
              params: {
                fields: "next,items(track(name,album(name),artists(name)))"
              }
            })
          }
        })))
      }

      await notificationStore.removeNotification(loadingNotification)
      return this.playlists
    }
  },

  getters: {
    getOnePlaylist: state => (id: string): IPlaylist | undefined => state.playlists.find(el => el.id === id),

    getNumberOfPlaylists: (state): number => state.playlists?.length ?? 0,

    getNumberOfTracks: (state): number => state.playlists.reduce((sum, playlist) => sum + playlist.tracks.total, 0)
  }
})
