<script setup lang="ts">

const props = defineProps<{
  selectTab: 'all' | 'finished' | 'inProgress'
}>()

const emit = defineEmits()

const setTab =(tab: 'all' | 'finished' | 'inProgress') => {
  emit('update:tab', tab)
}

</script>

<template>

<nav class="navbar">
  <ul>
      <li :class="{ active: props.selectTab === 'all' }" @click="setTab('all')">Tous les jeux</li>
      <li :class="{ active: props.selectTab === 'finished' }" @click="setTab('finished')">Terminés</li>
      <li :class="{ active: props.selectTab === 'inProgress' }" @click="setTab('inProgress')">En cours</li>
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