<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
const { $debounce, $pwa, $device } = useNuxtApp();
const { login } = useAuthStore();
const payload = ref({
  username: "",
  password: "",
});
const passType = ref(true);
const onWeb = ref(false);
const instalationManualIOS = ref(false);
const form = ref();

const doLogin = $debounce(async () => {
  try {
    const validate = await form.value.validate();
    if (!validate.valid) return;

    await login(payload.value.username, payload.value.password);
    navigateTo("/", { replace: true });
  } catch (error) {
    alert(error);
  }
});

const doInstall = () => {
  if ($device.isIos || $device.isMacOS) {
    onWeb.value = false;
    instalationManualIOS.value = true;
  } else {
    $pwa?.install();
  }
};
</script>

<template>
  <v-app>
    <v-container class="fill-height">
      <v-row>
        <v-col
          v-if="!$pwa?.isPWAInstalled && !onWeb"
          cols="12"
          md="6"
          offset-md="3"
        >
          <v-btn
            block
            color="secondary"
            rounded="lg"
            size="large"
            class="mb-4"
            @click="doInstall()"
          >
            install
          </v-btn>
          <div v-show="instalationManualIOS" class="px-10">
            Step by step instalasi
            <ol>
              <li>Buka halaman website ini melalui browser Safari.</li>
              <li>
                Buka menu berbagi:<br />Tap ikon "Bagikan" yang terletak di
                bagian bawah layar (berbentuk persegi dengan panah ke atas).
              </li>
              <li>
                Pilih "Tambahkan ke Layar Utama":<br />Di menu berbagi, scroll
                ke bawah dan pilih opsi "Tambahkan ke Layar Utama".
              </li>
              <li>
                Konfirmasi dan tambahkan:<br />Tap tombol "Tambahkan" di pojok
                kanan atas untuk menyelesaikan instalasi di iOS.
              </li>
            </ol>
          </div>
          <v-btn
            block
            variant="flat"
            rounded="lg"
            size="large"
            @click="
              onWeb = true;
              instalationManualIOS = false;
            "
            >tetap di web</v-btn
          >
        </v-col>
        <v-col v-show="onWeb || $pwa?.isPWAInstalled" cols="12">
          <div class="text-h4 text-center my-4">Admin Perpus</div>
          <div class="mt-5 pa-2">
            <v-form ref="form">
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
              <v-btn block size="large" class="mt-4" @click="doLogin()"
                >Login</v-btn
              >

              <v-btn
                v-if="!$pwa?.isPWAInstalled && onWeb"
                block
                rounded="lg"
                color="secondary"
                size="large"
                class="mt-4"
                @click="doInstall()"
              >
                install
              </v-btn>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
