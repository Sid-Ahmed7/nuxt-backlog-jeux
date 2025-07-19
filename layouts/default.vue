<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
<header>
  <NavBar />
</header>
<main class="flex-1">
<NuxtPage />
</main>
  <Footer />
</div>
</template>
