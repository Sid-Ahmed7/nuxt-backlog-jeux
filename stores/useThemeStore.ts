import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useThemeStore = defineStore('themes', () => {
    const themes = ref<{ name: string }[]>([])
    const error = ref<string | null>(null)

  const fetchThemes = async () => {
    error.value = null
    try {
        const response = await $fetch<{ name: string }[]>('/api/gameThemes')
        themes.value = response.map((theme: {name:string}) => ({
            name: theme.name,
          }))
    } catch (err) {
      error.value = 'Erreur lors de la récupération des themes' + (err as Error).message
    } 
  }
  return {themes, error, fetchThemes}

})
