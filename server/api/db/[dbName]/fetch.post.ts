import { useDetaBase } from "@/composables/deta"
// need to import composable as they aren't auto imported into /server
// https://nuxt.com/docs/guide/concepts/auto-imports
import { chunker } from "@/utils"

export default defineEventHandler(async (event) => {
  /*
    calls a Deta Base fetch method
    https://docs.deta.sh/docs/base/sdk/#fetch

    naughty naughty
    had to use a post method here instead of get because
    of the way ufo creates query params (see https://github.com/unjs/ofetch/issues/117)

    as we need to pass nested objects to this route
      ie below queries = [ query1, query2, ... ]
      where query1 & query2 are objects
    ufo's method was converting the params to `?queries=[object+Object]`
    the solution to this was either use
      - qs library's nested object stringify somehow
      - onRequest somewhere to serialize the query
      - just use a post route and read the body because ofetch parses the body correctly 😎
  */

  const { queries } = await readBody(event)

  const db = useDetaBase(event.context.params.dbName)

  if (Array.isArray(queries)) {
    // no idea why
    // but testing showed that db.fetch failed with 37+ queries
    const chunks = chunker(queries, 37)

    // TODO: will need to check responses for last key in case there are more to fetch
    // see note in https://docs.deta.sh/docs/base/sdk/#fetch
    return await Promise.all(chunks.map(async chunk => await db.fetch(chunk)))
  } else {
    return await db.fetch(queries)
  }
})
