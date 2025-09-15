<script setup lang="ts">
const { callHook } = useNuxtApp();
const { getBooks } = useBookStore();
const { books } = storeToRefs(useBookStore());

const tab = ref(1);
const headers = ref([
  { title: "Judul", key: "title" },
  { title: "Penulis", key: "author.name" },
  { title: "Genre", key: "genre.title" },
  { title: "Hal", key: "num_of_page" },
  { title: "Jlh Pinjam", key: "borrowed" },
  { title: "", key: "action", sortable: false },
]);
const addBookDialog = ref(false);
const editedData = ref<Book | undefined>();

const editBook = (data: Book) => {
  editedData.value = data;
  addBookDialog.value = true;
};

await getBooks();
</script>
<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-btn icon="i-mdi-menu" @click="callHook('drawer:toggle')" />
      <v-app-bar-title>Buku</v-app-bar-title>
      <v-btn
        id="menu-activator"
        class="text-none mr-4"
        variant="tonal"
        prepend-icon="i-mdi-lightning-bolt"
        color="primary"
      >
        Action
      </v-btn>
      <v-menu activator="#menu-activator">
        <v-list density="compact">
          <v-list-item density="compact" @click="addBookDialog = true">
            <v-list-item-title>Tambah</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Pinjam</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card>
            <v-tabs v-model="tab" slider-color="blue">
              <v-tab value="1" class="text-none">Semua</v-tab>
              <v-tab value="2" class="text-none">Tersedia</v-tab>
              <v-tab value="3" class="text-none">Dipinjam</v-tab>
            </v-tabs>
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
          </v-card>
          <v-card class="mt-4">
            <template v-if="$vuetify.display.mobile">
              <div
                v-for="row in books"
                :key="row.id"
                class="mt-3 px-5 py-2 border-b-thin"
              >
                <div>{{ row.title }}</div>
                <div class="text-body-2 text-grey-darken-1">
                  {{ row.author.name }} &bull; {{ row.num_of_page }} halaman
                  &bull; {{ row.genre.title }} &bull; dipinjam ... kali
                </div>
              </div>
            </template>
            <v-data-table-virtual v-else :headers="headers" :items="books">
              <template #[`item.title`]="{ item }">
                {{ item.title }}
                <v-chip size="small" :color="bookStateColor(item.state)">
                  {{ bookState(item.state) }}</v-chip
                >
              </template>
              <template #[`item.action`]="{ item }">
                <v-menu>
                  <template #activator="{ props }">
                    <v-icon icon="i-mdi-dots-horizontal" v-bind="props" />
                  </template>
                  <v-list density="compact">
                    <v-list-item density="compact" @click="editBook(item)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="item.state === 1"
                      density="compact"
                      @click="editBook(item)"
                    >
                      <v-list-item-title>Pinjam</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-if="item.state === 2"
                      density="compact"
                      @click="editBook(item)"
                    >
                      <v-list-item-title>Kembali</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table-virtual>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <LazyBooksAddBook
      v-model:dialog="addBookDialog"
      v-model:edited="editedData"
    />
  </div>
</template>
