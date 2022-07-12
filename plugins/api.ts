import { useAuthStore } from "@/stores"

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const authStore = useAuthStore()

  const spottyFetch = async <returnDataType>(uri: string) =>
    await useFetch<returnDataType>(`${config.spotifyApiUrl}${uri}`, {
      headers: { Authorization: `Bearer ${authStore.token.access_token}` }
    })

  return {
    provide: {
      spottyFetch
    }
  }
})
