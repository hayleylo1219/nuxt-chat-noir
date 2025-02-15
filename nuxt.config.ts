import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/tailwind.css'],
  modules: [
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@tailwindcss/vite',
  ],
  // plugins: ['~/plugins/supabase.ts'],
  supabase: {
    redirectOptions: {
      login: '/user/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/user/register'],
      cookieRedirect: false,
    }
  },
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },
  compatibilityDate: '2024-11-01',
  typescript: {
    strict: false,
    typeCheck: true
  },
  devtools: { enabled: true },
  imports: {
    autoImport: true
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [
      tailwindcss(),
      require('dotenv').config(),
    ],
  },
})
