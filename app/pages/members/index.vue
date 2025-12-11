<script setup lang="ts">
definePageMeta({
  layout: "firstlayernohead",
  middleware: ["auth"],
});

const { getMember } = useMemberStore();
const { members } = storeToRefs(useMemberStore());
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
      <v-app-bar-title>Anggota</v-app-bar-title>
      <v-btn
        class="text-none mr-4"
        variant="flat"
        prepend-icon="i-mdi-add"
        color="secondary"
        @click="addDialog = true"
      >
        Tambah
      </v-btn>
    </v-app-bar>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card>
            <div
              v-for="row in members"
              :key="row.id"
              class="mt-3 px-5 py-2 border-b-thin"
            >
              <v-chip color="pink" size="small">#{{ row.id }}</v-chip>
              <div>{{ row.fullname }}</div>
              <div>Usia: {{ row.age }} tahun</div>
              <div class="text-right">
                <v-btn
                  variant="outlined"
                  size="small"
                  append-icon="i-mdi-chevron-right"
                  @click="editMember(row)"
                  >Edit</v-btn
                >
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <LazyMembersAddMember v-model:dialog="addDialog" v-model:edited="edited" />
  </div>
</template>
