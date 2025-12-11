<script setup lang="ts"></script>
<template>
  <v-app>
    <NuxtPwaManifest />
    <v-main>
      <slot />
      <LazyBottomMenu />
    </v-main>
  </v-app>
</template>
