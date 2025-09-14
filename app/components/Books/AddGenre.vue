<script setup lang="ts">
const emit = defineEmits(["closeit"]);
const cbGenre = ref(false);
const form = ref(null);
</script>

<template>
  <v-card>
    <v-card-title>Tambah Genre</v-card-title>
    <v-form ref="form" class="px-2">
      <v-text-field
        label="Nama Genre*"
        :rules="[(v) => !!v || 'Harus diisi']"
        clearable
      />
      <v-checkbox
        v-model="cbGenre"
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
        @click="emit('closeit')"
      >
        Tutup
      </v-btn>
      <v-btn
        variant="tonal"
        prepend-icon="i-mdi-content-save"
        color="primary"
        class="text-none"
      >
        Simpan
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
