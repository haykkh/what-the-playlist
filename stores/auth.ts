import { defineStore } from "pinia"

interface IToken {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
}

interface IUser {
  country: string,
  display_name: string,
  email: string,
  explicit_content: {filter_enabled:boolean, filter_locked:boolean},
  external_urls: {spotify:string},
  followers: { href:string, total:number },
  href: string,
  id: string,
  images: { url:string, height:number, width:number }[],
  product: string,
  type: string,
  uri: string
}

interface AuthState {
  token: IToken
  user: IUser
}

export const useAuthStore = defineStore({
  id: "auth",

  state: (): AuthState => ({
    token: {
      access_token: undefined,
      token_type: undefined,
      expires_in: undefined,
      refresh_token: undefined,
      scope: undefined
    },
    user: undefined
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token.access_token,
    getUserAuthorizationLink: (): string => {
      // "Request User Authorization" from
      // https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

      const { spotifyClientId, spotifyCallbackUrl } = useRuntimeConfig()

      const params = new URLSearchParams({
        client_id: spotifyClientId,
        redirect_uri: spotifyCallbackUrl,
        response_type: "code",
        scope: "user-read-currently-playing,user-read-playback-state,user-read-recently-played"
      })

      return `https://accounts.spotify.com/authorize?${params.toString()}`
    }
  },

  actions: {
    async fetchAccessToken (code: string): Promise<IToken> {
      const { data } = await useFetch(`/api/auth/${code}`)

      // need to create a shallow copy of data.value
      // otherwise pinia-plugin-persistedstate
      // doesn't persist data from useFetch/$fetch etc
      this.$patch({
        token: Object.assign({}, data.value)
      })

      return this.token
    },

    async fetchUser (): Promise<IUser> {
      this.user = await $fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${this.token.access_token}`
        }
      })

      return this.user
    },

    async login (code: string): Promise<IUser> {
      if (!this.isLoggedIn) {
        await this.fetchAccessToken(code)
      }
      return this.user
    }
  },

  persist: true
})
