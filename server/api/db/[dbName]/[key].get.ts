import { useDetaBase } from "@/composables/deta"
// need to import composable as they aren't auto imported into /server
// https://nuxt.com/docs/guide/concepts/auto-imports

export default defineEventHandler(async (event) => {
  // calls a Deta Base get method
  // https://docs.deta.sh/docs/base/sdk/#get

  const db = useDetaBase(event.context.params.dbName)
  const key = event.context.params.key

  return await db.get(key)
})
