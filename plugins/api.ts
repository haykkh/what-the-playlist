import { useAuthStore } from "@/stores"

interface ISpotifyPagesResponse {
  href: string
  items: object[]
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const authStore = useAuthStore()

  /**
   *  Fetch from spotify API
   */
  const spottyFetch = async <returnDataType>(uri: string, { params } = { params: {} }) =>
    await useFetch<returnDataType>(uri.substring(0, 4) === "http" ? uri : `${config.spotifyApiUrl}${uri}`, {
      headers: { Authorization: `Bearer ${authStore.token.access_token}` },
      params
    })

  /**
   *  Fetch paged entities from spotify api
   *
   *  Spotify pages responses have type like ISpotifyPagesResponse
   *
   *  This function continues fetching data.value.next
   *  until spotify no longer returns data.value.next
   *
   */
  const spottyPagedFetch = async <returnDataType extends object>(uri: string, { params } = { params: {} }): Promise<returnDataType[]> => {
    try {
      interface ISpotifyPagesResponseWithReturn extends ISpotifyPagesResponse {
        items: returnDataType[]
      }

      const { data } = await spottyFetch<ISpotifyPagesResponseWithReturn>(uri, { params })

      const allData = data.value.items

      while (data.value.next) {
        const { data: newData } = await spottyFetch<ISpotifyPagesResponseWithReturn>(
          data.value.next,
          { params }
        )

        newData.value.items.forEach(item => allData.unshift(item))

        data.value = newData.value
      }

      return allData
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return {
    provide: {
      spottyFetch,
      spottyPagedFetch
    }
  }
})
