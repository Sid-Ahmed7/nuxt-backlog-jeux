import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game } from '@/types/Game'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])
  const error = ref<string | null>(null)
    const currentPage = ref(1)
  const gamesPerPage = ref(20)

    const fetchGames = async (page = 1, limit = 20) => {
    error.value = null
    try {
      const response = await $fetch<{ data: any[] }>(`/api/games?page=${page}&limit=${limit}`)
      currentPage.value = page
      gamesPerPage.value = limit
    } catch (err) {
      error.value = 'Erreur lors de la récupération des jeux ' + (err as Error).message
    }
  }

  

      const isUpcoming = (game: Game) => {
        if(!game.first_release_date) {
            return false
        }
        
        const now = new Date()
        const nextWeek = new Date()
        nextWeek.setDate(now.getDate() + 50)
        const releaseDate = new Date(game.first_release_date * 1000)
        return releaseDate >= now && releaseDate <= nextWeek
    }

    
    const upComingGames = computed(() => {
       
            return games.value.filter(isUpcoming).sort((a, b) => 
                (a.first_release_date ?? 0) - (b.first_release_date ?? 0)
            )
        
    })
  return {games, error, fetchGames,upComingGames}
})
