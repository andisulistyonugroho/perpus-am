<script setup lang="ts">
definePageMeta({
  layout: "firstlayernohead",
  middleware: ["auth"],
});
const search = ref("");

const { getBorrow } = useBorrowStore();
const { borrows } = storeToRefs(useBorrowStore());

await getBorrow(1);
</script>

<template>
  <div>
    <v-app-bar flat extended>
      <v-app-bar-title>Kembalikan Buku</v-app-bar-title>
      <template #extension>
        <v-text-field
          v-model="search"
          label="Nama peminjam"
          variant="outlined"
          density="compact"
          single-line
          hide-details
          prepend-inner-icon="i-mdi-magnify"
          class="mx-4"
          clearable
        />
      </template>
    </v-app-bar>
    <v-container>
      <v-card class="mt-4">
        <div
          v-for="row in borrows"
          :key="row.id"
          class="px-5 py-2 border-b-thin"
          @click="navigateTo(`/returns/detail?id=${row.id}`)"
        >
          <div class="d-flex justify-space-between">
            <div>{{ row.profile.fullname }}</div>
            <v-chip size="small" color="pink" class="text-caption">
              ID#{{ row.id }}
            </v-chip>
          </div>
          <div class="text-caption text-grey-darken-1">
            Pinjam: {{ toDMY(row.borrow_date) }}
          </div>
          <div class="text-caption text-grey-darken-1">
            Harus kembali: {{ toDMY(row.returned_date) }}
          </div>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
