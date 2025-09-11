<script setup lang="ts">
const dialog = defineModel<boolean>("dialog");
const checkbox = ref(false);
const genres = ["Fiksi Ilmiah", "Action", "Biografi", "Sejarah"];
</script>
<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title>Tambah Buku</v-card-title>
      <v-card-text class="px-3">
        <v-form class="pa-0">
          <v-container fluid class="pa-0 ma-0">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  label="Judul*"
                  :rules="[(v) => !!v || 'Harus diisi']"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Penulis*"
                  :rules="[(v) => !!v || 'Harus diisi']"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Genre*"
                  :items="genres"
                  :rules="[(v) => !!v || 'Harus diisi']"
                  class="mr-1"
                />
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
          @click="dialog = false"
          >Close</v-btn
        >
        <v-btn prepend-icon="i-mdi-content-save" variant="tonal">Simpan</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
