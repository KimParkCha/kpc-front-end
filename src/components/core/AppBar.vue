<template>
  <div>
    <v-app-bar color="#BBDEFB">
      <v-btn text @click="toHome">
        <template v-slot:prepend>
          <v-icon color="success">mdi-account</v-icon>
        </template>
        <v-text> 김박차</v-text>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="toCreatePage"> <v-text>생성</v-text></v-btn>
      <v-btn text @click="toLoginPage"> <v-text>로그인</v-text></v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'CoreAppBar',
  methods: {
    toHome() {
      this.$router.push('/').catch(() => {})
    },
    toCreatePage() {
      this.$router.push('/create').catch(() => {})
    },
    toLoginPage() {
      this.$router.push('/login').catch(() => {})
    },
  },
}
</script>

<style>
v-text {
  color: black;
}
</style>
