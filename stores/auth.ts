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
    isLoggedIn: state => !!state.token.access_token
  },

  persist: true
})
