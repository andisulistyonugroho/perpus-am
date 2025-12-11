<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="ma-4">
    <h2>Maktabah Adm Err: {{ props.error?.statusCode }}</h2>
    <div>{{ props.error }}</div>
    <button class="mt-4" @click="handleError">Clear errors</button>
  </div>
</template>
