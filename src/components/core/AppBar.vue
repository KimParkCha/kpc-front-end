<template>
  <div>
    <v-app-bar dense dark>
      <ul class="menu">
        <li>
          <v-btn @click="toHome"> 홈 </v-btn>
        </li>
        <li>
          <v-btn @click="toCreatePage"> 생성 </v-btn>
        </li>
        <li>
          <v-btn @click="toTablePage"> 목록 </v-btn>
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
      this.$router.push('/')
    },
    toCreatePage() {
      this.$router.push('/create')
    },
    toTablePage() {
      this.$router.push('/table')
    },
  },
}
</script>

<style>
ul.menu li {
  display: inline;
}
</style>
