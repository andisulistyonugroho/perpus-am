<script setup lang="ts">
const { $dayjs } = useNuxtApp();

const { getBooksByState } = useBookStore();
const { books } = storeToRefs(useBookStore());
const { getMember } = useMemberStore();
const { members } = storeToRefs(useMemberStore());
const { borrowBook, getBorrow } = useBorrowStore();

const checkbox = ref(false);
const addBookDialog = ref(false);
const addMemberDialog = ref(false);
const form = ref();
const loading = ref(false);
const profile = ref<Member | undefined>();

const payload = ref<AddBorrow>({
  book_id: [],
  userId: 0,
  borrower_profile_id: 0,
  borrow_date: $dayjs().format("YYYY-MM-DD"),
  returned_date: $dayjs().add(7, "days").format("YYYY-MM-DD"),
});

const doSave = async () => {
  try {
    const validate = await form.value.validate();
    if (!validate.valid) return;
    if (!profile.value) return;

    payload.value.borrower_profile_id = profile.value.id;
    payload.value.userId = profile.value.userId;

    await borrowBook(payload.value);
    await getBorrow(null);

    form.value.reset();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    alert(error);
  }
};

await getBooksByState(1); // available book on shelf
await getMember();
</script>

<template>
  <v-card flat>
    <v-card-text class="px-3">
      <v-form ref="form" class="pa-0">
        <v-autocomplete
          v-model="profile"
          prepend-icon=""
          prepend-inner-icon="i-mdi-account-outline"
          label="Nama Anggota*"
          :items="members"
          item-title="fullname"
          :rules="[(v) => !!v || 'Harus diisi']"
          clearable
          return-object
        >
          <template #append-item>
            <v-divider class="my-2" />
            <v-btn
              block
              variant="text"
              prepend-icon="i-mdi-plus"
              class="text-none"
              @click="addMemberDialog = true"
              >Tambah Anggota</v-btn
            >
          </template>
        </v-autocomplete>
        <v-autocomplete
          v-model="payload.book_id"
          prepend-icon=""
          prepend-inner-icon="i-mdi-book-open-variant-outline"
          label="Judul Buku*"
          :items="books"
          item-title="title"
          item-value="id"
          :rules="[
            (v) => !!v || 'Harus diisi',
            (v) => v.length >= 1 || 'Tidak boleh kosong',
            (v) => v.length <= 5 || 'Maksimal 5 buku',
          ]"
          clearable
          multiple
          hide-selected
        >
          <template #item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item.title"
              :subtitle="`${item.raw.author.name}- ${item.raw.genre.title} - ${item.raw.year}`"
            />
          </template>
          <template #append-item>
            <v-divider class="my-2" />
            <v-btn
              block
              variant="text"
              prepend-icon="i-mdi-plus"
              class="text-none"
              @click="addBookDialog = true"
              >Tambah Buku</v-btn
            >
          </template>
        </v-autocomplete>
        <v-date-input
          v-model="payload.borrow_date"
          prepend-icon=""
          prepend-inner-icon="i-mdi-calendar"
          label="Tanggal Pinjam *"
          :rules="[(v) => !!v || 'Harus diisi']"
          clearable
        />
        <v-date-input
          v-model="payload.returned_date"
          prepend-icon=""
          prepend-inner-icon="i-mdi-calendar"
          label="Tanggal Kembali *"
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
      <v-spacer />
      <v-btn
        prepend-icon="i-mdi-close"
        color="grey-lighten-3"
        variant="flat"
        :loading="loading"
        >Batal</v-btn
      >
      <v-btn
        prepend-icon="i-mdi-content-save"
        variant="flat"
        color="primary"
        :loading="loading"
        @click="doSave()"
        >Simpan</v-btn
      >
    </v-card-actions>
  </v-card>
  <LazyBooksAddBook v-model:dialog="addBookDialog" />
  <LazyMembersAddMember v-model:dialog="addMemberDialog" />
</template>
