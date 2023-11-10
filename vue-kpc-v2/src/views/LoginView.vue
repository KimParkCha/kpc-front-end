<script setup>

import { reactive } from "vue"
import userAPI from "@/api/user"
import { useRouter } from "vue-router"

const router = useRouter()
const user = reactive({})
const login = () => {
  userAPI.loginUser(
    user,
    ({data}) => {
      console.log(data)
      console.log("로그인 성공")
      router.push({name: "home"})
    },
    () => {
      console.log("로그인 실패")
    }

  )
}

</script>

<template>
 
  <v-sheet :elevation="12" class="mx-auto">
    <v-card class="mx-auto px-6 py-8" >
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="user.email"
          :readonly="loading"
          :rules="[required]"
          class="mb-2"
          clearable
          label="Email"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :readonly="loading"
          :rules="[required]"
          clearable
          label="Password"
          placeholder="Enter your password"
        ></v-text-field>

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          block
          color="light-blue"
          size="large"
          type="submit"
          variant="elevated"
          @click="login"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.v-sheet {
  height: 200px;
  width: 400px;
  margin-bottom: 200px;
}
</style>