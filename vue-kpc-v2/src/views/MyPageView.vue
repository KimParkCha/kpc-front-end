<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import userAPI from '../api/user'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { user } = userStore

const route = useRoute()
console.log(route.params.user_id)
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">번호</th>
        <th class="text-left">이름</th>
        <th class="text-left">이메일</th>
        <th class="text-left">비밀번호</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.password }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped></style>
