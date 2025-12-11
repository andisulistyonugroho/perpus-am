<script setup lang="ts">
definePageMeta({
  layout: "secondlayer",
  middleware: ["auth"],
});

const { borrowDetail } = useBorrowStore();
const { detail } = storeToRefs(useBorrowStore());

const borrowId = parseInt(useRoute().query.id as string);

borrowDetail(borrowId);
</script>
<template>
  <v-container v-if="detail">
    <div class="d-flex justify-space-between mb-2">
      <div class="text-h6">Detail Peminjaman</div>
      <div>
        <v-chip color="pink-lighten-2 text-subtitle-1">
          ID#{{ borrowId }}</v-chip
        >
      </div>
    </div>
    <v-card class="pa-3 bg-secondary" rounded="lg" variant="flat">
      <v-card-text>
        <div class="text-h6 text-center">{{ detail.profile.fullname }}</div>
      </v-card-text>
    </v-card>
    <v-card class="mt-4 pa-3 bg-grey-lighten-3" variant="flat" rounded="lg">
      <div class="text-subtitle-1 mb-4 border-b-thin">Buku yang dipinjam</div>
      <div
        v-for="(row, index) in detail.borrow_items"
        :key="row.id"
        class="pb-4"
      >
        <div class="text-body-1">{{ index + 1 }}. {{ row.book.title }}</div>
        <div class="text-caption">{{ row.book.author.name }}</div>
      </div>
    </v-card>
    <v-card class="mt-4 pa-3 bg-grey-lighten-3" variant="flat" rounded="lg">
      <div class="d-flex justify-space-between">
        <div>Tgl Peminjaman:</div>
        <div>{{ toDMY(detail.borrow_date) }}</div>
      </div>
    </v-card>
    <v-card class="mt-4 pa-3 bg-grey-lighten-3" variant="flat" rounded="lg">
      <div class="d-flex justify-space-between">
        <div>Tgl Pengembalian:</div>
        <div>{{ toDMY(detail.returned_date) }}</div>
      </div>
    </v-card>
  </v-container>
</template>
