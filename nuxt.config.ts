// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: { port: 8080 },
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
