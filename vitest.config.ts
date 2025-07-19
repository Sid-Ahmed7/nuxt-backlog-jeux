import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      API_CLIENT_ID: process.env.API_CLIENT_ID,
      API_ACCESS_TOKEN: process.env.API_CLIENT_TOKEN,
    }
  }
})
