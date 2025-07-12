import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useGamesModesStore = defineStore('gamesModes', () => {
    const gamesModes = ref<{ name: string }[]>([])
    const error = ref<string | null>(null)

  const fetchGamesModes = async () => {
    error.value = null
    try {
        const response = await $fetch<{ name: string }[]>('/api/gameModes')
        gamesModes.value = response.map((gameMode: {name:string}) => ({
            name: gameMode.name,
          }))
    } catch (err) {
      error.value = 'Erreur lors de la récupération des modes de jeux' + (err as Error).message
    } 
  }
  return {gamesModes, error, fetchGamesModes}

})
