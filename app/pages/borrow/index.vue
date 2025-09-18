<script setup lang="ts">

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const { callHook } = useNuxtApp();

const { getBorrow } = useBorrowStore();
const { borrows } = storeToRefs(useBorrowStore());

const headers = [
  { title: "Tgl Keluar", key: "borrow_date" },
  { title: "Buku", key: "book.title" },
  { title: "Peminjam", key: "profile.fullname" },
  { title: "Status", key: "borrow_status" },
  { title: "Tgl Kembali", key: "returned_date" },
  { title: "", key: "action" },
];
const tab = ref(1);
const search = ref("");
const transactionDialog = ref(false);

watch(tab, async (newV, _) => {
  if (newV === 1) {
    await getBorrow(null);
  } else if (newV === 2) {
    await getBorrow(1);
  } else if (newV === 3) {
    await getBorrow(2);
  }
});

await getBorrow(null);
</script>

<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-btn icon="i-mdi-menu" @click="callHook('drawer:toggle')" />
      <v-app-bar-title>Transaksi</v-app-bar-title>
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
          <v-list-item density="compact" @click="transactionDialog = true">
            <v-list-item-title>Pinjamkan</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Kembalikan</v-list-item-title>
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
              <v-tab :value="2" class="text-none">Dipinjam</v-tab>
              <v-tab :value="3" class="text-none">Kembali</v-tab>
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
            <v-data-table-virtual
              :headers="headers"
              :items="borrows"
              :search="search"
            >
              <template #[`item.borrow_date`]="{ item }">
                {{ toDateString(item.borrow_date) }}
              </template>
              <template #[`item.returned_date`]="{ item }">
                {{ toDateString(item.returned_date) }}
              </template>
              <template #[`item.borrow_status`]="{ item }">
                <v-chip
                  size="small"
                  :color="borrowStateColor(item.borrow_status)"
                >
                  {{ borrowState(item.borrow_status) }}
                </v-chip>
              </template>
              <template #[`item.action`]="{ item }">
                <v-menu>
                  <template #activator="{ props }">
                    <v-icon icon="i-mdi-dots-horizontal" v-bind="props" />
                  </template>
                  <v-list density="compact">
                    <v-list-item
                      v-if="item.borrow_status === 1"
                      density="compact"
                    >
                      <v-list-item-title>Pengembalian</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table-virtual>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <LazyBorrowsAddBorrow v-model:dialog="transactionDialog" />
  </div>
</template>
