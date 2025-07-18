export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const idParam = event.context.params?.id as string;
  const idGame = parseInt(idParam);

  if (isNaN(idGame)) {
    throw createError({
      statusCode: 400,
      statusMessage: `L'identifiant "${idParam}" n'est pas un nombre valide.`,
    });
  }

  const query = `fields id, name, cover.image_id; where id = ${idGame};`;

  try {
    const res = await $fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': config.api.clientId,
        Authorization: `Bearer ${config.api.accessToken}`,
        'Content-Type': 'text/plain',
      },
      body: query,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
