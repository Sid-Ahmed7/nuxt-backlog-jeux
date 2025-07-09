<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="layout-wrapper">
<header>
  <NavBar />
</header>
<main>
<NuxtPage />
</main>
  <Footer />
</div>
</template>
<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>