import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Game } from '@/types/Game'

export const useUpComingGames = defineStore('upComingGames', () => {
  const upComingGames = ref<Game[]>([])
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchUpComingGames = async () => {
    loading.value = true
    error.value = null

    try {
        const response = await $fetch<Game[]>('/api/upComingGames')
        upComingGames.value = response.map((release: any) => ({
              id: release.game.id,
              name: release.game.name,
              cover: release.game.cover ? { id: release.game.cover.id, image_id: release.game.cover.image_id } : undefined,
              genres: Array.isArray(release.game.genres)
                ? release.game.genres.map((g: any) => g.name).join(', ')
                : 'Genre inconnu',
                release_dates: release.dates && Array.isArray(release.dates)
                  ? release.dates.map((date: number) => date)
                  : [],
            }))
    } catch (err) {
      error.value = 'Erreur lors de la récupération des jeux' + (err as Error).message
    } finally {
      loading.value = false
    }
  }
  return {upComingGames, error, loading, fetchUpComingGames}

})
