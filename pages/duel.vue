<script setup lang="ts">
import { useDuelStore } from '@/stores/useDuelStore'
import { useGamesStore } from '@/stores/useGamesStore'
import DuelGameCard from '@/components/Games/DuelGameCard.vue'
import { useGameUtils } from '~/utils/useGameUtils'

definePageMeta({
  title: 'Duels de Jeux - Quel jeu préférez-vous ?'
})

const duelStore = useDuelStore()
const gamesStore = useGamesStore()
const { getCoverUrl } = useGameUtils()

const showStats = ref(false)
const winner = ref<number | null>(null)
const showWinnerAnimation = ref(false)

onMounted(async () => {
  if (gamesStore.games.length === 0) {
    await gamesStore.fetchGames()
  }
  
  if (!duelStore.currentDuel) {
    duelStore.createNewDuel()
  }
})

const handleVote = (gameId: number) => {
  winner.value = gameId
  showWinnerAnimation.value = true
  
  setTimeout(() => {
    duelStore.voteForGame(gameId)
    winner.value = null
    showWinnerAnimation.value = false
  }, 2000)
}

const newDuel = () => {
  winner.value = null
  showWinnerAnimation.value = false
  duelStore.createNewDuel()
}

const toggleStats = () => {
  showStats.value = !showStats.value
}

const resetAll = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les statistiques ?')) {
    duelStore.resetDuels()
    duelStore.createNewDuel()
    showStats.value = false
  }
}

const canCreateDuel = computed(() => {
  return gamesStore.games.length >= 2
})
</script>

<template>
  <div class="duel-container">
    <header class="duel-header">
      <h1 class="title">⚔️ Duels de Jeux</h1>
      <p class="subtitle">Quel jeu préférez-vous ? Cliquez sur votre choix !</p>
      
      <div class="quick-stats">
        <div class="stat-item">
          <span class="stat-number">{{ duelStore.stats.totalDuels }}</span>
          <span class="stat-label">Duels réalisés</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ Object.keys(duelStore.stats.gamesStats).length }}</span>
          <span class="stat-label">Jeux évalués</span>
        </div>
      </div>

      <div class="header-actions">
        <button @click="newDuel" class="action-btn" :disabled="!canCreateDuel">
          🎲 Nouveau Duel
        </button>
        <button @click="toggleStats" class="action-btn stats-btn">
          📊 {{ showStats ? 'Masquer' : 'Voir' }} Stats
        </button>
        <button @click="resetAll" class="action-btn reset-btn">
          🗑️ Reset
        </button>
      </div>
    </header>

    <div v-if="!canCreateDuel" class="error-message">
      <h3>⚠️ Pas assez de jeux disponibles</h3>
      <p>Il faut au moins 2 jeux pour créer des duels. Rechargez la page ou vérifiez votre connexion.</p>
    </div>

    <section v-else-if="duelStore.currentDuel && !showStats" class="duel-arena">
      <div class="vs-container">
        <DuelGameCard
          :game="duelStore.currentDuel.game1"
          :isClickable="!showWinnerAnimation"
          :isWinner="winner === duelStore.currentDuel.game1.id"
          @select="handleVote"
        />

        <div class="vs-divider">
          <div class="vs-text">VS</div>
          <div class="vs-line"></div>
        </div>

        <DuelGameCard
          :game="duelStore.currentDuel.game2"
          :isClickable="!showWinnerAnimation"
          :isWinner="winner === duelStore.currentDuel.game2.id"
          @select="handleVote"
        />
      </div>

      <div v-if="showWinnerAnimation" class="transition-overlay">
        <div class="transition-content">
          <h2>🎉 Excellent choix !</h2>
          <p>Préparation du prochain duel...</p>
          <div class="loading-spinner"></div>
        </div>
      </div>
    </section>

    <section v-if="showStats" class="stats-section">
      <h2 class="stats-title">📊 Statistiques des Duels</h2>
      
      <div class="stats-overview">
        <div class="stat-card">
          <h3>Total des duels</h3>
          <p class="big-number">{{ duelStore.stats.totalDuels }}</p>
        </div>
        <div class="stat-card">
          <h3>Jeux évalués</h3>
          <p class="big-number">{{ Object.keys(duelStore.stats.gamesStats).length }}</p>
        </div>
      </div>

      <div v-if="duelStore.topGames.length > 0" class="top-games">
        <h3>🏆 Top des Jeux (minimum 3 duels)</h3>
        <div class="top-games-list">
          <div
            v-for="(item, index) in duelStore.topGames"
            :key="item.game?.id"
            class="top-game-item"
          >
            <div class="rank">{{ index + 1 }}</div>
            <img
              v-if="item.game?.cover?.image_id"
              :src="getCoverUrl(item.game.cover.image_id)"
              :alt="item.game.name"
              class="top-game-cover"
            />
            <div class="top-game-info">
              <h4>{{ item.game?.name }}</h4>
              <div class="top-game-stats">
                <span class="win-rate">{{ Math.round(item.stats.winRate) }}% victoires</span>
                <span class="total-duels">{{ item.stats.wins + item.stats.losses }} duels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<style scoped>
.duel-container {
  min-height: 100vh;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.duel-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  color: #00ffcc;
  text-shadow: 0 0 20px rgba(0, 255, 204, 0.6);
  margin: 0 0 1rem 0;
  font-weight: bold;
}

.subtitle {
  font-size: 1.3rem;
  color: #ddd;
  margin: 0 0 2rem 0;
}

.quick-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ffcc;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
}

.stat-label {
  color: #aaa;
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border: 1px solid #00ffcc;
  background: rgba(0, 255, 204, 0.1);
  color: #00ffcc;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.action-btn:hover:not(:disabled) {
  background: #00ffcc;
  color: #000;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.5);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stats-btn {
  border-color: #007bff;
  color: #007bff;
  background: rgba(0, 123, 255, 0.1);
}

.stats-btn:hover {
  background: #007bff;
  color: #fff;
}

.reset-btn {
  border-color: #ff4d4d;
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.1);
}

.reset-btn:hover {
  background: #ff4d4d;
  color: #fff;
}

.error-message {
  text-align: center;
  background: rgba(255, 77, 77, 0.1);
  border: 1px solid #ff4d4d;
  border-radius: 15px;
  padding: 2rem;
  color: #ff4d4d;
}

.duel-arena {
  position: relative;
}

.vs-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.vs-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 100px;
}

.vs-text {
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ffcc;
  text-shadow: 0 0 15px rgba(0, 255, 204, 0.7);
  animation: pulse 2s infinite;
}

.vs-line {
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #00ffcc, transparent);
}

.transition-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 10;
}

.transition-content {
  text-align: center;
  color: #fff;
}

.transition-content h2 {
  color: #00ffcc;
  margin-bottom: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 255, 204, 0.3);
  border-top: 3px solid #00ffcc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
}

.stats-section {
  max-width: 1000px;
  margin: 0 auto;
}

.stats-title {
  text-align: center;
  color: #00ffcc;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.stat-card h3 {
  color: #ddd;
  margin: 0 0 1rem 0;
}

.big-number {
  font-size: 3rem;
  font-weight: bold;
  color: #00ffcc;
  margin: 0;
}

.top-games h3 {
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
}

.top-games-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.top-game-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 15px;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

.rank {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffd700;
  min-width: 40px;
  text-align: center;
}

.top-game-cover {
  width: 60px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.top-game-info {
  flex: 1;
}

.top-game-info h4 {
  color: #00ffcc;
  margin: 0 0 0.5rem 0;
}

.top-game-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.win-rate {
  color: #4caf50;
  font-weight: bold;
}

.total-duels {
  color: #aaa;
}

.no-stats {
  text-align: center;
  color: #aaa;
  padding: 3rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@media (max-width: 768px) {
  .duel-container {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .vs-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .vs-divider {
    transform: rotate(90deg);
  }
  
  .vs-line {
    width: 100px;
    height: 2px;
  }
  
  .quick-stats {
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .header-actions {
    gap: 0.5rem;
  }
  
  .action-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}</style>