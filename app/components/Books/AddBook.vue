<script setup lang="ts">
const { $debounce } = useNuxtApp();
const { getAuthors } = useAuthorStore();
const { authors } = storeToRefs(useAuthorStore());
const { getGenres } = useGenreStore();
const { genres } = storeToRefs(useGenreStore());
const { addBook, getBooks, editBook } = useBookStore();

const dialog = defineModel<boolean>("dialog");
const checkbox = ref(false);
const genreDialog = ref(false);
const authorDialog = ref(false);
const form = ref();
const loading = ref(false);
const payload = ref<AddBook>({
  title: "",
  author_id: 0,
  genre_id: 0,
  num_of_page: 0,
});
const edited = defineModel<Book | undefined>("edited");

watch(edited, (newV, _) => {
  if (newV) {
    payload.value = {
      title: newV.title,
      author_id: newV.author_id,
      genre_id: newV.genre_id,
      num_of_page: newV.num_of_page,
    };
  }
});

const doSave = $debounce(
  async () => {
    const validate = await form.value.validate();
    if (!validate.valid) return;

    if (!edited.value) {
      await doAdd();
    } else {
      await doEdit();
    }
  },
  1000,
  { leading: true, trailing: false },
);

const doAdd = async () => {
  try {
    loading.value = true;

    await addBook(payload.value);
    await getBooks();

    form.value.reset();
    loading.value = false;
    dialog.value = false;
  } catch (error) {
    loading.value = false;
    alert(error);
  }
};

const doEdit = async () => {
  try {
    loading.value = true;
    if (!edited.value) return;

    const editPayload: UpdateBook = { ...payload.value, id: edited.value.id };
    await editBook(editPayload);
    await getBooks();

    form.value.reset();
    edited.value = undefined;
    loading.value = false;
    dialog.value = false;
  } catch (error) {
    loading.value = false;
    alert(error);
  }
};

await getAuthors();
await getGenres();
</script>
<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card>
      <v-card-title>{{ edited ? "Edit" : "Tambah" }} Buku</v-card-title>
      <v-card-text class="px-3">
        <v-form ref="form" class="pa-0">
          <v-container fluid class="pa-0 ma-0">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="payload.title"
                  label="Judul*"
                  :rules="[(v) => !!v || 'Harus diisi']"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="payload.author_id"
                  label="Penulis*"
                  :items="authors"
                  item-title="name"
                  item-value="id"
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
                  v-model="payload.genre_id"
                  label="Genre*"
                  :items="genres"
                  item-title="title"
                  item-value="id"
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
                  v-model="payload.num_of_page"
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
          :loading="loading"
          @click="
            form.reset();
            edited = undefined;
            dialog = false;
          "
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
    <v-dialog v-model="authorDialog" width="500">
      <LazyBooksAddAuthor @closeit="authorDialog = false" />
    </v-dialog>
    <v-dialog v-model="genreDialog" width="500">
      <LazyBooksAddGenre @closeit="genreDialog = false" />
    </v-dialog>
  </v-dialog>
</template>
