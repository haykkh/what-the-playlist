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

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 *  Fetch from spotify API
 */
const useSpottyFetch = async <returnDataType>(uri: string, { params } = { params: {} }) =>
  await useFetch<returnDataType>(uri.substring(0, 4) === "http" ? uri : `${useRuntimeConfig().spotifyApiUrl}${uri}`, {
    headers: { Authorization: `Bearer ${useAuthStore().token.access_token}` },
    params,
    async onResponseError ({ request, response, options, error }) {
      if (response.status === 429 && response.headers.has("Retry-After")) {
        await wait(+response.headers.get("Retry-After") * 1000 + 1000)
        await useFetch<returnDataType>(request, options)
      } else {
        throw error
      }
    }
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
const useSpottyPagedFetch = async <returnDataType extends object>(uri: string, { params } = { params: {} }): Promise<returnDataType[]> => {
  try {
      interface ISpotifyPagesResponseWithReturn extends ISpotifyPagesResponse {
        items: returnDataType[]
      }

      const { data } = await useSpottyFetch<ISpotifyPagesResponseWithReturn>(uri, { params })

      const allData = data.value.items

      while (data.value.next) {
        const { data: newData } = await useSpottyFetch<ISpotifyPagesResponseWithReturn>(
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

export { useSpottyFetch, useSpottyPagedFetch }
