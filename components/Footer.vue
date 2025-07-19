<template>
  <footer class="bg-neutral-900 text-gray-200 py-8">
    <div class="flex flex-col items-center justify-center">
      <ul class="flex flex-col md:flex-row gap-2 md:gap-4 my-4 text-center">
        <li>
          <NuxtLink to="/" class="hover:text-indigo-400 transition-colors">Accueil</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/catalogue-de-jeu" class="hover:text-indigo-400 transition-colors">Jeux</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/a-propos" class="hover:text-indigo-400 transition-colors">À propos</NuxtLink>
        </li>
      </ul>

      <div class="mt-4 text-sm text-center">
        <p>&copy; 2025 BacklogTrack. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

