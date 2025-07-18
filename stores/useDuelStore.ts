import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Game } from '@/types/Game'
import type { Duel, DuelResult, DuelStats } from '@/types/Duel'
import { useGamesStore } from './useGamesStore'

export const useDuelStore = defineStore('duel', () => {
  const currentDuel = ref<Duel | null>(null)
  const duelHistory = ref<DuelResult[]>([])
  const isLoading = ref(false)

  const createNewDuel = () => {
    const gamesStore = useGamesStore()
    const availableGames = gamesStore.games.filter(game => 
      game.id && game.name && game.cover?.image_id
    )

    if (availableGames.length < 2) {
      throw new Error('Pas assez de jeux disponibles pour créer un duel')
    }

    const shuffled = [...availableGames].sort(() => 0.5 - Math.random())
    const game1 = shuffled[0]
    const game2 = shuffled[1]

    currentDuel.value = {
      id: crypto.randomUUID(),
      game1,
      game2,
      votes: {
        game1Votes: 0,
        game2Votes: 0
      },
      createdAt: new Date()
    }

    return currentDuel.value
  }

  const voteForGame = (gameId: number) => {
    if (!currentDuel.value || !currentDuel.value.game1.id || !currentDuel.value.game2.id) {
      return
    }

    const winnerId = gameId
    const loserId = gameId === currentDuel.value.game1.id 
      ? currentDuel.value.game2.id 
      : currentDuel.value.game1.id

    duelHistory.value.push({
      winnerId,
      loserId,
      timestamp: new Date()
    })

    setTimeout(() => {
      createNewDuel()
    }, 1000)
  }

  const stats = computed((): DuelStats => {
    const gamesStats: { [gameId: number]: { wins: number; losses: number; winRate: number } } = {}

    duelHistory.value.forEach(result => {
      if (!gamesStats[result.winnerId]) {
        gamesStats[result.winnerId] = { wins: 0, losses: 0, winRate: 0 }
      }
      if (!gamesStats[result.loserId]) {
        gamesStats[result.loserId] = { wins: 0, losses: 0, winRate: 0 }
      }
    })

    duelHistory.value.forEach(result => {
      gamesStats[result.winnerId].wins++
      gamesStats[result.loserId].losses++
    })

    Object.keys(gamesStats).forEach(gameId => {
      const stats = gamesStats[parseInt(gameId)]
      const totalGames = stats.wins + stats.losses
      stats.winRate = totalGames > 0 ? (stats.wins / totalGames) * 100 : 0
    })

    return {
      totalDuels: duelHistory.value.length,
      gamesStats
    }
  })

  const topGames = computed(() => {
    const gamesStore = useGamesStore()
    return Object.entries(stats.value.gamesStats)
      .map(([gameId, gameStats]) => ({
        game: gamesStore.games.find(g => g.id === parseInt(gameId)),
        stats: gameStats
      }))
      .filter(item => item.game && (item.stats.wins + item.stats.losses) >= 3) // Au moins 3 duels
      .sort((a, b) => b.stats.winRate - a.stats.winRate)
      .slice(0, 10)
  })

  const resetDuels = () => {
    currentDuel.value = null
    duelHistory.value = []
  }

  return {
    currentDuel,
    duelHistory,
    isLoading,
    stats,
    topGames,
    createNewDuel,
    voteForGame,
    resetDuels
  }
}) 