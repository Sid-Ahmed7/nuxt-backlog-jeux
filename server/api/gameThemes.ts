export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

try {
    const response = await $fetch('https://api.igdb.com/v4/themes', {
        method: 'POST',
        headers: {
            'Client-ID': config.api.clientId,
            Authorization: `Bearer ${config.api.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: `fields name;;`,
    })
    console.log('Réponse de l\'API:', response)
    return response
} catch (error) {
    throw('Erreur lors de la récupération des themes:')
    return []
}
})