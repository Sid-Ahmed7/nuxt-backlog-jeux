import { defineStore } from 'pinia'
import { ref } from 'vue'


export const usePlatformsStore = defineStore('platforms', () => {
    const platforms = ref<{ name: string }[]>([])
    const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchPlatforms = async () => {
    loading.value = true
    error.value = null
    try {
        const response = await $fetch<{ name: string }[]>('/api/platforms')
        platforms.value = response.map((platform: {name:string}) => ({
            name: platform.name,
          }))
    } catch (err) {
      error.value = 'Erreur lors de la récupération des plateformes' + (err as Error).message
    } finally {
      loading.value = false
    }
  }
  return {platforms, error, loading, fetchPlatforms}

})
