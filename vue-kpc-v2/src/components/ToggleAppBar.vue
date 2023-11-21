<script setup>
import { ref } from 'vue'
const drawer = ref(null)
</script>

<template>
    <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
      >
        <v-list-item
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 1000px">
        <div class="d-flex justify-center align-center h">
          <v-btn
            color="primary"
            @click.stop="drawer = !drawer"
          >
            차승윤님
          </v-btn>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>
<style>
.v-main{
    z-index: 1;
}
</style>