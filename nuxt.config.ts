import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/icon'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      strictPort: true,
      proxy: {
        "/serverapi": {
          target: process.env.API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/serverapi/, '')
        }
      }
    }
  }
})