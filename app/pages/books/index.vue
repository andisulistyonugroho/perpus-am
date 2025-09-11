<script setup lang="ts">
const tab = ref(1);
</script>
<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-app-bar-title>Buku</v-app-bar-title>
      <v-btn
        class="text-none"
        variant="tonal"
        prepend-icon="i-mdi-lightning-bolt"
      >
        Action
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card>
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
            <v-tabs v-model="tab">
              <v-tab value="1" class="text-none">Semua</v-tab>
              <v-tab value="2" class="text-none">Tersedia</v-tab>
              <v-tab value="3" class="text-none">Dipinjam</v-tab>
            </v-tabs>
            <div
              v-for="row in 20"
              :key="row"
              class="mt-3 px-5 py-2 border-b-thin"
            >
              <div>Negeri Para Bedebah</div>
              <div class="text-body-2 text-grey-darken-1">
                Tere Liye, 2020 &bull; 200 halaman &bull; Fiksi ilmiah
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
