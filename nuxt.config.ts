import { defineNuxtConfig } from "nuxt"
import eslintPlugin from "vite-plugin-eslint"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-svgo"
  ],

  runtimeConfig: {
    spotifyClientSecret: "",

    public: {
      spotifyClientId: "",
      spotifyCallbackUrl: "",
      spotifyApiUrl: ""
    }
  },

  vite: {
    plugins: [
      eslintPlugin()
    ]
  }
})
