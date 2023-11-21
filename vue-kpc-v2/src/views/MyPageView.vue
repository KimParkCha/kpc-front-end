<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import userAPI from '../api/user'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const route = useRoute()
const { user, getUserInfo } = userStore

const getUser = sessionStorage.getItem('user')
console.log('mypage data:  ' + getUser.name)
</script>

<template>
  <v-sheet :elevation="12" class="mx-auto">
    <h2>마이페이지</h2>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">번호</th>
          <th class="text-left">이름</th>
          <th class="text-left">이메일</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ getUser.id }}</td>
          <td>{{ getUser.name }}</td>
          <td>{{ getUser.email }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>

<style scoped>
.v-sheet {
  height: 200px;
  width: 1000px;
  margin-bottom: 200px;
  /* background-color: #27262c; */
}
</style>
