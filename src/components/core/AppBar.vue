<template>
  <div>
    <v-app-bar dense dark>
      <ul class="menu">
        <li>
          <v-btn @click="toHome"> Home </v-btn>
        </li>
        <li>
          <v-btn @click="toPage1"> Page1 </v-btn>
        </li>
        <li>
          <v-btn @click="toPage2"> Page2 </v-btn>
        </li>
      </ul>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'CoreAppBar',
  methods: {
    toHome() {
      alert('home')
    },
    toPage1() {
      alert('Page1')
    },
    toPage2() {
      alert('Page2')
    },
  },
}
</script>

<style>
ul.menu li {
  display: inline;
}
</style>
