import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game } from '@/types/Game'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchGames = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await $fetch<Game[]>('/api/games')
        games.value = response.map((game: Game) => ({
              id: game.id,
              name: game.name,
              cover: game.cover ? { id: game.cover.id, image_id: game.cover.image_id } : undefined,
    
              genres: Array.isArray(game.genres)
                ? game.genres.map((g: any) => g.name).join(', ')
                : 'Genre inconnu',
              first_release_date: game.first_release_date || 0,
              artworks: game.artworks ? game.artworks : undefined,
              rating: game.rating || 0,
              platforms: game.platforms || [],
              year: game.first_release_date
                ? new Date(game.first_release_date * 1000).getFullYear()
                : 0,
            }))
    } catch (err) {
      error.value = 'Erreur lors de la récupération des jeux' + (err as Error).message
    } finally {
      loading.value = false
    }

  }
  return {games, error, loading, fetchGames}
})
