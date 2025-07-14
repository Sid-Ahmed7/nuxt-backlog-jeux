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
const { getCoverUrl, getArtworkUrl, getScreenshotUrl, formatReleaseDate, transformGameData } = useGameUtils();

const route = useRoute();
const router = useRouter();

const showPlatformModal = ref(false);
const showLightbox = ref(false)
const currentIndex = ref(0)
const gameSlug = route.params.slug as string;

const {data: gameData, error} = useAsyncData('game', ( ) =>
  $fetch<Game[]>(`/api/game/${gameSlug}`).then(data =>{
    const transformedData = data.map(transformGameData)
    return transformedData[0] || null;
  })
); 

const game = computed(() => gameData.value ?? null);


const addToUserList = () => {
  if( game.value !== null && game.value.platforms && game.value.platforms.length > 0) {
    showPlatformModal.value = true
  } 
}

const removeFromUserList = () => {
  
  if(game.value && game.value.id) {
    userGamesStore.removeGameInUserList(game.value.id)
  }
}


const handlePlatformSelect = (platformName:string) => {
  if(game.value) {
    userGamesStore.addGameInUserList(game.value, platformName)
  }
}

const isGameIsAdd = computed(() => {
  return userGamesStore.userGames.some((g) => g.game.id === game.value?.id)


})

const changeMainImage = (index: number) =>{
  currentIndex.value = index
}

const navigateScreenshot = (d: number) => {
  if (!game.value?.screenshots?.length) {return}

  let newIndex = currentIndex.value + d

  if (newIndex < 0) {
    newIndex = game.value.screenshots.length -1
  } else if (newIndex >= game.value.screenshots.length) {
    newIndex = 0
  }
  currentIndex.value = newIndex
}

const openLightbox = () => {
  showLightbox.value = true
}

const closeLightBox =() => {
  showLightbox.value = false
}

onMounted( () => {
console.log(route.params.slug)
});

</script>

<template>

  <GameHeader :game="game" />


  <div v-if="authStore.user"  class="action-buttons">
    <button class="btn primary" v-if="!isGameIsAdd" @click="addToUserList">Ajouter à ma liste</button>
    <button class="btn primary" v-else @click="removeFromUserList">Retirer de ma liste</button>
  </div>

  <GameInfo :game="game" />

 
  <div v-if="game?.screenshots?.length" class="extra-info screenshots-section">
    <h3>Captures d'écran de {{ game.name }}</h3>
    
    <div class="screenshots-wrapper">
      <div class="main-screenshot" @dblclick="openLightbox">
        <img 
          :src="getScreenshotUrl(game.screenshots[currentIndex]?.image_id)" 
          alt="Screenshot principal"
        >
        
        <div class="navigation-arrows">
          <div class="arrow" @click.stop="navigateScreenshot(-1)">&#10094;</div>
          <div class="arrow" @click.stop="navigateScreenshot(1)">&#10095;</div>
        </div>
      </div>
      
      <div class="thumbnails-row">
        <div 
          v-for="(screenshot, index) in game.screenshots" 
          :key="screenshot.id"
          :class="['thumbnail', { active: currentIndex === index }]" 
          @click="changeMainImage(index)"
        >
          <img :src="getScreenshotUrl(screenshot.image_id)" :alt="`Screenshot ${index + 1}`">
          <div class="hover-highlight"></div>
        </div>
      </div>
    </div>
  </div>

  <GameScreenshot
    v-if="game?.screenshots"
    :show="showLightbox"
    :screenshots="game.screenshots"
    :initial-index="currentIndex"
    @close="closeLightBox"
    @change-index="changeMainImage"
  />
  <GameComments :gameId="game?.id" />



  <RelatedGamesSection :extra-games="game?.expanded_games" title="Extensions du jeu" />
  <RelatedGamesSection :extra-games="game?.dlcs" title="DLCs" />
  <RelatedGamesSection :extra-games="game?.similar_games" title="Jeux similaires" />

 
  <PlatformSelectModal 
    v-if="showPlatformModal" 
    :game="game" 
    @close="showPlatformModal = false" 
    @select="handlePlatformSelect" 
  />

</template>

<style scoped>

.action-buttons {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem 1.875rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}

.btn.primary {
  background-color: #8e24aa;
  color: white;
  border: none;
}

.btn.primary:hover {
  background-color: #6a1b9a;
}

.btn.secondary {
  background-color: transparent;
  border: 0.125rem solid #8e24aa;
  color: #8e24aa;
}

.btn.secondary:hover {
  background-color: #8e24aa;
  color: white;
}


.screenshots-section {
  max-width: 58.75rem;
  margin: 1.875rem auto;
}

.screenshots-section h3 {
  color: #fff;
  padding-bottom: 0.625rem;
  border-bottom: 0.0625rem solid #8e24aa;
  margin-bottom: 1.25rem;
}

.screenshots-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.main-screenshot {
  position: relative;
  width: 100%;
  height: 21.125rem;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.9375rem rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.main-screenshot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails-row {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.625rem;
}

.thumbnail {
  flex: 0 0 auto;
  width: 7.25rem;
  height: 4.0625rem;
  border-radius: 0.1875rem;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease;
  border: 0.0625rem solid transparent;
}

.thumbnail.active {
  border: 0.0625rem solid #8e24aa;
  box-shadow: 0 0 0.3125rem rgba(142, 36, 170, 0.6);
}

.thumbnail:hover {
  transform: translateY(-0.125rem);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.125rem;
}

.hover-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(142, 36, 170, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.thumbnail:hover .hover-highlight {
  opacity: 1;
}

.navigation-arrows {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.arrow {
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  font-size: 1.5rem;
  margin: 0 0.625rem;
  transition: background-color 0.2s;
}

.arrow:hover {
  background-color: rgba(142, 36, 170, 0.7);
}
</style>