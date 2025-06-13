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
  return {games, error, fetchGames}
})
