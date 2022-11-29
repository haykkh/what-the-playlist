import { Deta } from "deta"
import DetaType from "deta/dist/types/deta"
import DetaBaseType from "deta/dist/types/base"

const useDeta = (): DetaType => {
  const { detaKey } = useRuntimeConfig()
  return Deta(detaKey)
}

const useDetaBase = (databaseName: string): DetaBaseType => useDeta().Base(databaseName)

export { useDeta, useDetaBase }
