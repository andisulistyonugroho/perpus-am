<template>
  <v-app>
    <v-navigation-drawer>
      <div class="pa-5 border-b-thin">
        <v-img
          src="https://nuxt.com/assets/design-kit/logo-green-black.svg"
          width="100"
          cover
        />
      </div>
      <v-list>
        <v-list-item>
          <template #prepend>
            <v-icon icon="i-mdi-view-dashboard" />
          </template>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item to="/books">
          <template #prepend>
            <v-icon icon="i-mdi-bookshelf" />
          </template>
          <v-list-item-title>Buku</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="bg-grey-lighten-5">
      <slot />
    </v-main>
  </v-app>
</template>
