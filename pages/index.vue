<script setup lang="ts">

import BacklogTrack from '@/components/Home/BacklogTrack.vue'
import UpcomingGames from '@/components/Home/UpComingGames.vue'
import LastOuting from '@/components/Home/LastOuting.vue'
import RatingGames from '@/components/Home/RatingGames.vue'

const genresStore = useGenresStore()
const platformsStore = usePlatformsStore()
const themesStore = useThemeStore()
const gameModesStore = useGamesModesStore()
const {transformGameData} = useGameUtils()

const {data: gameData, error: gameError} = await useAsyncData('games', () => 
  $fetch('/api/games').then(data => data.map(transformGameData)))

  const games = computed(() => gameData.value ?? [])

onMounted(async () => {
  await platformsStore.fetchPlatforms()
  await genresStore.fetchGenres()
  await themesStore.fetchThemes()
  await gameModesStore.fetchGamesModes()
})
</script>

<template>
    <BacklogTrack />
    <section class="game-recommendations">
      <UpcomingGames :games="games" />
      <LastOuting :games="games" />
      <RatingGames :games="games" />
    </section>
</template>

<style scoped lang="css">

.game-recommendations {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 100%;
}

@media screen and (max-width: 1024px) {
  .game-recommendations {
    flex-direction: column;
    align-items: center;
    width: 90%;
    gap: 1.5rem;
  }
}

@media screen and (max-width: 768px) {
  .game-recommendations {
    width: 95%;
    padding: 1.5rem 0;
    gap: 1rem;
  }
}
</style>