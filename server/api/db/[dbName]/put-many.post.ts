import { type DetaType } from "deta/dist/types/types/basic"

import { useDetaBase } from "@/composables/deta"
// need to import composable as they aren't auto imported into /server
// https://nuxt.com/docs/guide/concepts/auto-imports
import { chunker } from "@/utils"

export default defineEventHandler(async (event) => {
  // calls a Deta Base put many method
  // https://docs.deta.sh/docs/base/sdk/#put-many

  const db = useDetaBase(event.context.params.dbName)
  const { items }: { items: DetaType[] } = await readBody(event)

  // max 25 items per post on deta's end
  const chunks = chunker(items, 25)

  const data = await Promise.all(chunks.map(async chunk => await db.putMany(chunk)))

  return data.flatMap(el => el.processed.items)
})
