<script setup>
import { RouterLink } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const menuStore = useMenuStore()
const { menuList } = storeToRefs(menuStore)
const { changeMenuState } = menuStore

const logout = () => {
  console.log('로그아웃!!!!')
  changeMenuState()
}

const fname = ref('logo')

const getImageUrls = (name) => {
  return new URL(`/src/assets/${name}.svg`, import.meta.url).href
}

</script>

<template>
  <v-app-bar>
    <RouterLink to="/">  
      <v-img :src="getImageUrls(fname)" :width="56" :height="56" class="ms-2"></v-img>
  </RouterLink>
    <v-spacer></v-spacer>

    <RouterLink to="/map"><v-btn>지도</v-btn></RouterLink>
    <RouterLink to="/create"><v-btn>생성</v-btn></RouterLink>

    <template v-for="menu in menuList" :key="menu.routeName">
      <template v-if="menu.show">
        <template v-if="menu.routeName === 'logout'">
          <RouterLink to="/" @click.prevent="logout"
            ><v-btn>{{ menu.name }}</v-btn></RouterLink
          >
        </template>
        <template v-else>
          <RouterLink :to="{ name: menu.routeName }"
            ><v-btn>{{ menu.name }}</v-btn></RouterLink
          >
        </template>
      </template>
    </template>

    <!-- <RouterLink to="/map"><v-btn>지도</v-btn></RouterLink>
    <RouterLink to="/create"><v-btn>생성</v-btn></RouterLink>
    <RouterLink to="/login"><v-btn>로그인</v-btn></RouterLink>
    <v-btn><RouterLink to="/mypage">마이페이지</RouterLink></v-btn> -->
    <!-- <v-btn><RouterLink @click="logout">로그아웃</RouterLink></v-btn> -->
  </v-app-bar>
</template>
