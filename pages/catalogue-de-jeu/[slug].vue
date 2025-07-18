<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { Game } from '@/types/Game';
import PlatformSelectModal from '@/components/Games/PlatformSelectModal.vue';
import GameScreenshot from '@/components/Games/GameScreenshot.vue';
import GameComments from '@/components/Games/GameComments.vue';
import GameHeader from '~/components/Games/GameHeader.vue';
import GameInfo from '~/components/Games/GameInfo.vue';
import RelatedGamesSection from '~/components/Games/RelatedGamesSection.vue';

const userGamesStore = useUserGamesStore();
const authStore = useAuthStore()
const { getScreenshotUrl, formatReleaseDate, transformGameData } = useGameUtils();

const route = useRoute();
const router = useRouter();

const showPlatformModal = ref(false);
const showLightbox = ref(false)
const currentIndex = ref(0)
const gameSlug = route.params.slug as string;

const { data: gameData, error } = useAsyncData('game', () =>
  $fetch<Game[]>(`/api/game/${gameSlug}`).then(data => {
    const transformedData = data.map(transformGameData)
    return transformedData[0] || null;
  })
);

const game = computed(() => gameData.value ?? null);

const addToUserList = () => {
  if (game.value !== null && game.value.platforms && game.value.platforms.length > 0) {
    showPlatformModal.value = true
  }
}

const removeFromUserList = () => {

  if (game.value && game.value.id) {
    userGamesStore.removeGameInUserList(game.value.id)
  }
}


const handlePlatformSelect = (platformName: string) => {
  if (game.value) {
    userGamesStore.addGameInUserList(game.value, platformName)
  }
}

const isGameIsAdd = computed(() => {
  return userGamesStore.userGames.some((g) => g.game.id === game.value?.id)
})

const changeMainImage = (index: number) => {
  currentIndex.value = index
}

const navigateScreenshot = (d: number) => {
  if (!game.value?.screenshots?.length) { return }

  let newIndex = currentIndex.value + d

  if (newIndex < 0) {
    newIndex = game.value.screenshots.length - 1
  } else if (newIndex >= game.value.screenshots.length) {
    newIndex = 0
  }
  currentIndex.value = newIndex
}

const openLightbox = () => {
  showLightbox.value = true
}

const closeLightBox = () => {
  showLightbox.value = false
}

onMounted(() => {
  console.log(route.params.slug)
});

</script>

<template>

  <GameHeader :game="game" />


  <div v-if="authStore.user" class="flex flex-wrap gap-5 px-6 py-5 ">
    <button class="bg-main text-white font-bold py-3 px-5 rounded" v-if="!isGameIsAdd" @click="addToUserList">Ajouter à
      ma liste</button>
    <button class="bg-main text-white font-bold py-3 px-5 rounded" v-else @click="removeFromUserList">Retirer de ma
      liste</button>
  </div>

  <GameInfo :game="game" />

  <div v-if="game?.screenshots?.length" class="max-w-full mx-auto my-8">
    <h3 class="text-white pb-2 border-b border-purple-700 mb-5">Captures d'écran de {{ game.name }}</h3>

    <div class="flex flex-col gap-4">
      <div class="relative w-full h-64 rounded-md shadow-lg cursor-pointer flex items-center justify-center"
        @dblclick="openLightbox">


        <div class="absolute inset-0 flex justify-between items-center pointer-events-none">
          <div
            class="w-10 h-10 bg-black/70 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto text-white text-2xl mx-3 transition-colors select-none"
            @click.stop="navigateScreenshot(-1)">&#10094;</div>
          <img :src="getScreenshotUrl(game.screenshots[currentIndex]?.image_id)" alt="Screenshot principal"
            class="w-full h-full object-cover">


          <div
            class="w-10 h-10 bg-black/70 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto text-white text-2xl mx-3 transition-colors select-none"
            @click.stop="navigateScreenshot(1)">&#10095;</div>
        </div>
      </div>

      <div
        class="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
        <div v-for="(screenshot, index) in game.screenshots" :key="screenshot.id" :class="[
          'flex-shrink-0 w-20 h-12 rounded-sm cursor-pointer border transition-transform relative',
          currentIndex === index
            ? 'border-purple-700 shadow-md'
            : 'border-transparent '
        ]" @click="changeMainImage(index)">
          <img :src="getScreenshotUrl(screenshot.image_id)" :alt="`Screenshot ${index + 1}`"
            class="w-full h-full object-cover rounded-sm">
          <div class="absolute inset-0 bg-purple-700 bg-opacity-20 opacity-0 transition-opacity rounded-sm"></div>
        </div>
      </div>
    </div>
  </div>

  <GameScreenshot v-if="game?.screenshots" :show="showLightbox" :screenshots="game.screenshots"
    :initial-index="currentIndex" @close="closeLightBox" @change-index="changeMainImage" />
  <GameComments :gameId="game?.id" />



  <RelatedGamesSection :extra-games="game?.expanded_games" title="Extensions du jeu" />
  <RelatedGamesSection :extra-games="game?.dlcs" title="DLCs" />
  <RelatedGamesSection :extra-games="game?.similar_games" title="Jeux similaires" />


  <PlatformSelectModal v-if="showPlatformModal" :game="game" @close="showPlatformModal = false"
    @select="handlePlatformSelect" />

</template>
