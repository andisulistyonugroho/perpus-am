<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const { callHook } = useNuxtApp();
const { getBooks, getBooksByState } = useBookStore();
const { books } = storeToRefs(useBookStore());

const tab = ref(1);
const addBookDialog = ref(false);
const editedData = ref<Book | undefined>();
const search = ref("");
const bookMenu = ref(false);
const bookMenuData = ref<Book>();

watch(tab, async (newV, _) => {
  if (newV === 1) {
    await getBooks();
  } else if (newV === 2) {
    await getBooksByState(1);
  } else if (newV === 3) {
    await getBooksByState(2);
  }
});

const editBook = (data: Book) => {
  editedData.value = data;
  addBookDialog.value = true;
};

const openBookMenu = (data: Book) => {
  bookMenu.value = true;
  bookMenuData.value = data;
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
              <v-tab :value="1" class="text-none">Semua</v-tab>
              <v-tab :value="2" class="text-none">Tersedia</v-tab>
              <v-tab :value="3" class="text-none">Dipinjam</v-tab>
            </v-tabs>
            <v-card-text>
              <div>
                <v-text-field
                  v-model="search"
                  label="Search"
                  variant="outlined"
                  density="compact"
                  single-line
                  hide-details
                  prepend-inner-icon="i-mdi-magnify"
                  clearable
                />
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mt-4">
            <div
              v-for="row in books"
              :key="row.id"
              class="mt-3 px-5 py-2 border-b-thin"
              @click="openBookMenu(row)"
            >
              <div>{{ row.title }}</div>
              <div class="text-body-2 text-grey-darken-1">
                {{ row.author.name }} &bull;
                {{ row.current_available_amount }} tersedia &bull;
                {{ row.current_borrowed_amount }} keluar
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <LazyBooksMenu
        v-if="bookMenuData"
        v-model:bookmenu="bookMenu"
        :detail="bookMenuData"
        @edit="editBook"
      />
    </v-container>
    <LazyBooksAddBook
      v-model:dialog="addBookDialog"
      v-model:edited="editedData"
    />
  </div>
</template>
