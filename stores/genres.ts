import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useGenresStore = defineStore('genres', () => {
  const genres = ref<{ name: string }[]>([])
  const error = ref<string | null>(null)

  const fetchGenres = async () => {
    error.value = null
    try {
        const response = await $fetch<{ name: string }[]>('/api/genres')
        genres.value = response.map((genre: {name:string}) => ({
            name: genre.name,
          }))

          console.log('Genres:', genres.value)
    } catch (err) {
      error.value = 'Erreur lors de la récupération des genres' + (err as Error).message
    } 
  }
  return {genres, error,  fetchGenres}

})
