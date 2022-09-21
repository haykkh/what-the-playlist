import { defineStore } from "pinia"

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
    items: object[]
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
      this.playlists = await useSpottyPagedFetch<IPlaylist[]>("/me/playlists")

      return this.playlists
    },

    async fetchAllPlaylistSongs (): Promise<IPlaylist[]> {
      if (!(this.getNumberOfPlaylists > 0)) { await this.fetchPlaylists() }

      this.playlists = await Promise.all(this.playlists.map(async (playlist: IPlaylist) => ({
        // map over this.playlists and add tracks to each playlists' tracks attr
        ...playlist,
        tracks: await useSpottyPagedFetch<IPlaylist[]>(`/playlists/${playlist.id}/tracks`, {
          params: {
            fields: "next,items(track(name,album(name)))"
          }
        })
      })))

      return this.playlists
    }
  },

  getters: {
    getOnePlaylist: state => (id: string): IPlaylist => state.playlists.find(el => el.id === id),

    getNumberOfPlaylists: (state): number => state.playlists?.length ?? 0,

    getNumberOfTracks: (state): number => {
      // gets the number of tracks in all the playlists
      // (this assumes that all playlist songs have been fetched)
      if (state.playlists) {
        let len = 0

        state.playlists.forEach((playlist) => {
          if (Array.isArray(playlist.tracks)) {
            len = len + playlist.tracks.length
          }
        })

        return len
      } else {
        return 0
      }
    }
  }
})
