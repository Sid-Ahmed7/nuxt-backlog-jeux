<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits()
const searchQuery = ref<string>('')

const handleSearchInput = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="search-game">
    <input
      class="search-input"
      type="text"
      placeholder="Rechercher un jeu..."
      v-model="searchQuery"
      @input="handleSearchInput"
    />
  </div>
</template>
<style scoped>
.search-game {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 100px;
  font-size: 1rem;
  outline: none;
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}
</style>
