export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

try {
    const response = await $fetch('https://api.igdb.com/v4/platforms', {
        method: 'POST',
        headers: {
            'Client-ID': config.api.clientId,
            Authorization: `Bearer ${config.api.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: `fields name; where id = (48, 167,6,169,49,130);`,
    })
    console.log('Réponse de l\'API:', response)
    return response
} catch (error) {
    console.error('Erreur lors de la récupération des platformes:', error)
    return []
}
})