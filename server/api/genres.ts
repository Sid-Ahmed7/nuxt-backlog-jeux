export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

try {
    const response = await $fetch('https://api.igdb.com/v4/genres', {
        method: 'POST',
        headers: {
            'Client-ID': config.api.clientId,
            Authorization: `Bearer ${config.api.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: `fields name;`,
    })
    return response
} catch (error) {
    console.error('Erreur lors de la récupération des genres:', error)
    return []
}
})