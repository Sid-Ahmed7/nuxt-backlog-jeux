<script setup lang="ts"></script>

<template>
  <section class="bg-card text-white relative">
    <div class="text-center py-16">
      <div class="relative z-10">
        <h1 class="text-4xl font-bold mb-4">BacklogTrack</h1>
        <p class="text-lg mb-8 leading-relaxed">
          Gérez et explorez votre collection de jeux vidéo facilement !
        </p>
      </div>
    </div>
  </section>

  <section
    class="flex flex-row-reverse items-center gap-8 w-4/5 max-w-full mx-auto py-8 text-white md:flex-col md:w-[90%] md:text-center"
  >
    <div class="flex gap-4 bg-white/5 p-6 rounded-lg w-full md:mb-8 md:p-4">
      <img
        src="../../assets/images/backlog.webp"
        alt="backlog"
        class="max-h-96 max-w-1/2 object-cover rounded-lg shadow-lg md:w-full md:h-auto"
        width="400"
      />
      <div class="flex flex-col justify-between h-96">
        <div class="flex flex-col gap-4 mt-4">
          <h2 class="text-2xl font-semibold">À la recherche d'un jeu ?</h2>
          <p class="leading-relaxed">
            Grâce à notre base de données ultra-complète, retrouvez tous les
            jeux – des dernières sorties aux pépites rétro. Parcourez des
            milliers de titres, tous genres et plateformes confondus, et
            enrichissez votre collection en quelques clics. Avec des mises à
            jour régulières, vous êtes toujours à jour.
          </p>
        </div>

        <NuxtLink
          class="text-main text-base font-bold no-underline bg-card hover:bg-main hover:text-white py-3 px-6 rounded self-start transition-colors md:self-center"
          to="/catalogue-de-jeu"
        >
          Découvrir les jeux
        </NuxtLink>
      </div>
    </div>
  </section>

  <section
    class="flex flex-row items-center gap-8 w-4/5 max-w-full mx-auto py-8 text-white md:flex-col md:w-[90%] md:text-center"
  >
    <img
      src="../../assets/images/backlog.webp"
      alt="backlog"
      class="w-1/2 max-h-96 object-cover rounded-lg shadow-lg md:w-full md:h-auto"
    />
    <div
      class="w-1/2 flex flex-col gap-4 bg-white/5 p-6 rounded-lg md:w-full md:items-center md:mb-8 md:p-4"
    >
      <h2 class="text-2xl font-semibold">Donnez votre avis & notez vos jeux</h2>
      <p class="leading-relaxed">
        Partagez vos expériences de jeu avec la communauté : notez, commentez et
        découvrez les avis des autres joueurs. Que vous soyez amateur de RPG, de
        FPS ou de jeux indépendants, échangez des conseils, créez des liens et
        trouvez de nouvelles pépites à ajouter à votre backlog.
      </p>
      <NuxtLink
        class="text-main text-base font-bold no-underline bg-card hover:bg-main hover:text-white py-3 px-6 rounded self-start transition-colors md:self-center"
        to="/signup"
      >
        Rejoindre la communauté
      </NuxtLink>
    </div>
  </section>
</template>
