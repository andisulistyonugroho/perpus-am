<template>
  <v-bottom-navigation
    grow
    height="70"
    bg-color="secondary"
    selected-class="text-body-1"
  >
    <v-btn size="large" value="borrow" to="/borrow">
      <v-icon size="large" icon="i-mdi-arrow-bottom-bold" />
      <span>Pinjam</span>
    </v-btn>

    <v-btn size="large" value="return" to="/returns">
      <v-icon size="large" icon="i-mdi-arrow-up-bold" />
      <span>Kembalikan</span>
    </v-btn>

    <v-btn size="large" value="book" to="/books">
      <v-icon size="large" icon="i-mdi-bookshelf" />
      <span>Buku</span>
    </v-btn>

    <v-btn size="large" value="recent" to="/members">
      <v-icon size="large" icon="i-mdi-account-group-outline" />
      <span>Anggota</span>
    </v-btn>
  </v-bottom-navigation>
</template>
