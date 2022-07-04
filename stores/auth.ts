import { defineStore } from "pinia"

interface AuthState {
  token: {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
  };
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
    }
  }),

  getters: {
    isLoggedIn: state => !!state.token.access_token,
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
    async fetchAccessToken (code: string): Promise<void> {
      const { data } = await useFetch(`/api/auth/${code}`)

      // need to create a shallow copy of data.value
      // otherwise pinia-plugin-persistedstate
      // doesn't persist data from useFetch/$fetch etc
      this.token = Object.assign({}, data.value)
    }
  },

  persist: true
})
