const chunker = <T>(arr: T[], chunkSize: number): T[][] => arr.reduce((resultArray, item, index) => {
  // splits an array into equal sized chunks
  // modified version of https://stackoverflow.com/a/37826698
  const chunkIndex = Math.floor(index / chunkSize)

  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = []
  }

  resultArray[chunkIndex].push(item)

  return resultArray
}, <T[][]>[[]])

export { chunker }
