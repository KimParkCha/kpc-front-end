<script setup>
import { RouterView } from 'vue-router'
import AppBar from './components/AppBar.vue'
import Footer from './components/Footer.vue'
import '@/assets/main.css'
</script>

<template>
  <v-layout>
    <AppBar />
    <v-main class="d-flex flex-column justify-center" style="min-height: 1000px margin-top: 0px">
      <RouterView />
      <Footer />
    </v-main>
  </v-layout>
</template>

<style scoped>
body {
  font-family: 'Hahmlet', serif;
}
</style>
