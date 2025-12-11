<script setup lang="ts">
const props = defineProps({
  detail: { type: Object as PropType<Book>, required: true },
});
const emit = defineEmits(["edit"]);
const bookmenu = defineModel<boolean>("bookmenu");
</script>
<template>
  <v-bottom-sheet v-model="bookmenu">
    <v-sheet v-if="props.detail" class="pa-4 border-b-thin" rounded="t-lg">
      <div class="text-h5">{{ props.detail.title }}</div>
      <div>
        {{ props.detail.author.name }},
        {{ props.detail.genre.title }}
      </div>
      <div>Jumlah buku: {{ props.detail.book_amount }} pcs</div>
      <div>Tersedia: {{ props.detail.current_available_amount }} pcs</div>
      <div>Keluar: {{ props.detail.current_borrowed_amount }} pcs</div>
      <div>Total pinjam: {{ props.detail.total_borrowed }} kali</div>
    </v-sheet>
    <v-list v-if="props.detail">
      <v-list-item
        @click="
          bookmenu = false;
          emit('edit', props.detail);
        "
      >
        <v-list-item-title class="text-center">EDIT</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-bottom-sheet>
</template>
