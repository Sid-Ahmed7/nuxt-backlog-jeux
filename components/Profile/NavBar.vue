<script setup lang="ts"></script>
<template>
<nav class="navbar">
      <ul>
        <li><RouterLink to="/">Mes jeux</RouterLink></li>
        <li><RouterLink to="/">Statistiques</RouterLink></li>
      </ul>
    </nav>
</template>

<style scoped>


.navbar ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.navbar a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.navbar a:hover {
  color: #007bff;
}

</style>