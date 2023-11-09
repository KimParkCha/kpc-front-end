<script setup>
import { RouterView } from 'vue-router'
import AppBar from './components/AppBar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <v-layout>
    <AppBar />
    <v-main class="d-flex flex-column justify-center align-center" style="min-height: 1000px; width: 100%">
      <RouterView />
    </v-main>
    <Footer />
  </v-layout>
</template>

<style scoped></style>
