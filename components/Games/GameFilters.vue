<script setup lang="ts">

const props = defineProps<{
  platforms: { id: number; name: string }[]
  genres: {id:number; name: string }[]
  gameModes: { id: number; name: string }[]
  themes: { id: number; name: string }[]
  selectedPlatforms: string[]
  selectedGenre: string[]
  selectedGameMode: string[]
  selectedTheme: string[]
}>()

const emit = defineEmits()

const selectedPlatform = ref(props.selectedPlatforms || [])
const selectedGenreRef = ref(props.selectedGenre || [])
const selectedGameMode = ref(props.selectedGameMode || [])
const selectedTheme = ref(props.selectedTheme || [])

watch(selectedPlatform, (newPlatforms) => {
  emit('update:selectedPlatforms', newPlatforms)
})
watch(selectedGenreRef, (newGenre) => {
  emit('update:selectedGenre', newGenre)

})
watch(selectedGameMode, (newGameMode) => {
  emit('update:selectedGameMode', newGameMode)
})
watch(selectedTheme, (newTheme) => {
  emit('update:selectedTheme', newTheme)
})

</script>

<template>
  <div class="sidebar">
    <div class="filter-item">
      <h3>Filtrer par plateforme</h3>
      <div v-for="platform in props.platforms" :key="platform.id" class="platform-item">
        <label :for="platform.name">
          {{ platform.name }}
        </label>
        <input type="checkbox" :value="platform.name" v-model="selectedPlatform" />
      </div>
    </div>

    <div class="filter-item">
      <h3>Filtrer par genre</h3>
      <div v-for="genre in props.genres" :key="genre.id" class="genre-item">
        <label :for="genre.name">
          {{ genre.name }}
        </label>
        <input type="checkbox" :value="genre.name" v-model="selectedGenreRef" />
    </div>
    </div>

    <div class="filter-item">
      <h3>Filtrer par mode de jeu</h3>
      <div v-for="gameMode in props.gameModes" :key="gameMode.id" class="gameMode-item" >
        <label :for="gameMode.name">
          {{ gameMode.name }}
        </label>
        <input type="checkbox" :value="gameMode.name" v-model="selectedGameMode" />
      </div>
    </div>

    <div class="filter-item">
      <h3>Filtrer par theme</h3>
      <div v-for="theme in props.themes" :key="theme.id" class="theme-item" >
        <label :for="theme.name">
          {{ theme.name }}
        </label>
        <input type="checkbox" :value="theme.name" v-model="selectedTheme" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 85%;
  background-color: #2d3a3f;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.platform-item,
.genre-item, .gameMode-item, .theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

input[type='checkbox'] {
  accent-color: #4caf50;
  width: 1.5rem;
  height: 1rem;
}

input[type='checkbox']:focus {
  outline: none;
  box-shadow: 0 0 0.2rem #4caf50;
}

select {
  padding: 0.5rem;
  border: 0.5rem solid #4caf50;
  background-color: #1a2427;
  color: white;
  border-radius: 0.25rem;
}

option {
  background-color: #1a2427;
  color: white;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0.25rem #4caf50;
}
/* .rating-filter {
  display: flex;
  gap: 10px;
  align-items: center;
}
input[type='number'] {
  width: 10%;
  padding: 2rem;
  border: 0.5rem solid #4caf50;
  background-color: #1a2427;
  color: white;
}
input[type='number']:focus {
  outline: none;
  box-shadow: 0 0 1rem #4caf50;
} */

.show-more {
  color: #00bfff;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.show-more:hover {
  color: #1ec0ff;
  text-decoration: underline;
}
</style>
