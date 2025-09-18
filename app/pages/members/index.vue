<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const { callHook } = useNuxtApp();
const { getMember } = useMemberStore();
const { members } = storeToRefs(useMemberStore());
const headers = [
  { title: "Nama", key: "fullname" },
  { title: "Kode Anggota", key: "userId" },
  { title: "Gender", key: "gender" },
  { title: "Usia (thn)", key: "age" },
  { title: "Jlh Pinjam", key: "borrowing" },
  { title: "", key: "action", sortable: false },
];
const addDialog = ref(false);
const edited = ref<Member | undefined>();

const editMember = (data: Member) => {
  edited.value = data;
  addDialog.value = true;
};

await getMember();
</script>

<template>
  <div>
    <v-app-bar flat class="border-b-thin">
      <v-btn icon="i-mdi-menu" @click="callHook('drawer:toggle')" />
      <v-app-bar-title>Anggota</v-app-bar-title>
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
          <v-list-item density="compact" @click="addDialog = true">
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
            <v-data-table-virtual :headers="headers" :items="members">
              <template #[`item.gender`]="{ item }">
                {{ genderLabel(item.gender) }}
              </template>
              <template #[`item.action`]="{ item }">
                <v-menu>
                  <template #activator="{ props }">
                    <v-icon icon="i-mdi-dots-horizontal" v-bind="props" />
                  </template>
                  <v-list density="compact">
                    <v-list-item density="compact" @click="editMember(item)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table-virtual>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <LazyMembersAddMember v-model:dialog="addDialog" v-model:edited="edited" />
  </div>
</template>
