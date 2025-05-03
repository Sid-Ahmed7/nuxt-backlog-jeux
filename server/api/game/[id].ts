export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const idGame : number = Number(event.context.params?.id);
try{
    const  res = await $fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers : {
            'Client-ID' : config.api.clientId,
            Authorization: `Bearer ${config.api.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: `fields name, cover.image_id, platforms.name, genres.name; where id = ${idGame};`,

    });

    console.log('API response:', res);
    return res;
} catch (error) {
    console.error(error)
    throw error;
}
})