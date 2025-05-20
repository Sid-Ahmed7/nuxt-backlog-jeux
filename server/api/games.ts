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
            body: `fields name,summary,cover.image_id,artworks.image_id,screenshots.image_id,dlcs,expanded_games,similar_games.name,similar_games.cover.image_id,first_release_date,franchise,genres.name,involved_companies.company.name,platforms.name,platforms.platform_logo.image_id,total_rating_count,release_dates, game_modes.name, themes.name;limit ${limit}; offset ${offset}; where category = (0, 8, 9);`,
        })
    })
    const responses = await Promise.all(requests)
    return responses.flat()
})