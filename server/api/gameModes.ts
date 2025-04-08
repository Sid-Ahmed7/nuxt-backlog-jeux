export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

try {
    const response = await $fetch('https://api.igdb.com/v4/game_modes', {
        method: 'POST',
        headers: {
            'Client-ID': config.api.clientId,
            Authorization: `Bearer ${config.api.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: `fields name;`,
    })
    console.log('Réponse de l\'API:', response)
    return response
} catch (error) {
    console.error('Erreur lors de la récupération des modes de jeux:', error)
    return []
}
})