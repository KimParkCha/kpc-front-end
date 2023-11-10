<script setup>

import { reactive } from "vue";
import { useRoute } from "vue-router";
import userAPI from "../api/user";

const user = reactive({});
const route = useRoute()
console.log(route.params.user_id)

const getUser = () => {
  console.log('getUser');
  userAPI.getUser(
     3,
    ({ data }) => {
      console.log(data);
      user.id = data.user_id;
      user.name = data.name;
      user.email = data.email;
      user.password = data.password;
    },
    (err) => {
      console.log(err);
    }
  )
}

getUser();
</script>

<template>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            번호
          </th>
          <th class="text-left">
            이름
          </th>
          <th class="text-left">
            이메일
          </th>
          <th class="text-left">
            비밀번호
          </th>
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

<style scoped>

</style>