<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>
<template>
  <nav class="flex items-center justify-between bg-neutral-900 h-16 px-6 relative">
    <div class="flex-grow">
      <NuxtLink to="/">
        <img src="../assets/images/logo.png" alt="Logo" class="h-10 w-auto" />
      </NuxtLink>
    </div>

    <div class="md:hidden cursor-pointer z-20" @click="toggleMenu">
      <div class="w-8 h-0.5 bg-gray-200 relative rounded transition-all">
        <span class="absolute w-8 h-0.5 bg-gray-200 rounded -top-2 left-0"></span>
        <span class="absolute w-8 h-0.5 bg-gray-200 rounded top-2 left-0"></span>
      </div>
    </div>

    <ul
      :class="[
        'flex flex-col md:flex-row md:static absolute left-0 w-full md:w-auto bg-neutral-900 md:bg-transparent mt-16 md:mt-0 z-10 transition-all duration-300',
        isOpen ? 'top-0 opacity-100 visible' : 'top-[-500px] opacity-0 invisible md:opacity-100 md:visible',
      ]"
      class="space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left text-main font-medium"
    >
      <li>
        <NuxtLink to="/" >Accueil</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/catalogue-de-jeu" >Jeux</NuxtLink>
      </li>
      <li v-if="!authStore.user">
        <NuxtLink to="/login" >Connexion</NuxtLink>
      </li>
      <li v-if="!authStore.user">
        <NuxtLink to="/signup" >Inscription</NuxtLink>
      </li>
      <li v-if="authStore.user">
        <NuxtLink to="/profile" >Profil</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/a-propos" >À propos</NuxtLink>
      </li>
      <li v-if="authStore.user">
        <NuxtLink to="/" @click.prevent="logout" >Déconnexion</NuxtLink>
      </li>
    </ul>
  </nav>
</template>