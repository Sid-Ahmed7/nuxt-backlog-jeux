<script setup lang="ts">

const props = defineProps<{
  selectTab: 'all' | 'stats'
}>()

const emit = defineEmits()

const setTab =(tab: 'all' | 'stats') => {
  emit('update:tab', tab)
}

</script>

<template>

<nav class="navbar">
  <ul>
      <li :class="{ active: props.selectTab === 'all' }" @click="setTab('all')">Mes jeux</li>
      <li :class="{ active: props.selectTab === 'stats' }" @click="setTab('stats')">Statistiques</li>
    </ul>
    </nav>
</template>

<style scoped>
.navbar {
  margin-top: 4rem;
  margin-bottom: 5rem;
}

.navbar ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar li {
  cursor: pointer;
  font-weight: 500;
  color: white;
  background-color: var(--main-color);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

</style>