<script setup lang="ts">
const dialog = defineModel<boolean>("dialog");

const { getBooks } = useBookStore();
const { books } = storeToRefs(useBookStore());
const { getMember } = useMemberStore();
const { members } = storeToRefs(useMemberStore());

const checkbox = ref(false);
const addBookDialog = ref(false);
const addMemberDialog = ref(false);

const bookProps = (item: Book) => {
  return {
    title: item.title,
    subtitle: `${item.author.name}- ${item.genre.title} - ${item.year}`,
  };
};

await getBooks();
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
            label="Judul Buku*"
            :item-props="bookProps"
            :items="books"
            item-title="title"
            item-value="id"
            :rules="[(v) => !!v || 'Harus diisi']"
            clearable
          >
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
          <v-autocomplete
            label="Nama Anggota*"
            :items="members"
            item-title="fullname"
            item-value="id"
            :rules="[(v) => !!v || 'Harus diisi']"
            clearable
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
          <v-date-input
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
          @click="dialog = false"
          >Tutup</v-btn
        >
        <v-btn
          prepend-icon="i-mdi-content-save"
          variant="tonal"
          color="primary"
          class="text-none"
          >Simpan</v-btn
        >
      </v-card-actions>
    </v-card>
    <LazyBooksAddBook v-model:dialog="addBookDialog" />
    <LazyMembersAddMember v-model:dialog="addMemberDialog" />
  </v-dialog>
</template>
