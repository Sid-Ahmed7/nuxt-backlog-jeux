<script setup lang="ts">

const emit = defineEmits()
const searchQuery = ref<string>('')

const handleSearchInput = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="relative w-full max-w-xl mx-auto">
    <input
      class="w-full px-4 py-3 border border-green-500 rounded-full text-white text-base outline-none"
      type="text"
      placeholder="Rechercher un jeu..."
      v-model="searchQuery"
      @input="handleSearchInput"
    />
  </div>
</template>

