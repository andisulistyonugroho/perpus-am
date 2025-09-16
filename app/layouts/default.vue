<script setup lang="ts">
const { hook } = useNuxtApp();
const drawer = ref(true);

hook("drawer:toggle", () => {
  drawer.value = !drawer.value;
});
</script>
<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
    >
      <div class="pa-5 border-b-thin">
        <v-img
          src="https://nuxt.com/assets/design-kit/logo-green-black.svg"
          width="100"
          cover
        />
      </div>
      <v-list>
        <v-list-item to="/transactions">
          <template #prepend>
            <v-icon icon="i-mdi-view-list" />
          </template>
          <v-list-item-title>Transaksi</v-list-item-title>
        </v-list-item>
        <v-list-item to="/books">
          <template #prepend>
            <v-icon icon="i-mdi-bookshelf" />
          </template>
          <v-list-item-title>Buku</v-list-item-title>
        </v-list-item>
        <v-list-item to="/members">
          <template #prepend>
            <v-icon icon="i-mdi-account-group" />
          </template>
          <v-list-item-title>Anggota</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="bg-grey-lighten-3">
      <slot />
    </v-main>
  </v-app>
</template>
