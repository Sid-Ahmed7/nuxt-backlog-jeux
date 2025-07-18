<script setup lang="ts">
import { useGameUtils } from '~/utils/useGameUtils'
import type { Game } from '@/types/Game'

const { getCoverUrl } = useGameUtils()

const props = defineProps<{
  game: Game
  isClickable?: boolean
  isWinner?: boolean
}>()

const emit = defineEmits<{
  select: [gameId: number]
}>()

const handleClick = () => {
  if (props.isClickable && props.game.id) {
    emit('select', props.game.id)
  }
}

const formattedGenres = computed(() => {
  return props.game.genres?.slice(0, 3).map(g => g.name).join(', ') || 'Genres inconnus'
})

const releaseYear = computed(() => {
  return props.game.year || 'Année inconnue'
})
</script>

<template>
  <div 
    class="duel-game-card" 
    :class="{ 
      'clickable': isClickable, 
      'winner': isWinner,
      'has-cover': game.cover?.image_id 
    }"
    @click="handleClick"
  >
    <div class="cover-container">
      <img 
        v-if="game.cover?.image_id" 
        :src="getCoverUrl(game.cover.image_id)" 
        :alt="`Couverture de ${game.name}`"
        class="cover"
      />
      <div v-else class="no-cover">
        <span>Pas d'image</span>
      </div>
    </div>

    <div class="game-info">
      <h3 class="game-title">{{ game.name }}</h3>
      
      <div class="game-details">
        <p class="release-year">{{ releaseYear }}</p>
        <p class="genres">{{ formattedGenres }}</p>
      </div>

      <p v-if="game.summary" class="summary">
        {{ game.summary.slice(0, 150) }}{{ game.summary.length > 150 ? '...' : '' }}
      </p>

      <div v-if="isClickable" class="cta">
        <span class="vote-text">Cliquez pour voter !</span>
      </div>
    </div>

    <div v-if="isWinner" class="winner-overlay">
      <div class="winner-badge">🏆 Gagnant !</div>
    </div>
  </div>
</template>

<style scoped>
.duel-game-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  max-width: 400px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.clickable {
  cursor: pointer;
  transform: scale(1);
}

.clickable:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 40px 0 rgba(0, 255, 204, 0.3);
  border-color: #00ffcc;
}

.winner {
  border-color: #ffd700;
  box-shadow: 0 12px 40px 0 rgba(255, 215, 0, 0.4);
}

.cover-container {
  height: 300px;
  position: relative;
  overflow: hidden;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.clickable:hover .cover {
  transform: scale(1.1);
}

.no-cover {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 255, 204, 0.1), rgba(0, 123, 255, 0.1));
  color: #00ffcc;
  font-size: 1.1rem;
}

.game-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-title {
  color: #00ffcc;
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
  line-height: 1.3;
}

.game-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.release-year {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.genres {
  color: #aaa;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

.summary {
  color: #ddd;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}

.cta {
  background: rgba(0, 255, 204, 0.1);
  border: 1px solid #00ffcc;
  border-radius: 10px;
  padding: 0.8rem;
  text-align: center;
  margin-top: auto;
}

.vote-text {
  color: #00ffcc;
  font-weight: bold;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.3rem;
}



.winner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 215, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.winner-badge {
  background: #ffd700;
  color: #000;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.6);
  animation: pulse 1.5s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .duel-game-card {
    max-width: 100%;
    min-height: 450px;
  }
  
  .cover-container {
    height: 250px;
  }
  
  .game-info {
    padding: 1rem;
  }
  
  .game-title {
    font-size: 1.2rem;
  }
}</style> 