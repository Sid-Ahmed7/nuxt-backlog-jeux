import { defineStore } from 'pinia'
import { ref } from 'vue'


export const usePlatformsStore = defineStore('platforms', () => {
    const platforms = ref<{ name: string }[]>([])
    const error = ref<string | null>(null)

  const fetchPlatforms = async () => {
    error.value = null
    try {
        const response = await $fetch<{ name: string }[]>('/api/platforms')
        platforms.value = response.map((platform: {name:string}) => ({
            name: platform.name,
          }))
    } catch (err) {
      error.value = 'Erreur lors de la récupération des plateformes' + (err as Error).message
    } 
  }
  return {platforms, error, fetchPlatforms}

})
