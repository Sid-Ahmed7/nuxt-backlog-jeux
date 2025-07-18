<script setup lang="ts">
import { useDuelStore } from '@/stores/useDuelStore'
import { useAuthStore } from '@/stores/auth'
import DuelGameCard from '@/components/Games/DuelGameCard.vue'
import { useGameUtils } from '~/utils/useGameUtils'

definePageMeta({
  title: 'Duels de Jeux - Quel jeu préférez-vous ?'
})

const router = useRouter()
const authStore = useAuthStore()
const user = authStore.user

if (!user) {
  router.push('/login')
}

const duelStore = useDuelStore()
const { getCoverUrl, transformGameData } = useGameUtils()
const { gameData } = await useGames()

const showStats = ref(false)
const winner = ref<number | null>(null)
const showWinnerAnimation = ref(false)

const games = computed(() => {
  return gameData ? gameData.map(transformGameData) : []
})

watch(games, (newGames) => {
  if (newGames.length >= 2 && !duelStore.currentDuel) {
    duelStore.createNewDuel(newGames)
  }
}, { immediate: true })

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
  duelStore.createNewDuel(games.value)
}

const toggleStats = () => {
  showStats.value = !showStats.value
}

const resetAll = () => {
  if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les statistiques ?')) {
    duelStore.resetDuels()
    duelStore.createNewDuel(games.value)
    showStats.value = false
  }
}

const canCreateDuel = computed(() => {
  return games.value.length >= 2
})
</script>

<template>
  <div v-if="user" class="min-h-screen p-8 max-w-7xl mx-auto">
    <header class="text-center mb-12">
      <h1 class="text-5xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
        ⚔️ Duels de Jeux
      </h1>
      <p class="text-xl text-gray-300 mb-8">
        Quel jeu préférez-vous ? Cliquez sur votre choix !
      </p>
      
      <div class="flex justify-center gap-12 my-8">
        <div class="text-center">
          <span class="block text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            {{ duelStore.stats.totalDuels }}
          </span>
          <span class="text-gray-400 text-sm">Duels réalisés</span>
        </div>
        <div class="text-center">
          <span class="block text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            {{ Object.keys(duelStore.stats.gamesStats).length }}
          </span>
          <span class="text-gray-400 text-sm">Jeux évalués</span>
        </div>
      </div>

      <div class="flex justify-center gap-4 flex-wrap">
        <button 
          @click="newDuel" 
          :disabled="!canCreateDuel"
          class="px-6 py-3 border border-cyan-400 bg-cyan-400/10 text-cyan-400 rounded-full font-bold transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎲 Nouveau Duel
        </button>
        <button 
          @click="toggleStats" 
          class="px-6 py-3 border border-blue-500 bg-blue-500/10 text-blue-500 rounded-full font-bold transition-all duration-300 hover:bg-blue-500 hover:text-white"
        >
          📊 {{ showStats ? 'Masquer' : 'Voir' }} Stats
        </button>
        <button 
          @click="resetAll" 
          class="px-6 py-3 border border-red-500 bg-red-500/10 text-red-500 rounded-full font-bold transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          🗑️ Reset
        </button>
      </div>
    </header>

    <div v-if="!canCreateDuel" class="text-center bg-red-500/10 border border-red-500 rounded-2xl p-8 text-red-500">
      <h3 class="text-lg font-semibold mb-2">⚠️ Pas assez de jeux disponibles</h3>
      <p>Il faut au moins 2 jeux pour créer des duels. Rechargez la page ou vérifiez votre connexion.</p>
    </div>

    <section v-else-if="duelStore.currentDuel && !showStats" class="relative">
      <div class="flex justify-center items-center gap-8 max-w-5xl mx-auto lg:flex-row flex-col">
        <DuelGameCard
          :game="duelStore.currentDuel.game1"
          :isClickable="!showWinnerAnimation"
          :isWinner="winner === duelStore.currentDuel.game1.id"
          @select="handleVote"
        />

        <div class="flex flex-col items-center gap-4 min-w-[100px] lg:rotate-0 rotate-90">
          <div class="text-4xl font-bold text-cyan-400 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
            VS
          </div>
          <div class="w-0.5 h-24 bg-gradient-to-b from-transparent via-cyan-400 to-transparent lg:block hidden"></div>
          <div class="h-0.5 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent lg:hidden block"></div>
        </div>

        <DuelGameCard
          :game="duelStore.currentDuel.game2"
          :isClickable="!showWinnerAnimation"
          :isWinner="winner === duelStore.currentDuel.game2.id"
          @select="handleVote"
        />
      </div>

      <div v-if="showWinnerAnimation" class="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-10">
        <div class="text-center text-white">
          <h2 class="text-3xl font-bold text-cyan-400 mb-4">🎉 Excellent choix !</h2>
          <p class="text-lg mb-4">Préparation du prochain duel...</p>
          <div class="w-10 h-10 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </section>

    <section v-if="showStats" class="max-w-4xl mx-auto">
      <h2 class="text-center text-cyan-400 text-4xl font-bold mb-8">📊 Statistiques des Duels</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white/5 border border-white/20 rounded-2xl p-8 text-center backdrop-blur-sm">
          <h3 class="text-gray-300 mb-4 text-lg">Total des duels</h3>
          <p class="text-5xl font-bold text-cyan-400">{{ duelStore.stats.totalDuels }}</p>
        </div>
        <div class="bg-white/5 border border-white/20 rounded-2xl p-8 text-center backdrop-blur-sm">
          <h3 class="text-gray-300 mb-4 text-lg">Jeux évalués</h3>
          <p class="text-5xl font-bold text-cyan-400">{{ Object.keys(duelStore.stats.gamesStats).length }}</p>
        </div>
      </div>

      <div v-if="duelStore.topGames.length > 0">
        <h3 class="text-yellow-400 text-center mb-8 text-2xl font-bold">🏆 Top des Jeux (minimum 3 duels)</h3>
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, index) in duelStore.topGames"
            :key="item.game?.id"
            class="flex items-center gap-4 bg-white/5 border border-white/20 rounded-2xl p-4 backdrop-blur-sm"
          >
            <div class="text-2xl font-bold text-yellow-400 min-w-[40px] text-center">
              {{ index + 1 }}
            </div>
            <img
              v-if="item.game?.cover?.image_id"
              :src="getCoverUrl(item.game.cover.image_id)"
              :alt="item.game.name"
              class="w-15 h-20 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h4 class="text-cyan-400 font-semibold mb-2">{{ item.game?.name }}</h4>
              <div class="flex gap-4 text-sm">
                <span class="text-green-400 font-bold">{{ Math.round(item.stats.winRate) }}% victoires</span>
                <span class="text-gray-400">{{ item.stats.wins + item.stats.losses }} duels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-gray-400 py-12">
        <p class="text-lg mb-2">🎮 Pas encore assez de données pour afficher un classement.</p>
        <p>Réalisez quelques duels pour voir les statistiques !</p>
      </div>
    </section>
  </div>
  </template>