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
      this.playlists = await this.$nuxt.$spottyPagedFetch("/me/playlists")

      return this.playlists
    },

    async fetchOnePlaylist (id: string): Promise<IPlaylist> {
      const playlist = await this.$nuxt.$spottyFetch(`/playlists/${id}`)
      if (playlist) {
        this.$patch((state) => {
          state.playlists.push(playlist)
        })
      }

      return playlist
    }
  },

  getters: {
    getOnePlaylist: state => (id: string): IPlaylist => state.playlists.find(el => el.id === id)
  }
})
