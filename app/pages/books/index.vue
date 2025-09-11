<script setup lang="ts">
const tab = ref(1);
const headers = ref([
  { title: "Judul", key: "title" },
  { title: "Penulis", key: "author" },
  { title: "Genre", key: "genre" },
  { title: "Dipinjam", key: "borrowed" },
  { title: "", key: "action", sortable: false },
]);
const addBookDialog = ref(false);

const closeIt = () => {
  addBookDialog.value = false;
};
</script>
<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-app-bar-title>Buku</v-app-bar-title>
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
          <v-list-item density="compact" @click="addBookDialog = true">
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
              <v-tab value="1" class="text-none">Semua</v-tab>
              <v-tab value="2" class="text-none">Tersedia</v-tab>
              <v-tab value="3" class="text-none">Dipinjam</v-tab>
            </v-tabs>
            <v-card-text>
              <div>
                <v-text-field
                  label="Search"
                  variant="outlined"
                  density="compact"
                  single-line
                  hide-details
                  prepend-inner-icon="i-mdi-magnify"
                />
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <v-data-table-virtual :headers="headers" />
            <div
              v-for="row in 20"
              :key="row"
              class="mt-3 px-5 py-2 border-b-thin"
            >
              <div>Negeri Para Bedebah</div>
              <div class="text-body-2 text-grey-darken-1">
                Tere Liye, 2020 &bull; 200 halaman &bull; Fiksi ilmiah &bull;
                dipinjam 100 kali
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <LazyBooksAddBook v-model:dialog="addBookDialog" @closeit="closeIt()" />
  </div>
</template>
