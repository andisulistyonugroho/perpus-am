// https://nuxt.com/docs/api/configuration/nuxt-config
const theVersion = "0.01";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: { port: 8080 },
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000/api",
      theVersion: theVersion,
    },
  },

  css: ["@/assets/main.scss"],

  modules: [
    "@nuxt/eslint",
    "vuetify-nuxt-module",
    "dayjs-nuxt",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      icons: { defaultSet: "unocss-mdi" },
    },
  },
});
