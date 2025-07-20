<script setup lang="ts">

import BacklogTrack from '@/components/Home/BacklogTrack.vue'
import GameListHome from '@/components/Home/GameListHome.vue'

const genresStore = useGenresStore()
const platformsStore = usePlatformsStore()
const themesStore = useThemeStore()
const gameModesStore = useGamesModesStore()
const {transformGameData,formatReleaseDate,formatRating} = useGameUtils()

const {data: gameData, error: gameError} = await useAsyncData('games', () => 
  $fetch('/api/games').then(data => data.map(transformGameData)))

  const games = computed(() => gameData.value ?? [])

  const upComingGames = computed(() => {
  return games.value
    .filter(
      (game) =>
        game.first_release_date &&
        game.first_release_date > Math.floor(Date.now() / 1000)
    )
    .sort((a, b) => (a.first_release_date ?? 0) - (b.first_release_date ?? 0))
    .slice(0, 5);
});

const lastOutingGames = computed(() => {
  const lastOuting = games.value.filter((game) => {
    const releaseDate = game.first_release_date;
    return releaseDate && releaseDate < Math.floor(Date.now() / 1000);
  });

  return lastOuting
    .sort((first, second) => {
      const firstReleaseDate = first.first_release_date || 0;
      const secondReleaseDate = second.first_release_date || 0;
      return secondReleaseDate - firstReleaseDate;
    })
    .slice(0, 5);
});

const topRatedGames = computed(() => {
  if (!Array.isArray(games.value)) {
    return [];
  }

  const topRated = games.value.filter((game) => {
    return game.total_rating_count;
  });

  return topRated
    .sort((a, b) => {
      return (b.total_rating_count ?? 0) - (a.total_rating_count ?? 0);
    })
    .slice(0, 5);
});


onMounted(async () => {
  await platformsStore.fetchPlatforms()
  await genresStore.fetchGenres()
  await themesStore.fetchThemes()
  await gameModesStore.fetchGamesModes()
})
</script>

<template>

    <BacklogTrack />
       <section 
      class="
        flex flex-col gap-4 w-[95%] mx-auto py-6 max-w-full
        md:w-[90%] md:gap-6
        lg:flex-row lg:justify-between lg:gap-8 lg:w-4/5 lg:py-8
      "
    >
    <GameListHome :games="upComingGames" title="Jeux à venir" >

      <template #extra-info="{game}">
        <p class="text-sm text-text-secondary mb-1">
          {{ formatReleaseDate(game.first_release_date) }}
        </p>
      </template>
    </GameListHome>

     <GameListHome :games="lastOutingGames" title="Dernière sortie" >
      <template #extra-info="{game}">
        <p class="text-sm text-text-secondary mb-1">
          {{ formatReleaseDate(game.first_release_date) }}
        </p>
      </template>   
    </GameListHome>

    <GameListHome :games="topRatedGames" title="Les mieux notés" >
      <template #extra-info="{game}">
        <p class="text-sm text-text-secondary mb-1">
          {{ formatRating(game.total_rating_count) }}
        </p>
      </template>   
    </GameListHome>
    </section>
</template>