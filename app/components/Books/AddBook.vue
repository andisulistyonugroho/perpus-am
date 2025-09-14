<script setup lang="ts">
const dialog = defineModel<boolean>("dialog");
const checkbox = ref(false);
const genres = ref<string[]>([]);
const authors = ref<string[]>([]);
const genreDialog = ref(false);
const authorDialog = ref(false);
const form = ref(null);
</script>
<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title>Tambah Buku</v-card-title>
      <v-card-text class="px-3">
        <v-form ref="form" class="pa-0">
          <v-container fluid class="pa-0 ma-0">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  label="Judul*"
                  :rules="[(v) => !!v || 'Harus diisi']"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Penulis*"
                  :items="authors"
                  :rules="[(v) => !!v || 'Harus diisi']"
                  class="mr-1"
                >
                  <template #append-item>
                    <v-divider class="my-2" />
                    <v-btn
                      block
                      variant="text"
                      prepend-icon="i-mdi-plus"
                      class="text-none"
                      @click="authorDialog = true"
                      >Tambah Penulis</v-btn
                    >
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Genre*"
                  :items="genres"
                  :rules="[(v) => !!v || 'Harus diisi']"
                  class="mr-1"
                >
                  <template #append-item>
                    <v-divider class="my-2" />
                    <v-btn
                      block
                      variant="text"
                      prepend-icon="i-mdi-plus"
                      class="text-none"
                      @click="genreDialog = true"
                      >Tambah Genre</v-btn
                    >
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Jumlah Halaman*"
                  type="number"
                  :rules="[(v) => !!v || 'Harus diisi']"
                />
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="checkbox"
                  :rules="[(v) => !!v || 'Harus diisi']"
                  label="Semua input sudah sesuai"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          prepend-icon="i-mdi-close"
          variant="tonal"
          color="error"
          class="text-none"
          @click="dialog = false"
          >Tutup</v-btn
        >
        <v-btn
          prepend-icon="i-mdi-content-save"
          variant="tonal"
          color="primary"
          class="text-none"
          >Simpan</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="genreDialog" width="500">
      <LazyBooksAddGenre @closeit="genreDialog = false" />
    </v-dialog>
    <v-dialog v-model="authorDialog" width="500">
      <LazyBooksAddAuthor @closeit="authorDialog = false" />
    </v-dialog>
  </v-dialog>
</template>
