<script setup lang="ts">
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

const borrowId = parseInt(useRoute().query.id as string);
</script>
<template>
  <LazyBorrowsDetail :borrowid="borrowId" />
</template>
