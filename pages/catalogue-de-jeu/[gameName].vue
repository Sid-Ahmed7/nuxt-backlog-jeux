<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGamesStore } from '@/stores/useGamesStore';
import { useUserGamesStore } from '@/stores/useUserGamesStore'
import { useGameUtils } from '@/composables/useGameUtils';
import type { Game } from '@/types/Game';
import PlatformSelectModal from '@/components/Games/PlatformSelectModal.vue';
import GameScreenshotLightbox from '@/components/Games/GameScreenshotLightbox.vue';


const gamesStore = useGamesStore();
const userGamesStore = useUserGamesStore();
const { getCoverUrl, getArtworkUrl, getScreenshotUrl, formatReleaseDate, formatRating } = useGameUtils();

const route = useRoute();
const router = useRouter();

const game = ref<Game | null>(null);
const showPlatformModal = ref(false);
const showLightbox = ref(false)
const currentIndex = ref(0)

const addToUserList = () => {
  if( game.value !== null && game.value.platforms && game.value.platforms.length > 0) {
    showPlatformModal.value = true
  } 
}



const handlePlatformSelect = (platformName:string) => {
  if(game.value) {
    userGamesStore.addGameInUserList(game.value, platformName)
  }
}

const markAsFinished = () => {
  console.log("Jeu marqué comme terminé");
};

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
}

const openLightbox = () => {
  showLightbox.value = true
}

const closeLightBox =() => {
  showLightbox.value = false
}


onMounted(async () => {
  const gameName = route.params.gameName as string;
  const fetchedGame = gamesStore.games.find((game) => game.name === gameName);
  if (fetchedGame) {
    game.value = fetchedGame;
  } else {
    router.push('/404');
  }
});

</script>

<template>
  <div class="game-header" :style="{'background-image': `url(${getArtworkUrl(game?.artworks?.[0]?.image_id)})`}">
    <img :src="getCoverUrl(game?.cover?.image_id)" alt="Cover" />
    <div class="game-info">
      <h1>{{ game?.name }}</h1>
      <div class="badges">
        <span v-for="genre in game?.genres || []" :key="genre.id">{{ genre.name }}</span>
        <span v-for="mode in game?.game_modes || []" :key="mode.id">{{ mode.name }}</span>
        <span v-for="theme in game?.themes || []" :key="theme.id">{{ theme.name }}</span>
      </div>
    </div>
  </div>

  <div class="action-buttons">
    <button class="btn primary" @click="addToUserList">Ajouter à ma liste</button>
    <button class="btn secondary" @click="markAsFinished">Noter le jeu</button>
  </div>

  <div class="info-grid">
    <div class="info-card">Sortie : {{ formatReleaseDate(game?.first_release_date) }}</div>
    <div class="info-card">Plateformes : {{ game?.platforms?.map(p => p.name).join(', ') }}</div>
    <div class="info-card">Genres : {{ game?.genres?.map(g => g.name).join(', ') }}</div>
  </div>

  <div class="game-description">
    {{ game?.summary || "Pas de description disponible." }}
  </div>

  <PlatformSelectModal 
    v-if="showPlatformModal" 
    :game="game" 
    @close="showPlatformModal = false" 
    @select="handlePlatformSelect" 
  /> 
  
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

  <GameScreenshotLightbox 
    v-if="game?.screenshots"
    :show="showLightbox"
    :screenshots="game.screenshots"
    :initial-index="currentIndex"
    @close="closeLightBox"
    @change-index="changeMainImage"
  />
  <div v-if="game?.expanded_games?.length" class="extra-info expanded-games">
    <h3>Extensions du jeu</h3>
    <ul>
      <li v-for="expanded in game.expanded_games" :key="expanded.id">
        <NuxtLink :to="`/catalogue-de-jeu/${encodeURIComponent(game?.name || 'Jeu inconnu')}`">
        <img :src="getCoverUrl(expanded.cover?.image_id)" alt="extensions" class="expanded-cover" />
      </NuxtLink>
        <span>{{ expanded.name }}</span>
      </li>
    </ul>
  </div>
  
  <div v-if="game?.dlcs?.length" class="extra-info dlcs">
    <h3>DLCs</h3>
    <ul>
      <li v-for="dlc in game.dlcs" :key="dlc.id">
        <NuxtLink :to="`/catalogue-de-jeu/${encodeURIComponent(game?.name || 'Jeu inconnu')}`">
        <img :src="getCoverUrl(dlc.cover?.image_id)" alt="DLC" class="dlc-cover" />
      </NuxtLink>
        <span>{{ dlc.name }}</span>
      </li>
    </ul>
  </div>
  
  <div v-if="game?.similar_games?.length" class="extra-info similar-games">
    <h3>Jeux similaires</h3>
    <ul>
      <li v-for="similar in game.similar_games" :key="similar.id">
        <NuxtLink :to="`/catalogue-de-jeu/${encodeURIComponent(similar?.name || 'Jeu inconnu')}`">
        <img :src="getCoverUrl(similar.cover?.image_id)" alt="jeux similaires" class="similar-cover" />
      </NuxtLink>
        <span>{{ similar.name }}</span>
      </li>
    </ul>
  </div>


</template>

<style scoped>
.game-header {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  padding: 3.75rem 1.875rem;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background-size: cover;
  background-position: center;
  position: relative;
}

.game-header img {
  height: 13.75rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 0.625rem rgba(0,0,0,0.6);
  z-index: 2; 
}

.game-info h1 {
  font-size: 2.8rem;
  margin-bottom: 0.625rem;
}

.badges span {
  display: inline-block;
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  box-shadow: 0 0 0.5rem #8e24aa88;
  border-radius: 3.125rem;
  padding: 0.3125rem 0.9375rem;
  margin-right: 0.625rem;
  font-size: 0.85rem;
  font-weight: bold;
  color: white;
}

.info-grid {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem 1.875rem;
  flex-wrap: wrap;
}

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
.info-card {
  background-color: #2c2c2c;
  padding: 0.9375rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 500;
  flex: 1 1 11.25rem;
  color: white;
}

.game-description {
  background: #141414;
  border-left: 0.3125rem solid #8e24aa;
  padding: 1.5625rem 1.875rem;
  font-style: italic;
  line-height: 1.6;
  margin: 1.25rem 1.875rem;
  color: white;
}

.extra-info {
  padding: 1.25rem 1.875rem;
  margin-bottom: 1.25rem;
}
.extra-info {
  margin: 30px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.extra-info h3 {
  margin-bottom: 15px;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  border-bottom: 2px solid #8e24aa;
  padding-bottom: 8px;
}

.extra-info ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
}

.extra-info li {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
}

.extra-info li:hover {
  transform: translateY(-5px);
}

.expanded-cover,
.dlc-cover,
.similar-cover {
  width: 100%;
  height: auto;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
}

.extra-info span {
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: #8e24aa;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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