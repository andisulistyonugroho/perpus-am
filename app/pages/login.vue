<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
const { $debounce } = useNuxtApp();
const { login } = useAuthStore();
const payload = ref({
  username: "",
  password: "",
});
const passType = ref(true);

const doLogin = $debounce(async () => {
  try {
    await login(payload.value.username, payload.value.password);
    navigateTo("/", { replace: true });
  } catch (error) {
    alert(error);
  }
});
</script>

<template>
  <v-app>
    <v-container class="fill-height">
      <v-row>
        <v-col cols="12">
          <div class="text-h4 text-center my-4">Admin Perpus</div>
          <div class="mt-5 pa-2">
            <v-form>
              <v-text-field
                v-model="payload.username"
                :rules="[(v) => !!v || 'Harus diisi']"
                label="Username"
              />
              <v-text-field
                v-model="payload.password"
                :rules="[(v) => !!v || 'Harus diisi']"
                :type="passType ? 'password' : 'text'"
                label="Password"
                :append-inner-icon="passType ? 'i-mdi-eye' : 'i-mdi-eye-off'"
                @click:append-inner="passType = !passType"
              />
              <v-btn block size="large" @click="doLogin()">Login</v-btn>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
