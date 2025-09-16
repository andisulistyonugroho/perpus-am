<script setup lang="ts">
const { $debounce } = useNuxtApp();
const { addMember, getMember, editMember } = useMemberStore();

const payload = ref<AddMember>({
  fullname: "",
  gender: "m",
  age: 10,
});
const checkbox = ref(false);
const dialog = defineModel<boolean>("dialog");
const loading = ref(false);
const edited = defineModel<Member | undefined>("edited");
const form = ref();

watch(edited, (newV, _) => {
  if (newV) {
    payload.value = {
      fullname: newV.fullname,
      gender: newV.gender,
      age: newV.age,
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
      await doUpdate();
    }
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
);

const doAdd = async () => {
  try {
    loading.value = true;
    await addMember(payload.value);
    await getMember();

    loading.value = false;
    form.value.reset();
    dialog.value = false;
  } catch (error) {
    loading.value = false;
    alert(error);
  }
};

const doUpdate = async () => {
  try {
    loading.value = true;
    if (!edited.value) return;

    const editPayload: UpdateMember = { ...payload.value, id: edited.value.id };
    await editMember(editPayload);
    await getMember();

    form.value.reset();
    edited.value = undefined;
    loading.value = false;
    dialog.value = false;
  } catch (error) {
    loading.value = false;
    alert(error);
  }
};
</script>
<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card>
      <v-card-title>{{ edited ? "Edit" : "Tambah" }} Anggota</v-card-title>
      <v-card-text class="px-3">
        <v-form ref="form" class="pa-0">
          <v-text-field
            v-model="payload.fullname"
            label="Nama Anggota*"
            :rules="[(v) => !!v || 'Harus diisi']"
            clearable
          />
          <v-text-field
            v-model="payload.age"
            label="Usia Anggota*"
            type="number"
            :rules="[(v) => !!v || 'Harus diisi']"
          />
          <v-select
            v-model="payload.gender"
            label="Jenis Kelamin*"
            :rules="[(v) => !!v || 'Harus diisi']"
            :items="[
              { value: 'm', title: 'Laki-laki' },
              { value: 'f', title: 'Perempuan' },
            ]"
          />
          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'Harus diisi']"
            label="Sudah sesuai"
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
  </v-dialog>
</template>
