<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

const handleSubmit = () => {
  if (name.value && email.value && message.value) {
    alert("Votre message a été envoyé!");
  } else {
    alert("Veuillez remplir tous les champs!");
  }
};
</script>

<template>
  <div class="p-5 font-sans bg-[#1c1c1e] text-white min-h-screen">
    <div class="text-center mb-10">
      <h1 class="text-4xl md:text-3xl font-bold mb-2">
        À propos de notre Backlog de Jeux Vidéo
      </h1>
      <p class="text-lg text-gray-300">
        Bienvenue sur notre application de suivi de jeux vidéo ! Voici tout ce
        que vous devez savoir à propos de ce projet.
      </p>
    </div>

    <div class="max-w-2xl mx-auto flex flex-col leading-relaxed gap-4">
      <h2 class="text-2xl md:text-xl text-white mt-8 font-semibold">
        Qu'est-ce que notre Backlog de Jeux Vidéo ?
      </h2>
      <p class="text-base md:text-sm text-gray-300">
        Notre plateforme vous permet de suivre vos jeux vidéo préférés,
        d'ajouter de nouveaux jeux à votre backlog, de marquer ceux que vous
        avez terminés, et de découvrir de nouveaux jeux en fonction de vos
        préférences.
      </p>

      <h2 class="text-2xl md:text-xl text-white font-semibold">
        Pourquoi ce projet ?
      </h2>
      <p class="text-base md:text-sm text-gray-300">
        Nous avons créé cette application pour aider les joueurs à garder une
        trace de leurs jeux, organiser leurs sessions de jeu, et partager leurs
        expériences avec d'autres passionnés de jeux vidéo.
      </p>
      <h2 class="text-2xl md:text-xl text-white font-semibold">
        Nous Contacter
      </h2>
      <p class="text-base md:text-sm mb-4 text-gray-300">
        Si vous avez des questions, des suggestions ou si vous voulez simplement
        discuter de jeux vidéo, n'hésitez pas à nous contacter via le formulaire
        ci-dessous :
      </p>

      <div class="bg-card rounded-lg p-5 mt-8">
        <h3 class="text-xl md:text-lg mb-5 text-white font-semibold">
          Formulaire de Contact
        </h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block mb-2 text-base text-gray-300"
              >Nom :</label
            >
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Votre nom"
              required
              class="w-full p-2 text-base rounded bg-card-hover text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2 text-base text-gray-300"
              >Email :</label
            >
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Votre email"
              required
              class="w-full p-2 text-base rounded bg-card-hover text-white focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          </div>
          <div class="mb-4">
            <label for="message" class="block mb-2 text-base text-gray-300"
              >Message :</label
            >
            <textarea
              id="message"
              v-model="message"
              placeholder="Votre message"
              required
              class="w-full p-2 text-base rounded bg-card-hover text-white h-36 resize-y focus:outline-none focus:ring-2 focus:ring-purple-700"
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded text-lg font-semibold transition-colors duration-300 cursor-pointer"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
