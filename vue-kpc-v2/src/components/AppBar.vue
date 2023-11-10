<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <v-app-bar color="#BBDEFB">
    <v-btn text>
      <template v-slot:prepend>
        <v-icon color="success">mdi-account</v-icon>
      </template>
      <RouterLink to="/">김박차</RouterLink>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn><RouterLink to="/create">생성</RouterLink></v-btn>
    <v-btn><RouterLink to="/login">로그인</RouterLink></v-btn>
    <!-- <v-btn><RouterLink to="/mypage">마이페이지</RouterLink></v-btn> -->
    <v-btn><RouterLink :to="{name: 'mypage', params: {user_id: '3'}}">마이페이지</RouterLink></v-btn>
  </v-app-bar>
</template>
