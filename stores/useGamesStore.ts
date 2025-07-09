import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game } from '@/types/Game'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])
  const error = ref<string | null>(null)

  const fetchGames = async () => {
    error.value = null
    try {
        const response = await $fetch<Game[]>('/api/games')
        games.value = response.map((game: Game) => ({
              id: game.id,
              name: game.name,
              cover: game.cover ? { id: game.cover.id, image_id: game.cover.image_id } : undefined,
              slug: game.slug || '',
              summary: game.summary,
              genres: game.genres || [],
              involved_companies: game.involved_companies || [],
              first_release_date: game.first_release_date || 0,
              artworks: game.artworks || [],
              dlcs: game.dlcs || [],
              similar_games: game.similar_games || [],
              expanded_games: game.expanded_games || [],
              expansions: game.expansions || [],
              screenshots: game.screenshots || [],
              game_modes: game.game_modes || [],
              themes: game.themes || [],
              total_rating_count: game.total_rating_count || 0,
              platforms: game.platforms || [],
              multiplayer_modes: game.multiplayer_modes || [],
              videos: game.videos || [],
              year: game.first_release_date
                ? new Date(game.first_release_date * 1000).getFullYear()
                : 0,
            }))

            console.log(games.value)
    } catch (err) {
      error.value = 'Erreur lors de la récupération des jeux' + (err as Error).message
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
