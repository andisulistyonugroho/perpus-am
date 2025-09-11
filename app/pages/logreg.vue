<script setup lang="ts">
definePageMeta({
  layout: false,
});
const tab = ref(1);
const passType = ref(true);
</script>

<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12">
        <div class="text-h4 text-center my-4">Admin Perpus</div>
        <v-tabs v-model="tab" fixed-tabs>
          <v-tab :value="1" class="text-none"> Masuk </v-tab>
          <v-tab :value="2" class="text-none"> Daftar </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <div class="mt-5 pa-2">
              <v-form>
                <v-text-field label="Username" />
                <v-text-field
                  :type="passType ? 'password' : 'text'"
                  label="Password"
                  :append-inner-icon="passType ? 'i-mdi-eye' : 'i-mdi-eye-off'"
                  @click:append-inner="passType = !passType"
                />
                <v-btn block size="large">Login</v-btn>
              </v-form>
            </div>
          </v-window-item>
          <v-window-item :value="2"> jklp </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>
