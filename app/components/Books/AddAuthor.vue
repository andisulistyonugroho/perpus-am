<script setup lang="ts">
const { $debounce } = useNuxtApp();
const { createAuthor, getAuthors } = useAuthorStore();
const emit = defineEmits(["closeit"]);
const checkbox = ref(false);
const form = ref();
const name = ref("");
const loading = ref(false);

const doAdd = $debounce(
  async () => {
    try {
      loading.value = true;
      const validate = await form.value.validate();
      if (!validate.valid) return;

      await createAuthor({ name: name.value });
      await getAuthors();
      loading.value = false;
      emit("closeit");
    } catch (error) {
      loading.value = false;
      alert(error);
    }
  },
  1000,
  { leading: true, trailing: false },
);
</script>

<template>
  <v-card>
    <v-card-title>Tambah Penulis</v-card-title>
    <v-form ref="form" class="px-2">
      <v-text-field
        v-model="name"
        label="Nama Penulis*"
        :rules="[(v) => !!v || 'Harus diisi']"
        clearable
      />
      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'Harus diisi']"
        label="Sudah sesuai"
      />
    </v-form>
    <v-card-actions>
      <v-btn
        variant="tonal"
        prepend-icon="i-mdi-close"
        color="error"
        class="text-none"
        :loading="loading"
        @click="emit('closeit')"
      >
        Tutup
      </v-btn>
      <v-btn
        variant="tonal"
        prepend-icon="i-mdi-content-save"
        color="primary"
        class="text-none"
        :loading="loading"
        @click="doAdd()"
      >
        Simpan
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
