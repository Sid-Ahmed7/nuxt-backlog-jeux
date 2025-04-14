<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGamesStore } from '@/stores/useGamesStore';
import { useGameUtils } from '@/composables/useGameUtils';
import type { Game } from '@/types/Game';

const gamesStore = useGamesStore();
const { getCoverUrl, getArtworkUrl, getScreenshotUrl, formatReleaseDate, formatRating } = useGameUtils();

const route = useRoute();
const router = useRouter();

const game = ref<Game | null>(null);

onMounted(async () => {
  const gameName = route.params.gameName as string;
  const fetchedGame = gamesStore.games.find((game) => game.name === gameName);
  if (fetchedGame) {
    game.value = fetchedGame;
  } else {
    router.push('/404');
  }
});

const goBack = () => {
  router.back();
};

const addToWishlist = () => {
  console.log("Ajouté à la Wishlist");
};

const markAsFinished = () => {
  console.log("Jeu marqué comme terminé");
};
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
  <button class="btn primary" @click="addToWishlist">Ajouter à ma liste</button>
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

  <div v-if="game?.screenshots?.length" class="extra-info">
    <h3>Captures d'écran</h3>
    <div class="screenshots">
      <img v-for="screenshot in game.screenshots" :key="screenshot.id" :src="getScreenshotUrl(screenshot.image_id)" alt="Screenshot" class="screenshot" />
    </div>
  </div>


</template>

<style scoped>

.game-header {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  padding: 60px 30px;
  display: flex;
  align-items: center;
  gap: 40px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.game-header img {
  height: 220px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.6);
  z-index: 2; 
}

.game-info h1 {
  font-size: 2.8rem;
  margin-bottom: 10px;
}

.badges span {
  display: inline-block;
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  box-shadow: 0 0 8px #8e24aa88;
  border-radius: 50px;
  padding: 5px 15px;
  margin-right: 10px;
  font-size: 0.85rem;
  font-weight: bold;
}

.info-grid {
  display: flex;
  gap: 20px;
  padding: 20px 30px;
  flex-wrap: wrap;
}
.action-buttons {
  display: flex;
  gap: 20px;
  padding: 20px 30px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 8px;
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
  border: 2px solid #8e24aa;
  color: #8e24aa;
}

.btn.secondary:hover {
  background-color: #8e24aa;
  color: white;
}


.info-card {
  background-color: #2c2c2c;
  padding: 15px 20px;
  border-radius: 12px;
  font-weight: 500;
  flex: 1 1 180px;
}

.game-description {
  background: #141414;
  border-left: 5px solid #8e24aa;
  padding: 25px 30px;
  font-style: italic;
  line-height: 1.6;
  margin: 20px 30px;
}

.community-stats {
  padding: 20px 30px;
  font-weight: bold;
}

.circle-rating {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(#6a1b9a 0% 92%, #333 92% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0 auto;
  color: white;
}

.rating-box {
  text-align: center;
  padding: 20px;
}

.extra-info {
  padding: 20px 30px;
  margin-bottom: 20px;
}

.screenshots img,
.artworks img,
.dlc-cover {
  max-width: 160px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 0 0 6px rgba(0,0,0,0.4);
}

.dlc-entry,
.similar-entry {
  display: inline-block;
  text-align: center;
  margin: 10px;
  max-width: 180px;
  color: #fff;
}
</style>
