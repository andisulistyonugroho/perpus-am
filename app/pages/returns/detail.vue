<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const { $dayjs } = useNuxtApp();
const { returnBook } = useBorrowStore();

const borrowId = parseInt(useRoute().query.id as string);
const checkbox = ref(false);
const form = ref();
const notes = ref("");
const returnedDate = ref($dayjs().format("YYYY-MM-DD"));

const doReturn = async () => {
  try {
    const validate = await form.value.validate();
    if (!validate.valid) return;

    await returnBook({
      id: borrowId,
      returned_date: returnedDate.value,
      notes: notes.value,
    });

    navigateTo("/returns");
  } catch (error) {
    alert(error);
  }
};
</script>
<template>
  <div>
    <LazyBorrowsDetail :borrowid="borrowId" />
    <div class="mx-4">
      <v-textarea v-model="notes" rows="2" label="Catatan" clearable />
      <v-form ref="form">
        <v-date-input
          v-model="returnedDate"
          prepend-icon=""
          prepend-inner-icon="i-mdi-calendar"
          label="Tanggal Kembali *"
          :rules="[(v) => !!v || 'Harus diisi']"
          clearable
        />
        <v-checkbox
          v-model="checkbox"
          label="Semua sudah sesuai"
          :rules="[(v) => !!v || 'Harus diisi']"
        />
      </v-form>
      <v-btn
        block
        color="secondary"
        class="mt-6"
        append-icon="i-mdi-arrow-up-bold"
        @click="doReturn()"
      >
        Kembalikan
      </v-btn>
    </div>
  </div>
</template>
