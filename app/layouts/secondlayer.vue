<script setup lang="ts">
const { hook } = useNuxtApp();
const pageTitle = ref("MAKTABAH KAFGB");

hook("page:settitle", (title) => {
  pageTitle.value = title;
});
</script>
<template>
  <v-app>
    <v-app-bar flat class="border-b-thin">
      <v-btn icon="i-mdi-arrow-left" @click="$router.back()" />
      <v-app-bar-title>{{ pageTitle }}</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
