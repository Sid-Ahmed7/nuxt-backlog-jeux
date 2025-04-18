export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const currentDate = Math.floor(Date.now() / 1000)

    try {
        const response = await $fetch('https://api.igdb.com/v4/release_dates', {
            method: 'POST',
            headers: {
                'Client-ID': config.api.clientId,
                Authorization: `Bearer ${config.api.accessToken}`,
                'Content-Type': 'application/json',
            },
            body: `fields game.name, game.cover.image_id, game.genres.name, date; where release_region = 1 & date > ${currentDate}; sort date asc; limit 5;`,

        })
        return response
    } catch (error) {
        throw('Erreur lors de la récupération des jeux à venir:')
        return []
    }
}
)
