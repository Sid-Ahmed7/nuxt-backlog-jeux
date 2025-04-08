// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@compodium/nuxt'],
  runtimeConfig: {
    api: {
      clientId: process.env.API_CLIENT_ID,
      accessToken: process.env.API_ACCESS_TOKEN,
    },
  },
  css: ['@/assets/styles/base.css'],
})