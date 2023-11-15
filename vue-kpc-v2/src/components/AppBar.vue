<script setup>
import { RouterLink } from 'vue-router'

const user = JSON.parse(localStorage.getItem('user'))

const logout = () => {
  localStorage.removeItem('token')
}
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
    <RouterLink to="/map"><v-btn>지도</v-btn></RouterLink>
    <RouterLink to="/create"><v-btn>생성</v-btn></RouterLink>
    <RouterLink to="/login"><v-btn>로그인</v-btn></RouterLink>
    <!-- <v-btn><RouterLink @click="logout">로그아웃</RouterLink></v-btn> -->
    <!-- <v-btn><RouterLink to="/mypage">마이페이지</RouterLink></v-btn> -->
    <RouterLink :to="{ name: 'mypage', params: { user_id: '3' } }"><v-btn>마이페이지</v-btn></RouterLink>
  </v-app-bar>
</template>
