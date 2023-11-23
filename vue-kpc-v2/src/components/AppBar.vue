<script setup>
import { RouterLink } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import ToggleAppBar from './ToggleAppBar.vue'

const menuStore = useMenuStore()
const userStore = useUserStore()

const { menuList } = storeToRefs(menuStore)
const { changeMenuState } = menuStore

// const { user } = storeToRefs(userStore)
const { user } = userStore

const userName = ref()
changeMenuState()
watch(menuList, () => {
  getUser = JSON.parse(sessionStorage.getItem('user'))
  userName.value = JSON.parse(user.value).name
  console.log(userName.value)
})
onMounted(() => {
  const user = sessionStorage.getItem('user')
  if (user !== null) {
    const { name } = JSON.parse(user)
    userName.value = name
    console.log(name)
  }
})
const logout = () => {
  console.log('로그아웃!!!!')
  sessionStorage.clear()
  changeMenuState()
}

const drawer = ref(null)
</script>

<template>
  <v-app-bar>
    <RouterLink to="/">
      <v-img
        src="https://github.com/gogoadl/Algorithm/assets/49335446/7bebc317-b15c-4f5f-b398-84153e622ee3"
        :width="128"
        :height="128"
        class="ms-2"
      ></v-img>
    </RouterLink>
    <v-spacer></v-spacer>

    <RouterLink to="/map"><v-btn>지도</v-btn></RouterLink>
    <!-- <RouterLink to="/todayNews"><v-btn>오늘의 뉴스</v-btn></RouterLink> -->

    <template v-for="menu in menuList" :key="menu.routeName">
      <template v-if="menu.routeName === 'logout'">
        <v-btn @click.stop="drawer = !drawer">{{ userName }}님</v-btn>
      </template>
      <template v-else>
        <RouterLink :to="{ name: menu.routeName }"
          ><v-btn>{{ menu.name }}</v-btn></RouterLink
        >
      </template>
    </template>

    <!-- <RouterLink to="/map"><v-btn>지도</v-btn></RouterLink>
    <RouterLink to="/create"><v-btn>생성</v-btn></RouterLink>
    <RouterLink to="/login"><v-btn>로그인</v-btn></RouterLink>
    <v-btn><RouterLink to="/mypage">마이페이지</RouterLink></v-btn> -->
    <!-- <v-btn><RouterLink @click="logout">로그아웃</RouterLink></v-btn> -->
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <v-list-item></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav v-for="menu in menuList" :key="menu.routeName">
      <template v-if="menu.routeName === 'logout'">
        <v-list-item prepend-icon="mdi-view-dashboard">
          <RouterLink to="/" @click.prevent="logout"
            ><a>{{ menu.name }}</a></RouterLink
          >
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item prepend-icon="mdi-forum">
          <RouterLink :to="{ name: menu.routeName }"
            ><a>{{ menu.name }}</a></RouterLink
          >
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-btn {
  color: black;
}

a {
  text-decoration: none;
  color: black;
}
</style>
