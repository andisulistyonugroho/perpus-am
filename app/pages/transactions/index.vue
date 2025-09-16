<script setup lang="ts">
const { callHook } = useNuxtApp();

const headers = [
  { title: "Tgl", key: "modified" },
  { title: "Buku", key: "books.title" },
  { title: "Penulis", key: "books.title" },
  { title: "Status", key: "books.author.name" },
  { title: "Member", key: "year" },
];
const tab = ref(1);
const search = ref("");
const transactionDialog = ref(false);
</script>

<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-btn icon="i-mdi-menu" @click="callHook('drawer:toggle')" />
      <v-app-bar-title>Transaksi</v-app-bar-title>
      <v-btn
        id="menu-activator"
        class="text-none mr-4"
        variant="tonal"
        prepend-icon="i-mdi-lightning-bolt"
        color="primary"
      >
        Action
      </v-btn>
      <v-menu activator="#menu-activator">
        <v-list density="compact">
          <v-list-item density="compact" @click="transactionDialog = true">
            <v-list-item-title>Tambah</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Pinjam</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card>
            <v-tabs v-model="tab" slider-color="blue">
              <v-tab :value="1" class="text-none">Semua</v-tab>
              <v-tab :value="2" class="text-none">Peminjaman</v-tab>
              <v-tab :value="3" class="text-none">Pengembalian</v-tab>
            </v-tabs>
            <v-card-text>
              <div>
                <v-text-field
                  v-model="search"
                  label="Search"
                  variant="outlined"
                  density="compact"
                  single-line
                  hide-details
                  prepend-inner-icon="i-mdi-magnify"
                  clearable
                />
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-data-table-virtual :headers="headers" :items="[]" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
