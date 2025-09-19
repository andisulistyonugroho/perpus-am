<script setup lang="ts">
const { $dayjs } = useNuxtApp();
const dialog = defineModel<boolean>("dialog");
const item = defineModel<Borrow>("item");

const { returnBook, getBorrow } = useBorrowStore();

const payload = ref<ReturnBorrow>({
  id: item.value ? item.value.id : 0,
  borrow_status: 2,
  returned_date: $dayjs().format("YYYY-MM-DD"),
  modified: $dayjs().format("YYYY-MM-DD"),
});
const checkbox = ref(false);
const loading = ref(false);
const form = ref();

const doSave = async () => {
  try {
    loading.value = true;
    const validate = await form.value.validate();
    if (!validate.valid) return;

    await returnBook(payload.value);
    await getBorrow(1);
    loading.value = false;
    dialog.value = false;
  } catch (error) {
    loading.value = false;
    alert(error);
  }
};
</script>
<template>
  <v-dialog v-model="dialog" persistent width="600">
    <v-card v-if="item">
      <v-card-title>Kembalikan Buku</v-card-title>
      <v-divider class="mt-1" />
      <v-card-text class="px-3">
        <div class="d-flex justify-space-between mb-1">
          <div>Judul</div>
          <div class="font-weight-bold">{{ item.book.title }}</div>
        </div>
        <div class="d-flex justify-space-between mb-1">
          <div>Tahun</div>
          <div class="font-weight-bold">{{ item.book.year }}</div>
        </div>
        <div class="d-flex justify-space-between mb-1">
          <div>Penulis</div>
          <div class="font-weight-bold">{{ item.book.author.name }}</div>
        </div>
        <div class="d-flex justify-space-between mb-1">
          <div>Tanggal Peminjaman</div>
          <div class="font-weight-bold">
            {{ toDateString(item.borrow_date) }}
          </div>
        </div>
        <div class="d-flex justify-space-between mb-1">
          <div>Peminjam</div>
          <div class="font-weight-bold">
            {{ item.profile.fullname }}
          </div>
        </div>
        <div class="d-flex justify-space-between mb-1">
          <div>ID Peminjaman</div>
          <div class="font-weight-bold">
            {{ item.id }}
          </div>
        </div>

        <v-form ref="form" class="mt-3">
          <v-date-input
            v-model="payload.returned_date"
            prepend-icon=""
            label="Tanggal Pengembalian *"
            :rules="[(v) => !!v || 'Harus diisi']"
            clearable
          />
          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'Harus diisi']"
            label="Semua input sudah sesuai"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          prepend-icon="i-mdi-close"
          variant="tonal"
          color="error"
          class="text-none"
          :loading="loading"
          @click="dialog = false"
          >Tutup</v-btn
        >
        <v-btn
          prepend-icon="i-mdi-content-save"
          variant="tonal"
          color="primary"
          class="text-none"
          :loading="loading"
          @click="doSave()"
          >Simpan</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
