<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const { callHook } = useNuxtApp();
</script>

<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-btn icon="i-mdi-menu" @click="callHook('drawer:toggle')" />
      <v-app-bar-title>Pinjam Buku</v-app-bar-title>
    </v-app-bar>
    <LazyBorrowsAddBorrow />

    <!-- <LazyBorrowsAddReturn
      v-if="returnedDialog"
      v-model:dialog="returnedDialog"
      v-model:item="selectedItem"
    /> -->
  </div>
</template>
