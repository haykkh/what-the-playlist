export default defineEventHandler(async (event) => {
  // "Request Access Token" from
  // https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

  // we use a server route here to be able to access the secret env var, spotifyClientSecret

  const { spotifyClientSecret, public: { spotifyClientId, spotifyCallbackUrl } } = useRuntimeConfig()

  return await $fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: event.context.params.code,
      redirect_uri: spotifyCallbackUrl
    })
  })
})
