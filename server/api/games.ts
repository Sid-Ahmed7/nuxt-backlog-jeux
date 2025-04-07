export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const limit = 500
    const nbGames = 5000
    const nbRequests = Math.ceil(nbGames / limit)
    const requests = Array.from({ length: nbRequests }, (_, i) => {
        const offset = i * limit
        return $fetch('https://api.igdb.com/v4/games', {
            method: 'POST',
            headers: {
                'Client-ID': config.api.clientId,
                Authorization: `Bearer ${config.api.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: `fields name,cover.image_id,created_at,first_release_date,franchise,genres.name,involved_companies.company.name,platforms.name,rating,release_dates;limit ${limit}; offset ${offset}; sort release_dates desc;`,
        })
    })
    const responses = await Promise.all(requests)
    return responses.flat()
})