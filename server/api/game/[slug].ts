export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const slug  = event.context.params?.slug as string;
    const filds = `
    fields
      id, name, slug, summary, first_release_date, rating, cover.image_id, artworks.image_id,
      platforms.name,
      genres.name,
      game_modes.name,
      themes.name,
      screenshots.image_id,
      expanded_games.name, expanded_games.slug, expanded_games.cover.image_id,
      dlcs.name, dlcs.slug, dlcs.cover.image_id,
      similar_games.name, similar_games.slug, similar_games.cover.image_id;
    where slug = "${slug}";
  `
try{
    const  res = await $fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers : {
            'Client-ID' : config.api.clientId,
            Authorization: `Bearer ${config.api.accessToken}`,
            'Content-Type': 'text/plain'
        },
        body: filds,

    });
    
    console.log('API response:', res);
    return res;
} catch (error) {
    console.error(error)
    throw error;
}
})