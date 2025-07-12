import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@pinia/nuxt", "@nuxtjs/supabase", "@nuxt/test-utils/module"],

  runtimeConfig: {
    api: {
      clientId: process.env.API_CLIENT_ID,
      accessToken: process.env.API_ACCESS_TOKEN,
    },

    public: {
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
        redirect: false,
        redirectOptions: {
          login: "/login",
          callback: "/",
          exclude: [
            "/",
            "/login",
            "/signup",
            "/catalogue-de-jeu",
            "/catalogue-de-jeu/**",
            "/a-propos",
          ],
          saveRedirectToCookie: true,
          cookieRedirect: true,
        },
      },
    },
  },

  css: ["@/assets/styles/base.css"],
});
