<script setup lang="ts">
const { $dayjs } = useNuxtApp();

const dialog = defineModel<boolean>("dialog");

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
});

const doSave = async () => {
  try {
    loading.value = true;
    const validate = await form.value.validate();
    if (!validate.valid) return;
    if (!profile.value) return;

    payload.value.borrower_profile_id = profile.value.id;
    payload.value.userId = profile.value.userId;

    await borrowBook(payload.value);
    await getBorrow(null);

    form.value.reset();
    dialog.value = false;
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
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card>
      <v-card-title>Pinjamkan Buku</v-card-title>
      <v-divider class="mt-1" />
      <v-card-text class="px-3">
        <v-form ref="form" class="pa-0">
          <v-autocomplete
            v-model="profile"
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
            label="Judul Buku*"
            :items="books"
            item-title="title"
            item-value="id"
            :rules="[(v) => !!v || 'Harus diisi']"
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
            label="Tanggal Pinjam *"
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
    <LazyBooksAddBook v-model:dialog="addBookDialog" />
    <LazyMembersAddMember v-model:dialog="addMemberDialog" />
  </v-dialog>
</template>
