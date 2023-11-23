<script setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import userAPI from '../api/user'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const route = useRoute()
const { user, userInfo } = userStore

const getUser = JSON.parse(sessionStorage.getItem('user'))
console.log('mypage data:  ' + getUser.id)
</script>

<template>
  <v-sheet :elevation="12" class="mx-auto fade-view">
    <v-card class="mx-auto px-6 py-8">
      <h2>마이페이지</h2>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">이름</th>
            <th class="text-left">이메일</th>
            <th class="text-left">가입날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ getUser.name }}</td>
            <td>{{ getUser.email }}</td>
            <td>{{ getUser.joinDate.substring(0, 10) }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
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
