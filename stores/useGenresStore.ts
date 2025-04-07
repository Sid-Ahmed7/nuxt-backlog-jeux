import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useGenresStore = defineStore('genres', () => {
  const genres = ref<{ name: string }[]>([])
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchGenres = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await $fetch<{ name: string }[]>('/api/genres')
        genres.value = response.map((genre: {name:string}) => ({
            name: genre.name,
          }))
    } catch (err) {
      error.value = 'Erreur lors de la récupération des genres' + (err as Error).message
    } finally {
      loading.value = false
    }
  }
  return {genres, error, loading, fetchGenres}

})
