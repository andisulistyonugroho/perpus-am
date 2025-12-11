<script setup lang="ts">
const { borrowDetail } = useBorrowStore();
const { detail } = storeToRefs(useBorrowStore());
const props = defineProps({
  borrowid: { type: Number, required: true },
});
borrowDetail(props.borrowid);
</script>
<template>
  <v-container v-if="detail">
    <v-app-bar flat>
      <v-btn icon="i-mdi-arrow-left" @click="$router.back()" />
      <v-app-bar-title>Detail Peminjaman</v-app-bar-title>
      <v-chip color="pink-lighten-2" class="text-subtitle-1 mr-4">
        ID#{{ props.borrowid }}</v-chip
      >
    </v-app-bar>

    <v-card class="pa-3 bg-teal-lighten-5" rounded="lg" variant="flat">
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
        <div>Tgl Harus Kembali:</div>
        <div>{{ toDMY(detail.returned_date) }}</div>
      </div>
    </v-card>
  </v-container>
</template>
