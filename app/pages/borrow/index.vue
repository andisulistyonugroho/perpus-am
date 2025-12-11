<script setup lang="ts">
definePageMeta({
  layout: "firstlayernohead",
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-app-bar-title>Pinjam Buku</v-app-bar-title>
    </v-app-bar>
    <LazyBorrowsAddBorrow />
  </div>
</template>
