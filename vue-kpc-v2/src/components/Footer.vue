<script setup>
import { ref } from 'vue'
const links = ref(['About Us', 'Team', 'Services', 'Contact Us'])
</script>

<template>
  <v-footer app name="footer">
    <v-container class="text-overline d-flex align-center justify-space-between">
      <v-row>
        <h4>Copyright &copy; 2023-{{ new Date().getFullYear() }} 개노답 삼형제</h4>
        <v-spacer></v-spacer>
        <v-btn v-for="link in links" :key="link" variant="text" class="mx-2" rounded="xl">
          <h4>{{ link }}</h4></v-btn
        >
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped></style>
