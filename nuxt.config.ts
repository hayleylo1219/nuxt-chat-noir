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
    '@vite-pwa/nuxt',
  ],
  pwa:{
    manifest: {
      name: 'Le Chat Noir',
      short_name: 'Le Chat',
      lang: 'en',
      display: 'standalone',
      theme_color: '#000000',
      background_color: '#ffffff',
      start_url: '/',
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png"
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ],
    },
  },
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