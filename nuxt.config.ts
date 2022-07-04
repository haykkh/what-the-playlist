import { defineNuxtConfig } from "nuxt"
import eslintPlugin from "vite-plugin-eslint"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt"
  ],

  runtimeConfig: {
    spotifyClientSecret: "",

    public: {
      spotifyClientId: "",
      spotifyCallbackUrl: ""
    }
  },

  vite: {
    plugins: [
      eslintPlugin()
    ]
  }
})
